// components/AdminStateExplorer.tsx

import React, { useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const NAME_TO_CODE: Record<string, string> = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District of Columbia': 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
  'Puerto Rico': 'PR',
};

type StateInfo = {
  code: string;
  name: string;
};

/**
 * Approximate state centers, used only for animation
 * (map shapes are still the exact official outlines).
 */
const STATE_POSITIONS: Record<string, { x: number; y: number }> = {
  // West / AK / HI
  WA: { x: 10, y: 18 },
  OR: { x: 13, y: 25 },
  CA: { x: 13, y: 40 },
  NV: { x: 21, y: 35 },
  AZ: { x: 23, y: 49 },
  UT: { x: 23, y: 39 },
  CO: { x: 30, y: 38 },
  NM: { x: 30, y: 50 },
  AK: { x: 10, y: 85 },
  HI: { x: 21, y: 88 },
  ID: { x: 19, y: 27 },
  MT: { x: 26, y: 20 },
  WY: { x: 26, y: 30 },

  // Rockies / Plains / Upper Midwest
  ND: { x: 36, y: 20 },
  SD: { x: 36, y: 28 },
  NE: { x: 36, y: 36 },
  KS: { x: 36, y: 44 },
  MN: { x: 44, y: 22 },
  IA: { x: 44, y: 30 },
  MO: { x: 44, y: 40 },
  WI: { x: 50, y: 22 },
  IL: { x: 50, y: 32 },
  MI: { x: 58, y: 22 },
  IN: { x: 58, y: 32 },
  OH: { x: 62, y: 32 },

  // South / Gulf / Lower Midwest
  TX: { x: 40, y: 60 },
  OK: { x: 39, y: 52 },
  AR: { x: 44, y: 48 },
  LA: { x: 44, y: 58 },
  MS: { x: 50, y: 54 },
  AL: { x: 54, y: 54 },
  TN: { x: 56, y: 46 },
  KY: { x: 58, y: 40 },
  GA: { x: 60, y: 60 },
  FL: { x: 62, y: 72 },
  SC: { x: 64, y: 58 },
  NC: { x: 68, y: 52 },
  VA: { x: 70, y: 44 },
  WV: { x: 66, y: 40 },

  // Northeast / Mid-Atlantic
  PA: { x: 66, y: 34 },
  NY: { x: 68, y: 26 },
  VT: { x: 70, y: 20 },
  NH: { x: 73, y: 19 },
  ME: { x: 80, y: 15 },
  MA: { x: 75, y: 24 },
  RI: { x: 77, y: 26 },
  CT: { x: 75, y: 28 },
  NJ: { x: 72, y: 30 },
  DE: { x: 73, y: 34 },
  MD: { x: 71, y: 36 },
  DC: { x: 70, y: 38 },
  PR: { x: 78, y: 80 },
};

// Dense cluster (New England / Mid-Atlantic)
const DENSE_STATES = new Set<string>([
  'RI',
  'CT',
  'MA',
  'NH',
  'VT',
  'NJ',
  'DE',
  'MD',
  'DC',
  'NY',
]);

// Tiny states that should blow up on hover
const TINY_STATES = new Set<string>(['RI', 'CT', 'DE', 'NJ', 'MA', 'DC']);

// New England detached to the right
const NEW_ENGLAND_DETACHED = new Set<string>(['ME', 'NH', 'VT', 'MA', 'RI', 'CT']);

// Layout offsets for detached New England — pulled in so they’re fully in-frame
const NEW_ENGLAND_LAYOUT: Record<string, { dx: number; dy: number }> = {
  ME: { dx: 45, dy: -60 },
  NH: { dx: 45, dy: -25 },
  VT: { dx: 45, dy: 10 },
  MA: { dx: 45, dy: 45 },
  RI: { dx: 45, dy: 80 },
  CT: { dx: 45, dy: 115 },
};

