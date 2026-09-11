import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const DEFAULT_FACE_COLORS = {
  R: '#ff3366', // Red (Right)
  L: '#ff9900', // Orange (Left)
  U: '#ffffff', // White (Up)
  D: '#ffcc00', // Yellow (Down)
  F: '#00cc66', // Green (Front)
  B: '#3399ff', // Blue (Back)
  INNER: '#111827'
};

function LittleCube({ position }) {
  const materials = [
    position[0] === 1 ? DEFAULT_FACE_COLORS.R : DEFAULT_FACE_COLORS.INNER,
    position[0] === -1 ? DEFAULT_FACE_COLORS.L : DEFAULT_FACE_COLORS.INNER,
    position[1] === 1 ? DEFAULT_FACE_COLORS.U : DEFAULT_FACE_COLORS.INNER,
    position[1] === -1 ? DEFAULT_FACE_COLORS.D : DEFAULT_FACE_COLORS.INNER,
    position[2] === 1 ? DEFAULT_FACE_COLORS.F : DEFAULT_FACE_COLORS.INNER,
    position[2] === -1 ? DEFAULT_FACE_COLORS.B : DEFAULT_FACE_COLORS.INNER,
  ];

  return (
    <RoundedBox args={[0.92, 0.92, 0.92]} radius={0.06} smoothness={4} position={position}>
      {materials.map((color, index) => (
        <meshStandardMaterial key={index} attach={`material-${index}`} color={color} roughness={0.2} metalness={0.1} />
      ))}
    </RoundedBox>
  );
}

function CubeGroup({ isSolving }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isSolving) {
        groupRef.current.rotation.y += delta * 2.5;
        groupRef.current.rotation.x += delta * 1.2;
      } else {
        groupRef.current.rotation.y += delta * 0.2;
      }
    }
  });

  const positions = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        positions.push([x, y, z]);
      }
    }
  }

  return (
    <group ref={groupRef}>
      {positions.map((pos, idx) => (
        <LittleCube key={idx} position={pos} />
      ))}
    </group>
  );
}

export default function RubikCube3D({ isSolving }) {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden border border-cyan-500/20 bg-gradient-to-b from-slate-950/90 via-slate-900/60 to-slate-950/90 backdrop-blur-md shadow-2xl">
      <Canvas camera={{ position: [5, 4, 6], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={1.8} />
        <directionalLight position={[-10, -10, -10]} intensity={0.6} />
        <CubeGroup isSolving={isSolving} />
        <OrbitControls enablePan={false} minDistance={4} maxDistance={12} />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10 text-xs text-slate-300">
        <span>🖱️ اسحب بالموس للتدوير 3D</span>
        <span>🔍 قم بالتقريب والابتعاد بسهولة</span>
      </div>
    </div>
  );
}
