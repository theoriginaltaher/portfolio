import Link from "next/link";

type StatItem = {
  label: string;
  value: string;
};

type PanelItem = {
  title: string;
  description: string;
  meta?: string;
  href?: string;
};

type TimelineItem = {
  period: string;
  title: string;
  description: string;
  tags?: string[];
};

type InnerPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  stats?: StatItem[];
  primaryItems?: PanelItem[];
  timeline?: TimelineItem[];
  sideTitle?: string;
  sideItems?: string[];
  cta?: {
    label: string;
    href: string;
  };
};

function PageHero({ eyebrow, title, summary, stats }: InnerPageProps) {
  return (
    <section className="border-b hairline pt-32">
      <div className="site-shell grid gap-10 pb-20 md:grid-cols-[minmax(0,1fr)_320px] md:pb-24">
        <div>
          <p className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--red)]">
            {eyebrow}
          </p>
          <h1 className="balanced max-w-4xl text-[clamp(3.2rem,9vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl pretty text-lg leading-8 text-[#c9ccd1]">
            {summary}
          </p>
        </div>

        <aside className="panel self-end p-6">
          <p className="mb-6 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--blue-quiet)]">
            Page Index
          </p>
          <div className="space-y-5">
            {(stats ?? []).map((item) => (
              <div key={item.label} className="border-b border-white/6 pb-4 last:border-b-0 last:pb-0">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--dim)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--text)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export function InnerPage(props: InnerPageProps) {
  const { primaryItems = [], timeline = [], sideTitle, sideItems = [], cta } = props;

  return (
    <main className="min-h-screen bg-[#060606]">
      <PageHero {...props} />

      <section className="border-b hairline py-20 md:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-4 md:grid-cols-2">
            {primaryItems.map((item, index) => {
              const content = (
                <>
                  <div className="mb-12 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
                    <span>{String(index + 1).padStart(2, "0")}_module</span>
                    <span>/+</span>
                  </div>
                  <h2 className="text-3xl font-black tracking-[-0.04em]">
                    {item.title}
                  </h2>
                  <p className="mt-4 pretty text-base leading-7 text-[var(--muted)]">
                    {item.description}
                  </p>
                  {item.meta ? (
                    <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-[var(--dim)]">
                      {item.meta}
                    </p>
                  ) : null}
                </>
              );

              return item.href ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="panel min-h-64 p-8 transition hover:border-[var(--border-strong)]"
                >
                  {content}
                </Link>
              ) : (
                <article key={item.title} className="panel min-h-64 p-8">
                  {content}
                </article>
              );
            })}
          </div>

          <aside className="panel h-fit p-7">
            <p className="mb-6 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--red)]">
              {sideTitle ?? "Operating Notes"}
            </p>
            <div className="space-y-4">
              {sideItems.map((item) => (
                <p
                  key={item}
                  className="border-b border-white/6 pb-4 text-sm leading-6 text-[var(--muted)] last:border-b-0 last:pb-0"
                >
                  {item}
                </p>
              ))}
            </div>
            {cta ? (
              <Link
                href={cta.href}
                className="mt-8 inline-flex h-11 items-center bg-[var(--red)] px-6 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#9e1c1c]"
              >
                {cta.label}
              </Link>
            ) : null}
          </aside>
        </div>
      </section>

      {timeline.length > 0 ? (
        <section className="py-20 md:py-28">
          <div className="site-shell max-w-5xl">
            <div className="mb-12 flex items-center gap-5">
              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--blue-quiet)]">
                Log
              </span>
              <h2 className="text-3xl font-black tracking-[-0.04em] md:text-4xl">
                Operating Timeline
              </h2>
              <span className="h-px flex-1 bg-white/7" />
            </div>

            <div className="space-y-4">
              {timeline.map((item) => (
                <article
                  key={`${item.period}-${item.title}`}
                  className="grid gap-6 border border-white/7 bg-[#101010] p-6 md:grid-cols-[180px_1fr]"
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--red)]">
                    {item.period}
                  </p>
                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 pretty text-base leading-7 text-[var(--muted)]">
                      {item.description}
                    </p>
                    {item.tags ? (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-white/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[var(--dim)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