function generateMetrics(code: string) {
  const base = code.charCodeAt(0) + code.charCodeAt(1);
  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  return {
    batchesTracked: clamp(260 + (base % 320), 120, 580),
    labsReporting: clamp(3 + (base % 9), 2, 14),
    recentRecalls: base % 6,
    passingRate: clamp(82 + (base % 11), 78, 97),
  };
}

function getGeographyStyle(isSelected: boolean, transform: string) {
  // Default stroke: same family of blue as hover halo so it looks cohesive even at rest
  const baseStroke = isSelected ? '#0ea5e9' : '#38bdf8';

  const shared = {
    transform,
    transformBox: 'fill-box' as const,
    transformOrigin: 'center',
    shapeRendering: 'geometricPrecision' as const,
    vectorEffect: 'non-scaling-stroke' as const,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
    outline: 'none',
    willChange: 'transform, filter' as const,
    transition:
      'fill 140ms ease-out, stroke 140ms ease-out, filter 140ms ease-out, transform 120ms ease-out',
  };

  return {
    default: {
      ...shared,
      fill: 'url(#stateGlass)',
      stroke: baseStroke,
      strokeWidth: 1,
      filter: 'drop-shadow(0 4px 7px rgba(15,23,42,0.65))',
    },
    hover: {
      ...shared,
      fill: 'url(#stateGlassHover)',
      stroke: '#e5f5ff',
      strokeWidth: 1.15,
      cursor: 'pointer',
      filter: 'drop-shadow(0 9px 16px rgba(37,99,235,0.9))',
    },
    pressed: {
      ...shared,
      fill: 'url(#stateGlassActive)',
      stroke: '#020617',
      strokeWidth: 1.1,
      filter: 'drop-shadow(0 11px 20px rgba(22,101,52,0.9))',
    },
  } as const;
}

const DEFAULT_STATE: StateInfo = {
  code: 'CA',
  name: 'California',
};

const REGIONS = [
  {
    id: 'us',
    label: 'United States',
    pill: 'US · States',
    earthPosition: '42% 52%',
  },
  {
    id: 'ca',
    label: 'Canada',
    pill: 'Canada · Provinces',
    earthPosition: '58% 50%',
  },
];

