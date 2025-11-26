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

import { parseCoa, ParsedCoa } from '../../../../lib/coaParsers/registry';

const prisma = new PrismaClient();

// Multer: keep file in memory; we decide where/how to write it.
const upload = multer({ storage: multer.memoryStorage() });

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false, // required for multer
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (req.method === 'GET') {
    await handleGet(req, res);
    return;
  }

  if (req.method === 'POST') {
    await handlePost(req, res, session.user.email);
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}

// ---------- GET: list uploaded documents ----------

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const docs = await prisma.uploadedDocument.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fileName: true,
        mimeType: true,
        size: true,
        sha256: true,
        batchCode: true,
        labName: true,
        createdAt: true,
        verified: true,
        extractedText: true,
        labResult: {
          select: { id: true },
        },
      },
    });

    res.json(docs);
  } catch (e: any) {
    console.error('Failed to list uploads', e);
    res.status(500).json({ error: e?.message || 'Failed to list uploads' });
  }
}

// ---------- POST: upload + parse + wire up lab/batch/labResult ----------

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse,
  uploaderEmail: string
) {
  try {
    // 1) Parse multipart form and grab the PDF
    await runMiddleware(req, res, upload.single('file'));

    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) {
      res.status(400).json({ error: 'Missing PDF file field "file"' });
      return;
    }

    if (file.mimetype !== 'application/pdf') {
      res.status(400).json({ error: 'Only PDF files are allowed.' });
      return;
    }

    // 2) Hash for dedupe
    const sha256 = crypto
      .createHash('sha256')
      .update(file.buffer)
      .digest('hex');

    const existing = await prisma.uploadedDocument.findUnique({
      where: { sha256 },
      include: {
        labResult: true,
      },
    });

    if (existing) {
      // Already ingested – return the existing doc + labResult reference
      res.json({ reused: true, document: existing, labResult: existing.labResult });
      return;
    }

    // 3) Persist PDF to disk under uploads/coas/<sha>.pdf
    const uploadDir = path.join(process.cwd(), 'uploads', 'coas');
    await fs.mkdir(uploadDir, { recursive: true });

    const diskFileName = `${sha256}.pdf`;
    const absoluteFilePath = path.join(uploadDir, diskFileName);
    const relativeFilePath = path.join('uploads', 'coas', diskFileName);

    await fs.writeFile(absoluteFilePath, file.buffer);

    // 4) Extract text with pdf-parse
    const parsedPdf = await pdfParse(file.buffer);
    const extractedText = parsedPdf.text || '';

    // 5) Try to parse via lab-specific registry (Nova, etc.)
    const parsed: ParsedCoa | null = parseCoa(extractedText, file.originalname);

    // 6) Store UploadedDocument row
    const uploadedDoc = await prisma.uploadedDocument.create({
      data: {
        filePath: relativeFilePath,
        fileName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        sha256,
        extractedText,
        labName: parsed?.labName || null,
        batchCode: parsed?.batchCode || null,
        uploader: uploaderEmail,
        verified: false,
      },
    });

    // 7) If we didn't recognize the lab / batch, we stop here.
    if (!parsed || !parsed.batchCode) {
      res.json({
        reused: false,
        document: uploadedDoc,
        labResult: null,
        parsed: null,
      });
      return;
    }

    // ---------- Upsert Lab (Nova) ----------
    let labRecord = null;
    if (parsed.labSlug) {
      labRecord = await prisma.lab.upsert({
        where: { slug: parsed.labSlug },
        update: {
          name: parsed.labName,
          website: parsed.labWebsite || undefined,
          city: parsed.labCity || undefined,
          stateCode: parsed.labStateCode || undefined,
        },
        create: {
          slug: parsed.labSlug,
          name: parsed.labName,
          website: parsed.labWebsite || undefined,
          city: parsed.labCity || undefined,
          stateCode: parsed.labStateCode || undefined,
        },
      });
    }

    // ---------- Find or create Batch ----------
    const batchStateCode =
      parsed.batchStateCode || parsed.jurisdiction || parsed.labStateCode || null;

    let batchRecord = await prisma.batch.findFirst({
      where: {
        batchCode: parsed.batchCode,
        ...(batchStateCode ? { stateCode: batchStateCode } : {}),
      },
    });

    if (batchRecord) {
      batchRecord = await prisma.batch.update({
        where: { id: batchRecord.id },
        data: {
          productName: parsed.productName ?? batchRecord.productName,
          primaryCategory: parsed.sampleType ?? batchRecord.primaryCategory,
          jurisdiction: parsed.jurisdiction ?? batchRecord.jurisdiction,
          stateCode: batchStateCode ?? batchRecord.stateCode,
        },
      });
    } else {
      batchRecord = await prisma.batch.create({
        data: {
          batchCode: parsed.batchCode,
          productName: parsed.productName ?? null,
          primaryCategory: parsed.sampleType ?? null,
          jurisdiction: parsed.jurisdiction ?? batchStateCode ?? null,
          stateCode: batchStateCode,
          isActive: true,
        },
      });
    }

    // ---------- Create LabResult linked to Batch + Lab + UploadedDocument ----------
    const labResult = await prisma.labResult.create({
      data: {
        batch: {
          connect: { id: batchRecord.id },
        },
        lab: labRecord
          ? {
              connect: { id: labRecord.id },
            }
          : undefined,
        uploadedDocument: {
          connect: { id: uploadedDoc.id },
        },

        testedAt: parsed.testedAt ? new Date(parsed.testedAt) : undefined,
        reportedAt: parsed.reportedAt ? new Date(parsed.reportedAt) : undefined,

        thcPercent:
          typeof parsed.thcPercent === 'number' ? parsed.thcPercent : null,
        cbdPercent:
          typeof parsed.cbdPercent === 'number' ? parsed.cbdPercent : null,
        totalCannabinoidsPercent:
          typeof parsed.totalCannabinoidsPercent === 'number'
            ? parsed.totalCannabinoidsPercent
            : null,
        totalTerpenesPercent:
          typeof parsed.totalTerpenesPercent === 'number'
            ? parsed.totalTerpenesPercent
            : null,

        pesticidesPass:
          typeof parsed.pesticidesPass === 'boolean'
            ? parsed.pesticidesPass
            : null,
        solventsPass:
          typeof parsed.solventsPass === 'boolean'
            ? parsed.solventsPass
            : null,
        heavyMetalsPass:
          typeof parsed.heavyMetalsPass === 'boolean'
            ? parsed.heavyMetalsPass
            : null,
        microbialsPass:
          typeof parsed.microbialsPass === 'boolean'
            ? parsed.microbialsPass
            : null,

        moisturePercent:
          typeof parsed.moisturePercent === 'number'
            ? parsed.moisturePercent
            : null,
        waterActivity:
          typeof parsed.waterActivity === 'number'
            ? parsed.waterActivity
            : null,

        analyteSummary: parsed.analyteSummary ?? null,
        rawJson: null,
        sourcePdfUrl: parsed.sourceUrl ?? null,
      },
    });

    res.json({
      reused: false,
      document: uploadedDoc,
      labResult,
      parsed,
    });
  } catch (e: any) {
    console.error('Error handling upload', e);
    res
      .status(500)
      .json({ error: e?.message || 'Failed to handle COA upload' });
  }
}
