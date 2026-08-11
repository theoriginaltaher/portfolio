import { SectionLabel } from "./SectionLabel";

const tracks = [
  {
    name: "AI Workflows",
    detail: "Manual pipeline integration",
    status: "Active",
    color: "red",
    notes: ["LLM core deployment", "Integration orchestration"],
  },
  {
    name: "Media Systems",
    detail: "Scalable editing and storage architecture",
    status: "Building",
    color: "blue",
    notes: ["Asset proxy engine", "I/O standardization"],
  },
  {
    name: "Digital Platforms",
    detail: "E-commerce and SaaS orchestration frameworks",
    status: "In progress",
    color: "neutral",
    notes: ["Next component library", "Content models"],
  },
] as const;

export function RoadmapSection() {
  return (
    <section className="border-b hairline py-12 sm:py-14 md:py-20" id="roadmap">
      <div className="site-shell max-w-[1440px]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 sm:mb-10">
        <SectionLabel label="What I am working on" tone="blue" />
          <div className="hidden gap-5 text-[10px] uppercase tracking-[0.14em] text-[var(--dim)] sm:flex">
            <span className="before:mr-2 before:inline-block before:h-1.5 before:w-1.5 before:bg-[var(--red)]">Critical</span>
            <span className="before:mr-2 before:inline-block before:h-1.5 before:w-1.5 before:bg-[var(--blue)]">Systems</span>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {tracks.map((track) => (
            <div key={track.name}>
              <div className="mb-3 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-[15px] font-black uppercase tracking-[0.13em] sm:text-base">{track.name}</h3>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.13em] text-[var(--dim)] sm:text-[11px]">{track.detail}</p>
                </div>
                <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--blue-quiet)]">{track.status}</span>
              </div>
              <div className="h-px bg-white/10">
                <div
                  className={track.color === "red" ? "h-full origin-left animate-[barIn_1.1s_cubic-bezier(0.22,1,0.36,1)_both] bg-[var(--red)]" : track.color === "blue" ? "h-full origin-left animate-[barIn_1.1s_cubic-bezier(0.22,1,0.36,1)_0.12s_both] bg-[var(--blue)] opacity-90" : "h-full origin-left animate-[barIn_1.1s_cubic-bezier(0.22,1,0.36,1)_0.24s_both] bg-white/35"}
                  style={{ width: "24%" }}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-x-7 gap-y-1.5 text-[10px] uppercase tracking-[0.13em] text-[var(--dim)] sm:text-[11px]">
                {track.notes.map((note) => <span key={note}>{note}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
