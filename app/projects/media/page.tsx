import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MediaGallery } from "@/components/projects/MediaGallery";
import { toMediaItems } from "@/src/lib/adapters";
import { getProjectsByCategory } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Media Gallery | Taher Hussain",
  description: "An interactive selection of stills and visual production work by Taher Hussain.",
};

export const revalidate = 60;

export default async function MediaPage() {
  const projects = await getProjectsByCategory("media");
  const mediaItems = toMediaItems(projects);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#060606] pt-14">
        <header className="site-shell border-x border-white/[0.055] px-5 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
          <div className="flex items-center justify-between gap-6">
            <Link href="/projects" className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/42 transition hover:text-white">← Project index</Link>
            <p className="hidden text-[10px] font-bold uppercase tracking-[0.14em] text-white/32 sm:block">Select a frame to enter viewer</p>
          </div>
          <div className="mt-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="balanced text-[clamp(3.6rem,9vw,6rem)] font-black leading-[0.86] tracking-[-0.038em] text-white">Media<br />Gallery</h1>
            <div className="max-w-md lg:pb-1"><p className="pretty text-base leading-7 text-[#b2b2b2]">Selected frames from commissioned work, event production, portrait studies, and ongoing visual experiments.</p><p className="mt-5 text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--red)]">Use arrow keys inside the viewer</p></div>
          </div>
        </header>

        <section className="site-shell border-x border-t border-white/[0.055] px-3 py-3 md:px-5 md:py-5">
          <MediaGallery items={mediaItems} />
        </section>

        <section className="site-shell flex flex-col justify-between gap-8 border-x border-t border-white/[0.055] px-5 py-14 md:flex-row md:items-end md:px-10 md:py-20">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/36">Archive note</p><p className="mt-4 max-w-xl balanced text-2xl font-bold leading-tight tracking-[-0.025em] text-white md:text-4xl">The archive is intentionally edited. New stories will be added as bodies of work are completed.</p></div>
          <a href="mailto:hello@taherhussain.com" className="shrink-0 border-b border-[var(--red)] pb-2 text-sm font-bold text-white transition hover:text-[var(--red)]">Request the full reel →</a>
        </section>
      </main>
      <Footer />
    </>
  );
}
