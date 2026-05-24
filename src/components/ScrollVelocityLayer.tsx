"use client";

import { useScrollVelocity } from "@/context/ScrollContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Velocity feedback via CSS variables only — no transform on wrapper,
 * so GSAP ScrollTrigger pin and position:fixed cursor stay correct.
 */
export function ScrollVelocityLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { velocity } = useScrollVelocity();
  const reduced = useReducedMotion();
  const intensity = reduced ? 0 : Math.min(velocity * 0.15, 1);

  return (
    <div
      className="scroll-velocity-root min-h-screen"
      style={
        {
          ["--scroll-velocity" as string]: String(velocity),
          ["--scroll-intensity" as string]: String(intensity),
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
