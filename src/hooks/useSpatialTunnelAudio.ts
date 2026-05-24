"use client";

import { useEffect, useRef } from "react";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import type { RefObject } from "react";

/**
 * Subtle stereo pan + volume swell while the museum tunnel is in view.
 * Works with the global ambient context gain when sound is enabled.
 */
export function useSpatialTunnelAudio(
  sectionRef: RefObject<HTMLElement | null>,
  progressRef: RefObject<number>
) {
  const immersive = useImmersiveOptional();
  const panRef = useRef(0);

  useEffect(() => {
    if (!immersive?.soundEnabled || !sectionRef.current) return;

    const section = sectionRef.current;
    let inView = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio > 0.2;
      },
      { threshold: [0, 0.2, 0.5] }
    );
    observer.observe(section);

    const tick = () => {
      const progress = progressRef.current ?? 0;
      const targetPan = inView ? (progress - 0.5) * 0.6 : 0;
      panRef.current += (targetPan - panRef.current) * 0.08;
      document.documentElement.style.setProperty(
        "--tunnel-audio-pan",
        String(panRef.current)
      );
      document.documentElement.style.setProperty(
        "--tunnel-audio-gain",
        inView ? String(0.35 + progress * 0.25) : "0"
      );
      rafId = requestAnimationFrame(tick);
    };

    let rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      document.documentElement.style.removeProperty("--tunnel-audio-pan");
      document.documentElement.style.removeProperty("--tunnel-audio-gain");
    };
  }, [immersive?.soundEnabled, sectionRef, progressRef]);
}
