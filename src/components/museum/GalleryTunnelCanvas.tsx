"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { ScrollDrivenCamera } from "./ScrollDrivenCamera";
import { TunnelFrames } from "./TunnelFrames";
import { SculptureField } from "./SculptureField";
import { photos } from "@/data/photography";
import { useScrollVelocity } from "@/context/ScrollContext";
import { useTunnelProgressRef } from "@/context/TunnelProgressContext";

function Scene() {
  const progressRef = useTunnelProgressRef();
  const { velocity } = useScrollVelocity();

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#080808", 5, 36]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.75} color="#8ba8c1" />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} color="#c4a574" />

      <ScrollDrivenCamera
        progressRef={progressRef}
        mode="tunnel"
        velocity={velocity}
      />
      <TunnelFrames photos={photos} progressRef={progressRef} />
      <SculptureField progressRef={progressRef} />

      <Float speed={0.8} floatIntensity={0.3}>
        <mesh position={[-3.5, -0.5, -10]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial
            color="#8ba8c1"
            emissive="#8ba8c1"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      <Stars radius={50} depth={30} count={400} factor={2} fade speed={0.2} />
    </>
  );
}

export function GalleryTunnelCanvas() {
  return (
    <Canvas
      className="pointer-events-none h-full w-full"
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
