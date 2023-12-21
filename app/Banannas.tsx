/* eslint-disable unicorn/filename-case */
'use client';

import { Environment, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import * as THREE from 'three';
import { Lightformers } from './Bg';
import { Whale } from './Whale';

export function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05);
  });
}

export const Banannas2 = () => {
  const [degraded, degrade] = useState(false);

  return (
    <Canvas resize={{ scroll: false }} dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 42 }}>
      {/* Consider optimizing or reducing lights */}
      {/* <spotLight
        position={[10, 15, 0]}
        angle={1.3}
        penumbra={1}
        castShadow
        intensity={2}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.5} /> */}

      <PerformanceMonitor onDecline={() => degrade(true)} />

      {/* Optimize Environment */}

      <Suspense fallback={null}>
        <mesh scale={100}>
          <Environment
            frames={degraded ? 1 : Infinity}
            resolution={degraded ? 128 : 256} // Lower resolution under degraded conditions
            background
            blur={degraded ? 0.5 : 1} // Reduce blur under degraded conditions
          >
            <Lightformers />
          </Environment>
        </mesh>
        {/* Consider reducing the number of Whales if performance is an issue */}
        {Array.from({ length: 5 }, (_, i) => (
          <Whale key={i} />
        ))}
        {/* Rig component is optimized for smooth camera movement */}
        <Rig />
      </Suspense>
    </Canvas>
  );
};
