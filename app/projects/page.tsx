import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/pages/PageFrame";
import { getProjectsByCategory } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Projects | Taher Hussain",
  description: "Explore Taher Hussain's digital systems and selected media work.",
};

const pathwayDefinitions = [
  {
    title: "Digital Systems",
    href: "/projects/systems",
    description: "Web platforms, AI-supported workflows, and practical tools built for real people and teams.",
    image: "/assets/taher-hero-camera.png",
    imageAlt: "Taher working with creative technology and production equipment",
  },
  {
    title: "Media Gallery",
    href: "/projects/media",
    description: "Photography, video, and production stories from school, community, and creative work.",
    image: "/assets/taher-portrait-hero-color.png",
    imageAlt: "Portrait from Taher's creative media archive",
  },
] as const;

export const revalidate = 60;

export default async function ProjectsPage() {
  const [systems, media] = await Promise.all([
    getProjectsByCategory("systems"),
    getProjectsByCategory("media"),
  ]);
  const pathways = pathwayDefinitions.map((path, index) => ({
    ...path,
    meta: index === 0 ? `${systems.length} selected systems` : `${media.length} selected projects`,
  }));

  return (
    <PageFrame>
      <main className="min-h-screen bg-[#060606] pt-14">
        <header className="site-shell flex min-h-[36svh] flex-col justify-end pb-12 pt-20 md:pb-16">
          <p className="text-sm font-semibold text-[var(--red)]">Selected work</p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl balanced text-[clamp(3.5rem,9vw,6rem)] font-black leading-[0.88] tracking-[-0.038em] text-white">
              Two ways into the work.
            </h1>
            <p className="max-w-md pretty text-base leading-7 text-[#aaa]">
              Explore the technical systems I build or the visual stories I create. Both are shaped by the same care for clarity, craft, and usefulness.
            </p>
          </div>
        </header>

        <section className="site-shell grid border-y border-white/[0.07] lg:grid-cols-2" aria-label="Project pathways">
          {pathways.map((path, index) => (
            <Link
              key={path.href}
              href={path.href}
              className={`group relative flex min-h-[430px] flex-col overflow-hidden p-5 transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--red)] md:p-8 ${index === 0 ? "lg:border-r lg:border-white/[0.07]" : ""}`}
            >
              <div className="flex items-center justify-end text-sm text-white/45"><span>{path.meta}</span></div>
              <div className="relative my-7 min-h-[190px] flex-1 overflow-hidden bg-[#0c0c0c]">
                <Image
                  src={path.image}
                  alt={path.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover saturate-[0.72] transition duration-700 ease-out group-hover:scale-[1.018] group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="flex items-end justify-between gap-6 border-t border-white/9 pt-6">
                <div>
                  <h2 className="text-[clamp(2rem,4vw,3.75rem)] font-black leading-none tracking-[-0.035em] text-white">{path.title}</h2>
                  <p className="mt-4 max-w-md pretty text-sm leading-6 text-[#aaa]">{path.description}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/16 text-xl text-white transition group-hover:border-[var(--red)] group-hover:text-[var(--red)]" aria-hidden="true">↗</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </PageFrame>
  );
}
