// components/StateSnapshotCard.tsx
import React from 'react';
import { StateSnapshot } from '../lib/stateSnapshots';

type StateSnapshotCardProps = {
  snapshot: StateSnapshot | null;
  selectedStateId: string | null;
  selectedStateName: string | null;
  mode: 'state' | 'region';
  onOpenAdmin?: () => void;
};

const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 });

export const StateSnapshotCard: React.FC<StateSnapshotCardProps> = ({
  snapshot,
  selectedStateId,
  selectedStateName,
  mode,
  onOpenAdmin,
}) => {
  const hasData = !!snapshot;

  const titlePrefix =
    mode === 'state'
      ? selectedStateId
        ? `${selectedStateId} · State snapshot`
        : 'State snapshot'
      : selectedStateName
      ? `${selectedStateName} · Region snapshot`
      : 'Region snapshot';

  const displayName =
    snapshot?.name || selectedStateName || 'No state selected';

  // For "no data yet" states, we’ll show softer placeholder copy
  const coveragePct = snapshot?.coverageScore ?? 0;
  const coverageLabel = hasData
    ? `${coveragePct}% estimated market coverage`
    : 'Coverage data coming soon';

  return (
    <section className="pointer-events-auto fixed bottom-6 right-6 z-30 max-w-md rounded-3xl bg-white/90 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/70 backdrop-blur-md">
      <header className="border-b border-slate-100 px-6 pt-4 pb-3 text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
        {titlePrefix}
      </header>

      <div className="px-6 pb-4 pt-3">
        <h2 className="text-lg font-semibold text-slate-900">{displayName}</h2>

        {hasData ? (
          <>
            <p className="mt-1 text-xs text-slate-500">
              This is a live-style safety snapshot for{' '}
              <span className="font-medium">{snapshot!.name}</span>. In production
              this panel will connect directly to CartFax batch, COA, lab, and
              recall streams.
            </p>

            {/* Key metrics */}
            <dl className="mt-4 grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl bg-slate-50 px-3 py-2">
                <dt className="text-[0.68rem] font-medium text-slate-400 uppercase tracking-[0.14em]">
                  Batches
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  {formatNumber(snapshot!.batchesTracked)}
                </dd>
              </div>

              <div className="rounded-2xl bg-slate-50 px-3 py-2">
                <dt className="text-[0.68rem] font-medium text-slate-400 uppercase tracking-[0.14em]">
                  Labs
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  {snapshot!.labsReporting}
                </dd>
              </div>

              <div className="rounded-2xl bg-slate-50 px-3 py-2">
                <dt className="text-[0.68rem] font-medium text-slate-400 uppercase tracking-[0.14em]">
                  Recalls
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  {snapshot!.recentRecalls}
                </dd>
              </div>
            </dl>

            {/* Coverage progress */}
            <div className="mt-4">
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
                {coverageLabel}
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="mt-1 text-xs text-slate-500">
              We don&apos;t have a full snapshot wired up for{' '}
              <span className="font-medium">
                {selectedStateName || 'this state'}
              </span>{' '}
              yet. In production, this panel will show live batch safety,
              lab coverage, and recall activity as soon as CartFax is wired
              into this market.
            </p>
          </>
        )}

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-600 hover:shadow-sky-500/60"
          >
            Open admin data tools
          </button>
          <span className="cursor-default text-[0.68rem] text-slate-400">
            Dismiss
          </span>
        </div>
      </div>
    </section>
  );
};
