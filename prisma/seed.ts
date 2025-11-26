import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main(){
  const pass = await bcrypt.hash('ChangeMe123!', 10);
  await prisma.adminUser.upsert({ where:{ email: 'admin@example.com' }, update:{}, create:{ email: 'admin@example.com', password: pass, name: 'Admin' } });
  console.log('Seeded admin user: admin@example.com / ChangeMe123!');
}
main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());
