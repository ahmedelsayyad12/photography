import { siteConfig, navLinks } from "@/data/photography";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12 md:py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-3xl text-[var(--foreground)] md:text-4xl">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[var(--muted)]">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={siteConfig.social.instagram}
              className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.behance}
              className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Behance
            </a>
            <a
              href={siteConfig.social.vimeo}
              className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vimeo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
