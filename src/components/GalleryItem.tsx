"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { Photo } from "@/types";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { getLayoutPreset } from "@/lib/layout-engine";
import { photoAlt } from "@/lib/photo-alt";
import { cn } from "@/lib/utils";

interface GalleryItemProps {
  photo: Photo;
  index: number;
  onSelect: () => void;
}

export function GalleryItem({ photo, index, onSelect }: GalleryItemProps) {
  const immersive = useImmersiveOptional();
  const preset = getLayoutPreset(immersive?.layoutVariant ?? "cinematic-full");
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const hoverMode = preset.gallery.hover;

  const handleMove = (e: React.MouseEvent) => {
    if (hoverMode !== "tilt" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      layout
      className="gallery-item group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.4) }}
      onClick={onSelect}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform:
          hoverMode === "tilt"
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : undefined,
        transition: "transform 0.4s ease-out",
      }}
      data-cursor="drag"
      aria-label={`Open ${photo.title}`}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.src}
          alt={photoAlt(photo)}
          fill
          className={cn(
            "object-cover transition-all duration-[1.2s] ease-out",
            hoverMode === "zoom" && "group-hover:scale-110",
            hoverMode === "distort" && "group-hover:scale-105 group-hover:brightness-110",
            hoverMode === "tilt" && "group-hover:scale-[1.03]"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
        {(hoverMode === "distort" || immersive?.webglEnabled) && (
          <div className="image-distort absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
        <p className="text-left font-serif text-lg text-white">{photo.title}</p>
      </div>
    </motion.button>
  );
}
