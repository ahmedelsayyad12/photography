"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { collections } from "@/data/photography";
import { galleryCategoryHref } from "@/lib/gallery-hash";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Categories() {
  const reduced = useReducedMotion();

  return (
    <section
      id="collections"
      className="section-padding border-t border-white/5"
      aria-labelledby="collections-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-3 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
            Archives
          </p>
          <h2
            id="collections-heading"
            className="font-serif text-4xl md:text-6xl text-[var(--foreground)]"
          >
            Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col, i) => (
            <motion.a
              key={col.id}
              href={galleryCategoryHref(col.category)}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm"
              initial={reduced ? {} : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              data-cursor="hover"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[var(--accent)]/10" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--accent)]">
                  {col.count} Images
                </span>
                <h3 className="mt-2 font-serif text-3xl text-white">
                  {col.title}
                </h3>
                <p className="mt-2 text-sm text-white/50 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {col.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
