"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/types";
import { categoryLabels } from "@/data/photography";
import { photoAlt } from "@/lib/photo-alt";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { useAmbientSound } from "@/hooks/useAmbientSound";

const ImagePlane = dynamic(
  () => import("./ImagePlane").then((m) => m.ImagePlane),
  { ssr: false }
);

interface GalleryWebGLModalProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function GalleryWebGLModal({
  photo,
  photos,
  onClose,
  onNavigate,
}: GalleryWebGLModalProps) {
  const immersive = useImmersiveOptional();
  const soundOn = immersive?.soundEnabled ?? false;
  const { playAccent } = useAmbientSound(soundOn);

  const [mounted, setMounted] = useState(false);
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;
  const webgl = immersive?.webglEnabled ?? false;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!photo) return;
    playAccent(196, 0.2);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [photo, playAccent]);

  const navigate = useCallback(
    (dir: "prev" | "next") => {
      if (!photo) return;
      onNavigate(dir);
      playAccent(240, 0.12);
    },
    [photo, onNavigate, playAccent]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo, onClose, navigate]);

  if (!photo || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing ${photo.title}`}
      data-cursor="open"
    >
      <div
        className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
        onClick={onClose}
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white hover:bg-white/10"
        aria-label="Close gallery"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => navigate("prev")}
        className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 p-3 text-white md:flex hover:bg-white/10"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={() => navigate("next")}
        className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 p-3 text-white md:flex hover:bg-white/10"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="relative z-10 my-auto flex w-full max-w-6xl flex-col">
        <div className="relative aspect-[16/10] max-h-[min(70vh,720px)] w-full overflow-hidden rounded-sm bg-black/40">
          {webgl ? (
            <Canvas
              camera={{ position: [0, 0, 2.2], fov: 42 }}
              dpr={[1, 2]}
              className="!h-full !w-full"
            >
              <Suspense fallback={null}>
                <ImagePlane src={photo.src} />
              </Suspense>
            </Canvas>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={photoAlt(photo)}
              className="h-full w-full object-contain"
            />
          )}
        </div>

        <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)]">
              {categoryLabels[photo.category]}
            </p>
            <h3 className="font-serif text-3xl text-white">{photo.title}</h3>
          </div>
          <div className="flex gap-6 text-sm text-[var(--muted)]">
            {photo.location && <span>{photo.location}</span>}
            {photo.year && <span>{photo.year}</span>}
          </div>
        </div>
        <p className="mt-2 text-xs text-[var(--muted)]">
          {currentIndex + 1} / {photos.length}
        </p>
      </div>
    </div>,
    document.body
  );
}
