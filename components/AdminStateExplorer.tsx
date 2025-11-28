// components/AdminStateExplorer.tsx
import React, { useEffect, useMemo, useState } from 'react';
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

// a small hand-picked set of "edge" states for quick hops
const EDGE_STATES: { id: string; name: string }[] = [
  { id: 'CA', name: 'California' },
  { id: 'WA', name: 'Washington' },
  { id: 'AK', name: 'Alaska' },
  { id: 'HI', name: 'Hawaii' },
  { id: 'TX', name: 'Texas' },
  { id: 'FL', name: 'Florida' },
  { id: 'ME', name: 'Maine' },
  { id: 'NY', name: 'New York' },
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

  // lock page scroll so zoom vs scroll never fight
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const isUS = region === 'unitedStates';
  const zoomedIn = viewAltitude !== null && viewAltitude < 1.7;

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

  // "far away" quick jump chips – just edge states, minus the current one
  const farJumpStates = useMemo(() => {
    if (!isUS) return [];
    const current = resolveStateCode(selected.id);
    return EDGE_STATES.filter(s => s.id !== current);
  }, [isUS, selected.id]);

  return (
    <main className="relative h-[calc(100vh-4rem)] overflow-hidden bg-black text-slate-50">
      {/* Full-bleed globe */}
      <div className="absolute inset-0">
        <GlobeStates
          region={region}
          onRegionChange={handleRegionChange}
          onStateSelect={handleStateSelectFromGlobe}
          onViewChange={alt => setViewAltitude(alt)}
        />
      </div>

      {/* Overlays */}
      <div className="relative z-10 flex h-full flex-col pointer-events-none">
        {/* Top crumb + region tabs + quick jump chips */}
        <div className="pointer-events-auto">
          <div className="mx-auto w-full max-w-6xl px-4 pt-4 pb-3">
            <div className="mb-2 flex flex-wrap items-baseline gap-3">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-sky-400">
                {crumbScope}
              </p>
              <p className="text-[0.75rem] text-slate-300">{crumbLine}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-full border border-slate-700/70 bg-black/80 px-1 py-1 shadow-sm shadow-slate-900/80">
                {regionLabels.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRegionChange(r.id)}
                    className={
                      'rounded-full px-4 py-1.5 text-[11px] transition ' +
                      (region === r.id
                        ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40'
                        : 'text-slate-300 hover:text-slate-50')
                    }
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.40)]" />
                <span>
                  Drag to spin · Hover to “lift” · Scroll to zoom · Click to drill in
                </span>
              </div>
            </div>

            {/* Compact quick-jump chips, only when zoomed in on US */}
            {isUS && zoomedIn && farJumpStates.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[0.72rem]">
                <span className="mr-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Edge hops
                </span>
                {farJumpStates.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelected({ id: s.id, name: s.name })}
                    className="rounded-full border border-sky-500/40 bg-black/70 px-2 py-1 text-[0.72rem] text-slate-100 shadow-sm shadow-sky-500/20 transition hover:bg-sky-500/30"
                  >
                    {s.id} · {s.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right-hand metrics card, floating over the globe */}
        <div className="flex flex-1 items-start justify-end">
          <div className="pointer-events-auto mx-auto flex w-full max-w-6xl justify-end px-4 pb-5">
            {selected.name && (
              <section className="w-full max-w-sm rounded-3xl border border-slate-700/70 bg-black/85 shadow-[0_22px_60px_rgba(0,0,0,0.75)] backdrop-blur">
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
      </div>
    </main>
  );
};

export default AdminStateExplorer;
