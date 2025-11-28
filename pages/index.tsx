// pages/index.tsx

import { useSession } from 'next-auth/react';
// Corrected import path. Assuming AdminStateExplorer is in components/AdminStateExplorer.tsx
import AdminStateExplorer from '../components/AdminStateExplorer'; 
import UnAuthenticatedLanding from '../components/UnAuthenticatedLanding'; 

export default function Home() {
  const { data: session } = useSession();

  // If the user is authenticated, show the Admin State Explorer.
  if (session) {
    return <AdminStateExplorer />;
  }

  // Otherwise, show the unauthenticated landing page.
  return <UnAuthenticatedLanding />;
}