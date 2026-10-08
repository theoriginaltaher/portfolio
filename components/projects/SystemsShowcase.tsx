import Link from "next/link";
import type { SystemProject } from "@/src/types";
import { MediaImage } from "./MediaImage";

export function SystemsShowcase({ projects }: { projects: SystemProject[] }) {
  if (!projects.length) return <div className="archive-empty"><h2>New systems are on the way.</h2><p>Explore the photography, films, and design collections in the meantime.</p><Link href="/projects/media" className="gallery-control">Explore Media Gallery →</Link></div>;
  return <div className="systems-list">{projects.map((project, index) => {
    const cover = project.media?.[0];
    const portraitScreens = cover?.width && cover.width < 800 && (project.media?.length || 0) > 1 ? project.media?.slice(0, 3) : null;
    return <article className="system-project" key={project.slug}>
      <div className="system-copy"><p className="system-label">{project.tools.join(" / ")}</p><h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2><p className="system-description">{project.description}</p><div className="system-bottom"><span>{project.media?.length || 0} screens</span><Link href={`/projects/${project.slug}`} className="system-link">Explore project <span aria-hidden="true">↗</span></Link></div></div>
      <Link className="system-preview" href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>
        {portraitScreens ? <div className="system-screens">{portraitScreens.map((screen, i) => <div key={screen.id}><MediaImage src={screen.src} alt={screen.alt} sizes="(min-width: 900px) 18vw, 42vw" priority={index === 0 && i === 0} className="object-contain" /></div>)}</div> : <MediaImage src={cover?.type === "video" ? cover.poster : cover?.src} alt={cover?.alt || project.title} sizes="(min-width: 900px) 55vw, 100vw" priority={index === 0} className={`system-screenshot ${cover?.height && cover?.width && cover.height / cover.width > 1.6 ? "system-screenshot-long" : ""}`} />}
        <span className="system-preview-label">View screens ↗</span>
      </Link>
    </article>;
  })}</div>;
}
