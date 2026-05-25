import { siteConfig } from "@/data/photography";

/**
 * Server-rendered body copy — raises word count & text-to-HTML ratio for crawlers.
 */
export function SeoContent() {
  return (
    <section
      className="border-t border-white/5 bg-[var(--background)]"
      aria-labelledby="seo-services-heading"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
        <h2
          id="seo-services-heading"
          className="font-serif text-3xl text-[var(--foreground)] md:text-4xl"
        >
          Photography Services & Portfolio
        </h2>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-base leading-relaxed text-[var(--muted)]">
            <p>
              Welcome to the official portfolio of {siteConfig.name}, a cinematic
              photographer based in {siteConfig.location}. This website showcases
              commissioned work across fashion editorials, luxury portraits,
              destination weddings, street documentary, nature landscapes, and
              black-and-white fine art series. Every gallery image represents a
              directed narrative: lighting, wardrobe, location, and post-production
              are planned together so the final photographs feel cohesive on web,
              social, and print.
            </p>
            <p>
              Clients choose this studio when they need photography that reads at
              billboard scale and still feels intimate in an album. Sessions include
              pre-production mood boards, on-set direction, tethered review, and
              professional color grading. Whether you are planning a Vogue-style
              editorial, a destination wedding in Europe, or a corporate portrait
              campaign, the process stays structured and collaborative from first
              call to final delivery.
            </p>
            <p>
              Use the work section to filter portraits, fashion, street, nature,
              weddings, editorial, and monochrome collections. Each category links
              to curated frames with location, year, and camera metadata where
              available. The stories section highlights long-form visual essays,
              while the about page outlines career milestones, publications, and
              studio philosophy.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs tracking-[0.3em] uppercase text-[var(--accent)]">
              What we photograph
            </h3>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--muted)]">
              <li>
                <strong className="text-[var(--foreground)]">Fashion photography</strong>{" "}
                — lookbooks, runway, and luxury brand campaigns with cinematic lighting.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Portrait photography</strong>{" "}
                — editorial headshots, actor portfolios, and personal branding sessions.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Wedding photography</strong>{" "}
                — full-weekend coverage with documentary and fine-art approaches.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Editorial photography</strong>{" "}
                — magazine layouts, cover stories, and press features.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Street & travel</strong>{" "}
                — urban reportage and location scouting for campaigns abroad.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Commercial commissions</strong>{" "}
                — product, hospitality, and lifestyle content for global brands.
              </li>
            </ul>

            <h3 className="mb-4 mt-10 text-xs tracking-[0.3em] uppercase text-[var(--accent)]">
              Book a session
            </h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Contact the studio via the inquiry form for availability, rates, and
              travel schedules. Email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[var(--foreground)] underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              or call {siteConfig.phone} to discuss your project timeline, shot list,
              and deliverables. International assignments are accepted with sufficient
              lead time for permits, crew, and equipment logistics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
