import { siteConfig } from "@/data/photography";
import { siteUrl, seoDescription } from "@/lib/seo";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteConfig.name,
        description: seoDescription,
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteConfig.name,
        jobTitle: "Cinematic Photographer",
        description: seoDescription,
        email: siteConfig.email,
        url: siteUrl,
        sameAs: Object.values(siteConfig.social),
        knowsAbout: [
          "Fashion photography",
          "Portrait photography",
          "Wedding photography",
          "Editorial photography",
          "Street photography",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: `${siteConfig.name} Photography`,
        description: seoDescription,
        url: siteUrl,
        areaServed: ["New York", "Paris", "Tokyo", "Worldwide"],
        serviceType: [
          "Fashion photography",
          "Portrait sessions",
          "Wedding photography",
          "Editorial commissions",
          "Commercial photography",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
