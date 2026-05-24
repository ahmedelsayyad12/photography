"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SceneMoodId } from "@/lib/scene-moods";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface PortalTransitionProps {
  children: React.ReactNode;
  moodId: SceneMoodId;
  className?: string;
}

export function PortalTransition({
  children,
  moodId,
  className,
}: PortalTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !portalRef.current) return;

    const portal = portalRef.current;
    const ring = ringRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap
            .timeline()
            .fromTo(
              portal,
              { scaleY: 0, opacity: 0.9, transformOrigin: "center top" },
              { scaleY: 1, opacity: 0, duration: 1.1, ease: "power4.inOut" }
            )
            .fromTo(
              ring,
              { scale: 0.6, opacity: 0.7, rotate: -8 },
              { scale: 2.2, opacity: 0, rotate: 12, duration: 1.4, ease: "power3.out" },
              0
            );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={sectionRef}
      data-scene-mood={moodId}
      data-velocity-blur
      className={cn("relative", className)}
    >
      <div
        ref={portalRef}
        className="portal-wipe pointer-events-none absolute left-0 right-0 top-0 z-20 h-px origin-top"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="portal-ring pointer-events-none absolute left-1/2 top-0 z-20 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
