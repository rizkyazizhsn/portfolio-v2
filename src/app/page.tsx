import { HeroSection } from "@/features/home/components/hero-section";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/features/home/components/about-section";
import { WorkSection } from "@/features/home/components/work-section";
import { ContactSection } from "@/features/home/components/contact-section";
import { BlogSection } from "@/features/home/components/blog-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      jobTitle: "Frontend Engineer",
      sameAs: [
        "https://www.linkedin.com/in/rizky-aziz",
        "https://www.instagram.com/rizkyyazizz",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "Rizky Aziz Portfolio",
      description: site.description,
      inLanguage: "en",
      author: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <main id="info" data-menu-page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <div data-menu-content>
        <HeroSection />
      </div>
      <Navbar className="sticky top-6 z-50 -mt-20" />
      <div data-menu-content>
        <AboutSection />
        <WorkSection />
        <SkillSection />
        <ExperienceSection />
        <BlogSection />
        <ContactSection />
      </div>
    </main>
  );
}
import type { Metadata } from "next";
import { site } from "@/lib/site";import { SkillSection } from "@/features/home/components/skill-section";
import { ExperienceSection } from "@/features/home/components/experience";

