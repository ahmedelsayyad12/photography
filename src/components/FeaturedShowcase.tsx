"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { photos } from "@/data/photography";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { getLayoutPreset } from "@/lib/layout-engine";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

const featured = photos.filter((p) => p.featured).slice(0, 4);

const asymmetricSpans = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

const asymmetricHeights = [
  "aspect-[4/5] md:aspect-auto md:min-h-[520px]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[16/10]",
];

export function FeaturedShowcase() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const immersive = useImmersiveOptional();
  const layoutKey = mounted
    ? (immersive?.layoutVariant ?? "cinematic-full")
    : "cinematic-full";
  const preset = getLayoutPreset(layoutKey);
  const gridType = preset.featured.grid;
  const gap = preset.featured.gap;

  const gapClass =
    gap === "tight" ? "gap-3 md:gap-4" : gap === "airy" ? "gap-8 md:gap-10" : "gap-4 md:gap-6";

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
              Selected Works
            </p>
            <h2
              id="featured-heading"
              className="font-serif text-4xl md:text-6xl text-[var(--foreground)]"
            >
              Featured
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--muted)]">
            Curated frames — layout: {preset.label}
          </p>
        </div>

        {gridType === "single-hero" && featured[0] && (
          <motion.article
            className="group relative aspect-[21/9] overflow-hidden rounded-sm"
            initial={reduced ? {} : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <Image
              src={featured[0].src}
              alt={featured[0].title}
              fill
              className="object-cover transition-transform duration-[1.6s] group-hover:scale-105"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={featured[0].blurDataURL}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <h3 className="font-serif text-4xl text-white md:text-6xl">
                {featured[0].title}
              </h3>
            </div>
          </motion.article>
        )}

        {gridType !== "single-hero" && (
          <div
            className={cn(
              "grid grid-cols-1",
              gapClass,
              gridType === "uniform" && "md:grid-cols-2",
              (gridType === "asymmetric" || gridType === "masonry-float") &&
                "md:grid-cols-12"
            )}
          >
            {featured.map((photo, i) => (
              <motion.article
                key={photo.id}
                className={cn(
                  "group relative overflow-hidden rounded-sm",
                  gridType === "uniform" && "aspect-[4/5]",
                  (gridType === "asymmetric" || gridType === "masonry-float") &&
                    `${asymmetricSpans[i]} ${asymmetricHeights[i]}`,
                  gridType === "masonry-float" && i % 2 === 1 && "md:-mt-12"
                )}
                initial={reduced ? {} : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="mb-1 text-[10px] tracking-[0.3em] uppercase text-[var(--accent)]">
                    {photo.category}
                  </p>
                  <h3 className="font-serif text-2xl text-white md:text-3xl">
                    {photo.title}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
