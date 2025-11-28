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

export type SelectionLevel = 'country' | 'subregion';

export interface GlobeSelection {
  region: RegionId;
  level: SelectionLevel;
  id: string;
  name: string;
}

interface GlobeStatesProps {
  region: RegionId;
  onRegionChange?: (region: RegionId) => void;
  onSelectionChange?: (selection: GlobeSelection | null) => void;
  onAltitudeChange?: (altitude: number) => void;
}

// === Configuration ==========================================================

const GLOBE_TEXTURE_URL = '/textures/earth-nasa-base.jpg';
// ^^^ Rename your NASA texture to this, or change this constant to match
// whatever filename you used.

const US_STATES_URL = 'https://unpkg.com/us-atlas@3/states-10m.json';
const WORLD_COUNTRIES_URL =
  'https://unpkg.com/world-atlas@2/countries-110m.json';

// World-atlas numeric IDs → our RegionId
const COUNTRY_ID_TO_REGION: Record<number, RegionId> = {
  840: 'unitedStates', // USA
  124: 'canada',
  484: 'mexico',
  528: 'netherlands',
};

const REGION_FOCUS: Record<RegionId, { lat: number; lng: number; altitude: number }> = {
  unitedStates: { lat: 39, lng: -98, altitude: 1.55 },
  canada: { lat: 60, lng: -95, altitude: 1.7 },
  mexico: { lat: 23, lng: -102, altitude: 1.7 },
  netherlands: { lat: 52.3, lng: 5.3, altitude: 2.3 },
};

const BASE_ALT_COUNTRY = 0.006;
const BASE_ALT_STATE = 0.02;
const EXTRA_SELECTED = 0.01;
const EXTRA_HOVER = 0.004;

// === Helpers ===============================================================

const isUsState = (poly: any) =>
  poly?.properties?.layer === 'us-state';

const getStatePostal = (poly: any): string | null => {
  const postal = poly?.properties?.postal ?? poly?.id;
  if (!postal) return null;
  return String(postal).toUpperCase();
};

const getCountryRegionFromPoly = (poly: any): RegionId | null => {
  const idRaw = poly?.id;
  if (idRaw == null) return null;
  const idNum = typeof idRaw === 'number'
    ? idRaw
    : Number.parseInt(String(idRaw), 10);
  if (Number.isNaN(idNum)) return null;
  return COUNTRY_ID_TO_REGION[idNum] ?? null;
};

// === Component =============================================================

