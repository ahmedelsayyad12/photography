"use client";

import { useEffect, useState } from "react";
import type { CursorState } from "@/types/cursor";

function resolveState(target: HTMLElement | null): CursorState {
  if (!target) return "explore";
  if (target.closest("[data-cursor='drag'], .gallery-item")) return "drag";
  if (target.closest("[data-cursor='open'], [role='dialog']")) return "open";
  if (target.closest("[data-cursor='view'], .h-panel")) return "view";
  if (target.closest("[data-cursor='scroll'], #stories")) return "scroll";
  if (target.closest("[data-cursor='play'], video, [data-play]")) return "play";
  if (target.closest("a, button, .magnetic, [data-cursor='hover']")) return "view";
  return "explore";
}

export function useCursorState(enabled: boolean) {
  const [state, setState] = useState<CursorState>("explore");

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      setState(resolveState(e.target as HTMLElement));
    };
    document.addEventListener("mouseover", onMove, { passive: true });
    return () => document.removeEventListener("mouseover", onMove);
  }, [enabled]);

  return state;
}
