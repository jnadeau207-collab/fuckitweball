// components/GemMapScene.tsx
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

type FloatingOrbProps = {
  position: [number, number, number];
  color?: string;
  size?: number;
};

function FloatingOrb({ position, color = '#4ade80', size = 0.7 }: FloatingOrbProps) {
  const ref = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle bobbing + slow spin
    ref.current.position.y = position[1] + Math.sin(t * 1.2 + position[0]) * 0.4;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 48, 48]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.15}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

function GemMapSceneInner() {
  return (
    <>
      {/* pale background so the HTML card can stay light */}
      <color attach="background" args={['#e7f5ff']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[8, 12, 15]} intensity={1.3} />
      <directionalLight position={[-10, -8, 10]} intensity={0.5} color="#38bdf8" />

      {/* Tilted “map floor” */}
      <mesh rotation={[-Math.PI / 2.3, 0, Math.PI / 12]} position={[0, -2.2, 0]}>
        <planeGeometry args={[28, 18]} />
        <meshStandardMaterial color="#f9fafb" metalness={0.4} roughness={0.25} />
      </mesh>

      {/* A few floating orbs suggesting hotspots / activity */}
      <FloatingOrb position={[-7, 0.4, 3]} color="#22c55e" size={0.8} />
      <FloatingOrb position={[0, 1.4, 5]} color="#06b6d4" size={0.9} />
      <FloatingOrb position={[7, 0.2, 2]} color="#a855f7" size={0.7} />
    </>
  );
}

export default function GemMapScene() {
  return (
    <Canvas camera={{ position: [0, 6, 18], fov: 40 }}>
      <GemMapSceneInner />
    </Canvas>
  );
}
