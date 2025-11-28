// components/AdminStateExplorer.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import type {
  RegionId,
  GlobeSelection,
} from './GlobeStates';
import { STATE_SNAPSHOTS, type StateSnapshot } from '../lib/stateSnapshots';

const GlobeStates = dynamic(() => import('./GlobeStates'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
      Spinning up the atlas…
    </div>
  ),
});

// Jurisdictions we support right now
const REGION_LABELS: { id: RegionId; label: string }[] = [
  { id: 'unitedStates', label: 'United States' },
  { id: 'canada', label: 'Canada' },
  { id: 'mexico', label: 'Mexico' },
  { id: 'netherlands', label: 'Netherlands' },
];

type RegionMeta = {
  title: string;
  slug: string;
  apiNamespace: string;
  legalStatus: string;
  blurb: string;
};

const REGION_META: Record<RegionId, RegionMeta> = {
  unitedStates: {
    title: 'United States',
    slug: 'US',
    apiNamespace: '/api/us',
    legalStatus: 'Mixed state-level legalization.',
    blurb:
      'Patchwork of adult-use and medical programs, with federal prohibition still in place. Coverage and access vary state by state.',
  },
  canada: {
    title: 'Canada',
    slug: 'CA',
    apiNamespace: '/api/ca',
    legalStatus: 'National recreational & medical.',
    blurb:
      'Nationwide adult-use and medical framework under the Cannabis Act. Provinces and territories control retail and distribution.',
  },
  mexico: {
    title: 'Mexico',
    slug: 'MX',
    apiNamespace: '/api/mx',
    legalStatus: 'Federal reform in motion.',
    blurb:
      'High court decisions have effectively ended outright prohibition, with regulations and formal markets still evolving.',
  },
  netherlands: {
    title: 'Netherlands',
    slug: 'NL',
    apiNamespace: '/api/nl',
    legalStatus: 'Tolerated system; pilots underway.',
    blurb:
      'Coffeeshops operate under a tolerance policy. Government-regulated supply pilots are expanding, especially for municipal programs.',
  },
};

const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 });

