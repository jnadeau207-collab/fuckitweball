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
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Top nav */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-sm font-bold text-slate-950 shadow-md shadow-emerald-500/40">
              C
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-wide">CartFax</div>
              <div className="text-[11px] text-slate-400">
                Cannabis Retail Transparency
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Explore map
            </Link>

            {/* Single auth button: Log in / Log out */}
            <button
              type="button"
              onClick={handleAuthClick}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px]">
                {isAuthed
                  ? (session?.user as any)?.email?.[0]?.toUpperCase() || '✓'
                  : '⭑'}
              </span>
              <span>{authLabel}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/90 text-xs text-slate-500">
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
