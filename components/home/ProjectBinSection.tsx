import Link from "next/link";
import { SectionLabel } from "./SectionLabel";
import type { Project } from "@/src/types";

const pathwayDefinitions = [
  {
    code: "01_INDEX_SYSTEMS",
    title: "Digital Systems Lab",
    description:
      "Architecture and development of high-density technical infrastructure for media-intensive operations.",
    href: "/projects/systems",
    meta: "Cloud / Product / Ops",
    action: "Read the case file",
  },
  {
    code: "02_MEDIA_PIPE",
    title: "Media Gallery",
    description: "High-fidelity cinematic production and storytelling pipelines.",
    href: "/projects/media",
    meta: "Photo / Video / Narrative",
  },
  {
    code: "03_USER_X",
    title: "Experience Design",
    description: "Neutral interface research and accessibility-focused UX.",
    href: "/projects",
    meta: "Systems / Screens / Behavior",
  },
  {
    code: "04_WRITING",
    title: "Writing & Documentation",
    description: "Technical writing, operating notes, and decision records.",
    href: "/blog",
    meta: "Notes / Docs / Signals",
  },
];

export function ProjectBinSection({ projects }: { projects: Project[] }) {
  const systems = projects.filter((project) => project.category === "systems");
  const media = projects.filter((project) => project.category === "media");
  const pathways = pathwayDefinitions.map((pathway, index) => {
    if (index === 0 && systems[0]) {
      return { ...pathway, description: systems[0].shortDescription, meta: `${systems.length} published systems` };
    }
    if (index === 1 && media[0]) {
      return { ...pathway, description: media[0].shortDescription, meta: `${media.length} published media projects` };
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

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {pathways.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={
                `group panel relative flex min-h-[190px] flex-col overflow-hidden p-5 transition hover:border-[var(--border-strong)] sm:min-h-[210px] sm:p-6 ${index === 0 ? "border-[var(--border-strong)] bg-[var(--panel-raised)]" : ""}`
              }
            >
              <div className="absolute right-5 top-5 text-sm text-[var(--dim)] transition group-hover:text-[var(--red)] sm:right-6 sm:top-6">
                /+
              </div>
              <p className="mb-6 text-[10px] uppercase tracking-[0.15em] text-[var(--dim)]">
                {item.code}
              </p>
              <h3 className="text-[clamp(1.35rem,2vw,1.65rem)] font-black tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="mt-3 pretty text-[15px] leading-6 text-[var(--muted)]">
                {item.description}
              </p>

              <p
                className={
                  item.action
                    ? "mt-auto pt-6 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--red)]"
                    : "mt-auto pt-6 text-[10px] uppercase tracking-[0.15em] text-[var(--dim)]"
                }
              >
                {item.action ?? item.meta}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
