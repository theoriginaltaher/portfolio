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
    featured: true,
    details: [
      ["Scope", "Architecture, build, cloud deployment, operating handoff"],
      ["Field", "Media-intensive operations and internal tooling"],
      ["Constraint solved", "Throughput held while headcount stayed flat"],
    ],
    action: "Read the case file",
  },
  {
    code: "02_MEDIA_PIPE",
    title: "Media Gallery",
    description: "High-fidelity cinematic production and storytelling pipelines.",
    href: "/projects/media",
    meta: "Photo / Video / Narrative",
    details: [
      ["Scope", "Direction, capture, edit, asset pipeline"],
      ["Field", "Brand and founder-led storytelling"],
      ["Solved", "Repeatable output without losing craft"],
    ],
  },
  {
    code: "03_USER_X",
    title: "Experience Design",
    description: "Neutral interface research and accessibility-focused UX.",
    href: "/projects",
    meta: "Systems / Screens / Behavior",
    details: [
      ["Scope", "Interface research, accessibility passes"],
      ["Field", "Operator-facing tools"],
      ["Solved", "Dense data made readable under pressure"],
    ],
  },
  {
    code: "04_WRITING",
    title: "Writing & Documentation",
    description: "Technical writing, operating notes, and decision records.",
    href: "/blog",
    meta: "Notes / Docs / Signals",
    wide: true,
    note:
      "Decision records that explain why a system is shaped the way it is: the reasoning, not just the result.",
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
    <section className="border-b hairline bg-[#060606] py-16 md:py-24" id="projects">
      <div className="site-shell max-w-6xl">
        <div className="mb-11 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionLabel index="03 /" label="Project_Bin.index" />
          <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
            Systems / Media / Writing
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {pathways.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={
                item.featured
                  ? "group panel relative min-h-[260px] overflow-hidden p-6 transition hover:border-[var(--border-strong)] md:col-span-2 md:p-9"
                  : item.wide
                    ? "group panel relative overflow-hidden p-6 transition hover:border-[var(--border-strong)] md:col-span-2 md:p-9"
                    : "group panel relative min-h-[200px] overflow-hidden p-6 transition hover:border-[var(--border-strong)] md:p-9"
              }
            >
              <div className="absolute right-6 top-6 text-sm text-[var(--dim)] transition group-hover:text-[var(--red)] md:right-9 md:top-9">
                /+
              </div>
              <p className="mb-9 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
                {item.code}
              </p>
              <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-black tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
                {item.description}
              </p>

              {"details" in item && item.details ? (
                <dl
                  className={
                    item.featured
                      ? "mt-7 grid gap-x-8 gap-y-5 border-t border-white/6 pt-6 text-sm md:grid-cols-3"
                      : "mt-6 grid gap-3.5 border-t border-white/6 pt-5 text-[13px]"
                  }
                >
                  {item.details.map(([label, value]) => (
                    <div
                      key={label}
                      className={item.featured ? "" : "flex gap-3"}
                    >
                      <dt
                        className={
                          item.featured
                            ? "mb-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--dim)]"
                            : "min-w-24 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--dim)]"
                        }
                      >
                        {label}
                      </dt>
                      <dd className="m-0 flex-1 leading-6 text-[#c6c9ce]">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {"note" in item && item.note ? (
                <p className="mt-6 max-w-3xl pretty text-[15px] leading-7 text-[#c6c9ce]">
                  {item.note}
                </p>
              ) : null}

              <p
                className={
                  item.action
                    ? "mt-6 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--red)]"
                    : "mt-6 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]"
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
