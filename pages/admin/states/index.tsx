// pages/admin/states/index.tsx
import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

type RegionId = 'all' | 'northeast' | 'south' | 'midwest' | 'west';

type StateMeta = {
  code: string;
  name: string;
  region: RegionId;
};

// 50 states (we’ll treat DC separately via batches if you add it later)
const STATES: StateMeta[] = [
  // Northeast
  { code: 'ME', name: 'Maine', region: 'northeast' },
  { code: 'NH', name: 'New Hampshire', region: 'northeast' },
  { code: 'VT', name: 'Vermont', region: 'northeast' },
  { code: 'MA', name: 'Massachusetts', region: 'northeast' },
  { code: 'RI', name: 'Rhode Island', region: 'northeast' },
  { code: 'CT', name: 'Connecticut', region: 'northeast' },
  { code: 'NY', name: 'New York', region: 'northeast' },
  { code: 'NJ', name: 'New Jersey', region: 'northeast' },
  { code: 'PA', name: 'Pennsylvania', region: 'northeast' },

  // South
  { code: 'DE', name: 'Delaware', region: 'south' },
  { code: 'MD', name: 'Maryland', region: 'south' },
  { code: 'VA', name: 'Virginia', region: 'south' },
  { code: 'WV', name: 'West Virginia', region: 'south' },
  { code: 'NC', name: 'North Carolina', region: 'south' },
  { code: 'SC', name: 'South Carolina', region: 'south' },
  { code: 'GA', name: 'Georgia', region: 'south' },
  { code: 'FL', name: 'Florida', region: 'south' },
  { code: 'KY', name: 'Kentucky', region: 'south' },
  { code: 'TN', name: 'Tennessee', region: 'south' },
  { code: 'AL', name: 'Alabama', region: 'south' },
  { code: 'MS', name: 'Mississippi', region: 'south' },
  { code: 'LA', name: 'Louisiana', region: 'south' },
  { code: 'AR', name: 'Arkansas', region: 'south' },
  { code: 'OK', name: 'Oklahoma', region: 'south' },
  { code: 'TX', name: 'Texas', region: 'south' },

  // Midwest
  { code: 'OH', name: 'Ohio', region: 'midwest' },
  { code: 'MI', name: 'Michigan', region: 'midwest' },
  { code: 'IN', name: 'Indiana', region: 'midwest' },
  { code: 'IL', name: 'Illinois', region: 'midwest' },
  { code: 'WI', name: 'Wisconsin', region: 'midwest' },
  { code: 'MN', name: 'Minnesota', region: 'midwest' },
  { code: 'IA', name: 'Iowa', region: 'midwest' },
  { code: 'MO', name: 'Missouri', region: 'midwest' },
  { code: 'ND', name: 'North Dakota', region: 'midwest' },
  { code: 'SD', name: 'South Dakota', region: 'midwest' },
  { code: 'NE', name: 'Nebraska', region: 'midwest' },
  { code: 'KS', name: 'Kansas', region: 'midwest' },

  // West
  { code: 'MT', name: 'Montana', region: 'west' },
  { code: 'WY', name: 'Wyoming', region: 'west' },
  { code: 'CO', name: 'Colorado', region: 'west' },
  { code: 'NM', name: 'New Mexico', region: 'west' },
  { code: 'ID', name: 'Idaho', region: 'west' },
  { code: 'UT', name: 'Utah', region: 'west' },
  { code: 'AZ', name: 'Arizona', region: 'west' },
  { code: 'NV', name: 'Nevada', region: 'west' },
  { code: 'WA', name: 'Washington', region: 'west' },
  { code: 'OR', name: 'Oregon', region: 'west' },
  { code: 'CA', name: 'California', region: 'west' },
  { code: 'AK', name: 'Alaska', region: 'west' },
  { code: 'HI', name: 'Hawaii', region: 'west' },
];

const REGIONS: { id: RegionId; label: string }[] = [
  { id: 'all', label: 'All regions' },
  { id: 'northeast', label: 'Northeast' },
  { id: 'south', label: 'South' },
  { id: 'midwest', label: 'Midwest' },
  { id: 'west', label: 'West' },
];

