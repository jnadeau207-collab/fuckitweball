import { PrismaClient } from '@prisma/client';
import { indexDispensary } from '../../../lib/algolia';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const dispensaries = await prisma.dispensary.findMany();

  for (const d of dispensaries) {
    await indexDispensary(d);
  }

  res.json({ ok: true, count: dispensaries.length });
}
