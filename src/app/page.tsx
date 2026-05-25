import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedShowcase } from "@/components/FeaturedShowcase";
import { Gallery } from "@/components/Gallery";
import { HorizontalScrollSection } from "@/components/HorizontalScrollSection";
import { About } from "@/components/About";
import { Categories } from "@/components/Categories";
import { Awards } from "@/components/Awards";
import { Testimonials } from "@/components/Testimonials";
import { BehindTheLens } from "@/components/BehindTheLens";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionReveal } from "@/components/fx/SectionReveal";
import { PortalTransition } from "@/components/fx/PortalTransition";
import { GalleryTunnelSection } from "@/components/museum/GalleryTunnelSection";
import { SiteIntro } from "@/components/seo/SiteIntro";
import { SeoContent } from "@/components/seo/SeoContent";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        <PortalTransition moodId="hero">
          <Hero />
        </PortalTransition>

        <SiteIntro />

        <GalleryTunnelSection />

        <PortalTransition moodId="featured">
          <SectionReveal>
            <FeaturedShowcase />
          </SectionReveal>
        </PortalTransition>

        <PortalTransition moodId="work">
          <SectionReveal>
            <Gallery />
          </SectionReveal>
        </PortalTransition>

        <PortalTransition moodId="stories">
          <HorizontalScrollSection />
        </PortalTransition>

        <PortalTransition moodId="about">
          <SectionReveal>
            <About />
          </SectionReveal>
        </PortalTransition>

        <PortalTransition moodId="collections">
          <SectionReveal>
            <Categories />
          </SectionReveal>
        </PortalTransition>

        <PortalTransition moodId="lens">
          <SectionReveal>
            <BehindTheLens />
          </SectionReveal>
        </PortalTransition>

        <PortalTransition moodId="awards">
          <SectionReveal>
            <Awards />
          </SectionReveal>
        </PortalTransition>

        <PortalTransition moodId="testimonials">
          <SectionReveal>
            <Testimonials />
          </SectionReveal>
        </PortalTransition>

        <PortalTransition moodId="contact">
          <SectionReveal>
            <Contact />
          </SectionReveal>
        </PortalTransition>

        <SeoContent />
      </main>
      <Footer />
    </>
  );
}
