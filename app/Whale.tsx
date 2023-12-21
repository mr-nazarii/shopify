import { Float, useAnimations, useGLTF } from '@react-three/drei';
import { useGraph, useThree } from '@react-three/fiber';
import { Color, Depth, LayerMaterial } from 'lamina';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF, SkeletonUtils } from 'three-stdlib';

// Type Definitions
type GLTFResult = GLTF & {
  nodes: {
    polySurface2_lambert1_0: THREE.Mesh;
    polySurface3_lambert1_0: THREE.Mesh;
    Object_37: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
    lambert1: THREE.MeshStandardMaterial;
  };
};

type ActionName = 'Swimming';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export function Whale(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { materials, animations, scene } = useGLTF('/scene-transformed.glb') as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const speedRef = useRef(0.1 + Math.random() / 10);

  const [name, setName] = useState('Swimming');

  useEffect(() => {
    const currentAction = actions[name];
    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
      return () => currentAction.fadeOut(0.5);
    }
  }, [name, actions]);

  const { viewport, camera } = useThree();

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
      speed={speedRef.current}
      rotationIntensity={10}
      floatIntensity={40}
      dispose={null}
      position={position}
    >
      <group ref={group} {...props} dispose={null}>
        <group name="Sketchfab_Scene">
          <group name="RootNode" scale={2}>
            <group name="locator3" rotation={[0.035, 0, 0]}>
              <group name="Object_7">
                <primitive object={nodes._rootJoint}>
                  <skinnedMesh
                    name="Object_37"
                    geometry={nodes.Object_37.geometry}
                    skeleton={nodes.Object_37.skeleton}
                  >
                    <LayerMaterial color="#ffffff" lighting="physical" transmission={2}>
                      <Color alpha={1.3} visible color={'#ffec43'} />
                      <Depth
                        colorA="#ffec43"
                        colorB="#ffd343"
                        alpha={0.5}
                        mode="normal"
                        near={0}
                        far={2}
                        origin={[1, 1, 1]}
                      />
                    </LayerMaterial>
                  </skinnedMesh>
                </primitive>
              </group>
            </group>
          </group>
        </group>
      </group>
    </Float>
  );
}

useGLTF.preload('/scene-transformed.glb');
