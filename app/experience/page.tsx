import type { Metadata } from "next";
import { PageFrame } from "@/components/pages/PageFrame";
import {
  getCareerProjects,
  getCertifications,
  getCourses,
  getEducation,
  getExperience,
  getLanguages,
  getRecommendations,
  getSkills,
} from "@/src/lib/content";
import type { CareerProject, ExperienceEntry } from "@/src/types";

export const metadata: Metadata = {
  title: "Journey & Expertise | Taher Hussain",
  description: "Taher Hussain's professional experience, education, projects, credentials, and capabilities.",
};

export const revalidate = 60;

function SectionHeading({ children, id, count }: Readonly<{ children: React.ReactNode; id: string; count?: number }>) {
  return (
    <div className="mb-7 flex items-end justify-between gap-5 border-b border-[var(--border-strong)] pb-4 sm:mb-8">
      <div className="flex items-end gap-5">
        <h2 id={id} className="balanced text-2xl font-black tracking-[-0.035em] sm:text-3xl">{children}</h2>
        <span className="mb-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--red)]" aria-hidden="true" />
      </div>
      {typeof count === "number" ? <span className="text-xs font-bold tabular-nums text-[var(--dim)]">{count}</span> : null}
    </div>
  );
}

function EmptyState() {
  return <p className="border-y border-[var(--border)] py-8 text-sm leading-7 text-[var(--muted)]">No verified entries are published in this section yet.</p>;
}

