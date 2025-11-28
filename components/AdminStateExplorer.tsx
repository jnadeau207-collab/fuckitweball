// components/AdminStateExplorer.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { RegionId } from './GlobeStates';

const GlobeStates = dynamic(() => import('./GlobeStates'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
      Loading 3D atlas…
    </div>
  ),
});

const regionLabels: { id: RegionId; label: string }[] = [
  { id: 'unitedStates', label: 'United States' },
  { id: 'canada', label: 'Canada' },
  { id: 'mexico', label: 'Mexico' },
  { id: 'netherlands', label: 'Netherlands' },
];

const AdminStateExplorer: React.FC = () => {
  const [region, setRegion] = useState<RegionId>('unitedStates');
  const [selected, setSelected] = useState<{
    id: string | number | null;
    name: string | null;
  }>({
    id: null,
    name: null,
  });

  const [viewAltitude, setViewAltitude] = useState<number | null>(null);

  const handleRegionChange = (next: RegionId) => {
    setRegion(next);
    // when switching countries, treat selection as "whole jurisdiction"
    setSelected({ id: null, name: null });
  };

  const handleStateSelectFromGlobe = (
    id: string | number | null,
    name: string,
  ) => {
    setSelected({
      id,
      name: name || null,
    });
  };

  const regionLabel =
    regionLabels.find(r => r.id === region)?.label ?? 'Region';

  const selectionTitle = selected.name ?? regionLabel;

  const apiNamespace =
    region === 'unitedStates'
      ? 'us'
      : region === 'canada'
      ? 'ca'
      : region === 'mexico'
      ? 'mx'
      : 'nl';

  return (
    <main className="flex min-h-screen flex-col bg-black text-slate-50 overflow-hidden">
      {/* Header / Tabs */}
      <header className="mx-auto w-full max-w-6xl px-4 pt-4 pb-3">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-sky-400">
          {regionLabel.toUpperCase()} · JURISDICTION
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-slate-700 bg-black px-1 py-1 shadow-sm shadow-slate-900">
            {regionLabels.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRegionChange(r.id)}
                className={
                  'rounded-full px-4 py-1.5 text-[11px] transition ' +
                  (region === r.id
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40'
                    : 'text-slate-400 hover:text-slate-100')
                }
              >
                {r.label}
              </button>
            ))}
          </div>

          <p className="text-[0.75rem] text-slate-400">
            Drag to spin · Hover to “lift” · Scroll to zoom · Click to drill
            into a region
          </p>
        </div>
      </header>

      {/* Globe + overlays */}
      <div className="relative flex-1">
        {/* Globe container – full-bleed, guaranteed height */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="aspect-square w-full max-w-[900px]">
            <GlobeStates
              region={region}
              onRegionChange={handleRegionChange}
              onStateSelect={handleStateSelectFromGlobe}
              onViewChange={alt => setViewAltitude(alt)}
            />
          </div>
        </div>

        {/* Jurisdiction card overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-end px-6 pt-20">
          <section className="pointer-events-auto w-full max-w-sm rounded-3xl border border-slate-700 bg-black/85 shadow-[0_22px_60px_rgba(0,0,0,0.7)] backdrop-blur">
            <header className="border-b border-slate-800 px-4 pb-2 pt-3">
              <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-400">
                {regionLabel.toUpperCase()} · JURISDICTION SNAPSHOT
              </p>
              <h2 className="text-lg font-semibold text-slate-50">
                {selectionTitle}
              </h2>
              <p className="mt-1 text-[0.78rem] text-slate-400">
                Illustrative coverage metrics while we connect live COA feeds,
                lab integrations, and recall data.
              </p>
            </header>

            <div className="px-4 py-3 text-[0.78rem] text-slate-300">
              <p className="mb-2">
                You’re viewing{' '}
                <span className="font-semibold">{regionLabel}</span> as an
                operator. Data and tools are scoped to this jurisdiction and
                selection.
              </p>
              <ul className="space-y-1 text-[0.75rem] text-slate-400">
                <li>• PII visibility: allowed within jurisdiction.</li>
                <li>
                  • Government dashboards: restricted by role and licence.
                </li>
                <li>• Operator dashboards: allowed where licensed.</li>
                <li>• Aggregated analytics: allowed across regions.</li>
              </ul>

              <p className="mt-3 text-[0.7rem] text-slate-500">
                Backend note: reads and writes for this view go through the{' '}
                <code className="rounded bg-slate-900 px-1 py-0.5 text-[0.7rem]">
                  /api/{apiNamespace}
                </code>{' '}
                namespace. The globe is the source of truth for which namespace
                is active.
              </p>
            </div>

            <footer className="flex items-center justify-between gap-3 border-t border-slate-800 px-4 py-2.5">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1.5 text-[0.78rem] font-medium text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-600"
              >
                Open admin data tools
              </Link>
              <button
                type="button"
                onClick={() => setSelected({ id: null, name: null })}
                className="text-[11px] text-slate-500 hover:text-slate-300"
              >
                Reset to region
              </button>
            </footer>
          </section>
        </div>

        {/* Footer text, overlaid (doesn’t create scroll) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
          <p className="text-[0.68rem] text-slate-500">
            Independent data on legal cannabis retailers &amp; batches.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AdminStateExplorer;
