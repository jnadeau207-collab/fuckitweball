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
// Camera focus targets per region
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
// Mapping from world-atlas numeric country IDs to our RegionId
const COUNTRY_ID_TO_REGION = {
    840: 'unitedStates',
    124: 'canada',
    484: 'mexico',
    528: 'netherlands'
};
const GlobeStates = ({ region, onStateSelect, onViewChange, onRegionChange })=>{
    const globeRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [usPolygons, setUsPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [worldPolygons, setWorldPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [hoverPoly, setHoverPoly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedStateId, setSelectedStateId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [earthTexture, setEarthTexture] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
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
    // US states
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
    // World countries (for US, CA, MX, NL outlines)
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
    // --- base earth texture (optional) ----------------------------------------
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const loader = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["TextureLoader"]();
        loader.load('/textures/earth-night-2016.jpg', (tex)=>{
            tex.wrapS = tex.wrapT = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["ClampToEdgeWrapping"];
            setEarthTexture(tex);
        }, undefined, ()=>{
            console.warn('Could not load /textures/earth-night-2016.jpg; globe will use a flat color instead.');
        });
    }, []);
    // --- focus camera on region -----------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!globeRef.current) return;
        const focus = regionFocus[region];
        globeRef.current.pointOfView({
            lat: focus.lat,
            lng: focus.lng,
            altitude: focus.altitude
        }, 1000);
    }, [
        region
    ]);
    // --- altitude reporting ----------------------------------------------------
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
    // --- combined polygon data -------------------------------------------------
    const allPolygons = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>[
            ...worldPolygons,
            ...usPolygons
        ], [
        worldPolygons,
        usPolygons
    ]);
    // --- explosion / altitude logic -------------------------------------------
    const BASE_ALT_STATE = 0.015; // base extrusion for US states
    const BASE_ALT_COUNTRY = 0.008; // base extrusion for countries
    const BASE_ALT_OTHER = 0.004;
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
            const reg = getCountryRegion(poly);
            const isActiveCountry = reg && reg === region;
            const isHovered = hoverPoly === poly;
            let alt = BASE_ALT_COUNTRY;
            if (isActiveCountry) alt += EXTRA_SELECTED * 0.7;
            if (isHovered) alt += EXTRA_HOVER * 0.5;
            return alt;
        }
        return BASE_ALT_OTHER;
    };
    const globeMaterial = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
            metalness: 0.35,
            roughness: 0.9,
            color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#020617'),
            map: earthTexture ?? undefined
        }), [
        earthTexture
    ]);
    // --- render ----------------------------------------------------------------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__["default"], {
            ref: globeRef,
            backgroundColor: "rgba(0,0,0,1)",
            animateIn: true,
            showAtmosphere: false,
            globeMaterial: globeMaterial,
            hexPolygonResolution: 3,
            hexPolygonMargin: 0.4,
            polygonsData: allPolygons,
            polygonAltitude: polygonAltitude,
            polygonCapMaterial: (poly)=>{
                // state caps
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
                        emissiveIntensity: isHovered ? 0.4 : isSelected ? 0.25 : 0.16
                    });
                }
                // country caps
                if (isCountry(poly)) {
                    const reg = getCountryRegion(poly);
                    const isActiveCountry = reg && reg === region;
                    return new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                        metalness: 0.7,
                        roughness: 0.5,
                        color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"](isActiveCountry ? '#043b27' : '#020617'),
                        emissive: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"](isActiveCountry ? '#16a34a' : '#020617'),
                        emissiveIntensity: isActiveCountry ? 0.24 : 0.14
                    });
                }
                // fallback
                return new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                    metalness: 0.6,
                    roughness: 0.4,
                    color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#020617')
                });
            },
            polygonSideColor: (poly)=>isState(poly) ? 'rgba(34,197,94,0.85)' : 'rgba(15,23,42,0.9)',
            polygonStrokeColor: (poly)=>isState(poly) ? 'rgba(21,94,49,0.7)' : 'rgba(30,64,175,0.25)',
            polygonLabel: (poly)=>isState(poly) ? `${poly.properties?.name ?? ''} (${poly.properties?.postal})` : poly.properties?.name ?? '',
            polygonsTransitionDuration: 260,
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
            lineNumber: 231,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/GlobeStates.tsx",
        lineNumber: 230,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__581f23b9._.js.map