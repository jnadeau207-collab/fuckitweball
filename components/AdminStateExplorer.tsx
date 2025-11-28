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

const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 });

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

const resolveStateCode = (
  rawId: string | number | null,
): string | null => {
  if (rawId === null || rawId === undefined) return null;
  const trimmed = String(rawId).trim();
  if (!trimmed) return null;

  const upper = trimmed.toUpperCase();
  if (/^[A-Z]{2}$/.test(upper)) return upper;

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
    id: string | number | null;
    name: string | null;
  }>({
    id: 'CA',
    name: 'California',
  });

  const [viewAltitude, setViewAltitude] = useState<number | null>(null);

  const isUS = region === 'unitedStates';
  const zoomedIn = viewAltitude !== null && viewAltitude < 1.6;
  const quickStates = isUS && zoomedIn ? US_STATES : [];

  const displayStateCode =
    isUS
      ? resolveStateCode(selected.id) ?? String(selected.id ?? '')
      : String(selected.id ?? '');

  const snapshotKey = isUS ? resolveStateCode(selected.id) : null;

  const activeSnapshot: StateSnapshot | null =
    snapshotKey && STATE_SNAPSHOTS[snapshotKey]
      ? STATE_SNAPSHOTS[snapshotKey]
      : null;

  const coveragePct = activeSnapshot?.coverageScore ?? 0;
  const fullCoaRate = activeSnapshot?.fullCoaRate ?? 0;

  const detailTitle =
    activeSnapshot?.name ||
    selected.name ||
    (isUS ? 'United States of America' : 'Selected region');

  const detailKind = isUS ? 'State snapshot' : 'Region snapshot';

  const adminHref = snapshotKey ? `/admin?state=${snapshotKey}` : '/admin';

  const handleRegionChange = (next: RegionId) => {
    setRegion(next);

    const label =
      regionLabels.find(r => r.id === next)?.label ?? null;

    if (next === 'unitedStates') {
      setSelected(prev =>
        prev && prev.id
          ? prev
          : { id: 'CA', name: 'California' },
      );
    } else {
      setSelected({
        id: next,
        name: label,
      });
    }
  };

  const handleStateSelectFromGlobe = (
    id: string | number | null,
    name: string,
    coords?: { x: number; y: number },
  ) => {
    setSelected({
      id,
      name: name || null,
    });
  };

  const crumbScope = isUS ? 'US · States' : 'Global · Regions';

  const crumbLine = selected.name
    ? `${displayStateCode} · ${selected.name} — metallic glass tiles punched out of a spinning globe.`
    : 'Drag, hover, and click the atlas to explore live coverage.';

  return (
    <main className="flex min-h-screen flex-col bg-black text-slate-50">
      {/* Top crumb + region tabs */}
      <div className="mx-auto w-full max-w-5xl px-4 pt-6 pb-4">
        <div className="mb-3 flex flex-wrap items-baseline gap-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-sky-400">
            {crumbScope}
          </p>
          <p className="text-[0.75rem] text-slate-400">{crumbLine}</p>
        </div>

        <div className="flex flex-col items-center gap-3">
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
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.40)]" />
            <span>
              Drag to spin · Hover to “lift” · Scroll to zoom · Click to drill
              in
            </span>
          </div>
        </div>
      </div>

      {/* Centered globe with side rail for details */}
      <div className="mx-auto flex w-full flex-1 max-w-6xl flex-col gap-8 px-4 pb-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center justify-center">
          <div className="relative aspect-square w-full max-w-[840px]">
            {/* halo */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(8,47,73,0.8)_0%,rgba(8,47,73,0.35)_60%,rgba(0,0,0,0)_100%)]" />
            <div className="relative z-10 h-full w-full overflow-hidden rounded-full border border-slate-900 bg-black">
              <GlobeStates
                region={region}
                onRegionChange={handleRegionChange}
                onStateSelect={handleStateSelectFromGlobe}
                onViewChange={alt => setViewAltitude(alt)}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-[360px] space-y-4 lg:max-w-xs">
          {quickStates.length > 0 && (
            <aside className="rounded-3xl border border-slate-700 bg-black/70 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur">
              <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Quick jump
              </p>
              <div className="max-h-[360px] space-y-1 overflow-y-auto pr-1">
                {quickStates.map(s => {
                  const currentCode = resolveStateCode(selected.id);
                  const isSelectedState =
                    (currentCode && currentCode === s.id) ||
                    selected.id === s.id;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSelected({ id: s.id, name: s.name });
                      }}
                      className={
                        'w-full rounded-full px-2 py-1 text-left text-[0.72rem] transition ' +
                        (isSelectedState
                          ? 'bg-sky-500 text-white'
                          : 'bg-black text-slate-300 hover:bg-slate-800')
                      }
                    >
                      {s.id} · {s.name}
                    </button>
                  );
                })}
              </div>
            </aside>
          )}

          {selected.name && (
            <section className="rounded-3xl border border-slate-700 bg-black/80 shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur">
              <header className="border-b border-slate-800 px-4 pb-2 pt-3">
                <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-sky-400">
                  {displayStateCode ?? selected.id ?? ''} · {detailKind}
                </p>
                <h2 className="text-lg font-semibold text-slate-50">
                  {detailTitle}
                </h2>
                <p className="mt-1 text-[0.78rem] text-slate-400">
                  {activeSnapshot
                    ? 'Illustrative coverage metrics while we connect live COA feeds and lab integrations.'
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
                      <dd className="mt-1 text-sm font-semibold text-slate-50">
                        {formatNumber(activeSnapshot.batchesTracked)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                        Labs reporting
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-slate-50">
                        {formatNumber(activeSnapshot.labsReporting)}
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
                        {activeSnapshot.recentRecalls}
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
                      Metrics shown are illustrative only. In production this
                      panel will be driven by live batch, lab, and recall data
                      from your CartFax deployment.
                    </p>
                  </div>
                </div>
              )}

              <footer className="flex items-center justify-between gap-3 border-t border-slate-800 px-4 py-2.5">
                <Link
                  href={adminHref}
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-1.5 text-[0.78rem] font-medium text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-600"
                >
                  Open admin data tools
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSelected({ id: null, name: null });
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-300"
                >
                  Dismiss
                </button>
              </footer>
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminStateExplorer;
