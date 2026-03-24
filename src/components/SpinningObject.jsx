import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { Suspense } from 'react';

function ToiletModel() {
  const meshRef = useRef();
  const fbx = useLoader(FBXLoader, '/models/Toilet.FBX');

  useMemo(() => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#f5f5f5',
          roughness: 0.3,
          metalness: 0.1,
        });
      }
    });
  }, [fbx]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef} rotation={[0.41, 0, 0]} scale={0.015}>
      <primitive object={fbx} />
    </group>
  );
}

export default function SpinningObject({ width = 200, height = 200 }) {
  return (
    <div style={{ width, height }}>
      <Canvas camera={{ position: [0, 3, 13], fov: 38 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-3, 3, -3]} intensity={0.5} />
        <Suspense fallback={null}>
          <ToiletModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
