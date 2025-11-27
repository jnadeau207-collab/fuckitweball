// components/admin/AdminStateExplorer.tsx
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Region = 'west' | 'midwest' | 'south' | 'northeast' | 'pacific';

type StateRow = {
  region: Region;
  y: number; // vertical position as % within the map box
  startX: number; // starting x%
  spacing: number; // x% between bubbles
  states: { code: string; name: string }[];
};

type StateBubble = {
  code: string;
  name: string;
  region: Region;
  x: number;
  y: number;
  rowIndex: number;
  colIndex: number;
};

type StateStats = {
  batches: number;
  activeBatches: number;
  labs: number;
  labResults: number;
  flaggedBatches: number;
};

const STATE_ROWS: StateRow[] = [
  {
    region: 'west',
    y: 30,
    startX: 10,
    spacing: 6.2,
    states: [
      { code: 'WA', name: 'Washington' },
      { code: 'OR', name: 'Oregon' },
      { code: 'CA', name: 'California' },
      { code: 'NV', name: 'Nevada' },
      { code: 'ID', name: 'Idaho' },
      { code: 'MT', name: 'Montana' },
      { code: 'WY', name: 'Wyoming' },
      { code: 'UT', name: 'Utah' },
      { code: 'CO', name: 'Colorado' },
      { code: 'AZ', name: 'Arizona' },
      { code: 'NM', name: 'New Mexico' },
    ],
  },
  {
    region: 'midwest',
    y: 48,
    startX: 18,
    spacing: 5.7,
    states: [
      { code: 'ND', name: 'North Dakota' },
      { code: 'SD', name: 'South Dakota' },
      { code: 'NE', name: 'Nebraska' },
      { code: 'KS', name: 'Kansas' },
      { code: 'MN', name: 'Minnesota' },
      { code: 'IA', name: 'Iowa' },
      { code: 'MO', name: 'Missouri' },
      { code: 'WI', name: 'Wisconsin' },
      { code: 'IL', name: 'Illinois' },
      { code: 'MI', name: 'Michigan' },
      { code: 'IN', name: 'Indiana' },
      { code: 'OH', name: 'Ohio' },
    ],
  },
  {
    region: 'south',
    y: 66,
    startX: 16,
    spacing: 5.9,
    states: [
      { code: 'TX', name: 'Texas' },
      { code: 'OK', name: 'Oklahoma' },
      { code: 'AR', name: 'Arkansas' },
      { code: 'LA', name: 'Louisiana' },
      { code: 'MS', name: 'Mississippi' },
      { code: 'AL', name: 'Alabama' },
      { code: 'TN', name: 'Tennessee' },
      { code: 'KY', name: 'Kentucky' },
      { code: 'GA', name: 'Georgia' },
      { code: 'SC', name: 'South Carolina' },
      { code: 'NC', name: 'North Carolina' },
      { code: 'VA', name: 'Virginia' },
      { code: 'WV', name: 'West Virginia' },
      { code: 'MD', name: 'Maryland' },
      { code: 'DC', name: 'District of Columbia' },
      { code: 'DE', name: 'Delaware' },
    ],
  },
  {
    region: 'northeast',
    y: 34,
    startX: 58,
    spacing: 4.8,
    states: [
      { code: 'PA', name: 'Pennsylvania' },
      { code: 'NJ', name: 'New Jersey' },
      { code: 'NY', name: 'New York' },
      { code: 'CT', name: 'Connecticut' },
      { code: 'RI', name: 'Rhode Island' },
      { code: 'MA', name: 'Massachusetts' },
      { code: 'VT', name: 'Vermont' },
      { code: 'NH', name: 'New Hampshire' },
      { code: 'ME', name: 'Maine' },
    ],
  },
  {
    region: 'pacific',
    y: 80,
    startX: 14,
    spacing: 10,
    states: [
      { code: 'AK', name: 'Alaska' },
      { code: 'HI', name: 'Hawaii' },
    ],
  },
];

// Tiny helper to keep classNames readable
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Soft mock stats so the UI feels alive
const DEFAULT_STATS: StateStats = {
  batches: 0,
  activeBatches: 0,
  labs: 0,
  labResults: 0,
  flaggedBatches: 0,
};

const MOCK_STATE_STATS: Record<string, StateStats> = {
  ME: {
    batches: 1,
    activeBatches: 1,
    labs: 1,
    labResults: 1,
    flaggedBatches: 0,
  },
};

