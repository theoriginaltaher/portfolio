import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/src/types";

export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const imageUrl = project.featuredImage?.asset?.url;
  return <article data-category={project.category} className="grid border-b hairline lg:grid-cols-2">
    <div className={`relative min-h-72 overflow-hidden bg-[var(--panel)] lg:min-h-[34rem] ${index % 2 ? "lg:order-2" : ""}`}>
      {imageUrl ? <Image src={imageUrl} alt={project.featuredImage?.alt || `${project.title} project image`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /> : <div className="grid-field absolute inset-0"><div className="absolute bottom-8 left-8 right-8 border-t border-[var(--accent)] pt-4 text-xs font-bold text-[var(--muted)]">Visual archive pending · {project.year}</div></div>}
    </div>
    <div className={`flex flex-col justify-between px-0 py-10 lg:px-12 lg:py-14 ${index % 2 ? "lg:order-1 lg:pl-0" : "lg:pr-0"}`}>
      <div><div className="flex items-center justify-between gap-4 text-xs text-[var(--muted)]"><span>{project.category === "systems" ? "Digital Systems Lab" : "Media Gallery"}</span><span>{project.year}</span></div><h2 className="balanced mt-8 text-[clamp(2.25rem,5vw,4.75rem)] font-black leading-[0.96] tracking-[-0.04em]">{project.title}</h2><p className="pretty mt-6 max-w-xl text-base leading-8 text-[var(--muted)]">{project.shortDescription}</p></div>
      <div className="mt-12"><p className="text-xs text-[var(--muted)]">{project.role}</p><div className="mt-5 flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="border border-[var(--border-strong)] px-3 py-1.5 text-xs text-[var(--muted)]">{tool}</span>)}</div><Link href={`/projects/${project.slug}`} className="mt-8 inline-flex min-h-11 items-center border-b border-[var(--accent)] text-sm font-bold transition-colors hover:text-[var(--accent)]">View project →</Link></div>
    </div>
  </article>;
}
