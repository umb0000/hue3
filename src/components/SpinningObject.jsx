import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { Suspense } from 'react';

function AllModels({ modelIndex }) {
  const meshRef = useRef();

  const materials = useLoader(MTLLoader, '/models/10778_Toilet_V2.mtl');
  const objToilet = useLoader(OBJLoader, '/models/10778_Toilet_V2.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  const fbxToilet = useLoader(FBXLoader, '/models/Toilet.FBX');

  useMemo(() => {
    fbxToilet.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#f5f5f5', roughness: 0.3, metalness: 0.1,
        });
      }
    });
  }, [fbxToilet]);

  const models = [
    { obj: objToilet, rotation: [-Math.PI / 2, 0, 0], scale: 0.12 },
    { obj: fbxToilet, rotation: [0.41, Math.PI / 2, 0], scale: 0.02 },
  ];

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.x = models[modelIndex].rotation[0] + Math.sin(t * 0.3) * 0.4;
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.3;
      meshRef.current.position.x = Math.sin(t * 0.15) * 3;
      meshRef.current.position.y = Math.cos(t * 0.1) * 2;
      meshRef.current.position.z = 0;
    }
  });

  const current = models[modelIndex];

  return (
    <group ref={meshRef} rotation={current.rotation} scale={current.scale}>
      <primitive object={current.obj} />
    </group>
  );
}

function Scene() {
  const [modelIndex, setModelIndex] = useState(() => Math.floor(Math.random() * 2));

  useEffect(() => {
    const interval = setInterval(() => {
      setModelIndex((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-3, 3, -3]} intensity={0.5} />
      <Suspense fallback={null}>
        <AllModels modelIndex={modelIndex} />
      </Suspense>
    </>
  );
}

export default function SpinningObject({ width = 200, height = 200 }) {
  return (
    <div style={{ width, height }}>
      <Canvas camera={{ position: [0, 0, 18], fov: 35 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
