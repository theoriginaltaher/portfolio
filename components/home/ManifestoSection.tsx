import { SectionLabel } from "./SectionLabel";

const principles = [
  {
    label: "Story first",
    body: "Every project starts with the message. Whether it is a film, an event album, a website, or an automation, the work should communicate clearly and feel intentional.",
  },
  {
    label: "Structure underneath",
    body: "Strong creative work needs organized files, repeatable workflows, clear interfaces, and tools that make the next step easier for everyone involved.",
  },
  {
    label: "AI with judgment",
    body: "AI is useful when it supports a considered decision. I use it to improve speed and range without giving up taste, context, or responsibility.",
  },
  {
    label: "Made to be used",
    body: "A website should be easy to navigate, an album should be easy to explore, and a workflow should save real time for the people who rely on it.",
  },
];

export function ManifestoSection() {
  return (
    <section className="border-b hairline py-16 md:py-24" id="philosophy">
      <div className="site-shell max-w-[1320px]">
        <SectionLabel label="How I work" />

        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <h3 className="balanced max-w-xl text-[clamp(2.25rem,5vw,4.5rem)] font-black leading-[0.98] tracking-[-0.04em]">
              Creative work, supported by clear thinking.
            </h3>
            <p className="pretty mt-6 max-w-xl text-base leading-8 text-[#b6bbc2]">
              I care about the work people see and the decisions that make it possible.
              That means bringing story, design, technology, and delivery into the same
              conversation from the beginning.
            </p>
            <blockquote className="mt-10 max-w-lg border-t border-[var(--red)] pt-6 text-lg leading-8 text-[#d0d4da]">
              The best result feels thoughtful on the surface and dependable underneath.
            </blockquote>
          </div>

          <div className="border-t border-[var(--border-strong)]">
            {principles.map((principle, index) => (
              <article
                key={principle.label}
                className="grid gap-4 border-b border-[var(--border)] py-7 sm:grid-cols-[40px_0.65fr_1fr] sm:gap-7 sm:py-8"
              >
                <p className="text-sm font-semibold text-[var(--red)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h4 className="text-lg font-bold tracking-[-0.02em]">{principle.label}</h4>
                <p className="pretty text-sm leading-7 text-[var(--muted)]">{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
