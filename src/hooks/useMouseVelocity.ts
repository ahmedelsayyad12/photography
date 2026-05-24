"use client";

import { useEffect, useRef, useState } from "react";

export function useMouseVelocity() {
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0, speed: 0 });
  const last = useRef({ x: 0, y: 0, t: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(now - last.current.t, 1);
      const vx = ((e.clientX - last.current.x) / dt) * 16;
      const vy = ((e.clientY - last.current.y) / dt) * 16;
      const speed = Math.min(Math.hypot(vx, vy), 24);
      last.current = { x: e.clientX, y: e.clientY, t: now };
      setVelocity({ vx, vy, speed });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return velocity;
}
