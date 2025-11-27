// pages/api/admin/uploads/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Use memory storage; we handle writing to disk ourselves
const upload = multer({ storage: multer.memoryStorage() });

// Needed so Next.js doesn’t try to body-parse the multipart request
export const config = {
  api: {
    bodyParser: false,
  },
};

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (...args: any[]) => void
) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

type ParsedMeta = {
  labName: string | null;
  batchCode: string | null;
  sampleId: string | null;
  sampleType: string | null;
  thcPercent: number | null;
  cbdPercent: number | null;
  totalCannabinoidsPercent: number | null;
  passed: boolean | null;
  stateCode: string | null;
  jurisdiction: string | null;
};

function normalizeText(text: string | null | undefined): string {
  if (!text) return '';
  return text.replace(/\r\n/g, '\n').replace(/\u0000/g, '').trim();
}

function isBadBatchCode(code: string | null | undefined): boolean {
  if (!code) return true;
  const trimmed = code.trim();
  if (!trimmed) return true;
  // Avoid "PASS", "PASSED", "FAIL", "FAILED" as batch codes
  return /^(PASS(ED)?|FAIL(ED)?)$/i.test(trimmed);
}

function slugifyLabName(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/labs?$/i, '') // strip trailing "Lab" / "Labs"
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'lab-' + crypto.randomBytes(4).toString('hex');
}

/**
 * Heuristic parser specifically for Nova Analytic Labs (TagLeaf COAs)
 */
function parseNovaAnalyticLabs(text: string): ParsedMeta | null {
  const normalized = normalizeText(text);
  if (!/nova analytic labs/i.test(normalized)) {
    return null;
  }

  let labName = 'Nova Analytic Labs';

  let batchCode: string | null = null;
  let sampleId: string | null = null;
  let sampleType: string | null = null;
  let thcPercent: number | null = null;
  let cbdPercent: number | null = null;
  let totalCannabinoidsPercent: number | null = null;
  let passed: boolean | null = null;

  // SAMPLE ID
  const sampleMatch =
    normalized.match(/SAMPLE\s+ID\s*:\s*([A-Z0-9-]+)/i) ||
    normalized.match(/SAMPLE\s+ID:\s*([A-Z0-9-]+)/i);
  if (sampleMatch) {
    sampleId = sampleMatch[1].trim();
  }

  // MATRIX (sample type)
  const matrixMatch = normalized.match(/MATRIX\s*:\s*([A-Z ]+)/i);
  if (matrixMatch) {
    sampleType = matrixMatch[1].trim();
  }

  // BATCH RESULT PASS / FAIL
  const resultMatch = normalized.match(
    /BATCH\s+RESULT\s*:\s*(PASS(?:ED)?|FAIL(?:ED)?)/i
  );
  if (resultMatch) {
    passed = /^PASS/i.test(resultMatch[1]);
  }

  // BATCH CODE – avoid PASS/FAIL
  const batchMatch =
    normalized.match(/BATCH\s+NO\.\s*:\s*([A-Z0-9-]+)/i) ||
    normalized.match(/BATCH\s*:\s*([A-Z0-9-]+)/i);
  if (batchMatch) {
    const candidate = batchMatch[1].trim();
    if (!isBadBatchCode(candidate)) {
      batchCode = candidate;
    }
  }

  // Older Nova flower COAs: "Δ-THC:28.5 %" and "TOTAL CANNABINOIDS:29.1 %"
  const thcMatch = normalized.match(/Δ-THC\s*:?\s*([0-9.]+)\s*%/i);
  if (thcMatch) {
    thcPercent = parseFloat(thcMatch[1]);
  }

  const cbdMatch = normalized.match(/\bCBD\s*:?\s*([0-9.]+)\s*%/i);
  if (cbdMatch) {
    cbdPercent = parseFloat(cbdMatch[1]);
  }

  const totalMatch = normalized.match(
    /TOTAL\s+CANNABINOIDS\s*:?\s*([0-9.]+)\s*%/i
  );
  if (totalMatch) {
    totalCannabinoidsPercent = parseFloat(totalMatch[1]);
  }

  // Nova is Maine in our dataset
  const stateCode = 'ME';
  const jurisdiction = 'ME';

  return {
    labName,
    batchCode,
    sampleId,
    sampleType,
    thcPercent,
    cbdPercent,
    totalCannabinoidsPercent,
    passed,
    stateCode,
    jurisdiction,
  };
}

