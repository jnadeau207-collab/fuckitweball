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
"[externals]/three [external] (three, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("three");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/components/AdminStateExplorer.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/three [external] (three, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
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
        altitude: 2.0
    },
    mexico: {
        lat: 23,
        lng: -102,
        altitude: 2.0
    },
    netherlands: {
        lat: 52.3,
        lng: 5.3,
        altitude: 2.4
    },
    uruguay: {
        lat: -32.5,
        lng: -56,
        altitude: 2.4
    },
    germany: {
        lat: 51.1,
        lng: 10.4,
        altitude: 2.4
    },
    southAfrica: {
        lat: -30,
        lng: 25,
        altitude: 2.3
    },
    luxembourg: {
        lat: 49.8,
        lng: 6.1,
        altitude: 2.5
    },
    malta: {
        lat: 35.9,
        lng: 14.4,
        altitude: 2.5
    },
    georgia: {
        lat: 42.3,
        lng: 43.4,
        altitude: 2.4
    }
};
const usStatesUrl = 'https://unpkg.com/us-atlas@3/states-10m.json';
const worldCountriesUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
// Natural Earth / ISO 3166-1 numeric codes → RegionId
// (These match the ids in the world-atlas topojson.)
const COUNTRY_ID_TO_REGION = {
    840: 'unitedStates',
    124: 'canada',
    484: 'mexico',
    528: 'netherlands',
    858: 'uruguay',
    276: 'germany',
    710: 'southAfrica',
    442: 'luxembourg',
    470: 'malta',
    268: 'georgia'
};
const GlobeStates = ({ region, onStateSelect, onViewChange, onRegionChange })=>{
    const globeRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [usPolygons, setUsPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [worldPolygons, setWorldPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [hoverPoly, setHoverPoly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedStateId, setSelectedStateId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedCountryNumericId, setSelectedCountryNumericId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // Textures
    const [stainlessTex, setStainlessTex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [steelTex, setSteelTex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [blueTex, setBlueTex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const isUS = region === 'unitedStates';
    // Helpers --------------------------------------------------------
    const getStatePostal = (poly)=>{
        const postal = poly?.properties?.postal ?? poly?.id;
        if (!postal) return null;
        return String(postal).toUpperCase();
    };
    const isState = (poly)=>!!poly?.properties && typeof poly.properties.postal !== 'undefined';
    const getCountryNumericId = (poly)=>{
        const raw = poly?.id;
        if (raw === null || raw === undefined) return null;
        if (typeof raw === 'number') return raw;
        const parsed = Number.parseInt(String(raw), 10);
        return Number.isNaN(parsed) ? null : parsed;
    };
    const isCountry = (poly)=>{
        const hasId = poly?.properties && typeof getCountryNumericId(poly) === 'number';
        return hasId && !isState(poly);
    };
    const getCountryRegion = (poly)=>{
        const idNum = getCountryNumericId(poly);
        if (idNum === null) return null;
        return COUNTRY_ID_TO_REGION[idNum] ?? null;
    };
    // Load topojson ---------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(usStatesUrl);
                const topo = await res.json();
                const geo = __TURBOPACK__imported__module__$5b$externals$5d2f$topojson$2d$client__$5b$external$5d$__$28$topojson$2d$client$2c$__cjs$29$__["feature"](topo, topo.objects.states);
                const states = geo.features.map((f)=>({
                        ...f,
                        properties: {
                            ...f.properties,
                            postal: f.properties?.postal || f.id
                        }
                    }));
                setUsPolygons(states);
            } catch (err) {
                console.error('Error loading US states topojson', err);
            }
        })();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(worldCountriesUrl);
                const topo = await res.json();
                const geo = __TURBOPACK__imported__module__$5b$externals$5d2f$topojson$2d$client__$5b$external$5d$__$28$topojson$2d$client$2c$__cjs$29$__["feature"](topo, topo.objects.countries);
                setWorldPolygons(geo.features);
            } catch (err) {
                console.error('Error loading world countries topojson', err);
            }
        })();
    }, []);
    // Textures --------------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const loader = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["TextureLoader"]();
        loader.load('/textures/stainless.jpg', (tex)=>{
            tex.wrapS = tex.wrapT = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["RepeatWrapping"];
            setStainlessTex(tex);
        });
        loader.load('/textures/steel.jpg', (tex)=>{
            tex.wrapS = tex.wrapT = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["RepeatWrapping"];
            setSteelTex(tex);
        });
        loader.load('/textures/blue-metal.jpg', (tex)=>{
            tex.wrapS = tex.wrapT = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["RepeatWrapping"];
            setBlueTex(tex);
        });
    }, []);
    // Focus camera on active region ----------------------------------
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!globeRef.current) return;
        const focus = regionFocus[region];
        if (!focus) return;
        globeRef.current.pointOfView({
            lat: focus.lat,
            lng: focus.lng,
            altitude: focus.altitude
        }, 1000);
    }, [
        region,
        usPolygons,
        worldPolygons
    ]);
    // Altitude reporting ----------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!globeRef.current || !onViewChange) return;
        const globe = globeRef.current;
        const handle = ()=>{
            const { altitude } = globe.pointOfView();
            onViewChange(altitude);
        };
        globe.controls().addEventListener('change', handle);
        return ()=>{
            globe.controls().removeEventListener('change', handle);
        };
    }, [
        onViewChange
    ]);
    // Combined polygon data -------------------------------------------
    const allPolygons = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>[
            ...worldPolygons,
            ...usPolygons
        ], [
        worldPolygons,
        usPolygons
    ]);
    // Explosion / altitude settings -----------------------------------
    const BASE_ALT_STATE = 0.02;
    const BASE_ALT_COUNTRY = 0.014;
    const BASE_ALT_OTHER = 0.005;
    const EXTRA_SELECTED = 0.018;
    const EXTRA_REGION = 0.008;
    const EXTRA_HOVER = 0.006;
    const polygonAltitude = (poly)=>{
        if (isState(poly)) {
            const id = getStatePostal(poly);
            const isSelected = id && selectedStateId && id === selectedStateId;
            const isHovered = hoverPoly === poly;
            let alt = BASE_ALT_STATE;
            if (isSelected) alt += EXTRA_SELECTED;
            if (isHovered) alt += EXTRA_HOVER;
            return alt;
        }
        if (isCountry(poly)) {
            const countryRegion = getCountryRegion(poly);
            const numericId = getCountryNumericId(poly);
            const isRegionCountry = countryRegion === region;
            const isSelectedCountry = numericId !== null && selectedCountryNumericId !== null && numericId === selectedCountryNumericId;
            const isHovered = hoverPoly === poly;
            let alt = BASE_ALT_COUNTRY;
            if (isRegionCountry) alt += EXTRA_REGION;
            if (isSelectedCountry) alt += EXTRA_SELECTED;
            if (isHovered) alt += EXTRA_HOVER;
            return alt;
        }
        return BASE_ALT_OTHER;
    };
    // Render ----------------------------------------------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__["default"], {
            ref: globeRef,
            backgroundColor: "rgba(0,0,0,1)",
            animateIn: true,
            hexPolygonResolution: 3,
            hexPolygonMargin: 0.4,
            globeMaterial: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                metalness: 0.9,
                roughness: 0.35,
                color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#020617'),
                envMap: stainlessTex ?? undefined,
                envMapIntensity: 1.0
            }),
            polygonsData: allPolygons,
            polygonAltitude: polygonAltitude,
            polygonCapMaterial: (poly)=>{
                // States: dark glossy tiles with green emission
                if (isState(poly)) {
                    const id = getStatePostal(poly);
                    const isSelected = id && selectedStateId && id === selectedStateId;
                    const isHovered = hoverPoly === poly;
                    const emissiveBase = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#020617');
                    const emissiveHighlight = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#22c55e');
                    return new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                        metalness: 0.96,
                        roughness: 0.26,
                        color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#020617'),
                        emissive: isHovered || isSelected ? emissiveHighlight : emissiveBase,
                        emissiveIntensity: isHovered ? 0.7 : isSelected ? 0.5 : 0.2,
                        envMap: steelTex ?? undefined,
                        envMapIntensity: isHovered || isSelected ? 1.4 : 1.0
                    });
                }
                // Countries: subtle metallic band; active jurisdiction glows a bit.
                if (isCountry(poly)) {
                    const countryRegion = getCountryRegion(poly);
                    const numericId = getCountryNumericId(poly);
                    const isRegionCountry = countryRegion === region;
                    const isSelectedCountry = numericId !== null && selectedCountryNumericId !== null && numericId === selectedCountryNumericId;
                    const emissive = isRegionCountry || isSelectedCountry ? new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#22c55e') : new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#020617');
                    const emissiveIntensity = isSelectedCountry ? 0.6 : isRegionCountry ? 0.35 : 0.18;
                    return new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                        metalness: 0.8,
                        roughness: 0.38,
                        color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#020617'),
                        emissive,
                        emissiveIntensity,
                        envMap: blueTex ?? undefined,
                        envMapIntensity: 0.8
                    });
                }
                return new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                    metalness: 0.6,
                    roughness: 0.45,
                    color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#020617')
                });
            },
            polygonSideColor: (poly)=>isState(poly) || isCountry(poly) ? 'rgba(34,197,94,0.85)' : '#020617',
            polygonStrokeColor: (poly)=>isState(poly) || isCountry(poly) ? 'rgba(21,94,49,0.5)' : 'rgba(30,64,175,0.25)',
            polygonLabel: (poly)=>isState(poly) ? `${poly.properties?.name ?? ''} (${poly.properties?.postal})` : poly.properties?.name ?? '',
            polygonsTransitionDuration: 260,
            polygonCapCurvatureResolution: 2,
            onPolygonHover: (poly)=>{
                setHoverPoly(poly);
            },
            onPolygonClick: (poly, event)=>{
                const name = poly.properties?.name ?? '';
                const clickCoords = event && typeof event.clientX === 'number' ? {
                    x: event.clientX,
                    y: event.clientY
                } : undefined;
                if (isState(poly)) {
                    const id = getStatePostal(poly) ?? poly.id ?? '';
                    setSelectedStateId(id || null);
                    setSelectedCountryNumericId(null);
                    if (onStateSelect) {
                        onStateSelect(id, name, clickCoords);
                    }
                    return;
                }
                if (isCountry(poly)) {
                    const numericId = getCountryNumericId(poly);
                    setSelectedStateId(null);
                    setSelectedCountryNumericId(numericId);
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
            fileName: "[project]/components/AdminStateExplorer.tsx",
            lineNumber: 257,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/AdminStateExplorer.tsx",
        lineNumber: 256,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GlobeStates;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AdminStateExplorer.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AdminStateExplorer$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__da1cd5e2._.js.map