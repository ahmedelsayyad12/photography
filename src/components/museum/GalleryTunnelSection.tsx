"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { TunnelProgressProvider } from "@/context/TunnelProgressContext";
import { useSpatialTunnelAudio } from "@/hooks/useSpatialTunnelAudio";
import { photos } from "@/data/photography";
import Image from "next/image";

const GalleryTunnelCanvas = dynamic(
  () =>
    import("./GalleryTunnelCanvas").then((m) => m.GalleryTunnelCanvas),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

/** Extra scroll distance while the tunnel viewport is sticky (viewport heights) */
const TUNNEL_SCROLL_VH = 2.2;

export function GalleryTunnelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const reduced = useReducedMotion();
  const immersive = useImmersiveOptional();
  const webgl = immersive?.webglEnabled ?? false;

  useSpatialTunnelAudio(sectionRef, progressRef);

  useEffect(() => {
    if (reduced || !webgl || !sectionRef.current) return;

    const section = sectionRef.current;

    const applyHeight = () => {
      const scrollPx = window.innerHeight * TUNNEL_SCROLL_VH;
      section.style.height = `${scrollPx + window.innerHeight}px`;
    };

    let uiRaf = 0;
    let trigger: ScrollTrigger | null = null;

    const build = () => {
      if (trigger) {
        trigger.kill();
        trigger = null;
      }

      applyHeight();

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          if (!uiRaf) {
            uiRaf = requestAnimationFrame(() => {
              setDisplayProgress(Math.round(self.progress * 100));
              uiRaf = 0;
            });
          }
        },
      });
    };

    const ctx = gsap.context(() => {
      build();
    }, section);

    const scheduleRebuild = () => {
      build();
      ScrollTrigger.refresh();
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scheduleRebuild, 200);
    };
    window.addEventListener("resize", onResize);

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      clearTimeout(resizeTimer);
      clearTimeout(refreshTimer);
      window.removeEventListener("resize", onResize);
      ctx.revert();
      section.style.height = "";
      progressRef.current = 0;
    };
  }, [reduced, webgl]);

  if (reduced || !webgl) {
    return (
      <section
        id="museum"
        className="section-padding border-t border-white/5"
        aria-labelledby="museum-heading"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 id="museum-heading" className="font-serif text-4xl md:text-6xl">
            Digital Museum
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.slice(0, 6).map((p) => (
              <div
                key={p.id}
                className="relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="museum"
      ref={sectionRef}
      data-scene-mood="museum"
      className="relative w-full"
      aria-labelledby="museum-heading"
      data-cursor="scroll"
    >
      <TunnelProgressProvider progressRef={progressRef}>
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#050505]">
          <GalleryTunnelCanvas />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--background)]/50 via-transparent to-[var(--background)]/70" />

          <div className="pointer-events-none absolute left-6 top-8 z-10 md:left-10 md:top-12">
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
              Immersive
            </p>
            <h2
              id="museum-heading"
              className="font-serif text-3xl text-[var(--foreground)] md:text-5xl"
            >
              Gallery Tunnel
            </h2>
            <p className="mt-3 max-w-sm text-sm text-[var(--muted)]">
              Scroll to move through the exhibition
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-8 right-8 z-10 flex flex-col items-end gap-3">
            <div className="h-24 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">
              Depth {String(displayProgress).padStart(2, "0")}%
            </span>
          </div>
        </div>
      </TunnelProgressProvider>
    </section>
  );
}
