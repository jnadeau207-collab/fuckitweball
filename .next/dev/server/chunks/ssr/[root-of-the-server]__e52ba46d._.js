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
"[externals]/@react-three/fiber [external] (@react-three/fiber, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@react-three/fiber", () => require("@react-three/fiber"));

module.exports = mod;
}),
"[project]/components/GemMapScene.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/GemMapScene.tsx
__turbopack_context__.s([
    "default",
    ()=>GemMapScene
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@react-three/fiber [external] (@react-three/fiber, cjs)");
'use client';
;
;
;
function FloatingOrb({ position, color = '#4ade80', size = 0.7 }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$29$__["useFrame"])((state)=>{
        if (!ref.current) return;
        const t = state.clock.getElapsedTime();
        // Gentle bobbing + slow spin
        ref.current.position.y = position[1] + Math.sin(t * 1.2 + position[0]) * 0.4;
        ref.current.rotation.y += 0.01;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("mesh", {
        ref: ref,
        position: position,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("sphereGeometry", {
                args: [
                    size,
                    48,
                    48
                ]
            }, void 0, false, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meshStandardMaterial", {
                color: color,
                metalness: 0.8,
                roughness: 0.15,
                emissive: color,
                emissiveIntensity: 0.25
            }, void 0, false, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/GemMapScene.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
function GemMapSceneInner() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    '#e7f5ff'
                ]
            }, void 0, false, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.8
            }, void 0, false, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("directionalLight", {
                position: [
                    8,
                    12,
                    15
                ],
                intensity: 1.3
            }, void 0, false, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -10,
                    -8,
                    10
                ],
                intensity: 0.5,
                color: "#38bdf8"
            }, void 0, false, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("mesh", {
                rotation: [
                    -Math.PI / 2.3,
                    0,
                    Math.PI / 12
                ],
                position: [
                    0,
                    -2.2,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            28,
                            18
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/GemMapScene.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#f9fafb",
                        metalness: 0.4,
                        roughness: 0.25
                    }, void 0, false, {
                        fileName: "[project]/components/GemMapScene.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FloatingOrb, {
                position: [
                    -7,
                    0.4,
                    3
                ],
                color: "#22c55e",
                size: 0.8
            }, void 0, false, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FloatingOrb, {
                position: [
                    0,
                    1.4,
                    5
                ],
                color: "#06b6d4",
                size: 0.9
            }, void 0, false, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FloatingOrb, {
                position: [
                    7,
                    0.2,
                    2
                ],
                color: "#a855f7",
                size: 0.7
            }, void 0, false, {
                fileName: "[project]/components/GemMapScene.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
function GemMapScene() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$react$2d$three$2f$fiber__$5b$external$5d$__$2840$react$2d$three$2f$fiber$2c$__cjs$29$__["Canvas"], {
        camera: {
            position: [
                0,
                6,
                18
            ],
            fov: 40
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(GemMapSceneInner, {}, void 0, false, {
            fileName: "[project]/components/GemMapScene.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/GemMapScene.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GemMapScene$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/GemMapScene.tsx [ssr] (ecmascript)");
;
;
;
;
;
// Regions + states: used both for labels and list of states
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
// Normalized layout (0–100) used for both SVG + gem positions
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
// Simple deterministic PRNG so server + client generate same paths
function seededRandom(seed) {
    return ()=>{
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
    };
}
// Generate an organic “blob” outline path centered at (0,0)
function generateBlobPath(seed, radius = 10, points = 10) {
    const rand = seededRandom(seed);
    const angleStep = Math.PI * 2 / points;
    let path = '';
    for(let i = 0; i < points; i++){
        const angle = i * angleStep;
        const r = radius * (0.7 + rand() * 0.5); // slight radius variation
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        path += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    path += ' Z';
    return path;
}
// Western-ish state list for strong “shape mode”
const WESTERN_STATE_CODES = [
    'WA',
    'OR',
    'CA',
    'NV',
    'AZ',
    'UT',
    'CO',
    'NM',
    'ID',
    'MT',
    'WY',
    'AK',
    'HI'
];
const WESTERN_STATE_SET = new Set(WESTERN_STATE_CODES);
// Pre-generate a unique blob path per state
const STATE_BLOB_PATHS = {};
for (const state of ALL_STATES){
    const code = state.code;
    const seed = code.charCodeAt(0) * 31 + code.charCodeAt(1) * 17;
    STATE_BLOB_PATHS[code] = generateBlobPath(seed, 10, 11);
}
function findStateMeta(code) {
    const match = ALL_STATES.find((s)=>s.code === code);
    return match ?? ALL_STATES.find((s)=>s.code === 'CA') ?? ALL_STATES[0];
}
// Placeholder metric generator; swap for real data when ready
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
// Light gradients for gems that stay in the CartFax palette
function getGemGradient(code) {
    const base = code.charCodeAt(0) + code.charCodeAt(1);
    const palette = [
        'from-emerald-400 via-emerald-300 to-sky-300',
        'from-sky-400 via-cyan-300 to-emerald-200',
        'from-lime-300 via-emerald-300 to-sky-400'
    ];
    return palette[base % palette.length];
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
    // 3D tilt for the card (gentle, toward pointer)
    const mapCardRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [tilt, setTilt] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        x: 0,
        y: 3
    });
    const handleMapMouseMove = (event)=>{
        const rect = mapCardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * 7; // softer up/down
        const rotateY = (0.5 - x) * 11; // softer left/right
        setTilt({
            x: rotateY,
            y: rotateX
        });
    };
    const handleMapMouseLeave = ()=>{
        setTilt({
            x: 0,
            y: 3
        });
    };
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
        className: "min-h-[calc(100vh-5rem)] bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            className: "mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col px-0 py-4 sm:px-0 sm:py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "mt-2 px-4 sm:px-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative group",
                        onMouseMove: handleMapMouseMove,
                        onMouseLeave: handleMapMouseLeave,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute -inset-x-24 -inset-y-16 opacity-70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute -left-32 top-4 h-72 w-72 rounded-full bg-emerald-400/25 blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-10 bottom-0 h-40 rounded-[4rem] bg-gradient-to-t from-slate-900 via-transparent to-transparent blur-2xl"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 363,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 360,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                ref: mapCardRef,
                                style: {
                                    transform: `perspective(1600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
                                },
                                className: "relative mx-auto max-w-5xl rounded-[2.5rem] border border-sky-300/60 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 shadow-[0_45px_120px_rgba(15,23,42,0.85)] transition-transform duration-150 ease-out",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute inset-[1px] rounded-[2.45rem] bg-[radial-gradient(circle_at_10%_0,_rgba(255,255,255,0.6)_0,_transparent_55%),radial-gradient(circle_at_90%_0,_rgba(56,189,248,0.25)_0,_transparent_55%)] opacity-80"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 375,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute inset-[1px] overflow-hidden rounded-[2.45rem]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.08)_0,_transparent_60%)]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 379,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-[10%] rounded-[3rem] border border-sky-300/40 border-dashed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 380,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 378,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 flex flex-col gap-5 px-5 pb-5 pt-4 sm:px-7 sm:pb-7 sm:pt-6 lg:px-9 lg:pt-7 lg:pb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] uppercase tracking-[0.22em] text-sky-500",
                                                                children: "United States · hybrid atlas"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 388,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "max-w-xl text-xs text-slate-600",
                                                                children: "Western states lean into geography, eastern states lean into gems. The center blends both—like a map mid snap."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 391,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "hidden md:flex items-center gap-2 text-[10px] text-slate-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                children: "Hover to tilt · Click a state gem"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 398,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 386,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative mt-2 h-[420px] sm:h-[460px] overflow-hidden rounded-[3rem]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 pointer-events-none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GemMapScene$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 406,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 405,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                        className: "absolute inset-[8%] pointer-events-none",
                                                        viewBox: "0 0 100 60",
                                                        preserveAspectRatio: "xMidYMid meet",
                                                        children: [
                                                            ALL_STATES.map((state)=>{
                                                                const pos = STATE_POSITIONS[state.code] ?? {
                                                                    x: 50,
                                                                    y: 30
                                                                };
                                                                const blobPath = STATE_BLOB_PATHS[state.code];
                                                                // normalized factor: 0 at far West, 1 at far East
                                                                const xNorm = Math.min(1, Math.max(0, (pos.x - 20) / 55));
                                                                // Only render strong shapes for western / mid states;
                                                                // East coast is mostly gems.
                                                                if (!WESTERN_STATE_SET.has(state.code) && xNorm > 0.7) {
                                                                    return null;
                                                                }
                                                                const shapeOpacity = 1 - xNorm; // fades toward East
                                                                if (shapeOpacity < 0.05) return null;
                                                                const scale = 0.55 + (1 - xNorm) * 0.25;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("g", {
                                                                    transform: `translate(${pos.x} ${pos.y}) scale(${scale})`,
                                                                    style: {
                                                                        opacity: shapeOpacity
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                                        d: blobPath,
                                                                        fill: "url(#stateFill)",
                                                                        stroke: "rgba(14,165,233,0.65)",
                                                                        strokeWidth: 0.55
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 444,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, state.code, false, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 439,
                                                                    columnNumber: 25
                                                                }, this);
                                                            }),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("defs", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("radialGradient", {
                                                                    id: "stateFill",
                                                                    cx: "30%",
                                                                    cy: "20%",
                                                                    r: "100%",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                            offset: "0%",
                                                                            stopColor: "#f9fafb"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 462,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                            offset: "35%",
                                                                            stopColor: "#a5f3fc"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 463,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("stop", {
                                                                            offset: "100%",
                                                                            stopColor: "#22c55e"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 464,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 456,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 455,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 410,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "relative z-10 h-full",
                                                        children: ALL_STATES.map((state)=>{
                                                            const pos = STATE_POSITIONS[state.code] ?? {
                                                                x: 50,
                                                                y: 50
                                                            };
                                                            const isActive = state.code === activeState.code;
                                                            const gradient = getGemGradient(state.code);
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>handleStateClick(state.code),
                                                                onMouseEnter: ()=>setHoveredCode(state.code),
                                                                onMouseLeave: ()=>setHoveredCode((prev)=>prev === state.code ? null : prev),
                                                                style: {
                                                                    left: `${pos.x}%`,
                                                                    top: `${pos.y}%`,
                                                                    zIndex: hoveredCode === state.code ? 60 : isActive ? 55 : 40
                                                                },
                                                                className: `group absolute -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-[1.6rem] border bg-gradient-to-br ${gradient} text-[11px] font-semibold uppercase tracking-wide shadow-[0_18px_38px_rgba(15,23,42,0.5)] transition-transform duration-200 ${isActive ? 'scale-[1.14] border-sky-500 shadow-[0_22px_60px_rgba(56,189,248,0.8)]' : 'border-sky-200/90 hover:scale-[1.1] hover:shadow-[0_22px_55px_rgba(56,189,248,0.65)]'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "pointer-events-none absolute inset-[1px] rounded-[1.4rem] border border-white/40 bg-white/20"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 511,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "pointer-events-none absolute inset-0 rounded-[1.6rem] bg-[radial-gradient(circle_at_20%_0,_rgba(255,255,255,0.9)_0,_transparent_55%)] opacity-70"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 513,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "relative z-10 text-[12px] text-slate-900 drop-shadow-sm",
                                                                        children: state.code
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                        lineNumber: 514,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, state.code, true, {
                                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 25
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 403,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 354,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 353,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "mt-8 grid gap-6 px-4 sm:px-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-[0_0_40px_rgba(15,23,42,0.9)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-300",
                                                            children: activeState.code
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 534,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "h-4 w-[1px] bg-slate-700"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 537,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-slate-400",
                                                            children: activeState.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 533,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                    className: "mt-3 text-xl font-semibold text-slate-50",
                                                    children: "Safety snapshot & batch activity"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 542,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "mt-1.5 text-sm text-slate-400",
                                                    children: "Lightweight, illustrative metrics for now. You’ll wire these directly to CartFax's real batch, lab, and recall data."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 545,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 532,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "hidden sm:flex flex-col items-end gap-1 text-right text-[11px] text-slate-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[10px] uppercase",
                                                            children: role === 'guest' ? '?' : role === 'admin' ? 'A' : role[0].toUpperCase()
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 552,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-slate-100",
                                                            children: roleLabel[role]
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 559,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 551,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "max-w-xs text-[11px] text-slate-500",
                                                    children: roleHint[role]
                                                }, void 0, false, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 550,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 531,
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
                                                    lineNumber: 571,
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
                                                            lineNumber: 573,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-slate-500",
                                                            children: "est. capacity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 576,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 570,
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
                                                    lineNumber: 582,
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
                                                            lineNumber: 584,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-slate-500",
                                                            children: "active partners"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 587,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 583,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 581,
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
                                                    lineNumber: 593,
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
                                                            lineNumber: 595,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-slate-500",
                                                            children: "in last 12 months"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 598,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 594,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 592,
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
                                                    lineNumber: 604,
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
                                                            lineNumber: 606,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] text-slate-500",
                                                            children: "COAs marked passing"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 609,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 605,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                            lineNumber: 603,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 569,
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
                                            lineNumber: 619,
                                            columnNumber: 15
                                        }, this),
                                        ' ',
                                        "with real queries from your admin APIs."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 616,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 530,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-[0_0_40px_rgba(15,23,42,0.9)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: "text-sm font-semibold text-slate-100",
                                        children: "Admin data tools"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 629,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-400",
                                        children: "This panel is your backstage pass. When you're signed in as an admin, these tiles open the full CartFax backend: batches, COAs, brands, locations, and more."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 632,
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
                                                                            lineNumber: 648,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "rounded-full bg-slate-950/70 px-2 py-0.5 text-[10px] text-emerald-200",
                                                                            children: isAdmin ? 'Unlocked' : 'Admin only'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 651,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 647,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-xs text-emerald-50/80",
                                                                    children: "Open the dashboard with big tiles for batches, labs, COAs, brands, locations, and recalls."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 655,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 646,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "shrink-0 text-lg leading-none group-hover:translate-x-0.5 transition-transform",
                                                            children: "↗"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 660,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 645,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 640,
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
                                                                            lineNumber: 675,
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
                                                                            lineNumber: 678,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 674,
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
                                                                    lineNumber: 682,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 673,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "shrink-0 text-lg leading-none group-hover:translate-x-0.5 transition-transform",
                                                            children: "⤵"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 687,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 672,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 667,
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
                                                                            lineNumber: 702,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "rounded-full bg-slate-900/90 px-2 py-0.5 text-[10px] text-slate-400",
                                                                            children: "Admin only"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                            lineNumber: 705,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 701,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "mt-1 text-xs text-slate-400",
                                                                    children: "Manage PDFs, parsed fields, and verification passes. The engine room of CartFax."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                                    lineNumber: 709,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 700,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "shrink-0 text-lg leading-none group-hover:translate-x-0.5 transition-transform",
                                                            children: "⚙"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/AdminStateExplorer.tsx",
                                                            lineNumber: 714,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                                    lineNumber: 699,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                                lineNumber: 694,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 638,
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
                                                lineNumber: 725,
                                                columnNumber: 19
                                            }, this),
                                            ' ',
                                            "account and unlock the full backend."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminStateExplorer.tsx",
                                        lineNumber: 722,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminStateExplorer.tsx",
                                lineNumber: 628,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 627,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 528,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AdminStateExplorer.tsx",
            lineNumber: 349,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 348,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__e52ba46d._.js.map