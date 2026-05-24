"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Photo } from "@/types";

interface TunnelFramesProps {
  photos: Photo[];
  progressRef: RefObject<number>;
}

function Frame({
  photo,
  position,
  rotation,
  progressRef,
}: {
  photo: Photo;
  position: [number, number, number];
  rotation: [number, number, number];
  progressRef: RefObject<number>;
}) {
  const texture = useTexture(photo.src);
  const ref = useRef<THREE.Mesh>(null);
  const aspect = photo.width / photo.height;
  const w = 3.2;
  const h = w / aspect;

  useFrame(() => {
    if (!ref.current) return;
    const progress = progressRef.current ?? 0;
    const dist = Math.abs(ref.current.position.z - (-6 + progress * -32));
    const focus = Math.max(0, 1 - dist / 10);
    ref.current.scale.setScalar(THREE.MathUtils.lerp(0.94, 1.04, focus));
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = focus * 0.12;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[w, h]} />
      <meshStandardMaterial
        map={texture}
        emissive="#8ba8c1"
        emissiveIntensity={0}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

export function TunnelFrames({ photos, progressRef }: TunnelFramesProps) {
  const items = useMemo(() => photos.slice(0, 8), [photos]);

  const layout = useMemo(
    () =>
      items.map((photo, i) => {
        const z = -i * 4.2 - 1.5;
        const side = i % 2 === 0 ? -1 : 1;
        const x = side * (2.6 + (i % 3) * 0.5);
        const y = Math.sin(i * 0.7) * 0.6;
        return {
          photo,
          position: [x, y, z] as [number, number, number],
          rotation: [0, side * 0.3, 0] as [number, number, number],
        };
      }),
    [items]
  );

  return (
    <group>
      {layout.map((item) => (
        <Frame
          key={item.photo.id}
          photo={item.photo}
          position={item.position}
          rotation={item.rotation}
          progressRef={progressRef}
        />
      ))}
    </group>
  );
}