/**
 * Generic fallback parser for arbitrary labs.
 */
function basicHeuristicParse(text: string): ParsedMeta {
  const normalized = normalizeText(text);

  let labName: string | null = null;
  let batchCode: string | null = null;
  let sampleId: string | null = null;
  let sampleType: string | null = null;
  let thcPercent: number | null = null;
  let cbdPercent: number | null = null;
  let totalCannabinoidsPercent: number | null = null;
  let passed: boolean | null = null;
  let stateCode: string | null = null;
  let jurisdiction: string | null = null;

  // Generic lab name heuristic
  const labMatch = normalized.match(/([A-Z][A-Za-z0-9 &]+Labs?)/);
  if (labMatch) {
    labName = labMatch[1].trim();
  }

  // Generic batch code
  const batchMatch =
    normalized.match(/BATCH\s+NO\.\s*:\s*([A-Z0-9-]+)/i) ||
    normalized.match(/BATCH\s*:\s*([A-Z0-9-]+)/i);
  if (batchMatch) {
    const candidate = batchMatch[1].trim();
    if (!isBadBatchCode(candidate)) {
      batchCode = candidate;
    }
  }

  // Sample id
  const sampleMatch = normalized.match(/SAMPLE\s+ID\s*:\s*([A-Z0-9-]+)/i);
  if (sampleMatch) {
    sampleId = sampleMatch[1].trim();
  }

  // Matrix / sample type
  const matrixMatch = normalized.match(/MATRIX\s*:\s*([A-Z ]+)/i);
  if (matrixMatch) {
    sampleType = matrixMatch[1].trim();
  }

  // Pass/fail
  const resultMatch = normalized.match(
    /BATCH\s+RESULT\s*:\s*(PASS(?:ED)?|FAIL(?:ED)?)/i
  );
  if (resultMatch) {
    passed = /^PASS/i.test(resultMatch[1]);
  }

  // Potency (generic)
  const thcMatch = normalized.match(/THC\s*:?\s*([0-9.]+)\s*%/i);
  if (thcMatch) {
    thcPercent = parseFloat(thcMatch[1]);
  }

  const cbdMatch = normalized.match(/\bCBD\s*:?\s*([0-9.]+)\s*%/i);
  if (cbdMatch) {
    cbdPercent = parseFloat(cbdMatch[1]);
  }

  const totalMatch = normalized.match(
    /TOTAL\s+CANNABINOIDS\s*:?\s*([0-9.]+)\s*%/i
  );
  if (totalMatch) {
    totalCannabinoidsPercent = parseFloat(totalMatch[1]);
  }

  // Naive state inference
  if (/\bME\s+\d{5}\b/i.test(normalized)) {
    stateCode = 'ME';
    jurisdiction = 'ME';
  }

  return {
    labName,
    batchCode,
    sampleId,
    sampleType,
    thcPercent,
    cbdPercent,
    totalCannabinoidsPercent,
    passed,
    stateCode,
    jurisdiction,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions as any);

  if (!session || !session.user || (session.user as any).role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // -------- GET: list uploaded COAs --------
  if (req.method === 'GET') {
    const docs = await prisma.uploadedDocument.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        labResult: true,
      },
    });
    return res.status(200).json(docs);
  }

  // -------- POST: upload + parse COA --------
  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, upload.single('file'));

      const anyReq = req as any;
      const file = anyReq.file as
        | {
            buffer: Buffer;
            mimetype: string;
            originalname: string;
            size: number;
          }
        | undefined;

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      if (file.mimetype !== 'application/pdf') {
        return res
          .status(400)
          .json({ error: 'Only application/pdf files are supported' });
      }

      // Hash and dedupe
      const sha256 = crypto
        .createHash('sha256')
        .update(file.buffer)
        .digest('hex');

      const existing = await prisma.uploadedDocument.findUnique({
        where: { sha256 },
        include: { labResult: true },
      });

      if (existing) {
        return res.status(200).json({
          reused: true,
          document: existing,
          labResult: existing.labResult,
        });
      }

      // Persist to disk
      const uploadsDir = path.join(process.cwd(), 'uploads', 'coas');
      await fs.mkdir(uploadsDir, { recursive: true });

      const filePath = path.join(uploadsDir, `${sha256}.pdf`);
      await fs.writeFile(filePath, file.buffer);

      // Extract text via pdf-parse
      let extractedText = '';
      try {
        const parsed = await pdfParse(file.buffer);
        extractedText = normalizeText(parsed.text);
      } catch (err) {
        console.error('pdf-parse failed, continuing with empty text', err);
        extractedText = '';
      }

      // --- Parse metadata (Nova first, then generic fallback) ---
      let meta: ParsedMeta = {
        labName: null,
        batchCode: null,
        sampleId: null,
        sampleType: null,
        thcPercent: null,
        cbdPercent: null,
        totalCannabinoidsPercent: null,
        passed: null,
        stateCode: null,
        jurisdiction: null,
      };

      const nova = parseNovaAnalyticLabs(extractedText);
      if (nova) {
        meta = nova;
      } else {
        meta = basicHeuristicParse(extractedText);
      }

      // --- Create UploadedDocument row ---
      const document = await prisma.uploadedDocument.create({
        data: {
          filePath,
          fileName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          sha256,
          extractedText: extractedText || null,
          labName: meta.labName,
          batchCode: meta.batchCode,
          uploader:
            (session.user as any).email ||
            (session.user as any).name ||
            'unknown',
          // verified stays default false
        },
      });

      // --- Upsert Lab (if we have a lab name) ---
      let labRecord: any = null;
      if (meta.labName) {
        const slug = slugifyLabName(meta.labName);

        labRecord = await prisma.lab.upsert({
          where: { slug },
          update: {
            name: meta.labName,
            stateCode: meta.stateCode ?? undefined,
            city: meta.stateCode === 'ME' ? 'Portland' : undefined,
          },
          create: {
            name: meta.labName,
            slug,
            stateCode: meta.stateCode ?? undefined,
            city: meta.stateCode === 'ME' ? 'Portland' : undefined,
          },
        });
      }

      // --- Create/find Batch (if we have a batch code) ---
      let batchRecord: any = null;
      if (meta.batchCode) {
        batchRecord = await prisma.batch.findFirst({
          where: { batchCode: meta.batchCode },
        });

        if (!batchRecord) {
          batchRecord = await prisma.batch.create({
            data: {
              batchCode: meta.batchCode,
              jurisdiction: meta.jurisdiction,
              stateCode: meta.stateCode ?? meta.jurisdiction,
              isActive: true,
            },
          });
        }
      }

      // --- Create LabResult ONLY if we have a Batch ---
      let labResult: any = null;
      if (batchRecord) {
        const labConnect =
          labRecord != null ? { lab: { connect: { id: labRecord.id } } } : {};

        labResult = await prisma.labResult.create({
          data: {
            batch: { connect: { id: batchRecord.id } }, // <-- REQUIRED RELATION
            ...labConnect,
            uploadedDocument: { connect: { id: document.id } },
            sampleId: meta.sampleId,
            sampleType: meta.sampleType,
            thcPercent: meta.thcPercent,
            cbdPercent: meta.cbdPercent,
            totalCannabinoidsPercent: meta.totalCannabinoidsPercent,
            passed: meta.passed,
          },
        });
      }

      return res.status(200).json({
        reused: false,
        document: {
          ...document,
          labResult,
        },
        labResult,
      });
    } catch (err: any) {
      console.error('Error handling upload', err);
      return res
        .status(500)
        .json({ error: err?.message || 'Failed to handle upload' });
    }
  }

  // Unsupported method
  return res.status(405).end();
}
