"use client";

import { layoutPresets } from "@/lib/layout-engine";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { useMounted } from "@/hooks/useMounted";

/** Dev-friendly indicator of active layout preset (client-only to avoid hydration drift) */
export function LayoutVariantBadge() {
  const mounted = useMounted();
  const immersive = useImmersiveOptional();
  if (!mounted || !immersive) return null;

  const preset = layoutPresets[immersive.layoutVariant];

  return (
    <div
      className="fixed top-24 right-6 z-[75] hidden rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase text-[var(--muted)] backdrop-blur md:block"
      aria-hidden="true"
    >
      {preset.label}
    </div>
  );
}
