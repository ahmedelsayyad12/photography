"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { ImmersiveContext } from "@/context/ImmersiveContext";
import {
  resolveLayoutVariant,
  type LayoutVariant,
} from "@/lib/layout-engine";
import {
  getSoundEnabled,
  setSoundEnabledStorage,
  setLayoutVariantStorage,
  subscribeClientStore,
} from "@/lib/client-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMounted } from "@/hooks/useMounted";

const noopSubscribe = () => () => {};

function getFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getLayoutSnapshot(): LayoutVariant {
  return resolveLayoutVariant("/");
}

export function ImmersiveProvider({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const finePointer = useSyncExternalStore(
    noopSubscribe,
    getFinePointer,
    () => false
  );

  const layoutVariant = useSyncExternalStore(
    subscribeClientStore,
    getLayoutSnapshot,
    (): LayoutVariant => "cinematic-full"
  );

  const soundEnabled = useSyncExternalStore(
    subscribeClientStore,
    getSoundEnabled,
    () => false
  );

  /** Skip intro on first paint — avoids blocking LCP/INP on mobile. */
  const [introComplete, setIntroComplete] = useState(true);

  const toggleSound = useCallback((enabled: boolean) => {
    setSoundEnabledStorage(enabled);
  }, []);

  const setLayoutVariant = useCallback((variant: LayoutVariant) => {
    setLayoutVariantStorage(variant);
  }, []);

  const webglEnabled = mounted && finePointer && !reduced;

  const value = useMemo(
    () => ({
      introComplete: reduced ? true : introComplete,
      setIntroComplete,
      soundEnabled: reduced ? false : soundEnabled,
      setSoundEnabled: toggleSound,
      grainIntensity: reduced ? 0.02 : 0.045,
      layoutVariant,
      setLayoutVariant,
      webglEnabled,
    }),
    [
      introComplete,
      soundEnabled,
      toggleSound,
      layoutVariant,
      setLayoutVariant,
      webglEnabled,
      reduced,
    ]
  );

  return (
    <ImmersiveContext.Provider value={value}>{children}</ImmersiveContext.Provider>
  );
}
