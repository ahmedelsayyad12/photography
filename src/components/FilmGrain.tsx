"use client";

import { useEffect, useRef } from "react";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMounted } from "@/hooks/useMounted";

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const immersive = useImmersiveOptional();
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const intensity = reduced ? 0.015 : (immersive?.grainIntensity ?? 0.04);

  useEffect(() => {
    if (!mounted || reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth / 2;
      canvas.height = window.innerHeight / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = intensity * 255 * 0.35;
      }
      ctx.putImageData(imageData, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mounted, reduced, intensity]);

  if (!mounted) {
    return (
      <div
        className="film-grain pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.35] mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="film-grain pointer-events-none fixed inset-0 z-[99] opacity-[0.03]"
        aria-hidden="true"
      />
    </>
  );
}
