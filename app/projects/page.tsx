import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Projects | Taher Hussain",
  description: "Explore Taher Hussain's digital systems and selected media work.",
};

const pathways = [
  {
    index: "A",
    title: "Digital Systems",
    href: "/projects/systems",
    description: "AI workflows, web platforms, cloud tools, and technical prototypes built to work beyond the demo.",
    meta: "4 selected systems",
    accent: "red",
  },
  {
    index: "B",
    title: "Media Gallery",
    href: "/projects/media",
    description: "Frames, motion studies, and production moments from an evolving visual archive.",
    meta: "6 selected frames",
    accent: "blue",
  },
] as const;

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#060606] pt-14">
        <header className="site-shell flex min-h-[42svh] flex-col justify-end border-x border-white/[0.055] px-5 pb-12 pt-20 md:px-10 md:pb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--red)]">Project index / Choose a path</p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-3xl balanced text-[clamp(3.5rem,9vw,6rem)] font-black leading-[0.88] tracking-[-0.038em] text-white">Two ways into the work.</h1>
            <p className="max-w-sm pretty text-sm leading-7 text-[#aaa]">Systems are viewed through how they operate. Media is explored frame by frame. Pick the mode that matches what you came to see.</p>
          </div>
        </header>

        <section className="site-shell grid border-x border-t border-white/[0.055] lg:grid-cols-2" aria-label="Project pathways">
          {pathways.map((path, index) => (
            <Link key={path.href} href={path.href} className={`group relative flex min-h-[540px] flex-col overflow-hidden p-5 transition duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[var(--red)] md:p-10 ${index === 0 ? "lg:border-r lg:border-white/[0.07]" : ""}`}>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-white/38"><span>Path {path.index}</span><span>{path.meta}</span></div>
              <div className="relative my-10 min-h-[220px] flex-1 overflow-hidden bg-[#0c0c0c]">
                {path.accent === "red" ? (
                  <div className="absolute inset-0 grid grid-cols-[0.65fr_1.35fr] gap-px bg-white/5 p-px">
                    <div className="grid-field relative bg-[#0c0c0c]"><span className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" /><span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--red)]" /></div>
                    <div className="flex flex-col justify-between bg-[#0c0c0c] p-5"><span className="h-2 w-2 bg-[#20c56b]" /><div className="space-y-3"><span className="block h-2 w-4/5 bg-white/18" /><span className="block h-2 w-3/5 bg-[var(--red)]" /><span className="block h-2 w-2/5 bg-white/8" /></div></div>
                  </div>
                ) : (
                  <Image src="/assets/taher-portrait-hero-color.png" alt="Cinematic production still from the media archive" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover saturate-[0.72] transition duration-700 ease-out group-hover:scale-[1.018] group-hover:saturate-100" />
                )}
              </div>
              <div className="flex items-end justify-between gap-6 border-t border-white/9 pt-6">
                <div><h2 className="text-[clamp(2rem,4vw,3.75rem)] font-black leading-none tracking-[-0.035em] text-white">{path.title}</h2><p className="mt-4 max-w-md pretty text-sm leading-6 text-[#aaa]">{path.description}</p></div>
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/16 text-xl text-white transition group-hover:border-[var(--red)] group-hover:text-[var(--red)]" aria-hidden="true">↗</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
