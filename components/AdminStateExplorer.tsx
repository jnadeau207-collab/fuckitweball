// components/AdminStateExplorer.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { RegionId } from './GlobeStates';
import { STATE_SNAPSHOTS, type StateSnapshot } from '../lib/stateSnapshots';

const GlobeStates = dynamic(() => import('./GlobeStates'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
      Loading 3D atlas…
    </div>
  ),
});

// Regions available on the globe
const regionLabels: { id: RegionId; label: string }[] = [
  { id: 'unitedStates', label: 'United States' },
  { id: 'canada', label: 'Canada' },
  { id: 'mexico', label: 'Mexico' },
  { id: 'netherlands', label: 'Netherlands' },
];

// Simple helper for formatting numbers in the UI
const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 });

// For the quick-jump pill list when zoomed in on the US
const US_STATES: { id: string; name: string }[] = [
  { id: 'AL', name: 'Alabama' },
  { id: 'AK', name: 'Alaska' },
  { id: 'AZ', name: 'Arizona' },
  { id: 'AR', name: 'Arkansas' },
  { id: 'CA', name: 'California' },
  { id: 'CO', name: 'Colorado' },
  { id: 'CT', name: 'Connecticut' },
  { id: 'DE', name: 'Delaware' },
  { id: 'FL', name: 'Florida' },
  { id: 'GA', name: 'Georgia' },
  { id: 'HI', name: 'Hawaii' },
  { id: 'ID', name: 'Idaho' },
  { id: 'IL', name: 'Illinois' },
  { id: 'IN', name: 'Indiana' },
  { id: 'IA', name: 'Iowa' },
  { id: 'KS', name: 'Kansas' },
  { id: 'KY', name: 'Kentucky' },
  { id: 'LA', name: 'Louisiana' },
  { id: 'ME', name: 'Maine' },
  { id: 'MD', name: 'Maryland' },
  { id: 'MA', name: 'Massachusetts' },
  { id: 'MI', name: 'Michigan' },
  { id: 'MN', name: 'Minnesota' },
  { id: 'MS', name: 'Mississippi' },
  { id: 'MO', name: 'Missouri' },
  { id: 'MT', name: 'Montana' },
  { id: 'NE', name: 'Nebraska' },
  { id: 'NV', name: 'Nevada' },
  { id: 'NH', name: 'New Hampshire' },
  { id: 'NJ', name: 'New Jersey' },
  { id: 'NM', name: 'New Mexico' },
  { id: 'NY', name: 'New York' },
  { id: 'NC', name: 'North Carolina' },
  { id: 'ND', name: 'North Dakota' },
  { id: 'OH', name: 'Ohio' },
  { id: 'OK', name: 'Oklahoma' },
  { id: 'OR', name: 'Oregon' },
  { id: 'PA', name: 'Pennsylvania' },
  { id: 'RI', name: 'Rhode Island' },
  { id: 'SC', name: 'South Carolina' },
  { id: 'SD', name: 'South Dakota' },
  { id: 'TN', name: 'Tennessee' },
  { id: 'TX', name: 'Texas' },
  { id: 'UT', name: 'Utah' },
  { id: 'VT', name: 'Vermont' },
  { id: 'VA', name: 'Virginia' },
  { id: 'WA', name: 'Washington' },
  { id: 'WV', name: 'West Virginia' },
  { id: 'WI', name: 'Wisconsin' },
  { id: 'WY', name: 'Wyoming' },
];

// FIPS → postal abbreviation map so we can resolve snapshot keys
const FIPS_TO_STATE_CODE: Record<string, string> = {
  '01': 'AL',
  '02': 'AK',
  '04': 'AZ',
  '05': 'AR',
  '06': 'CA',
  '08': 'CO',
  '09': 'CT',
  '10': 'DE',
  '11': 'DC',
  '12': 'FL',
  '13': 'GA',
  '15': 'HI',
  '16': 'ID',
  '17': 'IL',
  '18': 'IN',
  '19': 'IA',
  '20': 'KS',
  '21': 'KY',
  '22': 'LA',
  '23': 'ME',
  '24': 'MD',
  '25': 'MA',
  '26': 'MI',
  '27': 'MN',
  '28': 'MS',
  '29': 'MO',
  '30': 'MT',
  '31': 'NE',
  '32': 'NV',
  '33': 'NH',
  '34': 'NJ',
  '35': 'NM',
  '36': 'NY',
  '37': 'NC',
  '38': 'ND',
  '39': 'OH',
  '40': 'OK',
  '41': 'OR',
  '42': 'PA',
  '44': 'RI',
  '45': 'SC',
  '46': 'SD',
  '47': 'TN',
  '48': 'TX',
  '49': 'UT',
  '50': 'VT',
  '51': 'VA',
  '53': 'WA',
  '54': 'WV',
  '55': 'WI',
  '56': 'WY',
};

