"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False during SSR/hydration; true after the client has mounted. */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
