import type { Metadata } from "next";
import { PageFrame } from "@/components/pages/PageFrame";
import { getExperience, getSkills } from "@/src/lib/content";
import type { ExperienceEntry } from "@/src/types";

export const metadata: Metadata = {
  title: "Journey & Expertise | Taher Hussain",
  description: "Taher Hussain's professional journey across creative technology, digital systems, media, and leadership.",
};

export const revalidate = 60;

function SectionHeading({ children, id }: Readonly<{ children: React.ReactNode; id: string }>) {
  return (
    <div className="mb-7 flex items-end gap-5 border-b border-[var(--border-strong)] pb-4 sm:mb-8">
      <h2 id={id} className="balanced text-2xl font-black tracking-[-0.035em] sm:text-3xl">{children}</h2>
      <span className="mb-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--red)]" aria-hidden="true" />
    </div>
  );
}

function ExperienceList({ entries }: { entries: ExperienceEntry[] }) {
  if (entries.length === 0) {
    return <p className="border-y border-[var(--border)] py-8 text-sm leading-7 text-[var(--muted)]">No verified entries are published in this section yet.</p>;
  }

  return (
    <div className="relative lg:pl-14">
      <span className="absolute bottom-6 left-[11px] top-6 hidden w-px bg-[var(--border-strong)] lg:block" aria-hidden="true" />
      <div className="space-y-6">
        {entries.map((entry) => (
          <article key={entry._id} className="interactive-lift group relative min-w-0 border border-[var(--border-strong)] bg-[var(--panel-muted)] p-6 hover:bg-[var(--panel)] sm:p-8 lg:grid lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,1.45fr)] lg:gap-12">
            <span className="absolute -left-[47px] top-8 hidden size-3 border border-[var(--red)] bg-[var(--background)] lg:block" aria-hidden="true" />
            <div>
              <h3 className="balanced text-xl font-black leading-tight tracking-[-0.03em] sm:text-2xl">{entry.role}</h3>
              <p className="mt-2 text-sm font-semibold text-[var(--blue-quiet)]">{entry.organisation}</p>
            </div>
            <div className="mt-6 border-t border-[var(--border)] pt-6 lg:mt-0 lg:border-t-0 lg:pt-0">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <p className="font-bold text-[#d5d7da]">{entry.dateRange}</p>
                {entry.current ? <span className="flex items-center gap-2 text-xs font-bold text-[#6fd69b]"><span className="size-1.5 bg-[#20c56b]" aria-hidden="true" />Current</span> : null}
              </div>
              <p className="pretty mt-5 max-w-[68ch] text-sm leading-7 text-[#aeb3ba] sm:text-[15px]">{entry.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default async function ExperiencePage() {
  const [experience, skills] = await Promise.all([getExperience(), getSkills()]);
  const professional = experience.filter((entry) => entry.category === "work");
  const leadership = experience.filter((entry) => entry.category === "leadership");

  return (
    <PageFrame>
      <main className="min-h-screen bg-[var(--background)] pt-14">
        <header className="border-b border-[var(--border)]">
          <div className="site-shell py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-[1320px]">
              <h1 className="balanced max-w-5xl text-[clamp(2.8rem,7vw,5.75rem)] font-black leading-[0.94] tracking-[-0.04em]">
                Journey <span className="font-light text-[var(--blue-quiet)]">&amp;</span> <span className="block sm:inline">Expertise</span>
              </h1>
              <p className="pretty mt-7 max-w-[72ch] text-base leading-7 text-[#bec2c8] sm:text-lg sm:leading-8">
                Roles and responsibilities published from the portfolio content system.
              </p>
            </div>
          </div>
        </header>

        <div className="site-shell py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1320px] space-y-20 sm:space-y-24 lg:space-y-28">
            <section aria-labelledby="professional-experience">
              <SectionHeading id="professional-experience">Professional Experience</SectionHeading>
              <ExperienceList entries={professional} />
            </section>

            <section aria-labelledby="leadership-community">
              <SectionHeading id="leadership-community">Leadership &amp; Community</SectionHeading>
              <ExperienceList entries={leadership} />
            </section>

            <section aria-labelledby="capabilities">
              <SectionHeading id="capabilities">Capabilities</SectionHeading>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => <span key={skill._id} className="border border-[var(--border-strong)] px-3 py-2 text-sm text-[#b5bac1]">{skill.label}</span>)}
                </div>
              ) : (
                <p className="border-y border-[var(--border)] py-8 text-sm leading-7 text-[var(--muted)]">No verified capabilities are published yet.</p>
              )}
            </section>
          </div>
        </div>
      </main>
    </PageFrame>
  );
}
