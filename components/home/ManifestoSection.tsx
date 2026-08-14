import { SectionLabel } from "./SectionLabel";

const principles = [
  {
    label: "01 / Story first",
    body: "Every project starts with the message. Whether it is a brand film, event album, website, or automation, the output must communicate clearly and feel intentional.",
  },
  {
    label: "02 / Systems underneath",
    body: "Strong creative work needs structure behind it: organized files, repeatable workflows, clean interfaces, reliable platforms, and tools that make execution easier.",
  },
  {
    label: "03 / AI with taste",
    body: "AI is useful only when guided by judgment. The goal is not to generate more noise, but to improve speed, clarity, quality, and creative decision-making.",
  },
  {
    label: "04 / Built to be used",
    body: "Every solution should be practical. A website should be easy to navigate, an album should be easy to explore, a system should be easy to operate, and a workflow should save real time.",
  },
];

export function ManifestoSection() {
  return (
    <section className="border-b hairline py-16 md:py-24" id="philosophy">
      <div className="site-shell max-w-[1440px]">
        <SectionLabel index="02 /" label="PHILOSOPHY.MD" />

        <div className="panel overflow-hidden">
          <article className="p-8 md:p-14">
            <p className="mb-8 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--red)]">
              Document.001
            </p>
            <h3 className="balanced max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
              Creative systems, not isolated outputs.
            </h3>
            <p className="mt-6 max-w-3xl break-words pretty text-base leading-7 text-[var(--muted)]">
              Good digital work is not just a website, a video, a design, or an automation in isolation. It is the way all of those pieces connect: the story, the interface, the workflow, the media, and the system behind it.
            </p>

            <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {principles.map((principle) => (
                <div key={principle.label}>
                  <h4 className="mb-3 text-xs font-black uppercase tracking-[0.16em]">{principle.label}</h4>
                  <p className="break-words pretty text-sm leading-6 text-[var(--muted)]">{principle.body}</p>
                </div>
              ))}
            </div>

            <blockquote className="mt-12 break-words border-l-2 border-[var(--red)] pl-7 text-lg italic leading-8 text-[#c3cad4]">
              The best work feels creative on the surface and structured underneath.
            </blockquote>
          </article>
        </div>
      </div>
    </section>
  );
}
