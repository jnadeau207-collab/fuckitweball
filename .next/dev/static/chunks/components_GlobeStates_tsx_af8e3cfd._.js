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
const regionFocus = {
    unitedStates: {
        lat: 39,
        lng: -98,
        altitude: 1.9
    },
    canada: {
        lat: 62,
        lng: -96,
        altitude: 2.1
    },
    mexico: {
        lat: 23,
        lng: -102,
        altitude: 2.1
    },
    netherlands: {
        lat: 52.3,
        lng: 5.3,
        altitude: 3.0
    }
};
const usStatesUrl = 'https://unpkg.com/us-atlas@3/states-10m.json';
const worldCountriesUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
const COUNTRY_ID_TO_REGION = {
    840: 'unitedStates',
    124: 'canada',
    484: 'mexico',
    528: 'netherlands'
};
const GlobeStates = ({ region, onStateSelect, onViewChange, onRegionChange })=>{
    _s();
    const globeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [usPolygons, setUsPolygons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [worldPolygons, setWorldPolygons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [hoverPoly, setHoverPoly] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedStateId, setSelectedStateId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [stainlessTex, setStainlessTex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [steelTex, setSteelTex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [blueTex, setBlueTex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const isUS = region === 'unitedStates';
    // --- helpers --------------------------------------------------------------
    const getStatePostal = (poly)=>{
        const postal = poly?.properties?.postal ?? poly?.id;
        if (!postal) return null;
        return String(postal).toUpperCase();
    };
    const isState = (poly)=>!!poly?.properties && typeof poly.properties.postal !== 'undefined';
    const isCountry = (poly)=>poly?.properties && typeof poly.id !== 'undefined' && !isState(poly);
    const getCountryRegion = (poly)=>{
        const idNum = typeof poly.id === 'number' ? poly.id : Number.parseInt(String(poly.id), 10);
        if (Number.isNaN(idNum)) return null;
        return COUNTRY_ID_TO_REGION[idNum] ?? null;
    };
    // --- load topojson --------------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobeStates.useEffect": ()=>{
            ({
                "GlobeStates.useEffect": async ()=>{
                    try {
                        const res = await fetch(usStatesUrl);
                        const topo = await res.json();
                        const geo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$topojson$2d$client$2f$src$2f$feature$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__feature$3e$__["feature"](topo, topo.objects.states);
                        const states = geo.features.map({
                            "GlobeStates.useEffect.states": (f)=>({
                                    ...f,
                                    properties: {
                                        ...f.properties,
                                        postal: f.properties?.postal || f.id
                                    }
                                })
                        }["GlobeStates.useEffect.states"]);
                        setUsPolygons(states);
                    } catch (err) {
                        console.error('Error loading US states topojson', err);
                    }
                }
            })["GlobeStates.useEffect"]();
        }
    }["GlobeStates.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobeStates.useEffect": ()=>{
            ({
                "GlobeStates.useEffect": async ()=>{
                    try {
                        const res = await fetch(worldCountriesUrl);
                        const topo = await res.json();
                        const geo = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$topojson$2d$client$2f$src$2f$feature$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__feature$3e$__["feature"](topo, topo.objects.countries);
                        setWorldPolygons(geo.features);
                    } catch (err) {
                        console.error('Error loading world countries topojson', err);
                    }
                }
            })["GlobeStates.useEffect"]();
        }
    }["GlobeStates.useEffect"], []);
    // --- textures for materials -----------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobeStates.useEffect": ()=>{
            const loader = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TextureLoader"]();
            loader.load('/textures/stainless.jpg', {
                "GlobeStates.useEffect": (tex)=>{
                    tex.wrapS = tex.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                    setStainlessTex(tex);
                }
            }["GlobeStates.useEffect"]);
            loader.load('/textures/steel.jpg', {
                "GlobeStates.useEffect": (tex)=>{
                    tex.wrapS = tex.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                    setSteelTex(tex);
                }
            }["GlobeStates.useEffect"]);
            loader.load('/textures/blue-metal.jpg', {
                "GlobeStates.useEffect": (tex)=>{
                    tex.wrapS = tex.wrapT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["RepeatWrapping"];
                    setBlueTex(tex);
                }
            }["GlobeStates.useEffect"]);
        }
    }["GlobeStates.useEffect"], []);
    // --- focus camera on region -----------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobeStates.useEffect": ()=>{
            if (!globeRef.current) return;
            const focus = regionFocus[region];
            globeRef.current.pointOfView({
                lat: focus.lat,
                lng: focus.lng,
                altitude: focus.altitude
            }, 1000);
        }
    }["GlobeStates.useEffect"], [
        region,
        usPolygons
    ]);
    // --- altitude reporting ----------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobeStates.useEffect": ()=>{
            if (!globeRef.current || !onViewChange) return;
            const globe = globeRef.current;
            const handle = {
                "GlobeStates.useEffect.handle": ()=>{
                    const { altitude } = globe.pointOfView();
                    onViewChange(altitude);
                }
            }["GlobeStates.useEffect.handle"];
            globe.controls().addEventListener('change', handle);
            return ({
                "GlobeStates.useEffect": ()=>{
                    globe.controls().removeEventListener('change', handle);
                }
            })["GlobeStates.useEffect"];
        }
    }["GlobeStates.useEffect"], [
        onViewChange
    ]);
    // --- combined polygon data -------------------------------------------------
    const allPolygons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GlobeStates.useMemo[allPolygons]": ()=>[
                ...worldPolygons,
                ...usPolygons
            ]
    }["GlobeStates.useMemo[allPolygons]"], [
        worldPolygons,
        usPolygons
    ]);
    // --- explosion / altitude logic -------------------------------------------
    const BASE_ALT_STATE = 0.015; // base extrusion for US states
    const BASE_ALT_COUNTRY = 0.008; // base extrusion for countries
    const BASE_ALT_OTHER = 0.004;
    // toned down ~30% from the previous “max boom”
    const EXTRA_SELECTED = 0.010;
    const EXTRA_HOVER = 0.005;
    const polygonAltitude = (poly)=>{
        if (isState(poly)) {
            const id = getStatePostal(poly);
            const isSelected = id && selectedStateId && id === selectedStateId;
            const isHovered = hoverPoly === poly;
            let extra = 0;
            if (isSelected) extra += EXTRA_SELECTED;
            if (isHovered) extra += EXTRA_HOVER;
            return BASE_ALT_STATE + extra;
        }
        if (isCountry(poly)) {
            return BASE_ALT_COUNTRY;
        }
        return BASE_ALT_OTHER;
    };
    // --- render ----------------------------------------------------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full w-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$globe$2e$gl$2f$dist$2f$react$2d$globe$2e$gl$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                ref: globeRef,
                backgroundColor: "rgba(0,0,0,1)",
                animateIn: true,
                hexPolygonResolution: 3,
                hexPolygonMargin: 0.4,
                globeMaterial: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                    metalness: 0.85,
                    roughness: 0.28,
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#020617'),
                    envMap: stainlessTex ?? undefined,
                    envMapIntensity: 0.9
                }),
                polygonsData: allPolygons,
                polygonAltitude: polygonAltitude,
                polygonCapMaterial: (poly)=>{
                    // state caps: dark, glossy, not bright blue
                    if (isState(poly)) {
                        const id = getStatePostal(poly);
                        const isSelected = id && selectedStateId && id === selectedStateId;
                        const isHovered = hoverPoly === poly;
                        const emissiveBase = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#020617');
                        const emissiveHighlight = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#22c55e'); // olive-ish
                        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                            metalness: 0.96,
                            roughness: 0.26,
                            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#020617'),
                            emissive: isHovered || isSelected ? emissiveHighlight : emissiveBase,
                            emissiveIntensity: isHovered ? 0.4 : isSelected ? 0.25 : 0.16,
                            envMap: steelTex ?? undefined,
                            envMapIntensity: isHovered || isSelected ? 1.2 : 0.9
                        });
                    }
                    // countries: subtle metallic band
                    if (isCountry(poly)) {
                        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                            metalness: 0.75,
                            roughness: 0.35,
                            color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#020617'),
                            emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#020617'),
                            emissiveIntensity: 0.18,
                            envMap: blueTex ?? undefined,
                            envMapIntensity: 0.7
                        });
                    }
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                        metalness: 0.6,
                        roughness: 0.4,
                        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Color"]('#020617')
                    });
                },
                // sides: olive backlight – shows mainly in gaps between states
                polygonSideColor: (poly)=>isState(poly) ? 'rgba(34,197,94,0.85)' // olive/emerald glow in the seams
                     : '#020617',
                // border lines: very subtle, no neon blue outline
                polygonStrokeColor: (poly)=>isState(poly) ? 'rgba(21,94,49,0.45)' : 'rgba(30,64,175,0.25)',
                polygonLabel: (poly)=>isState(poly) ? `${poly.properties?.name ?? ''} (${poly.properties?.postal})` : poly.properties?.name ?? '',
                polygonsTransitionDuration: 260,
                polygonCapCurvatureResolution: 2,
                onPolygonHover: (poly)=>setHoverPoly(poly),
                onPolygonClick: (poly, event)=>{
                    const name = poly.properties?.name ?? '';
                    const clickCoords = event && typeof event.clientX === 'number' ? {
                        x: event.clientX,
                        y: event.clientY
                    } : undefined;
                    if (isState(poly)) {
                        const id = getStatePostal(poly) ?? poly.id ?? '';
                        setSelectedStateId(id || null);
                        if (onStateSelect) {
                            onStateSelect(id, name, clickCoords);
                        }
                        return;
                    }
                    if (isCountry(poly)) {
                        const regionFromCountry = getCountryRegion(poly);
                        if (regionFromCountry && onRegionChange) {
                            onRegionChange(regionFromCountry);
                        }
                        if (onStateSelect) {
                            const id = name || poly.id || '';
                            onStateSelect(id, name, clickCoords);
                        }
                    }
                }
            }, void 0, false, {
                fileName: "[project]/components/GlobeStates.tsx",
                lineNumber: 218,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/GlobeStates.tsx",
            lineNumber: 217,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/GlobeStates.tsx",
        lineNumber: 216,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(GlobeStates, "ogVcQ4aMs/4zrnA/nGFJdrjEbcI=");
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