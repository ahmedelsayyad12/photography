"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/photography";
import { MagneticButton } from "./MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Please complete all required fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    await new Promise((r) => setTimeout(r, 600));

    const subject = encodeURIComponent(
      `Inquiry from ${name} — ${data.get("project") || "Photography"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject: ${data.get("project")}\n\n${message}`
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    form.reset();
  };

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--accent-glow),transparent_60%)] opacity-30"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div data-velocity-shift>
            <p className="mb-3 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
              Get in Touch
            </p>
            <h2
              id="contact-heading"
              className="font-display text-4xl leading-tight text-[var(--foreground)] md:text-7xl"
            >
              Let&apos;s Create Something Beautiful
            </h2>
            <p className="mt-6 max-w-md text-[var(--muted)]">
              Available for commissions, editorial projects, weddings, and brand
              campaigns worldwide.
            </p>

            <ul className="mt-10 space-y-6">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-4 text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                  data-cursor="hover"
                >
                  <Mail className="h-4 w-4 text-[var(--accent)]" />
                  <span>{siteConfig.email}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li className="flex items-center gap-4 text-[var(--muted)]">
                <Phone className="h-4 w-4 text-[var(--accent)]" />
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-center gap-4 text-[var(--muted)]">
                <MapPin className="h-4 w-4 text-[var(--accent)]" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
          </div>

          <motion.form
            className="flex flex-col gap-6"
            initial={reduced ? {} : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted)]">
                  Name
                </span>
                <Input type="text" name="name" required placeholder="Your name" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted)]">
                  Email
                </span>
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted)]">
                Project Type
              </span>
              <select
                name="project"
                className="border-b border-white/10 bg-transparent py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a project type
                </option>
                <option value="editorial">Editorial</option>
                <option value="fashion">Fashion Campaign</option>
                <option value="wedding">Wedding</option>
                <option value="portrait">Portrait Session</option>
                <option value="commercial">Commercial</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--muted)]">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                required
                className="resize-none border-b border-white/10 bg-transparent py-3 text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)]"
                placeholder="Tell me about your vision..."
              />
            </label>

            {error && (
              <p className="text-sm text-red-300/90" role="alert">
                {error}
              </p>
            )}
            {status === "success" && (
              <p className="text-sm text-[var(--accent)]" role="status">
                Thank you — your mail client will open to send your inquiry.
              </p>
            )}

            <MagneticButton
              type="submit"
              className={cn("self-start mt-4", status === "submitting" && "opacity-70")}
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send Inquiry"}
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
