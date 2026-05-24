export type LayoutVariant =
  | "cinematic-full"
  | "split-editorial"
  | "minimal-centered"
  | "collage-asymmetric";

export interface LayoutPreset {
  id: LayoutVariant;
  label: string;
  hero: {
    composition: "fullscreen" | "split" | "centered" | "collage";
    titleScale: "oversized" | "balanced" | "refined";
    imagePosition: "background" | "left" | "right" | "floating";
  };
  featured: {
    grid: "asymmetric" | "uniform" | "masonry-float" | "single-hero";
    gap: "tight" | "editorial" | "airy";
  };
  gallery: {
    columns: { mobile: number; tablet: number; desktop: number };
    hover: "zoom" | "tilt" | "distort";
  };
}

export const layoutPresets: Record<LayoutVariant, LayoutPreset> = {
  "cinematic-full": {
    id: "cinematic-full",
    label: "Cinematic Full",
    hero: {
      composition: "fullscreen",
      titleScale: "oversized",
      imagePosition: "background",
    },
    featured: {
      grid: "asymmetric",
      gap: "editorial",
    },
    gallery: { columns: { mobile: 1, tablet: 2, desktop: 3 }, hover: "distort" },
  },
  "split-editorial": {
    id: "split-editorial",
    label: "Split Editorial",
    hero: {
      composition: "split",
      titleScale: "balanced",
      imagePosition: "right",
    },
    featured: {
      grid: "uniform",
      gap: "tight",
    },
    gallery: { columns: { mobile: 1, tablet: 2, desktop: 2 }, hover: "tilt" },
  },
  "minimal-centered": {
    id: "minimal-centered",
    label: "Minimal Centered",
    hero: {
      composition: "centered",
      titleScale: "refined",
      imagePosition: "background",
    },
    featured: {
      grid: "single-hero",
      gap: "airy",
    },
    gallery: { columns: { mobile: 1, tablet: 2, desktop: 3 }, hover: "zoom" },
  },
  "collage-asymmetric": {
    id: "collage-asymmetric",
    label: "Collage Asymmetric",
    hero: {
      composition: "collage",
      titleScale: "oversized",
      imagePosition: "floating",
    },
    featured: {
      grid: "masonry-float",
      gap: "editorial",
    },
    gallery: { columns: { mobile: 1, tablet: 2, desktop: 3 }, hover: "distort" },
  },
};

const variants: LayoutVariant[] = [
  "cinematic-full",
  "split-editorial",
  "minimal-centered",
  "collage-asymmetric",
];

/** Deterministic variant from pathname or optional seed */
export function resolveLayoutVariant(pathname = "/", seed?: string): LayoutVariant {
  if (seed && seed in layoutPresets) return seed as LayoutVariant;
  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem("portfolio-layout-variant")
      : null;
  if (stored && stored in layoutPresets) return stored as LayoutVariant;

  let hash = 0;
  const str = pathname + (seed ?? "");
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return variants[Math.abs(hash) % variants.length];
}

export function getLayoutPreset(variant: LayoutVariant): LayoutPreset {
  return layoutPresets[variant];
}
