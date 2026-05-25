import { siteConfig } from "@/data/photography";

/** Crawlable overview copy — improves text depth without changing the visual hero. */
export function SiteIntro() {
  return (
    <section
      className="border-t border-white/5"
      aria-labelledby="site-intro-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-16">
        <h2
          id="site-intro-heading"
          className="font-serif text-2xl text-[var(--foreground)] md:text-3xl"
        >
          Professional Cinematic Photography
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
          <p>
            {siteConfig.name} is an award-winning cinematic photographer
            specializing in fashion editorials, intimate portraits, destination
            weddings, street documentary, and magazine-ready editorial campaigns.
            Each project is built around natural light, deliberate composition,
            and narrative depth — the same principles used in feature filmmaking
            applied to still photography.
          </p>
          <p>
            Based in {siteConfig.location}, the studio works with luxury brands,
            creative agencies, and private clients worldwide. Browse the portfolio
            for recent work across portraits, fashion, weddings, and editorial
            collections, or use the contact form to discuss commissions and
            availability.
          </p>
        </div>
      </div>
    </section>
  );
}
