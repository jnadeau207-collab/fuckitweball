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

// Camera focus targets per region
const regionFocus: Record<RegionId, { lat: number; lng: number; altitude: number }> = {
  unitedStates: { lat: 39, lng: -98, altitude: 1.9 },
  canada: { lat: 62, lng: -96, altitude: 2.1 },
  mexico: { lat: 23, lng: -102, altitude: 2.1 },
  netherlands: { lat: 52.3, lng: 5.3, altitude: 3.0 },
};

const usStatesUrl = 'https://unpkg.com/us-atlas@3/states-10m.json';
const worldCountriesUrl =
  'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

// Mapping from world-atlas numeric country IDs to our RegionId
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
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);

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

  // US states
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

  // World countries (for US, CA, MX, NL outlines)
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

  // --- base earth texture (optional) ----------------------------------------

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/textures/earth-night-2016.jpg',
      tex => {
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        setEarthTexture(tex);
      },
      undefined,
      () => {
        console.warn(
          'Could not load /textures/earth-night-2016.jpg; globe will use a flat color instead.'
        );
      }
    );
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
  }, [region]);

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

  const globeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        metalness: 0.35,
        roughness: 0.9,
        color: new THREE.Color('#020617'),
        map: earthTexture ?? undefined,
      }),
    [earthTexture],
  );

  // --- render ----------------------------------------------------------------

  return (
    <div className="h-full w-full">
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,1)"
        animateIn
        showAtmosphere={false}
        globeMaterial={globeMaterial}
        hexPolygonResolution={3}
        hexPolygonMargin={0.4}
        polygonsData={allPolygons}
        polygonAltitude={polygonAltitude}
        polygonCapMaterial={poly => {
          // state caps
          if (isState(poly)) {
            const id = getStatePostal(poly);
            const isSelected = id && selectedStateId && id === selectedStateId;
            const isHovered = hoverPoly === poly;

            const emissiveBase = new THREE.Color('#020617');
            const emissiveHighlight = new THREE.Color('#22c55e');

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
            });
          }

          // country caps
          if (isCountry(poly)) {
            const reg = getCountryRegion(poly);
            const isActiveCountry = reg && reg === region;

            return new THREE.MeshStandardMaterial({
              metalness: 0.7,
              roughness: 0.5,
              color: new THREE.Color(isActiveCountry ? '#043b27' : '#020617'),
              emissive: new THREE.Color(
                isActiveCountry ? '#16a34a' : '#020617',
              ),
              emissiveIntensity: isActiveCountry ? 0.24 : 0.14,
            });
          }

          // fallback
          return new THREE.MeshStandardMaterial({
            metalness: 0.6,
            roughness: 0.4,
            color: new THREE.Color('#020617'),
          });
        }}
        polygonSideColor={poly =>
          isState(poly)
            ? 'rgba(34,197,94,0.85)'
            : 'rgba(15,23,42,0.9)'
        }
        polygonStrokeColor={poly =>
          isState(poly)
            ? 'rgba(21,94,49,0.7)'
            : 'rgba(30,64,175,0.25)'
        }
        polygonLabel={poly =>
          isState(poly)
            ? `${poly.properties?.name ?? ''} (${poly.properties?.postal})`
            : poly.properties?.name ?? ''
        }
        polygonsTransitionDuration={260}
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
  );
};

export default GlobeStates;
