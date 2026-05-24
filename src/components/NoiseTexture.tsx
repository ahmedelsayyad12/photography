"use client";

import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function NoiseTexture() {
  const immersive = useImmersiveOptional();
  const reduced = useReducedMotion();
  const intensity = reduced ? 0.02 : (immersive?.grainIntensity ?? 0.04);

  return (
    <>
      <div
        className="noise-paper pointer-events-none fixed inset-0 z-[98]"
        style={{ opacity: intensity * 0.6 }}
        aria-hidden="true"
      />
      <div
        className="noise-dust pointer-events-none fixed inset-0 z-[97]"
        style={{ opacity: intensity * 0.4 }}
        aria-hidden="true"
      />
    </>
  );
}
