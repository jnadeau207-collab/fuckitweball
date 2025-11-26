import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Use in-memory storage for uploaded files
const upload = multer({ storage: multer.memoryStorage() });

// Helper to run multer as a promise
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: any
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req as any, res as any, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions as any);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // GET: list uploads (no extractedText in list view)
  if (req.method === 'GET') {
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
          labResult: {
            select: { id: true },
          },
        },
      });

      return res.json(docs);
    } catch (e: any) {
      console.error('Error listing uploads', e);
      return res
        .status(500)
        .json({ error: e?.message || 'Failed to list uploads' });
    }
  }

  // POST: upload + parse PDF
  if (req.method === 'POST') {
    try {
      // Parse multipart/form-data with multer
      await runMiddleware(req, res, upload.single('file'));
      const file = (req as any).file as Express.Multer.File | undefined;

      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      if (file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Only PDF files are allowed' });
      }

      // Compute hash for dedupe
      const hash = crypto
        .createHash('sha256')
        .update(file.buffer)
        .digest('hex');

      const existing = await prisma.uploadedDocument.findUnique({
        where: { sha256: hash },
        include: {
          labResult: true,
        },
      });

      if (existing) {
        return res.json({
          reused: true,
          document: existing,
          labResult: existing.labResult || null,
        });
      }

      // Extract text from PDF
      let extractedText: string | null = null;
      try {
        const parsed = await pdfParse(file.buffer);
        const raw = (parsed.text || '').trim();
        extractedText = raw.length > 0 ? raw : null;
      } catch (e) {
        console.error('Failed to parse PDF text', e);
        extractedText = null;
      }

      // Tiny heuristics for batch code & lab name
      let detectedBatchCode: string | null = null;
      let detectedLabName: string | null = null;

      if (extractedText) {
        const lines = extractedText.split(/\r?\n/).map((l) => l.trim());

        for (const line of lines) {
          if (!detectedBatchCode) {
            const m =
              line.match(/^(batch|lot|metrc id)\s*[:#-]?\s*(.+)$/i) ||
              line.match(/batch\s*[:#-]\s*([A-Za-z0-9\-_.]+)/i);
            if (m) {
              detectedBatchCode = (m[2] || m[1] || '').trim();
            }
          }

          if (!detectedLabName) {
            if (
              /labs?|laborator(y|ies)/i.test(line) &&
              line.length <= 80 &&
              !/limit|result|analysis/i.test(line)
            ) {
              detectedLabName = line;
            }
          }

          if (detectedBatchCode && detectedLabName) break;
        }
      }

      // Create document with extracted text
const document = await prisma.uploadedDocument.create({
  data: {
    fileName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    sha256: hash,
    batchCode: detectedBatchCode,
    labName: detectedLabName,
    extractedText,
    verified: false,
    filePath: '',
  },
});

// For now, do NOT auto-create a LabResult because LabResult
// requires a linked Batch in the Prisma schema.
// We just return null, and you can create / link a lab result
// later from the COA debug interface.
const labResult = null;

return res.json({
  reused: false,
  document,
  labResult,
});

    } catch (e: any) {
      console.error('Error handling upload', e);
      return res
        .status(500)
        .json({ error: e?.message || 'Failed to upload COA' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

// Tell Next.js not to parse the body, we’re using multer
export const config = {
  api: {
    bodyParser: false,
  },
};
