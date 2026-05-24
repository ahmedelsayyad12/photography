import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ImmersiveShell } from "@/components/ImmersiveShell";
import { FuturisticCursor } from "@/components/FuturisticCursor";
import { FilmGrain } from "@/components/FilmGrain";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elena Voss — Cinematic Photography Portfolio",
  description:
    "Award-winning cinematic photography portfolio. Fashion, portraits, editorial, weddings, and visual storytelling by Elena Voss.",
  keywords: [
    "photography",
    "portfolio",
    "cinematic",
    "fashion photography",
    "editorial",
  ],
  openGraph: {
    title: "Elena Voss — Cinematic Photography",
    description: "Visual narratives at the intersection of cinema and light.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--background)]"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          {/* Outside ScrollVelocityLayer so fixed cursor tracks viewport correctly */}
          <FuturisticCursor />
          <FilmGrain />
          <ImmersiveShell>{children}</ImmersiveShell>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
