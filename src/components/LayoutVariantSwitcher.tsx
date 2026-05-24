"use client";

import { useState } from "react";
import { layoutPresets, type LayoutVariant } from "@/lib/layout-engine";
import { useImmersiveOptional } from "@/context/ImmersiveContext";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

const variants = Object.keys(layoutPresets) as LayoutVariant[];

export function LayoutVariantSwitcher() {
  const mounted = useMounted();
  const immersive = useImmersiveOptional();
  const [open, setOpen] = useState(false);

  if (!mounted || !immersive) return null;

  const { layoutVariant, setLayoutVariant } = immersive;
  const preset = layoutPresets[layoutVariant];

  return (
    <div className="fixed top-24 right-6 z-[75] hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase text-[var(--muted)] backdrop-blur transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
        aria-expanded={open}
        aria-label="Switch layout composition"
        data-cursor="hover"
      >
        {preset.label}
      </button>

      {open && (
        <ul
          className="glass-panel absolute right-0 mt-2 min-w-[180px] overflow-hidden rounded-sm border border-white/10 py-1"
          role="listbox"
          aria-label="Layout presets"
        >
          {variants.map((id) => (
            <li key={id} role="option" aria-selected={layoutVariant === id}>
              <button
                type="button"
                onClick={() => {
                  setLayoutVariant(id);
                  setOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-[10px] tracking-[0.15em] uppercase transition-colors",
                  layoutVariant === id
                    ? "bg-[var(--accent)]/10 text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-white/5 hover:text-[var(--foreground)]"
                )}
                data-cursor="hover"
              >
                {layoutPresets[id].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
