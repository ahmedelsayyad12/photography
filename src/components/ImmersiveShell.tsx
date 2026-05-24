"use client";

import { ImmersiveProvider } from "@/components/providers/ImmersiveProvider";
import { CinematicIntro } from "@/components/CinematicIntro";
import { DynamicLighting } from "@/components/DynamicLighting";
import { NoiseTexture } from "@/components/NoiseTexture";
import { SoundToggle } from "@/components/SoundToggle";
import { ScrollVelocityLayer } from "@/components/ScrollVelocityLayer";
import { LayoutVariantSwitcher } from "@/components/LayoutVariantSwitcher";
import { SceneMoodProvider } from "@/context/SceneMoodContext";
import { ParticleField } from "@/components/fx/ParticleField";
import { EnvironmentLayer } from "@/components/fx/EnvironmentLayer";
import { MuseumBackdrop } from "@/components/museum/MuseumBackdrop";

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
