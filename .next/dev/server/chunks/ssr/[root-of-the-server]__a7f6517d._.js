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
"[project]/components/AdminStateExplorer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/AdminStateExplorer.tsx
__turbopack_context__.s([
    "default",
    ()=>AdminStateExplorer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/react [external] (next-auth/react, cjs)");
;
;
;
;
// Regions + states
const REGION_GROUPS = [
    {
        name: 'West',
        states: [
            {
                code: 'WA',
                name: 'Washington'
            },
            {
                code: 'OR',
                name: 'Oregon'
            },
            {
                code: 'CA',
                name: 'California'
            },
            {
                code: 'NV',
                name: 'Nevada'
            },
            {
                code: 'AZ',
                name: 'Arizona'
            },
            {
                code: 'UT',
                name: 'Utah'
            },
            {
                code: 'CO',
                name: 'Colorado'
            },
            {
                code: 'NM',
                name: 'New Mexico'
            },
            {
                code: 'AK',
                name: 'Alaska'
            },
            {
                code: 'HI',
                name: 'Hawaii'
            }
        ]
    },
    {
        name: 'Midwest',
        states: [
            {
                code: 'MT',
                name: 'Montana'
            },
            {
                code: 'ID',
                name: 'Idaho'
            },
            {
                code: 'WY',
                name: 'Wyoming'
            },
            {
                code: 'ND',
                name: 'North Dakota'
            },
            {
                code: 'SD',
                name: 'South Dakota'
            },
            {
                code: 'NE',
                name: 'Nebraska'
            },
            {
                code: 'KS',
                name: 'Kansas'
            },
            {
                code: 'MN',
                name: 'Minnesota'
            },
            {
                code: 'IA',
                name: 'Iowa'
            },
            {
                code: 'MO',
                name: 'Missouri'
            },
            {
                code: 'WI',
                name: 'Wisconsin'
            },
            {
                code: 'IL',
                name: 'Illinois'
            },
            {
                code: 'MI',
                name: 'Michigan'
            },
            {
                code: 'IN',
                name: 'Indiana'
            },
            {
                code: 'OH',
                name: 'Ohio'
            }
        ]
    },
    {
        name: 'South',
        states: [
            {
                code: 'TX',
                name: 'Texas'
            },
            {
                code: 'OK',
                name: 'Oklahoma'
            },
            {
                code: 'AR',
                name: 'Arkansas'
            },
            {
                code: 'LA',
                name: 'Louisiana'
            },
            {
                code: 'MS',
                name: 'Mississippi'
            },
            {
                code: 'AL',
                name: 'Alabama'
            },
            {
                code: 'TN',
                name: 'Tennessee'
            },
            {
                code: 'KY',
                name: 'Kentucky'
            },
            {
                code: 'GA',
                name: 'Georgia'
            },
            {
                code: 'FL',
                name: 'Florida'
            },
            {
                code: 'SC',
                name: 'South Carolina'
            },
            {
                code: 'NC',
                name: 'North Carolina'
            },
            {
                code: 'VA',
                name: 'Virginia'
            },
            {
                code: 'WV',
                name: 'West Virginia'
            }
        ]
    },
    {
        name: 'Northeast',
        states: [
            {
                code: 'PA',
                name: 'Pennsylvania'
            },
            {
                code: 'NY',
                name: 'New York'
            },
            {
                code: 'VT',
                name: 'Vermont'
            },
            {
                code: 'NH',
                name: 'New Hampshire'
            },
            {
                code: 'ME',
                name: 'Maine'
            },
            {
                code: 'MA',
                name: 'Massachusetts'
            },
            {
                code: 'RI',
                name: 'Rhode Island'
            },
            {
                code: 'CT',
                name: 'Connecticut'
            },
            {
                code: 'NJ',
                name: 'New Jersey'
            },
            {
                code: 'DE',
                name: 'Delaware'
            },
            {
                code: 'MD',
                name: 'Maryland'
            },
            {
                code: 'DC',
                name: 'District of Columbia'
            }
        ]
    }
];
const ALL_STATES = REGION_GROUPS.flatMap((region)=>region.states);
// US-ish layout for each state in a 0–100 x / y plane
const STATE_POSITIONS = {
    // West / Alaska / Hawaii
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
    // Rockies / Plains / Upper Midwest
    MT: {
        x: 26,
        y: 20
    },
    ID: {
        x: 19,
        y: 27
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
    // South / Gulf / Lower Midwest
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
    // Northeast / Mid-Atlantic
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
    }
};
const WESTERN_STATE_CODES = [
    'WA',
    'OR',
    'CA',
    'NV',
    'AZ',
    'UT',
    'CO',
    'NM',
    'AK',
    'HI',
    'ID',
    'MT',
    'WY'
];
const WESTERN_STATE_SET = new Set(WESTERN_STATE_CODES);
function findStateMeta(code) {
    const match = ALL_STATES.find((s)=>s.code === code);
    return match ?? ALL_STATES.find((s)=>s.code === 'CA') ?? ALL_STATES[0];
}
// Placeholder metric generator; swap with real data when ready
function generateMetrics(code) {
    const base = code.charCodeAt(0) + code.charCodeAt(1);
    const clamp = (value, min, max)=>Math.min(max, Math.max(min, value));
    return {
        batchesTracked: clamp(200 + base % 260, 120, 460),
        labsReporting: clamp(3 + base % 8, 2, 12),
        recentRecalls: base % 5,
        passingRate: clamp(82 + base % 11, 78, 97)
    };
}
// Light, metallic gradients for state buttons
function getStateGradient(code) {
    const base = code.charCodeAt(0) + code.charCodeAt(1);
    const palette = [
        // silver → teal → sky
        'from-slate-100 via-emerald-300 to-sky-400',
        // silver → sky → green
        'from-slate-100 via-sky-300 to-emerald-400',
        // silver → cyan → lime
        'from-slate-100 via-cyan-300 to-lime-300'
    ];
    return palette[base % palette.length];
}
// Clip-paths approximating more map-like shapes in the West and gem-shapes elsewhere
function getStateClipPath(code) {
    if (WESTERN_STATE_SET.has(code)) {
        switch(code){
            case 'CA':
                return 'polygon(30% 2%, 78% 4%, 88% 22%, 80% 40%, 86% 60%, 78% 92 52% 98%, 34% 82%, 30% 66%, 22% 52%, 24% 34%)';
            case 'OR':
                return 'polygon(20% 8%, 82% 6%, 90% 55%, 22% 60%)';
            case 'WA':
                return 'polygon(10% 12%, 88% 12%, 92% 42%, 80% 55%, 14% 50%)';
            case 'NV':
                return 'polygon(35% 6%, 80% 16%, 72% 76%, 45% 100%, 22% 70%)';
            case 'AZ':
                return 'polygon(24% 8%, 80% 15%, 90% 60%, 60% 96%, 24% 88%, 16% 42%)';
            case 'UT':
                return 'polygon(30% 10%, 80% 12%, 80% 80%, 30% 78%)';
            case 'CO':
                return 'polygon(18% 18%, 85% 18%, 85% 80%, 18% 80%)';
            case 'NM':
                return 'polygon(22% 20%, 84% 20%, 86% 78%, 32% 92%, 20% 75%)';
            case 'AK':
                return 'polygon(10% 36%, 30% 10%, 72% 8%, 90% 34%, 80% 80%, 40% 96%, 14% 76%)';
            case 'HI':
                return 'polygon(18% 42%, 45% 32%, 72% 40%, 82% 66%, 55% 82%, 25% 72%)';
            case 'ID':
                return 'polygon(50% 0%, 72% 12%, 72% 55%, 36% 100%, 22% 70%, 30% 16%)';
            case 'MT':
                return 'polygon(6% 18%, 90% 10%, 94% 44%, 10% 52%)';
            case 'WY':
                return 'polygon(18% 20%, 86% 20%, 82% 78%, 20% 78%)';
            default:
                return 'polygon(20% 10%, 80% 10%, 88% 60%, 25% 85%, 12% 50%)';
        }
    }
    // Non-western: softer “gem” diamond with rounded feel
    return 'polygon(50% 4%, 88% 25%, 94% 60%, 70% 96%, 30% 96%, 6% 60%, 12% 25%)';
}
function getStateSize(code) {
    if (code === 'CA') {
        // Taller than wide so the silhouette feels like real California
        return {
            w: 80,
            h: 130
        };
    }
    if (WESTERN_STATE_SET.has(code)) {
        return {
            w: 86,
            h: 76
        };
    }
    return {
        w: 70,
        h: 70
    };
}
const roleLabel = {
    guest: 'Guest view',
    user: 'Verified user',
    operator: 'Licensed operator',
    legislator: 'State legislator',
    admin: 'CartFax admin'
};
const roleHint = {
    guest: 'Sign in to unlock deeper recall history, COA uploads, and verification tools.',
    user: 'Browse state-level lab data and public recalls. Admin tools require elevated access.',
    operator: 'Compare your batches against statewide trends and lab performance over time.',
    legislator: 'Scan safety signals, recall density, and lab coverage for your state.',
    admin: 'Full power: COA uploads, parsers, recall streams, and batch verifications.'
};
function AdminStateExplorer({ initialStateCode }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: session, status } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["useSession"])();
    const isAuthed = status === 'authenticated';
    const role = (()=>{
        const rawRole = session?.user?.role;
        if (!rawRole) return 'guest';
        if (rawRole === 'admin') return 'admin';
        if (rawRole === 'operator') return 'operator';
        if (rawRole === 'legislator') return 'legislator';
        return 'user';
    })();
    const [selectedCode, setSelectedCode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(findStateMeta(initialStateCode).code);
    const [hoveredCode, setHoveredCode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const activeState = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>findStateMeta(selectedCode), [
        selectedCode
    ]);
    const metrics = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>generateMetrics(activeState.code), [
        activeState.code
    ]);
    const isAdmin = role === 'admin';
    const handleStateClick = (code)=>{
        setSelectedCode(code);
    };
    const handleAdminToolsClick = ()=>{
        if (!isAuthed || !isAdmin) {
            void (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["signIn"])(undefined, {
                callbackUrl: '/admin'
            });
            return;
        }
        router.push('/admin');
    };
    const handleBatchExplorerClick = ()=>{
        if (!isAuthed || !isAdmin) {
            void (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["signIn"])(undefined, {
                callbackUrl: '/admin/batches'
            });
            return;
        }
        router.push(`/admin/batches?state=${activeState.code}`);
    };
    const handleCoaToolsClick = ()=>{
        if (!isAuthed || !isAdmin) {
            void (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["signIn"])(undefined, {
                callbackUrl: '/admin/uploads'
            });
            return;
        }
        router.push('/admin/uploads');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "min-h-[calc(100vh-5rem)] bg-gradient-to-b from-slate-950 via-slate-950/95 to-black",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            className: "mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col px-0 py-4 sm:px-0 sm:py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "mt-2 px-4 sm:px-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto max-w-6xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute -inset-x-32 -inset-y-16 opacity-60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute -left-24 top-6 h-64 w-64 rounded-full bg-emerald-500/25 blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 348,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-10 bottom-0 h-40 rounded-[4rem] bg-gradient-to-t from-black via-transparent to-transparent blur-2xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 350,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 347,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative mx-auto rounded-[4rem] border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-950 to-black shadow-[0_40px_120px_rgba(0,0,0,0.9)] overflow-hidden px-5 py-5 sm:px-9 sm:py-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] uppercase tracking-[0.22em] text-sky-400/90",
                                                        children: "United States · hybrid atlas"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "max-w-xl text-xs text-slate-400",
                                                        children: "Western states lean into geography, eastern states lean into gems. Everything floats on a dark, glassy canvas."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "hidden md:flex flex-col items-end gap-1 text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] uppercase",
                                                                children: role === 'guest' ? '?' : role === 'admin' ? 'A' : role[0].toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-slate-100",
                                                                children: roleLabel[role]
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 375,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "max-w-xs text-[10px] text-slate-500",
                                                        children: roleHint[role]
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 366,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "mt-4 relative h-[420px] sm:h-[480px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "pointer-events-none absolute inset-2 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,_rgba(148,163,184,0.22)_0,_rgba(15,23,42,1)_70%)] border border-slate-800/70"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 388,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative z-10 h-full",
                                                children: ALL_STATES.map((state)=>{
                                                    const pos = STATE_POSITIONS[state.code] ?? {
                                                        x: 50,
                                                        y: 50
                                                    };
                                                    const isActive = state.code === activeState.code;
                                                    const gradient = getStateGradient(state.code);
                                                    const { w, h } = getStateSize(state.code);
                                                    const clipPath = getStateClipPath(state.code);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>handleStateClick(state.code),
                                                        onMouseEnter: ()=>setHoveredCode(state.code),
                                                        onMouseLeave: ()=>setHoveredCode((prev)=>prev === state.code ? null : prev),
                                                        style: {
                                                            left: `${pos.x}%`,
                                                            top: `${pos.y}%`,
                                                            width: `${w}px`,
                                                            height: `${h}px`,
                                                            clipPath,
                                                            zIndex: hoveredCode === state.code ? 60 : isActive ? 55 : 40
                                                        },
                                                        className: `group absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border bg-gradient-to-br ${gradient} shadow-[0_18px_40px_rgba(0,0,0,0.9)] transition-transform duration-200 ${isActive ? 'border-sky-400/90 scale-[1.08] shadow-[0_24px_70px_rgba(56,189,248,0.85)]' : 'border-slate-300/80 hover:border-emerald-300 hover:scale-[1.06] hover:shadow-[0_24px_60px_rgba(56,189,248,0.75)]'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "pointer-events-none absolute inset-[1px] border border-white/40/80 bg-gradient-to-br from-white/20 via-white/5 to-transparent mix-blend-screen"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 437,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "pointer-events-none absolute inset-0 blur-xl opacity-60 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.55)_0,_transparent_55%)]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 439,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "relative z-10 text-[11px] font-semibold uppercase tracking-wide text-slate-900 drop-shadow-sm",
                                                                children: state.code
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, state.code, true, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 403,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 386,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 354,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 345,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 344,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "mt-8 grid gap-6 px-4 sm:px-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.9)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-300",
                                                        children: activeState.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 459,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "h-4 w-[1px] bg-slate-700"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 462,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-slate-400",
                                                        children: activeState.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 463,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 458,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                className: "mt-3 text-xl font-semibold text-slate-50",
                                                children: "Safety snapshot & batch activity"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 467,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "mt-1.5 text-sm text-slate-400",
                                                children: "Lightweight, illustrative metrics for now. You'll wire these directly to CartFax's real batch, lab, and recall data."
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 470,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 457,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 456,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("dl", {
                                    className: "mt-5 grid gap-4 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-slate-950/70 px-4 py-3 border border-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("dt", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Batches tracked"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 480,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("dd", {
                                                    className: "mt-1 flex items-baseline gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl font-semibold text-emerald-300",
                                                            children: metrics.batchesTracked.toLocaleString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 482,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-slate-500",
                                                            children: "est. capacity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 485,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 479,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-slate-950/70 px-4 py-3 border border-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("dt", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Labs reporting"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("dd", {
                                                    className: "mt-1 flex items-baseline gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl font-semibold text-emerald-300",
                                                            children: metrics.labsReporting
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 493,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-slate-500",
                                                            children: "active partners"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 496,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 490,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-slate-950/70 px-4 py-3 border border-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("dt", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Recent recalls"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("dd", {
                                                    className: "mt-1 flex items-baseline gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl font-semibold text-emerald-300",
                                                            children: metrics.recentRecalls
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-slate-500",
                                                            children: "in last 12 months"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 507,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 503,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 501,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "rounded-2xl bg-slate-950/70 px-4 py-3 border border-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("dt", {
                                                    className: "text-xs text-slate-400",
                                                    children: "Passing rate"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("dd", {
                                                    className: "mt-1 flex items-baseline gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-2xl font-semibold text-emerald-300",
                                                            children: [
                                                                metrics.passingRate,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 515,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-slate-500",
                                                            children: "COAs marked passing"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 518,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 514,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 512,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 478,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-[11px] text-slate-500",
                                    children: [
                                        "These are placeholder numbers to make the experience feel alive. Once you're ready, replace",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("code", {
                                            className: "rounded bg-slate-800/80 px-1 py-0.5",
                                            children: "generateMetrics"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 528,
                                            columnNumber: 15
                                        }, this),
                                        ' ',
                                        "with real queries from your admin APIs."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 525,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 455,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.9)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "text-sm font-semibold text-slate-100",
                                        children: "Admin data tools"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 538,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-400",
                                        children: "This panel is your backstage pass. When you're signed in as an admin, these tiles open the full CartFax backend: batches, COAs, brands, locations, and more."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 541,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "mt-4 space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleAdminToolsClick,
                                                className: "group w-full rounded-2xl border border-emerald-500/60 bg-gradient-to-r from-emerald-600/40 via-emerald-500/20 to-slate-950 px-4 py-3 text-left text-sm text-slate-50 shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all hover:border-emerald-300 hover:shadow-[0_0_60px_rgba(16,185,129,0.8)]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs font-semibold uppercase tracking-[0.16em]",
                                                                            children: "Admin hub"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 557,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "rounded-full bg-slate-950/70 px-2 py-0.5 text-[10px] text-emerald-200",
                                                                            children: isAdmin ? 'Unlocked' : 'Admin only'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 560,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 556,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-xs text-emerald-50/80",
                                                                    children: "Open the dashboard with big tiles for batches, labs, COAs, brands, locations, and recalls."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 564,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 555,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "shrink-0 text-lg leading-none group-hover:translate-x-0.5 transition-transform",
                                                            children: "↗"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 569,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 554,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 549,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleBatchExplorerClick,
                                                className: "group w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-left text-sm text-slate-100 transition-all hover:border-emerald-400/80 hover:bg-slate-950 hover:shadow-[0_0_32px_rgba(16,185,129,0.4)]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs font-semibold uppercase tracking-[0.16em]",
                                                                            children: "Batch explorer"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 584,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-slate-400",
                                                                            children: [
                                                                                activeState.code,
                                                                                " focus"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 587,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 583,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-xs text-slate-400",
                                                                    children: [
                                                                        "Jump into admin batches, pre-filtered for",
                                                                        ' ',
                                                                        activeState.name,
                                                                        ". Drill into COAs and lab detail."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 591,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "shrink-0 text-lg leading-none group-hover:translate-x-0.5 transition-transform",
                                                            children: "⤵"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 596,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 576,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleCoaToolsClick,
                                                className: "group w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-left text-sm text-slate-100 transition-all hover:border-emerald-400/80 hover:bg-slate-950 hover:shadow-[0_0_32px_rgba(16,185,129,0.4)]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs font-semibold uppercase tracking-[0.16em]",
                                                                            children: "COA uploads & parsers"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 611,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-slate-400",
                                                                            children: "Admin only"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 614,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 610,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-xs text-slate-400",
                                                                    children: "Manage PDFs, parsed fields, and verification passes. The engine room of CartFax."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 618,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "shrink-0 text-lg leading-none group-hover:translate-x-0.5 transition-transform",
                                                            children: "⚙"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 623,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 603,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 547,
                                        columnNumber: 15
                                    }, this),
                                    !isAuthed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-[11px] text-slate-500",
                                        children: [
                                            "You're currently browsing as a guest. Click any admin tile above to sign in with your",
                                            ' ',
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("code", {
                                                className: "rounded bg-slate-800/80 px-1 py-0.5",
                                                children: "admin@…"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 634,
                                                columnNumber: 19
                                            }, this),
                                            ' ',
                                            "account and unlock the full backend."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 631,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 537,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 536,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 453,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AdminStateExplorer.tsx",
            lineNumber: 342,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 341,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__a7f6517d._.js.map