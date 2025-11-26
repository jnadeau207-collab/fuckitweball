import { getServerSession } from 'next-auth/next';
import authOptions from '../pages/api/auth/[...nextauth]';
export default async function requireAdmin(req,res){
  const session = await getServerSession(req, res, authOptions);
  if(!session || (session.user as any).role!=='admin'){
    res.status(403).json({ error: 'forbidden' });
    return null;
  }
  return session;
}
