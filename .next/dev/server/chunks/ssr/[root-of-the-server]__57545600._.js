module.exports = [
"[externals]/react-globe.gl [external] (react-globe.gl, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-globe.gl");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/topojson-client [external] (topojson-client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("topojson-client", () => require("topojson-client"));

module.exports = mod;
}),
"[project]/lib/jurisdictions.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/jurisdictions.ts
__turbopack_context__.s([
    "JURISDICTIONS",
    ()=>JURISDICTIONS,
    "jurisdictionById",
    ()=>jurisdictionById
]);
const JURISDICTIONS = [
    {
        id: 'unitedStates',
        label: 'United States',
        code: 'us',
        description: 'Patchwork of state-level laws; the globe is the source of truth for which state is active.',
        focus: {
            lat: 39,
            lng: -98,
            altitude: 1.7
        },
        topoJsonPath: '/geo/jurisdictions/us-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    },
    {
        id: 'canada',
        label: 'Canada',
        code: 'ca',
        description: 'National recreational + medical framework; provinces hold operational details.',
        focus: {
            lat: 62,
            lng: -96,
            altitude: 1.9
        },
        topoJsonPath: '/geo/jurisdictions/ca-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    },
    {
        id: 'mexico',
        label: 'Mexico',
        code: 'mx',
        description: 'Federal reforms in motion; state-level practices matter for compliance.',
        focus: {
            lat: 23,
            lng: -102,
            altitude: 1.9
        },
        topoJsonPath: '/geo/jurisdictions/mx-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    },
    {
        id: 'netherlands',
        label: 'Netherlands',
        code: 'nl',
        description: 'Tolerated retail model with pilots; provinces are more about infrastructure.',
        focus: {
            lat: 52.3,
            lng: 5.3,
            altitude: 2.4
        },
        topoJsonPath: '/geo/jurisdictions/nl-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    },
    {
        id: 'uruguay',
        label: 'Uruguay',
        code: 'uy',
        description: 'First fully legal market; departments drive permits and enforcement.',
        focus: {
            lat: -32.6,
            lng: -55.9,
            altitude: 2.0
        },
        topoJsonPath: '/geo/jurisdictions/uy-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    },
    {
        id: 'germany',
        label: 'Germany',
        code: 'de',
        description: 'Partial legalization with social clubs; Länder own implementation details.',
        focus: {
            lat: 51.1,
            lng: 10.4,
            altitude: 2.0
        },
        topoJsonPath: '/geo/jurisdictions/de-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    },
    {
        id: 'southAfrica',
        label: 'South Africa',
        code: 'za',
        description: 'Private use & cultivation; provincial nodes for analysis and data pipelines.',
        focus: {
            lat: -30.6,
            lng: 24,
            altitude: 2.0
        },
        topoJsonPath: '/geo/jurisdictions/za-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    },
    {
        id: 'luxembourg',
        label: 'Luxembourg',
        code: 'lu',
        description: 'Small but symbolically important European test bed.',
        focus: {
            lat: 49.8,
            lng: 6.1,
            altitude: 2.8
        },
        topoJsonPath: '/geo/jurisdictions/lu-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    },
    {
        id: 'malta',
        label: 'Malta',
        code: 'mt',
        description: 'EU pioneer for home grow and non-profit clubs.',
        focus: {
            lat: 35.9,
            lng: 14.4,
            altitude: 3.0
        },
        topoJsonPath: '/geo/jurisdictions/mt-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    },
    {
        id: 'georgia',
        label: 'Georgia',
        code: 'ge',
        description: 'Constitutional court–driven legalization; still evolving on the ground.',
        focus: {
            lat: 42.3,
            lng: 43.4,
            altitude: 2.6
        },
        topoJsonPath: '/geo/jurisdictions/ge-adm1-topo.json',
        topoObjectName: 'subunits',
        featureIdProp: 'code'
    }
];
const jurisdictionById = Object.fromEntries(JURISDICTIONS.map((j)=>[
        j.id,
        j
    ]));
}),
"[project]/components/GlobeStates.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// components/GlobeStates.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-globe.gl [external] (react-globe.gl, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$topojson$2d$client__$5b$external$5d$__$28$topojson$2d$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/topojson-client [external] (topojson-client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/jurisdictions.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
// Helper to safely pull a property from a feature
function getProp(feature, key) {
    const value = feature.properties?.[key];
    if (value == null) return null;
    return String(value);
}
// Fallback: use "name" property if present
function getName(feature) {
    const props = feature.properties || {};
    return String(props.name ?? props.NAME_1 ?? props.NAME ?? 'Unknown region');
}
const BASE_ALTITUDE = 0.008;
const SELECTED_EXTRA = 0.022;
const HOVER_EXTRA = 0.010;
const GlobeStates = ({ jurisdiction, onRegionSelect, onViewChange })=>{
    const globeRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [features, setFeatures] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const spec = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["jurisdictionById"][jurisdiction];
    // Load ADM1 polygons for active jurisdiction
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function load() {
            if (!spec.topoJsonPath) {
                setFeatures([]);
                return;
            }
            try {
                const res = await fetch(spec.topoJsonPath);
                if (!res.ok) {
                    console.warn(`Failed to load topojson for ${spec.id}: ${res.status}`);
                    if (!cancelled) setFeatures([]);
                    return;
                }
                const topo = await res.json();
                const objects = topo.objects;
                const objectName = spec.topoObjectName || Object.keys(objects)[0];
                const fc = __TURBOPACK__imported__module__$5b$externals$5d2f$topojson$2d$client__$5b$external$5d$__$28$topojson$2d$client$2c$__cjs$29$__["feature"](topo, objects[objectName]);
                if (!cancelled) {
                    setFeatures(fc.features);
                }
            } catch (err) {
                console.error('Error loading TopoJSON', err);
                if (!cancelled) setFeatures([]);
            }
        }
        setSelectedId(null);
        setHovered(null);
        load();
        return ()=>{
            cancelled = true;
        };
    }, [
        spec
    ]);
    // Focus camera when jurisdiction changes
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const globe = globeRef.current;
        if (!globe) return;
        const { lat, lng, altitude } = spec.focus;
        globe.pointOfView({
            lat,
            lng,
            altitude
        }, 1000);
    }, [
        spec
    ]);
    // Report altitude back up on camera moves
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!globeRef.current || !onViewChange) return;
        const globe = globeRef.current;
        const controls = globe.controls?.();
        if (!controls) return;
        const handleChange = ()=>{
            const pov = globe.pointOfView();
            if (pov && typeof pov.altitude === 'number') {
                onViewChange(pov.altitude);
            }
        };
        controls.addEventListener('change', handleChange);
        return ()=>{
            controls.removeEventListener('change', handleChange);
        };
    }, [
        onViewChange
    ]);
    // Altitude / explosion logic
    const polygonAltitude = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((f)=>{
        const idProp = spec.featureIdProp;
        const id = getProp(f, idProp);
        const isSelected = id && selectedId && id === selectedId;
        const isHovered = hovered === f;
        let extra = 0;
        if (isSelected) extra += SELECTED_EXTRA;
        if (isHovered) extra += HOVER_EXTRA;
        return BASE_ALTITUDE + extra;
    }, [
        hovered,
        selectedId,
        spec.featureIdProp
    ]);
    const polygonCapColor = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((f)=>{
        const id = getProp(f, spec.featureIdProp);
        const isSelected = id && selectedId && id === selectedId;
        const isHovered = hovered === f;
        if (isSelected) return '#22c55e';
        if (isHovered) return '#4ade80';
        return 'rgba(15,23,42,0.98)'; // slate-900-ish
    }, [
        hovered,
        selectedId,
        spec.featureIdProp
    ]);
    const polygonStrokeColor = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((f)=>{
        const id = getProp(f, spec.featureIdProp);
        const isSelected = id && selectedId && id === selectedId;
        if (isSelected) return 'rgba(34,197,94,0.9)';
        return 'rgba(30,64,175,0.4)'; // subtle blue
    }, [
        selectedId,
        spec.featureIdProp
    ]);
    const polygonsData = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>features, [
        features
    ]);
    const handleClick = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((f)=>{
        const id = getProp(f, spec.featureIdProp) ?? getName(f);
        setSelectedId(id);
        if (onRegionSelect) {
            onRegionSelect({
                id,
                name: getName(f)
            });
        }
        // Optional: gently nudge camera toward clicked region
        if (globeRef.current) {
            const centroid = f.properties?.centroid;
            if (centroid && typeof centroid[1] === 'number' && typeof centroid[0] === 'number') {
                globeRef.current.pointOfView({
                    lat: centroid[1],
                    lng: centroid[0],
                    altitude: spec.focus.altitude
                }, 700);
            }
        }
    }, [
        onRegionSelect,
        spec.featureIdProp,
        spec.focus.altitude
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__["default"], {
            ref: globeRef,
            backgroundColor: "rgba(0,0,0,1)",
            animateIn: true,
            // Base sphere texture – simple + fast
            globeImageUrl: "/textures/earth-base.jpg",
            // Only draw polygons for the active jurisdiction
            polygonsData: polygonsData,
            polygonAltitude: polygonAltitude,
            polygonCapColor: polygonCapColor,
            polygonSideColor: ()=>'rgba(15,23,42,1)',
            polygonStrokeColor: polygonStrokeColor,
            polygonsTransitionDuration: 260,
            polygonLabel: (f)=>getName(f),
            onPolygonHover: (f)=>setHovered(f),
            onPolygonClick: (f)=>handleClick(f)
        }, void 0, false, {
            fileName: "[project]/components/GlobeStates.tsx",
            lineNumber: 216,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/GlobeStates.tsx",
        lineNumber: 215,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GlobeStates;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/GlobeStates.tsx [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/GlobeStates.tsx [ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__57545600._.js.map