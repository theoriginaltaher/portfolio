import Link from "next/link";
import type { SystemProject } from "@/data/projects";

export function SystemsShowcase({ projects }: { projects: SystemProject[] }) {
  return (
    <div className="border-t border-white/10">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          className="grid gap-6 border-b border-white/10 py-10 md:grid-cols-[72px_minmax(0,1fr)_220px] md:gap-8 md:py-14"
        >
          <p className="text-sm font-semibold text-[var(--red)]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/45">
              <span>{project.year}</span><span aria-hidden="true">·</span><span>{project.status}</span>
            </div>
            <h2 className="mt-4 max-w-3xl balanced text-[clamp(2rem,4vw,3.8rem)] font-black leading-[0.98] tracking-[-0.035em] text-white">
              {project.title}
            </h2>
            <p className="mt-5 max-w-2xl pretty text-base leading-7 text-[#ababab]">{project.description}</p>
          </div>
          <div className="flex flex-col justify-between border-t border-white/8 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <p className="text-sm leading-6 text-white/48">{project.tools.join(" · ")}</p>
            <Link href={`/projects/${project.slug}`} className="mt-8 inline-flex w-fit border-b border-[var(--red)] pb-2 text-sm font-semibold text-white transition hover:text-[var(--red)]">
              Read case study <span className="ml-3" aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
