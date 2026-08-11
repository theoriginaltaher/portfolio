import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/pages/PageFrame";
import { toSystemProject } from "@/src/lib/adapters";
import { getProject, getProjectSlugs } from "@/src/lib/content";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  return project
    ? { title: `${project.title} | Taher Hussain`, description: project.shortDescription }
    : { title: "Project not found | Taher Hussain" };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const sanityProject = await getProject(slug);
  if (!sanityProject?.published || sanityProject.category !== "systems") notFound();
  const project = toSystemProject(sanityProject, sanityProject.order - 1);

  return (
    <PageFrame>
      <main className="min-h-screen bg-[#060606] pt-14">
        <header className="site-shell border-b border-white/10 pb-14 pt-20 md:pb-20 md:pt-28">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/48">
            <Link href="/projects/systems" className="font-semibold transition hover:text-white">← Digital Systems</Link>
            <span>Project case study</span>
          </div>
          <div className="mt-20 max-w-5xl md:mt-28">
            <p className="mb-5 text-sm font-semibold text-[var(--red)]">{project.status} · {project.year}</p>
            <h1 className="balanced text-[clamp(3.2rem,9vw,6rem)] font-black leading-[0.9] tracking-[-0.038em] text-white">{project.title}</h1>
          </div>
        </header>

        <section className="site-shell grid lg:grid-cols-[0.62fr_1.38fr]">
          <aside className="border-b border-white/10 py-10 lg:border-b-0 lg:border-r lg:pr-10">
            <h2 className="text-lg font-bold tracking-[-0.02em]">Project details</h2>
            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
              <div className="flex justify-between gap-5 py-4"><dt className="text-white/48">Period</dt><dd className="font-semibold text-white">{project.year}</dd></div>
              <div className="flex justify-between gap-5 py-4"><dt className="text-white/48">Category</dt><dd className="font-semibold text-white">Digital project</dd></div>
              <div className="flex justify-between gap-5 py-4"><dt className="text-white/48">Status</dt><dd className="font-semibold text-white">{project.status}</dd></div>
            </dl>
          </aside>
          <article className="py-14 md:py-20 lg:pl-12">
            <p className="max-w-3xl balanced text-2xl font-bold leading-[1.35] tracking-[-0.02em] text-white md:text-4xl">{project.fullDescription}</p>
            <p className="mt-10 max-w-2xl pretty text-base leading-8 text-[#aaa]">{project.description}</p>
            <div className="mt-14 border-t border-white/10 pt-7">
              <h2 className="text-lg font-bold tracking-[-0.02em]">Tools and technologies</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">{project.tools.join(" · ")}</p>
            </div>
            <Link href="/projects/systems" className="mt-16 inline-flex border-b border-[var(--red)] pb-2 text-sm font-semibold text-white transition hover:text-[var(--red)]">Explore all systems →</Link>
          </article>
        </section>
      </main>
    </PageFrame>
  );
}
