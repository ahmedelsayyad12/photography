"use client";

import dynamic from "next/dynamic";
import { ImmersiveProvider } from "@/components/providers/ImmersiveProvider";
import { ScrollVelocityLayer } from "@/components/ScrollVelocityLayer";
import { SceneMoodProvider } from "@/context/SceneMoodContext";

const CinematicIntro = dynamic(
  () => import("@/components/CinematicIntro").then((m) => m.CinematicIntro),
  { ssr: false }
);
const DynamicLighting = dynamic(
  () => import("@/components/DynamicLighting").then((m) => m.DynamicLighting),
  { ssr: false }
);
const NoiseTexture = dynamic(
  () => import("@/components/NoiseTexture").then((m) => m.NoiseTexture),
  { ssr: false }
);
const SoundToggle = dynamic(
  () => import("@/components/SoundToggle").then((m) => m.SoundToggle),
  { ssr: false }
);
const LayoutVariantSwitcher = dynamic(
  () =>
    import("@/components/LayoutVariantSwitcher").then(
      (m) => m.LayoutVariantSwitcher
    ),
  { ssr: false }
);

const ParticleField = dynamic(
  () => import("@/components/fx/ParticleField").then((m) => m.ParticleField),
  { ssr: false }
);
const EnvironmentLayer = dynamic(
  () =>
    import("@/components/fx/EnvironmentLayer").then((m) => m.EnvironmentLayer),
  { ssr: false }
);
const MuseumBackdrop = dynamic(
  () => import("@/components/museum/MuseumBackdrop").then((m) => m.MuseumBackdrop),
  { ssr: false }
);

export function ImmersiveShell({ children }: { children: React.ReactNode }) {
  return (
    <ImmersiveProvider>
      <SceneMoodProvider>
        <MuseumBackdrop />
        <EnvironmentLayer />
        <ParticleField />
        <CinematicIntro />
        <DynamicLighting />
        <NoiseTexture />
        <SoundToggle />
        <LayoutVariantSwitcher />
        <ScrollVelocityLayer>{children}</ScrollVelocityLayer>
      </SceneMoodProvider>
    </ImmersiveProvider>
  );
}
