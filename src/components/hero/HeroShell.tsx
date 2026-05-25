import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/photography";
import { HERO_IMAGE_ALT, HERO_IMAGE_SRC } from "@/lib/lcp";
import { cn } from "@/lib/utils";

/**
 * Server-rendered hero: stable LCP image + crawlable H1 (fixes “No H1” SEO audits).
 */
export function HeroShell({ className }: { className?: string }) {
  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-[100dvh] items-end overflow-hidden",
        className
      )}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 min-h-[100dvh] w-full">
        <Image
          id="hero-lcp-image"
          src={HERO_IMAGE_SRC}
          alt={HERO_IMAGE_ALT}
          fill
          priority
          fetchPriority="high"
          quality={75}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[var(--background)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 pt-32 md:pb-32 md:px-10">
        <p className="mb-6 text-xs tracking-[0.4em] uppercase text-[var(--muted)]">
          {siteConfig.tagline}
        </p>

        <h1
          id="hero-heading"
          className="font-display max-w-5xl text-[clamp(2.5rem,10vw,7rem)] leading-[0.9] tracking-tight text-[var(--foreground)]"
        >
          Cinematic Photography
        </h1>
        <p className="mt-4 max-w-xl font-serif text-xl text-[var(--muted)] md:text-2xl">
          Visual stories in light — {siteConfig.name}
        </p>

        <p className="mt-12 max-w-md text-sm leading-relaxed text-[var(--muted)] md:text-base">
          {siteConfig.name} is an award-winning cinematic photographer creating
          fashion editorials, portraits, weddings, and editorial campaigns at the
          intersection of cinema, emotion, and light. Based in {siteConfig.location}.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6 text-xs tracking-[0.3em] uppercase text-[var(--muted)]">
          <span>{siteConfig.location}</span>
          <span className="h-px w-8 bg-white/20" aria-hidden="true" />
          <span>Est. 2012</span>
          <Link
            href="#work"
            className="text-[var(--accent)] transition-opacity hover:opacity-80"
          >
            View portfolio
          </Link>
        </div>
      </div>

      <a
        href="#work"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        aria-label="Scroll to photography portfolio"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
