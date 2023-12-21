'use client';

import { Float, Lightformer } from '@react-three/drei';
import { Color, Depth, LayerMaterial } from 'lamina';
import { memo, useRef } from 'react';
import * as THREE from 'three';

const LightformersGroup = memo(({ positions }: any) => {
  return (
    <>
      {positions.map((x, i) => (
        <Lightformer
          key={i}
          form="circle"
          intensity={2}
          rotation={[Math.PI / 2, 0, 0]}
          position={[x, 4, i * 4]}
          scale={[3, 1, 1]}
        />
      ))}
    </>
  );
});

LightformersGroup.displayName = 'LightformersGroup';

export function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef<THREE.Group>(null);

  return (
    <>
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          <LightformersGroup positions={positions} />
        </group>
      </group>

      {/* Sides */}
      <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      {/* Accent (red) */}
      <Float speed={1} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>

      <Lightformer
        form="ring"
        color="red"
        intensity={1}
        scale={10}
        position={[-15, 4, -18]}
        target={[0, 0, 0]}
      />
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="yellow" alpha={1.1} mode="normal" />

          <Depth
            colorA="brown"
            colorB="brown"
            alpha={0.6}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  );
}
