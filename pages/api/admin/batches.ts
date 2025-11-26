import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions as any);

  if (!session || (session.user as any).role !== 'admin') {
    return res.status(403).json({ error: 'forbidden' });
  }

  // GET: list batches, optionally filtered by state and search query
    if (req.method === 'GET') {
    const { id, stateCode, q } = req.query;

    // Detail view: GET /api/admin/batches?id=123
    if (id) {
      const batchId = Number(id);
      if (!batchId) {
        return res.status(400).json({ error: 'invalid id' });
      }

      const item = await prisma.batch.findUnique({
        where: { id: batchId },
        include: {
          brand: true,
          labResults: {
            orderBy: { createdAt: 'desc' },
            include: {
              uploadedDocument: true, // make sure LabResult has this relation in schema
            },
          },
        },
      });

      if (!item) {
        return res.status(404).json({ error: 'not found' });
      }

      return res.json(item);
    }

    // List view (state + search)
    const where: any = {};

    if (stateCode && typeof stateCode === 'string') {
      where.stateCode = stateCode.toUpperCase();
    }

    if (q && typeof q === 'string' && q.trim().length > 0) {
      where.OR = [
        { batchCode: { contains: q, mode: 'insensitive' } },
        { productName: { contains: q, mode: 'insensitive' } },
        { productCategory: { contains: q, mode: 'insensitive' } },
        // remove this line if you don't have brand.name:
        { brand: { name: { contains: q, mode: 'insensitive' } } },
      ];
    }

    const items = await prisma.batch.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        brand: true,
        labResults: true,
      },
    });

    return res.json(items);
  }


  // POST: create batch
  if (req.method === 'POST') {
    const body = req.body || {};

    const created = await prisma.batch.create({
      data: {
        batchCode: body.batchCode || '',
        productName: body.productName || null,
        productCategory: body.productCategory || null,
        productSubcategory: body.productSubcategory || null,
        brandId: body.brandId ?? null,
        sku: body.sku || null,
        stateCode: body.stateCode ? String(body.stateCode).toUpperCase() : null,
        harvestDate: body.harvestDate ? new Date(body.harvestDate) : null,
        productionDate: body.productionDate
          ? new Date(body.productionDate)
          : null,
        packageDate: body.packageDate
          ? new Date(body.packageDate)
          : null,
        expirationDate: body.expirationDate
          ? new Date(body.expirationDate)
          : null,
        isActive: body.isActive === true,
        notes: body.notes || null,
      },
    });

    return res.status(201).json(created);
  }

  // PUT: update batch
  if (req.method === 'PUT') {
    const id = Number(req.query.id);
    if (!id) {
      return res.status(400).json({ error: 'missing id' });
    }

    const body = req.body || {};

    const updated = await prisma.batch.update({
      where: { id },
      data: {
        batchCode: body.batchCode || '',
        productName: body.productName || null,
        productCategory: body.productCategory || null,
        productSubcategory: body.productSubcategory || null,
        brandId: body.brandId ?? null,
        sku: body.sku || null,
        stateCode: body.stateCode ? String(body.stateCode).toUpperCase() : null,
        harvestDate: body.harvestDate ? new Date(body.harvestDate) : null,
        productionDate: body.productionDate
          ? new Date(body.productionDate)
          : null,
        packageDate: body.packageDate
          ? new Date(body.packageDate)
          : null,
        expirationDate: body.expirationDate
          ? new Date(body.expirationDate)
          : null,
        isActive: body.isActive === true,
        notes: body.notes || null,
      },
    });

    return res.json(updated);
  }

  // DELETE: delete batch + its lab results
  if (req.method === 'DELETE') {
    const id = Number(req.query.id);
    if (!id) {
      return res.status(400).json({ error: 'missing id' });
    }

    try {
      // delete all lab results that reference this batch
      await prisma.labResult.deleteMany({
        where: { batchId: id },
      });

      await prisma.batch.delete({
        where: { id },
      });

      return res.json({ ok: true });
    } catch (e: any) {
      console.error('Failed to delete batch', e);
      return res
        .status(500)
        .json({ error: e?.message || 'Failed to delete batch' });
    }
  }

  return res.status(405).end();
}
