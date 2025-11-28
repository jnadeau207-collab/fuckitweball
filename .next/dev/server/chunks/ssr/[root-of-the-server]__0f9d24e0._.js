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
"[project]/components/GlobeStates.tsx [ssr] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/GlobeStates.tsx [ssr] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0f9d24e0._.js.map