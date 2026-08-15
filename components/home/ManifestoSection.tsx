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

        <div className="panel overflow-hidden">
          <header className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b hairline bg-white/[0.015] px-5 py-3 text-[11px] font-black uppercase tracking-[0.13em] sm:px-7">
            <p className="text-[var(--red)]">Document.001 / Philosophy.md</p>
            <p className="text-[var(--blue-quiet)]">Working philosophy</p>
          </header>

          <article className="p-6 sm:p-8 md:p-12 lg:p-14">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:items-end lg:gap-16">
              <h3 className="balanced text-[clamp(2.15rem,5vw,4.5rem)] font-black leading-[0.94] tracking-[-0.04em] lg:text-[clamp(3rem,4.3vw,4rem)] lg:whitespace-nowrap">
                <span className="block">Creative systems.</span>
                <span className="block text-[#d9dde3]">Not isolated outputs.</span>
              </h3>
              <p className="max-w-[64ch] break-words pretty text-base leading-8 text-[#c0c4cb]">
                A website, video, album, design, or automation is only useful when it fits the larger system around it: the story, interface, workflow, media, and delivery process.
              </p>
            </div>

            <ol aria-label="Connected creative system" className="mt-10 flex flex-col border-y border-white/10 py-2 sm:flex-row sm:items-center sm:py-0 md:mt-12">
              {flow.map((step, index) => (
                <li key={step} className="flex min-h-12 items-center gap-3 text-sm font-black text-[var(--text)] sm:min-h-16 sm:flex-1 sm:justify-between sm:gap-2">
                  <span>{step}</span>
                  {index < flow.length - 1 ? (
                    <span aria-hidden="true" className="rotate-90 text-base font-normal text-[var(--red)] sm:rotate-0 sm:px-2">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>

            <div className="mt-10 grid md:grid-cols-2 md:gap-x-10 lg:gap-x-14">
              {principles.map((principle) => (
                <section key={principle.label} className="flex flex-col border-t border-white/10 py-6 md:min-h-[250px] md:py-7">
                  <h4 className="mb-4 flex items-baseline gap-3 text-sm font-black uppercase tracking-[0.08em]">
                    <span className="text-[11px] tracking-[0.12em] text-[var(--blue-quiet)]">{principle.number} /</span>
                    <span>{principle.label}</span>
                  </h4>
                  <p className="max-w-[62ch] break-words pretty text-[15px] leading-7 text-[#b9bec6]">{principle.body}</p>
                  <p className="mt-6 border-t border-white/7 pt-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--blue-quiet)] md:mt-auto">
                    {principle.tag}
                  </p>
                </section>
              ))}
            </div>

            <blockquote className="mt-5 max-w-4xl break-words border-t border-[var(--red)] pt-7 text-lg italic leading-8 text-[#cbd0d7] md:text-xl">
              The best work feels creative on the surface and structured underneath.
            </blockquote>
          </article>
        </div>
      </div>
    </section>
  );
}
