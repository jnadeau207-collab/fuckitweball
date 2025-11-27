module.exports = [
"[externals]/react-simple-maps [external] (react-simple-maps, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-simple-maps", () => require("react-simple-maps"));

module.exports = mod;
}),
"[project]/components/AdminStateExplorer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/AdminStateExplorer.tsx
__turbopack_context__.s([
    "default",
    ()=>AdminStateExplorer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$simple$2d$maps__$5b$external$5d$__$28$react$2d$simple$2d$maps$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react-simple-maps [external] (react-simple-maps, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/react [external] (next-auth/react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
;
;
;
const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const NAME_TO_CODE = {
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
    'Puerto Rico': 'PR'
};
/**
 * Approximate centers for the exploding effect.
 * Paths themselves are true outlines from us-atlas.
 */ const STATE_POSITIONS = {
    WA: {
        x: 10,
        y: 18
    },
    OR: {
        x: 13,
        y: 25
    },
    CA: {
        x: 13,
        y: 40
    },
    NV: {
        x: 21,
        y: 35
    },
    AZ: {
        x: 23,
        y: 49
    },
    UT: {
        x: 23,
        y: 39
    },
    CO: {
        x: 30,
        y: 38
    },
    NM: {
        x: 30,
        y: 50
    },
    AK: {
        x: 10,
        y: 85
    },
    HI: {
        x: 21,
        y: 88
    },
    ID: {
        x: 19,
        y: 27
    },
    MT: {
        x: 26,
        y: 20
    },
    WY: {
        x: 26,
        y: 30
    },
    ND: {
        x: 36,
        y: 20
    },
    SD: {
        x: 36,
        y: 28
    },
    NE: {
        x: 36,
        y: 36
    },
    KS: {
        x: 36,
        y: 44
    },
    MN: {
        x: 44,
        y: 22
    },
    IA: {
        x: 44,
        y: 30
    },
    MO: {
        x: 44,
        y: 40
    },
    WI: {
        x: 50,
        y: 22
    },
    IL: {
        x: 50,
        y: 32
    },
    MI: {
        x: 58,
        y: 22
    },
    IN: {
        x: 58,
        y: 32
    },
    OH: {
        x: 62,
        y: 32
    },
    TX: {
        x: 40,
        y: 60
    },
    OK: {
        x: 39,
        y: 52
    },
    AR: {
        x: 44,
        y: 48
    },
    LA: {
        x: 44,
        y: 58
    },
    MS: {
        x: 50,
        y: 54
    },
    AL: {
        x: 54,
        y: 54
    },
    TN: {
        x: 56,
        y: 46
    },
    KY: {
        x: 58,
        y: 40
    },
    GA: {
        x: 60,
        y: 60
    },
    FL: {
        x: 62,
        y: 72
    },
    SC: {
        x: 64,
        y: 58
    },
    NC: {
        x: 68,
        y: 52
    },
    VA: {
        x: 70,
        y: 44
    },
    WV: {
        x: 66,
        y: 40
    },
    PA: {
        x: 66,
        y: 34
    },
    NY: {
        x: 68,
        y: 26
    },
    VT: {
        x: 70,
        y: 20
    },
    NH: {
        x: 73,
        y: 19
    },
    ME: {
        x: 80,
        y: 15
    },
    MA: {
        x: 75,
        y: 24
    },
    RI: {
        x: 77,
        y: 26
    },
    CT: {
        x: 75,
        y: 28
    },
    NJ: {
        x: 72,
        y: 30
    },
    DE: {
        x: 73,
        y: 34
    },
    MD: {
        x: 71,
        y: 36
    },
    DC: {
        x: 70,
        y: 38
    },
    PR: {
        x: 78,
        y: 80
    }
};
// Dense clusters (New England / Mid-Atlantic)
const DENSE_STATES = new Set([
    'RI',
    'CT',
    'MA',
    'NH',
    'VT',
    'NJ',
    'DE',
    'MD',
    'DC',
    'NY'
]);
// Tiny states that should grow a LOT on hover
const TINY_STATES = new Set([
    'RI',
    'CT',
    'DE',
    'NJ',
    'MA',
    'DC'
]);
function generateMetrics(code) {
    const base = code.charCodeAt(0) + code.charCodeAt(1);
    const clamp = (v, min, max)=>Math.min(max, Math.max(min, v));
    return {
        batchesTracked: clamp(260 + base % 320, 120, 580),
        labsReporting: clamp(3 + base % 9, 2, 14),
        recentRecalls: base % 6,
        passingRate: clamp(82 + base % 11, 78, 97)
    };
}
// Metallic tile styling with bright blue seams
function getGeographyStyle(isSelected, transform) {
    const shared = {
        transform,
        transformBox: 'fill-box',
        transformOrigin: 'center',
        shapeRendering: 'crispEdges',
        vectorEffect: 'non-scaling-stroke',
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
        outline: 'none',
        willChange: 'transform, filter',
        transition: 'fill 140ms ease-out, stroke 140ms ease-out, filter 140ms ease-out, transform 120ms ease-out'
    };
    return {
        default: {
            ...shared,
            fill: 'url(#stateMetal)',
            stroke: '#22d3ee',
            strokeWidth: 1.1,
            filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.85))'
        },
        hover: {
            ...shared,
            fill: 'url(#stateMetalHover)',
            stroke: '#7dd3fc',
            strokeWidth: 1.4,
            cursor: 'pointer',
            filter: 'drop-shadow(0 0 18px rgba(56,189,248,1))'
        },
        pressed: {
            ...shared,
            fill: 'url(#stateMetalActive)',
            stroke: '#0f172a',
            strokeWidth: 1.3,
            filter: 'drop-shadow(0 0 24px rgba(22,163,74,0.95))'
        }
    };
}
const DEFAULT_STATE = {
    code: 'CA',
    name: 'California'
};
const REGIONS = [
    {
        id: 'us',
        label: 'United States',
        pill: 'US · States'
    },
    {
        id: 'ca',
        label: 'Canada',
        pill: 'Canada · Provinces'
    },
    {
        id: 'mx',
        label: 'Mexico',
        pill: 'Mexico · States'
    },
    {
        id: 'nl',
        label: 'Netherlands',
        pill: 'Netherlands · Regions'
    }
];
function AdminStateExplorer() {
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["useSession"])();
    const isLoggedIn = status === 'authenticated';
    const [selectedState, setSelectedState] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(DEFAULT_STATE);
    const [hoveredCode, setHoveredCode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [pointer, setPointer] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [tilt, setTilt] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [detailPanel, setDetailPanel] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [regionIndex, setRegionIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const activeRegion = REGIONS[regionIndex];
    const metrics = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>generateMetrics(selectedState.code), [
        selectedState.code
    ]);
    const mapCardRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const handleMapMouseMove = (event)=>{
        const rect = mapCardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setPointer({
            x,
            y
        });
        const rotateX = (y - 0.5) * 5;
        const rotateY = (0.5 - x) * 9;
        setTilt({
            x: rotateY,
            y: rotateX
        });
    };
    const handleMapMouseLeave = ()=>{
        setPointer(null);
        setTilt({
            x: 0,
            y: 0
        });
    };
    const handleStateClick = (code, name, evt)=>{
        const nextState = {
            code,
            name
        };
        setSelectedState(nextState);
        if (mapCardRef.current && evt && typeof evt.clientX === 'number') {
            const rect = mapCardRef.current.getBoundingClientRect();
            const x = (evt.clientX - rect.left) / rect.width;
            const y = (evt.clientY - rect.top) / rect.height;
            const clampedX = Math.min(0.8, Math.max(0.2, x));
            const clampedY = Math.min(0.8, Math.max(0.2, y));
            setDetailPanel({
                state: nextState,
                x: clampedX,
                y: clampedY
            });
        } else {
            setDetailPanel({
                state: nextState,
                x: 0.5,
                y: 0.5
            });
        }
    };
    const handleClosePanel = ()=>setDetailPanel(null);
    const currentLabel = `${selectedState.code} · ${selectedState.name}`;
    void pointer; // right now just used for tilt feeling
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white text-slate-900",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-16 pt-4 md:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "pt-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-balance text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl lg:text-4xl",
                        children: "Regional cannabis safety & COA explorer"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 288,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "relative mt-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute inset-x-6 top-[-64px] h-72 rounded-[80px] bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.35),transparent_55%)] blur-3xl"
                        }, void 0, false, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 296,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            ref: mapCardRef,
                            onMouseMove: handleMapMouseMove,
                            onMouseLeave: handleMapMouseLeave,
                            className: "relative mx-auto max-w-6xl rounded-[48px] border border-sky-400/45 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-50/0 px-[1.5px] pb-[1.5px] pt-[1.5px] shadow-[0_40px_120px_rgba(15,23,42,0.18)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden rounded-[46px] bg-gradient-to-b from-slate-100 via-slate-50 to-transparent px-5 pb-6 pt-5 md:px-7 md:pb-8 md:pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 mx-auto flex max-w-5xl flex-col gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center justify-between gap-3 px-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-600",
                                                            children: activeRegion.pill
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-600",
                                                            children: [
                                                                currentLabel,
                                                                " · True state boundaries rising out of a metal globe. Hover to tease them apart, click to drill in."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-[11px] font-medium text-slate-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex h-2 w-2 rounded-full bg-sky-500 shadow-[0_0_0_4px_rgba(56,189,248,0.35)]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            children: "Move your mouse · Click a state"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 308,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2 px-1",
                                            children: REGIONS.map((region, idx)=>{
                                                const active = idx === regionIndex;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setRegionIndex(idx),
                                                    className: 'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ' + (active ? 'border-sky-500 bg-sky-500 text-white shadow-[0_10px_30px_rgba(56,189,248,0.55)]' : 'border-slate-300 bg-white/80 text-slate-700 hover:border-sky-400 hover:text-sky-700'),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: region.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 25
                                                    }, this)
                                                }, region.id, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 330,
                                                    columnNumber: 23
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 326,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "relative mx-auto mt-2 aspect-[19/10] w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "relative h-full w-full",
                                                    style: {
                                                        transform: `perspective(1600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) rotateZ(-3deg)`,
                                                        transition: 'transform 150ms ease-out'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "pointer-events-none absolute inset-x-16 top-12 h-16 rounded-[999px] bg-gradient-to-b from-black/40 via-black/18 to-transparent blur-2xl opacity-85"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "pointer-events-none absolute inset-x-16 bottom-12 h-16 rounded-[999px] bg-gradient-to-t from-black/40 via-black/18 to-transparent blur-2xl opacity-85"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "relative z-10 h-full w-full overflow-hidden rounded-[36px] bg-transparent",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex h-full w-full transition-transform duration-500 ease-out",
                                                                style: {
                                                                    transform: `translateX(-${regionIndex * 100}%)`
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "h-full w-full flex-none",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$simple$2d$maps__$5b$external$5d$__$28$react$2d$simple$2d$maps$2c$__cjs$29$__["ComposableMap"], {
                                                                            projection: "geoAlbersUsa",
                                                                            projectionConfig: {
                                                                                scale: 1300
                                                                            },
                                                                            width: 975,
                                                                            height: 610,
                                                                            className: "relative h-full w-full",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("defs", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("linearGradient", {
                                                                                            id: "stateMetal",
                                                                                            x1: "0%",
                                                                                            y1: "0%",
                                                                                            x2: "100%",
                                                                                            y2: "100%",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "0%",
                                                                                                    stopColor: "#f9fafb"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 388,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "8%",
                                                                                                    stopColor: "#e5e7eb"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 389,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "18%",
                                                                                                    stopColor: "#cbd5f5"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 390,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "24%",
                                                                                                    stopColor: "#f3f4f6"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 391,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "40%",
                                                                                                    stopColor: "#9ca3af"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 392,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "65%",
                                                                                                    stopColor: "#4b5563"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 393,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "82%",
                                                                                                    stopColor: "#111827"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 394,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "100%",
                                                                                                    stopColor: "#020617"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 395,
                                                                                                    columnNumber: 33
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                            lineNumber: 381,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("linearGradient", {
                                                                                            id: "stateMetalHover",
                                                                                            x1: "10%",
                                                                                            y1: "0%",
                                                                                            x2: "90%",
                                                                                            y2: "100%",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "0%",
                                                                                                    stopColor: "#ffffff"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 406,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "15%",
                                                                                                    stopColor: "#e5f2ff"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 407,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "30%",
                                                                                                    stopColor: "#dbeafe"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 408,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "45%",
                                                                                                    stopColor: "#a5b4fc"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 409,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "65%",
                                                                                                    stopColor: "#4b5563"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 410,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "82%",
                                                                                                    stopColor: "#020617"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 411,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "100%",
                                                                                                    stopColor: "#000000"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 412,
                                                                                                    columnNumber: 33
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                            lineNumber: 399,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("linearGradient", {
                                                                                            id: "stateMetalActive",
                                                                                            x1: "0%",
                                                                                            y1: "0%",
                                                                                            x2: "100%",
                                                                                            y2: "100%",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "0%",
                                                                                                    stopColor: "#e0f2fe"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 423,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "24%",
                                                                                                    stopColor: "#bae6fd"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 424,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "45%",
                                                                                                    stopColor: "#38bdf8"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 425,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "65%",
                                                                                                    stopColor: "#0ea5e9"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 426,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "82%",
                                                                                                    stopColor: "#0f172a"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 427,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                                                    offset: "100%",
                                                                                                    stopColor: "#000000"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                    lineNumber: 428,
                                                                                                    columnNumber: 33
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                            lineNumber: 416,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                    lineNumber: 379,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("g", {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("image", {
                                                                                        href: "/earth-hero.png",
                                                                                        x: -60,
                                                                                        y: -80,
                                                                                        width: 1100,
                                                                                        height: 750,
                                                                                        preserveAspectRatio: "xMidYMid slice",
                                                                                        opacity: 0.97
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 434,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                    lineNumber: 433,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$simple$2d$maps__$5b$external$5d$__$28$react$2d$simple$2d$maps$2c$__cjs$29$__["Geographies"], {
                                                                                    geography: GEO_URL,
                                                                                    children: ({ geographies })=>{
                                                                                        const hoverPos = hoveredCode ? STATE_POSITIONS[hoveredCode] : null;
                                                                                        const hoveredIsTiny = hoveredCode ? TINY_STATES.has(hoveredCode) : false;
                                                                                        const hoveredIsDense = hoveredCode ? DENSE_STATES.has(hoveredCode) : false;
                                                                                        const items = geographies.map((geo)=>{
                                                                                            const name = geo.properties?.name;
                                                                                            if (!name) return null;
                                                                                            const code = NAME_TO_CODE[name] ?? name;
                                                                                            const isSelected = code === selectedState.code;
                                                                                            const isTiny = TINY_STATES.has(code);
                                                                                            const pos = STATE_POSITIONS[code] ?? {
                                                                                                x: 50,
                                                                                                y: 50
                                                                                            };
                                                                                            const sx = pos.x / 100;
                                                                                            const sy = pos.y / 100;
                                                                                            let baseTx = 0;
                                                                                            let baseTy = 0;
                                                                                            const baseScale = 1.0;
                                                                                            let scale = baseScale;
                                                                                            let tx = baseTx;
                                                                                            let ty = baseTy;
                                                                                            if (hoverPos) {
                                                                                                const cx = hoverPos.x / 100;
                                                                                                const cy = hoverPos.y / 100;
                                                                                                const dx = sx - cx;
                                                                                                const dy = sy - cy;
                                                                                                const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
                                                                                                const isHover = code === hoveredCode;
                                                                                                const radius = 0.6;
                                                                                                const influence = Math.max(0, 1 - dist / radius);
                                                                                                let sepAmp = 16;
                                                                                                if (DENSE_STATES.has(code)) sepAmp = 20;
                                                                                                if (isTiny) sepAmp = 22;
                                                                                                const separation = influence * sepAmp;
                                                                                                const nx = dx / dist;
                                                                                                const ny = dy / dist;
                                                                                                if (!isHover) {
                                                                                                    tx += separation * nx;
                                                                                                    ty += separation * ny;
                                                                                                }
                                                                                                const neighborRadius = hoveredIsTiny ? 0.24 : 0.18;
                                                                                                const isNeighbor = !isHover && dist < neighborRadius;
                                                                                                if (isHover) {
                                                                                                    if (isTiny) {
                                                                                                        scale = baseScale * 2.4;
                                                                                                    } else if (DENSE_STATES.has(code)) {
                                                                                                        scale = baseScale * 1.3;
                                                                                                    } else {
                                                                                                        scale = baseScale * 1.18;
                                                                                                    }
                                                                                                } else if (isNeighbor) {
                                                                                                    if (hoveredIsTiny || hoveredIsDense || isTiny) {
                                                                                                        scale = baseScale * 1.16;
                                                                                                    } else {
                                                                                                        scale = baseScale * 1.08;
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                            if (isSelected) {
                                                                                                scale *= 1.03;
                                                                                            }
                                                                                            const transformStr = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
                                                                                            const style = getGeographyStyle(isSelected, transformStr);
                                                                                            return {
                                                                                                geo,
                                                                                                name,
                                                                                                code,
                                                                                                style
                                                                                            };
                                                                                        }).filter(Boolean);
                                                                                        const hoveredItem = hoveredCode ? items.find((i)=>i.code === hoveredCode) : null;
                                                                                        const baseItems = hoveredCode ? items.filter((i)=>i.code !== hoveredCode) : items;
                                                                                        const renderGeo = (item, suffix)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$simple$2d$maps__$5b$external$5d$__$28$react$2d$simple$2d$maps$2c$__cjs$29$__["Geography"], {
                                                                                                geography: item.geo,
                                                                                                onMouseEnter: ()=>setHoveredCode(item.code),
                                                                                                onMouseLeave: ()=>setHoveredCode((prev)=>prev === item.code ? null : prev),
                                                                                                onClick: (_geo, evt)=>handleStateClick(item.code, item.name, evt),
                                                                                                style: item.style,
                                                                                                className: "transition-transform duration-150 ease-out [transform-origin:center]"
                                                                                            }, item.geo.rsmKey + suffix, false, {
                                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                                lineNumber: 588,
                                                                                                columnNumber: 35
                                                                                            }, this);
                                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                                                            children: [
                                                                                                baseItems.map((item)=>renderGeo(item, '-base')),
                                                                                                hoveredItem && renderGeo(hoveredItem, '-hovered')
                                                                                            ]
                                                                                        }, void 0, true);
                                                                                    }
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                    lineNumber: 445,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 370,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 369,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    REGIONS.slice(1).map((region)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                            className: "h-full w-full flex-none",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                                className: "flex h-full w-full flex-col items-center justify-center gap-4 rounded-[40px] bg-white/70 backdrop-blur-md",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                        className: "text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500",
                                                                                        children: region.label
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 629,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                                                        className: "text-xl font-semibold text-slate-800",
                                                                                        children: [
                                                                                            region.label,
                                                                                            " coverage coming soon"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 632,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                        className: "max-w-sm text-center text-sm text-slate-500",
                                                                                        children: "This slide is wired into the globe carousel so you can grow CartFax beyond the U.S. When you're ready, you'll swap this for a region-specific safety atlas with the same metal-map treatment."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 635,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 628,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        }, region.id, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 627,
                                                                            columnNumber: 27
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 362,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 361,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 19
                                                }, this),
                                                detailPanel && activeRegion.id === 'us' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "pointer-events-none absolute inset-0 z-30",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "pointer-events-auto max-w-sm rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl",
                                                        style: {
                                                            position: 'absolute',
                                                            left: `${detailPanel.x * 100}%`,
                                                            top: `${detailPanel.y * 100}%`,
                                                            transform: 'translate(-50%, -50%)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start justify-between gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600",
                                                                                children: [
                                                                                    detailPanel.state.code,
                                                                                    " ·",
                                                                                    ' ',
                                                                                    detailPanel.state.name
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 663,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                                                className: "mt-2 text-base font-semibold text-slate-900",
                                                                                children: "Safety snapshot & batch activity"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 667,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 662,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: handleClosePanel,
                                                                        className: "ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-600 hover:bg-slate-300 hover:text-slate-900",
                                                                        children: "×"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 671,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 661,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 grid gap-3 text-sm text-slate-800",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                className: "text-[11px] uppercase tracking-[0.18em] text-slate-500",
                                                                                children: "Batches tracked"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 682,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                className: "mt-1 text-2xl font-semibold text-sky-700",
                                                                                children: metrics.batchesTracked.toLocaleString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 685,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 681,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "grid grid-cols-2 gap-3 text-xs",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                        className: "uppercase tracking-[0.16em] text-slate-500",
                                                                                        children: "Labs reporting"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 691,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-1 text-lg font-semibold text-slate-800",
                                                                                        children: metrics.labsReporting
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 694,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 690,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                        className: "uppercase tracking-[0.16em] text-slate-500",
                                                                                        children: "Recalls watched"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 699,
                                                                                        columnNumber: 31
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                        className: "mt-1 text-lg font-semibold text-indigo-600",
                                                                                        children: metrics.recentRecalls
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 702,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 698,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 689,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                className: "text-[11px] uppercase tracking-[0.18em] text-slate-500",
                                                                                children: "Passing rate"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 708,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                className: "mt-1 text-lg font-semibold text-sky-700",
                                                                                children: [
                                                                                    metrics.passingRate,
                                                                                    "%",
                                                                                    ' ',
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[11px] font-normal text-slate-500",
                                                                                        children: "of COAs marked passing"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                        lineNumber: 713,
                                                                                        columnNumber: 31
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 711,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 707,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 680,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "mt-4 flex items-center justify-between gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                        className: "max-w-[60%] text-[11px] text-slate-500",
                                                                        children: "These are illustrative numbers for now. Wire them to your real CartFax batch & recall APIs when you're ready."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 721,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: "/admin",
                                                                        className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-slate-100 px-3.5 py-1.5 text-[11px] font-semibold text-slate-950 shadow-[0_14px_40px_rgba(148,163,184,0.6)] hover:from-sky-400 hover:to-white",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                children: "Open admin backend"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 730,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                className: "text-[14px]",
                                                                                children: "↗"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                                lineNumber: 731,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 726,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 720,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 652,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 651,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 348,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 306,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 294,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "mt-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700",
                                children: "Admin data tools"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 746,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold text-slate-900",
                                children: "Admin hub"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 749,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-slate-600",
                                children: "When you're signed in as an admin, the hub opens the full CartFax backend: batches, COAs, brands, locations, and more."
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 750,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex flex-wrap items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-xs text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: 'inline-flex h-2 w-2 rounded-full shadow-[0_0_0_4px_rgba(56,189,248,0.25)] ' + (isLoggedIn ? 'bg-sky-500' : 'bg-slate-400')
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 757,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: isLoggedIn ? 'Admin mode unlocked. Data editing enabled.' : 'Sign in with your admin account to unlock editing.'
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 763,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 756,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/admin",
                                        className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-slate-100 px-4 py-2 text-xs font-semibold text-slate-950 shadow-[0_12px_35px_rgba(148,163,184,0.5)] hover:from-sky-400 hover:to-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "Open admin hub"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 774,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-[15px]",
                                                children: "↗"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 775,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 770,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 755,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 745,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 744,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AdminStateExplorer.tsx",
            lineNumber: 285,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 284,
        columnNumber: 5
    }, this);
}
}),
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/index.tsx
__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/react [external] (next-auth/react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AdminStateExplorer.tsx [ssr] (ecmascript)");
;
;
;
function Home() {
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["useSession"])();
    // Same atlas, but guests are allowed and treated as "guest" role
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        session: session ?? null
    }, void 0, false, {
        fileName: "[project]/pages/index.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7a100d7b._.js.map