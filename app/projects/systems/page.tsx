import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/pages/PageFrame";
import { SystemsShowcase } from "@/components/projects/SystemsShowcase";
import { toSystemProject } from "@/src/lib/adapters";
import { getProjectsByCategory } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Digital Systems | Taher Hussain",
  description: "Selected digital systems, platforms, workflows, and technical prototypes by Taher Hussain.",
};

export const revalidate = 60;

export default async function SystemsPage() {
  const projects = await getProjectsByCategory("systems");
  const systemProjects = projects.map(toSystemProject);

  return (
    <PageFrame>
      <main className="min-h-screen bg-[#060606] pt-14">
        <header className="site-shell grid min-h-[46svh] content-end gap-10 pb-12 pt-20 md:pb-16 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <Link href="/projects" className="text-sm font-semibold text-white/52 transition hover:text-white">← Project index</Link>
            <h1 className="mt-7 balanced text-[clamp(3.6rem,9vw,6rem)] font-black leading-[0.86] tracking-[-0.038em] text-white">Digital<br />Systems</h1>
          </div>
          <div className="lg:border-l lg:border-white/9 lg:pl-9">
            <p className="max-w-md pretty text-base leading-7 text-[#b2b2b2]">Websites, tools, and workflows built to make creative and operational work easier to run. Each project shows the problem, the choices, and what changed.</p>
            <div className="mt-7 flex items-center justify-between border-t border-white/9 pt-4 text-sm text-white/45"><span>{systemProjects.length} selected works</span><span>2023–2026</span></div>
          </div>
        </header>
        <section className="site-shell pb-20 md:pb-24">
          <SystemsShowcase projects={systemProjects} />
        </section>
      </main>
    </PageFrame>
  );
}
