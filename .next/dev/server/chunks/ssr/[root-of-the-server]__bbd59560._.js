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
"[project]/pages/admin/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/admin/index.tsx
__turbopack_context__.s([
    "default",
    ()=>AdminStateExplorer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/react [external] (next-auth/react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
;
;
// Rough US-shaped constellation layout: not geographic-precise, but feels right.
const STATES = [
    // West coast & Rockies
    {
        code: 'WA',
        name: 'Washington',
        region: 'West',
        x: 8,
        y: 16
    },
    {
        code: 'OR',
        name: 'Oregon',
        region: 'West',
        x: 12,
        y: 26
    },
    {
        code: 'CA',
        name: 'California',
        region: 'West',
        x: 10,
        y: 43
    },
    {
        code: 'ID',
        name: 'Idaho',
        region: 'West',
        x: 17,
        y: 23
    },
    {
        code: 'NV',
        name: 'Nevada',
        region: 'West',
        x: 18,
        y: 39
    },
    {
        code: 'AZ',
        name: 'Arizona',
        region: 'West',
        x: 22,
        y: 53
    },
    {
        code: 'UT',
        name: 'Utah',
        region: 'West',
        x: 24,
        y: 38
    },
    {
        code: 'MT',
        name: 'Montana',
        region: 'West',
        x: 23,
        y: 14
    },
    {
        code: 'WY',
        name: 'Wyoming',
        region: 'West',
        x: 27,
        y: 26
    },
    {
        code: 'CO',
        name: 'Colorado',
        region: 'West',
        x: 30,
        y: 40
    },
    {
        code: 'NM',
        name: 'New Mexico',
        region: 'West',
        x: 31,
        y: 55
    },
    {
        code: 'AK',
        name: 'Alaska',
        region: 'West',
        x: 6,
        y: 82
    },
    {
        code: 'HI',
        name: 'Hawaii',
        region: 'West',
        x: 17,
        y: 80
    },
    // Midwest & Plains
    {
        code: 'ND',
        name: 'North Dakota',
        region: 'Midwest',
        x: 38,
        y: 18
    },
    {
        code: 'SD',
        name: 'South Dakota',
        region: 'Midwest',
        x: 38,
        y: 30
    },
    {
        code: 'NE',
        name: 'Nebraska',
        region: 'Midwest',
        x: 40,
        y: 42
    },
    {
        code: 'KS',
        name: 'Kansas',
        region: 'Midwest',
        x: 42,
        y: 53
    },
    {
        code: 'MN',
        name: 'Minnesota',
        region: 'Midwest',
        x: 46,
        y: 20
    },
    {
        code: 'IA',
        name: 'Iowa',
        region: 'Midwest',
        x: 47,
        y: 32
    },
    {
        code: 'MO',
        name: 'Missouri',
        region: 'Midwest',
        x: 48,
        y: 46
    },
    {
        code: 'WI',
        name: 'Wisconsin',
        region: 'Midwest',
        x: 52,
        y: 23
    },
    {
        code: 'IL',
        name: 'Illinois',
        region: 'Midwest',
        x: 52,
        y: 36
    },
    {
        code: 'MI',
        name: 'Michigan',
        region: 'Midwest',
        x: 57,
        y: 25
    },
    {
        code: 'IN',
        name: 'Indiana',
        region: 'Midwest',
        x: 56,
        y: 38
    },
    {
        code: 'OH',
        name: 'Ohio',
        region: 'Midwest',
        x: 60,
        y: 36
    },
    // South
    {
        code: 'TX',
        name: 'Texas',
        region: 'South',
        x: 44,
        y: 70
    },
    {
        code: 'OK',
        name: 'Oklahoma',
        region: 'South',
        x: 40,
        y: 64
    },
    {
        code: 'AR',
        name: 'Arkansas',
        region: 'South',
        x: 48,
        y: 60
    },
    {
        code: 'LA',
        name: 'Louisiana',
        region: 'South',
        x: 50,
        y: 72
    },
    {
        code: 'MS',
        name: 'Mississippi',
        region: 'South',
        x: 54,
        y: 68
    },
    {
        code: 'AL',
        name: 'Alabama',
        region: 'South',
        x: 58,
        y: 68
    },
    {
        code: 'TN',
        name: 'Tennessee',
        region: 'South',
        x: 56,
        y: 58
    },
    {
        code: 'KY',
        name: 'Kentucky',
        region: 'South',
        x: 57,
        y: 50
    },
    {
        code: 'GA',
        name: 'Georgia',
        region: 'South',
        x: 62,
        y: 66
    },
    {
        code: 'FL',
        name: 'Florida',
        region: 'South',
        x: 68,
        y: 77
    },
    {
        code: 'SC',
        name: 'South Carolina',
        region: 'South',
        x: 66,
        y: 62
    },
    {
        code: 'NC',
        name: 'North Carolina',
        region: 'South',
        x: 67,
        y: 55
    },
    {
        code: 'VA',
        name: 'Virginia',
        region: 'South',
        x: 68,
        y: 48
    },
    {
        code: 'WV',
        name: 'West Virginia',
        region: 'South',
        x: 64,
        y: 44
    },
    {
        code: 'MD',
        name: 'Maryland',
        region: 'South',
        x: 71,
        y: 45
    },
    // Northeast
    {
        code: 'DE',
        name: 'Delaware',
        region: 'Northeast',
        x: 73,
        y: 50
    },
    {
        code: 'NJ',
        name: 'New Jersey',
        region: 'Northeast',
        x: 75,
        y: 44
    },
    {
        code: 'PA',
        name: 'Pennsylvania',
        region: 'Northeast',
        x: 71,
        y: 39
    },
    {
        code: 'NY',
        name: 'New York',
        region: 'Northeast',
        x: 74,
        y: 32
    },
    {
        code: 'CT',
        name: 'Connecticut',
        region: 'Northeast',
        x: 78,
        y: 38
    },
    {
        code: 'RI',
        name: 'Rhode Island',
        region: 'Northeast',
        x: 80,
        y: 36
    },
    {
        code: 'MA',
        name: 'Massachusetts',
        region: 'Northeast',
        x: 79,
        y: 31
    },
    {
        code: 'VT',
        name: 'Vermont',
        region: 'Northeast',
        x: 77,
        y: 26
    },
    {
        code: 'NH',
        name: 'New Hampshire',
        region: 'Northeast',
        x: 80,
        y: 25
    },
    {
        code: 'ME',
        name: 'Maine',
        region: 'Northeast',
        x: 83,
        y: 18
    }
];
const STATE_HUES = {
    CA: 160,
    CO: 190,
    OR: 155,
    WA: 180,
    NV: 200,
    ME: 150,
    MA: 210,
    NY: 190,
    FL: 170,
    TX: 200
};
function stateColor(code) {
    const base = STATE_HUES[code] ?? 190;
    // We’re not using base directly in classes (Tailwind), but it gives variation if you want inline styles later
    return {
        haloFrom: `rgba(94,234,212,0.32)`,
        haloTo: `rgba(56,189,248,0.28)`,
        pillFrom: 'from-emerald-200/90',
        pillTo: 'to-sky-200/90',
        pillIdle: 'bg-slate-900/70 border-slate-300/40 text-slate-900/80 dark:bg-slate-900/80 dark:border-slate-500/50 dark:text-slate-100'
    };
}
function AdminStateExplorer() {
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["useSession"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selectedState, setSelectedState] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('ME');
    const [stateStats, setStateStats] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [stateLoading, setStateLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [stateError, setStateError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [globalStats, setGlobalStats] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [globalError, setGlobalError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [globalLoading, setGlobalLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (status === 'authenticated') {
            void loadGlobalStats();
            void loadStateStats('ME');
        }
    }, [
        status
    ]);
    async function loadGlobalStats() {
        try {
            setGlobalLoading(true);
            setGlobalError(null);
            const res = await fetch('/api/admin/batches');
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Failed to load global stats');
            }
            const data = await res.json();
            if (!data || data.length === 0) {
                setGlobalStats({
                    totalBatches: 0,
                    activeBatches: 0,
                    labs: 0,
                    brands: 0,
                    lastUpdated: null,
                    totalStatesWithData: 0
                });
                return;
            }
            const brands = new Set();
            const labs = new Set();
            const statesWithData = new Set();
            let activeCount = 0;
            let latest = null;
            for (const b of data){
                if (b.isActive !== false) activeCount++;
                if (b.brand?.id) brands.add(b.brand.id);
                if (b.labResults) {
                    for (const lr of b.labResults){
                        if (lr.lab?.id) labs.add(lr.lab.id);
                    }
                }
                if (b.stateCode) statesWithData.add(b.stateCode);
                const updated = b.updatedAt;
                if (updated && (!latest || new Date(updated) > new Date(latest))) {
                    latest = updated;
                }
            }
            setGlobalStats({
                totalBatches: data.length,
                activeBatches: activeCount,
                labs: labs.size,
                brands: brands.size,
                lastUpdated: latest,
                totalStatesWithData: statesWithData.size
            });
        } catch (err) {
            console.error('Failed to load global stats', err);
            setGlobalError(err.message || 'Failed to load global stats');
        } finally{
            setGlobalLoading(false);
        }
    }
    async function loadStateStats(code) {
        try {
            setStateLoading(true);
            setStateError(null);
            const res = await fetch(`/api/admin/batches?stateCode=${encodeURIComponent(code)}`);
            if (res.status === 401) {
                throw new Error('Unauthorized');
            }
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || 'Failed to load batches');
            }
            const data = await res.json();
            if (!data || data.length === 0) {
                setStateStats((prev)=>({
                        ...prev,
                        [code]: {
                            totalBatches: 0,
                            activeBatches: 0,
                            labs: 0,
                            brands: 0,
                            lastUpdated: null
                        }
                    }));
                return;
            }
            const brands = new Set();
            const labs = new Set();
            let activeCount = 0;
            let latest = null;
            for (const b of data){
                if (b.isActive !== false) activeCount++;
                if (b.brand?.id) brands.add(b.brand.id);
                if (b.labResults) {
                    for (const lr of b.labResults){
                        if (lr.lab?.id) labs.add(lr.lab.id);
                    }
                }
                const updated = b.updatedAt;
                if (updated && (!latest || new Date(updated) > new Date(latest))) {
                    latest = updated;
                }
            }
            setStateStats((prev)=>({
                    ...prev,
                    [code]: {
                        totalBatches: data.length,
                        activeBatches: activeCount,
                        labs: labs.size,
                        brands: brands.size,
                        lastUpdated: latest
                    }
                }));
        } catch (err) {
            console.error('Failed to load state stats', err);
            setStateError(err.message || 'Failed to load state batches');
        } finally{
            setStateLoading(false);
        }
    }
    const selectedMeta = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>STATES.find((s)=>s.code === selectedState), [
        selectedState
    ]);
    const selectedStats = selectedState ? stateStats[selectedState] : undefined;
    function handleStateClick(code) {
        setSelectedState(code);
        if (!stateStats[code]) {
            void loadStateStats(code);
        }
    }
    if (status === 'loading') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-4 text-sm text-slate-300",
                children: "Loading admin…"
            }, void 0, false, {
                fileName: "[project]/pages/admin/index.tsx",
                lineNumber: 304,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/admin/index.tsx",
            lineNumber: 303,
            columnNumber: 7
        }, this);
    }
    if (!session) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-4 text-sm text-slate-300",
                children: "Please sign in as an admin to view the CartFax state explorer."
            }, void 0, false, {
                fileName: "[project]/pages/admin/index.tsx",
                lineNumber: 314,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/admin/index.tsx",
            lineNumber: 313,
            columnNumber: 7
        }, this);
    }
    const globalLastUpdated = globalStats?.lastUpdated ? new Date(globalStats.lastUpdated).toLocaleString() : null;
    const stateLastUpdated = selectedStats?.lastUpdated ? new Date(selectedStats.lastUpdated).toLocaleString() : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            className: "px-4 py-10 md:px-8 max-w-6xl mx-auto space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-emerald-200 shadow-[0_0_40px_rgba(52,211,153,0.5)]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin/index.tsx",
                                            lineNumber: 336,
                                            columnNumber: 15
                                        }, this),
                                        "CartFax · State explorer"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/index.tsx",
                                    lineNumber: 335,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: "mt-3 text-2xl md:text-3xl font-semibold text-slate-50",
                                    children: "A living constellation of legal cannabis batches."
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/index.tsx",
                                    lineNumber: 339,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "mt-2 max-w-xl text-sm text-slate-300",
                                    children: "Each state is a glowing node in the CartFax network. Tap one to see how many batches, brands, and labs we're tracking on the ground."
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/index.tsx",
                                    lineNumber: 342,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin/index.tsx",
                            lineNumber: 334,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex gap-2 md:gap-3 flex-wrap md:justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin/uploads",
                                    className: "rounded-full border border-slate-400/60 bg-slate-100/5 px-3 py-1.5 text-xs text-slate-100 hover:border-emerald-300/80 hover:text-emerald-100 transition",
                                    children: "COA uploads"
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/index.tsx",
                                    lineNumber: 350,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/admin/batches",
                                    className: "rounded-full border border-slate-400/60 bg-slate-100/5 px-3 py-1.5 text-xs text-slate-100 hover:border-emerald-300/80 hover:text-emerald-100 transition",
                                    children: "Batch list"
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/index.tsx",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push(`/admin/states/${selectedState}`),
                                    className: "rounded-full bg-emerald-300 text-slate-950 px-3 py-1.5 text-xs font-medium hover:bg-emerald-200 transition shadow-[0_0_35px_rgba(52,211,153,0.8)]",
                                    children: [
                                        "Deep dive ",
                                        selectedState,
                                        " →"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/index.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin/index.tsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/admin/index.tsx",
                    lineNumber: 333,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "relative overflow-hidden rounded-3xl border border-slate-300/10 bg-white/5 px-4 py-6 md:px-6 md:py-8 backdrop-blur-3xl shadow-[0_40px_140px_rgba(15,23,42,0.9)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute -top-32 -left-10 h-72 w-72 rounded-full opacity-60 blur-3xl",
                            style: {
                                background: 'radial-gradient(circle at 20% 30%, rgba(94,234,212,0.45), transparent 60%)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/index.tsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full opacity-60 blur-3xl",
                            style: {
                                background: 'radial-gradient(circle at 70% 70%, rgba(56,189,248,0.4), transparent 60%)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/pages/admin/index.tsx",
                            lineNumber: 381,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "relative flex flex-col gap-8 md:grid md:grid-cols-[minmax(0,3fr)_minmax(0,2.1fr)] md:gap-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "text-[11px] uppercase tracking-[0.22em] text-slate-300",
                                                    children: "Interactive state field"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/index.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3 text-[11px] text-slate-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 398,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "Has batches"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 397,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "h-2 w-2 rounded-full bg-slate-500/80"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 402,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "No data yet"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 401,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/index.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/index.tsx",
                                            lineNumber: 392,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "mt-4 relative h-[420px] md:h-[460px] rounded-3xl border border-slate-200/20 bg-slate-950/40 backdrop-blur-3xl overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "pointer-events-none absolute inset-0 opacity-60",
                                                    style: {
                                                        background: 'radial-gradient(circle at 45% 45%, rgba(148,163,184,0.28), transparent 60%), radial-gradient(circle at 75% 30%, rgba(209,250,229,0.4), transparent 55%)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin/index.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 17
                                                }, this),
                                                STATES.map((s)=>{
                                                    const isSelected = s.code === selectedState;
                                                    const stats = stateStats[s.code];
                                                    const hasData = !!stats && stats.totalBatches > 0;
                                                    const colors = stateColor(s.code);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleStateClick(s.code),
                                                        style: {
                                                            position: 'absolute',
                                                            left: `${s.x}%`,
                                                            top: `${s.y}%`,
                                                            transform: 'translate(-50%, -50%)'
                                                        },
                                                        className: [
                                                            'group relative flex flex-col items-center justify-center rounded-full px-3 py-2 text-[10px] font-medium transition-all',
                                                            'backdrop-blur-xl border shadow-[0_18px_45px_rgba(15,23,42,0.85)]',
                                                            isSelected ? `border-emerald-200/90 bg-gradient-to-br ${colors.pillFrom} ${colors.pillTo} text-slate-950 ring-2 ring-emerald-300/60 scale-[1.06]` : hasData ? 'bg-slate-100/90 text-slate-900 border-emerald-200/60 hover:border-emerald-300/90 hover:shadow-[0_0_35px_rgba(52,211,153,0.8)]' : 'bg-slate-900/80 text-slate-300 border-slate-500/50 hover:border-slate-200/80 hover:text-slate-50'
                                                        ].join(' '),
                                                        children: [
                                                            isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "pointer-events-none absolute -inset-2 rounded-full opacity-70 blur-2xl",
                                                                style: {
                                                                    background: `radial-gradient(circle at 50% 50%, ${colors.haloFrom}, transparent 60%)`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/index.tsx",
                                                                lineNumber: 446,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "relative z-10 flex items-baseline gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "text-[11px] font-semibold tracking-wide",
                                                                        children: s.code
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/admin/index.tsx",
                                                                        lineNumber: 455,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "text-[9px] opacity-80",
                                                                        children: s.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/admin/index.tsx",
                                                                        lineNumber: 458,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/admin/index.tsx",
                                                                lineNumber: 454,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "relative z-10 mt-0.5 text-[9px] text-slate-700 group-hover:text-slate-800",
                                                                children: hasData ? `${stats?.totalBatches ?? 0} batch${(stats?.totalBatches ?? 0) === 1 ? '' : 'es'}` : 'No data yet'
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/index.tsx",
                                                                lineNumber: 461,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: [
                                                                    'pointer-events-none absolute -bottom-1 -right-0.5 h-2 w-2 rounded-full',
                                                                    hasData ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]' : 'bg-slate-500'
                                                                ].join(' ')
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/admin/index.tsx",
                                                                lineNumber: 470,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, s.code, true, {
                                                        fileName: "[project]/pages/admin/index.tsx",
                                                        lineNumber: 425,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/index.tsx",
                                            lineNumber: 408,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin/index.tsx",
                                    lineNumber: 391,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "md:absolute md:right-0 md:top-0 md:w-full",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-4 backdrop-blur-3xl shadow-[0_24px_90px_rgba(15,23,42,0.95)]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "text-[11px] uppercase tracking-[0.18em] text-slate-400",
                                                                    children: "State snapshot"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 488,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2 flex items-baseline gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                            className: "text-xl font-semibold text-slate-50",
                                                                            children: selectedState
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/admin/index.tsx",
                                                                            lineNumber: 492,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm text-slate-200",
                                                                            children: selectedMeta?.name ?? 'Unknown'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/admin/index.tsx",
                                                                            lineNumber: 495,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 491,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-[11px] text-slate-400",
                                                                    children: [
                                                                        selectedMeta?.region,
                                                                        " · CartFax coverage in real time"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 499,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 487,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>router.push(`/admin/states/${selectedState}`),
                                                            className: "hidden md:inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-emerald-300/80 hover:text-emerald-100 transition",
                                                            children: [
                                                                "Open full view",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    "aria-hidden": true,
                                                                    children: "↗"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 508,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 503,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/index.tsx",
                                                    lineNumber: 486,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 grid grid-cols-2 gap-3 text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "text-[10px] uppercase tracking-[0.16em] text-slate-400",
                                                                    children: "Total batches"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 515,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-lg font-semibold text-slate-50",
                                                                    children: selectedStats ? selectedStats.totalBatches : '—'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 518,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 514,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "rounded-xl border border-emerald-400/50 bg-emerald-400/10 px-3 py-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "text-[10px] uppercase tracking-[0.16em] text-emerald-200",
                                                                    children: "Active batches"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 523,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-lg font-semibold text-emerald-100",
                                                                    children: selectedStats ? selectedStats.activeBatches : '—'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 526,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 522,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "text-[10px] uppercase tracking-[0.16em] text-slate-400",
                                                                    children: "Unique labs"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 531,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-lg font-semibold text-slate-50",
                                                                    children: selectedStats ? selectedStats.labs : '—'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 534,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "text-[10px] uppercase tracking-[0.16em] text-slate-400",
                                                                    children: "Brands in state"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 539,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "mt-1 text-lg font-semibold text-slate-50",
                                                                    children: selectedStats ? selectedStats.brands : '—'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 542,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/index.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 flex flex-col gap-2 text-[11px] text-slate-400",
                                                    children: [
                                                        stateLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                "Syncing ",
                                                                selectedState,
                                                                "… crunching batches and labs."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 551,
                                                            columnNumber: 23
                                                        }, this),
                                                        stateError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "text-red-400",
                                                            children: stateError === 'Unauthorized' ? 'Your session is missing admin privileges for this endpoint.' : stateError
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 554,
                                                            columnNumber: 23
                                                        }, this),
                                                        selectedStats && stateLastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                "Last batch activity: ",
                                                                stateLastUpdated
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 561,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/index.tsx",
                                                    lineNumber: 549,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "mt-4 border-t border-slate-800/80 pt-3 text-[11px] text-slate-400 flex flex-wrap items-center gap-2",
                                                    children: [
                                                        globalLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            children: "Loading nationwide totals…"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 567,
                                                            columnNumber: 39
                                                        }, this),
                                                        !globalLoading && globalStats && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "h-1.5 w-1.5 rounded-full bg-emerald-300"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/admin/index.tsx",
                                                                            lineNumber: 571,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        globalStats.totalBatches,
                                                                        " batches tracked"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 570,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "h-1.5 w-1.5 rounded-full bg-sky-300"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/admin/index.tsx",
                                                                            lineNumber: 575,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        globalStats.labs,
                                                                        " labs · ",
                                                                        globalStats.brands,
                                                                        " brands"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 574,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "h-1.5 w-1.5 rounded-full bg-slate-400"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/admin/index.tsx",
                                                                            lineNumber: 579,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        globalStats.totalStatesWithData,
                                                                        " states with data"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 578,
                                                                    columnNumber: 25
                                                                }, this),
                                                                globalLastUpdated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "h-1.5 w-1.5 rounded-full bg-slate-500"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/admin/index.tsx",
                                                                            lineNumber: 584,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        "System updated ",
                                                                        globalLastUpdated
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/admin/index.tsx",
                                                                    lineNumber: 583,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        globalError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-red-400",
                                                            children: [
                                                                "Global stats error: ",
                                                                globalError
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin/index.tsx",
                                                            lineNumber: 591,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/index.tsx",
                                                    lineNumber: 566,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push(`/admin/states/${selectedState}`),
                                                    className: "mt-3 inline-flex w-full items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-emerald-300/80 hover:text-emerald-100 transition md:hidden",
                                                    children: [
                                                        "Open full view for ",
                                                        selectedState,
                                                        " ↗"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/admin/index.tsx",
                                                    lineNumber: 598,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin/index.tsx",
                                            lineNumber: 485,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin/index.tsx",
                                        lineNumber: 484,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin/index.tsx",
                                    lineNumber: 483,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin/index.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/admin/index.tsx",
                    lineNumber: 372,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/admin/index.tsx",
            lineNumber: 331,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/admin/index.tsx",
        lineNumber: 330,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bbd59560._.js.map