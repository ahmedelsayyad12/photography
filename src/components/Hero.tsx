import { HeroEffects } from "@/components/hero/HeroEffects";
import { HeroShell } from "@/components/hero/HeroShell";

/** Server LCP shell + client enhancements (deferred GSAP). */
export function Hero() {
  return (
    <div className="relative">
      <HeroShell />
      <HeroEffects />
    </div>
  );
}
