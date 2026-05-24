"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/photography";
import { useImmersive } from "@/context/ImmersiveContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CinematicIntro() {
  const { introComplete, setIntroComplete } = useImmersive();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!introComplete && !reduced) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introComplete, reduced]);

  useEffect(() => {
    if (reduced) {
      setIntroComplete(true);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setIntroComplete(true), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reduced, setIntroComplete]);

  const skip = () => setIntroComplete(true);

  if (introComplete || reduced) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--background)]"
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-label="Site introduction"
        aria-live="polite"
      >
        {/* Vertical reveal panels */}
        <div className="pointer-events-none absolute inset-0 flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="h-full flex-1 bg-[var(--background)]"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: phase >= 2 ? 0 : 1 }}
              transition={{
                duration: 1.1,
                delay: i * 0.06,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{ transformOrigin: "top" }}
            />
          ))}
        </div>

        {/* Spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1 }}
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(139,168,193,0.12) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 text-center">
          <motion.p
            className="mb-4 text-[10px] tracking-[0.5em] uppercase text-[var(--muted)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 12 }}
            transition={{ duration: 0.8 }}
          >
            {siteConfig.tagline}
          </motion.p>

          <div className="overflow-hidden">
            {siteConfig.name.split(" ").map((word, i) => (
              <motion.span
                key={word}
                className="block font-serif text-5xl text-[var(--foreground)] md:text-7xl"
                initial={{ y: "100%" }}
                animate={{ y: phase >= 1 ? 0 : "100%" }}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="mx-auto mt-10 h-px w-24 bg-[var(--accent)]/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        <button
          type="button"
          onClick={skip}
          className="absolute bottom-10 right-10 text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
