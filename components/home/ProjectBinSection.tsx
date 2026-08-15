import Link from "next/link";
import { SectionLabel } from "./SectionLabel";
import type { Project } from "@/src/types";

const pathwayDefinitions = [
  {
    code: "Systems",
    title: "Digital Systems",
    description:
      "Architecture and development of high-density technical infrastructure for media-intensive operations.",
    href: "/projects/systems",
    meta: "Automation / Platforms / Workflows",
  },
  {
    code: "Media",
    title: "Media Gallery",
    description: "High-fidelity cinematic production and storytelling pipelines.",
    href: "/projects/media",
    meta: "Albums / Photography / Video",
  },
  {
    code: "Experience",
    title: "Experience",
    description: "Interfaces, service journeys, and usable systems shaped around people.",
    href: "/experience",
    meta: "UX / Interfaces / Service",
  },
  {
    code: "Writing",
    title: "Writing",
    description: "Technical writing, operating notes, and decision records.",
    href: "/blog",
    meta: "Notes / Articles / Documentation",
  },
];

export function ProjectBinSection({ projects, mediaCount }: { projects: Project[]; mediaCount: number }) {
  const systems = projects.filter((project) => project.category === "systems");
  const pathways = pathwayDefinitions.map((pathway, index) => {
    if (index === 0) {
      return systems[0]
        ? { ...pathway, description: systems[0].shortDescription, meta: `${systems.length} published systems` }
        : { ...pathway, meta: "Awaiting verified case studies" };
    }
    if (index === 1) {
      return { ...pathway, meta: `${mediaCount} published collections` };
    }
    return pathway;
  });
  return (
    <section className="border-b hairline bg-[#060606] py-12 sm:py-14 md:py-20" id="projects">
      <div className="site-shell max-w-[1440px]">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:mb-10 md:flex-row md:items-end">
          <SectionLabel index="03 /" label="Project_Bin.index" />
          <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
            Systems / Media / Experience / Writing
          </p>
        </div>

        <div className="project-bin-row">
          {pathways.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="project-bin-card group panel relative flex min-h-[220px] flex-col overflow-hidden p-5 sm:min-h-[235px] sm:p-6"
            >
              <p className="mb-7 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--blue-quiet)]">
                {item.code}
              </p>
              <h3 className="text-[clamp(1.35rem,2vw,1.65rem)] font-black tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="mt-3 pretty text-[15px] leading-6 text-[var(--muted)]">
                {item.description}
              </p>

              <p className="mt-auto border-t border-white/8 pt-4 text-[10px] uppercase tracking-[0.13em] text-[var(--dim)]">{item.meta}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
