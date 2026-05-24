"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { imageVertexShader, imageFragmentShader } from "./shaders";

interface ImagePlaneProps {
  src: string;
  nextSrc?: string;
  distortion?: number;
  mouse?: { x: number; y: number };
  transition?: number;
  rgbShift?: number;
}

export function ImagePlane({
  src,
  nextSrc,
  distortion = 0,
  mouse = { x: 0.5, y: 0.5 },
  transition = 0,
  rgbShift = 0.5,
}: ImagePlaneProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, src);
  const nextTexture = useLoader(THREE.TextureLoader, nextSrc ?? src);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTextureNext: { value: nextTexture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uDistortion: { value: 0 },
      uTransition: { value: 0 },
      uRgbShift: { value: rgbShift },
    }),
    [texture, nextTexture, rgbShift]
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y);
    matRef.current.uniforms.uDistortion.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uDistortion.value,
      distortion,
      0.08
    );
    matRef.current.uniforms.uTransition.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uTransition.value,
      transition,
      0.06
    );
    matRef.current.uniforms.uTexture.value = texture;
    matRef.current.uniforms.uTextureNext.value = nextTexture;
  });

  return (
    <mesh scale={[1.6, 1.6, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={imageVertexShader}
        fragmentShader={imageFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
