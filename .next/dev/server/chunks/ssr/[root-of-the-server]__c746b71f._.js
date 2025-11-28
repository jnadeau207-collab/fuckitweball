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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// Camera focus for each region
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
// local GeoJSONs you saved earlier
const caProvincesUrl = '/data/ca-provinces.json';
const mxStatesUrl = '/data/mx-states.json';
const nlProvincesUrl = '/data/nl-provinces.json';
const BASE_ALT = 0.02;
const EXTRA_SELECTED = 0.012;
const EXTRA_HOVER = 0.006;
const GlobeStates = ({ region, onStateSelect, onViewChange, onRegionChange })=>{
    const globeRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [usPolygons, setUsPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [caPolygons, setCaPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [mxPolygons, setMxPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [nlPolygons, setNlPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [hoverPoly, setHoverPoly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // ---------- helpers ----------
    const getSubregionId = (poly)=>{
        const props = poly?.properties ?? {};
        if (props.postal) return String(props.postal).toUpperCase();
        if (props.id) return String(props.id);
        if (poly.id) return String(poly.id);
        return '';
    };
    const getSubregionName = (poly)=>{
        const props = poly?.properties ?? {};
        return props.name || props.NAME_1 || props.province || props.state || String(poly.id ?? '') || '';
    };
    // ---------- load geo data ----------
    // US states from us-atlas
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
                            // ensure postal code is present
                            postal: f.properties?.postal || f.id
                        }
                    }));
                setUsPolygons(states);
            } catch (err) {
                console.error('Error loading US states topojson', err);
            }
        })();
    }, []);
    // Canada provinces
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(caProvincesUrl);
                const geo = await res.json();
                const features = geo.features ?? geo;
                setCaPolygons(features);
            } catch (err) {
                console.error('Error loading Canada provinces GeoJSON', err);
            }
        })();
    }, []);
    // Mexico states
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(mxStatesUrl);
                const geo = await res.json();
                const features = geo.features ?? geo;
                setMxPolygons(features);
            } catch (err) {
                console.error('Error loading Mexico states GeoJSON', err);
            }
        })();
    }, []);
    // Netherlands provinces
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(nlProvincesUrl);
                const geo = await res.json();
                const features = geo.features ?? geo;
                setNlPolygons(features);
            } catch (err) {
                console.error('Error loading Netherlands provinces GeoJSON', err);
            }
        })();
    }, []);
    // ---------- camera + controls ----------
    // Set up controls once
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const globe = globeRef.current;
        if (!globe) return;
        const controls = globe.controls();
        if (!controls) return;
        controls.enableDamping = true;
        controls.dampingFactor = 0.15;
        controls.enablePan = true;
        controls.enableZoom = true;
        controls.minDistance = 180;
        controls.maxDistance = 650;
        // initial view
        const focus = regionFocus[region];
        globe.pointOfView({
            lat: focus.lat,
            lng: focus.lng,
            altitude: focus.altitude
        }, 0);
    }, []); // run once on mount
    // Re-focus when region changes
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const globe = globeRef.current;
        if (!globe) return;
        const focus = regionFocus[region];
        globe.pointOfView({
            lat: focus.lat,
            lng: focus.lng,
            altitude: focus.altitude
        }, 900);
        // clear selection on region change
        setSelectedId(null);
        setHoverPoly(null);
    }, [
        region
    ]);
    // Report altitude back up when camera moves
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!globeRef.current || !onViewChange) return;
        const globe = globeRef.current;
        const controls = globe.controls();
        if (!controls) return;
        const handleChange = ()=>{
            const { altitude } = globe.pointOfView();
            onViewChange(altitude);
        };
        controls.addEventListener('change', handleChange);
        return ()=>{
            controls.removeEventListener('change', handleChange);
        };
    }, [
        onViewChange
    ]);
    // ---------- active polygons ----------
    const activePolygons = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        switch(region){
            case 'unitedStates':
                return usPolygons;
            case 'canada':
                return caPolygons;
            case 'mexico':
                return mxPolygons;
            case 'netherlands':
                return nlPolygons;
            default:
                return [];
        }
    }, [
        region,
        usPolygons,
        caPolygons,
        mxPolygons,
        nlPolygons
    ]);
    const polygonAltitude = (poly)=>{
        const id = getSubregionId(poly);
        const isSelected = selectedId && id === selectedId;
        const isHovered = hoverPoly === poly;
        let alt = BASE_ALT;
        if (isSelected) alt += EXTRA_SELECTED;
        if (isHovered) alt += EXTRA_HOVER;
        return alt;
    };
    const polygonCapColor = (poly)=>{
        const id = getSubregionId(poly);
        const isSelected = selectedId && id === selectedId;
        const isHovered = hoverPoly === poly;
        if (isSelected) return '#22c55e'; // bright green
        if (isHovered) return '#4ade80'; // lighter on hover
        return '#020617'; // dark slate
    };
    // ---------- render ----------
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__["default"], {
            ref: globeRef,
            animateIn: true,
            backgroundColor: "rgba(0,0,0,1)",
            showAtmosphere: false,
            globeImageUrl: "/textures/earth-night-2016.jpg",
            // keep resolution low enough to be fast; texture does the heavy lifting
            polygonsData: activePolygons,
            polygonAltitude: polygonAltitude,
            polygonCapColor: polygonCapColor,
            polygonSideColor: ()=>'rgba(34,197,94,0.85)',
            polygonStrokeColor: ()=>'rgba(34,197,94,0.65)',
            polygonLabel: (poly)=>getSubregionName(poly),
            polygonsTransitionDuration: 260,
            onPolygonHover: (poly)=>{
                setHoverPoly(poly || null);
            },
            onPolygonClick: (poly, event)=>{
                if (!poly) return;
                const id = getSubregionId(poly);
                const name = getSubregionName(poly);
                setSelectedId(id || null);
                const clickCoords = event && typeof event.clientX === 'number' ? {
                    x: event.clientX,
                    y: event.clientY
                } : undefined;
                if (onStateSelect) {
                    onStateSelect(id || null, name, clickCoords);
                }
            // Optional: when clicking a region border polygon that
            // *represents* the whole region, you could trigger onRegionChange.
            // Here we assume tabs handle region changes, so we don't.
            }
        }, void 0, false, {
            fileName: "[project]/components/GlobeStates.tsx",
            lineNumber: 253,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/GlobeStates.tsx",
        lineNumber: 252,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__c746b71f._.js.map