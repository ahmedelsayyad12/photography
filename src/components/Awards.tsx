"use client";

import { motion } from "framer-motion";
import { awards } from "@/data/photography";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Awards() {
  const reduced = useReducedMotion();

  return (
    <section
      className="section-padding border-t border-white/5"
      aria-labelledby="awards-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
              Recognition
            </p>
            <h2
              id="awards-heading"
              className="font-serif text-4xl md:text-6xl text-[var(--foreground)]"
            >
              Awards & Publications
            </h2>
          </div>
        </div>

        <ul className="divide-y divide-white/5">
          {awards.map((award, i) => (
            <motion.li
              key={award.id}
              className="group flex flex-col gap-2 py-8 transition-colors hover:bg-white/[0.02] md:flex-row md:items-center md:justify-between md:py-10 md:px-4"
              initial={reduced ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <div>
                <h3 className="font-serif text-xl text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)] md:text-2xl">
                  {award.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {award.publication}
                </p>
              </div>
              <span className="text-sm tracking-[0.2em] text-[var(--muted)]">
                {award.year}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
