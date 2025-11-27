// components/GlobeStates.tsx
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import Globe from 'react-globe.gl';
import * as topojson from 'topojson-client';
import * as THREE from 'three';

export type RegionId = 'unitedStates' | 'canada' | 'mexico' | 'netherlands';

interface GlobeStatesProps {
  region: RegionId;
  onStateSelect?: (id: string, name: string) => void;
  onViewChange?: (altitude: number) => void;
  onRegionChange?: (region: RegionId) => void;
}

const regionFocus: Record<
  RegionId,
  { lat: number; lng: number; altitude: number }
> = {
  unitedStates: { lat: 39, lng: -98, altitude: 1.9 },
  canada: { lat: 62, lng: -96, altitude: 2.1 },
  mexico: { lat: 23, lng: -102, altitude: 2.1 },
  netherlands: { lat: 52.3, lng: 5.3, altitude: 3.0 },
};

const usStatesUrl = 'https://unpkg.com/us-atlas@3/states-10m.json';
const worldCountriesUrl =
  'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

const COUNTRY_ID_TO_REGION: Record<number, RegionId> = {
  840: 'unitedStates',
  124: 'canada',
  484: 'mexico',
  528: 'netherlands',
};

const GlobeStates: React.FC<GlobeStatesProps> = ({
  region,
  onStateSelect,
  onViewChange,
  onRegionChange,
}) => {
  const globeRef = useRef<any>(null);
  const [usPolygons, setUsPolygons] = useState<any[]>([]);
  const [worldPolygons, setWorldPolygons] = useState<any[]>([]);
  const [hoverPoly, setHoverPoly] = useState<any | null>(null);

  const [stainlessTex, setStainlessTex] = useState<THREE.Texture | null>(null);
  const [steelTex, setSteelTex] = useState<THREE.Texture | null>(null);
  const [blueTex, setBlueTex] = useState<THREE.Texture | null>(null);

  const isUS = region === 'unitedStates';

  // --- load topojson ---

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(usStatesUrl);
        const topo = await res.json();
        const geo = topojson.feature(topo, topo.objects.states) as any;
        const states = geo.features.map((f: any) => ({
          ...f,
          properties: { ...(f.properties || {}), __kind: 'state' },
        }));
        setUsPolygons(states);
      } catch (err) {
        console.error('Failed to load US states topojson', err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(worldCountriesUrl);
        const topo = await res.json();
        const geo = topojson.feature(topo, topo.objects.countries) as any;
        const countries = geo.features.map((f: any) => ({
          ...f,
          properties: { ...(f.properties || {}), __kind: 'country' },
        }));
        setWorldPolygons(countries);
      } catch (err) {
        console.error('Failed to load world countries topojson', err);
      }
    })();
  }, []);

  // --- load textures for materials ---

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loader = new THREE.TextureLoader();

    loader.load('/uploads/stainless.png', tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      setStainlessTex(tex);
    });

    loader.load('/uploads/steel.png', tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      setSteelTex(tex);
    });

    loader.load('/uploads/blue.png', tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      setBlueTex(tex);
    });
  }, []);

  // --- camera & controls ---

  useEffect(() => {
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
    globeRef.current.pointOfView(
      {
        lat: focus.lat,
        lng: focus.lng,
        altitude: focus.altitude,
      },
      1000
    );
  }, [region, usPolygons]);

  // --- altitude reporting ---

  useEffect(() => {
    if (!globeRef.current || !onViewChange) return;

    let frameId: number;
    let lastAlt = 0;

    const tick = () => {
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
    return () => cancelAnimationFrame(frameId);
  }, [onViewChange]);

  const isState = (d: any) => d?.properties?.__kind === 'state';
  const isCountry = (d: any) => d?.properties?.__kind === 'country';

  const getCountryRegion = (d: any): RegionId | null => {
    const rawId = d?.id;
    const numericId =
      typeof rawId === 'number' ? rawId : rawId ? Number(rawId) : NaN;
    if (!Number.isFinite(numericId)) return null;
    return COUNTRY_ID_TO_REGION[numericId] ?? null;
  };

  const isActiveCountry = (d: any): boolean => {
    if (!isCountry(d)) return false;
    const r = getCountryRegion(d);
    return r !== null && r === region;
  };

  // --- polygon data ---

  const polygonsData = useMemo(() => {
    if (!worldPolygons.length) return usPolygons;

    if (isUS) {
      const worldWithoutUS = worldPolygons.filter(f => {
        const rawId = f.id;
        const numericId =
          typeof rawId === 'number'
            ? rawId
            : rawId
            ? Number(rawId)
            : NaN;
        return numericId !== 840;
      });
      return [...worldWithoutUS, ...usPolygons];
    }

    return worldPolygons;
  }, [worldPolygons, usPolygons, isUS]);

  // --- glossy materials ---

  const {
    stateMaterial,
    countryMaterial,
    activeCountryMaterial,
    baseCountryMaterial,
  } = useMemo(() => {
    const stateMat = new THREE.MeshPhysicalMaterial({
      map: stainlessTex || undefined,
      color: new THREE.Color('#f3f4f6'),
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 0.9,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
    });

    const countryMat = new THREE.MeshStandardMaterial({
      map: steelTex || undefined,
      color: new THREE.Color('#d1d5db'),
      metalness: 0.7,
      roughness: 0.35,
    });

    const activeMat = new THREE.MeshPhysicalMaterial({
      map: steelTex || undefined,
      color: new THREE.Color('#bfdbfe'),
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
      emissive:
        blueTex ? new THREE.Color('#1d4ed8') : new THREE.Color('#1e40af'),
      emissiveIntensity: 0.15,
    });

    const baseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e5e7eb'),
      metalness: 0.5,
      roughness: 0.6,
    });

    return {
      stateMaterial: stateMat,
      countryMaterial: countryMat,
      activeCountryMaterial: activeMat,
      baseCountryMaterial: baseMat,
    };
  }, [stainlessTex, steelTex, blueTex]);

  // --- render ---

  return (
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{ width: 960, height: 540 }}
    >

      <div className="relative z-10">
        <Globe
          ref={globeRef}
          width={960}
          height={540}
          backgroundColor="rgba(0,0,0,0)"
          // Soft white glass core under everything
          globeMaterial={() =>
  new THREE.MeshStandardMaterial({
    // soft sky blue / glassy core
    color: new THREE.Color('#e0f2fe'),
    metalness: 0.25,
    roughness: 0.75,
    transparent: true,
    opacity: 0.35,
  })
}


          showAtmosphere={true}
          atmosphereColor="#e5efff"
          atmosphereAltitude={0.2}
          onGlobeReady={() => {
            if (!globeRef.current) return;
            const scene: THREE.Scene = globeRef.current.scene();

            const existing = scene.getObjectByName('cartfaxLights');
            if (existing) scene.remove(existing);

            const group = new THREE.Group();
            group.name = 'cartfaxLights';

            const key = new THREE.DirectionalLight('#ffffff', 1.4);
            key.position.set(3.2, 2.4, 4.0);
            group.add(key);

            const rim = new THREE.DirectionalLight('#60a5fa', 0.9);
            rim.position.set(-3.0, -1.8, -3.0);
            group.add(rim);

            const ambient = new THREE.AmbientLight('#ffffff', 0.85);
            group.add(ambient);

            const hemi = new THREE.HemisphereLight('#dbeafe', '#e5e7eb', 0.6);
            group.add(hemi);

            scene.add(group);
          }}
          polygonsData={polygonsData}
          polygonLabel={(d: any) => d.properties?.name || ''}
          polygonAltitude={(d: any) => {
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
          }}
          polygonCapMaterial={(d: any) => {
            if (isState(d) && region === 'unitedStates') {
              return stateMaterial;
            }
            if (isCountry(d)) {
              const active = isActiveCountry(d);
              return active ? activeCountryMaterial : countryMaterial;
            }
            return baseCountryMaterial;
          }}
          polygonSideColor={(d: any) => {
            if (isState(d)) {
              return region === 'unitedStates' ? '#6b7280' : '#9ca3af';
            }
            if (isCountry(d)) {
              return isActiveCountry(d) ? '#4b5563' : '#9ca3af';
            }
            return '#9ca3af';
          }}
          polygonStrokeColor={(d: any) => {
            const hovered = hoverPoly && hoverPoly === d;
            const active =
              isActiveCountry(d) || (isState(d) && region === 'unitedStates');
            if (hovered) return '#38bdf8';
            return active ? '#60a5fa' : '#cbd5e1';
          }}
          polygonsTransitionDuration={260}
          polygonCapCurvatureResolution={2}
          onPolygonHover={poly => setHoverPoly(poly)}
          onPolygonClick={poly => {
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
          }}
        />
      </div>
    </div>
  );
};

export default GlobeStates;
