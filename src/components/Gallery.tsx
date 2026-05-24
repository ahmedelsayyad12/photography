"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { parseGalleryCategoryFromHash } from "@/lib/gallery-hash";
import { motion } from "framer-motion";
import { photos, categoryLabels } from "@/data/photography";
import type { GalleryCategory, Photo } from "@/types";
import { GalleryWebGLModal } from "@/components/webgl/GalleryWebGLModal";
import { GalleryItem } from "@/components/GalleryItem";
import { cn } from "@/lib/utils";

const categories: GalleryCategory[] = [
  "all",
  "portraits",
  "fashion",
  "street",
  "nature",
  "weddings",
  "editorial",
  "black-white",
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const applyFromHash = () => {
      const fromHash = parseGalleryCategoryFromHash();
      if (fromHash && fromHash !== "all") {
        setActiveCategory(fromHash);
      }
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedPhoto) return;
      const idx = filtered.findIndex((p) => p.id === selectedPhoto.id);
      const next =
        direction === "next"
          ? (idx + 1) % filtered.length
          : (idx - 1 + filtered.length) % filtered.length;
      setSelectedPhoto(filtered[next]);
    },
    [selectedPhoto, filtered]
  );

  return (
    <section id="work" className="section-padding" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
              Portfolio
            </p>
            <h2
              id="gallery-heading"
              className="font-serif text-4xl md:text-6xl text-[var(--foreground)]"
            >
              Gallery
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-500",
                  activeCategory === cat
                    ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-[var(--foreground)]"
                    : "border-white/10 text-[var(--muted)] hover:border-white/25 hover:text-[var(--foreground)]"
                )}
                data-cursor="hover"
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:gap-6">
          {filtered.map((photo, i) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              index={i}
              onSelect={() => setSelectedPhoto(photo)}
            />
          ))}
        </motion.div>
      </div>

      <GalleryWebGLModal
        photo={selectedPhoto}
        photos={filtered}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={navigate}
      />
    </section>
  );
}
