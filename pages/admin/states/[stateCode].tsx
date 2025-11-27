// pages/admin/states/[stateCode].tsx
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type Batch = {
  id: number;
  batchCode: string;
  productName?: string | null;
  primaryCategory?: string | null;
  subCategory?: string | null;
  brand?: { id: number; name: string } | null;
  stateCode?: string | null;
  jurisdiction?: string | null;
  isActive?: boolean | null;
  updatedAt?: string | null;
  labResults?: {
    id: number;
    passed?: boolean | null;
    lab?: { id: number; name: string } | null;
  }[];
};

type StateStats = {
  totalBatches: number;
  activeBatches: number;
  labs: number;
  brands: number;
};

export default function AdminStateDetail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { stateCode } = router.query;

  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const code = useMemo(
    () =>
      typeof stateCode === 'string'
        ? stateCode.toUpperCase()
        : Array.isArray(stateCode)
        ? stateCode[0]?.toUpperCase()
        : '',
    [stateCode]
  );

  useEffect(() => {
    if (!code || status !== 'authenticated') return;
    void fetchBatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, status]);

  async function fetchBatches() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/admin/batches?stateCode=${encodeURIComponent(code)}`);
      if (res.status === 401) {
        throw new Error('Unauthorized');
      }
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to load batches');
      }
      const data: Batch[] = await res.json();
      setBatches(data);
    } catch (err: any) {
      console.error('Failed to load batches', err);
      setError(err.message || 'Failed to load batches');
    } finally {
      setLoading(false);
    }
  }

  const stats: StateStats = useMemo(() => {
    if (!batches.length) {
      return { totalBatches: 0, activeBatches: 0, labs: 0, brands: 0 };
    }
    const active = batches.filter(b => b.isActive !== false).length;
    const brands = new Set<number>();
    const labs = new Set<number>();

    for (const b of batches) {
      if (b.brand?.id) brands.add(b.brand.id);
      if (b.labResults) {
        for (const lr of b.labResults) {
          if (lr.lab?.id) labs.add(lr.lab.id);
        }
      }
    }

    return {
      totalBatches: batches.length,
      activeBatches: active,
      labs: labs.size,
      brands: brands.size,
    };
  }, [batches]);

  const filtered = useMemo(() => {
    if (!search.trim()) return batches;
    const q = search.toLowerCase();
    return batches.filter(b => {
      const pieces = [
        b.batchCode,
        b.productName,
        b.primaryCategory,
        b.subCategory,
        b.brand?.name,
      ]
        .filter(Boolean)
        .map(s => String(s).toLowerCase());
      return pieces.some(p => p.includes(q));
    });
  }, [batches, search]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-4 text-sm text-slate-300">
          Loading admin…
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-4 text-sm text-slate-300">
          Please sign in as an admin to view state batch details.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="px-4 py-8 md:px-8 max-w-6xl mx-auto space-y-6">
        {/* Top bar / breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <button
              onClick={() => router.push('/admin')}
              className="text-xs text-slate-400 hover:text-emerald-300 mb-1 inline-flex items-center gap-1"
            >
              <span aria-hidden>←</span>
              Back to state map
            </button>
            <h1 className="text-2xl font-semibold text-slate-50">
              {code || '—'} · batches &amp; lab results
            </h1>
            <p className="text-sm text-slate-400">
              Exploring all batches currently assigned to {code || 'this state'}. Use search
              and filters to drill into messy datasets.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-1 text-right">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
              State overview
            </div>
            <div className="flex gap-3 text-xs text-slate-200">
              <span>{stats.totalBatches} batches</span>
              <span>· {stats.activeBatches} active</span>
              <span>· {stats.labs} labs</span>
              <span>· {stats.brands} brands</span>
            </div>
          </div>
        </div>

        {/* Stats + search row */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,2fr)]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Snapshot
              </div>
              <button
                onClick={fetchBatches}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-200 hover:border-emerald-300 hover:text-emerald-100 transition"
              >
                Refresh
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Total batches
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-50">
                  {stats.totalBatches}
                </div>
              </div>
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2">
                <div className="text-[10px] uppercase tracking-[0.16em] text-emerald-200">
                  Active batches
                </div>
                <div className="mt-1 text-lg font-semibold text-emerald-100">
                  {stats.activeBatches}
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Unique labs
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-50">
                  {stats.labs}
                </div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Brands
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-50">
                  {stats.brands}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 space-y-3">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Search &amp; filters
            </div>
            <div className="flex flex-col gap-2">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search batch code, product name, category, brand…"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400/70"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                <div>
                  Showing{' '}
                  <span className="text-emerald-300">{filtered.length}</span> of{' '}
                  <span className="text-slate-200">{batches.length}</span> batches
                  in {code || 'state'}.
                </div>
                <Link
                  href="/admin/batches"
                  className="text-[11px] text-slate-300 hover:text-emerald-300"
                >
                  View global batch list ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-700/60 bg-red-950/40 px-4 py-2 text-xs text-red-300">
            {error === 'Unauthorized'
              ? 'Unauthorized – your session may not have admin privileges for this endpoint.'
              : error}
          </div>
        )}

        {/* Batch table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h2 className="text-sm font-semibold text-slate-200">
              Batches in {code || 'state'}
            </h2>
            {loading && (
              <div className="text-[11px] text-slate-400">Loading batches…</div>
            )}
          </div>

          {filtered.length === 0 && !loading ? (
            <div className="text-xs text-slate-500">
              No batches match this filter in {code || 'state'} yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 pr-3">Batch code</th>
                    <th className="py-2 pr-3">Product</th>
                    <th className="py-2 pr-3">Category</th>
                    <th className="py-2 pr-3">Brand</th>
                    <th className="py-2 pr-3">Labs</th>
                    <th className="py-2 pr-3">Active</th>
                    <th className="py-2 pr-3">Last updated</th>
                    <th className="py-2 pr-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => {
                    const labs = new Set<string>();
                    let anyFail = false;
                    if (b.labResults) {
                      for (const lr of b.labResults) {
                        if (lr.lab?.name) labs.add(lr.lab.name);
                        if (lr.passed === false) anyFail = true;
                      }
                    }

                    return (
                      <tr
                        key={b.id}
                        className="border-b border-slate-900/70 hover:bg-slate-900/80"
                      >
                        <td className="py-2 pr-3 font-mono text-[11px] text-slate-100">
                          {b.batchCode}
                        </td>
                        <td className="py-2 pr-3 text-slate-100">
                          {b.productName || '—'}
                        </td>
                        <td className="py-2 pr-3 text-slate-300">
                          {b.primaryCategory || '—'}
                          {b.subCategory ? ` · ${b.subCategory}` : ''}
                        </td>
                        <td className="py-2 pr-3 text-slate-200">
                          {b.brand?.name || (
                            <span className="text-slate-500">Unknown</span>
                          )}
                        </td>
                        <td className="py-2 pr-3 text-slate-200">
                          {labs.size > 0 ? (
                            <span>
                              {Array.from(labs).join(', ')}
                              {anyFail && (
                                <span className="ml-1 text-[10px] text-red-300">
                                  (fail flags)
                                </span>
                              )}
                            </span>
                          ) : (
                            <span className="text-slate-500">No lab results</span>
                          )}
                        </td>
                        <td className="py-2 pr-3">
                          {b.isActive === false ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-slate-600 px-2 py-0.5 text-[10px] text-slate-300">
                              Inactive
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/60 px-2 py-0.5 text-[10px] text-emerald-200">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="py-2 pr-3 text-slate-400">
                          {b.updatedAt
                            ? new Date(b.updatedAt).toLocaleString()
                            : '—'}
                        </td>
                        <td className="py-2 pr-3 text-right">
                          <Link
                            href={`/admin/batches/${b.id}`}
                            className="text-[11px] rounded-full border border-slate-700 px-2 py-1 text-slate-200 hover:border-emerald-300 hover:text-emerald-200"
                          >
                            View batch →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
