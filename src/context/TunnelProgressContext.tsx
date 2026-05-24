"use client";

import { createContext, useContext, type RefObject } from "react";

export interface TunnelProgressStore {
  progressRef: RefObject<number>;
}

const TunnelProgressContext = createContext<TunnelProgressStore | null>(null);

export function TunnelProgressProvider({
  children,
  progressRef,
}: {
  children: React.ReactNode;
  progressRef: RefObject<number>;
}) {
  return (
    <TunnelProgressContext.Provider value={{ progressRef }}>
      {children}
    </TunnelProgressContext.Provider>
  );
}

export function useTunnelProgressRef() {
  const ctx = useContext(TunnelProgressContext);
  if (!ctx) {
    throw new Error("useTunnelProgressRef must be used inside TunnelProgressProvider");
  }
  return ctx.progressRef;
}