const AdminStateExplorer: React.FC = () => {
  const [region, setRegion] = useState<RegionId>('unitedStates');

  const [selection, setSelection] = useState<GlobeSelection | null>({
    region: 'unitedStates',
    level: 'country',
    id: 'unitedStates',
    name: 'United States',
  });

  const [viewAltitude, setViewAltitude] = useState<number | null>(null);

  const activeRegionMeta = REGION_META[region];

  const isUs = region === 'unitedStates';

  const selectedStateSnapshot: StateSnapshot | null =
    isUs &&
    selection?.level === 'subregion' &&
    STATE_SNAPSHOTS[selection.id]
      ? STATE_SNAPSHOTS[selection.id]
      : null;

  const coveragePct = selectedStateSnapshot?.coverageScore ?? 0;
  const fullCoaRate = selectedStateSnapshot?.fullCoaRate ?? 0;

  const detailTitle =
    selection?.name ??
    (isUs ? 'United States of America' : activeRegionMeta.title);

  const detailKind =
    selection?.level === 'subregion'
      ? `${activeRegionMeta.title} · state snapshot`
      : `${activeRegionMeta.title} · jurisdiction snapshot`;

  const apiNamespace = activeRegionMeta.apiNamespace;

  const resetSelectionToRegion = () => {
    const next: GlobeSelection = {
      region,
      level: 'country',
      id: region,
      name: activeRegionMeta.title,
    };
    setSelection(next);
  };

  const crumbScope =
    region === 'unitedStates'
      ? 'US · STATES'
      : `${activeRegionMeta.title.toUpperCase()} · JURISDICTION`;

  const zoomHint =
    viewAltitude !== null && viewAltitude < 1.4
      ? 'Zoomed in — drag to orbit the active tile.'
      : 'Drag to spin · Hover to “lift” · Scroll to zoom · Click to drill into a region.';

  return (
    <main className="flex h-screen flex-col bg-black text-slate-50 overflow-hidden">
      {/* Minimal top crumb / instructions */}
      <div className="px-6 pt-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-sky-400">
          {crumbScope}
        </p>
        <p className="mt-1 text-[0.75rem] text-slate-400">{zoomHint}</p>
      </div>

      {/* Globe + card */}
      <div className="flex flex-1 items-center justify-center gap-8 px-6 pb-4">
        {/* Globe column */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative h-[min(72vh,72vw)] w-[min(72vh,72vw)]">
            <GlobeStates
              region={region}
              onRegionChange={nextRegion => {
                setRegion(nextRegion);
                const nextMeta = REGION_META[nextRegion];
                setSelection({
                  region: nextRegion,
                  level: 'country',
                  id: nextRegion,
                  name: nextMeta.title,
                });
              }}
              onSelectionChange={sel => {
                setSelection(sel);
              }}
              onAltitudeChange={alt => setViewAltitude(alt)}
            />
          </div>
        </div>

        {/* Data card */}
        <aside className="w-full max-w-md rounded-3xl border border-slate-800 bg-black/80 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.75)] backdrop-blur">
          <header className="border-b border-slate-800 pb-3">
            <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-400">
              {activeRegionMeta.slug} ·{' '}
              {selection?.level === 'subregion'
                ? 'STATE SNAPSHOT'
                : 'JURISDICTION SNAPSHOT'}
            </p>
            <h2 className="text-lg font-semibold text-slate-50">{detailTitle}</h2>
            <p className="mt-1 text-[0.78rem] text-slate-400">
              {selection?.level === 'subregion' && selectedStateSnapshot
                ? 'Illustrative coverage metrics while we connect live COA feeds, recalls, and state integrations.'
                : activeRegionMeta.blurb}
            </p>
            <p className="mt-1 text-[0.7rem] text-slate-500">
              Legal status:{' '}
              <span className="text-slate-200">
                {activeRegionMeta.legalStatus}
              </span>
            </p>
          </header>

          {/* Metrics section */}
          {selection?.level === 'subregion' && selectedStateSnapshot && (
            <div className="pt-3 pb-3">
              <dl className="mb-4 grid grid-cols-2 gap-3 text-[0.78rem]">
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Batches tracked
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-50">
                    {formatNumber(selectedStateSnapshot.batchesTracked)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Labs reporting
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-50">
                    {formatNumber(selectedStateSnapshot.labsReporting)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Coverage score
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-50">
                    {coveragePct}/100
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Recent recalls
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-50">
                    {selectedStateSnapshot.recentRecalls}
                  </dd>
                </div>
              </dl>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[0.7rem] text-slate-400">
                    <span className="font-medium uppercase tracking-[0.16em]">
                      Coverage
                    </span>
                    <span className="font-semibold text-slate-100">
                      {coveragePct}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                      style={{
                        width: `${Math.min(coveragePct, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[0.7rem] text-slate-400">
                    <span className="font-medium uppercase tracking-[0.16em]">
                      Full COA coverage
                    </span>
                    <span className="font-semibold text-slate-100">
                      {fullCoaRate}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 shadow-[0_0_10px_rgba(129,140,248,0.6)]"
                      style={{
                        width: `${Math.min(fullCoaRate, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <p className="text-[0.7rem] text-slate-500">
                  Metrics shown are illustrative only. In production this panel
                  will be driven by live batch, lab, and recall data for the
                  selected jurisdiction and subregion.
                </p>
              </div>
            </div>
          )}

          {/* Jurisdiction-level note when no state metrics */}
          {(selection?.level === 'country' || !selectedStateSnapshot) && (
            <div className="py-3 text-[0.75rem] text-slate-400">
              <p>
                The globe is the source of truth for which jurisdiction and
                subregion are active. All reads/writes for this view should be
                scoped through{' '}
                <span className="font-mono text-slate-100">
                  {apiNamespace}
                </span>
                .
              </p>
            </div>
          )}

          <footer className="mt-1 flex items-center justify-between gap-3 border-t border-slate-800 pt-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1.5 text-[0.8rem] font-medium text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-600"
            >
              Open admin data tools
            </button>
            <button
              type="button"
              onClick={resetSelectionToRegion}
              className="text-[11px] text-slate-500 hover:text-slate-300"
            >
              Reset to region
            </button>
          </footer>
        </aside>
      </div>

      {/* Bottom region selector */}
      <div className="flex justify-center pb-4">
        <div className="inline-flex rounded-full border border-slate-700 bg-black/80 px-1 py-1 shadow-sm shadow-slate-900/80 backdrop-blur">
          {REGION_LABELS.map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                if (r.id === region) return;
                setRegion(r.id);
                const meta = REGION_META[r.id];
                setSelection({
                  region: r.id,
                  level: 'country',
                  id: r.id,
                  name: meta.title,
                });
              }}
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
      </div>
    </main>
  );
};

export default AdminStateExplorer;
