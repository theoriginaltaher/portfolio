import type { Metadata } from "next";
import { PageFrame } from "@/components/pages/PageFrame";
import { getExperience, getSkills } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Journey & Expertise | Taher Hussain",
  description:
    "Taher Hussain's experience across AI-powered multimedia, video, design, cloud infrastructure, technology leadership, and creative production.",
};

const fallbackProfessionalExperience = [
  {
    title: "Co-Founder",
    organization: "Space Digital",
    location: "Colombo, Western Province · On-site",
    period: "May 2026 · Present",
    status: "Current",
    description:
      "Co-Founder of Space Digital, working on-site from Colombo in the Western Province of Sri Lanka.",
    tags: ["Co-founder", "Colombo", "On-site"],
  },
  {
    title: "Founder & Creative Technologist",
    organization: "TaherHussainCreations",
    location: "Western Province, Sri Lanka · Hybrid",
    period: "Jul 2018 · Present",
    status: "Active practice",
    description:
      "Built a one-person creative practice into a service business covering video production, graphic design, photography, web development, and AI-assisted content creation. Manages every engagement from client brief and creative direction through production and delivery for clients across retail, education, and events.",
    tags: ["AI", "Media production", "Web design", "Client delivery"],
  },
  {
    title: "Chief Technology Officer",
    organization: "Starsons International (Pvt) Ltd",
    location: "Sri Lanka · Hybrid",
    period: "Dec 2024 · Present",
    status: "Leadership",
    description:
      "Leads the company’s digital presence across web, social content, brand visuals, photography, and video. Makes executive-level decisions on tools, infrastructure, and vendors while remaining hands-on with production and AI-supported creative workflows.",
    tags: ["Technology management", "Technology leadership", "AI workflows"],
  },
  {
    title: "Head of Information Technology & Media",
    organization: "Starsons International (Pvt) Ltd",
    location: "Sri Lanka · Hybrid",
    period: "Jun 2019 · Dec 2024",
    status: "Progression",
    description:
      "Built and ran Starsons’ digital operation from the ground up, including the website, content calendar, branded visuals, social media, photography, and video production. Introduced AI and cloud tools early, improving turnaround and establishing the workflow used by the team today.",
    tags: ["Website administration", "Artificial intelligence", "Cloud tools"],
  },
];

const fallbackLeadershipChapters = [
  {
    role: "Vice President",
    organization: "The ICT & Media Society · Burhani Serendib School",
    period: "Jul 2025 · Present",
    summary:
      "Supports society activities with a focus on media, production, practical sessions, and student-led projects.",
  },
  {
    role: "Project Chairman",
    organization: "Memento | Relive The Past",
    period: "Oct 2021 · Present",
    summary:
      "Leads a school-history initiative, coordinating research, content direction, web design, interviews, and archival contributions.",
  },
  {
    role: "Head of IT Support & Core Team Member · IT Department",
    organization: "The Ashara Mubaraka Project · 1447H Relay Center (Colombo)",
    period: "May 2025 · Aug 2025",
    summary:
      "Returned in a hands-on IT role covering infrastructure setup, ongoing technical support, and coordination with other departments throughout the event.",
  },
  {
    role: "Team Leader · IT Helpdesk (IT Department)",
    organization: "The Ashara Mubaraka Project · 1446H Relay Center (Colombo)",
    period: "Jun 2024 · Oct 2024",
    summary:
      "Kept day-to-day event technology running by troubleshooting network issues, resolving printer problems, and restoring disrupted services quickly.",
  },
  {
    role: "Editor & Director of Public Relations",
    organization: "The Interact Club · Burhani Serendib School",
    period: "Jul 2024 · Aug 2025",
    summary:
      "Led external communications, editorial consistency, public-facing posts, promotional content, trailers, highlight reels, and event videos across a full club year.",
  },
  {
    role: "Assistant Production Manager",
    organization: "The Video Team · Colombo",
    period: "Jan 2015 · Dec 2020",
    summary:
      "Developed an early foundation in video production through community and religious events, progressing from camera operation and basic editing to assisting with production logistics for shoots.",
  },
];

