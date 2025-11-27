module.exports = [
"[project]/components/AdminStateExplorer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/AdminStateExplorer.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
;
;
;
const GlobeStates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/components/GlobeStates.tsx [ssr] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/components/GlobeStates.tsx [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "flex h-full w-full items-center justify-center text-xs text-slate-500",
            children: "Loading 3D atlas…"
        }, void 0, false, {
            fileName: "[project]/components/AdminStateExplorer.tsx",
            lineNumber: 10,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
});
const regionLabels = [
    {
        id: 'unitedStates',
        label: 'United States'
    },
    {
        id: 'canada',
        label: 'Canada'
    },
    {
        id: 'mexico',
        label: 'Mexico'
    },
    {
        id: 'netherlands',
        label: 'Netherlands'
    }
];
const US_STATES = [
    {
        id: 'AL',
        name: 'Alabama'
    },
    {
        id: 'AK',
        name: 'Alaska'
    },
    {
        id: 'AZ',
        name: 'Arizona'
    },
    {
        id: 'AR',
        name: 'Arkansas'
    },
    {
        id: 'CA',
        name: 'California'
    },
    {
        id: 'CO',
        name: 'Colorado'
    },
    {
        id: 'CT',
        name: 'Connecticut'
    },
    {
        id: 'DE',
        name: 'Delaware'
    },
    {
        id: 'FL',
        name: 'Florida'
    },
    {
        id: 'GA',
        name: 'Georgia'
    },
    {
        id: 'HI',
        name: 'Hawaii'
    },
    {
        id: 'ID',
        name: 'Idaho'
    },
    {
        id: 'IL',
        name: 'Illinois'
    },
    {
        id: 'IN',
        name: 'Indiana'
    },
    {
        id: 'IA',
        name: 'Iowa'
    },
    {
        id: 'KS',
        name: 'Kansas'
    },
    {
        id: 'KY',
        name: 'Kentucky'
    },
    {
        id: 'LA',
        name: 'Louisiana'
    },
    {
        id: 'ME',
        name: 'Maine'
    },
    {
        id: 'MD',
        name: 'Maryland'
    },
    {
        id: 'MA',
        name: 'Massachusetts'
    },
    {
        id: 'MI',
        name: 'Michigan'
    },
    {
        id: 'MN',
        name: 'Minnesota'
    },
    {
        id: 'MS',
        name: 'Mississippi'
    },
    {
        id: 'MO',
        name: 'Missouri'
    },
    {
        id: 'MT',
        name: 'Montana'
    },
    {
        id: 'NE',
        name: 'Nebraska'
    },
    {
        id: 'NV',
        name: 'Nevada'
    },
    {
        id: 'NH',
        name: 'New Hampshire'
    },
    {
        id: 'NJ',
        name: 'New Jersey'
    },
    {
        id: 'NM',
        name: 'New Mexico'
    },
    {
        id: 'NY',
        name: 'New York'
    },
    {
        id: 'NC',
        name: 'North Carolina'
    },
    {
        id: 'ND',
        name: 'North Dakota'
    },
    {
        id: 'OH',
        name: 'Ohio'
    },
    {
        id: 'OK',
        name: 'Oklahoma'
    },
    {
        id: 'OR',
        name: 'Oregon'
    },
    {
        id: 'PA',
        name: 'Pennsylvania'
    },
    {
        id: 'RI',
        name: 'Rhode Island'
    },
    {
        id: 'SC',
        name: 'South Carolina'
    },
    {
        id: 'SD',
        name: 'South Dakota'
    },
    {
        id: 'TN',
        name: 'Tennessee'
    },
    {
        id: 'TX',
        name: 'Texas'
    },
    {
        id: 'UT',
        name: 'Utah'
    },
    {
        id: 'VT',
        name: 'Vermont'
    },
    {
        id: 'VA',
        name: 'Virginia'
    },
    {
        id: 'WA',
        name: 'Washington'
    },
    {
        id: 'WV',
        name: 'West Virginia'
    },
    {
        id: 'WI',
        name: 'Wisconsin'
    },
    {
        id: 'WY',
        name: 'Wyoming'
    }
];
const AdminStateExplorer = ()=>{
    const [region, setRegion] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('unitedStates');
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        id: 'CA',
        name: 'California'
    });
    const [viewAltitude, setViewAltitude] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const zoomedIn = viewAltitude !== null && viewAltitude < 1.6;
    const quickStates = zoomedIn && region === 'unitedStates' ? US_STATES : [];
    const isUS = region === 'unitedStates';
    const handleRegionChange = (next)=>{
        setRegion(next);
        // clear old selection so the card isn't stuck on a random US state
        setSelected({
            id: null,
            name: null
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#f7fafc] text-slate-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mx-auto flex max-w-6xl flex-col px-6 pb-16 pt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-wrap items-baseline gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-500",
                                children: isUS ? 'US · States' : 'Global · Regions'
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-500",
                                children: selected.name ? `${selected.id} · ${selected.name} — metallic glass tiles punched out of a spinning globe.` : 'Tap a region tile to open its safety & COA snapshot.'
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mb-6 flex flex-col items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "inline-flex rounded-full border border-slate-200 bg-white px-1 py-1 shadow-sm",
                                children: regionLabels.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleRegionChange(r.id),
                                        className: 'rounded-full px-4 py-1.5 text-[11px] transition ' + (region === r.id ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/40' : 'text-slate-500 hover:text-slate-900'),
                                        children: r.label
                                    }, r.id, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-[11px] text-slate-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.40)]"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 134,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        children: "Drag to spin · Hover to “lift” · Scroll to zoom · Click to drill in"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex w-full items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "relative aspect-[16/9] w-full max-w-4xl",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GlobeStates, {
                                    region: region,
                                    onRegionChange: handleRegionChange,
                                    onStateSelect: (id, name)=>setSelected({
                                            id: id || null,
                                            name: name || null
                                        }),
                                    onViewChange: (alt)=>setViewAltitude(alt)
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 144,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            quickStates.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                className: "fixed left-6 top-1/2 z-30 hidden max-h-[420px] w-60 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white/95 px-3 py-3 text-[11px] text-slate-700 shadow-[0_18px_60px_rgba(15,23,42,0.16)] backdrop-blur lg:block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400",
                        children: "Quick jump"
                    }, void 0, false, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "max-h-[360px] overflow-y-auto pr-1",
                        children: quickStates.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelected({
                                        id: s.id,
                                        name: s.name
                                    }),
                                className: 'mb-[3px] w-full rounded-full px-2 py-1 text-left transition ' + (selected.id === s.id ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'),
                                children: [
                                    s.id,
                                    " · ",
                                    s.name
                                ]
                            }, s.id, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 170,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 164,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            selected.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed bottom-6 right-6 z-30 max-w-sm rounded-2xl border border-slate-200 bg-white/95 px-4 py-4 text-sm text-slate-800 shadow-[0_22px_70px_rgba(15,23,42,0.35)] backdrop-blur",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-500",
                        children: [
                            selected.id,
                            " · ",
                            isUS ? 'State snapshot' : 'Region snapshot'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-base font-semibold",
                        children: selected.name
                    }, void 0, false, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "mb-4 text-xs text-slate-500",
                        children: [
                            "This panel will show live batch safety, lab coverage, and recall activity for ",
                            selected.name,
                            ". Connect it directly to your real COA, batch, and recall data."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/admin",
                                className: "inline-flex items-center justify-center rounded-full bg-sky-500 px-4 py-1.5 text-xs font-medium text-white shadow-sm shadow-sky-500/40 transition hover:bg-sky-600",
                                children: "Open admin data tools"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelected({
                                        id: null,
                                        name: null
                                    }),
                                className: "text-[11px] text-slate-400 hover:text-slate-600",
                                children: "Dismiss"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 192,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = AdminStateExplorer;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__8f5304cb._.js.map