export default function AdminStateExplorer() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const [selectedState, setSelectedState] = useState<StateInfo>(DEFAULT_STATE);
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [detailPanel, setDetailPanel] = useState<{
    state: StateInfo;
    x: number;
    y: number;
  } | null>(null);

  const [regionIndex, setRegionIndex] = useState(0);
  const activeRegion = REGIONS[regionIndex];

  const metrics = useMemo(
    () => generateMetrics(selectedState.code),
    [selectedState.code],
  );

  const mapCardRef = useRef<HTMLDivElement | null>(null);

  const handleMapMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const rect = mapCardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setPointer({ x, y });

    const rotateX = (y - 0.5) * 5;
    const rotateY = (0.5 - x) * 9;
    setTilt({ x: rotateY, y: rotateX });
  };

  const handleMapMouseLeave = () => {
    setPointer(null);
    setTilt({ x: 0, y: 0 });
  };

  const handleStateClick = (code: string, name: string, evt?: any) => {
    const nextState = { code, name };
    setSelectedState(nextState);

    if (mapCardRef.current && evt && typeof evt.clientX === 'number') {
      const rect = mapCardRef.current.getBoundingClientRect();
      const x = (evt.clientX - rect.left) / rect.width;
      const y = (evt.clientY - rect.top) / rect.height;
      const clampedX = Math.min(0.8, Math.max(0.2, x));
      const clampedY = Math.min(0.8, Math.max(0.2, y));
      setDetailPanel({ state: nextState, x: clampedX, y: clampedY });
    } else {
      setDetailPanel({ state: nextState, x: 0.5, y: 0.5 });
    }
  };

  const handleClosePanel = () => setDetailPanel(null);

  const currentLabel = `${selectedState.code} · ${selectedState.name}`;

  void pointer;

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-slate-900">
      <main className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-16 pt-4 md:px-8">
        {/* Heading */}
        <section className="pt-1">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
            Regional cannabis safety &amp; COA explorer
          </h1>
        </section>

        {/* MAP CARD */}
        <section className="relative mt-1">
          {/* Soft halo behind card */}
          <div className="pointer-events-none absolute inset-x-6 top-[-64px] h-72 rounded-[80px] bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.35),transparent_55%)] blur-3xl" />

          {/* Outer card – river rock gray, gradient into white, blue border */}
          <div
            ref={mapCardRef}
            onMouseMove={handleMapMouseMove}
            onMouseLeave={handleMapMouseLeave}
            className="relative mx-auto max-w-6xl rounded-[48px] border border-sky-400/45 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-50/0 px-[1.5px] pb-[1.5px] pt-[1.5px] shadow-[0_40px_120px_rgba(15,23,42,0.18)]"
          >
            <div className="relative overflow-hidden rounded-[46px] bg-gradient-to-b from-slate-100 via-slate-50 to-transparent px-5 pb-6 pt-5 md:px-7 md:pb-8 md:pt-6">
              <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-4">
                {/* Top row inside card */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-600">
                      {activeRegion.pill}
                    </p>
                    <p className="text-xs text-slate-600">
                      {currentLabel} · True state boundaries on a glass atlas.
                      Hover to tease them apart, click to drill in.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                    <span className="inline-flex h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_0_4px_rgba(56,189,248,0.35)]" />
                    <span>Move your mouse · Click a state</span>
                  </div>
                </div>

                {/* Region carousel controls */}
                <div className="flex flex-wrap items-center gap-2 px-1">
                  {REGIONS.map((region, idx) => {
                    const active = idx === regionIndex;
                    return (
                      <button
                        key={region.id}
                        type="button"
                        onClick={() => setRegionIndex(idx)}
                        className={
                          'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ' +
                          (active
                            ? 'border-sky-500 bg-sky-500 text-white shadow-[0_10px_30px_rgba(56,189,248,0.55)]'
                            : 'border-slate-300 bg-white/80 text-slate-700 hover:border-sky-400 hover:text-sky-700')
                        }
                      >
                        <span>{region.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Map block – Earth background + carousel + tilting map */}
                <div className="relative mx-auto mt-2 aspect-[19/10] w-full">
                  {/* Earth background, stretched into our ellipse, rotates via background-position */}
                  <div
                    className="pointer-events-none absolute inset-[14px] rounded-[999px] bg-[url('/earth-hero.jpg')] bg-cover bg-no-repeat"
                    style={{
                      backgroundPosition: activeRegion.earthPosition,
                      transition: 'background-position 600ms ease-out',
                    }}
                  >
                    {/* Soft white/silver/blue wash over the Earth for consistency with the UI */}
                    <div className="absolute inset-0 rounded-[999px] bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.9),transparent_60%),radial-gradient(circle_at_70%_82%,rgba(148,163,184,0.65),transparent_60%),radial-gradient(circle_at_center,rgba(59,130,246,0.6),transparent_70%)] mix-blend-soft-light" />
                  </div>

                  {/* Ground shadow */}
                  <div className="pointer-events-none absolute inset-x-20 bottom-4 h-24 rounded-[999px] bg-gradient-to-b from-transparent via-slate-700/35 to-black/75 blur-2xl" />

                  {/* Carousel container */}
                  <div className="relative z-10 h-full w-full overflow-hidden">
                    <div
                      className="flex h-full w-full transition-transform duration-500 ease-out"
                      style={{
                        transform: `translateX(-${regionIndex * 100}%)`,
                      }}
                    >
                      {/* Slide 1: United States map */}
                      <div className="h-full w-full flex-none">
                        <div
                          style={{
                            transform: `perspective(1600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) rotateZ(-3deg)`,
                          }}
                          className="h-full w-full transition-transform duration-150 ease-out"
                        >
                          <ComposableMap
                            projection="geoAlbersUsa"
                            projectionConfig={{
                              scale: 1300,
                            }}
                            width={975}
                            height={610}
                            className="relative h-full w-full"
                          >
                            <defs>
                              {/* Default glass: subtle forest green, mostly white/silver/blue */}
                              <radialGradient
                                id="stateGlass"
                                cx="30%"
                                cy="20%"
                                r="98%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#f9fafb"
                                  stopOpacity="1"
                                />
                                <stop
                                  offset="24%"
                                  stopColor="#e5e7eb"
                                  stopOpacity="0.98"
                                />
                                <stop
                                  offset="50%"
                                  stopColor="#ffffff"
                                  stopOpacity="1"
                                />
                                <stop
                                  offset="70%"
                                  stopColor="#e5e7eb"
                                  stopOpacity="0.96"
                                />
                                <stop
                                  offset="82%"
                                  stopColor="#166534"
                                  stopOpacity="0.22"
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#38bdf8"
                                  stopOpacity="0.98"
                                />
                              </radialGradient>

                              {/* Hovered glass: brighter blue, slightly stronger green rim */}
                              <radialGradient
                                id="stateGlassHover"
                                cx="28%"
                                cy="18%"
                                r="100%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#ffffff"
                                  stopOpacity="1"
                                />
                                <stop
                                  offset="30%"
                                  stopColor="#e0f2fe"
                                  stopOpacity="1"
                                />
                                <stop
                                  offset="60%"
                                  stopColor="#60a5fa"
                                  stopOpacity="0.99"
                                />
                                <stop
                                  offset="82%"
                                  stopColor="#22c55e"
                                  stopOpacity="0.8"
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#14532d"
                                  stopOpacity="0.9"
                                />
                              </radialGradient>

                              {/* Active / selected glass: deeper core */}
                              <radialGradient
                                id="stateGlassActive"
                                cx="30%"
                                cy="18%"
                                r="100%"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#f0fdf4"
                                  stopOpacity="1"
                                />
                                <stop
                                  offset="30%"
                                  stopColor="#bbf7d0"
                                  stopOpacity="1"
                                />
                                <stop
                                  offset="60%"
                                  stopColor="#38bdf8"
                                  stopOpacity="0.99"
                                />
                                <stop
                                  offset="86%"
                                  stopColor="#166534"
                                  stopOpacity="0.82"
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#020617"
                                  stopOpacity="1"
                                />
                              </radialGradient>
                            </defs>

                            <Geographies geography={GEO_URL}>
                              {({ geographies }) => {
                                const hoverPos = hoveredCode
                                  ? STATE_POSITIONS[hoveredCode]
                                  : null;
                                const hoveredIsTiny = hoveredCode
                                  ? TINY_STATES.has(hoveredCode)
                                  : false;
                                const hoveredIsDense = hoveredCode
                                  ? DENSE_STATES.has(hoveredCode)
                                  : false;

                                const items = geographies
                                  .map((geo) => {
                                    const name = (geo.properties as any)
                                      ?.name as string | undefined;
                                    if (!name) return null;

                                    const code = NAME_TO_CODE[name] ?? name;
                                    const isSelected =
                                      code === selectedState.code;
                                    const isTiny = TINY_STATES.has(code);
                                    const isDetachedNE =
                                      NEW_ENGLAND_DETACHED.has(code);

                                    const pos = STATE_POSITIONS[code] ?? {
                                      x: 50,
                                      y: 50,
                                    };
                                    const sx = pos.x / 100;
                                    const sy = pos.y / 100;

                                    // Base: pull detached New England out into a clean column on the right
                                    let baseTx = 0;
                                    let baseTy = 0;
                                    if (isDetachedNE) {
                                      const layout =
                                        NEW_ENGLAND_LAYOUT[code];
                                      if (layout) {
                                        baseTx += layout.dx;
                                        baseTy += layout.dy;
                                      }
                                    }

                                    const baseScale = isDetachedNE ? 1.3 : 1.0;
                                    let scale = baseScale;
                                    let tx = baseTx;
                                    let ty = baseTy;

                                    if (hoverPos) {
                                      const cx = hoverPos.x / 100;
                                      const cy = hoverPos.y / 100;
                                      const dx = sx - cx;
                                      const dy = sy - cy;
                                      const dist =
                                        Math.sqrt(dx * dx + dy * dy) ||
                                        0.0001;

                                      const isHover = code === hoveredCode;

                                      // Smooth radial “break apart” from hovered center
                                      const radius = 0.6;
                                      const influence = Math.max(
                                        0,
                                        1 - dist / radius,
                                      );

                                      let sepAmp = 16;
                                      if (DENSE_STATES.has(code)) sepAmp = 20;
                                      if (isTiny) sepAmp = 22;
                                      if (isDetachedNE) sepAmp *= 0.9;

                                      const separation = influence * sepAmp;
                                      const nx = dx / dist;
                                      const ny = dy / dist;

                                      if (!isHover) {
                                        tx += separation * nx;
                                        ty += separation * ny;
                                      }

                                      const neighborRadius = hoveredIsTiny
                                        ? 0.24
                                        : 0.18;
                                      const isNeighbor =
                                        !isHover && dist < neighborRadius;

                                      if (isHover) {
                                        if (isTiny) {
                                          // Rhode Island etc – big but still elegant
                                          scale = baseScale * 2.4;
                                        } else if (
                                          DENSE_STATES.has(code)
                                        ) {
                                          scale = baseScale * 1.3;
                                        } else {
                                          scale = baseScale * 1.18;
                                        }
                                      } else if (isNeighbor) {
                                        if (
                                          hoveredIsTiny ||
                                          hoveredIsDense ||
                                          isTiny
                                        ) {
                                          scale = baseScale * 1.16;
                                        } else {
                                          scale = baseScale * 1.08;
                                        }
                                      }
                                    }

                                    if (isSelected) {
                                      scale *= 1.03;
                                    }

                                    const transformStr =
                                      `translate3d(${tx.toFixed(
                                        2,
                                      )}px, ${ty.toFixed(
                                        2,
                                      )}px, 0) scale(${scale.toFixed(3)})`;

                                    const style = getGeographyStyle(
                                      isSelected,
                                      transformStr,
                                    );

                                    return {
                                      geo,
                                      name,
                                      code,
                                      style,
                                    };
                                  })
                                  .filter(Boolean) as {
                                  geo: any;
                                  name: string;
                                  code: string;
                                  style: ReturnType<typeof getGeographyStyle>;
                                }[];

                                const hoveredItem = hoveredCode
                                  ? items.find(
                                      (i) => i.code === hoveredCode,
                                    )
                                  : null;

                                const baseItems = hoveredCode
                                  ? items.filter(
                                      (i) => i.code !== hoveredCode,
                                    )
                                  : items;

                                const renderGeo = (
                                  item: (typeof items)[number],
                                  suffix: string,
                                ) => (
                                  <Geography
                                    key={item.geo.rsmKey + suffix}
                                    geography={item.geo}
                                    onMouseEnter={() =>
                                      setHoveredCode(item.code)
                                    }
                                    onMouseLeave={() =>
                                      setHoveredCode((prev) =>
                                        prev === item.code ? null : prev,
                                      )
                                    }
                                    onClick={(_geo, evt) =>
                                      handleStateClick(
                                        item.code,
                                        item.name,
                                        evt,
                                      )
                                    }
                                    style={item.style}
                                    className="transition-transform duration-150 ease-out [transform-origin:center]"
                                  />
                                );

                                return (
                                  <>
                                    {baseItems.map((item) =>
                                      renderGeo(item, '-base'),
                                    )}
                                    {hoveredItem &&
                                      renderGeo(hoveredItem, '-hovered')}
                                  </>
                                );
                              }}
                            </Geographies>
                          </ComposableMap>
                        </div>
                      </div>

                      {/* Slide 2: Canada placeholder (future expansion) */}
                      <div className="h-full w-full flex-none">
                        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-[40px] bg-white/70 backdrop-blur-md">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                            Canada · Provinces
                          </p>
                          <h2 className="text-xl font-semibold text-slate-800">
                            Canada coverage coming soon
                          </h2>
                          <p className="max-w-sm text-center text-sm text-slate-500">
                            This carousel is wired for additional regions. When
                            you&apos;re ready, we&apos;ll plug in a province-level
                            safety atlas here with the same glass-map treatment.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating detail panel over the map */}
                  {detailPanel && activeRegion.id === 'us' && (
                    <div className="pointer-events-none absolute inset-0 z-30">
                      <div
                        className="pointer-events-auto max-w-sm rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl"
                        style={{
                          position: 'absolute',
                          left: `${detailPanel.x * 100}%`,
                          top: `${detailPanel.y * 100}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600">
                              {detailPanel.state.code} ·{' '}
                              {detailPanel.state.name}
                            </p>
                            <h2 className="mt-2 text-base font-semibold text-slate-900">
                              Safety snapshot &amp; batch activity
                            </h2>
                          </div>
                          <button
                            type="button"
                            onClick={handleClosePanel}
                            className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-600 hover:bg-slate-300 hover:text-slate-900"
                          >
                            ×
                          </button>
                        </div>

                        <div className="mt-4 grid gap-3 text-sm text-slate-800">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                              Batches tracked
                            </p>
                            <p className="mt-1 text-2xl font-semibold text-sky-700">
                              {metrics.batchesTracked.toLocaleString()}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <p className="uppercase tracking-[0.16em] text-slate-500">
                                Labs reporting
                              </p>
                              <p className="mt-1 text-lg font-semibold text-slate-800">
                                {metrics.labsReporting}
                              </p>
                            </div>
                            <div>
                              <p className="uppercase tracking-[0.16em] text-slate-500">
                                Recalls watched
                              </p>
                              <p className="mt-1 text-lg font-semibold text-indigo-600">
                                {metrics.recentRecalls}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                              Passing rate
                            </p>
                            <p className="mt-1 text-lg font-semibold text-sky-700">
                              {metrics.passingRate}%{' '}
                              <span className="text-[11px] font-normal text-slate-500">
                                of COAs marked passing
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <p className="max-w-[60%] text-[11px] text-slate-500">
                            These are illustrative numbers for now. Wire them to
                            your real CartFax batch &amp; recall APIs when
                            you&apos;re ready.
                          </p>
                          <Link
                            href="/admin"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-slate-100 px-3.5 py-1.5 text-[11px] font-semibold text-slate-950 shadow-[0_14px_40px_rgba(148,163,184,0.6)] hover:from-sky-400 hover:to-white"
                          >
                            <span>Open admin backend</span>
                            <span className="text-[14px]">↗</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Admin hub */}
        <section className="mt-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
              Admin data tools
            </p>
            <h2 className="text-lg font-semibold text-slate-900">Admin hub</h2>
            <p className="mt-2 text-sm text-slate-600">
              When you&apos;re signed in as an admin, the hub opens the full
              CartFax backend: batches, COAs, brands, locations, and more.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span
                  className={
                    'inline-flex h-2 w-2 rounded-full shadow-[0_0_0_4px_rgba(56,189,248,0.25)] ' +
                    (isLoggedIn ? 'bg-sky-500' : 'bg-slate-400')
                  }
                />
                <span>
                  {isLoggedIn
                    ? 'Admin mode unlocked. Data editing enabled.'
                    : 'Sign in with your admin account to unlock editing.'}
                </span>
              </div>

              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-slate-100 px-4 py-2 text-xs font-semibold text-slate-950 shadow-[0_12px_35px_rgba(148,163,184,0.5)] hover:from-sky-400 hover:to-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              >
                <span>Open admin hub</span>
                <span className="text-[15px]">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
