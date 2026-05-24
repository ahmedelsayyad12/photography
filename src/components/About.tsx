"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig, stats, timeline } from "@/data/photography";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FloatingDepth } from "@/components/fx/FloatingDepth";
import { CinematicText } from "@/components/fx/CinematicText";

const portrait =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=85";

function StatItem({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  const { count, ref } = useAnimatedCounter(value);

  return (
    <div className="border-t border-white/10 pt-6">
      <p className="mb-2 text-xs tracking-[0.3em] uppercase text-[var(--muted)]">
        {label}
      </p>
      <p className="font-serif text-4xl text-[var(--foreground)] md:text-5xl">
        <span ref={ref}>{count}</span>
        {suffix}
      </p>
    </div>
  );
}

export function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="section-padding relative overflow-hidden" aria-labelledby="about-heading">
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-64 w-64 rounded-full border border-white/5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-10 bottom-20 h-32 w-32 rounded-full bg-[var(--accent)]/5 blur-2xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="relative lg:col-span-5"
            initial={reduced ? {} : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <FloatingDepth className="relative aspect-[3/4] overflow-hidden rounded-sm holo-border">
              <Image
                src={portrait}
                alt={`Portrait of ${siteConfig.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </FloatingDepth>
            <div className="absolute -bottom-6 -right-6 hidden border border-white/10 bg-[var(--background)]/80 px-6 py-4 backdrop-blur md:block">
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)]">
                Based in NYC
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
              The Photographer
            </p>
            <h2 id="about-heading">
              <CinematicText
                text={siteConfig.name}
                as="span"
                className="font-serif text-4xl leading-tight text-[var(--foreground)] md:text-6xl block"
                splitBy="word"
              />
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
              For over a decade, I&apos;ve been crafting visual narratives that
              exist between cinema and still photography. My work lives at the
              intersection of fashion editorial, intimate portraiture, and
              documentary storytelling — always guided by light, emotion, and
              the quiet drama of a single frame.
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
              From Vogue editorials to destination weddings in Tuscany, each
              project is approached with the same reverence: as a chance to
              create something timeless.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <StatItem key={stat.label} {...stat} />
              ))}
            </div>

            <div className="mt-16">
              <h3 className="mb-8 text-xs tracking-[0.3em] uppercase text-[var(--muted)]">
                Journey
              </h3>
              <ol className="space-y-8 border-l border-white/10 pl-8">
                {timeline.map((item, i) => (
                  <motion.li
                    key={item.year}
                    className="relative"
                    initial={reduced ? {} : { opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                  >
                    <span className="absolute -left-[33px] top-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm text-[var(--accent)]">{item.year}</span>
                    <h4 className="mt-1 font-serif text-xl text-[var(--foreground)]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {item.description}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
