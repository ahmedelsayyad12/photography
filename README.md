# Cinematic Photography Portfolio

A premium, award-level photography portfolio built with Next.js, Framer Motion, GSAP ScrollTrigger, and Lenis smooth scrolling.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — UI animations
- **GSAP + ScrollTrigger** — horizontal scroll storytelling
- **Lenis** — smooth scrolling
- **Three.js + React Three Fiber** — WebGL image transitions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Layout, page, global styles
├── components/       # UI sections & effects
├── data/             # Mock photography content
├── hooks/            # Reusable hooks
├── lib/              # Utilities
└── types/            # TypeScript types
```

## Sections

1. Hero — cinematic fullscreen intro
2. Featured Showcase — curated editorial grid
3. Gallery — masonry layout with filtering & modal
4. Horizontal Scroll — GSAP pinned storytelling
5. About — portrait, stats, timeline
6. Collections — category cards
7. Behind The Lens — process imagery
8. Awards & Publications
9. Testimonials — carousel
10. Contact — inquiry form
11. Footer

## Museum 3D Experience

- **`MuseumBackdrop`** — site-wide ambient 3D photo orbit (subtle, scroll-driven camera)
- **`GalleryTunnelSection`** — signature scroll-through 3D gallery tunnel (sticky + GSAP scrub)
- Cinematic camera dolly, fog, stars, floating sculptures
- Falls back to 2D grid on mobile / reduced motion

## Features

- Custom cursor (desktop)
- Magnetic buttons
- **WebGL gallery modal** — liquid distortion, RGB shift, crossfade transitions
- **Cinematic intro** — mask reveal, skippable, respects reduced motion
- **Canvas film grain** + layered SVG noise textures
- **Dynamic lighting** — mouse-follow spotlight + scroll-reactive bloom
- **Scroll velocity effects** — subtle scale/skew from Lenis velocity
- **Ambient sound toggle** — Web Audio drone (muted by default, persisted)
- **Page transitions** — cinematic route mask via `template.tsx`
- **Layout engine** — 4 editorial presets (cinematic, split, minimal, collage)
- Reduced motion support
- Keyboard navigation in gallery modal
- Lazy-loaded images with blur placeholders
- SEO metadata

## Customization

Edit `src/data/photography.ts` to update copy, images, and categories. Replace Unsplash URLs with your own photography hosted locally or on a CDN.

Update `next.config.ts` `images.remotePatterns` for external image domains.
