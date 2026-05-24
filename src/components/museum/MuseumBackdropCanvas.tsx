"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, type RefObject } from "react";
import * as THREE from "three";
import { ScrollDrivenCamera } from "./ScrollDrivenCamera";
import { photos } from "@/data/photography";

function AmbientFrames({
  progressRef,
  velocity,
}: {
  progressRef: RefObject<number>;
  velocity: number;
}) {
  const group = useRef<THREE.Group>(null);
  const urls = photos.slice(0, 5).map((p) => p.src);
  const textures = useTexture(urls);

  useFrame((state) => {
    if (!group.current) return;
    const progress = progressRef.current ?? 0;
    group.current.rotation.y = state.clock.elapsedTime * 0.05 + progress * 0.3;
    group.current.position.z = -2 - progress * 4;
    const stretch = 1 + Math.min(velocity * 0.01, 0.08);
    group.current.scale.setScalar(stretch);
  });

  return (
    <group ref={group}>
      {textures.map((tex, i) => {
        const angle = (i / textures.length) * Math.PI * 2;
        const r = 6 + i * 0.5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, Math.sin(i) * 0.5, Math.sin(angle) * r - 8]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <planeGeometry args={[2.5, 3.2]} />
            <meshBasicMaterial map={tex} transparent opacity={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

export function MuseumBackdropCanvas({
  progressRef,
  velocity,
}: {
  progressRef: RefObject<number>;
  velocity: number;
}) {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1]}
      gl={{ antialias: false, alpha: true }}
    >
      <fog attach="fog" args={["#080808", 8, 28]} />
      <ambientLight intensity={0.2} />
      <ScrollDrivenCamera progressRef={progressRef} mode="ambient" velocity={velocity} />
      <AmbientFrames progressRef={progressRef} velocity={velocity} />
    </Canvas>
  );
}
