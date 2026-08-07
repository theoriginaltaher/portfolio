import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactComposerSection } from "@/components/home/ContactComposerSection";
import { FeaturedSignalSection } from "@/components/home/FeaturedSignalSection";
import { Hero } from "@/components/home/Hero";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { ProjectBinSection } from "@/components/home/ProjectBinSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { getExperience, getFeaturedProjects, getPosts, getSiteSettings } from "@/src/lib/content";

export const revalidate = 60;

export default async function Home() {
  const [projects, experience, posts, settings] = await Promise.all([
    getFeaturedProjects(),
    getExperience(true),
    getPosts(true),
    getSiteSettings(),
  ]);
  return (
    <>
      <Navbar />
      <main>
        <Hero settings={settings} />
        <ManifestoSection />
        <ProjectBinSection projects={projects} />
        <RoadmapSection experience={experience} />
        <FeaturedSignalSection post={posts[0]} />
        <ContactComposerSection />
      </main>
      <Footer />
    </>
  );
}
