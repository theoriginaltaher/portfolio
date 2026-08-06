import { SectionLabel } from "./SectionLabel";

const files = ["projects", "philosophy.md", "core_stack.json", "archive.zip"];

export function ManifestoSection() {
  return (
    <section className="border-b hairline py-16 md:py-24" id="philosophy">
      <div className="site-shell max-w-6xl">
        <SectionLabel index="02 /" label="PHILOSOPHY.MD" />

        <div className="panel grid overflow-hidden md:grid-cols-[240px_1fr]">
          <aside className="border-b hairline bg-[#0b0b0b] p-5 md:border-b-0 md:border-r">
            <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[var(--dim)]">
              <span>Explorer</span>
              <span>v1</span>
            </div>
            <div className="space-y-1">
              {files.map((file) => (
                <div
                  key={file}
                  className={
                    file === "philosophy.md"
                      ? "bg-[var(--red-soft)] px-3 py-2.5 text-sm text-[var(--red)]"
                      : "px-3 py-2.5 text-sm text-[var(--muted)]"
                  }
                >
                  {file}
                </div>
              ))}
            </div>
          </aside>

          <article className="p-8 md:p-14">
            <p className="mb-8 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--red)]">
              Document.001
            </p>
            <h3 className="balanced max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] md:text-5xl">
              System / Architecture_Manifesto.
            </h3>
            <p className="mt-6 max-w-3xl pretty text-base leading-7 text-[var(--muted)]">
              Operational efficiency is derived from structural simplicity. Every
              component in a digital system must be justified by its functional
              contribution to the whole.
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div>
                <h4 className="mb-3 text-xs font-black uppercase tracking-[0.16em]">
                  01 / Intentionality
                </h4>
                <p className="pretty text-sm leading-6 text-[var(--muted)]">
                  Everything is a choice. Features, workflows, and visuals are
                  included only when they improve the operating model.
                </p>
              </div>
              <div>
                <h4 className="mb-3 text-xs font-black uppercase tracking-[0.16em]">
                  02 / Connectivity
                </h4>
                <p className="pretty text-sm leading-6 text-[var(--muted)]">
                  Systems earn value through integration: media, automation, and
                  product architecture working in one controlled environment.
                </p>
              </div>
            </div>

            <blockquote className="mt-12 border-l-2 border-[var(--red)] pl-7 text-lg italic leading-8 text-[#c3cad4]">
              Complexity is often a mask for lack of clarity. We seek the
              simple, the robust, and the enduring.
            </blockquote>
          </article>
        </div>
      </div>
    </section>
  );
}
