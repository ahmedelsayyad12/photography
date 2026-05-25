"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Subtle hero motion — idle-loaded GSAP only (no extra LCP image). */
export function HeroEffects() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;

    const run = async () => {
      const target = document.getElementById("hero-lcp-image")?.parentElement;
      if (!target) return;

      const { default: gsap } = await import("gsap");
      if (cancelled) return;

      gsap.to(target, {
        scale: 1.06,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    };

    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(() => void run(), { timeout: 2500 });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }

    const t = setTimeout(() => void run(), 1200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [reduced]);

  return null;
}
