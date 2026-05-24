"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useMounted } from "@/hooks/useMounted";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollVelocity } from "@/context/ScrollContext";

export function DynamicLighting() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition();
  const { velocity } = useScrollVelocity();

  if (!mounted || reduced) return null;

  const px = (x / (typeof window !== "undefined" ? window.innerWidth : 1)) * 100;
  const py = (y / (typeof window !== "undefined" ? window.innerHeight : 1)) * 100;
  const bloom = Math.min(velocity * 0.08, 0.35);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[90] mix-blend-soft-light transition-opacity duration-300"
        style={{
          opacity: 0.5 + bloom,
          background: `radial-gradient(900px circle at ${px}% ${py}%, rgba(139, 168, 193, 0.09), transparent 55%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[89]"
        style={{
          background: `radial-gradient(600px circle at ${px}% ${py}%, rgba(196, 165, 116, 0.04), transparent 50%)`,
        }}
        aria-hidden="true"
      />
    </>
  );
}
