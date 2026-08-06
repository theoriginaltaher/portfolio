import Link from "next/link";

export function FeaturedSignalSection() {
  return (
    <section className="border-b hairline py-16 md:py-24" id="signal">
      <div className="site-shell grid-field flex items-center justify-center px-4 py-10 md:py-16">
        <article className="panel grid w-full max-w-4xl overflow-hidden md:grid-cols-[1fr_260px]">
          <div className="p-8 md:p-14">
            <p className="mb-8 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--blue-quiet)]">
              Signal Lab / Note Manifest
            </p>
            <h2 className="balanced max-w-xl text-5xl font-black leading-[0.96] tracking-[-0.045em] md:text-6xl">
              Architecting Meaningful
              <span className="block text-[var(--red)]">Signals.</span>
            </h2>
            <p className="mt-8 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
              How AI changes creative workflows when used as a system, not a
              shortcut. The useful shift is a clearer relationship between
              intent, material, and review.
            </p>
            <Link
              href="/blog"
              className="mt-10 inline-flex h-11 items-center bg-[var(--red)] px-6 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#9e1c1c]"
            >
              Read Signal
            </Link>
          </div>
          <aside className="border-t hairline p-8 text-sm md:border-l md:border-t-0">
            <p className="mb-8 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
              Note Attributes
            </p>
            <div className="space-y-8">
              <div>
                <p className="text-[var(--dim)]">Focus</p>
                <p className="mt-2 text-[var(--text)]">Low signal, high fidelity</p>
              </div>
              <div>
                <p className="text-[var(--dim)]">Discipline</p>
                <p className="mt-2 text-[var(--red)]">Workflow architecture</p>
              </div>
              <div>
                <p className="text-[var(--dim)]">Output</p>
                <p className="mt-2 text-[var(--blue-quiet)]">Notes / Case file</p>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </section>
  );
}
