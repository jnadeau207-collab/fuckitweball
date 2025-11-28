module.exports = [
"[externals]/three [external] (three, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("three");

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
// The Globe component requires TopoJSON data for all polygons to be drawn.
// This data is pre-processed and embedded here to avoid file-loading issues
// the user encountered while trying to process the original shapefile.
// It includes Admin 1 regions for the four specified countries (USA, CAN, MEX, NLD)
// and uses a lightweight version of the Natural Earth 1:50m Admin 1 dataset structure.
// NOTE: The actual 'arcs' data is omitted here for brevity and is replaced with a
// minimal structure to define the overall file format. The user should replace
// `PLACEHOLDER_ARCS_DATA` and `PLACEHOLDER_OBJECTS_DATA` with the complete
// contents of a World Admin 1 TopoJSON file, pre-filtered for US, CA, MX, and NL,
// or use a pre-built one like those found on the topojson/world-atlas project.
// To fully resolve the issue, you must replace the placeholder with the actual data.
// A typical TopoJSON file is a few hundred kilobytes, which is fine to embed.
/**
 * PLACEHOLDER_TOPOJSON_OBJECT: Represents the full TopoJSON structure.
 *
 * TO RESOLVE THIS FULLY:
 * 1. Go to a reliable source (like a d3-based TopoJSON atlas).
 * 2. Find the "world admin 1" TopoJSON file (e.g., ne_10m_admin_1_states_provinces).
 * 3. Use `topojson-filter` or `mapshaper` to filter the features to only keep
 * the following countries: USA, CAN, MEX, NLD.
 * 4. Paste the entire resulting JSON object below as the value of `PLACEHOLDER_TOPOJSON_OBJECT`.
 *
 * For now, this placeholder structure will prevent the globe from crashing (e.g., spinning forever)
 * by providing the necessary TopoJSON structure, but it will only render a single mock polygon.
 */ // WARNING: This is a minimal structure that will allow the code to run without crashing,
// but it is NOT the full, correct data. The user must replace the object with real data
// as described in the comments above.
__turbopack_context__.s([
    "DEFAULT_JURISDICTION",
    ()=>DEFAULT_JURISDICTION,
    "EMBEDDED_TOPOJSON_DATA",
    ()=>EMBEDDED_TOPOJSON_DATA,
    "JURISDICTIONS",
    ()=>JURISDICTIONS,
    "JURISDICTION_MAP",
    ()=>JURISDICTION_MAP,
    "getCountryName",
    ()=>getCountryName,
    "getCountryRegion",
    ()=>getCountryRegion
]);
const EMBEDDED_TOPOJSON_DATA = {
    type: "Topology",
    objects: {
        // This object key must match the layer name in the final TopoJSON file.
        // Assuming the layer name is 'states_provinces' based on the shapefile name.
        states_provinces: {
            type: "GeometryCollection",
            geometries: [
                // MOCK DATA: A single polygon to allow the globe to load and the code to run.
                {
                    type: "Polygon",
                    properties: {
                        // These properties are essential for polygon identification/styling
                        name: "Placeholder State",
                        adm0_a3: "USA",
                        adm1_code: "123",
                        region: "west"
                    },
                    arcs: [
                        [
                            0,
                            1
                        ]
                    ]
                }
            ]
        }
    },
    arcs: [
        // MOCK DATA: A single arc definition to make the TopoJSON format valid
        [
            [
                10,
                20
            ],
            [
                30,
                40
            ],
            [
                50,
                60
            ]
        ]
    ],
    bbox: [
        -180,
        -90,
        180,
        90
    ],
    transform: {
        scale: [
            0.0001859604812301931,
            0.00018315053738092923
        ],
        translate: [
            -179.99998819894458,
            -89.9999979737899
        ]
    }
};
const JURISDICTION_MAP = {
    USA: {
        name: "United States",
        region: "west"
    },
    CAN: {
        name: "Canada",
        region: "west"
    },
    MEX: {
        name: "Mexico",
        region: "south"
    },
    NLD: {
        name: "Netherlands",
        region: "europe"
    }
};
const JURISDICTIONS = Object.entries(JURISDICTION_MAP).map(([code, { name, region }])=>({
        code: code,
        name,
        region
    }));
const DEFAULT_JURISDICTION = JURISDICTIONS[0]; // USA
const getCountryName = (code)=>JURISDICTION_MAP[code]?.name ?? "Unknown";
const getCountryRegion = (poly)=>poly.properties.adm0_a3 ? JURISDICTION_MAP[poly.properties.adm0_a3]?.region : undefined;
}),
"[project]/components/GlobeStates.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// components/GlobeStates.tsx
// Replaces the broken file-loading logic with direct use of the embedded TopoJSON object.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$topojson$2d$client__$5b$external$5d$__$28$topojson$2d$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/topojson-client [external] (topojson-client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/jurisdictions.ts [ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../lib/store'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
// Use dynamic import for the Globe component as it requires the window object
const Globe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[externals]/react-globe.gl [external] (react-globe.gl, esm_import, async loader)"), {
    loadableGenerated: {
        modules: [
            "[externals]/react-globe.gl [external] (react-globe.gl, esm_import)"
        ]
    },
    ssr: false
});
// --- Globe Data Processing ---
const allPolygons = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["EMBEDDED_TOPOJSON_DATA"].objects?.states_provinces?.geometries || [];
const isState = (poly)=>poly.properties.name !== "land";
const getStatePostal = (poly)=>poly.properties.adm1_code;
const isCountry = (poly)=>!!poly.properties.adm0_a3; // Simple check
// Function to convert TopoJSON to GeoJSON features for consumption by react-globe.gl
const getFeatures = (topojson, layerName)=>{
    if (!topojson || !topojson.objects || !topojson.objects[layerName]) {
        console.error("Invalid TopoJSON object or layer name.");
        return {
            features: []
        };
    }
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$topojson$2d$client__$5b$external$5d$__$28$topojson$2d$client$2c$__cjs$29$__["feature"])(topojson, topojson.objects[layerName]);
};
// --- Main Component ---
const GlobeStates = ({ region })=>{
    const { selectedStateId, setSelectedStateId } = useGlobeStore();
    const [hoverPoly, setHoverPoly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const globeMaterial = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshPhongMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]("#020617"),
            side: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["DoubleSide"],
            shininess: 0.1
        }), []);
    const filteredPolygons = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        if (region === "ALL") return allPolygons;
        const countryCodes = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["JURISDICTIONS"].filter((j)=>j.region === region).map((j)=>j.code);
        return allPolygons.filter((poly)=>countryCodes.includes(poly.properties.adm0_a3));
    }, [
        region
    ]);
    const polygonAltitude = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((poly)=>{
        if (!isState(poly)) return 0.001;
        const id = getStatePostal(poly);
        const isSelected = id && selectedStateId && id === selectedStateId;
        const isHovered = hoverPoly === poly;
        // Restored explosion effect: Lift polygons on hover/select
        if (isSelected) return 0.04;
        if (isHovered) return 0.02;
        // Country explode/rise effect for regions like Canada (CAN)
        const reg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getCountryRegion"])(poly);
        const isActiveCountry = reg && reg === region;
        if (isActiveCountry && region !== 'ALL') return 0.006;
        return 0.001;
    }, [
        hoverPoly,
        selectedStateId,
        region
    ]);
    const polygonCapMaterial = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((poly)=>{
        // Base material for non-interactive areas (e.g., non-Admin 1 land)
        if (!isCountry(poly) || !isState(poly)) {
            return new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]("#0f172a"),
                transparent: true,
                opacity: 0.8
            });
        }
        const id = getStatePostal(poly);
        const isSelected = id && selectedStateId && id === selectedStateId;
        const isHovered = hoverPoly === poly;
        // Color logic based on region (tailwind-inspired colors)
        const countryCode = poly.properties.adm0_a3;
        let baseColor = "#0f172a"; // Slate-900
        let highlightColor = "#22c55e"; // Emerald-500
        if (countryCode === "CAN" || countryCode === "USA") {
            highlightColor = "#3b82f6"; // Blue-500
        } else if (countryCode === "MEX") {
            highlightColor = "#ef4444"; // Red-500
        } else if (countryCode === "NLD") {
            highlightColor = "#f59e0b"; // Amber-500
        }
        const emissiveBase = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"](baseColor);
        const emissiveHighlight = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"](highlightColor);
        return new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
            metalness: 0.96,
            roughness: 0.26,
            color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"](baseColor),
            emissive: isHovered || isSelected ? emissiveHighlight : emissiveBase,
            emissiveIntensity: isHovered ? 0.4 : isSelected ? 0.25 : 0.16
        });
    }, [
        hoverPoly,
        selectedStateId,
        region
    ]);
    const handlePolygonClick = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((poly)=>{
        if (!isState(poly)) return;
        const id = getStatePostal(poly);
        setSelectedStateId(id === selectedStateId ? null : id);
    }, [
        selectedStateId,
        setSelectedStateId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Globe, {
        animateIn: true,
        showAtmosphere: false,
        globeMaterial: globeMaterial,
        hexPolygonResolution: 3,
        hexPolygonMargin: 0.4,
        polygonsData: filteredPolygons,
        polygonAltitude: polygonAltitude,
        polygonCapMaterial: polygonCapMaterial,
        polygonSideMaterial: ()=>new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshPhongMaterial"]({
                color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]("#020617"),
                side: __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["DoubleSide"]
            }),
        onPolygonClick: handlePolygonClick,
        onPolygonHover: setHoverPoly,
        onGlobeClick: ()=>setSelectedStateId(null),
        backgroundColor: "rgba(0,0,0,0)"
    }, void 0, false, {
        fileName: "[project]/components/GlobeStates.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GlobeStates;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/AdminStateExplorer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// components/AdminStateExplorer.tsx
// Fixes:
// 1. Module not found error (by moving it back to the expected path /components)
// 2. Circular clipping of the globe (by removing rounded-full and overflow-hidden)
// 3. Header/Footer UI (by using a basic Tailwind container)
__turbopack_context__.s([
    "default",
    ()=>AdminStateExplorer
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GlobeStates$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/GlobeStates.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/jurisdictions.ts [ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../lib/store'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GlobeStates$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GlobeStates$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
// Helper component for the selector menu
const JurisdictionSelector = ({ selectedRegion, setSelectedRegion })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex justify-center p-4 bg-slate-800 rounded-lg shadow-xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
            className: "block w-full max-w-sm rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-100 bg-slate-700 ring-1 ring-inset ring-slate-600 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6",
            value: selectedRegion,
            onChange: (e)=>setSelectedRegion(e.target.value),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                    value: "ALL",
                    children: [
                        "All Regions (All ",
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["JURISDICTIONS"].length,
                        " Countries)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 27,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                Array.from(new Set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["JURISDICTIONS"].map((j)=>j.region))).sort().map((region)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                        value: region,
                        children: [
                            region.charAt(0).toUpperCase() + region.slice(1),
                            " Region"
                        ]
                    }, region, true, {
                        fileName: "[project]/components/AdminStateExplorer.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            ]
        }, void 0, true, {
            fileName: "[project]/components/AdminStateExplorer.tsx",
            lineNumber: 22,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 21,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
function AdminStateExplorer() {
    const { selectedStateId } = useGlobeStore();
    const [selectedRegion, setSelectedRegion] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$jurisdictions$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["DEFAULT_JURISDICTION"].region);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-screen overflow-hidden bg-slate-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(JurisdictionSelector, {
                    selectedRegion: selectedRegion,
                    setSelectedRegion: setSelectedRegion
                }, void 0, false, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "flex-1 flex min-h-0 relative p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "relative h-full w-full mx-auto max-w-7xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$GlobeStates$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            region: selectedRegion
                        }, void 0, false, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute inset-0 rounded-lg shadow-[0_0_150px_100px_rgba(2,_6,_23,_1)] [transform:translateZ(-100px)]"
                        }, void 0, false, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        selectedStateId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "absolute top-4 right-4 z-10 p-4 bg-slate-800 text-white rounded-lg shadow-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "font-semibold",
                                    children: "Selected State/Province:"
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-emerald-400",
                                    children: selectedStateId
                                }, void 0, false, {
                                    fileName: "[project]/components/AdminStateExplorer.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AdminStateExplorer.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AdminStateExplorer.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                className: "flex-shrink-0 p-2 text-center text-xs text-slate-500 bg-slate-900 border-t border-slate-800",
                children: [
                    "Cartfax Admin Explorer - Viewing ",
                    selectedRegion,
                    " Region"
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminStateExplorer.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/index.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// pages/index.tsx
__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/next-auth/react [external] (next-auth/react, cjs)");
// Corrected import path. Assuming AdminStateExplorer is in components/AdminStateExplorer.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AdminStateExplorer.tsx [ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../components/UnAuthenticatedLanding'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function Home() {
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["useSession"])();
    // If the user is authenticated, show the Admin State Explorer.
    if (session) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/pages/index.tsx",
            lineNumber: 13,
            columnNumber: 12
        }, this);
    }
    // Otherwise, show the unauthenticated landing page.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(UnAuthenticatedLanding, {}, void 0, false, {
        fileName: "[project]/pages/index.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a0b950f._.js.map