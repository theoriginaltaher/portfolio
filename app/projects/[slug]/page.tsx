import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { systemProjects } from "@/data/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return systemProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = systemProjects.find((item) => item.slug === slug);
  return project
    ? { title: `${project.title} | Taher Hussain`, description: project.description }
    : { title: "Project not found | Taher Hussain" };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = systemProjects.find((item) => item.slug === slug && item.published);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#060606] pt-14">
        <header className="site-shell relative min-h-[72svh] overflow-hidden border-x border-white/[0.055] px-5 pb-12 pt-20 md:px-10 md:pb-16 md:pt-28">
          <div className="absolute inset-0 grid-field opacity-30" />
          <div className="absolute -right-24 top-10 h-[34rem] w-[34rem] rounded-full border border-white/[0.055]" />
          <div className="absolute right-8 top-40 h-[22rem] w-[22rem] rounded-full border border-white/[0.075]" />
          <div className="relative flex h-full min-h-[54svh] flex-col justify-between">
            <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/42">
              <Link href="/projects/systems" className="transition hover:text-white">← Digital Systems</Link>
              <span>{project.signal}</span>
            </div>
            <div className="mt-24">
              <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/42"><span className="h-1.5 w-1.5 bg-[#20c56b]" />{project.status}</div>
              <h1 className="max-w-5xl balanced text-[clamp(3.2rem,9vw,6rem)] font-black leading-[0.88] tracking-[-0.038em] text-white">{project.title}</h1>
            </div>
          </div>
        </header>

        <section className="site-shell grid border-x border-t border-white/[0.055] lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="border-b border-white/[0.07] p-5 md:p-10 lg:border-b-0 lg:border-r">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/36">System record</p>
            <dl className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07] text-sm">
              <div className="flex justify-between gap-5 py-4"><dt className="text-white/42">Period</dt><dd className="font-semibold text-white">{project.year}</dd></div>
              <div className="flex justify-between gap-5 py-4"><dt className="text-white/42">Category</dt><dd className="font-semibold text-white">Digital system</dd></div>
              <div className="flex justify-between gap-5 py-4"><dt className="text-white/42">State</dt><dd className="font-semibold text-white">{project.status}</dd></div>
            </dl>
          </aside>
          <article className="px-5 py-14 md:px-10 md:py-20">
            <p className="max-w-3xl balanced text-2xl font-bold leading-[1.35] tracking-[-0.02em] text-white md:text-4xl">{project.fullDescription}</p>
            <p className="mt-10 max-w-2xl pretty text-base leading-8 text-[#aaa]">{project.description} This local project brief is ready to receive long-form Portable Text, featured media, and supporting gallery images when the Sanity project documents are connected.</p>
            <div className="mt-14 border-t border-white/[0.08] pt-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/36">Built with</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="border border-white/10 px-3 py-2 text-xs font-semibold text-white/72">{tool}</span>)}</div>
            </div>
            <Link href="/projects/systems" className="mt-16 inline-flex border-b border-[var(--red)] pb-2 text-sm font-bold text-white transition hover:text-[var(--red)]">Explore all systems →</Link>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
