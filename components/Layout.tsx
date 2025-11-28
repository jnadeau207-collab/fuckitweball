// components/Layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const isAuthed = status === 'authenticated';

  const handleAuthClick = () => {
    if (isAuthed) {
      void signOut({ callbackUrl: '/' });
    } else {
      // Send them into the admin flow; NextAuth will redirect back here when done
      void signIn(undefined, { callbackUrl: '/admin' });
    }
  };

  const authLabel = isAuthed ? 'Log out' : 'Log in';

  return (
    <div className="min-h-screen bg-black text-slate-50 flex flex-col">
      {/* Top nav */}
      <header className="border-b border-slate-800 bg-black/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-sky-500 text-[11px] font-bold text-slate-950 shadow-sm shadow-sky-500/50">
              CF
            </span>
            <span className="text-sm font-semibold tracking-tight">
              CartFax
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {session?.user?.email && (
              <span className="hidden text-xs text-slate-400 sm:inline">
                {session.user.email}
              </span>
            )}
            <button
              type="button"
              onClick={handleAuthClick}
              className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-50 shadow-sm hover:bg-slate-800"
            >
              {authLabel}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-black/90 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} CartFax</span>
          <span className="text-slate-600">
            Independent data on legal cannabis retailers & batches.
          </span>
        </div>
      </footer>
    </div>
  );
}
