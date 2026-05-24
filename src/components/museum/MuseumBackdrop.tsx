"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef } from "react";
import { useScrollVelocity } from "@/context/ScrollContext";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMounted } from "@/hooks/useMounted";

const BackdropCanvas = dynamic(
  () => import("./MuseumBackdropCanvas").then((m) => m.MuseumBackdropCanvas),
  { ssr: false }
);

export function MuseumBackdrop() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const immersive = useImmersiveOptional();
  const { progress, velocity } = useScrollVelocity();
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  if (!mounted || reduced || !immersive?.webglEnabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.12]"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <BackdropCanvas progressRef={progressRef} velocity={velocity} />
      </Suspense>
    </div>
  );
}
