// components/GlobeStates.tsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Globe from 'react-globe.gl';
import * as topojson from 'topojson-client';
import * as THREE from 'three';

export type RegionId = 'unitedStates' | 'canada' | 'mexico' | 'netherlands';

interface GlobeStatesProps {
  region: RegionId;
  onStateSelect?: (
    id: string | number | null,
    name: string,
    coords?: { x: number; y: number }
  ) => void;
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
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);

  // texture maps
  const [envTex, setEnvTex] = useState<THREE.Texture | null>(null);
  const [stateMetalTex, setStateMetalTex] = useState<THREE.Texture | null>(null);
  const [countryMetalTex, setCountryMetalTex] = useState<THREE.Texture | null>(
    null,
  );

  const isUS = region === 'unitedStates';

  // --- helpers --------------------------------------------------------------

  const getStatePostal = (poly: any): string | null => {
    const postal = poly?.properties?.postal ?? poly?.id;
    if (!postal) return null;
    return String(postal).toUpperCase();
  };

  const isState = (poly: any) =>
    !!poly?.properties && typeof poly.properties.postal !== 'undefined';

  const isCountry = (poly: any) =>
    poly?.properties && typeof poly.id !== 'undefined' && !isState(poly);

  const getCountryRegion = (poly: any): RegionId | null => {
    const idNum =
      typeof poly.id === 'number'
        ? poly.id
        : Number.parseInt(String(poly.id), 10);

    if (Number.isNaN(idNum)) return null;
    return COUNTRY_ID_TO_REGION[idNum] ?? null;
  };

  // --- load topojson --------------------------------------------------------

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(usStatesUrl);
        const topo = await res.json();
        const geo = topojson.feature(topo, topo.objects.states) as any;
        const states = geo.features.map((f: any) => ({
          ...f,
          properties: {
            ...f.properties,
            postal: f.properties?.postal || f.id,
          },
        }));
        setUsPolygons(states);
      } catch (err) {
        console.error('Error loading US states topojson', err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(worldCountriesUrl);
        const topo = await res.json();
        const geo = topojson.feature(topo, topo.objects.countries) as any;
        setWorldPolygons(geo.features);
      } catch (err) {
        console.error('Error loading world countries topojson', err);
      }
    })();
  }, []);

  // --- textures for materials -----------------------------------------------

  useEffect(() => {
    const loader = new THREE.TextureLoader();

    loader.load('/textures/state-metal.jpg', tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2.5, 2.5);
      setStateMetalTex(tex);
    });

    loader.load('/textures/country-metal.jpg', tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      setCountryMetalTex(tex);
    });

    loader.load('/textures/globe-env.jpg', tex => {
      tex.mapping = THREE.EquirectangularReflectionMapping;
      setEnvTex(tex);
    });
  }, []);

  // --- focus camera on region -----------------------------------------------

  useEffect(() => {
    if (!globeRef.current) return;
    const focus = regionFocus[region];
    globeRef.current.pointOfView(
      {
        lat: focus.lat,
        lng: focus.lng,
        altitude: focus.altitude,
      },
      1000,
    );
  }, [region]);

  // --- zoom feel / controls tuning ------------------------------------------

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls?.();
    if (!controls) return;

    // generous zoom range – avoids "tiny zoom after first click"
    controls.minDistance = 140;
    controls.maxDistance = 780;
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.zoomSpeed = 0.9;
  }, []);

  // --- altitude reporting ----------------------------------------------------

  useEffect(() => {
    if (!globeRef.current || !onViewChange) return;

    const globe = globeRef.current;
    const controls = globe.controls?.();
    if (!controls || !controls.addEventListener) return;

    const handle = () => {
      const { altitude } = globe.pointOfView();
      onViewChange(altitude);
    };

    controls.addEventListener('change', handle);
    return () => {
      controls.removeEventListener('change', handle);
    };
  }, [onViewChange]);

  // --- combined polygon data -------------------------------------------------

  const allPolygons = useMemo(
    () => [...worldPolygons, ...usPolygons],
    [worldPolygons, usPolygons],
  );

  // --- explosion / altitude logic -------------------------------------------

  const BASE_ALT_STATE = 0.015;
  const BASE_ALT_COUNTRY = 0.008;
  const BASE_ALT_OTHER = 0.004;

  // turned up slightly for more punch
  const EXTRA_SELECTED = 0.015;
  const EXTRA_HOVER = 0.008;

  const polygonAltitude = (poly: any) => {
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

  return (
    <div className="h-full w-full">
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,1)"
        animateIn
        hexPolygonResolution={3}
        hexPolygonMargin={0.4}
        globeMaterial={
          new THREE.MeshStandardMaterial({
            metalness: 0.9,
            roughness: 0.32,
            color: new THREE.Color('#020617'),
            envMap: envTex ?? undefined,
            envMapIntensity: 0.85,
          })
        }
        polygonsData={allPolygons}
        polygonAltitude={polygonAltitude}
        polygonCapMaterial={poly => {
          // US states: metallic tiles with green emissive lift
          if (isState(poly)) {
            const id = getStatePostal(poly);
            const isSelected = id && selectedStateId && id === selectedStateId;
            const isHovered = hoverPoly === poly;

            const emissiveBase = new THREE.Color('#020617');
            const emissiveHighlight = new THREE.Color('#22c55e');

            return new THREE.MeshStandardMaterial({
              metalness: 0.95,
              roughness: 0.22,
              color: new THREE.Color('#020617'),
              emissive: isHovered || isSelected ? emissiveHighlight : emissiveBase,
              emissiveIntensity: isHovered
                ? 0.55
                : isSelected
                ? 0.36
                : 0.18,
              map: stateMetalTex ?? undefined,
              envMap: envTex ?? undefined,
              envMapIntensity: isHovered || isSelected ? 1.3 : 0.9,
            });
          }

          // countries: subtle metallic band
          if (isCountry(poly)) {
            return new THREE.MeshStandardMaterial({
              metalness: 0.8,
              roughness: 0.38,
              color: new THREE.Color('#020617'),
              emissive: new THREE.Color('#020617'),
              emissiveIntensity: 0.2,
              map: countryMetalTex ?? undefined,
              envMap: envTex ?? undefined,
              envMapIntensity: 0.75,
            });
          }

          // everything else
          return new THREE.MeshStandardMaterial({
            metalness: 0.6,
            roughness: 0.4,
            color: new THREE.Color('#020617'),
            envMap: envTex ?? undefined,
            envMapIntensity: 0.4,
          });
        }}
        polygonSideColor={poly =>
          isState(poly)
            ? 'rgba(34,197,94,0.9)'
            : '#020617'
        }
        polygonStrokeColor={poly =>
          isState(poly)
            ? 'rgba(21,94,49,0.5)'
            : 'rgba(30,64,175,0.25)'
        }
        polygonLabel={poly =>
          isState(poly)
            ? `${poly.properties?.name ?? ''} (${poly.properties?.postal})`
            : poly.properties?.name ?? ''
        }
        polygonsTransitionDuration={260}
        polygonCapCurvatureResolution={2}
        onPolygonHover={poly => setHoverPoly(poly)}
        onPolygonClick={(poly: any, event: any) => {
          const name = poly.properties?.name ?? '';

          const clickCoords =
            event && typeof event.clientX === 'number'
              ? { x: event.clientX as number, y: event.clientY as number }
              : undefined;

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
        }}
      />
    </div>
  );
};

export default GlobeStates;
