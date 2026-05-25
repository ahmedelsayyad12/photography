"use client";

import { useEffect, useState } from "react";
import { useScrollVelocity } from "@/context/ScrollContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data/photography";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScrollVelocity();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const scrolled = scrollY > 60;

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out",
          scrolled
            ? "glass-panel border-b border-white/10 py-4"
            : "bg-transparent py-6 md:py-8"
        )}
      >
        <nav
          className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10"
          aria-label="Main navigation"
        >
          <a
            href="#"
            className="font-serif text-lg tracking-[0.2em] text-[var(--foreground)] uppercase"
            data-cursor="hover"
          >
            {siteConfig.name.split(" ")[0]}
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative text-xs tracking-[0.25em] uppercase text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    data-cursor="hover"
                    aria-label={`Go to ${link.label} section`}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px bg-[var(--accent)] transition-all duration-500",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="hidden text-xs tracking-[0.2em] uppercase text-[var(--accent)] transition-opacity hover:opacity-70 md:block"
            data-cursor="hover"
          >
            Inquire
          </a>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-[var(--foreground)] md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col holo-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-serif text-lg tracking-[0.2em] uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-4xl text-[var(--foreground)] holo-text-shift"
                  initial={{ opacity: 0, x: -32, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  data-cursor="view"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
