export type SceneMoodId =
  | "hero"
  | "museum"
  | "featured"
  | "work"
  | "stories"
  | "about"
  | "collections"
  | "lens"
  | "awards"
  | "testimonials"
  | "contact";

export interface SceneMood {
  id: SceneMoodId;
  label: string;
  beamPrimary: string;
  beamSecondary: string;
  ambientGradient: string;
  particleOpacity: number;
}

export const sceneMoods: Record<SceneMoodId, SceneMood> = {
  hero: {
    id: "hero",
    label: "Noir Prelude",
    beamPrimary: "rgba(139, 168, 193, 0.08)",
    beamSecondary: "rgba(196, 165, 116, 0.05)",
    ambientGradient:
      "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(139,168,193,0.12), transparent 72%)",
    particleOpacity: 0.35,
  },
  museum: {
    id: "museum",
    label: "Deep Tunnel",
    beamPrimary: "rgba(100, 130, 180, 0.1)",
    beamSecondary: "rgba(60, 80, 120, 0.06)",
    ambientGradient:
      "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(80,110,160,0.15), transparent 80%)",
    particleOpacity: 0.5,
  },
  featured: {
    id: "featured",
    label: "Editorial Light",
    beamPrimary: "rgba(196, 165, 116, 0.07)",
    beamSecondary: "rgba(139, 168, 193, 0.04)",
    ambientGradient:
      "radial-gradient(ellipse 80% 55% at 30% 20%, rgba(196,165,116,0.1), transparent 70%)",
    particleOpacity: 0.3,
  },
  work: {
    id: "work",
    label: "Gallery Void",
    beamPrimary: "rgba(139, 168, 193, 0.06)",
    beamSecondary: "rgba(255, 255, 255, 0.03)",
    ambientGradient:
      "radial-gradient(ellipse 100% 70% at 50% 100%, rgba(139,168,193,0.08), transparent 65%)",
    particleOpacity: 0.28,
  },
  stories: {
    id: "stories",
    label: "Exhibition Drift",
    beamPrimary: "rgba(180, 150, 200, 0.06)",
    beamSecondary: "rgba(139, 168, 193, 0.05)",
    ambientGradient:
      "radial-gradient(ellipse 85% 50% at 80% 40%, rgba(160,140,200,0.09), transparent 75%)",
    particleOpacity: 0.38,
  },
  about: {
    id: "about",
    label: "Portrait Warmth",
    beamPrimary: "rgba(196, 165, 116, 0.08)",
    beamSecondary: "rgba(139, 168, 193, 0.04)",
    ambientGradient:
      "radial-gradient(ellipse 75% 60% at 20% 50%, rgba(196,165,116,0.11), transparent 68%)",
    particleOpacity: 0.25,
  },
  collections: {
    id: "collections",
    label: "Archive Glow",
    beamPrimary: "rgba(139, 168, 193, 0.07)",
    beamSecondary: "rgba(196, 165, 116, 0.06)",
    ambientGradient:
      "radial-gradient(ellipse 90% 55% at 50% 30%, rgba(139,168,193,0.1), transparent 70%)",
    particleOpacity: 0.32,
  },
  lens: {
    id: "lens",
    label: "Behind the Curtain",
    beamPrimary: "rgba(120, 120, 140, 0.07)",
    beamSecondary: "rgba(80, 90, 110, 0.05)",
    ambientGradient:
      "radial-gradient(ellipse 60% 80% at 70% 60%, rgba(100,110,140,0.1), transparent 72%)",
    particleOpacity: 0.22,
  },
  awards: {
    id: "awards",
    label: "Prestige",
    beamPrimary: "rgba(196, 165, 116, 0.09)",
    beamSecondary: "rgba(139, 168, 193, 0.04)",
    ambientGradient:
      "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(196,165,116,0.12), transparent 68%)",
    particleOpacity: 0.2,
  },
  testimonials: {
    id: "testimonials",
    label: "Voices",
    beamPrimary: "rgba(139, 168, 193, 0.05)",
    beamSecondary: "rgba(196, 165, 116, 0.05)",
    ambientGradient:
      "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,168,193,0.07), transparent 75%)",
    particleOpacity: 0.18,
  },
  contact: {
    id: "contact",
    label: "Invitation",
    beamPrimary: "rgba(139, 168, 193, 0.1)",
    beamSecondary: "rgba(196, 165, 116, 0.08)",
    ambientGradient:
      "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(139,168,193,0.14), transparent 60%)",
    particleOpacity: 0.3,
  },
};
