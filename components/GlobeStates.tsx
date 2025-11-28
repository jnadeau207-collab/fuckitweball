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

  const [stainlessTex, setStainlessTex] = useState<THREE.Texture | null>(null);
  const [steelTex, setSteelTex] = useState<THREE.Texture | null>(null);
  const [blueTex, setBlueTex] = useState<THREE.Texture | null>(null);

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

    loader.load('/textures/stainless.jpg', tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      setStainlessTex(tex);
    });

    loader.load('/textures/steel.jpg', tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      setSteelTex(tex);
    });

    loader.load('/textures/blue-metal.jpg', tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      setBlueTex(tex);
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
      1000
    );
  }, [region, usPolygons]);

  // --- altitude reporting ----------------------------------------------------

  useEffect(() => {
    if (!globeRef.current || !onViewChange) return;

    const globe = globeRef.current;
    const handle = () => {
      const { altitude } = globe.pointOfView();
      onViewChange(altitude);
    };

    globe.controls().addEventListener('change', handle);
    return () => {
      globe.controls().removeEventListener('change', handle);
    };
  }, [onViewChange]);

  // --- combined polygon data -------------------------------------------------

  const allPolygons = useMemo(
    () => [...worldPolygons, ...usPolygons],
    [worldPolygons, usPolygons],
  );

  // --- explosion / altitude logic -------------------------------------------

  const BASE_ALT_STATE = 0.015;      // base extrusion for US states
  const BASE_ALT_COUNTRY = 0.008;    // base extrusion for countries
  const BASE_ALT_OTHER = 0.004;

  // toned down ~30% from the previous “max boom”
  const EXTRA_SELECTED = 0.010;
  const EXTRA_HOVER = 0.005;

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
      <div className="h-full w-full">
        <Globe
          ref={globeRef}
          backgroundColor="rgba(0,0,0,1)"
          animateIn
          hexPolygonResolution={3}
          hexPolygonMargin={0.4}
          globeMaterial={
            new THREE.MeshStandardMaterial({
              metalness: 0.85,
              roughness: 0.28,
              color: new THREE.Color('#020617'),
              envMap: stainlessTex ?? undefined,
              envMapIntensity: 0.9,
            })
          }
          polygonsData={allPolygons}
          polygonAltitude={polygonAltitude}
          polygonCapMaterial={poly => {
            // state caps: dark, glossy, not bright blue
            if (isState(poly)) {
              const id = getStatePostal(poly);
              const isSelected = id && selectedStateId && id === selectedStateId;
              const isHovered = hoverPoly === poly;

              const emissiveBase = new THREE.Color('#020617');
              const emissiveHighlight = new THREE.Color('#22c55e'); // olive-ish

              return new THREE.MeshStandardMaterial({
                metalness: 0.96,
                roughness: 0.26,
                color: new THREE.Color('#020617'),
                emissive:
                  isHovered || isSelected ? emissiveHighlight : emissiveBase,
                emissiveIntensity: isHovered
                  ? 0.4
                  : isSelected
                  ? 0.25
                  : 0.16,
                envMap: steelTex ?? undefined,
                envMapIntensity: isHovered || isSelected ? 1.2 : 0.9,
              });
            }

            // countries: subtle metallic band
            if (isCountry(poly)) {
              return new THREE.MeshStandardMaterial({
                metalness: 0.75,
                roughness: 0.35,
                color: new THREE.Color('#020617'),
                emissive: new THREE.Color('#020617'),
                emissiveIntensity: 0.18,
                envMap: blueTex ?? undefined,
                envMapIntensity: 0.7,
              });
            }

            return new THREE.MeshStandardMaterial({
              metalness: 0.6,
              roughness: 0.4,
              color: new THREE.Color('#020617'),
            });
          }}
          // sides: olive backlight – shows mainly in gaps between states
          polygonSideColor={poly =>
            isState(poly)
              ? 'rgba(34,197,94,0.85)' // olive/emerald glow in the seams
              : '#020617'
          }
          // border lines: very subtle, no neon blue outline
          polygonStrokeColor={poly =>
            isState(poly)
              ? 'rgba(21,94,49,0.45)'
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
          onPolygonClick={(poly, event) => {
            const name = poly.properties?.name ?? '';

            const clickCoords =
              event && typeof (event as any).clientX === 'number'
                ? {
                    x: (event as any).clientX as number,
                    y: (event as any).clientY as number,
                  }
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
    </div>
  );
};

export default GlobeStates;
