'use client';
// https://twitter.com/lusionltd/status/1701534187545636964
// https://lusion.co

import * as THREE from 'three';
import { useRef, useReducer, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  AccumulativeShadows,
  RandomizedLight,
  PerformanceMonitor,
  Float
} from '@react-three/drei';
import { CuboidCollider, BallCollider, Physics, RigidBody } from '@react-three/rapier';
import { EffectComposer, N8AO } from '@react-three/postprocessing';
import { easing } from 'maath';
import { Color, Depth, LayerMaterial } from 'lamina';

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00'];
const shuffle = (accent = 0) => [
  { color: '#ffffff', roughness: 0.1 },
  { color: '#ffffff', roughness: 0.75 },
  { color: '#ffffff', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: 'white', roughness: 0.75 },
  { color: 'white', roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true }
];

export const TheOne = () => (
  <div className="h-full">
    <div className="nav">
      <h1 className="label" />
      <div />
      <span className="caption" />
      <div />
      <a href="https://lusion.co/">
        <div className="button">VISIT LUSION</div>
      </a>
      <div className="button gray">///</div>
    </div>
    <Scene style={{ borderRadius: 20 }} />
  </div>
);

function Scene(props) {
  const [accent, click] = useReducer((state) => ++state % accents.length, 0);
  const connectors = useMemo(() => shuffle(accent), [accent]);

  const [degraded, degrade] = useState(false);
  return (
    // <Canvas
    //   onClick={click}
    //   shadows
    //   dpr={[1, 1.5]}
    //   gl={{ antialias: false }}
    //   camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
    //   {...props}
    // >
    //   <color attach="background" args={['#141622']} />
    //   <ambientLight intensity={0.4} />
    //   <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
    //   <Physics /*debug*/ gravity={[0, 0, 0]}>
    //     <Pointer />
    //     {connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */}
    //     <Connector position={[10, 10, 5]}>
    //       <Model>
    //         <MeshTransmissionMaterial
    //           clearcoat={1}
    //           thickness={0.1}
    //           anisotropicBlur={0.1}
    //           chromaticAberration={0.1}
    //           samples={8}
    //           resolution={512}
    //         />
    //       </Model>
    //     </Connector>
    //   </Physics>
    //   <EffectComposer disableNormalPass multisampling={8}>
    //     <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
    //   </EffectComposer>
    //   <Environment resolution={256}>
    //     <group rotation={[-Math.PI / 3, 0, 1]}>
    //       <Lightformer
    //         form="circle"
    //         intensity={4}
    //         rotation-x={Math.PI / 2}
    //         position={[0, 5, -9]}
    //         scale={2}
    //       />
    //       <Lightformer
    //         form="circle"
    //         intensity={2}
    //         rotation-y={Math.PI / 2}
    //         position={[-5, 1, -1]}
    //         scale={2}
    //       />
    //       <Lightformer
    //         form="circle"
    //         intensity={2}
    //         rotation-y={Math.PI / 2}
    //         position={[-5, -1, -1]}
    //         scale={2}
    //       />
    //       <Lightformer
    //         form="circle"
    //         intensity={2}
    //         rotation-y={-Math.PI / 2}
    //         position={[10, 1, 0]}
    //         scale={8}
    //       />
    //     </group>
    //   </Environment>
    // </Canvas>

    <Canvas shadows camera={{ position: [105, 0, 15], fov: 13 }}>
      <spotLight
        position={[1, 12, 0]}
        angle={0.3}
        penumbra={10}
        castShadow
        intensity={2}
        shadow-bias={-0.0001}
      />
      <ambientLight intensity={0.5} />
      <Physics /*debug*/ gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */}
        <Connector position={[10, 10, 5]}>
          <Model>
            <MeshTransmissionMaterial
              clearcoat={1}
              thickness={0.1}
              anisotropicBlur={0.1}
              chromaticAberration={0.1}
              samples={8}
              resolution={512}
            />
          </Model>
        </Connector>
      </Physics>
      <AccumulativeShadows position={[0, -1.16, 0]} frames={100} alphaTest={0} scale={100}>
        <RandomizedLight amount={8} radius={10} ambient={0.5} position={[1, 5, -1]} />
      </AccumulativeShadows>
      {/** PerfMon will detect performance issues */}
      <PerformanceMonitor onDecline={() => degrade(true)} />
      {/* Renders contents "live" into a HDRI environment (scene.environment). */}
      <Environment frames={degraded ? 1 : Infinity} resolution={256} background blur={1}>
        <Lightformers />
      </Environment>
      <CameraRig />
    </Canvas>
  );
}

function CameraRig({ v = new THREE.Vector3() }) {
  return useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.lerp(v.set(Math.sin(t / 15), 0, 12 + Math.cos(t / 5) / 2), 0.05);
    state.camera.lookAt(0, 0, 0);
  });
}

function Connector({
  position,
  children,
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  accent,
  ...props
}) {
  const api = useRef();
  const pos = useMemo(() => position || [r(10), r(10), r(10)], []);
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2));
  });
  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ? children : <Model {...props} />}
      {accent && <pointLight intensity={4} distance={2.5} color={props.color} />}
    </RigidBody>
  );
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
    );
  });
  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[0.2]} />
    </RigidBody>
  );
}

function Model({ children, color = 'white', roughness = 0, ...props }) {
  const ref = useRef();
  const hi = useGLTF('/bananna.glb');

  console.log(hi);

  const { nodes, materials } = useGLTF('/bananna.glb');
  useFrame((state, delta) => {
    easing.dampC(ref.current.material.color, color, 0.2, delta);
  });

  return (
    <mesh ref={ref} castShadow receiveShadow scale={0.01} geometry={nodes.Object_143.geometry}>
      <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.Material.map} />
      {children}
    </mesh>
  );
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      if ((group.current.position.z += delta * 10) > 20) {
        group.current.position.z = -60;
      }
    }
  });
  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
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
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>
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