const GlobeStates: React.FC<GlobeStatesProps> = ({
  region,
  onRegionChange,
  onSelectionChange,
  onAltitudeChange,
}) => {
  const globeRef = useRef<any>(null);

  const [worldPolygons, setWorldPolygons] = useState<any[]>([]);
  const [usStatePolygons, setUsStatePolygons] = useState<any[]>([]);

  const [hoverPoly, setHoverPoly] = useState<any | null>(null);
  const [selected, setSelected] = useState<GlobeSelection | null>(null);

  // --- Load world countries -------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(WORLD_COUNTRIES_URL);
        const topo = await res.json();
        const geo = topojson.feature(topo, topo.objects.countries) as any;
        const features = geo.features.map((f: any) => ({
          ...f,
          properties: {
            ...f.properties,
            layer: 'country',
          },
        }));
        setWorldPolygons(features);
      } catch (err) {
        console.error('Error loading world countries topojson', err);
      }
    })();
  }, []);

  // --- Load US states -------------------------------------------------------
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(US_STATES_URL);
        const topo = await res.json();
        const geo = topojson.feature(topo, topo.objects.states) as any;
        const states = geo.features.map((f: any) => ({
          ...f,
          properties: {
            ...f.properties,
            layer: 'us-state',
            postal: f.properties?.postal || f.id,
          },
        }));
        setUsStatePolygons(states);
      } catch (err) {
        console.error('Error loading US states topojson', err);
      }
    })();
  }, []);

  // --- Camera focus when region changes ------------------------------------
  useEffect(() => {
    if (!globeRef.current) return;
    const focus = REGION_FOCUS[region];

    globeRef.current.pointOfView(
      {
        lat: focus.lat,
        lng: focus.lng,
        altitude: focus.altitude,
      },
      1000
    );
  }, [region, worldPolygons.length, usStatePolygons.length]);

  // --- Report zoom / altitude back up --------------------------------------
  useEffect(() => {
    if (!globeRef.current || !onAltitudeChange) return;

    const globe = globeRef.current;
    const controls = globe.controls();

    const handleChange = () => {
      const { altitude } = globe.pointOfView() || {};
      if (typeof altitude === 'number') {
        onAltitudeChange(altitude);
      }
    };

    controls.addEventListener('change', handleChange);
    return () => {
      controls.removeEventListener('change', handleChange);
    };
  }, [onAltitudeChange]);

  // --- Combined polygon set -------------------------------------------------

  const polygonsData = useMemo(() => {
    if (!worldPolygons.length) return [];

    // Always render all countries so the whole Earth has outlines.
    // Only render US states when we’re in the US view.
    if (region === 'unitedStates') {
      return [...worldPolygons, ...usStatePolygons];
    }
    return worldPolygons;
  }, [worldPolygons, usStatePolygons, region]);

  // --- Altitude / explosion logic ------------------------------------------

  const polygonAltitude = (poly: any) => {
    const usState = isUsState(poly);
    const polyRegion = getCountryRegionFromPoly(poly);

    // Hide US states when not in US mode
    if (usState && region !== 'unitedStates') {
      return 0;
    }

    // US states
    if (usState) {
      const id = getStatePostal(poly) ?? '';
      const isSelected =
        selected?.region === 'unitedStates' &&
        selected.level === 'subregion' &&
        selected.id === id;
      const isHovered = hoverPoly === poly;

      let alt = BASE_ALT_STATE;
      if (isSelected) alt += EXTRA_SELECTED;
      if (isHovered) alt += EXTRA_HOVER;
      return alt;
    }

    // Countries
    let alt = BASE_ALT_COUNTRY;

    if (polyRegion) {
      const isActiveRegion = polyRegion === region;
      const isSelectedCountry =
        selected?.level === 'country' &&
        selected.region === polyRegion;
      const isHovered = hoverPoly === poly;

      if (isActiveRegion) {
        alt += 0.012;
      }
      if (isSelectedCountry) {
        alt += 0.006;
      }
      if (isHovered) {
        alt += 0.003;
      }

      // When we’re in US mode, keep the US country itself almost flat
      // so the state tiles visually dominate.
      if (polyRegion === 'unitedStates' && region === 'unitedStates') {
        alt = 0.001;
      }
    }

    return alt;
  };

  // --- Materials ------------------------------------------------------------

  const polygonCapMaterial = (poly: any) => {
    const usState = isUsState(poly);
    const polyRegion = getCountryRegionFromPoly(poly);
    const isHovered = hoverPoly === poly;

    // If this is a US state and we’re not in US view, make it invisible
    if (usState && region !== 'unitedStates') {
      return new THREE.MeshStandardMaterial({
        visible: false,
      });
    }

    if (usState) {
      const id = getStatePostal(poly) ?? '';
      const isSelected =
        selected?.region === 'unitedStates' &&
        selected.level === 'subregion' &&
        selected.id === id;

      const baseColor = new THREE.Color('#020617');
      const highlight = new THREE.Color('#22c55e');

      const active = isSelected || isHovered;
      const color = active ? highlight : baseColor;

      return new THREE.MeshStandardMaterial({
        color,
        metalness: 0.75,
        roughness: 0.3,
        emissive: color,
        emissiveIntensity: isSelected ? 0.7 : isHovered ? 0.45 : 0.25,
      });
    }

    // Countries
    const isActiveRegion = polyRegion && polyRegion === region;
    const isSelectedCountry =
      selected?.level === 'country' &&
      polyRegion &&
      selected.region === polyRegion;

    const baseColor = new THREE.Color('#020617');
    const activeColor = new THREE.Color('#0f766e');
    const emissiveBase = new THREE.Color('#020617');
    const emissiveActive = new THREE.Color('#22c55e');

    const color = isActiveRegion ? activeColor : baseColor;
    const emissive = isActiveRegion ? emissiveActive : emissiveBase;

    const emissiveIntensity = isActiveRegion
      ? isSelectedCountry
        ? 0.7
        : 0.45
      : 0.18;

    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.45,
      roughness: 0.7,
      emissive,
      emissiveIntensity,
      transparent: true,
      opacity: isActiveRegion ? 0.96 : 0.8,
    });
  };

  const polygonSideColor = (poly: any) => {
    if (isUsState(poly)) {
      return 'rgba(34,197,94,0.9)'; // bright emerald seams for state tiles
    }
    const polyRegion = getCountryRegionFromPoly(poly);
    if (polyRegion && polyRegion === region) {
      return 'rgba(45,212,191,0.8)'; // teal rim for active country
    }
    return 'rgba(15,23,42,0.85)'; // dark slate for everything else
  };

  const polygonStrokeColor = (poly: any) => {
    if (isUsState(poly)) {
      return 'rgba(22,163,74,0.7)';
    }
    const polyRegion = getCountryRegionFromPoly(poly);
    if (polyRegion && polyRegion === region) {
      return 'rgba(34,211,238,0.7)';
    }
    return 'rgba(30,64,175,0.25)';
  };

  const polygonLabel = (poly: any) => {
    if (isUsState(poly)) {
      const postal = poly.properties?.postal ?? '';
      const name = poly.properties?.name ?? postal ?? '';
      return `${name} (${postal})`;
    }
    return poly.properties?.name ?? '';
  };

  // --- Click / hover handlers ----------------------------------------------

  const handlePolygonClick = (poly: any) => {
    if (!poly) return;

    const usState = isUsState(poly);
    const polyRegion = getCountryRegionFromPoly(poly);

    // Clicking a US state while in US view → select that state
    if (usState && region === 'unitedStates') {
      const id = getStatePostal(poly) ?? '';
      const name = poly.properties?.name ?? id;

      const nextSel: GlobeSelection = {
        region: 'unitedStates',
        level: 'subregion',
        id,
        name,
      };

      setSelected(nextSel);
      onSelectionChange?.(nextSel);
      return;
    }

    // Clicking a country → switch region (if it’s one of our four) and/or
    // select that jurisdiction tile.
    if (polyRegion) {
      const name = poly.properties?.name ?? polyRegion;

      if (polyRegion !== region) {
        onRegionChange?.(polyRegion);
      }

      const nextSel: GlobeSelection = {
        region: polyRegion,
        level: 'country',
        id: polyRegion,
        name,
      };

      setSelected(nextSel);
      onSelectionChange?.(nextSel);
    }
  };

  // === Render ===============================================================

  return (
    <div className="h-full w-full">
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,1)"
        showAtmosphere
        atmosphereColor="rgba(56,189,248,0.85)"
        atmosphereAltitude={0.18}
        globeImageUrl={GLOBE_TEXTURE_URL}
        polygonsData={polygonsData}
        polygonAltitude={polygonAltitude}
        polygonCapMaterial={polygonCapMaterial}
        polygonSideColor={polygonSideColor}
        polygonStrokeColor={polygonStrokeColor}
        polygonLabel={polygonLabel}
        polygonsTransitionDuration={280}
        onPolygonHover={setHoverPoly}
        onPolygonClick={handlePolygonClick}
      />
    </div>
  );
};

export default GlobeStates;
