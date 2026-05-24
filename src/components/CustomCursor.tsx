"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMounted } from "@/hooks/useMounted";

const subscribe = () => () => {};

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

export function CustomCursor() {
  const mounted = useMounted();
  const finePointer = useSyncExternalStore(
    subscribe,
    getFinePointerSnapshot,
    () => false
  );
  const { x, y } = useMousePosition();
  const reduced = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  const springConfig = { damping: 28, stiffness: 280, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const ringX = useSpring(0, { ...springConfig, damping: 20 });
  const ringY = useSpring(0, { ...springConfig, damping: 20 });

  useEffect(() => {
    if (reduced || !finePointer) return;
    cursorX.set(x);
    cursorY.set(y);
    ringX.set(x);
    ringY.set(y);
  }, [x, y, cursorX, cursorY, ringX, ringY, reduced, finePointer]);

  useEffect(() => {
    if (!mounted || reduced || !finePointer) return;

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [data-cursor='hover'], .gallery-item, .magnetic, input, textarea, select"
      );
      setHovering(!!interactive);
    };

    document.addEventListener("mouseover", onOver, { passive: true });
    return () => document.removeEventListener("mouseover", onOver);
  }, [mounted, reduced, finePointer]);

  if (!mounted || reduced || !finePointer) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: cursorX, y: cursorY }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)] transition-all duration-300"
          style={{
            width: hovering ? 6 : 8,
            height: hovering ? 6 : 8,
          }}
        />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/5 backdrop-blur-[2px] transition-all duration-500 ease-out"
          style={{
            width: hovering ? 56 : 36,
            height: hovering ? 56 : 36,
            opacity: hovering ? 0.75 : 0.45,
          }}
        />
      </motion.div>
    </div>
  );
}
