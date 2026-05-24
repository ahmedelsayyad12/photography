"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ children, className }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;

    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0.5, y: 48, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={ref}
      data-velocity-shift
      className={cn("section-reveal-wrapper", className)}
    >
      {children}
    </div>
  );
}