const projectRecord = [
  {
    title: "Annual Prize Giving · Photography, Editorial & Videography",
    organization: "Burhani Serendib School",
    period: "Aug 2024 · Nov 2025",
    summary:
      "Worked on the official media team across two consecutive prize-giving ceremonies. The role grew from event photography and editorial output to photography, videography, video loops, highlights, and the final post-event reel.",
  },
  {
    title: "Photography & Editorial · Inauguration and Installation Ceremonies",
    organization: "Burhani Serendib School",
    period: "Jul 2024 · Aug 2025",
    summary:
      "Covered the 29th and 30th Interact Club installation ceremonies and the Students’ Council inauguration through photography, curated image delivery, and post-event editorial content.",
  },
  {
    title: "Member · Various Community Projects",
    organization: "Interact Club of Burhani Serendib School",
    period: "Aug 2023 · Aug 2025",
    summary:
      "Contributed to District Ifthaar Celebrations, Cleanup Sri Lanka 2025, Nourishing Hope, Bites & Bliss, Intercircles, Social Edge, and YOUTH 2K23, including audiovisual support and event execution.",
  },
  {
    title: "Event Editorial & Design · Various Projects",
    organization: "Interact Club of Burhani Serendib School",
    period: "Jul 2024 · Jul 2025",
    summary:
      "Produced editorial and promotional assets for Full Plate, Into The Hoop Season III, and Shuttle Smash under tight event deadlines.",
  },
  {
    title: "Event Media Manager · Interhouse Sports Series",
    organization: "Burhani Serendib School",
    period: "Aug 2023 · Jul 2025",
    summary:
      "Covered basketball, athletics, swimming, scrabble, badminton, and cricket through live-action photography, videography, curated photo sets, and post-event editorial production.",
  },
  {
    title: "Project Overseer & Editorial Lead · YOUTH 2K25",
    organization: "Interact Club of Burhani Serendib School",
    period: "Oct 2024 · Apr 2025",
    summary:
      "Oversaw planning and execution across design, logistics, content, and operations while producing event trailers, promotional videos, highlights, and on-screen visuals.",
  },
  {
    title: "Project Chairman · Pixel Perfect V1",
    organization: "ICBSS × ICT & Media Society",
    period: "Dec 2024 · Jan 2025",
    summary:
      "Co-chaired a practical digital-skills workshop covering AI literacy, ChatGPT, Copilot, Canva AI, content generation, design basics, and typography. Led planning, curriculum structure, facilitation, and session visuals.",
  },
  {
    title: "Chairman · Club Service & Fundraising Projects",
    organization: "Interact Club of Burhani Serendib School",
    period: "Jan 2023 · Dec 2024",
    summary:
      "Led Our Merch, Carnival Craze, and Lights! Camera! Action! across planning, design, team coordination, pricing, sales, and event operations. The projects achieved a 64% profit margin, a 43% income surplus, and a sold-out screening with 95% return on capital employed.",
  },
];

const skillGroups = [
  { title: "Top Skills", skills: ["Project management", "Artificial intelligence", "Cloud computing", "Multimedia", "Entrepreneurship"] },
  { title: "Creative Services", skills: ["Graphic design", "Video production", "Videography", "Editing", "Advertising", "Event photography", "Commercial photography", "Real estate photography"] },
  { title: "Web & Technology", skills: ["Web design", "WordPress", "WooCommerce", "HTML / CSS", "Cloud infrastructure"] },
  { title: "Leadership & Systems", skills: ["Team leadership", "Team coordination", "Event management", "Technology leadership", "Website administration"] },
];

const certifications = [
  {
    title: "Introduction to AI · Elements of AI",
    issuer: "University of Helsinki",
    year: "Jul 2026",
    credentialId: null,
    href: "https://certificates.mooc.fi/validate/jgf3sv7r7a",
  },
  {
    title: "Canva Essentials",
    issuer: "Canva",
    year: "Dec 2024",
    credentialId: "87b2cc",
    href: "https://www.canva.com/designschool/certification-award/87b2cc37-9e15-43b5-95f4-fd6f68c0d373",
  },
  {
    title: "Graphic Design Essentials",
    issuer: "Canva",
    year: "Dec 2024",
    credentialId: "6a4595",
    href: "https://www.canva.com/designschool/certification-award/6a45956e-d474-4c71-909e-197e87da9341",
  },
];

const courses = [
  "Animation Pipeline Production",
  "Audio Techniques for Film, Video, and Multimedia",
  "Become a Video Production Crewmember",
  "Learning DaVinci Resolve",
  "Live Video Streaming",
  "Python (Full Course)",
  "The Creative Spark",
  "User Experience (UX) for Non-Designers",
  "WordPress Training",
];

