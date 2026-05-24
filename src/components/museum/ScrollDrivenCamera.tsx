"use client";

import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef, type RefObject } from "react";
import * as THREE from "three";

interface ScrollDrivenCameraProps {
  progressRef: RefObject<number>;
  mode: "tunnel" | "ambient";
  velocity?: number;
}

export function ScrollDrivenCamera({
  progressRef,
  mode,
  velocity = 0,
}: ScrollDrivenCameraProps) {
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  const target = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const cam = camRef.current;
    if (!cam) return;

    const progress = progressRef.current ?? 0;
    const vel = Math.min(velocity * 0.02, 0.15);
    const drift = Math.sin(progress * Math.PI * 2) * 0.3;

    if (mode === "tunnel") {
      const z = THREE.MathUtils.lerp(8, -38, progress);
      const y = THREE.MathUtils.lerp(0.15, -0.4, progress) + drift * 0.15;
      const x = Math.sin(progress * Math.PI) * 0.8;
      target.current.set(x, y, z);
      lookAt.current.set(0, 0, z - 5);
      cam.fov = THREE.MathUtils.lerp(52, 44, progress) + vel * 8;
    } else {
      const z = THREE.MathUtils.lerp(2, -8, progress);
      target.current.set(drift * 0.5, 0.3 + vel, z);
      lookAt.current.set(0, 0, -4);
      cam.fov = THREE.MathUtils.lerp(55, 48, progress);
    }

    cam.position.lerp(target.current, 1 - Math.pow(0.001, delta));
    cam.lookAt(lookAt.current);
    cam.updateProjectionMatrix();
  });

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      position={[0, 0, 8]}
      fov={50}
      near={0.1}
      far={100}
    />
  );
}
