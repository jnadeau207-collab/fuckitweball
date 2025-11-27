// components/AdminStateExplorer.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

type RegionId = 'unitedStates' | 'canada' | 'mexico' | 'netherlands';

// Load the heavy 3D globe only on the client (avoids SSR/window issues)
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
  const [selectedState, setSelectedState] = useState<{
    id: string | null;
    name: string | null;
  }>({
    id: 'CA',
    name: 'California',
  });

  return (
    <main className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-[#f6fafc] via-[#f5f8ff] to-[#eef4ff] text-slate-900">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        {/* Title */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            Regional cannabis safety &amp; COA explorer
          </h1>
        </header>

        {/* Main card */}
        <section className="rounded-[32px] border border-sky-100/80 bg-white/95 shadow-[0_28px_80px_rgba(15,23,42,0.20)] backdrop-blur-md">
          {/* Card header: breadcrumb + region switch + hint */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100/80 px-6 py-4 md:px-8 md:py-5">
            <div className="space-y-1">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-sky-500">
                US · States
              </p>
              <p className="text-xs text-slate-500">
                {selectedState.name
                  ? `${selectedState.id} · ${selectedState.name} — metallic glass tiles punched out of a spinning globe.`
                  : 'Tap a state tile to open its safety & COA snapshot.'}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="inline-flex rounded-full bg-slate-100/80 p-1">
                {regionLabels.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRegion(r.id)}
                    className={`px-3.5 py-1.5 text-[11px] rounded-full transition ${
                      region === r.id
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/40'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.45)]" />
                <span>Drag to spin · Hover to “lift” · Click to drill in</span>
              </div>
            </div>
          </div>

          {/* Globe canvas */}
          <div className="relative overflow-hidden rounded-[32px] px-4 pb-6 pt-4 md:px-6 md:pb-8">
            <div className="relative mx-auto aspect-[16/9] w-full max-w-5xl rounded-[28px] bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 shadow-[0_40px_120px_rgba(15,23,42,0.40)]">
              {/* 3D globe inside padded frame */}
              <div className="absolute inset-4">
                <GlobeStates
                  region={region}
                  onStateSelect={(id, name) =>
                    setSelectedState({
                      id: id || null,
                      name: name || null,
                    })
                  }
                />
              </div>

              {/* Soft vignette to make it feel inset */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/40 via-transparent to-white/40 mix-blend-soft-light" />
            </div>
          </div>

          {/* Placeholder: future “state detail” panel could go here below the globe */}
        </section>
      </div>
    </main>
  );
};

export default AdminStateExplorer;
