// pages/index.tsx
import { useSession } from 'next-auth/react';
import AdminStateExplorer from '../components/AdminStateExplorer';

export default function Home() {
  const { data: session } = useSession();
  // Same atlas, but guests are allowed and treated as "guest" role
  return <AdminStateExplorer session={session ?? null} />;
}