const REGION_GRADIENT: Record<Region, string> = {
  west: 'from-cyan-300/85 via-sky-400/40 to-indigo-500/90',
  midwest: 'from-teal-300/90 via-emerald-300/40 to-sky-500/90',
  south: 'from-amber-300/85 via-orange-400/40 to-rose-400/85',
  northeast: 'from-fuchsia-300/85 via-violet-400/40 to-sky-400/90',
  pacific: 'from-cyan-200/80 via-sky-300/40 to-indigo-400/90',
};

const bubbleLayout: StateBubble[] = STATE_ROWS.flatMap((row, rowIndex) =>
  row.states.map((s, colIndex) => ({
    code: s.code,
    name: s.name,
    region: row.region,
    x: row.startX + row.spacing * colIndex,
    y: row.y + Math.sin((colIndex + rowIndex) * 0.7) * 3, // tiny wave so it feels organic
    rowIndex,
    colIndex,
  }))
);

export default function AdminStateExplorer() {
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedCode, setSelectedCode] = useState<string>('ME');
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  const ADMIN_EMAILS = useMemo(
    () =>
      (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
    []
  );

  // If no admin email list is configured, any signed-in user is treated as admin.
  const isAdmin =
    !!session &&
    (ADMIN_EMAILS.length === 0 ||
      !!session.user?.email &&
        ADMIN_EMAILS.includes(session.user.email.toLowerCase()));

  const selectedBubble =
    bubbleLayout.find((b) => b.code === selectedCode) ?? bubbleLayout[0];
  const selectedStats = MOCK_STATE_STATS[selectedCode] ?? DEFAULT_STATS;

  function handleOpenStateDataset() {
    router.push(`/admin/states/${selectedCode}`);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.12),transparent_60%)] bg-slate-950 text-slate-50">
      {/* Top nav / brand bar */}
      <header className="border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 shadow-[0_0_40px_rgba(56,189,248,0.65)]">
              <span className="text-lg font-black tracking-tight text-slate-950">
                C
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-50">
                CartFax
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                Cannabis Retail Transparency
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="rounded-full bg-slate-900/80 px-3 py-1 text-slate-300">
              Atlas
            </span>
            {isAdmin && (
              <Link
                href="/admin/batches"
                className="rounded-full bg-sky-500/10 px-3 py-1 font-medium text-sky-300 ring-1 ring-sky-500/40 hover:bg-sky-500/20"
              >
                Admin data tools
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-10 pt-8 lg:flex-row">
        {/* Left: soft-tile map */}
        <div className="relative flex-1 rounded-[40px] border border-slate-800/80 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.14),transparent_60%)] bg-slate-950/80 p-5 shadow-[0_40px_120px_rgba(15,23,42,0.9)]">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-300">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                CartFax • Atlas
              </div>
              <h1 className="mt-3 text-2xl font-semibold text-slate-50">
                United States Cannabis Safety Atlas
              </h1>
              <p className="mt-1 max-w-xl text-sm text-slate-400">
                A soft, breathing field of state bubbles. Hover to bring a state
                forward. Click to lock focus and open its dataset.
              </p>
            </div>

            <div className="hidden flex-col items-end gap-2 text-[11px] text-slate-400 sm:flex">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
                Active batches
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(248,113,113,0.9)]" />
                Flagged lots
              </div>
            </div>
          </div>

          <div className="relative mt-4 h-[420px] overflow-visible">
            {/* soft background glow */}
            <div className="pointer-events-none absolute inset-[10%] rounded-[50px] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.08),transparent_65%)] blur-3xl" />

            {bubbleLayout.map((bubble) => {
              const isSelected = bubble.code === selectedCode;
              const isHovered = bubble.code === hoveredCode;
              const stats = MOCK_STATE_STATS[bubble.code] ?? DEFAULT_STATS;

              const baseZ =
                10 + bubble.rowIndex * 2 + bubble.colIndex * 0.2;
              const zIndex = isHovered ? 60 : isSelected ? 50 : baseZ;

              const scale = isHovered || isSelected ? 1.08 : 1;
              const glowOpacity =
                stats.flaggedBatches > 0 ? 0.9 : stats.activeBatches > 0 ? 0.7 : 0.25;

              const regionGradient = REGION_GRADIENT[bubble.region];

              return (
                <button
                  key={bubble.code}
                  type="button"
                  onClick={() => setSelectedCode(bubble.code)}
                  onMouseEnter={() => setHoveredCode(bubble.code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  className="group absolute"
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    zIndex,
                    transition:
                      'transform 160ms ease-out, box-shadow 160ms ease-out',
                  }}
                >
                  {/* glow halo */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[999px] blur-xl"
                    style={{
                      opacity: glowOpacity,
                      background:
                        'radial-gradient(circle at center, rgba(56,189,248,0.35), transparent 60%)',
                    }}
                  />

                  {/* glass bubble */}
                  <div
                    className={cn(
                      'relative flex min-w-[3.1rem] items-center justify-center rounded-[999px] border border-white/16 px-4 py-2.5 text-xs font-semibold tracking-[0.24em] uppercase text-slate-50 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.9)]',
                      'bg-gradient-to-br',
                      regionGradient,
                      isSelected &&
                        'ring-2 ring-sky-300/80 shadow-[0_0_48px_rgba(56,189,248,0.9)]',
                      isHovered && !isSelected && 'ring-1 ring-sky-200/60'
                    )}
                  >
                    <span className="drop-shadow-[0_0_8px_rgba(15,23,42,0.8)]">
                      {bubble.code}
                    </span>
                    {stats.flaggedBatches > 0 && (
                      <span className="ml-2 inline-flex h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]" />
                    )}
                    {stats.activeBatches > 0 && stats.flaggedBatches === 0 && (
                      <span className="ml-2 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: selected state & admin tools */}
        <aside className="flex w-full max-w-md flex-col gap-4 lg:w-[360px]">
          {/* Selected state summary */}
          <div className="rounded-[32px] border border-slate-800/80 bg-slate-950/80 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.9)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                  Selected state
                </span>
              </div>
              <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold text-sky-200">
                {selectedBubble.code}
              </span>
            </div>

            <h2 className="text-lg font-semibold text-slate-50">
              {selectedBubble.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Exploring all batches CartFax currently has mapped into{' '}
              <span className="font-medium text-sky-200">
                {selectedBubble.code}
              </span>
              . Use this as a jumping-off point into messy datasets.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl bg-slate-900/80 p-3">
                <div className="text-[11px] text-slate-400">Active batches</div>
                <div className="mt-1 text-lg font-semibold text-emerald-300">
                  {selectedStats.activeBatches}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-900/80 p-3">
                <div className="text-[11px] text-slate-400">
                  Lab results linked
                </div>
                <div className="mt-1 text-lg font-semibold text-sky-300">
                  {selectedStats.labResults}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-900/80 p-3">
                <div className="text-[11px] text-slate-400">Labs in atlas</div>
                <div className="mt-1 text-lg font-semibold text-fuchsia-300">
                  {selectedStats.labs}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-900/80 p-3">
                <div className="text-[11px] text-slate-400">
                  Flagged batches
                </div>
                <div className="mt-1 text-lg font-semibold text-rose-300">
                  {selectedStats.flaggedBatches}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenStateDataset}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_15px_45px_rgba(56,189,248,0.85)] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              Open {selectedBubble.code} dataset
              <span className="text-xs" aria-hidden>
                ↗
              </span>
            </button>
          </div>

          {/* Admin tools panel */}
          {isAdmin && (
            <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/85 p-4 text-xs shadow-[0_24px_70px_rgba(15,23,42,0.9)]">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-[13px] font-semibold text-slate-100">
                  Atlas data tools
                </h3>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-emerald-400/40">
                  Admin
                </span>
              </div>

              <p className="mb-3 text-[11px] leading-relaxed text-slate-400">
                Shortcuts into the messy bits: COAs, batches, and state-level
                rollups. These will grow as we wire in more scrapers and
                parsers.
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleOpenStateDataset}
                  className="flex w-full items-center justify-between rounded-2xl bg-slate-900/90 px-3 py-2.5 text-left text-[11px] text-slate-200 hover:bg-slate-800/80"
                >
                  <span>
                    Open{' '}
                    <span className="font-semibold">{selectedBubble.code}</span>{' '}
                    batches & lab results
                  </span>
                  <span className="text-xs text-sky-300">↗</span>
                </button>

                <Link
                  href="/admin/uploads"
                  className="flex w-full items-center justify-between rounded-2xl bg-slate-900/90 px-3 py-2.5 text-[11px] text-slate-200 hover:bg-slate-800/80"
                >
                  <span>COA uploads & parsing</span>
                  <span className="text-xs text-sky-300">↗</span>
                </Link>

                <Link
                  href="/admin/batches"
                  className="flex w-full items-center justify-between rounded-2xl bg-slate-900/90 px-3 py-2.5 text-[11px] text-slate-200 hover:bg-slate-800/80"
                >
                  <span>Global batch catalog</span>
                  <span className="text-xs text-sky-300">↗</span>
                </Link>
              </div>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
