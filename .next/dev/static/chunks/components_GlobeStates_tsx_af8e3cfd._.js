(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/GlobeStates.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/GlobeStates.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$globe$2e$gl$2f$dist$2f$react$2d$globe$2e$gl$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-globe.gl/dist/react-globe.gl.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$topojson$2d$client$2f$src$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/topojson-client/src/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$topojson$2d$client$2f$src$2f$feature$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__feature$3e$__ = __turbopack_context__.i("[project]/node_modules/topojson-client/src/feature.js [client] (ecmascript) <export default as feature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
// === Configuration ==========================================================
const GLOBE_TEXTURE_URL = '/textures/earth-nasa-base.jpg';
// ^^^ Rename your NASA texture to this, or change this constant to match
// whatever filename you used.
const US_STATES_URL = 'https://unpkg.com/us-atlas@3/states-10m.json';
const WORLD_COUNTRIES_URL = 'https://unpkg.com/world-atlas@2/countries-110m.json';
// World-atlas numeric IDs → our RegionId
const COUNTRY_ID_TO_REGION = {
    840: 'unitedStates',
    124: 'canada',
    484: 'mexico',
    528: 'netherlands'
};
const REGION_FOCUS = {
    unitedStates: {
        lat: 39,
        lng: -98,
        altitude: 1.55
    },
    canada: {
        lat: 60,
        lng: -95,
        altitude: 1.7
    },
    mexico: {
        lat: 23,
        lng: -102,
        altitude: 1.7
    },
    netherlands: {
        lat: 52.3,
        lng: 5.3,
        altitude: 2.3
    }
};
const BASE_ALT_COUNTRY = 0.006;
const BASE_ALT_STATE = 0.02;
const EXTRA_SELECTED = 0.01;
const EXTRA_HOVER = 0.004;
// === Helpers ===============================================================
const isUsState = (poly)=>poly?.properties?.layer === 'us-state';
const getStatePostal = (poly)=>{
    const postal = poly?.properties?.postal ?? poly?.id;
    if (!postal) return null;
    return String(postal).toUpperCase();
};
const getCountryRegionFromPoly = (poly)=>{
    const idRaw = poly?.id;
    if (idRaw == null) return null;
    const idNum = typeof idRaw === 'number' ? idRaw : Number.parseInt(String(idRaw), 10);
    if (Number.isNaN(idNum)) return null;
    return COUNTRY_ID_TO_REGION[idNum] ?? null;
};
// === Component =============================================================
const GlobeStates = ({ region, onRegionChange, onSelectionChange, onAltitudeChange })=>{
    _s();
    const globeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [worldPolygons, setWorldPolygons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [usStatePolygons, setUsStatePolygons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [hoverPoly, setHoverPoly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // --- Load world countries -------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobeStates.useEffect": ()=>{
            ({
                "GlobeStates.useEffect": async ()=>{
                    try {
                        const res = await fetch(WORLD_COUNTRIES_URL);
                        const topo = await res.json();
                        const geo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$topojson$2d$client$2f$src$2f$feature$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__feature$3e$__["feature"](topo, topo.objects.countries);
                        const features = geo.features.map({
                            "GlobeStates.useEffect.features": (f)=>({
                                    ...f,
                                    properties: {
                                        ...f.properties,
                                        layer: 'country'
                                    }
                                })
                        }["GlobeStates.useEffect.features"]);
                        setWorldPolygons(features);
                    } catch (err) {
                        console.error('Error loading world countries topojson', err);
                    }
                }
            })["GlobeStates.useEffect"]();
        }
    }["GlobeStates.useEffect"], []);
    // --- Load US states -------------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobeStates.useEffect": ()=>{
            ({
                "GlobeStates.useEffect": async ()=>{
                    try {
                        const res = await fetch(US_STATES_URL);
                        const topo = await res.json();
                        const geo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$topojson$2d$client$2f$src$2f$feature$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__feature$3e$__["feature"](topo, topo.objects.states);
                        const states = geo.features.map({
                            "GlobeStates.useEffect.states": (f)=>({
                                    ...f,
                                    properties: {
                                        ...f.properties,
                                        layer: 'us-state',
                                        postal: f.properties?.postal || f.id
                                    }
                                })
                        }["GlobeStates.useEffect.states"]);
                        setUsStatePolygons(states);
                    } catch (err) {
                        console.error('Error loading US states topojson', err);
                    }
                }
            })["GlobeStates.useEffect"]();
        }
    }["GlobeStates.useEffect"], []);
    // --- Camera focus when region changes ------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobeStates.useEffect": ()=>{
            if (!globeRef.current) return;
            const focus = REGION_FOCUS[region];
            globeRef.current.pointOfView({
                lat: focus.lat,
                lng: focus.lng,
                altitude: focus.altitude
            }, 1000);
        }
    }["GlobeStates.useEffect"], [
        region,
        worldPolygons.length,
        usStatePolygons.length
    ]);
    // --- Report zoom / altitude back up --------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobeStates.useEffect": ()=>{
            if (!globeRef.current || !onAltitudeChange) return;
            const globe = globeRef.current;
            const controls = globe.controls();
            const handleChange = {
                "GlobeStates.useEffect.handleChange": ()=>{
                    const { altitude } = globe.pointOfView() || {};
                    if (typeof altitude === 'number') {
                        onAltitudeChange(altitude);
                    }
                }
            }["GlobeStates.useEffect.handleChange"];
            controls.addEventListener('change', handleChange);
            return ({
                "GlobeStates.useEffect": ()=>{
                    controls.removeEventListener('change', handleChange);
                }
            })["GlobeStates.useEffect"];
        }
    }["GlobeStates.useEffect"], [
        onAltitudeChange
    ]);
    // --- Combined polygon set -------------------------------------------------
    const polygonsData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GlobeStates.useMemo[polygonsData]": ()=>{
            if (!worldPolygons.length) return [];
            // Always render all countries so the whole Earth has outlines.
            // Only render US states when we’re in the US view.
            if (region === 'unitedStates') {
                return [
                    ...worldPolygons,
                    ...usStatePolygons
                ];
            }
            return worldPolygons;
        }
    }["GlobeStates.useMemo[polygonsData]"], [
        worldPolygons,
        usStatePolygons,
        region
    ]);
    // --- Altitude / explosion logic ------------------------------------------
    const polygonAltitude = (poly)=>{
        const usState = isUsState(poly);
        const polyRegion = getCountryRegionFromPoly(poly);
        // Hide US states when not in US mode
        if (usState && region !== 'unitedStates') {
            return 0;
        }
        // US states
        if (usState) {
            const id = getStatePostal(poly) ?? '';
            const isSelected = selected?.region === 'unitedStates' && selected.level === 'subregion' && selected.id === id;
            const isHovered = hoverPoly === poly;
            let alt = BASE_ALT_STATE;
            if (isSelected) alt += EXTRA_SELECTED;
            if (isHovered) alt += EXTRA_HOVER;
            return alt;
        }
        // Countries
        let alt = BASE_ALT_COUNTRY;
        if (polyRegion) {
            const isActiveRegion = polyRegion === region;
            const isSelectedCountry = selected?.level === 'country' && selected.region === polyRegion;
            const isHovered = hoverPoly === poly;
            if (isActiveRegion) {
                alt += 0.012;
            }
            if (isSelectedCountry) {
                alt += 0.006;
            }
            if (isHovered) {
                alt += 0.003;
            }
            // When we’re in US mode, keep the US country itself almost flat
            // so the state tiles visually dominate.
            if (polyRegion === 'unitedStates' && region === 'unitedStates') {
                alt = 0.001;
            }
        }
        return alt;
    };
    // --- Materials ------------------------------------------------------------
    const polygonCapMaterial = (poly)=>{
        const usState = isUsState(poly);
        const polyRegion = getCountryRegionFromPoly(poly);
        const isHovered = hoverPoly === poly;
        // If this is a US state and we’re not in US view, make it invisible
        if (usState && region !== 'unitedStates') {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                visible: false
            });
        }
        if (usState) {
            const id = getStatePostal(poly) ?? '';
            const isSelected = selected?.region === 'unitedStates' && selected.level === 'subregion' && selected.id === id;
            const baseColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#020617');
            const highlight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#22c55e');
            const active = isSelected || isHovered;
            const color = active ? highlight : baseColor;
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color,
                metalness: 0.75,
                roughness: 0.3,
                emissive: color,
                emissiveIntensity: isSelected ? 0.7 : isHovered ? 0.45 : 0.25
            });
        }
        // Countries
        const isActiveRegion = polyRegion && polyRegion === region;
        const isSelectedCountry = selected?.level === 'country' && polyRegion && selected.region === polyRegion;
        const baseColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#020617');
        const activeColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#0f766e');
        const emissiveBase = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#020617');
        const emissiveActive = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#22c55e');
        const color = isActiveRegion ? activeColor : baseColor;
        const emissive = isActiveRegion ? emissiveActive : emissiveBase;
        const emissiveIntensity = isActiveRegion ? isSelectedCountry ? 0.7 : 0.45 : 0.18;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
            color,
            metalness: 0.45,
            roughness: 0.7,
            emissive,
            emissiveIntensity,
            transparent: true,
            opacity: isActiveRegion ? 0.96 : 0.8
        });
    };
    const polygonSideColor = (poly)=>{
        if (isUsState(poly)) {
            return 'rgba(34,197,94,0.9)'; // bright emerald seams for state tiles
        }
        const polyRegion = getCountryRegionFromPoly(poly);
        if (polyRegion && polyRegion === region) {
            return 'rgba(45,212,191,0.8)'; // teal rim for active country
        }
        return 'rgba(15,23,42,0.85)'; // dark slate for everything else
    };
    const polygonStrokeColor = (poly)=>{
        if (isUsState(poly)) {
            return 'rgba(22,163,74,0.7)';
        }
        const polyRegion = getCountryRegionFromPoly(poly);
        if (polyRegion && polyRegion === region) {
            return 'rgba(34,211,238,0.7)';
        }
        return 'rgba(30,64,175,0.25)';
    };
    const polygonLabel = (poly)=>{
        if (isUsState(poly)) {
            const postal = poly.properties?.postal ?? '';
            const name = poly.properties?.name ?? postal ?? '';
            return `${name} (${postal})`;
        }
        return poly.properties?.name ?? '';
    };
    // --- Click / hover handlers ----------------------------------------------
    const handlePolygonClick = (poly)=>{
        if (!poly) return;
        const usState = isUsState(poly);
        const polyRegion = getCountryRegionFromPoly(poly);
        // Clicking a US state while in US view → select that state
        if (usState && region === 'unitedStates') {
            const id = getStatePostal(poly) ?? '';
            const name = poly.properties?.name ?? id;
            const nextSel = {
                region: 'unitedStates',
                level: 'subregion',
                id,
                name
            };
            setSelected(nextSel);
            onSelectionChange?.(nextSel);
            return;
        }
        // Clicking a country → switch region (if it’s one of our four) and/or
        // select that jurisdiction tile.
        if (polyRegion) {
            const name = poly.properties?.name ?? polyRegion;
            if (polyRegion !== region) {
                onRegionChange?.(polyRegion);
            }
            const nextSel = {
                region: polyRegion,
                level: 'country',
                id: polyRegion,
                name
            };
            setSelected(nextSel);
            onSelectionChange?.(nextSel);
        }
    };
    // === Render ===============================================================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$globe$2e$gl$2f$dist$2f$react$2d$globe$2e$gl$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            ref: globeRef,
            backgroundColor: "rgba(0,0,0,1)",
            showAtmosphere: true,
            atmosphereColor: "rgba(56,189,248,0.85)",
            atmosphereAltitude: 0.18,
            globeImageUrl: GLOBE_TEXTURE_URL,
            polygonsData: polygonsData,
            polygonAltitude: polygonAltitude,
            polygonCapMaterial: polygonCapMaterial,
            polygonSideColor: polygonSideColor,
            polygonStrokeColor: polygonStrokeColor,
            polygonLabel: polygonLabel,
            polygonsTransitionDuration: 280,
            onPolygonHover: setHoverPoly,
            onPolygonClick: handlePolygonClick
        }, void 0, false, {
            fileName: "[project]/components/GlobeStates.tsx",
            lineNumber: 393,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/GlobeStates.tsx",
        lineNumber: 392,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GlobeStates, "777IDJwEJosKyU8HYrTpGbaKfmg=");
_c = GlobeStates;
const __TURBOPACK__default__export__ = GlobeStates;
var _c;
__turbopack_context__.k.register(_c, "GlobeStates");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/GlobeStates.tsx [client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/GlobeStates.tsx [client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_GlobeStates_tsx_af8e3cfd._.js.map