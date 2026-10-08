import type { Metadata } from "next";
import { MediaImage } from "@/components/projects/MediaImage";
import Link from "next/link";
import { PageFrame } from "@/components/pages/PageFrame";
import { getMediaAlbums, getProjectsByCategory } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Projects | Taher Hussain",
  description: "Explore Taher Hussain's digital systems and selected media work.",
};

const pathwayDefinitions = [
  {
    index: "A",
    title: "Digital Systems",
    href: "/projects/systems",
    description: "Digital products, websites, and mobile interfaces, explored through their screens and flows.",
    accent: "red",
  },
  {
    index: "B",
    title: "Media Gallery",
    href: "/projects/media",
    description: "Frames, motion studies, and production moments from an evolving visual archive.",
    accent: "blue",
  },
] as const;

export const revalidate = 60;

export default async function ProjectsPage() {
  const [systems, mediaAlbums] = await Promise.all([getProjectsByCategory("systems"), getMediaAlbums()]);
  const pathways = pathwayDefinitions.map((path, index) => ({
    ...path,
    meta: index === 0 ? `${systems.length} selected systems` : `${mediaAlbums.length} selected collections`,
  }));
  return (
    <PageFrame>
      <main className="min-h-screen bg-[#060606] pt-14">
        <header className="site-shell flex min-h-[36svh] flex-col justify-end pb-12 pt-20 md:pb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--red)]">Project index</p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl balanced text-[clamp(3.5rem,9vw,6rem)] font-black leading-[0.88] tracking-[-0.038em] text-white">Two ways into the work.</h1>
            <p className="max-w-sm pretty text-sm leading-7 text-[#aaa]">Systems are viewed through how they operate. Media is explored frame by frame. Pick the mode that matches what you came to see.</p>
          </div>
        </header>

        <section className="site-shell grid border-y border-white/[0.055] lg:grid-cols-2" aria-label="Project pathways">
          {pathways.map((path, index) => (
            <Link key={path.href} href={path.href} className={`interactive-lift group relative flex min-h-[430px] flex-col overflow-hidden p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--red)] md:p-8 ${index === 0 ? "lg:border-r lg:border-white/[0.07]" : ""}`}>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-white/38"><span>Path {path.index}</span><span>{path.meta}</span></div>
              <div className="relative my-7 min-h-[190px] flex-1 overflow-hidden bg-[#0c0c0c]">
                {path.accent === "red" ? (
                  <MediaImage src={systems[0]?.media?.[0]?.src} alt={systems[0]?.media?.[0]?.alt || "Digital Systems"} sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain p-4" />
                ) : (
                  <MediaImage src={mediaAlbums[0]?.coverImage} alt={mediaAlbums[0]?.coverAlt || "Media Gallery"} sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                )}
              </div>
              <div className="flex items-end justify-between gap-6 border-t border-white/9 pt-6">
                <div><h2 className="text-[clamp(2rem,4vw,3.75rem)] font-black leading-none tracking-[-0.035em] text-white">{path.title}</h2><p className="mt-4 max-w-md pretty text-sm leading-6 text-[#aaa]">{path.description}</p></div>
                <span className="arrow-shift grid h-11 w-11 shrink-0 place-items-center border border-white/16 text-xl text-white transition-colors group-hover:border-[var(--red)] group-hover:text-[var(--red)]" aria-hidden="true">↗</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </PageFrame>
  );
}
