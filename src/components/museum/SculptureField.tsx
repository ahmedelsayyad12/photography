"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SculptureField({
  progressRef,
}: {
  progressRef: RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const progress = progressRef.current ?? 0;
    group.current.rotation.y = state.clock.elapsedTime * 0.06 + progress * Math.PI * 0.5;
    group.current.position.z = -5 - progress * 10;
  });

  return (
    <group ref={group} position={[3.2, 0.4, -6]}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#8ba8c1"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  );
}
