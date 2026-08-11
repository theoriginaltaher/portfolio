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

function PageHero({ eyebrow, title, summary, stats = [] }: InnerPageProps) {
  return (
    <section className="border-b hairline pt-28 sm:pt-32">
      <div className="site-shell pb-14 md:pb-20">
        <p className="mb-6 text-sm font-semibold text-[var(--red)]">{eyebrow}</p>
        <h1 className="balanced max-w-5xl text-[clamp(3rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl pretty text-lg leading-8 text-[#c9ccd1]">{summary}</p>

        {stats.length > 0 ? (
          <dl className="mt-10 grid max-w-5xl gap-5 border-t border-white/10 pt-5 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-[var(--dim)]">{item.label}</dt>
                <dd className="mt-1 text-sm font-semibold leading-6 text-[var(--text)]">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

export function InnerPage(props: InnerPageProps) {
  const { primaryItems = [], timeline = [], sideTitle, sideItems = [], cta } = props;

  return (
    <main className="min-h-screen bg-[#060606]">
      <PageHero {...props} />

      <section className="border-b hairline py-14 md:py-20">
        <div className="site-shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
          <div className="border-t border-white/10">
            {primaryItems.map((item) => {
              const content = (
                <>
                  <p className="text-sm leading-6 text-[var(--blue-quiet)]">{item.meta}</p>
                  <h2 className="mt-3 text-[clamp(1.65rem,3vw,2.5rem)] font-black tracking-[-0.035em]">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
                    {item.description}
                  </p>
                </>
              );

              const className = "block border-b border-white/10 py-8 transition-colors md:py-10";
              return item.href ? (
                <Link key={item.title} href={item.href} className={`${className} group hover:text-[var(--red)]`}>
                  {content}
                  <span className="mt-5 inline-block text-sm font-semibold text-white group-hover:text-[var(--red)]">
                    Read article →
                  </span>
                </Link>
              ) : (
                <article key={item.title} className={className}>{content}</article>
              );
            })}
          </div>

          <aside className="h-fit border-t border-[var(--red)] pt-5">
            <h2 className="mb-6 text-lg font-bold tracking-[-0.02em]">{sideTitle ?? "Notes"}</h2>
            <div className="space-y-4">
              {sideItems.map((item) => (
                <p key={item} className="border-b border-white/7 pb-4 text-sm leading-6 text-[var(--muted)] last:border-b-0">
                  {item}
                </p>
              ))}
            </div>
            {cta ? (
              <Link href={cta.href} className="mt-7 inline-flex min-h-11 items-center border-b border-[var(--red)] text-sm font-semibold text-white transition hover:text-[var(--red)]">
                {cta.label} <span className="ml-3" aria-hidden="true">→</span>
              </Link>
            ) : null}
          </aside>
        </div>
      </section>

      {timeline.length > 0 ? (
        <section className="py-20 md:py-28">
          <div className="site-shell max-w-5xl">
            <h2 className="mb-10 text-3xl font-black tracking-[-0.04em] md:text-4xl">Timeline</h2>
            <div className="border-t border-white/10">
              {timeline.map((item) => (
                <article key={`${item.period}-${item.title}`} className="grid gap-5 border-b border-white/10 py-8 md:grid-cols-[160px_1fr]">
                  <p className="text-sm font-semibold text-[var(--red)]">{item.period}</p>
                  <div>
                    <h3 className="text-2xl font-black tracking-[-0.035em]">{item.title}</h3>
                    <p className="mt-3 pretty text-base leading-7 text-[var(--muted)]">{item.description}</p>
                    {item.tags ? (
                      <p className="mt-5 text-sm leading-6 text-[var(--dim)]">{item.tags.join(" · ")}</p>
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
