import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SystemsShowcase } from "@/components/projects/SystemsShowcase";
import { systemProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Digital Systems | Taher Hussain",
  description: "Selected digital systems, platforms, workflows, and technical prototypes by Taher Hussain.",
};

export default function SystemsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#060606] pt-14">
        <header className="site-shell grid min-h-[58svh] content-end gap-12 border-x border-white/[0.055] px-5 pb-12 pt-20 md:px-10 md:pb-16 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <Link href="/projects" className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/42 transition hover:text-white">← Project index</Link>
            <h1 className="mt-7 balanced text-[clamp(3.6rem,9vw,6rem)] font-black leading-[0.86] tracking-[-0.038em] text-white">Digital<br />Systems</h1>
          </div>
          <div className="lg:border-l lg:border-white/9 lg:pl-9">
            <p className="max-w-md pretty text-base leading-7 text-[#b2b2b2]">A working set of platforms, operational tools, and prototypes. Each project is presented as a system with inputs, decisions, and measurable output.</p>
            <div className="mt-7 flex items-center justify-between border-t border-white/9 pt-4 text-[10px] font-bold uppercase tracking-[0.13em] text-white/38"><span>{systemProjects.length} selected works</span><span>2023–2026</span></div>
          </div>
        </header>

        <section className="site-shell border-x border-white/[0.055] px-5 pb-24 md:px-10 md:pb-32">
          <SystemsShowcase projects={systemProjects} />
        </section>
      </main>
      <Footer />
    </>
  );
}
