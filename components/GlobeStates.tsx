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

  // --- textures for materials ---

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

  // --- focus camera on region ---

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

  // --- altitude reporting ---

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

  // --- helpers ---

  const allPolygons = useMemo(
    () => [...worldPolygons, ...usPolygons],
    [worldPolygons, usPolygons],
  );

  const isState = (poly: any) =>
    poly.properties && typeof poly.properties.postal !== 'undefined';

  const isCountry = (poly: any) =>
    poly.properties && typeof poly.id !== 'undefined' && !isState(poly);

  const getCountryRegion = (poly: any): RegionId | null => {
    const idNum =
      typeof poly.id === 'number'
        ? poly.id
        : Number.parseInt(String(poly.id), 10);

    if (Number.isNaN(idNum)) return null;
    return COUNTRY_ID_TO_REGION[idNum] ?? null;
  };

  // --- render ---

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
              metalness: 0.8,
              roughness: 0.25,
              color: new THREE.Color('#020617'),
              envMap: stainlessTex ?? undefined,
              envMapIntensity: 0.9,
            })
          }
          polygonsData={allPolygons}
          polygonAltitude={poly =>
            isState(poly) ? 0.02 : isCountry(poly) ? 0.01 : 0.005
          }
          polygonCapMaterial={poly => {
            if (isState(poly)) {
              return new THREE.MeshStandardMaterial({
                metalness: 0.95,
                roughness: 0.3,
                color:
                  hoverPoly && hoverPoly === poly
                    ? new THREE.Color('#38bdf8')
                    : new THREE.Color('#020617'),
                emissive: new THREE.Color(
                  hoverPoly && hoverPoly === poly ? '#38bdf8' : '#020617',
                ),
                emissiveIntensity: hoverPoly && hoverPoly === poly ? 0.8 : 0.3,
                envMap: steelTex ?? undefined,
                envMapIntensity: 0.9,
              });
            }

            if (isCountry(poly)) {
              return new THREE.MeshStandardMaterial({
                metalness: 0.75,
                roughness: 0.35,
                color: new THREE.Color('#020617'),
                emissive: new THREE.Color('#020617'),
                emissiveIntensity: 0.2,
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
          polygonSideColor={() => '#020617'}
          polygonStrokeColor={poly =>
            isState(poly) ? '#38bdf8' : 'rgba(148,163,184,0.4)'
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
              event && typeof event.clientX === 'number'
                ? { x: event.clientX, y: event.clientY }
                : undefined;

            if (isState(poly)) {
              if (!onStateSelect) return;
              const id = poly.properties?.postal ?? poly.id ?? '';
              onStateSelect(id, name, clickCoords);
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
