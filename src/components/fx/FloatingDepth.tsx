"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface FloatingDepthProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export function FloatingDepth({
  children,
  className,
  depth = 12,
}: FloatingDepthProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -depth, y: x * depth });
  };

  return (
    <div
      ref={ref}
      className={cn("floating-depth transition-transform duration-500 ease-out", className)}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: reduced
          ? undefined
          : `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
      }}
      data-cursor="view"
    >
      {children}
    </div>
  );
}
