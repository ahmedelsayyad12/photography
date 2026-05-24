"use client";

import { createContext, useContext } from "react";
import type { LayoutVariant } from "@/lib/layout-engine";

export interface ImmersiveState {
  introComplete: boolean;
  setIntroComplete: (v: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  grainIntensity: number;
  layoutVariant: LayoutVariant;
  setLayoutVariant: (variant: LayoutVariant) => void;
  webglEnabled: boolean;
}

const ImmersiveContext = createContext<ImmersiveState | null>(null);

export function useImmersive() {
  const ctx = useContext(ImmersiveContext);
  if (!ctx) throw new Error("useImmersive must be used within ImmersiveProvider");
  return ctx;
}

export function useImmersiveOptional() {
  return useContext(ImmersiveContext);
}

export { ImmersiveContext };
