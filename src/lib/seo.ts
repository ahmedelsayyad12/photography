import type { Metadata } from "next";
import { siteConfig } from "@/data/photography";

/** Public site URL — set NEXT_PUBLIC_SITE_URL in production (e.g. https://yoursite.com). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const seoTitle =
  "Ahmed Elsyaad | Cinematic Photography Portfolio & Commissions";

export const seoDescription =
  "Award-winning cinematic photography by Ahmed Elsyaad — fashion editorials, portraits, weddings, street, and editorial work. Based in Cairo with worldwide commissions.";

export const seoKeywords = [
  "cinematic photography",
  "photography portfolio",
  "fashion photography",
  "portrait photographer",
  "wedding photography",
  "editorial photography",
  "Ahmed Elsyaad",
  "Cairo photographer",
  "Egypt photographer",
];

export function buildSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seoTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: siteConfig.name,
      title: seoTitle,
      description: seoDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
  };
}
