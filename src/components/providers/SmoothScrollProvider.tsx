"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollContext, type ScrollState } from "@/context/ScrollContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();
  const [scrollState, setScrollState] = useState<ScrollState>({
    velocity: 0,
    direction: 0,
    progress: 0,
    scrollY: 0,
  });

  useEffect(() => {
    if (reduced) return;

    let destroyed = false;
    let rafId = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout>;

    const cleanupLenis = (lenis: Lenis, root: HTMLElement) => {
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId);
      ScrollTrigger.scrollerProxy(root, {});
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
      lenisRef.current = null;
    };

    const onRefresh = () => {
      if (!lenisRef.current) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenisRef.current?.resize();
      }, 200);
    };

    const init = () => {
      if (destroyed) return;

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
      });
      lenisRef.current = lenis;

      const root = document.documentElement;

      ScrollTrigger.scrollerProxy(root, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "fixed",
      });

      ScrollTrigger.addEventListener("refresh", onRefresh);

      let lastScroll = 0;
      lenis.on(
        "scroll",
        (e: {
          scroll: number;
          velocity?: number;
          direction?: number;
          progress?: number;
        }) => {
          ScrollTrigger.update();
          const delta = Math.abs(e.scroll - lastScroll);
          lastScroll = e.scroll;
          const limit =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = limit > 0 ? e.scroll / limit : 0;
          setScrollState({
            velocity: Math.abs(e.velocity ?? delta),
            direction: e.direction ?? 0,
            progress: e.progress ?? progress,
            scrollY: e.scroll,
          });
        }
      );

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    if ("requestIdleCallback" in window) {
      idleId = requestIdleCallback(init, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(init, 800);
    }

    return () => {
      destroyed = true;
      if (idleId !== undefined) cancelIdleCallback(idleId);
      clearTimeout(timeoutId);
      if (lenisRef.current) {
        cleanupLenis(lenisRef.current, document.documentElement);
      }
    };
  }, [reduced]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    return () => window.removeEventListener("resize", refresh);
  }, []);

  return (
    <ScrollContext.Provider value={scrollState}>{children}</ScrollContext.Provider>
  );
}
