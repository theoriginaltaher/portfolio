import Link from "next/link";
import type { SystemProject } from "@/data/projects";

function SystemVisual({ index }: { index: number }) {
  const patterns = [
    <div key="pipeline" className="grid h-full grid-cols-[0.72fr_1.35fr] gap-3 p-4 md:p-6">
      <div className="space-y-2 border-r border-white/8 pr-3">
        {["Intake", "Build", "Review", "Release"].map((label, itemIndex) => (
          <div key={label} className={`flex items-center justify-between border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] ${itemIndex === 1 ? "border-[var(--red)] bg-[var(--red-soft)] text-white" : "border-white/8 text-white/38"}`}>
            {label}<span>0{itemIndex + 1}</span>
          </div>
        ))}
      </div>
      <div className="relative grid place-items-center overflow-hidden bg-black/24">
        <div className="absolute inset-0 grid-field opacity-35" />
        <div className="relative w-[72%] border border-white/10 bg-[#111] p-4">
          <div className="mb-5 flex items-center justify-between text-[8px] uppercase tracking-[0.12em] text-white/36"><span>Production board</span><span className="text-[#20c56b]">Live</span></div>
          <div className="space-y-2"><span className="block h-1.5 w-3/4 bg-white/22" /><span className="block h-1.5 w-1/2 bg-[var(--red)]" /><span className="block h-1.5 w-5/6 bg-white/10" /></div>
        </div>
      </div>
    </div>,
    <div key="web" className="relative h-full p-4 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(0,72,172,0.24),transparent_32%)]" />
      <div className="relative mx-auto h-full max-w-[86%] border border-white/10 bg-[#0a0a0a]">
        <div className="flex h-8 items-center gap-1.5 border-b border-white/8 px-3"><i className="h-1.5 w-1.5 rounded-full bg-[var(--red)]" /><i className="h-1.5 w-1.5 rounded-full bg-white/16" /><i className="h-1.5 w-1.5 rounded-full bg-white/16" /></div>
        <div className="grid h-[calc(100%-2rem)] grid-cols-[1.4fr_0.8fr] gap-3 p-4">
          <div className="flex flex-col justify-end border border-white/6 bg-[linear-gradient(140deg,#151515,#080808)] p-4"><span className="mb-2 h-2 w-1/3 bg-[var(--red)]" /><span className="h-5 w-4/5 bg-white/80" /><span className="mt-2 h-1.5 w-3/5 bg-white/18" /></div>
          <div className="space-y-3"><span className="block h-[44%] border border-white/6 bg-white/[0.025]" /><span className="block h-[44%] border border-white/6 bg-[var(--blue-soft)]" /></div>
        </div>
      </div>
    </div>,
    <div key="tokens" className="grid h-full grid-cols-2 gap-px bg-white/6 p-px">
      {["Type / 64", "Space / 24", "Ink / 94", "Motion / 240"].map((item, itemIndex) => (
        <div key={item} className="flex flex-col justify-between bg-[#0d0d0d] p-4 md:p-6"><span className="text-[9px] font-bold uppercase tracking-[0.13em] text-white/38">{item}</span><span className={`block ${itemIndex === 2 ? "h-14 bg-white/85" : itemIndex === 3 ? "h-px w-full bg-[var(--red)]" : "h-5 w-3/5 bg-white/10"}`} /></div>
      ))}
    </div>,
    <div key="sensor" className="relative grid h-full place-items-center overflow-hidden">
      <div className="absolute inset-0 grid-field opacity-40" />
      {["h-44 w-44 border-white/7", "h-32 w-32 border-white/10", "h-20 w-20 border-[var(--blue-border)]"].map((classes) => <span key={classes} className={`absolute rounded-full border ${classes}`} />)}
      <span className="relative h-2 w-2 rounded-full bg-[var(--red)] shadow-[0_0_0_6px_rgba(176,32,32,0.12)]" />
      <span className="absolute bottom-5 left-5 text-[8px] font-bold uppercase tracking-[0.13em] text-white/32">Sensor field / responding</span>
    </div>,
  ];
  return patterns[index % patterns.length];
}

export function SystemsShowcase({ projects }: { projects: SystemProject[] }) {
  return (
    <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {projects.map((project, index) => (
        <article key={project.slug} className="group grid gap-0 py-8 md:grid-cols-[0.78fr_1.22fr] md:py-0">
          <div className="flex flex-col justify-between py-3 md:min-h-[440px] md:border-r md:border-white/[0.07] md:py-10 md:pr-10">
            <div>
              <div className="flex items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white/38"><span>{project.signal}</span><span>{project.year}</span></div>
              <h2 className="mt-8 max-w-lg balanced text-[clamp(2rem,4vw,4rem)] font-black leading-[0.96] tracking-[-0.035em] text-white">{project.title}</h2>
              <p className="mt-5 max-w-md pretty text-sm leading-7 text-[#ababab] md:text-[15px]">{project.description}</p>
            </div>
            <div className="mt-9">
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => <span key={tool} className="border border-white/9 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.11em] text-white/48">{tool}</span>)}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4 text-xs">
                <span className="flex items-center gap-2 text-white/52"><span className="h-1.5 w-1.5 bg-[#20c56b]" />{project.status}</span>
                <Link href={`/projects/${project.slug}`} className="font-bold text-white transition hover:text-[var(--red)]">Open case study →</Link>
              </div>
            </div>
          </div>
          <div className="mt-5 min-h-[320px] bg-[#0b0b0b] md:my-10 md:ml-10 md:mt-10"><SystemVisual index={index} /></div>
        </article>
      ))}
    </div>
  );
}
