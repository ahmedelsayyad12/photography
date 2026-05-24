"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useImmersive } from "@/context/ImmersiveContext";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import { cn } from "@/lib/utils";

export function SoundToggle() {
  const { soundEnabled, setSoundEnabled } = useImmersive();
  useAmbientSound(soundEnabled);

  return (
    <button
      type="button"
      onClick={() => setSoundEnabled(!soundEnabled)}
      className={cn(
        "fixed bottom-6 left-6 z-[80] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[var(--background)]/60 backdrop-blur-md transition-all duration-500 hover:border-[var(--accent)]/40 hover:shadow-[0_0_30px_var(--accent-glow)]",
        soundEnabled && "text-[var(--accent)]"
      )}
      aria-label={soundEnabled ? "Disable ambient sound" : "Enable ambient sound"}
      aria-pressed={soundEnabled}
      data-cursor="hover"
    >
      {soundEnabled ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4 text-[var(--muted)]" />
      )}
    </button>
  );
}