const languages = [
  { language: "English", level: "Full professional" },
  { language: "Hindi", level: "Full professional" },
  { language: "Gujarati", level: "Full professional" },
  { language: "Arabic", level: "Limited working" },
  { language: "Sinhala", level: "Limited working" },
  { language: "French", level: "Elementary" },
];

const recognition = [
  {
    title: "World Robot Olympiad International Final 2025",
    detail: "Project R.E.A.C.H. · EchoLens · 26th of 58 teams",
  },
  {
    title: "WRO Sri Lanka Nationals 2026",
    detail: "2nd in the Senior category · 6th overall of 66 teams",
  },
  {
    title: "International Creativity & Innovation Awards 2024",
    detail: "Silver award · Vertical farming project",
  },
];

const professionalPresentation = {
  "Co-Founder": { location: "Colombo, Western Province · On-site", status: "Current", tags: ["Co-founder", "Colombo", "On-site"] },
  "Founder & Creative Technologist": { location: "Western Province, Sri Lanka · Hybrid", status: "Active practice", tags: ["AI", "Media production", "Web design", "Client delivery"] },
  "Chief Technology Officer": { location: "Sri Lanka · Hybrid", status: "Leadership", tags: ["Technology management", "Technology leadership", "AI workflows"] },
  "Head of Information Technology & Media": { location: "Sri Lanka · Hybrid", status: "Progression", tags: ["Website administration", "Artificial intelligence", "Cloud tools"] },
} as const;

function SectionHeading({ children, id }: Readonly<{ children: React.ReactNode; id?: string }>) {
  return (
    <div className="mb-7 flex items-center gap-4 sm:mb-9">
      <span className="grid size-5 shrink-0 place-items-center border border-[var(--red)] text-[10px] text-[var(--red)]" aria-hidden="true">
        +
      </span>
      <h2 id={id} className="text-xl font-black tracking-[-0.03em] sm:text-2xl">{children}</h2>
      <span className="h-px flex-1 bg-[var(--border-strong)]" />
    </div>
  );
}

function RailHeading({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <h2 className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--blue-quiet)]">
        {children}
      </h2>
      <span className="h-px flex-1 bg-[var(--border-strong)]" />
    </div>
  );
}

export const revalidate = 60;

