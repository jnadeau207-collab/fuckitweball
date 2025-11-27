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

const regionLabels: { id: RegionId; label: string }[] = [
  { id: 'unitedStates', label: 'United States' },
  { id: 'canada', label: 'Canada' },
  { id: 'mexico', label: 'Mexico' },
  { id: 'netherlands', label: 'Netherlands' },
];

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

const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 });

/**
 * Take whatever ID the globe gives us (e.g. "CA" or "06") and resolve
 * a two-letter state code suitable for STATE_SNAPSHOTS lookups.
 */
const resolveStateCode = (rawId: string | null): string | null => {
  if (!rawId) return null;
  const trimmed = rawId.trim();
  if (!trimmed) return null;

  const upper = trimmed.toUpperCase();

  // Already looks like a postal code
  if (/^[A-Z]{2}$/.test(upper)) return upper;

  // FIPS → postal
  if (FIPS_TO_STATE_CODE[trimmed]) {
    return FIPS_TO_STATE_CODE[trimmed];
  }

  return null;
};

const AdminStateExplorer: React.FC = () => {
  const [region, setRegion] = useState<RegionId>('unitedStates');

  const [selected, setSelected] = useState<{
    id: string | null;
    name: string | null;
  }>({
    id: 'CA', // initial: CA, but globe may later send "06"
    name: 'California',
  });

  const [viewAltitude, setViewAltitude] = useState<number | null>(null);

  const isUS = region === 'unitedStates';
  const zoomedIn = viewAltitude !== null && viewAltitude < 1.6;
  const quickStates = zoomedIn && isUS ? US_STATES : [];

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

  const titlePrefix = isUS ? 'US · States' : 'Global · Regions';

  const detailTitle =
    activeSnapshot?.name || selected.name || (isUS ? 'United States of America' : 'Selected region');

  const detailKind = isUS ? 'State snapshot' : 'Region snapshot';

  const handleRegionChange = (next: RegionId) => {
    setRegion(next);

    const label = regionLabels.find(r => r.id === next)?.label ?? null;

    if (next === 'unitedStates') {
      // When coming back to US, default to CA if nothing obvious is selected
      setSelected(prev =>
        prev && prev.id
          ? prev
          : { id: 'CA', name: 'California' },
      );
    } else {
      // For other regions, treat the whole region as the selection
      setSelected({
        id: next.toUpperCase(),
        name: label,
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f7fafc] text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col px-6 pb-16 pt-6">
        {/* Top-left status */}
        <div className="mb-4 flex flex-wrap items-baseline gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-500">
            {titlePrefix}
          </p>
          <p className="text-xs text-slate-500">
            {selected.name
              ? `${displayStateCode ?? selected.id ?? ''} · ${
                  selected.name
                } — metallic glass tiles punched out of a spinning globe.`
              : 'Tap a region tile to open its safety & COA snapshot.'}
          </p>
        </div>

        {/* Centered region tabs + hint */}
        <div className="mb-6 flex flex-col items-center gap-3">
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
              Drag to spin · Hover to “lift” · Scroll to zoom · Click to drill
              in
            </span>
          </div>
        </div>

        {/* Globe centered */}
        <div className="flex w-full items-center justify-center">
          <div className="relative aspect-[16/9] w-full max-w-4xl">
            <div className="absolute inset-0">
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

      {/* Quick-jump overlay for US only, when zoomed in */}
      {quickStates.length > 0 && (
        <aside className="fixed left-6 top-1/2 z-30 hidden max-h-[420px] w-60 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white/95 px-3 py-3 text-[11px] text-slate-700 shadow-[0_18px_60px_rgba(15,23,42,0.16)] backdrop-blur lg:block">
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Quick jump
          </p>
          <div className="max-h-[360px] overflow-y-auto pr-1">
            {quickStates.map(s => {
              const currentCode = resolveStateCode(selected.id);
              const isSelectedState =
                (currentCode && currentCode === s.id) || selected.id === s.id;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelected({ id: s.id, name: s.name })}
                  className={
                    'mb-[3px] w-full rounded-full px-2 py-1 text-left transition ' +
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

      {/* Floating detail panel */}
      {selected.name && (
        <div className="fixed bottom-6 right-6 z-30 max-w-sm rounded-2xl border border-slate-200 bg-white/95 px-4 py-4 text-sm text-slate-800 shadow-[0_22px_70px_rgba(15,23,42,0.35)] backdrop-blur">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-500">
            {displayStateCode ?? selected.id ?? ''} · {detailKind}
          </p>

          <p className="mb-1 text-base font-semibold">
            {activeSnapshot?.name ?? detailTitle}
          </p>

          {isUS && activeSnapshot ? (
            <>
              <p className="mb-3 text-xs text-slate-500">
                Live-style safety snapshot for{' '}
                <span className="font-medium">{activeSnapshot.name}</span>. In
                production this panel will connect directly to CartFax batch,
                COA, lab, and recall streams.
              </p>

              {/* Key metrics */}
              <dl className="mb-3 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-2xl bg-slate-50 px-3 py-2">
                  <dt className="text-[0.68rem] font-medium text-slate-400 uppercase tracking-[0.14em]">
                    Batches
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    {formatNumber(activeSnapshot.batchesTracked)}
                  </dd>
                </div>

                <div className="rounded-2xl bg-slate-50 px-3 py-2">
                  <dt className="text-[0.68rem] font-medium text-slate-400 uppercase tracking-[0.14em]">
                    Labs
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">
                    {activeSnapshot.labsReporting}
                  </dd>
                </div>

                <div className="rounded-2xl bg-slate-50 px-3 py-2">
                  <dt className="text-[0.68rem] font-medium text-slate-400 uppercase tracking-[0.14em]">
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
                    className="h-2 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                    style={{ width: `${Math.min(coveragePct, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-[0.7rem] text-slate-500">
                  {coveragePct}% estimated coverage of the legal market in this
                  state.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="mb-4 text-xs text-slate-500">
                We don&apos;t have a full snapshot wired up for{' '}
                <span className="font-medium">{detailTitle}</span> yet. In
                production, this panel will show live batch safety, lab
                coverage, and recall activity as soon as CartFax is connected to
                this market.
              </p>
            </>
          )}

          <div className="flex items-center justify-between gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-medium text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-600"
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
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminStateExplorer;
