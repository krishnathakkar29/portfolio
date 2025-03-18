import AboutSection from "@/components/custom/about-section";
import { ContactSection } from "@/components/custom/contact-section";
import HeroSection from "@/components/custom/hero-section";
import Navbar from "@/components/custom/navbar";
import { ProjectsSection } from "@/components/custom/projects-section";
import { TechStackSection } from "@/components/custom/tech-stack-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
