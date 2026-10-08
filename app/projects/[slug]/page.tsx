import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/pages/PageFrame";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { MediaGallery } from "@/components/projects/MediaGallery";
import { getProject, getProjectSlugs, getProjectsByCategory } from "@/src/lib/content";
import type { MediaAsset } from "@/src/types/media";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;
export async function generateStaticParams() { return getProjectSlugs(); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  return project ? { title: `${project.title} | Taher Hussain`, description: project.shortDescription, openGraph: { images: project.media?.[0]?.src ? [project.media[0].src] : [] } } : { title: "Project not found", robots: { index: false } };
}
export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project?.published || project.category !== "systems") notFound();
  const projects = await getProjectsByCategory("systems");
  const next = projects[(projects.findIndex(item => item.slug === project.slug) + 1) % projects.length];
  const legacy: MediaAsset[] = [project.featuredImage, ...(project.gallery || [])].flatMap((image, i) => image?.asset?.url ? [{ id: `legacy-${i}`, type: "image" as const, src: image.asset.url, alt: image.alt || project.title, title: image.alt || `${project.title} screen ${i + 1}` }] : []);
  const media = project.media !== undefined && project.media !== null ? project.media.filter(item => item.src) : legacy;
  return <PageFrame><main className="portfolio-page">
    <header className="site-shell album-header"><Link href="/projects/systems" className="archive-back">← Digital Systems</Link><div className="album-heading"><div><p className="album-kicker">Digital project</p><h1>{project.title}</h1></div><div><p className="archive-intro">{project.shortDescription}</p>{project.externalUrl?.startsWith("https://") && <a className="archive-crosslink" href={project.externalUrl} target="_blank" rel="noopener noreferrer">Visit website ↗</a>}</div></div><div className="album-info"><div className="album-tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><span>{media.length} screens · Select to explore</span></div></header>
    <section className="site-shell album-content" aria-label={`${project.title} screens`}><MediaGallery items={media} title={project.title} contained /></section>
    {project.fullDescription?.length ? <section className="site-shell project-overview"><h2>About the project</h2><div><ArticleBody value={project.fullDescription} /><dl className="project-facts"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Period</dt><dd>{project.year}</dd></div></dl></div></section> : null}
    <nav className="site-shell album-navigation" aria-label="Project navigation"><Link href="/projects/systems"><span>← Digital Systems</span><strong>Explore all projects</strong></Link>{next && next.slug !== project.slug && <Link href={`/projects/${next.slug}`}><span>Next project →</span><strong>{next.title}</strong></Link>}</nav>
  </main></PageFrame>;
}
