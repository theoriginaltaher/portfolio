import type { Metadata } from "next";
import { PageFrame } from "@/components/pages/PageFrame";

export const metadata: Metadata = {
  title: "Journey & Expertise | Taher Hussain",
  description:
    "Taher Hussain's professional journey across creative technology, digital systems, media, and leadership.",
};

const professionalExperience = [
  {
    role: "Co-Founder",
    organization: "Space Digital",
    period: "May 2026 – Present",
    context: "Colombo, Western Province, On-site",
    description:
      "Co-founded Space Digital, working on-site in Colombo, Sri Lanka.",
    capabilities: ["Co-founding", "Digital systems"],
  },
  {
    role: "Founder & Creative Technologist",
    organization: "TaherHussainCreations",
    period: "Feb 2019 – Present",
    context: "Active Practice",
    description:
      "Built a one-person creative practice spanning video production, graphic design, photography, web development, and AI-assisted content creation. Led client engagement from brief and creative direction through production and delivery.",
    capabilities: ["Creative direction", "AI-assisted media", "Client delivery"],
  },
  {
    role: "Chief Technology Officer",
    organization: "Staroons’ Group",
    period: "Dec 2024 – Present",
    context: "Leadership",
    description:
      "Leads Staroons’ digital presence across web, social content, brand visuals, photography, and video. Makes creative technology decisions while managing hands-on production and AI-supported creative workflows.",
    capabilities: ["Technical leadership", "Digital strategy", "AI workflows"],
  },
  {
    role: "Head of Information Technology & Media",
    organization: "Staroons International",
    period: "Feb 2025 – Jul 2026",
    context: "Digital Operations",
    description:
      "Built and ran Staroons’ digital operation from the ground up, including the website, content calendar, branded visuals, social media, photography, and video production. Introduced AI and cloud tools that improved turnaround and established the team’s operating workflow.",
    capabilities: ["Web operations", "Media systems", "Cloud tools"],
  },
];

const leadershipExperience = [
  {
    role: "Vice President",
    organization: "ICT & Media Society, Burhani Serendib School",
    period: "2025/26",
    impact: "Helped direct student-led media, practical sessions, and technical projects.",
    tag: "Student leadership",
  },
  {
    role: "Project Chairman",
    organization: "Innov8 Rise In Tech",
    period: "2025",
    impact: "Led the project from planning and team coordination through technical delivery.",
    tag: "Project leadership",
  },
  {
    role: "Head of IT Support & Core Team Member",
    organization: "Ashara Mubaraka Project, 1447H Relay Center",
    period: "May – Aug 2025",
    impact: "Coordinated infrastructure setup and live technical support across departments.",
    tag: "IT operations",
  },
  {
    role: "Team Leader, IT Helpdesk",
    organization: "Ashara Mubaraka Project, 1446H Relay Center",
    period: "Jun – Oct 2024",
    impact: "Kept event technology running by resolving network, printer, and service issues.",
    tag: "Technical support",
  },
  {
    role: "Editor & Director of Public Relations",
    organization: "Interact Club, Burhani Serendib School",
    period: "Jul 2024 – Aug 2025",
    impact: "Directed public communications, editorial output, promotions, and event media.",
    tag: "Communications",
  },
  {
    role: "Assistant Production Manager",
    organization: "The Video Team, Colombo",
    period: "Jan 2015 – Dec 2020",
    impact: "Supported camera work, editing, and production logistics for community events.",
    tag: "Production",
  },
];

