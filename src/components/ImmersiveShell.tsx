"use client";

import dynamic from "next/dynamic";
import { ImmersiveProvider } from "@/components/providers/ImmersiveProvider";
import { CinematicIntro } from "@/components/CinematicIntro";
import { DynamicLighting } from "@/components/DynamicLighting";
import { NoiseTexture } from "@/components/NoiseTexture";
import { SoundToggle } from "@/components/SoundToggle";
import { ScrollVelocityLayer } from "@/components/ScrollVelocityLayer";
import { LayoutVariantSwitcher } from "@/components/LayoutVariantSwitcher";
import { SceneMoodProvider } from "@/context/SceneMoodContext";

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
