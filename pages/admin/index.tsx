// pages/admin/index.tsx
import { useSession, signIn } from 'next-auth/react';
import AdminStateExplorer from '../../components/AdminStateExplorer';

export default function AdminHome() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm">
          Checking your session…
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 text-sm max-w-sm">
          <h1 className="text-lg font-semibold">Sign in to access CartFax Atlas</h1>
          <p className="text-slate-400 text-xs">
            You&apos;ll need an authorized account to access admin tools, COA uploads, and
            the full batch explorer. Guests can still view the public atlas at the main homepage.
          </p>
          <button
            onClick={() => signIn()}
            className="mt-1 inline-flex items-center justify-center rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-400"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return <AdminStateExplorer session={session} />;
}
