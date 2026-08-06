import { SectionLabel } from "./SectionLabel";

const tracks = [
  {
    name: "AI Workflows",
    detail: "Manual pipeline integration",
    percent: "82%",
    color: "red",
    notes: ["LLM Core Deployment", "Integration Orchestration"],
  },
  {
    name: "Media Systems",
    detail: "Scalable editing and storage architecture",
    percent: "66%",
    color: "blue",
    notes: ["Asset Proxy Engine", "I/O Standardization"],
  },
  {
    name: "Digital Platforms",
    detail: "E-commerce and SaaS orchestration frameworks",
    percent: "48%",
    color: "neutral",
    notes: ["Next Component Library", "Content Models"],
  },
];

export function RoadmapSection() {
  return (
    <section className="border-b hairline py-16 md:py-24" id="roadmap">
      <div className="site-shell max-w-5xl">
        <div className="mb-11 flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index="04 /" label="Active Roadmap" tone="blue" />
          <div className="hidden gap-5 text-[11px] uppercase tracking-[0.14em] text-[var(--dim)] md:flex">
            <span className="before:mr-2 before:inline-block before:h-1.5 before:w-1.5 before:bg-[var(--red)]">
              Critical
            </span>
            <span className="before:mr-2 before:inline-block before:h-1.5 before:w-1.5 before:bg-[var(--blue)]">
              Systems
            </span>
          </div>
        </div>

        <div className="space-y-11">
          {tracks.map((track) => (
            <div key={track.name}>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <h3 className="text-base font-black uppercase tracking-[0.14em]">
                    {track.name}
                  </h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--dim)]">
                    {track.detail}
                  </p>
                </div>
                <span className="text-sm text-[var(--muted)]">{track.percent}</span>
              </div>
              <div
                className="h-2.5 bg-white/8"
                role="progressbar"
                aria-valuenow={Number.parseInt(track.percent, 10)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${track.name} progress`}
              >
                <div
                  className={
                    track.color === "red"
                      ? "h-full origin-left animate-[barIn_1.1s_cubic-bezier(0.22,1,0.36,1)_both] bg-[var(--red)]"
                      : track.color === "blue"
                        ? "h-full origin-left animate-[barIn_1.1s_cubic-bezier(0.22,1,0.36,1)_0.12s_both] bg-[var(--blue)] opacity-90"
                        : "h-full origin-left animate-[barIn_1.1s_cubic-bezier(0.22,1,0.36,1)_0.24s_both] bg-white/24"
                  }
                  style={{ width: track.percent }}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-10 text-[11px] uppercase tracking-[0.14em] text-[var(--dim)]">
                {track.notes.map((note) => (
                  <span key={note}>{note}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
