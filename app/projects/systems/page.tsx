import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame } from "@/components/pages/PageFrame";
import { SystemsShowcase } from "@/components/projects/SystemsShowcase";
import { toSystemProject } from "@/src/lib/adapters";
import { getProjectsByCategory } from "@/src/lib/content";

export const metadata: Metadata = { title: "Digital Systems | Taher Hussain", description: "Explore digital products, websites, and mobile interfaces by Taher Hussain, with real screens and project details." };
export const revalidate = 60;
export default async function SystemsPage() {
  const projects = (await getProjectsByCategory("systems")).map(toSystemProject);
  return <PageFrame><main className="portfolio-page"><header className="site-shell archive-header"><Link href="/projects" className="archive-back">← Project index</Link><div className="archive-heading"><h1>Digital<br /><span>Systems</span></h1><div><p>Interfaces for everyday complexity.</p><p className="archive-intro">From assistive technology to shared expenses, dining, and discovery. Explore the screens and flows behind each project.</p><Link href="/projects/media" className="archive-crosslink">Explore Media Gallery ↗</Link></div></div></header><section className="site-shell archive-content" aria-label="Digital projects"><div className="systems-intro"><span>Selected projects</span><span>{projects.length} {projects.length === 1 ? "project" : "projects"}</span></div><SystemsShowcase projects={projects} /></section></main></PageFrame>;
}
