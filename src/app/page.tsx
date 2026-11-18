import { HeroSection } from "@/features/home/components/hero-section";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/features/home/components/about-section";
import { WorkSection } from "@/features/home/components/work-section";
import { FooterSection } from "@/components/layout/footer";

export default function Home() {
  return (
    <div id="info" data-menu-page>
      <div data-menu-content>
        <HeroSection />
      </div>
      <Navbar className="sticky top-6 z-50 -mt-20" />
      <div data-menu-content>
        <AboutSection />
        <WorkSection />
        <FooterSection />
      </div>
    </div>
  );
}