/**
 * Take whatever ID the globe gives us (e.g. "CA", "06", or even 6)
 * and resolve a two-letter state code suitable for STATE_SNAPSHOTS lookups.
 * This is where the “California works once, then breaks” bug was coming from.
 */
const resolveStateCode = (
  rawId: string | number | null,
): string | null => {
  if (rawId === null || rawId === undefined) return null;

  // Normalize everything to a trimmed string first
  const trimmed = String(rawId).trim();
  if (!trimmed) return null;

  const upper = trimmed.toUpperCase();

  // Already looks like a postal code (e.g. "CA")
  if (/^[A-Z]{2}$/.test(upper)) return upper;

  // FIPS → postal (e.g. "06" → "CA"). Handle unpadded numbers like "6".
  const fipsKey =
    trimmed.length === 1 ? trimmed.padStart(2, '0') : trimmed;

  if (FIPS_TO_STATE_CODE[fipsKey]) {
    return FIPS_TO_STATE_CODE[fipsKey];
  }

  return null;
};

const AdminStateExplorer: React.FC = () => {
  const [region, setRegion] = useState<RegionId>('unitedStates');

  const [selected, setSelected] = useState<{
    id: string | null;
    name: string | null;
  }>({
    id: 'CA', // initial: CA
    name: 'California',
  });

  const [viewAltitude, setViewAltitude] = useState<number | null>(null);

  const isUS = region === 'unitedStates';
  const zoomedIn = viewAltitude !== null && viewAltitude < 1.6;
  const quickStates = isUS && zoomedIn ? US_STATES : [];

  // For UI: what code should we *show* (CA vs 06)?
  const displayStateCode =
    isUS ? resolveStateCode(selected.id) ?? selected.id : selected.id;

  // For metrics: what key should we use to look up STATE_SNAPSHOTS?
  const snapshotKey = isUS ? resolveStateCode(selected.id) : null;

  const activeSnapshot: StateSnapshot | null =
    snapshotKey && STATE_SNAPSHOTS[snapshotKey]
      ? STATE_SNAPSHOTS[snapshotKey]
      : null;

  const coveragePct = activeSnapshot?.coverageScore ?? 0;

  const detailTitle =
    activeSnapshot?.name ||
    selected.name ||
    (isUS ? 'United States of America' : 'Selected region');

  const detailKind = isUS ? 'State snapshot' : 'Region snapshot';

  const handleRegionChange = (next: RegionId) => {
    setRegion(next);

    const label =
      regionLabels.find(r => r.id === next)?.label ?? null;

    if (next === 'unitedStates') {
      // When coming back to US, default to CA if nothing obvious is selected
      setSelected(prev =>
        prev && prev.id
          ? prev
          : { id: 'CA', name: 'California' },
      );
    } else {
      // For non-US regions we treat the region itself as the "selection"
      setSelected({
        id: next,
        name: label,
      });
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-3.5rem)] bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 lg:flex-row">
        {/* Left: globe + copy */}
        <div className="flex-1">
          {/* Header */}
          <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-400">
                CartFax · Atlas
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50">
                COA coverage across legal markets
              </h1>
              <p className="mt-1 max-w-xl text-sm text-slate-400">
                Spin the globe and click any state or region to see where
                CartFax is actively tracking batches, labs, and recalls.
                Data here is synthetic while we wire live feeds into the
                atlas.
              </p>
            </div>
          </header>

          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
            {/* Glow blobs */}
            <div className="pointer-events-none absolute -left-28 -top-32 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-[72px]" />

            <div className="relative flex flex-col gap-4 p-4 lg:p-5">
              {/* Region tabs + interaction hint */}
              <div className="flex flex-col items-center gap-3">
                <div className="inline-flex rounded-full border border-slate-200 bg-white px-1 py-1 shadow-sm">
                  {regionLabels.map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRegionChange(r.id)}
                      className={
                        'rounded-full px-4 py-1.5 text-[11px] transition ' +
                        (region === r.id
                          ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40'
                          : 'text-slate-500 hover:text-slate-900')
                      }
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.40)]" />
                  <span>
                    Drag to spin · Hover to “lift” · Scroll to zoom · Click to
                    drill in
                  </span>
                </div>
              </div>

              {/* Globe container */}
              <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
                <GlobeStates
                  region={region}
                  onRegionChange={handleRegionChange}
                  onStateSelect={(id, name) =>
                    setSelected({
                      id: id || null,
                      name: name || null,
                    })
                  }
                  onViewChange={alt => setViewAltitude(alt)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: explainer / meta */}
        <aside className="w-full max-w-sm space-y-4 lg:w-[320px]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.65)] backdrop-blur">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Why this exists
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-50">
              A single cockpit for cannabis safety data
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              CartFax ingests COAs from licensed labs, normalizes the data,
              and maps it down to batches, dispensaries, and brands. The
              atlas gives regulators, operators, and patients a live view of
              where safety data is strong—and where it&apos;s missing.
            </p>
            <p className="mt-3 text-[0.72rem] text-slate-500">
              Today you&apos;re seeing demo numbers so we can iterate on
              the experience while we finish wiring live ingestion,
              deduplication, and alerting pipelines.
            </p>
          </section>

          <section className="rounded-3xl border border-dashed border-emerald-500/40 bg-emerald-500/5 p-4 text-sm text-emerald-50">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Admin access
            </p>
            <p className="mt-1 text-sm text-emerald-50">
              If you&apos;re an operator, lab, or regulator, you can use the
              admin tools to manage batches, COA uploads, and locations in
              more detail.
            </p>
            <p className="mt-2 text-[0.75rem] text-emerald-200/80">
              Use the &ldquo;Log in&rdquo; button in the top-right, then
              come back to this atlas or open the dedicated admin hub.
            </p>
          </section>
        </aside>
      </div>

      {/* Quick-jump overlay for US only, when zoomed in */}
      {quickStates.length > 0 && (
        <aside className="pointer-events-auto fixed left-6 top-1/2 z-30 hidden max-h-[420px] w-[220px] -translate-y-1/2 rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-[0_18px_60px_rgba(15,23,42,0.16)] backdrop-blur lg:block">
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Quick jump
          </p>
          <div className="max-h-[360px] overflow-y-auto pr-1">
            {quickStates.map(s => {
              const currentCode = resolveStateCode(selected.id);
              const isSelectedState =
                (currentCode && currentCode === s.id) ||
                selected.id === s.id;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() =>
                    setSelected({ id: s.id, name: s.name })
                  }
                  className={
                    'mb-[3px] w-full rounded-full px-2 py-1 text-left text-[0.72rem] transition ' +
                    (isSelectedState
                      ? 'bg-sky-500 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100')
                  }
                >
                  {s.id} · {s.name}
                </button>
              );
            })}
          </div>
        </aside>
      )}

      {/* Floating detail panel for the current selection */}
      {selected.name && (
        <section className="fixed bottom-6 right-6 z-30 max-w-sm rounded-3xl border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.35)] backdrop-blur">
          <header className="border-b border-slate-100 px-4 pb-2 pt-3">
            <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-500">
              {displayStateCode ?? selected.id ?? ''} · {detailKind}
            </p>
            <h2 className="text-lg font-semibold text-slate-900">
              {detailTitle}
            </h2>
            <p className="mt-1 text-[0.78rem] text-slate-500">
              {activeSnapshot
                ? 'Synthetic coverage metrics while we connect live COA feeds and lab integrations.'
                : 'We haven’t wired live coverage here yet. COA parsing and map tiles are coming soon.'}
            </p>
          </header>

          {activeSnapshot && (
            <div className="px-4 pb-3 pt-3">
              <dl className="mb-4 grid grid-cols-2 gap-3 text-[0.78rem]">
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Batches tracked
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    {formatNumber(activeSnapshot.batchesTracked)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Labs reporting
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    {formatNumber(activeSnapshot.labsReporting)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Coverage score
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    {activeSnapshot.coverageScore}/100
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Recalls
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    {activeSnapshot.recentRecalls}
                  </dd>
                </div>
              </dl>

              {/* Coverage bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-[0.7rem] text-slate-500">
                  <span className="font-medium uppercase tracking-[0.16em]">
                    Coverage
                  </span>
                  <span className="font-semibold text-slate-700">
                    {coveragePct}%
                  </span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                    style={{
                      width: `${Math.min(coveragePct, 100)}%`,
                    }}
                  />
                </div>
                <p className="mt-1 text-[0.7rem] text-slate-500">
                  {coveragePct}% estimated coverage of the legal market in
                  this state.
                </p>
              </div>
            </div>
          )}

          <footer className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-2.5">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1.5 text-[0.78rem] font-medium text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-600"
            >
              Open admin data tools
            </Link>
            <button
              type="button"
              onClick={() => setSelected({ id: null, name: null })}
              className="text-[11px] text-slate-400 hover:text-slate-600"
            >
              Dismiss
            </button>
          </footer>
        </section>
      )}
    </main>
  );
};

export default AdminStateExplorer;