export default function AdminStatesAtlas() {
  const { data: session } = useSession();
  const router = useRouter();
  const [regionFilter, setRegionFilter] = useState<RegionId>('all');
  const [hovered, setHovered] = useState<StateMeta | null>(null);
  const [selected, setSelected] = useState<StateMeta | null>(null);

  const statesForRegion = useMemo(
    () =>
      regionFilter === 'all'
        ? STATES
        : STATES.filter((s) => s.region === regionFilter),
    [regionFilter]
  );

  const active = selected || hovered;

  if (!session) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-300">
          Sign in as an admin to explore state-level batches.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <button
        onClick={() => router.push('/admin')}
        className="text-xs text-slate-400 hover:text-emerald-400"
      >
        ← Back to admin
      </button>

      {/* Header / hero */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-100">
          CartFax Atlas
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Pick a state to drill into batches, labs, and locations. The
          layout is intentionally more “art” than cartography, but every
          tile is a real state button.
        </p>
      </div>

      {/* Main layout: left = art map, right = info & list */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.5fr)]">
        {/* Left: Stylized "map" of states */}
        <div className="relative rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
          {/* background glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.15),_transparent_55%)]" />

          <div className="relative flex flex-col h-full">
            {/* Region filter */}
            <div className="flex gap-2 px-4 pt-4 pb-2 flex-wrap">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRegionFilter(r.id);
                    setHovered(null);
                  }}
                  className={`px-3 py-1.5 rounded-full text-[11px] border transition-colors ${
                    regionFilter === r.id
                      ? 'border-emerald-400/80 bg-emerald-500/10 text-emerald-200'
                      : 'border-slate-700 bg-slate-900/80 text-slate-300 hover:border-emerald-400/40 hover:text-emerald-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* State "constellation" */}
            <div className="flex-1 px-4 pb-4">
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 h-full p-4">
                <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
                  <span>
                    {statesForRegion.length} states{' '}
                    {regionFilter === 'all'
                      ? 'available'
                      : `in the ${REGIONS.find((r) => r.id === regionFilter)?.label ?? 'region'
                        }`}
                  </span>
                  <span className="hidden sm:inline">
                    Hover to preview · Click to open detail
                  </span>
                </div>

                {/* The "art": dense grid of pill buttons */}
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 pt-1">
                  {statesForRegion.map((s) => (
                    <button
                      key={s.code}
                      onMouseEnter={() => setHovered(s)}
                      onMouseLeave={() => setHovered((prev) =>
                        prev?.code === s.code ? null : prev
                      )}
                      onClick={() => {
                        setSelected(s);
                        router.push(`/admin/states/${s.code}`);
                      }}
                      className={`group relative px-2 py-1 rounded-full border text-[11px] font-mono tracking-tight transition-all
                        ${
                          active?.code === s.code
                            ? 'border-emerald-400 bg-emerald-500/10 text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.4)]'
                            : 'border-slate-700/80 bg-slate-900/80 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-100'
                        }`}
                    >
                      <span>{s.code}</span>
                      {/* Tiny indicator dot to give it "map" vibes */}
                      <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400/60 group-hover:bg-emerald-300/90" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: currently hovered/selected & full list */}
        <div className="flex flex-col gap-4">
          {/* Active state summary */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/75 p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-200">
                {active
                  ? `${active.name} (${active.code})`
                  : 'Pick a state'}
              </h2>
              {active && (
                <button
                  onClick={() =>
                    router.push(`/admin/states/${active.code}`)
                  }
                  className="px-3 py-1.5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-medium hover:bg-emerald-400"
                >
                  Open {active.code} detail →
                </button>
              )}
            </div>

            {active ? (
              <>
                <p className="text-xs text-slate-400">
                  Drill into batches and lab results currently known for{' '}
                  <span className="text-slate-100 font-medium">
                    {active.name}
                  </span>
                  . As you ingest more COAs and location data, this view
                  will feel more like a “compliance radar” than a list.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-2 py-2">
                    <div className="text-slate-400 mb-0.5">
                      Region
                    </div>
                    <div className="text-slate-100">
                      {
                        REGIONS.find(
                          (r) => r.id === active.region
                        )?.label
                      }
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900/70 px-2 py-2">
                    <div className="text-slate-400 mb-0.5">
                      State code
                    </div>
                    <div className="text-slate-100 font-mono">
                      {active.code}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-500">
                Hover over a tile in the art-map or pick one from the list
                below to see a quick summary and jump into the detailed
                batch view.
              </p>
            )}
          </div>

          {/* Compact list view (accessible fallback) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/75 p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-slate-200">
                States
              </h2>
              <span className="text-[11px] text-slate-500">
                {statesForRegion.length} shown
              </span>
            </div>

            <div className="max-h-[260px] overflow-auto pr-1 text-xs space-y-1">
              {statesForRegion.map((s) => (
                <button
                  key={s.code}
                  onClick={() => {
                    setSelected(s);
                    router.push(`/admin/states/${s.code}`);
                  }}
                  onMouseEnter={() => setHovered(s)}
                  onMouseLeave={() =>
                    setHovered((prev) =>
                      prev?.code === s.code ? null : prev
                    )
                  }
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg border text-left transition-colors
                    ${
                      active?.code === s.code
                        ? 'border-emerald-400/80 bg-emerald-500/10 text-emerald-100'
                        : 'border-slate-800 bg-slate-900/80 text-slate-200 hover:border-emerald-400/60 hover:text-emerald-100'
                    }`}
                >
                  <span>
                    {s.name}{' '}
                    <span className="text-[10px] text-slate-400">
                      ({s.code})
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {REGIONS.find((r) => r.id === s.region)?.label ??
                      ''}
                  </span>
                </button>
              ))}

              {statesForRegion.length === 0 && (
                <div className="text-xs text-slate-500">
                  No states in this region yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
