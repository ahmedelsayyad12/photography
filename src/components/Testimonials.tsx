"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/photography";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const current = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % testimonials.length);
      }
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 grid-lines opacity-10" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="mb-3 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
          Voices
        </p>
        <h2
          id="testimonials-heading"
          className="mb-16 font-serif text-4xl md:text-6xl text-[var(--foreground)]"
        >
          Client Stories
        </h2>

        <div className="relative mx-auto max-w-4xl text-center">
          <Quote
            className="mx-auto mb-8 h-8 w-8 text-[var(--accent)]/40"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-2xl leading-relaxed text-[var(--foreground)] md:text-4xl md:leading-snug"
            >
              &ldquo;{current.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          <footer className="mt-10">
            <cite className="not-italic">
              <p className="text-sm tracking-[0.2em] uppercase text-[var(--foreground)]">
                {current.author}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {current.role} · {current.company}
              </p>
            </cite>
          </footer>

          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-[var(--accent)]/50"
              aria-label="Previous testimonial"
              data-cursor="hover"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-8 bg-[var(--accent)]"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-[var(--accent)]/50"
              aria-label="Next testimonial"
              data-cursor="hover"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
