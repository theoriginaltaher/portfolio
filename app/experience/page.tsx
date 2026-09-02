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
    <div className="mb-2 flex items-end justify-between gap-5 border-b border-[var(--border-strong)] pb-5 sm:mb-3">
      <h2 id={id} className="balanced text-2xl font-black tracking-[-0.035em] sm:text-3xl">{children}</h2>
      {typeof count === "number" ? <span className="pb-1 text-xs tabular-nums text-[var(--dim)]">{count} {count === 1 ? "entry" : "entries"}</span> : null}
    </div>
  );
}

function EmptyState() {
  return <p className="border-y border-[var(--border)] py-8 text-sm leading-7 text-[var(--muted)]">No verified entries are published in this section yet.</p>;
}

function ExperienceList({ entries }: { entries: ExperienceEntry[] }) {
  if (entries.length === 0) return <EmptyState />;

  return (
    <ol>
      {entries.map((entry, index) => (
        <li key={entry._id} className="group relative grid min-w-0 grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4 border-b border-[var(--border)] py-8 first:pt-7 sm:grid-cols-[1.5rem_minmax(0,1fr)] sm:gap-x-6 sm:py-10 lg:grid-cols-[minmax(150px,.42fr)_2rem_minmax(0,1.55fr)] lg:gap-x-8 lg:py-12">
          <div className="col-start-2 flex flex-wrap items-center gap-x-4 gap-y-2 lg:col-start-1 lg:row-start-1 lg:block">
            <p className="text-sm font-semibold leading-6 tabular-nums text-[#d5d7da] lg:max-w-[15ch]">{entry.dateRange}</p>
            {entry.current ? <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#74d59d] lg:mt-3"><span className="size-1.5 rounded-full bg-[#20c56b]" aria-hidden="true" />Current</span> : null}
          </div>

          <div className="absolute bottom-0 left-[0.34rem] top-0 w-px bg-[var(--border-strong)] sm:left-[0.47rem] lg:relative lg:bottom-auto lg:left-auto lg:top-auto lg:col-start-2 lg:row-start-1 lg:h-full lg:w-full lg:bg-transparent" aria-hidden="true">
            <span className={`absolute left-0 top-[0.42rem] size-3 -translate-x-[calc(50%-0.5px)] rounded-full border ${entry.current ? "border-[var(--red)] bg-[var(--red)]" : "border-[#667080] bg-[var(--background)]"} transition-colors duration-300 group-hover:border-[var(--red)] lg:left-1/2`} />
            {index < entries.length - 1 ? <span className="absolute bottom-[-3rem] left-1/2 top-[1.35rem] hidden w-px -translate-x-1/2 bg-[var(--border-strong)] lg:block" /> : null}
          </div>

          <article className="col-start-2 mt-5 min-w-0 lg:col-start-3 lg:row-start-1 lg:mt-0">
            <h3 className="balanced text-[clamp(1.45rem,2.6vw,2.25rem)] font-black leading-[1.06] tracking-[-0.035em] transition-colors duration-300 group-hover:text-white">{entry.role}</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--blue-quiet)]">
              {entry.organisation}
              {entry.location ? <span className="font-normal text-[var(--dim)]"> · {entry.location}</span> : null}
            </p>
            {entry.description ? <p className="pretty mt-5 max-w-[68ch] whitespace-pre-line text-[15px] leading-7 text-[#aeb3ba] sm:text-base sm:leading-8">{entry.description}</p> : null}
          </article>
        </li>
      ))}
    </ol>
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
              <h1 className="balanced max-w-5xl text-[clamp(2.8rem,7vw,5.75rem)] font-black leading-[0.94] tracking-[-0.04em]">Experience</h1>
              <p className="pretty mt-7 max-w-[72ch] text-base leading-7 text-[#bec2c8] sm:text-lg sm:leading-8">
                The teams I’ve helped, the systems I’ve built, and the communities I’ve contributed to, alongside the learning that shaped the work.
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
