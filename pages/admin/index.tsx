// pages/admin/index.tsx
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function AdminIndex() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-12 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
        <h1 className="text-xl font-semibold mb-2 text-slate-50">
          CartFax Admin
        </h1>
        <p className="text-sm text-slate-400 mb-4">
          Sign in with your admin credentials to manage batches, lab results,
          COA uploads, locations, brands, and more.
        </p>
        <button
          type="button"
          onClick={() => signIn(undefined, { callbackUrl: '/admin' })}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(16,185,129,0.6)] hover:bg-emerald-400 transition-colors"
        >
          <span>Sign in as admin</span>
          <span>↗</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">
            CartFax Admin Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Batch-first verification, lab results, uploads, and regulatory
            datasets in one control room.
          </p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.4)] transition-all"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px]">
            ⏏
          </span>
          <span>Sign out</span>
        </button>
      </div>

      {/* Primary callout – map / atlas */}
      <Link
        href="/"
        className="block rounded-3xl border border-emerald-500/60 bg-gradient-to-r from-emerald-600/35 via-emerald-500/15 to-slate-950 px-6 py-4 shadow-[0_0_60px_rgba(16,185,129,0.6)] transition-all hover:border-emerald-300 hover:shadow-[0_0_80px_rgba(16,185,129,0.8)]"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">
              Public atlas
            </p>
            <h2 className="mt-1 text-lg font-semibold text-slate-50">
              Open the US safety & COA map
            </h2>
            <p className="mt-1 text-xs text-emerald-50/80">
              Jump back into the state-by-state atlas to explore recall
              density, lab coverage, and batch activity.
            </p>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center gap-2 text-sm text-emerald-50">
            <span>Launch atlas</span>
            <span className="text-lg leading-none">↗</span>
          </div>
        </div>
      </Link>

      {/* Management tiles */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AdminTile
          href="/admin/batches"
          title="Batches"
          description="Browse, filter, and debug individual batches and their linked COAs."
        />
        <AdminTile
          href="/admin/lab-results"
          title="Lab results"
          description="Inspect potency, contaminants, and verification status by lab."
        />
        <AdminTile
          href="/admin/uploads"
          title="COA uploads"
          description="Upload, parse, and verify COA PDFs, with pagination and filters."
        />
        <AdminTile
          href="/admin/brands"
          title="Brands"
          description="Organize brands, link products, and monitor reliability scores."
        />
        <AdminTile
          href="/admin/locations"
          title="Locations"
          description="Manage dispensaries, licensing metadata, and coordinates."
        />
        <AdminTile
          href="/admin/recalls"
          title="Recalls"
          description="Track recall events, affected batches, and state-level notices."
        />
      </div>
    </div>
  );
}

type AdminTileProps = {
  href: string;
  title: string;
  description: string;
};

function AdminTile({ href, title, description }: AdminTileProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-100 shadow-[0_0_30px_rgba(15,23,42,0.9)] transition-all hover:border-emerald-400/80 hover:bg-slate-900 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
    >
      <div>
        <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span>Open {title.toLowerCase()}</span>
        <span className="text-base leading-none group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </div>
    </Link>
  );
}
