"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/photography";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useMounted } from "@/hooks/useMounted";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { getLayoutPreset } from "@/lib/layout-engine";
import { cn } from "@/lib/utils";
import { CinematicText } from "@/components/fx/CinematicText";

const WebGLImage = dynamic(
  () => import("@/components/webgl/WebGLImage").then((m) => m.WebGLImage),
  { ssr: false }
);

const heroImage =
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=75";

/** Primary keyword in the single page <h1> (SEO). */
const titleWords = ["Cinematic", "Photography"];

export function Hero() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const immersive = useImmersiveOptional();
  const preset = getLayoutPreset(immersive?.layoutVariant ?? "cinematic-full");
  const { x, y } = useMousePosition();
  const imageRef = useRef<HTMLDivElement>(null);

  const composition = preset.hero.composition;
  const titleScale = preset.hero.titleScale;
  const webgl = immersive?.webglEnabled ?? false;

  useEffect(() => {
    if (reduced || !imageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.08,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  const glowX =
    mounted && typeof window !== "undefined"
      ? (x / window.innerWidth) * 100
      : 50;
  const glowY =
    mounted && typeof window !== "undefined"
      ? (y / window.innerHeight) * 100
      : 50;

  const titleClass = cn(
    "font-display leading-[0.9] tracking-tight text-[var(--foreground)]",
    titleScale === "oversized" && "text-[clamp(3rem,12vw,9rem)]",
    titleScale === "balanced" && "text-[clamp(2.5rem,10vw,7rem)]",
    titleScale === "refined" && "text-[clamp(2rem,8vw,5.5rem)]"
  );

  const isSplit = composition === "split";
  const isCentered = composition === "centered";
  const isCollage = composition === "collage";

  return (
    <section
      className={cn(
        "relative flex min-h-[100dvh] overflow-hidden",
        isSplit ? "items-center" : "items-end",
        isCentered && "items-center justify-center text-center"
      )}
      aria-label="Hero"
    >
      <motion.div
        ref={imageRef}
        className={cn(
          "absolute scale-105",
          isSplit ? "right-0 top-0 h-full w-[55%]" : "inset-0",
          isCollage && "left-[20%] top-[10%] h-[80%] w-[60%] rounded-sm"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        {webgl && composition === "fullscreen" ? (
          <WebGLImage
            src={heroImage}
            alt="Cinematic photography hero"
            className="h-full w-full"
            interactive
          />
        ) : (
          <Image
            src={heroImage}
            alt="Cinematic photography hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        )}
      </motion.div>

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[var(--background)]",
          isSplit && "bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent"
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />

      {mounted && !reduced && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(139, 168, 193, 0.15), transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}

      <div
        className="ambient-orb absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="ambient-orb absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-amber-500/5 blur-[100px]"
        style={{ animationDelay: "-4s" }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-0 grid-lines opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, delay: 0.5 }}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10",
          isSplit ? "py-32 md:max-w-[45%] md:pl-10" : "pb-24 pt-32 md:pb-32",
          isCentered && "flex flex-col items-center"
        )}
      >
        <motion.p
          className="mb-6 text-xs tracking-[0.4em] uppercase text-[var(--muted)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {siteConfig.tagline}
        </motion.p>

        <h1 className={cn("max-w-5xl block", isCentered && "mx-auto")}>
          {titleWords.map((word, i) => (
            <span key={word} className="block">
              <CinematicText
                text={word}
                as="span"
                className={cn(titleClass, "block")}
                delay={0.4 + i * 0.15}
                splitBy="char"
              />
            </span>
          ))}
        </h1>
        <p
          className={cn(
            "mt-4 max-w-xl font-serif text-xl text-[var(--muted)] md:text-2xl",
            isCentered && "mx-auto text-center"
          )}
        >
          Visual stories in light
        </p>

        <motion.div
          className={cn(
            "mt-12 flex flex-col gap-6",
            !isCentered && "md:flex-row md:items-end md:justify-between",
            isCentered && "items-center"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p
            className={cn(
              "max-w-md text-sm leading-relaxed text-[var(--muted)] md:text-base",
              isCentered && "text-center"
            )}
          >
            {siteConfig.name} is an award-winning cinematic photographer
            creating fashion editorials, portraits, weddings, and editorial
            campaigns at the intersection of cinema, emotion, and light.
          </p>
          <div className="flex items-center gap-8 text-xs tracking-[0.3em] uppercase text-[var(--muted)]">
            <span>{siteConfig.location}</span>
            <span className="h-px w-8 bg-white/20" aria-hidden="true" />
            <span>Est. 2012</span>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        aria-label="Scroll to work"
        data-cursor="scroll"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}