const projectRecord = [
  {
    code: "PR-01",
    title: "Animal Prize Giving",
    area: "Photography, Editorial & Videography",
    period: "2024 – 2025",
    summary: "Created the official photo, video, editorial, and post-event record across two ceremonies.",
  },
  {
    code: "PR-02",
    title: "Inauguration and Installation Ceremonies",
    area: "Photography & Editorial",
    period: "2024 – 2025",
    summary: "Covered student leadership ceremonies through photography, image curation, and editorial content.",
  },
  {
    code: "PR-03",
    title: "Various Community Projects",
    area: "Project Member",
    period: "2023 – 2025",
    summary: "Contributed audiovisual support, content, and event execution across community initiatives.",
  },
  {
    code: "PR-04",
    title: "Various Event Projects",
    area: "Editorial & Design",
    period: "2024 – 2025",
    summary: "Produced focused promotional and editorial assets under live event deadlines.",
  },
  {
    code: "PR-05",
    title: "Interhouse Sports Series",
    area: "Event Media Manager",
    period: "2023 – 2025",
    summary: "Managed photography, videography, curated photo sets, and post-event editorial delivery.",
  },
  {
    code: "PR-06",
    title: "YOUTH 2K25",
    area: "Project Overseer & Editorial Lead",
    period: "2024 – 2025",
    summary: "Oversaw design, logistics, content, and media production from promotion through highlights.",
  },
  {
    code: "PR-07",
    title: "Pixel Perfect V1",
    area: "Project Chairman",
    period: "2024 – 2025",
    summary: "Co-led a practical digital-skills workshop covering AI literacy, content, design, and typography.",
  },
  {
    code: "PR-08",
    title: "Club Service & Fundraising Projects",
    area: "Chairman",
    period: "2023 – 2024",
    summary: "Led planning, team coordination, pricing, sales, design, and event operations across three projects.",
  },
];

const coreCapabilities = [
  "Project Management",
  "Event Management",
  "Technical Leadership",
  "Digital Strategy",
  "Artificial Intelligence",
  "Web Design",
  "Multimedia",
  "Storytelling",
  "Systems Thinking",
  "Web Presence",
  "HTML/CSS",
  "WordPress",
  "Photography",
  "Video Production",
];

const certifications = [
  { title: "Introduction to AI", issuer: "Elements of AI" },
  { title: "Canva Essentials", issuer: "Canva" },
  { title: "Graphic Design Essentials", issuer: "Canva" },
];

const languages = [
  ["English", "Full professional"],
  ["Hindi", "Full professional"],
  ["Gujarati", "Full professional"],
  ["Arabic", "Limited working"],
  ["Sinhala", "Limited working"],
  ["French", "Elementary"],
];

const recognition = [
  "World Robot Olympiad International Final 2025",
  "WRO Sri Lanka Nationals 2025",
  "Sustainability Creativity & Innovation Awards 2024",
];

