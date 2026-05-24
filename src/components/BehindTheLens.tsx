"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const btsImages = [
  {
    src: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    caption: "On location — Iceland",
  },
  {
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    caption: "Studio setup — Brooklyn",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    caption: "Golden hour scouting",
  },
];

export function BehindTheLens() {
  const reduced = useReducedMotion();

  return (
    <section
      className="section-padding border-t border-white/5"
      aria-labelledby="bts-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
              Process
            </p>
            <h2
              id="bts-heading"
              className="font-serif text-4xl md:text-6xl text-[var(--foreground)]"
            >
              Behind The Lens
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-[var(--muted)]">
              Every image begins long before the shutter clicks. Scouting
              locations at dawn, building light setups by hand, and waiting for
              that fleeting moment when everything aligns — this is where the
              magic lives.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-[var(--muted)]">
              <li className="flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                Pre-production & mood boarding
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                Natural & artificial light mastery
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--accent)]" />
                Editorial retouching & color grading
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-sm"
              initial={reduced ? {} : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Image
                src={btsImages[0].src}
                alt={btsImages[0].caption}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <p className="absolute bottom-4 left-4 text-xs tracking-[0.2em] uppercase text-white/70">
                {btsImages[0].caption}
              </p>
            </motion.div>
            {btsImages.slice(1).map((img, i) => (
              <motion.div
                key={img.caption}
                className="relative aspect-square overflow-hidden rounded-sm"
                initial={reduced ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * (i + 1) }}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
