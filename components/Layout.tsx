import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Top nav */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-950">
              C
            </div>
            <div>
              <div className="font-semibold tracking-wide">CartFax</div>
              <div className="text-xs text-slate-400">
                Cannabis Retail Transparency
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-slate-300 hover:text-emerald-400">
              Explore
            </Link>
            <Link
              href="/admin"
              className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 hover:border-emerald-500 hover:text-emerald-400"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/90 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span>© {new Date().getFullYear()} CartFax</span>
          <span className="text-slate-600">
            Independent data on legal cannabis retailers & batches.
          </span>
        </div>
      </footer>
    </div>
  );
}
