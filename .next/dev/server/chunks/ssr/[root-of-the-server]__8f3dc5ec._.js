module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/pages/admin/states/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/admin/states/index.tsx
__turbopack_context__.s([
    "default",
    ()=>AdminStatesAtlas
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/react [external] (next-auth/react, cjs)");
;
;
;
;
// 50 states (we’ll treat DC separately via batches if you add it later)
const STATES = [
    // Northeast
    {
        code: 'ME',
        name: 'Maine',
        region: 'northeast'
    },
    {
        code: 'NH',
        name: 'New Hampshire',
        region: 'northeast'
    },
    {
        code: 'VT',
        name: 'Vermont',
        region: 'northeast'
    },
    {
        code: 'MA',
        name: 'Massachusetts',
        region: 'northeast'
    },
    {
        code: 'RI',
        name: 'Rhode Island',
        region: 'northeast'
    },
    {
        code: 'CT',
        name: 'Connecticut',
        region: 'northeast'
    },
    {
        code: 'NY',
        name: 'New York',
        region: 'northeast'
    },
    {
        code: 'NJ',
        name: 'New Jersey',
        region: 'northeast'
    },
    {
        code: 'PA',
        name: 'Pennsylvania',
        region: 'northeast'
    },
    // South
    {
        code: 'DE',
        name: 'Delaware',
        region: 'south'
    },
    {
        code: 'MD',
        name: 'Maryland',
        region: 'south'
    },
    {
        code: 'VA',
        name: 'Virginia',
        region: 'south'
    },
    {
        code: 'WV',
        name: 'West Virginia',
        region: 'south'
    },
    {
        code: 'NC',
        name: 'North Carolina',
        region: 'south'
    },
    {
        code: 'SC',
        name: 'South Carolina',
        region: 'south'
    },
    {
        code: 'GA',
        name: 'Georgia',
        region: 'south'
    },
    {
        code: 'FL',
        name: 'Florida',
        region: 'south'
    },
    {
        code: 'KY',
        name: 'Kentucky',
        region: 'south'
    },
    {
        code: 'TN',
        name: 'Tennessee',
        region: 'south'
    },
    {
        code: 'AL',
        name: 'Alabama',
        region: 'south'
    },
    {
        code: 'MS',
        name: 'Mississippi',
        region: 'south'
    },
    {
        code: 'LA',
        name: 'Louisiana',
        region: 'south'
    },
    {
        code: 'AR',
        name: 'Arkansas',
        region: 'south'
    },
    {
        code: 'OK',
        name: 'Oklahoma',
        region: 'south'
    },
    {
        code: 'TX',
        name: 'Texas',
        region: 'south'
    },
    // Midwest
    {
        code: 'OH',
        name: 'Ohio',
        region: 'midwest'
    },
    {
        code: 'MI',
        name: 'Michigan',
        region: 'midwest'
    },
    {
        code: 'IN',
        name: 'Indiana',
        region: 'midwest'
    },
    {
        code: 'IL',
        name: 'Illinois',
        region: 'midwest'
    },
    {
        code: 'WI',
        name: 'Wisconsin',
        region: 'midwest'
    },
    {
        code: 'MN',
        name: 'Minnesota',
        region: 'midwest'
    },
    {
        code: 'IA',
        name: 'Iowa',
        region: 'midwest'
    },
    {
        code: 'MO',
        name: 'Missouri',
        region: 'midwest'
    },
    {
        code: 'ND',
        name: 'North Dakota',
        region: 'midwest'
    },
    {
        code: 'SD',
        name: 'South Dakota',
        region: 'midwest'
    },
    {
        code: 'NE',
        name: 'Nebraska',
        region: 'midwest'
    },
    {
        code: 'KS',
        name: 'Kansas',
        region: 'midwest'
    },
    // West
    {
        code: 'MT',
        name: 'Montana',
        region: 'west'
    },
    {
        code: 'WY',
        name: 'Wyoming',
        region: 'west'
    },
    {
        code: 'CO',
        name: 'Colorado',
        region: 'west'
    },
    {
        code: 'NM',
        name: 'New Mexico',
        region: 'west'
    },
    {
        code: 'ID',
        name: 'Idaho',
        region: 'west'
    },
    {
        code: 'UT',
        name: 'Utah',
        region: 'west'
    },
    {
        code: 'AZ',
        name: 'Arizona',
        region: 'west'
    },
    {
        code: 'NV',
        name: 'Nevada',
        region: 'west'
    },
    {
        code: 'WA',
        name: 'Washington',
        region: 'west'
    },
    {
        code: 'OR',
        name: 'Oregon',
        region: 'west'
    },
    {
        code: 'CA',
        name: 'California',
        region: 'west'
    },
    {
        code: 'AK',
        name: 'Alaska',
        region: 'west'
    },
    {
        code: 'HI',
        name: 'Hawaii',
        region: 'west'
    }
];
const REGIONS = [
    {
        id: 'all',
        label: 'All regions'
    },
    {
        id: 'northeast',
        label: 'Northeast'
    },
    {
        id: 'south',
        label: 'South'
    },
    {
        id: 'midwest',
        label: 'Midwest'
    },
    {
        id: 'west',
        label: 'West'
    }
];
function AdminStatesAtlas() {
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["useSession"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [regionFilter, setRegionFilter] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('all');
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const statesForRegion = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>regionFilter === 'all' ? STATES : STATES.filter((s)=>s.region === regionFilter), [
        regionFilter
    ]);
    const active = selected || hovered;
    if (!session) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-sm text-slate-300",
                children: "Sign in as an admin to explore state-level batches."
            }, void 0, false, {
                fileName: "[project]/pages/admin/states/index.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/admin/states/index.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "p-6 max-w-6xl mx-auto space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: ()=>router.push('/admin'),
                className: "text-xs text-slate-400 hover:text-emerald-400",
                children: "← Back to admin"
            }, void 0, false, {
                fileName: "[project]/pages/admin/states/index.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold text-slate-100",
                        children: "CartFax Atlas"
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/states/index.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-400 max-w-2xl",
                        children: "Pick a state to drill into batches, labs, and locations. The layout is intentionally more “art” than cartography, but every tile is a real state button."
                    }, void 0, false, {
                        fileName: "[project]/pages/admin/states/index.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/admin/states/index.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid gap-6 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.5fr)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.15),_transparent_55%)]"
                            }, void 0, false, {
                                fileName: "[project]/pages/admin/states/index.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative flex flex-col h-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2 px-4 pt-4 pb-2 flex-wrap",
                                        children: REGIONS.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setRegionFilter(r.id);
                                                    setHovered(null);
                                                },
                                                className: `px-3 py-1.5 rounded-full text-[11px] border transition-colors ${regionFilter === r.id ? 'border-emerald-400/80 bg-emerald-500/10 text-emerald-200' : 'border-slate-700 bg-slate-900/80 text-slate-300 hover:border-emerald-400/40 hover:text-emerald-200'}`,
                                                children: r.label
                                            }, r.id, false, {
                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                lineNumber: 142,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/states/index.tsx",
                                        lineNumber: 140,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex-1 px-4 pb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-slate-800/80 bg-slate-900/80 h-full p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "text-[11px] text-slate-400 mb-2 flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                statesForRegion.length,
                                                                " states",
                                                                ' ',
                                                                regionFilter === 'all' ? 'available' : `in the ${REGIONS.find((r)=>r.id === regionFilter)?.label ?? 'region'}`
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/states/index.tsx",
                                                            lineNumber: 163,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "hidden sm:inline",
                                                            children: "Hover to preview · Click to open detail"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/states/index.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/states/index.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 pt-1",
                                                    children: statesForRegion.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            onMouseEnter: ()=>setHovered(s),
                                                            onMouseLeave: ()=>setHovered((prev)=>prev?.code === s.code ? null : prev),
                                                            onClick: ()=>{
                                                                setSelected(s);
                                                                router.push(`/admin/states/${s.code}`);
                                                            },
                                                            className: `group relative px-2 py-1 rounded-full border text-[11px] font-mono tracking-tight transition-all
                        ${active?.code === s.code ? 'border-emerald-400 bg-emerald-500/10 text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.4)]' : 'border-slate-700/80 bg-slate-900/80 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-100'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    children: s.code
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/states/index.tsx",
                                                                    lineNumber: 195,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400/60 group-hover:bg-emerald-300/90"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/states/index.tsx",
                                                                    lineNumber: 197,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, s.code, true, {
                                                            fileName: "[project]/pages/admin/states/index.tsx",
                                                            lineNumber: 178,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/states/index.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/states/index.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/states/index.tsx",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/states/index.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/states/index.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-slate-800 bg-slate-950/75 p-4 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-sm font-semibold text-slate-200",
                                                children: active ? `${active.name} (${active.code})` : 'Pick a state'
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this),
                                            active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>router.push(`/admin/states/${active.code}`),
                                                className: "px-3 py-1.5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-medium hover:bg-emerald-400",
                                                children: [
                                                    "Open ",
                                                    active.code,
                                                    " detail →"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                lineNumber: 217,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/states/index.tsx",
                                        lineNumber: 210,
                                        columnNumber: 13
                                    }, this),
                                    active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-400",
                                                children: [
                                                    "Drill into batches and lab results currently known for",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-slate-100 font-medium",
                                                        children: active.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin/states/index.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 19
                                                    }, this),
                                                    ". As you ingest more COAs and location data, this view will feel more like a “compliance radar” than a list."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                lineNumber: 230,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-2 text-[11px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "rounded-lg border border-slate-800 bg-slate-900/70 px-2 py-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-400 mb-0.5",
                                                                children: "Region"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                                lineNumber: 240,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-100",
                                                                children: REGIONS.find((r)=>r.id === active.region)?.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                                lineNumber: 243,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/states/index.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "rounded-lg border border-slate-800 bg-slate-900/70 px-2 py-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-400 mb-0.5",
                                                                children: "State code"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                                lineNumber: 252,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-100 font-mono",
                                                                children: active.code
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/admin/states/index.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                lineNumber: 238,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-500",
                                        children: "Hover over a tile in the art-map or pick one from the list below to see a quick summary and jump into the detailed batch view."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/states/index.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/states/index.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-slate-800 bg-slate-950/75 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "text-sm font-semibold text-slate-200",
                                                children: "States"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                lineNumber: 273,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-slate-500",
                                                children: [
                                                    statesForRegion.length,
                                                    " shown"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                lineNumber: 276,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/states/index.tsx",
                                        lineNumber: 272,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "max-h-[260px] overflow-auto pr-1 text-xs space-y-1",
                                        children: [
                                            statesForRegion.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSelected(s);
                                                        router.push(`/admin/states/${s.code}`);
                                                    },
                                                    onMouseEnter: ()=>setHovered(s),
                                                    onMouseLeave: ()=>setHovered((prev)=>prev?.code === s.code ? null : prev),
                                                    className: `w-full flex items-center justify-between px-3 py-1.5 rounded-lg border text-left transition-colors
                    ${active?.code === s.code ? 'border-emerald-400/80 bg-emerald-500/10 text-emerald-100' : 'border-slate-800 bg-slate-900/80 text-slate-200 hover:border-emerald-400/60 hover:text-emerald-100'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                s.name,
                                                                ' ',
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-slate-400",
                                                                    children: [
                                                                        "(",
                                                                        s.code,
                                                                        ")"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/admin/states/index.tsx",
                                                                    lineNumber: 304,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/states/index.tsx",
                                                            lineNumber: 302,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-slate-500",
                                                            children: REGIONS.find((r)=>r.id === s.region)?.label ?? ''
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/states/index.tsx",
                                                            lineNumber: 308,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, s.code, true, {
                                                    fileName: "[project]/pages/admin/states/index.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 17
                                                }, this)),
                                            statesForRegion.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-500",
                                                children: "No states in this region yet."
                                            }, void 0, false, {
                                                fileName: "[project]/pages/admin/states/index.tsx",
                                                lineNumber: 316,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/admin/states/index.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin/states/index.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/admin/states/index.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/admin/states/index.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/admin/states/index.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8f3dc5ec._.js.map