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
// Where to aim the camera for each region (future-proofing)
const regionFocus = {
    unitedStates: {
        lat: 39,
        lng: -98,
        altitude: 2.3
    },
    canada: {
        lat: 62,
        lng: -96,
        altitude: 2.6
    },
    mexico: {
        lat: 23,
        lng: -102,
        altitude: 2.7
    },
    netherlands: {
        lat: 52.3,
        lng: 5.3,
        altitude: 4.0
    }
};
// 🔥 IMPORTANT: update these if you use different filenames
const earthTextureUrl = '/uploads/earth-metal-atlas.png';
const earthBumpUrl = '/uploads/earth-metal-atlas-bump.png'; // optional
const metalTextureUrl = '/uploads/metal-cubes-texture.png';
// Official US states topojson (tiny, cached, very fast)
const usStatesUrl = 'https://unpkg.com/us-atlas@3/states-10m.json';
const GlobeStates = ({ region, onStateSelect })=>{
    const globeRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [usPolygons, setUsPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [hoverPoly, setHoverPoly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [materials, setMaterials] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // 1. Load US state boundaries from official topojson
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(usStatesUrl);
                const topo = await res.json();
                const geo = __TURBOPACK__imported__module__$5b$externals$5d2f$topojson$2d$client__$5b$external$5d$__$28$topojson$2d$client$2c$__cjs$29$__["feature"](topo, topo.objects.states);
                setUsPolygons(geo.features);
            } catch (err) {
                console.error('Failed to load US states topojson', err);
            }
        })();
    }, []);
    // 2. Load your metal cubes texture & turn it into shiny materials
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const loader = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["TextureLoader"]();
        loader.load(metalTextureUrl, (tex)=>{
            tex.wrapS = tex.wrapT = __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["RepeatWrapping"];
            tex.anisotropy = 8;
            tex.repeat.set(1.7, 1.7);
            const cap = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                map: tex,
                metalness: 1,
                roughness: 0.18
            });
            const side = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                map: tex,
                metalness: 0.9,
                roughness: 0.25
            });
            setMaterials({
                cap,
                side
            });
        }, undefined, (err)=>{
            console.error('Failed to load metal texture', err);
        });
    }, []);
    // 3. Configure controls & camera whenever region/data changes
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!globeRef.current) return;
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.25;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.minDistance = 200;
        controls.maxDistance = 800;
        const focus = regionFocus[region];
        globeRef.current.pointOfView({
            lat: focus.lat,
            lng: focus.lng,
            altitude: focus.altitude
        }, 1000 // ms animation
        );
    }, [
        region,
        usPolygons
    ]);
    const polygonsData = region === 'unitedStates' ? usPolygons : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__["default"], {
        ref: globeRef,
        // we let the parent container handle layout; these just give a base size
        width: 960,
        height: 540,
        backgroundColor: "rgba(0,0,0,0)",
        globeImageUrl: earthTextureUrl,
        bumpImageUrl: earthBumpUrl,
        showAtmosphere: true,
        atmosphereColor: "#8fd5ff",
        atmosphereAltitude: 0.32,
        onGlobeReady: ()=>{
            // Custom lights to make it feel like chrome + blue rim light
            if (!globeRef.current) return;
            const scene = globeRef.current.scene();
            const existing = scene.getObjectByName('cartfaxLights');
            if (existing) scene.remove(existing);
            const group = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Group"]();
            group.name = 'cartfaxLights';
            const key = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["DirectionalLight"]('#ffffff', 1.25);
            key.position.set(2.5, 1.8, 3);
            group.add(key);
            const rim = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["DirectionalLight"]('#5ecbff', 0.9);
            rim.position.set(-2.2, -1.7, -2.4);
            group.add(rim);
            const fill = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["AmbientLight"]('#ffffff', 0.65);
            group.add(fill);
            scene.add(group);
        },
        // POLYGON LAYER – US states extruding from globe
        polygonsData: polygonsData,
        polygonGeoJsonGeometry: (d)=>d.geometry,
        polygonLabel: (d)=>d.properties?.name || '',
        polygonAltitude: (d)=>hoverPoly && hoverPoly === d ? 0.17 : 0.10,
        polygonCapMaterial: materials?.cap,
        polygonSideMaterial: materials?.side,
        polygonStrokeColor: ()=>'#43c5ff',
        polygonCapCurvatureResolution: 2,
        polygonsTransitionDuration: 260,
        onPolygonHover: (poly)=>setHoverPoly(poly),
        onPolygonClick: (poly)=>{
            if (onStateSelect) {
                const id = poly.id ?? poly.properties?.postal;
                const name = poly.properties?.name ?? '';
                onStateSelect(id, name);
            }
        }
    }, void 0, false, {
        fileName: "[project]/components/GlobeStates.tsx",
        lineNumber: 116,
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