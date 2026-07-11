import Link from "next/link";
import { SectionLabel } from "./SectionLabel";

const pathways = [
  {
    code: "01_INDEX_SYSTEMS",
    title: "Digital Systems Lab",
    description:
      "Architecture and development of high-density technical infrastructure for media-intensive operations.",
    href: "/projects/systems",
    meta: "Cloud / Product / Ops",
    featured: true,
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
    wide: true,
  },
];

export function ProjectBinSection() {
  return (
    <section className="border-b hairline bg-[#060606] py-24 md:py-32" id="projects">
      <div className="site-shell max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
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
                  ? "group panel relative min-h-72 overflow-hidden p-9 transition hover:border-[var(--border-strong)] md:col-span-2"
                  : item.wide
                    ? "group panel relative min-h-40 overflow-hidden p-9 transition hover:border-[var(--border-strong)] md:col-span-2"
                    : "group panel relative min-h-56 overflow-hidden p-9 transition hover:border-[var(--border-strong)]"
              }
            >
              <div className="absolute right-9 top-9 text-sm text-[var(--dim)] transition group-hover:text-[var(--red)]">
                /+
              </div>
              <p className="mb-10 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
                {item.code}
              </p>
              <h3 className="text-3xl font-black tracking-[-0.04em]">{item.title}</h3>
              <p className="mt-4 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
                {item.description}
              </p>
              <p className="mt-9 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
                {item.meta}
              </p>
              {item.featured ? (
                <div className="absolute bottom-9 right-9 hidden h-24 w-24 border border-white/5 opacity-40 md:block">
                  <div className="m-auto mt-6 h-12 w-12 border border-white/10" />
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
