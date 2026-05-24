"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { horizontalPanels } from "@/data/photography";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (reduced || !section || !track) return;

    let scrollDistance = 0;
    let trigger: ScrollTrigger | null = null;

    const measure = () => {
      return Math.max(track.scrollWidth - window.innerWidth, 0);
    };

    const applyLayout = () => {
      scrollDistance = measure();
      const scrollLength = scrollDistance + window.innerHeight;
      section.style.height = `${scrollLength}px`;
    };

    const build = () => {
      if (trigger) {
        trigger.kill();
        trigger = null;
      }

      applyLayout();

      if (scrollDistance <= 0) {
        gsap.set(track, { x: 0 });
        return;
      }

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(track, { x: -scrollDistance * self.progress });
        },
      });
    };

    const ctx = gsap.context(() => {
      build();
    }, section);

    const images = track.querySelectorAll("img");
    let pendingRefresh: ReturnType<typeof setTimeout> | null = null;

    const scheduleRebuild = () => {
      if (pendingRefresh) clearTimeout(pendingRefresh);
      pendingRefresh = setTimeout(() => {
        pendingRefresh = null;
        build();
        ScrollTrigger.refresh();
      }, 150);
    };

    if (images.length) {
      let loaded = 0;
      const onLoad = () => {
        loaded += 1;
        if (loaded >= images.length) scheduleRebuild();
      };
      images.forEach((img) => {
        if (img.complete) onLoad();
        else img.addEventListener("load", onLoad, { once: true });
      });
    }

    const onResize = () => scheduleRebuild();
    window.addEventListener("resize", onResize);

    scheduleRebuild();

    return () => {
      if (pendingRefresh) clearTimeout(pendingRefresh);
      window.removeEventListener("resize", onResize);
      ctx.revert();
      section.style.height = "";
      gsap.set(track, { clearProps: "x" });
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section
        id="stories"
        className="section-padding"
        aria-labelledby="stories-heading"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 id="stories-heading" className="font-serif text-4xl mb-12">
            Stories
          </h2>
          <div className="flex flex-col gap-8">
            {horizontalPanels.map((panel) => (
              <article
                key={panel.id}
                className="relative aspect-[16/10] overflow-hidden rounded-sm"
              >
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="font-serif text-3xl text-white">{panel.title}</h3>
                  <p className="text-sm text-white/70">{panel.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative w-full"
      data-cursor="scroll"
      aria-labelledby="stories-heading"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute left-6 top-8 z-10 md:left-10 md:top-12">
          <p className="mb-2 text-xs tracking-[0.4em] uppercase text-[var(--accent)]">
            Exhibition
          </p>
          <h2
            id="stories-heading"
            className="font-serif text-3xl text-[var(--foreground)] md:text-5xl"
          >
            Visual Stories
          </h2>
          <p className="mt-3 hidden text-[10px] tracking-[0.25em] uppercase text-[var(--muted)] md:block">
            Scroll to explore →
          </p>
        </div>

        <div
          ref={trackRef}
          className="flex h-full w-max min-w-full items-center gap-6 px-6 will-change-transform md:gap-10 md:px-10"
        >
          {horizontalPanels.map((panel, i) => (
            <article
              key={panel.id}
              className="relative flex h-[70vh] w-[85vw] shrink-0 flex-col justify-end overflow-hidden rounded-sm md:w-[70vw] lg:w-[55vw]"
            >
              <div className="absolute inset-0">
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  className="object-cover"
                  sizes="70vw"
                  priority={i === 0}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 p-8 md:p-12">
                <p className="mb-2 text-xs tracking-[0.3em] uppercase text-[var(--accent)]">
                  {panel.subtitle}
                </p>
                <h3 className="font-serif text-4xl text-white md:text-6xl">
                  {panel.title}
                </h3>
                <p className="mt-4 max-w-md text-sm text-white/60">
                  {panel.description}
                </p>
              </div>
              <span className="absolute right-8 top-8 font-serif text-6xl text-white/10 md:text-8xl">
                {String(i + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
          <div className="flex w-[30vw] min-w-[200px] shrink-0 items-center justify-center md:w-[20vw]">
            <a
              href="#contact"
              className="text-xs tracking-[0.3em] uppercase text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              data-cursor="hover"
            >
              View All Collections →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
