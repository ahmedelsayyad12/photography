"use client";

import dynamic from "next/dynamic";

const FilmGrain = dynamic(
  () => import("@/components/FilmGrain").then((m) => m.FilmGrain),
  { ssr: false }
);

const FuturisticCursor = dynamic(
  () => import("@/components/FuturisticCursor").then((m) => m.FuturisticCursor),
  { ssr: false }
);

/** Paint/cursor effects — deferred to protect FCP, LCP, and TBT on mobile. */
export function DeferredEffects() {
  return (
    <>
      <FuturisticCursor />
      <FilmGrain />
    </>
  );
}
