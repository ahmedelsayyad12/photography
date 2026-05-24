"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { sceneMoods, type SceneMood, type SceneMoodId } from "@/lib/scene-moods";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SceneMoodContextValue {
  mood: SceneMood;
  moodId: SceneMoodId;
}

const SceneMoodContext = createContext<SceneMoodContextValue>({
  mood: sceneMoods.hero,
  moodId: "hero",
});

export function useSceneMood() {
  return useContext(SceneMoodContext);
}

export function SceneMoodProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [moodId, setMoodId] = useState<SceneMoodId>("hero");

  const observeMoods = useCallback(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-scene-mood]");
    if (!nodes.length) return () => undefined;

    const ratios = new Map<SceneMoodId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-scene-mood") as SceneMoodId;
          if (!id || !(id in sceneMoods)) return;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let best: SceneMoodId = "hero";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });

        if (bestRatio > 0.08) {
          setMoodId((prev) => (prev === best ? prev : best));
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const cleanup = observeMoods();
    const onResize = () => {
      cleanup?.();
      observeMoods();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cleanup?.();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, observeMoods]);

  const mood = sceneMoods[moodId];

  return (
    <SceneMoodContext.Provider value={{ mood, moodId }}>
      {children}
    </SceneMoodContext.Provider>
  );
}
