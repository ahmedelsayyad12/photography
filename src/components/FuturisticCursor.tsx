"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMouseVelocity } from "@/hooks/useMouseVelocity";
import { useCursorState } from "@/hooks/useCursorState";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMounted } from "@/hooks/useMounted";
import { useSyncExternalStore } from "react";
import { cursorLabels, type CursorState } from "@/types/cursor";

const subscribe = () => () => {};

function getFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

const stateScale: Record<CursorState, number> = {
  explore: 1,
  view: 1.15,
  open: 1.35,
  drag: 1.5,
  scroll: 1.1,
  play: 1.2,
};

export function FuturisticCursor() {
  const mounted = useMounted();
  const finePointer = useSyncExternalStore(subscribe, getFinePointer, () => false);
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition();
  const { vx, vy, speed } = useMouseVelocity();
  const cursorState = useCursorState(mounted && finePointer && !reduced);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; a: number }[]>([]);

  const spring = { damping: 26, stiffness: 320, mass: 0.45 };
  const cursorX = useSpring(0, spring);
  const cursorY = useSpring(0, spring);
  const ringX = useSpring(0, { ...spring, damping: 18 });
  const ringY = useSpring(0, { ...spring, damping: 18 });

  useEffect(() => {
    if (reduced || !finePointer) return;
    cursorX.set(x);
    cursorY.set(y);
    ringX.set(x);
    ringY.set(y);
    points.current.push({ x, y, a: 1 });
    if (points.current.length > 14) points.current.shift();
  }, [x, y, cursorX, cursorY, ringX, ringY, reduced, finePointer]);

  useEffect(() => {
    if (!mounted || reduced || !finePointer) return;
    const canvas = trailRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = points.current;
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i];
        const prev = pts[i - 1];
        p.a *= 0.92;
        ctx.strokeStyle = `rgba(139, 168, 193, ${p.a * 0.35})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mounted, reduced, finePointer]);

  if (!mounted || reduced || !finePointer) return null;

  const stretch = 1 + speed * 0.04;
  const scale = stateScale[cursorState];

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <canvas ref={trailRef} className="absolute inset-0 h-full w-full" />

      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/40 holo-ring"
          animate={{
            width: 44 * scale,
            height: 44 * scale,
            opacity: cursorState === "explore" ? 0.35 : 0.65,
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      <motion.div
        className="absolute top-0 left-0"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]"
          animate={{
            width: 8 * scale,
            height: 8 * scale,
            scaleX: stretch,
            rotate: Math.atan2(vy, vx) * (180 / Math.PI),
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </motion.div>

      <motion.div
        className="absolute top-0 left-0"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.span
          key={cursorState}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 0.7, y: 0 }}
          className="absolute left-5 top-2 text-[9px] tracking-[0.35em] uppercase text-[var(--accent)]"
        >
          {cursorLabels[cursorState]}
        </motion.span>
      </motion.div>
    </div>
  );
}
