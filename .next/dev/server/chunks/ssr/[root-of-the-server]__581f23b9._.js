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
    const globeRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [usPolygons, setUsPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [worldPolygons, setWorldPolygons] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [hoverPoly, setHoverPoly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [stainlessTex, setStainlessTex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [steelTex, setSteelTex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [blueTex, setBlueTex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const isUS = region === 'unitedStates';
    // --- load topojson ---
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(usStatesUrl);
                const topo = await res.json();
                const geo = __TURBOPACK__imported__module__$5b$externals$5d2f$topojson$2d$client__$5b$external$5d$__$28$topojson$2d$client$2c$__cjs$29$__["feature"](topo, topo.objects.states);
                const states = geo.features.map((f)=>({
                        ...f,
                        properties: {
                            ...f.properties || {},
                            __kind: 'state'
                        }
                    }));
                setUsPolygons(states);
            } catch (err) {
                console.error('Failed to load US states topojson', err);
            }
        })();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const res = await fetch(worldCountriesUrl);
                const topo = await res.json();
                const geo = __TURBOPACK__imported__module__$5b$externals$5d2f$topojson$2d$client__$5b$external$5d$__$28$topojson$2d$client$2c$__cjs$29$__["feature"](topo, topo.objects.countries);
                const countries = geo.features.map((f)=>({
                        ...f,
                        properties: {
                            ...f.properties || {},
                            __kind: 'country'
                        }
                    }));
                setWorldPolygons(countries);
            } catch (err) {
                console.error('Failed to load world countries topojson', err);
            }
        })();
    }, []);
    // --- load textures for materials ---
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const loader = undefined;
    }, []);
    // --- camera & controls ---
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!globeRef.current) return;
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.25;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.minDistance = 140;
        controls.maxDistance = 650;
        const focus = regionFocus[region];
        globeRef.current.pointOfView({
            lat: focus.lat,
            lng: focus.lng,
            altitude: focus.altitude
        }, 1000);
    }, [
        region,
        usPolygons
    ]);
    // --- altitude reporting ---
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!globeRef.current || !onViewChange) return;
        let frameId;
        let lastAlt = 0;
        const tick = ()=>{
            const pov = globeRef.current.pointOfView();
            if (pov && typeof pov.altitude === 'number') {
                const alt = pov.altitude;
                if (Math.abs(alt - lastAlt) > 0.02) {
                    lastAlt = alt;
                    onViewChange(alt);
                }
            }
            frameId = requestAnimationFrame(tick);
        };
        tick();
        return ()=>cancelAnimationFrame(frameId);
    }, [
        onViewChange
    ]);
    const isState = (d)=>d?.properties?.__kind === 'state';
    const isCountry = (d)=>d?.properties?.__kind === 'country';
    const getCountryRegion = (d)=>{
        const rawId = d?.id;
        const numericId = typeof rawId === 'number' ? rawId : rawId ? Number(rawId) : NaN;
        if (!Number.isFinite(numericId)) return null;
        return COUNTRY_ID_TO_REGION[numericId] ?? null;
    };
    const isActiveCountry = (d)=>{
        if (!isCountry(d)) return false;
        const r = getCountryRegion(d);
        return r !== null && r === region;
    };
    // --- polygon data ---
    const polygonsData = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        if (!worldPolygons.length) return usPolygons;
        if (isUS) {
            const worldWithoutUS = worldPolygons.filter((f)=>{
                const rawId = f.id;
                const numericId = typeof rawId === 'number' ? rawId : rawId ? Number(rawId) : NaN;
                return numericId !== 840;
            });
            return [
                ...worldWithoutUS,
                ...usPolygons
            ];
        }
        return worldPolygons;
    }, [
        worldPolygons,
        usPolygons,
        isUS
    ]);
    // --- glossy materials ---
    const { stateMaterial, countryMaterial, activeCountryMaterial, baseCountryMaterial } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const stateMat = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshPhysicalMaterial"]({
            map: stainlessTex || undefined,
            color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#f3f4f6'),
            metalness: 0.98,
            roughness: 0.08,
            clearcoat: 0.9,
            clearcoatRoughness: 0.03,
            reflectivity: 1.0
        });
        const countryMat = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
            map: steelTex || undefined,
            color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#d1d5db'),
            metalness: 0.7,
            roughness: 0.35
        });
        const activeMat = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshPhysicalMaterial"]({
            map: steelTex || undefined,
            color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#bfdbfe'),
            metalness: 0.95,
            roughness: 0.12,
            clearcoat: 0.85,
            clearcoatRoughness: 0.08,
            emissive: blueTex ? new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#1d4ed8') : new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#1e40af'),
            emissiveIntensity: 0.15
        });
        const baseMat = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
            color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#e5e7eb'),
            metalness: 0.5,
            roughness: 0.6
        });
        return {
            stateMaterial: stateMat,
            countryMaterial: countryMat,
            activeCountryMaterial: activeMat,
            baseCountryMaterial: baseMat
        };
    }, [
        stainlessTex,
        steelTex,
        blueTex
    ]);
    // --- render ---
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "relative mx-auto flex items-center justify-center",
        style: {
            width: 960,
            height: 540
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "relative z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$globe$2e$gl__$5b$external$5d$__$28$react$2d$globe$2e$gl$2c$__esm_import$29$__["default"], {
                ref: globeRef,
                width: 960,
                height: 540,
                backgroundColor: "rgba(0,0,0,0)",
                // Soft white glass core under everything
                globeMaterial: ()=>new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["MeshStandardMaterial"]({
                        // soft sky blue / glassy core
                        color: new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Color"]('#e0f2fe'),
                        metalness: 0.25,
                        roughness: 0.75,
                        transparent: true,
                        opacity: 0.35
                    }),
                showAtmosphere: true,
                atmosphereColor: "#e5efff",
                atmosphereAltitude: 0.2,
                onGlobeReady: ()=>{
                    if (!globeRef.current) return;
                    const scene = globeRef.current.scene();
                    const existing = scene.getObjectByName('cartfaxLights');
                    if (existing) scene.remove(existing);
                    const group = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["Group"]();
                    group.name = 'cartfaxLights';
                    const key = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["DirectionalLight"]('#ffffff', 1.4);
                    key.position.set(3.2, 2.4, 4.0);
                    group.add(key);
                    const rim = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["DirectionalLight"]('#60a5fa', 0.9);
                    rim.position.set(-3.0, -1.8, -3.0);
                    group.add(rim);
                    const ambient = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["AmbientLight"]('#ffffff', 0.85);
                    group.add(ambient);
                    const hemi = new __TURBOPACK__imported__module__$5b$externals$5d2f$three__$5b$external$5d$__$28$three$2c$__esm_import$29$__["HemisphereLight"]('#dbeafe', '#e5e7eb', 0.6);
                    group.add(hemi);
                    scene.add(group);
                },
                polygonsData: polygonsData,
                polygonLabel: (d)=>d.properties?.name || '',
                polygonAltitude: (d)=>{
                    const hovered = hoverPoly && hoverPoly === d;
                    if (isState(d)) {
                        if (region === 'unitedStates') {
                            const base = 0.02;
                            const bump = 0.012;
                            return hovered ? base + bump : base;
                        }
                        return hovered ? 0.012 : 0.007;
                    }
                    if (isCountry(d)) {
                        const active = isActiveCountry(d);
                        const base = active ? 0.018 : 0.006;
                        const bump = active ? 0.012 : 0.007;
                        return hovered ? base + bump : base;
                    }
                    return 0.0;
                },
                polygonCapMaterial: (d)=>{
                    if (isState(d) && region === 'unitedStates') {
                        return stateMaterial;
                    }
                    if (isCountry(d)) {
                        const active = isActiveCountry(d);
                        return active ? activeCountryMaterial : countryMaterial;
                    }
                    return baseCountryMaterial;
                },
                polygonSideColor: (d)=>{
                    if (isState(d)) {
                        return region === 'unitedStates' ? '#6b7280' : '#9ca3af';
                    }
                    if (isCountry(d)) {
                        return isActiveCountry(d) ? '#4b5563' : '#9ca3af';
                    }
                    return '#9ca3af';
                },
                polygonStrokeColor: (d)=>{
                    const hovered = hoverPoly && hoverPoly === d;
                    const active = isActiveCountry(d) || isState(d) && region === 'unitedStates';
                    if (hovered) return '#38bdf8';
                    return active ? '#60a5fa' : '#cbd5e1';
                },
                polygonsTransitionDuration: 260,
                polygonCapCurvatureResolution: 2,
                onPolygonHover: (poly)=>setHoverPoly(poly),
                onPolygonClick: (poly)=>{
                    const name = poly.properties?.name ?? '';
                    if (isState(poly)) {
                        if (!onStateSelect) return;
                        const id = poly.properties?.postal ?? poly.id ?? '';
                        onStateSelect(id, name);
                        return;
                    }
                    if (isCountry(poly)) {
                        const regionFromCountry = getCountryRegion(poly);
                        if (regionFromCountry && onRegionChange) {
                            onRegionChange(regionFromCountry);
                        }
                        if (onStateSelect) {
                            const id = name || poly.id || '';
                            onStateSelect(id, name);
                        }
                    }
                }
            }, void 0, false, {
                fileName: "[project]/components/GlobeStates.tsx",
                lineNumber: 266,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/GlobeStates.tsx",
            lineNumber: 265,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/GlobeStates.tsx",
        lineNumber: 260,
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