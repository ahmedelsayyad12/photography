"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/types";
import { categoryLabels } from "@/data/photography";
import { photoAlt } from "@/lib/photo-alt";

interface GalleryModalProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function GalleryModal({
  photo,
  photos,
  onClose,
  onNavigate,
}: GalleryModalProps) {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    },
    [photo, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (photo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [photo]);

  const touchStartX = useRef(0);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${photo.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate("prev")}
            className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 p-3 text-white transition-colors hover:bg-white/10 md:flex"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate("next")}
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 p-3 text-white transition-colors hover:bg-white/10 md:flex"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.div
            key={photo.id}
            className="relative z-10 mx-4 flex max-h-[85vh] w-full max-w-5xl flex-col"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) {
                onNavigate(diff > 0 ? "next" : "prev");
              }
            }}
          >
            <div className="relative aspect-[3/4] max-h-[70vh] w-full overflow-hidden rounded-sm md:aspect-auto md:min-h-[400px]">
              <Image
                src={photo.src}
                alt={photoAlt(photo)}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>

            <motion.div
              className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)]">
                  {categoryLabels[photo.category]}
                </p>
                <h3 className="font-serif text-3xl text-white">{photo.title}</h3>
              </div>
              <div className="flex gap-6 text-sm text-[var(--muted)]">
                {photo.location && <span>{photo.location}</span>}
                {photo.year && <span>{photo.year}</span>}
                {photo.camera && <span>{photo.camera}</span>}
              </div>
            </motion.div>

            <p className="mt-2 text-xs text-[var(--muted)]">
              {currentIndex + 1} / {photos.length}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
