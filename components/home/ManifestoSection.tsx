import { SectionLabel } from "./SectionLabel";

const flow = ["Story", "Media", "Interface", "Workflow", "System"];

const principles = [
  {
    number: "01",
    label: "Story First",
    body: "Every project starts with the message. Whether it is a brand film, event album, website, or automation, the output must communicate clearly and feel intentional.",
    tag: "Message / Intent / Direction",
  },
  {
    number: "02",
    label: "Systems Underneath",
    body: "Strong creative work needs structure behind it: organized files, repeatable workflows, clean interfaces, reliable platforms, and tools that make execution easier.",
    tag: "Structure / Workflow / Delivery",
  },
  {
    number: "03",
    label: "AI With Taste",
    body: "AI is useful only when guided by judgment. The goal is not to generate more noise, but to improve speed, clarity, quality, and creative decision-making.",
    tag: "Judgment / Speed / Quality",
  },
  {
    number: "04",
    label: "Built To Be Used",
    body: "Every solution should be practical. A website should be easy to navigate, an album should be easy to explore, a system should be easy to operate, and a workflow should save real time.",
    tag: "Usability / Operation / Time Saved",
  },
];

export function ManifestoSection() {
  return (
    <section className="border-b hairline py-16 md:py-24" id="philosophy">
      <div className="site-shell max-w-[1440px]">
        <SectionLabel index="02 /" label="PHILOSOPHY.MD" />

        <div className="panel mx-auto max-w-[1240px] overflow-hidden">
          <div className="grid md:grid-cols-[190px_minmax(0,1fr)]">
            <aside aria-label="Philosophy document files" className="border-b hairline bg-[#0c0c0c] p-3 md:border-b-0 md:border-r md:p-4">
              <p className="px-2 text-[11px] font-black uppercase tracking-[0.12em] text-[var(--dim)]">Files</p>
              <ul className="mt-2 flex gap-1 overflow-x-auto md:flex-col">
                <li className="flex min-h-9 shrink-0 items-center gap-2 bg-[var(--red-soft)] px-3 text-xs font-bold text-[var(--text)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)]" aria-hidden="true" />
                  philosophy.md
                </li>
                {['media_workflows', 'systems_logic', 'ai_process'].map((file) => (
                  <li key={file} className="flex min-h-9 shrink-0 items-center px-3 text-xs text-[var(--dim)]">
                    {file}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="min-w-0">
              <header className="flex min-h-11 items-center justify-between gap-4 border-b hairline bg-white/[0.015] px-5 text-[11px] font-black uppercase tracking-[0.12em]">
                <p className="text-[var(--red)]">Document.001</p>
                <p className="text-[var(--blue-quiet)]">Philosophy.md</p>
              </header>

              <article className="p-5 sm:p-6 lg:p-8">
                <div className="grid gap-4 lg:grid-cols-[minmax(260px,0.75fr)_minmax(0,1.25fr)] lg:items-end lg:gap-10">
                  <h3 className="balanced text-[clamp(1.9rem,3.5vw,2.75rem)] font-black leading-[1.02] tracking-[-0.04em]">
                    <span className="block">Creative systems,</span>
                    <span className="block text-[#d9dde3]">not isolated outputs.</span>
                  </h3>
                  <p className="max-w-[68ch] break-words pretty text-[15px] leading-7 text-[#c0c4cb]">
                    A website, video, album, design, or automation is only useful when it fits the larger system around it: the story, interface, workflow, media, and delivery process.
                  </p>
                </div>

                <ol aria-label="Connected creative system" className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-y border-white/10 py-3 text-xs font-bold text-[var(--muted)]">
                  {flow.map((step, index) => (
                    <li key={step} className="flex items-center gap-2">
                      <span>{step}</span>
                      {index < flow.length - 1 ? <span aria-hidden="true" className="text-[var(--red)]">→</span> : null}
                    </li>
                  ))}
                </ol>

                <div className="mt-5 grid border-l border-t border-white/8 lg:grid-cols-2">
                  {principles.map((principle) => (
                    <section key={principle.label} className="flex flex-col border-b border-r border-white/8 bg-white/[0.012] p-4 lg:p-5">
                      <h4 className="mb-2.5 flex items-baseline gap-2.5 text-[13px] font-black uppercase tracking-[0.07em]">
                        <span className="text-[11px] tracking-[0.1em] text-[var(--blue-quiet)]">{principle.number} /</span>
                        <span>{principle.label}</span>
                      </h4>
                      <p className="max-w-[62ch] break-words pretty text-sm leading-6 text-[#b9bec6]">{principle.body}</p>
                      <p className="mt-3 text-[11px] font-bold uppercase leading-5 tracking-[0.08em] text-[var(--blue-quiet)]">
                        {principle.tag}
                      </p>
                    </section>
                  ))}
                </div>

                <blockquote className="mt-4 border-t border-white/10 pt-4 text-sm italic leading-6 text-[#bfc4cb]">
                  <span className="mr-2 text-[var(--red)]" aria-hidden="true">/</span>
                  The best work feels creative on the surface and structured underneath.
                </blockquote>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