function SectionHeading({ children, id }: Readonly<{ children: React.ReactNode; id: string }>) {
  return (
    <div className="mb-8 flex items-end gap-5 border-b border-[var(--border-strong)] pb-5 sm:mb-10">
      <h2 id={id} className="balanced text-2xl font-black tracking-[-0.035em] sm:text-3xl">
        {children}
      </h2>
      <span className="mb-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--red)]" aria-hidden="true" />
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <PageFrame>
      <main className="min-h-screen bg-[var(--background)] pt-14">
        <header className="border-b border-[var(--border)]">
          <div className="site-shell py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[1320px]">
              <h1 className="balanced max-w-5xl text-[clamp(2.8rem,7vw,5.75rem)] font-black leading-[0.94] tracking-[-0.04em]">
                Journey <span className="font-light text-[var(--blue-quiet)]">&amp;</span>{" "}
                <span className="block sm:inline">Expertise</span>
              </h1>
              <p className="pretty mt-7 max-w-[72ch] text-base leading-7 text-[#bec2c8] [overflow-wrap:anywhere] sm:text-lg sm:leading-8">
                Founder of TaherHussainCreations, Co-Founder at Space Digital, and CTO at Staroons’ Group. Taher’s work spans AI-powered multimedia, digital infrastructure, creative systems, and leadership across school, community, and technical environments.
              </p>
              <div
                className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--dim)] sm:text-[11px]"
                aria-label="Experience focus areas"
              >
                {(["Technology", "Media", "Leadership", "Systems"] as const).map((item, index) => (
                  <span key={item} className="flex items-center gap-3">
                    {index > 0 ? <span className="text-[var(--red)]" aria-hidden="true">/</span> : null}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="site-shell py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1320px] space-y-24 sm:space-y-28 lg:space-y-32">
            <section aria-labelledby="professional-experience">
              <SectionHeading id="professional-experience">Professional Experience</SectionHeading>
              <div className="relative lg:pl-14">
                <span className="absolute bottom-6 left-[11px] top-6 hidden w-px bg-[var(--border-strong)] lg:block" aria-hidden="true" />
                <div className="space-y-5">
                  {professionalExperience.map((item, index) => (
                    <article
                      key={`${item.role}-${item.organization}`}
                      className="group relative border border-[var(--border-strong)] bg-[var(--panel-muted)] p-6 transition-colors duration-300 hover:bg-[var(--panel)] sm:p-8 lg:grid lg:grid-cols-[minmax(230px,0.72fr)_minmax(0,1.45fr)] lg:gap-10"
                    >
                      <span className="absolute -left-[47px] top-8 hidden size-3 border border-[var(--red)] bg-[var(--background)] lg:block" aria-hidden="true" />
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--red)]">Role {String(index + 1).padStart(2, "0")}</p>
                        <h3 className="balanced mt-4 text-xl font-black leading-tight tracking-[-0.03em] sm:text-2xl">{item.role}</h3>
                        <p className="mt-2 text-sm font-semibold text-[var(--blue-quiet)]">{item.organization}</p>
                      </div>
                      <div className="mt-6 border-t border-[var(--border)] pt-6 lg:mt-0 lg:border-t-0 lg:pt-0">
                        <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:gap-3">
                          <p className="font-bold text-[#d5d7da]">{item.period}</p>
                          <span className="hidden text-[var(--red)] sm:inline" aria-hidden="true">/</span>
                          <p className="text-[var(--muted)]">{item.context}</p>
                        </div>
                        <p className="pretty mt-5 max-w-[68ch] text-sm leading-7 text-[#aeb3ba] sm:text-[15px]">{item.description}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {item.capabilities.map((capability) => (
                            <span key={capability} className="border border-[var(--border-strong)] px-3 py-1.5 text-[10px] font-semibold text-[#9ca3ab]">
                              {capability}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section aria-labelledby="leadership-community">
              <SectionHeading id="leadership-community">Leadership &amp; Community</SectionHeading>
              <div className="grid border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
                {leadershipExperience.map((item) => (
                  <article key={`${item.role}-${item.organization}`} className="bg-[var(--background)] p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--red)]">{item.period}</p>
                      <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.1em] text-[var(--dim)]">{item.tag}</span>
                    </div>
                    <h3 className="balanced mt-5 text-lg font-black leading-tight tracking-[-0.025em]">{item.role}</h3>
                    <p className="mt-2 text-xs font-semibold leading-5 text-[var(--blue-quiet)]">{item.organization}</p>
                    <p className="pretty mt-4 max-w-[58ch] text-sm leading-6 text-[var(--muted)]">{item.impact}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="project-record">
              <SectionHeading id="project-record">Selected Project Record</SectionHeading>
              <div className="overflow-hidden border-y border-[var(--border-strong)]">
                <div className="hidden grid-cols-[72px_minmax(180px,0.9fr)_minmax(190px,0.85fr)_110px_minmax(260px,1.35fr)] gap-5 border-b border-[var(--border-strong)] py-3 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--dim)] lg:grid">
                  <span>Code</span><span>Project</span><span>Area</span><span>Period</span><span>Record</span>
                </div>
                {projectRecord.map((project) => (
                  <article
                    key={project.code}
                    className="grid gap-3 border-b border-[var(--border)] py-6 last:border-b-0 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-5 lg:grid-cols-[72px_minmax(180px,0.9fr)_minmax(190px,0.85fr)_110px_minmax(260px,1.35fr)] lg:items-start"
                  >
                    <p className="text-[10px] font-black tracking-[0.12em] text-[var(--red)]">{project.code}</p>
                    <div>
                      <h3 className="text-sm font-bold leading-5 text-[#e4e5e7]">{project.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-[var(--blue-quiet)] lg:hidden">{project.area}</p>
                    </div>
                    <p className="hidden text-xs leading-5 text-[var(--blue-quiet)] lg:block">{project.area}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--dim)] sm:col-start-2 lg:col-start-auto">{project.period}</p>
                    <p className="pretty text-sm leading-6 text-[var(--muted)] sm:col-start-2 lg:col-start-auto">{project.summary}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="education">
              <SectionHeading id="education">Education</SectionHeading>
              <article className="border border-[var(--border-strong)] bg-[var(--panel-muted)] p-6 sm:p-8 lg:grid lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.4fr)] lg:gap-12 lg:p-10">
                <div>
                  <h3 className="text-2xl font-black tracking-[-0.03em]">Burhani Serendib School</h3>
                  <p className="mt-3 font-semibold text-[var(--blue-quiet)]">Grade 10 / Form 05</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">Colombo, Sri Lanka</p>
                </div>
                <div className="mt-8 space-y-8 border-t border-[var(--border)] pt-8 lg:mt-0 lg:border-t-0 lg:pt-0">
                  <div>
                    <h4 className="text-xs font-black text-[#d7d9dc]">Academic Focus</h4>
                    <p className="pretty mt-3 max-w-[66ch] text-sm leading-7 text-[var(--muted)]">Edexcel IGCSE May / June 2026 programme with a focus on Information Technology, Business Studies, and Economics.</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#d7d9dc]">Evidence of Practice</h4>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-[#aeb3ba]">
                      <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-[var(--red)]" aria-hidden="true" />Student Council Sub-Prefect in 2024/25 and Prefect in 2025/26</li>
                      <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-[var(--red)]" aria-hidden="true" />ICT &amp; Media Society: Member from 2021 to 2025 and Vice President in 2025/26</li>
                      <li className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 bg-[var(--red)]" aria-hidden="true" />Interact Club: Member from 2022 to 2024 and from 2025 onward; Editor in 2024/25</li>
                    </ul>
                  </div>
                </div>
              </article>
            </section>

            <section aria-labelledby="credentials-capabilities">
              <SectionHeading id="credentials-capabilities">Credentials &amp; Capabilities</SectionHeading>
              <div className="grid gap-px border border-[var(--border)] bg-[var(--border)] md:grid-cols-2 xl:grid-cols-[1.35fr_0.85fr_0.85fr_1fr]">
                <div className="bg-[var(--panel-muted)] p-6 sm:p-7">
                  <h3 className="text-sm font-black text-[#e1e3e5]">Core Capabilities</h3>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3">
                    {coreCapabilities.map((capability) => (
                      <span key={capability} className="text-xs leading-5 text-[#aeb3ba]">{capability}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-[var(--panel-muted)] p-6 sm:p-7">
                  <h3 className="text-sm font-black text-[#e1e3e5]">Certifications</h3>
                  <ul className="mt-5 space-y-4">
                    {certifications.map((item) => (
                      <li key={item.title}>
                        <p className="text-xs font-bold leading-5 text-[#cfd2d6]">{item.title}</p>
                        <p className="text-[10px] leading-4 text-[var(--blue-quiet)]">{item.issuer}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[var(--panel-muted)] p-6 sm:p-7">
                  <h3 className="text-sm font-black text-[#e1e3e5]">Languages</h3>
                  <dl className="mt-5 space-y-3">
                    {languages.map(([language, level]) => (
                      <div key={language} className="flex items-baseline justify-between gap-3">
                        <dt className="text-xs font-bold text-[#cfd2d6]">{language}</dt>
                        <dd className="text-right text-[10px] text-[var(--muted)]">{level}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="bg-[var(--panel-muted)] p-6 sm:p-7">
                  <h3 className="text-sm font-black text-[#e1e3e5]">Recognition</h3>
                  <ul className="mt-5 space-y-4">
                    {recognition.map((item) => (
                      <li key={item} className="flex gap-3 text-xs font-semibold leading-5 text-[#b7bcc2]">
                        <span className="mt-2 size-1.5 shrink-0 bg-[var(--red)]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </PageFrame>
  );
}