function ExperienceList({ entries }: { entries: ExperienceEntry[] }) {
  if (entries.length === 0) return <EmptyState />;

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
              {entry.location ? <p className="mt-2 text-xs text-[var(--dim)]">{entry.location}</p> : null}
            </div>
            <div className="mt-6 border-t border-[var(--border)] pt-6 lg:mt-0 lg:border-t-0 lg:pt-0">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <p className="font-bold text-[#d5d7da]">{entry.dateRange}</p>
                {entry.current ? <span className="flex items-center gap-2 text-xs font-bold text-[#6fd69b]"><span className="size-1.5 bg-[#20c56b]" aria-hidden="true" />Current</span> : null}
              </div>
              {entry.description ? <p className="pretty mt-5 max-w-[68ch] whitespace-pre-line text-sm leading-7 text-[#aeb3ba] sm:text-[15px]">{entry.description}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CareerProjectList({ projects }: { projects: CareerProject[] }) {
  if (projects.length === 0) return <EmptyState />;
  return (
    <div className="border-t border-[var(--border-strong)]">
      {projects.map((project) => (
        <article key={project._id} className="grid gap-5 border-b border-[var(--border)] py-8 lg:grid-cols-[minmax(220px,.65fr)_minmax(0,1.35fr)] lg:gap-12">
          <div>
            <p className="text-xs font-bold text-[var(--blue-quiet)]">{[project.startDate, project.endDate].filter(Boolean).join(" · ")}</p>
            <h3 className="balanced mt-3 text-xl font-black leading-tight tracking-[-0.03em]">{project.title}</h3>
          </div>
          <div>
            <p className="pretty whitespace-pre-line text-sm leading-7 text-[#aeb3ba]">{project.description}</p>
            {project.externalUrl ? <a href={project.externalUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-xs font-bold text-[var(--red)] transition hover:text-[var(--text)]">View project source ↗</a> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function ExperiencePage() {
  const [experience, skills, education, certifications, courses, languages, careerProjects, recommendations] = await Promise.all([
    getExperience(),
    getSkills(),
    getEducation(),
    getCertifications(),
    getCourses(),
    getLanguages(),
    getCareerProjects(),
    getRecommendations(),
  ]);
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
                A working record of roles, projects, education, and practical capabilities. Every entry is managed through the portfolio content system.
              </p>
            </div>
          </div>
        </header>

        <div className="site-shell py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1320px] space-y-20 sm:space-y-24 lg:space-y-28">
            <section aria-labelledby="professional-experience">
              <SectionHeading id="professional-experience" count={professional.length}>Professional Experience</SectionHeading>
              <ExperienceList entries={professional} />
            </section>

            <section aria-labelledby="leadership-community">
              <SectionHeading id="leadership-community" count={leadership.length}>Leadership &amp; Community</SectionHeading>
              <ExperienceList entries={leadership} />
            </section>

            <section aria-labelledby="selected-projects">
              <SectionHeading id="selected-projects" count={careerProjects.length}>Selected Projects</SectionHeading>
              <CareerProjectList projects={careerProjects} />
            </section>

            <section aria-labelledby="education">
              <SectionHeading id="education" count={education.length}>Education</SectionHeading>
              {education.length ? <div className="border-t border-[var(--border-strong)]">{education.map((entry) => <article key={entry._id} className="grid gap-6 border-b border-[var(--border)] py-8 lg:grid-cols-[minmax(220px,.65fr)_minmax(0,1.35fr)] lg:gap-12"><div><h3 className="text-xl font-black tracking-[-0.03em]">{entry.qualification}</h3><p className="mt-2 text-sm font-semibold text-[var(--blue-quiet)]">{entry.school}</p><p className="mt-3 text-xs text-[var(--dim)]">{[entry.startDate, entry.endDate].filter(Boolean).join(" · ")}</p></div><div><p className="pretty text-sm leading-7 text-[#aeb3ba]">{entry.description}</p>{entry.activities.length ? <ul className="mt-5 space-y-2 text-sm leading-6 text-[var(--muted)]">{entry.activities.map((activity) => <li key={activity}>{activity}</li>)}</ul> : null}</div></article>)}</div> : <EmptyState />}
            </section>

            <section className="grid gap-16 lg:grid-cols-2 lg:gap-12" aria-label="Credentials and languages">
              <div>
                <SectionHeading id="certifications" count={certifications.length}>Certifications</SectionHeading>
                <div className="border-t border-[var(--border-strong)]">{certifications.map((item) => <article key={item._id} className="border-b border-[var(--border)] py-6"><div className="flex items-start justify-between gap-6"><div><h3 className="font-black">{item.name}</h3><p className="mt-2 text-sm text-[var(--blue-quiet)]">{item.issuer}</p></div><span className="shrink-0 text-xs text-[var(--dim)]">{item.issuedOn}</span></div>{item.credentialUrl ? <a href={item.credentialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-xs font-bold text-[var(--red)] transition hover:text-[var(--text)]">Verify credential ↗</a> : null}</article>)}</div>
              </div>
              <div>
                <SectionHeading id="languages" count={languages.length}>Languages</SectionHeading>
                <div className="border-t border-[var(--border-strong)]">{languages.map((language) => <div key={language._id} className="flex items-center justify-between gap-6 border-b border-[var(--border)] py-5"><span className="font-black">{language.name}</span><span className="text-right text-xs leading-5 text-[var(--muted)]">{language.proficiency}</span></div>)}</div>
              </div>
            </section>

            <section aria-labelledby="capabilities">
              <SectionHeading id="capabilities" count={skills.length}>Capabilities</SectionHeading>
              {skills.length > 0 ? <div className="flex flex-wrap gap-2">{skills.map((skill) => <span key={skill._id} className="border border-[var(--border-strong)] px-3 py-2 text-sm text-[#b5bac1]">{skill.label}</span>)}</div> : <EmptyState />}
            </section>

            <section aria-labelledby="courses">
              <SectionHeading id="courses" count={courses.length}>Additional Training</SectionHeading>
              <div className="grid border-t border-[var(--border-strong)] sm:grid-cols-2 lg:grid-cols-3">{courses.map((course) => <div key={course._id} className="border-b border-[var(--border)] py-5 pr-6 text-sm font-semibold sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 lg:border-r lg:px-6 lg:first:pl-0 lg:nth-[3n]:border-r-0">{course.name}</div>)}</div>
            </section>

            {recommendations.length ? <section aria-labelledby="recommendations"><SectionHeading id="recommendations" count={recommendations.length}>Recommendation</SectionHeading>{recommendations.map((item) => <figure key={item._id} className="grid gap-8 border-y border-[var(--border-strong)] py-10 lg:grid-cols-[minmax(220px,.42fr)_minmax(0,1fr)] lg:gap-12"><figcaption><p className="font-black">{item.personName}</p><p className="mt-2 text-sm text-[var(--blue-quiet)]">{[item.role, item.organisation].filter(Boolean).join(" · ")}</p></figcaption><blockquote className="pretty text-xl font-medium leading-9 text-[#d5d7da]">“{item.quote}”</blockquote></figure>)}</section> : null}
          </div>
        </div>
      </main>
    </PageFrame>
  );
}
