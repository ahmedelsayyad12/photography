type Listener = () => void;

const listeners = new Set<Listener>();

export function subscribeClientStore(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifyClientStore() {
  listeners.forEach((l) => l());
}

export function getSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("portfolio-sound") === "1";
}

export function setSoundEnabledStorage(enabled: boolean) {
  localStorage.setItem("portfolio-sound", enabled ? "1" : "0");
  notifyClientStore();
}

export function setLayoutVariantStorage(variant: string) {
  localStorage.setItem("portfolio-layout-variant", variant);
  notifyClientStore();
}
