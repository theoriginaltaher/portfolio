import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactComposerSection } from "@/components/home/ContactComposerSection";
import { FeaturedSignalSection } from "@/components/home/FeaturedSignalSection";
import { Hero } from "@/components/home/Hero";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { ProjectBinSection } from "@/components/home/ProjectBinSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ManifestoSection />
        <ProjectBinSection />
        <RoadmapSection />
        <FeaturedSignalSection />
        <ContactComposerSection />
      </main>
      <Footer />
    </>
  );
}