export default async function ExperiencePage() {
  const [cmsExperience, cmsSkills] = await Promise.all([getExperience(), getSkills()]);
  const workEntries = cmsExperience.filter((entry) => entry.category === "work");
  const leadershipEntries = cmsExperience.filter((entry) => entry.category === "leadership");
  const professionalExperience = workEntries.length
    ? workEntries.map((entry) => ({
        title: entry.role,
        organization: entry.organisation,
        location: "Sri Lanka · Hybrid",
        period: entry.dateRange,
        status: entry.current ? "Current" : "Completed",
        description: entry.description,
        tags: [entry.category === "work" ? "Professional" : "Leadership"],
      })).map((item) => ({
        ...item,
        ...(professionalPresentation[item.title as keyof typeof professionalPresentation] ?? {}),
      }))
    : process.env.NODE_ENV !== "production" ? fallbackProfessionalExperience : [];
  const leadershipChapters = leadershipEntries.length
    ? leadershipEntries.map((entry) => ({
        role: entry.role,
        organization: entry.organisation,
        period: entry.dateRange,
        summary: entry.description,
      }))
    : process.env.NODE_ENV !== "production" ? fallbackLeadershipChapters : [];
  const renderedSkillGroups = cmsSkills.length
    ? [{ title: "Core Capabilities", skills: cmsSkills.map((skill) => skill.label) }]
    : process.env.NODE_ENV !== "production" ? skillGroups : [];
  return (
    <PageFrame>
      <main className="min-h-screen bg-[var(--background)] pt-14">
        <header className="site-shell max-w-full overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <p className="mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--red)]">
            Career field notes
          </p>
          <h1 className="max-w-full text-[clamp(2.75rem,8vw,5.75rem)] font-black leading-[0.92] tracking-[-0.04em] sm:balanced">
            Journey <span className="font-light text-[var(--blue-quiet)]">&amp;</span>{" "}
            <span className="block sm:inline">Expertise</span>
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-7 text-[#b8bdc5] [overflow-wrap:anywhere] sm:text-lg sm:leading-8">
            Founder of TaherHussainCreations, Co-Founder at Space Digital, and CTO at
            Starsons™ Group. More than seven years of work across AI-powered multimedia,
            video, design, cloud infrastructure, and web systems connect creative
            storytelling with technical execution.
          </p>
          <div className="mt-9 flex max-w-full flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--dim)]" aria-label="Experience focus areas">
            <span><b className="mr-2 text-[var(--red)]">01</b>Technology</span>
            <span><b className="mr-2 text-[var(--red)]">02</b>Media</span>
            <span><b className="mr-2 text-[var(--red)]">03</b>Leadership</span>
            <span><b className="mr-2 text-[var(--red)]">04</b>Learning</span>
          </div>
          <a
            href="https://www.linkedin.com/in/taher-hussain/"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--blue-quiet)] transition-colors hover:text-[var(--text)]"
          >
            View LinkedIn profile <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="site-shell grid items-start gap-16 pb-24 lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-16">
          <div className="min-w-0 space-y-20 sm:space-y-24">
            <section aria-labelledby="professional-experience">
              <SectionHeading id="professional-experience">Professional Experience</SectionHeading>
              <div className="relative ml-2 border-l border-[var(--border-strong)] pl-6 sm:ml-3 sm:pl-9">
                <div className="space-y-4">
                  {professionalExperience.map((item) => (
                    <article key={item.title} className="group relative min-w-0 max-w-full overflow-hidden border border-[var(--border)] bg-[var(--panel-muted)] p-5 transition-colors duration-300 hover:border-[var(--border-strong)] sm:p-7">
                      <span className="absolute -left-[31px] top-8 grid size-3 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--background)] sm:-left-[43px]" aria-hidden="true">
                        <span className="size-1 rounded-full bg-[var(--red)]" />
                      </span>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="max-w-full break-words text-lg font-black tracking-[-0.025em] sm:text-xl">{item.title}</h3>
                          <p className="mt-1 text-xs font-semibold text-[var(--blue-quiet)]">{item.organization} <span className="text-[var(--dim)]">· {item.location}</span></p>
                        </div>
                        <div className="shrink-0 sm:text-right">
                          <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#c8cbd0]">{item.period}</p>
                          <p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[var(--red)]">{item.status}</p>
                        </div>
                      </div>
                      <p className="mt-5 max-w-3xl text-sm leading-6 text-[var(--muted)] [overflow-wrap:anywhere] sm:text-[15px] sm:leading-7">{item.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="border border-[var(--border)] bg-[var(--panel)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#868d96]">{tag}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section aria-labelledby="leadership-chapters">
              <SectionHeading id="leadership-chapters">Volunteering &amp; Leadership Chapters</SectionHeading>
              <div className="grid gap-3 sm:grid-cols-2">
                {leadershipChapters.map((chapter) => (
                  <article key={chapter.role} className="relative min-h-56 overflow-hidden border border-[var(--border)] bg-[var(--panel-muted)] p-5 sm:p-6">
                    <span className="absolute right-0 top-0 h-px w-20 bg-[var(--red)]" aria-hidden="true" />
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[var(--red)]">{chapter.period}</p>
                    <h3 className="mt-5 text-lg font-black leading-tight tracking-[-0.025em]">{chapter.role}</h3>
                    <p className="mt-2 text-[11px] font-semibold leading-5 text-[var(--blue-quiet)]">{chapter.organization}</p>
                    <p className="mt-5 text-sm leading-6 text-[var(--muted)] [overflow-wrap:anywhere]">{chapter.summary}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="project-record">
              <SectionHeading id="project-record">Selected Project Record</SectionHeading>
              <div className="border-y border-[var(--border-strong)]">
                {projectRecord.map((project, index) => (
                  <article
                    key={project.title}
                    className="grid gap-4 border-b border-[var(--border)] py-7 last:border-b-0 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-7"
                  >
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--red)]">
                        P{String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-[9px] font-semibold uppercase leading-4 tracking-[0.1em] text-[var(--dim)]">
                        {project.period}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <h3 className="balanced text-lg font-black leading-tight tracking-[-0.025em] sm:text-xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-[11px] font-semibold text-[var(--blue-quiet)]">
                        {project.organization}
                      </p>
                      <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--muted)] [overflow-wrap:anywhere]">
                        {project.summary}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="education">
              <SectionHeading id="education">Education</SectionHeading>
              <article className="border border-[var(--border-strong)] bg-[var(--panel-muted)] p-5 sm:p-8">
                <div className="flex flex-col gap-5 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--red)]">Secondary education</p>
                    <h3 className="mt-3 text-2xl font-black tracking-[-0.035em]">Burhani Serendib School</h3>
                    <p className="mt-2 text-sm text-[var(--blue-quiet)]">Grade 10 / Form 05 · Colombo, Sri Lanka</p>
                  </div>
                  <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.13em] text-[#c8cbd0]">Jan 2013 · Aug 2028</p>
                </div>
                <div className="grid gap-8 pt-7 sm:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--dim)]">Academic focus</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)] [overflow-wrap:anywhere]">Edexcel IGCSE May / June 2026 programme with a focus on Information Technology, Business Studies, and Economics.</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--dim)]">Evidence of practice</p>
                    <ul className="mt-3 space-y-3 text-sm leading-6 text-[#afb4bb]">
                      <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-[var(--red)]" />Students&apos; Council: Sub-Prefect in 2024/25 and Prefect in 2025/26.</li>
                      <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-[var(--red)]" />ICT &amp; Media Society: Member from 2022 to 2025 and Vice President in 2025/26.</li>
                      <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-[var(--red)]" />Interact Club: Member from 2022 to 2024 and from 2025 onward; Editor in 2024/25.</li>
                    </ul>
                  </div>
                </div>
              </article>
            </section>
          </div>

          <aside className="min-w-0 space-y-12 lg:sticky lg:top-24" aria-label="Skills, certifications, and courses">
            <section>
              <RailHeading>Skills Directory</RailHeading>
              <div className="space-y-6">
                {renderedSkillGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="mb-3 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--red)]">{group.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span key={skill} className="border border-[var(--border-strong)] bg-[var(--panel-muted)] px-2.5 py-1.5 text-[10px] leading-none text-[#b6bbc1]">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <RailHeading>Certifications</RailHeading>
              <div className="space-y-3">
                {certifications.map((certification) => (
                  <a
                    key={certification.title}
                    href={certification.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-[var(--border)] bg-[var(--panel-muted)] p-4 transition-colors hover:border-[var(--blue-border)]"
                    aria-label={`View ${certification.title} credential`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-8 shrink-0 place-items-center border border-[var(--blue-border)] text-[var(--blue-quiet)]" aria-hidden="true">✓</span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold leading-5">{certification.title}</h3>
                        <p className="mt-1 text-[10px] text-[var(--muted)]">{certification.issuer}</p>
                        {certification.credentialId ? (
                          <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-[var(--dim)]">ID {certification.credentialId}</p>
                        ) : null}
                      </div>
                      <span className="ml-auto shrink-0 text-[9px] text-[var(--dim)]">{certification.year} ↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section>
              <RailHeading>Languages</RailHeading>
              <dl className="border-y border-[var(--border)]">
                {languages.map((item) => (
                  <div key={item.language} className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] py-3 last:border-b-0">
                    <dt className="text-xs font-bold text-[#d1d4d8]">{item.language}</dt>
                    <dd className="text-right text-[10px] text-[var(--muted)]">{item.level}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <RailHeading>Recognition</RailHeading>
              <div className="space-y-5">
                {recognition.map((item) => (
                  <article key={item.title} className="border-b border-[var(--border)] pb-5 last:border-b-0 last:pb-0">
                    <h3 className="text-xs font-bold leading-5 text-[#d1d4d8]">{item.title}</h3>
                    <p className="mt-1.5 text-[10px] leading-4 text-[var(--muted)]">{item.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <RailHeading>Completed Courses</RailHeading>
              <div className="border border-[var(--border)] bg-[var(--panel-muted)] p-5">
                <ul className="space-y-3">
                  {courses.map((course) => (
                    <li key={course} className="flex gap-3 text-xs leading-5 text-[#aeb3ba]">
                      <span className="mt-1 grid size-3.5 shrink-0 place-items-center border border-[var(--red)] text-[8px] text-[var(--red)]" aria-hidden="true">✓</span>
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </PageFrame>
  );
}
