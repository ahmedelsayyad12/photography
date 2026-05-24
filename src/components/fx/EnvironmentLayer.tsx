"use client";

import { useScrollVelocity } from "@/context/ScrollContext";
import { useSceneMood } from "@/context/SceneMoodContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMounted } from "@/hooks/useMounted";

export function EnvironmentLayer() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const { velocity } = useScrollVelocity();
  const { mood } = useSceneMood();

  if (!mounted || reduced) return null;

  const beamShift = Math.min(velocity * 2, 40);
  const fastScroll = Math.min(velocity * 0.08, 0.35);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden transition-[opacity] duration-700"
      aria-hidden="true"
      data-environment-mood={mood.id}
    >
      <div
        className="environment-beam absolute -left-1/4 top-0 h-[120vh] w-[60vw] rotate-12 transition-opacity duration-1000"
        style={{
          transform: `translateX(${beamShift}px)`,
          opacity: 0.2 + fastScroll,
          background: `linear-gradient(105deg, transparent 0%, ${mood.beamPrimary} 40%, ${mood.beamSecondary} 60%, transparent 100%)`,
        }}
      />
      <div
        className="environment-beam absolute -right-1/4 bottom-0 h-[100vh] w-[50vw] -rotate-12 transition-opacity duration-1000"
        style={{
          transform: `translateX(${-beamShift}px)`,
          opacity: 0.15 + fastScroll * 0.8,
          background: `linear-gradient(285deg, transparent 0%, ${mood.beamSecondary} 45%, ${mood.beamPrimary} 65%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-0 transition-[background,opacity] duration-[1.2s] ease-out"
        style={{
          opacity: 0.12 + fastScroll,
          background: mood.ambientGradient,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay transition-opacity duration-700"
        style={{ opacity: mood.particleOpacity * 0.12 }}
      />
    </div>
  );
}
