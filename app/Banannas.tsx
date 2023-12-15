'use client';

import * as THREE from 'three';
import { useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, PerformanceMonitor, Environment } from '@react-three/drei';
import { LayerMaterial as OldLayerMaterial, Base, Depth, Fresnel } from 'lamina-old/vanilla';
import { Lightformers } from './Bg';

const colorA = new THREE.Color('#ff9900').convertSRGBToLinear();
const colorB = new THREE.Color('#f7e439').convertSRGBToLinear();
const fresnel = new THREE.Color('#E7B473').convertSRGBToLinear();
const material = new OldLayerMaterial({
  layers: [
    new Base({ color: colorA }),
    new Depth({
      colorA: colorA,
      colorB: colorB,
      alpha: 0.5,
      mode: 'normal',
      near: 0,
      far: 2,
      // @ts-ignore
      origin: [1, 1, 1]
    }),
    new Depth({
      colorA: 'yellow',
      colorB: 'orange',
      alpha: 0.5,
      mode: 'add',
      near: 3,
      far: 2,
      // @ts-ignore
      origin: [1, 1, 1]
    }),
    new Fresnel({ mode: 'add', color: fresnel, intensity: 0.3, power: 2.5, bias: 0.0 })
    // new Noise({
    //   mapping: 'local',
    //   type: 'simplex',
    //   scale: 1000,
    //   colorA: '#ffaf40',
    //   colorB: 'black',
    //   mode: 'overlay'
    // })
  ]
});

function Noodle() {
  const { viewport, camera } = useThree();
  const { nodes } = useGLTF('/bananaTest.glb');
  console.log(nodes);
  // const [geometry] = useState(() => nodes[`Object_143`].geometry);
  // @ts-ignore
  const [geometry] = useState(() => nodes[`banana_low_Banana_0`].geometry);

  const [speed] = useState(() => 0.1 + Math.random() / 10);
  const position = useMemo(() => {
    const z = Math.random() * -30;
    const bounds = viewport.getCurrentViewport(camera, [0, 0, z]);
    return [
      THREE.MathUtils.randFloatSpread(bounds.width),
      THREE.MathUtils.randFloatSpread(bounds.height * 0.75),
      z
    ];
  }, []);
  return (
    <Float
      position={position as any}
      speed={speed}
      rotationIntensity={10}
      floatIntensity={40}
      dispose={null}
    >
      <mesh scale={1.5} geometry={geometry} material={material}></mesh>
    </Float>
  );
}

export default function Noodles() {
  return (
    <>
      {Array.from({ length: 25 }, (_, i) => (
        <Noodle key={i} />
      ))}
    </>
  );
}

useGLTF.preload('/bananna2.glb');

export function Rig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05);
  });
}

export const Banannas2 = () => {
  const [degraded, degrade] = useState(false);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 42 }}>
      <PerformanceMonitor onDecline={() => degrade(true)} />
      <mesh scale={100}>
        <Environment frames={degraded ? 1 : Infinity} resolution={256} background blur={1}>
          <Lightformers />
        </Environment>
      </mesh>
      <Suspense fallback={null}>
        <Noodles />
        {/* <Caption>{`THE\nSEVENTY-TWO\nNAMES\nOF GOD.`}</Caption> */}
        <Rig />
      </Suspense>
    </Canvas>
  );
};
