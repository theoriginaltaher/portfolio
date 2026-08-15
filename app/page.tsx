import { ContactComposerSection } from "@/components/home/ContactComposerSection";
import { FeaturedSignalSection } from "@/components/home/FeaturedSignalSection";
import { Hero } from "@/components/home/Hero";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { ProjectBinSection } from "@/components/home/ProjectBinSection";
import { PageFrame } from "@/components/pages/PageFrame";
import { mediaAlbums } from "@/src/data/media-albums";
import { getFeaturedProjects, getPosts, getSiteSettings } from "@/src/lib/content";

export const revalidate = 60;

export default async function Home() {
  const [projects, posts, settings] = await Promise.all([
    getFeaturedProjects(),
    getPosts(true),
    getSiteSettings(),
  ]);
  return (
    <PageFrame showFooterLinks>
      <main>
        <Hero settings={settings} />
        <ManifestoSection />
        <ProjectBinSection projects={projects} mediaCount={mediaAlbums.length} />
        <FeaturedSignalSection post={posts[0]} />
        <ContactComposerSection email="taher.hussain@outlook.com" />
      </main>
    </PageFrame>
  );
}
