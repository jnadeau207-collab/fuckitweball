
// components/GlobeStates.tsx
import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as topojson from 'topojson-client';
import * as THREE from 'three';

type RegionId = 'unitedStates' | 'canada' | 'mexico' | 'netherlands';

interface GlobeStatesProps {
  region: RegionId;
  onStateSelect?: (id: string, name: string) => void;
}

// Where to aim the camera for each region (future-proofing)
const regionFocus: Record<
  RegionId,
  { lat: number; lng: number; altitude: number }
> = {
  unitedStates: { lat: 39, lng: -98, altitude: 2.3 },
  canada: { lat: 62, lng: -96, altitude: 2.6 },
  mexico: { lat: 23, lng: -102, altitude: 2.7 },
  netherlands: { lat: 52.3, lng: 5.3, altitude: 4.0 },
};

// 🔥 IMPORTANT: update these if you use different filenames
const earthTextureUrl = '/uploads/earth-metal-atlas.png';
const earthBumpUrl = '/uploads/earth-metal-atlas-bump.png'; // optional
const metalTextureUrl = '/uploads/metal-cubes-texture.png';

// Official US states topojson (tiny, cached, very fast)
const usStatesUrl =
  'https://unpkg.com/us-atlas@3/states-10m.json';

const GlobeStates: React.FC<GlobeStatesProps> = ({ region, onStateSelect }) => {
  const globeRef = useRef<any>(null);
  const [usPolygons, setUsPolygons] = useState<any[]>([]);
  const [hoverPoly, setHoverPoly] = useState<any | null>(null);
  const [materials, setMaterials] = useState<{
    cap: THREE.MeshStandardMaterial;
    side: THREE.MeshStandardMaterial;
  } | null>(null);

  // 1. Load US state boundaries from official topojson
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(usStatesUrl);
        const topo = await res.json();
        const geo = topojson.feature(topo, topo.objects.states) as any;
        setUsPolygons(geo.features);
      } catch (err) {
        console.error('Failed to load US states topojson', err);
      }
    })();
  }, []);

  // 2. Load your metal cubes texture & turn it into shiny materials
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      metalTextureUrl,
      (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.anisotropy = 8;
        tex.repeat.set(1.7, 1.7);

        const cap = new THREE.MeshStandardMaterial({
          map: tex,
          metalness: 1,
          roughness: 0.18,
        });

        const side = new THREE.MeshStandardMaterial({
          map: tex,
          metalness: 0.9,
          roughness: 0.25,
        });

        setMaterials({ cap, side });
      },
      undefined,
      (err) => {
        console.error('Failed to load metal texture', err);
      }
    );
  }, []);

  // 3. Configure controls & camera whenever region/data changes
  useEffect(() => {
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
    globeRef.current.pointOfView(
      {
        lat: focus.lat,
        lng: focus.lng,
        altitude: focus.altitude,
      },
      1000 // ms animation
    );
  }, [region, usPolygons]);

  const polygonsData = region === 'unitedStates' ? usPolygons : [];

  return (
    <Globe
      ref={globeRef}
      // we let the parent container handle layout; these just give a base size
      width={960}
      height={540}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl={earthTextureUrl}
      bumpImageUrl={earthBumpUrl}
      showAtmosphere={true}
      atmosphereColor="#8fd5ff"
      atmosphereAltitude={0.32}
      onGlobeReady={() => {
        // Custom lights to make it feel like chrome + blue rim light
        if (!globeRef.current) return;
        const scene: THREE.Scene = globeRef.current.scene();

        const existing = scene.getObjectByName('cartfaxLights');
        if (existing) scene.remove(existing);

        const group = new THREE.Group();
        group.name = 'cartfaxLights';

        const key = new THREE.DirectionalLight('#ffffff', 1.25);
        key.position.set(2.5, 1.8, 3);
        group.add(key);

        const rim = new THREE.DirectionalLight('#5ecbff', 0.9);
        rim.position.set(-2.2, -1.7, -2.4);
        group.add(rim);

        const fill = new THREE.AmbientLight('#ffffff', 0.65);
        group.add(fill);

        scene.add(group);
      }}
      // POLYGON LAYER – US states extruding from globe
      polygonsData={polygonsData}
      polygonGeoJsonGeometry={(d: any) => d.geometry}
      polygonLabel={(d: any) => d.properties?.name || ''}
      polygonAltitude={(d: any) =>
        hoverPoly && hoverPoly === d ? 0.17 : 0.10
      }
      polygonCapMaterial={materials?.cap}
      polygonSideMaterial={materials?.side}
      polygonStrokeColor={() => '#43c5ff'}
      polygonCapCurvatureResolution={2}
      polygonsTransitionDuration={260}
      onPolygonHover={(poly: any) => setHoverPoly(poly)}
      onPolygonClick={(poly: any) => {
        if (onStateSelect) {
          const id = poly.id ?? poly.properties?.postal;
          const name = poly.properties?.name ?? '';
          onStateSelect(id, name);
        }
      }}
    />
  );
};

export default GlobeStates;
