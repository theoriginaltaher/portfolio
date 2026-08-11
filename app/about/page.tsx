import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageFrame } from "@/components/pages/PageFrame";
import { portableTextToPlainText } from "@/src/lib/adapters";
import { getSiteSettings, getSkills } from "@/src/lib/content";

const principles = [
  {
    title: "Clarity before complexity",
    body: "I translate ambiguous ideas into a structure people can discuss, build, and maintain. The right diagram, prototype, or question often saves more time than another week of implementation.",
  },
  {
    title: "Useful over impressive",
    body: "A system earns its place when it reduces friction for the people using it. I care about the quiet details: sensible defaults, clear ownership, readable documentation, and graceful failure states.",
  },
  {
    title: "Judgment stays human",
    body: "AI is part of my working environment for research, drafting, review, and automation. Final decisions still need context, taste, and someone willing to be accountable for the result.",
  },
  {
    title: "Build for the next operator",
    body: "Good work should remain understandable after the person who made it leaves the room. I design for handover, future change, and the team that has to run the system on an ordinary Tuesday.",
  },
];

const disciplines = [
  {
    name: "Technology",
    detail: "Web architecture, cloud infrastructure, platform decisions, and technical direction.",
  },
  {
    name: "Operations",
    detail: "Workflows, documentation, AI-assisted processes, and systems that keep teams moving.",
  },
  {
    name: "Media",
    detail: "Photography, video, visual direction, and production pipelines built for repeatability.",
  },
];

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return { title: `About | ${settings.name}`, description: settings.metaDescription };
}

export default async function AboutPage() {
  const [settings, skills] = await Promise.all([getSiteSettings(), getSkills()]);
  const bioText = portableTextToPlainText(settings.bio);
  const bioParagraphs = bioText.split(/\n{2,}/).filter(Boolean);
  const portrait = settings.portrait?.asset?.url || "/assets/taher-portrait-hero-color.png";
  return (
    <PageFrame>
      <main className="min-h-screen overflow-hidden bg-[var(--background)] pt-14">
        <header className="relative border-b hairline">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(176,32,32,0.12),transparent_26rem),radial-gradient(circle_at_82%_54%,rgba(59,88,124,0.13),transparent_30rem)]" />

          <div className="site-shell relative grid min-h-[calc(100svh-3.5rem)] grid-cols-1 items-stretch lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.78fr)]">
            <div className="min-w-0 flex flex-col justify-between border-white/7 py-12 lg:border-r lg:py-16 lg:pr-[clamp(2rem,5vw,5rem)]">
              <div className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.18em] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <p className="text-[var(--red)]">About Taher</p>
                <p className="text-[var(--dim)] sm:text-right">Colombo, Sri Lanka / Working globally</p>
              </div>

              <div className="py-16 lg:py-20">
                <h1 className="balanced max-w-[11ch] text-[clamp(3.2rem,7.5vw,6rem)] font-black leading-[0.89] tracking-[-0.04em] text-[var(--text)]">
                  I build the systems behind ambitious work.
                </h1>
                <p className="mt-8 max-w-2xl pretty [overflow-wrap:anywhere] text-[clamp(1rem,1.5vw,1.2rem)] leading-8 text-[#b9bec6]">
                  I&apos;m {settings.name}, a {settings.role.toLowerCase()}. {bioParagraphs[0] ||
                    "My work sits where technical decisions, creative production, and day-to-day operations meet."}
                </p>
              </div>

              <div className="flex flex-col gap-6 border-t border-white/7 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-sm text-sm leading-6 text-[var(--muted)]">
                  I help turn scattered tools and difficult processes into environments
                  people can understand, trust, and run.
                </p>
                <a
                  href="#story"
                  className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#cfd2d7]"
                >
                  Read the story
                  <span className="grid size-8 place-items-center border border-[var(--border-strong)] transition-colors group-hover:border-[var(--red)] group-hover:text-[var(--red)]" aria-hidden="true">
                    ↓
                  </span>
                </a>
              </div>
            </div>

            <div className="relative min-h-[32rem] overflow-hidden lg:ml-[clamp(1.5rem,3vw,3.5rem)] lg:min-h-0">
              <Image
                src={portrait}
                alt={settings.portrait?.alt || `${settings.name} in his workspace`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-[66%_center] grayscale-[0.12]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(6,6,6,0.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
                <p className="max-w-[25ch] text-xs font-semibold leading-5 text-[#d7d9dd]">
                  Technology is most valuable when it creates room for better work.
                </p>
                <p className="shrink-0 text-[9px] font-bold uppercase tracking-[0.16em] text-[#90959d]">
                  Portrait / 2026
                </p>
              </div>
            </div>
          </div>
        </header>

        <section id="story" className="border-b hairline py-20 sm:py-24 lg:py-32">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--blue-quiet)]">
                The short version
              </p>
              <p className="mt-4 max-w-[22ch] text-sm leading-6 text-[var(--muted)]">
                One practice, viewed from three different sides.
              </p>
            </div>

            <div>
              <p className="balanced max-w-4xl text-[clamp(2rem,4.2vw,4.25rem)] font-black leading-[1.03] tracking-[-0.04em]">
                My job is to make technology easier to run and creative work easier to scale.
              </p>
              <div className="mt-12 grid gap-8 border-t border-white/8 pt-8 md:grid-cols-2 md:gap-12">
                <p className="pretty text-base leading-8 text-[#b8bdc5]">
                  I started with visual work: photography, video, graphics, and the
                  practical reality of delivering media under real deadlines. That work
                  taught me to notice the entire pipeline, not only the final frame.
                </p>
                <p className="pretty text-base leading-8 text-[#b8bdc5]">
                  Today I bring the same eye to websites, cloud systems, AI workflows,
                  and technology leadership. I move between strategy and implementation,
                  keeping the business goal visible while the technical details take shape.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b hairline py-20 sm:py-24 lg:py-28" aria-labelledby="working-range">
          <div className="site-shell">
            <div className="flex flex-col gap-5 border-b border-white/8 pb-8 md:flex-row md:items-end md:justify-between">
              <h2 id="working-range" className="text-[clamp(2.35rem,5vw,4.8rem)] font-black leading-none tracking-[-0.04em]">
                One working range.
              </h2>
              <p className="max-w-md text-sm leading-6 text-[var(--muted)] md:text-right">
                The boundaries are deliberately porous. Better creative work often needs
                better infrastructure, and better systems need a feel for people.
              </p>
            </div>

            <div className="grid md:grid-cols-3">
              {disciplines.map((discipline, index) => (
                <article
                  key={discipline.name}
                  className="border-b border-white/7 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-black tracking-[-0.035em]">{discipline.name}</h3>
                    <span className="text-[10px] font-bold tracking-[0.14em] text-[var(--red)]">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-8 max-w-sm pretty text-sm leading-7 text-[var(--muted)]">
                    {discipline.detail}
                  </p>
                </article>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 border-t border-white/8 pt-8">
              {skills.map((skill) => (
                <span key={skill._id} className="border border-white/9 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                  {skill.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b hairline bg-[#090a0b] py-20 sm:py-24 lg:py-28" aria-labelledby="principles">
          <div className="site-shell grid gap-14 lg:grid-cols-[0.42fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="principles" className="text-[clamp(2.4rem,4.6vw,4.5rem)] font-black leading-[0.96] tracking-[-0.04em]">
                How I approach the work.
              </h2>
              <p className="mt-6 max-w-sm pretty text-sm leading-7 text-[var(--muted)]">
                These are the tests I use when a project becomes complicated and the
                obvious answer is no longer enough.
              </p>
            </div>

            <div className="border-t border-white/10">
              {principles.map((principle, index) => (
                <article
                  key={principle.title}
                  className="grid gap-5 border-b border-white/10 py-8 sm:grid-cols-[56px_0.62fr_1fr] sm:gap-7 sm:py-10"
                >
                  <p className="text-[10px] font-black tracking-[0.15em] text-[var(--red)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-black leading-tight tracking-[-0.03em]">
                    {principle.title}
                  </h3>
                  <p className="pretty text-sm leading-7 text-[#aeb3ba]">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b hairline py-20 sm:py-24 lg:py-32">
          <div className="site-shell grid gap-10 lg:grid-cols-[1fr_0.48fr] lg:items-end lg:gap-20">
            <div>
              <p className="max-w-[19ch] text-[clamp(2.4rem,5.5vw,5.5rem)] font-black leading-[0.94] tracking-[-0.04em]">
                The human part is part of the system.
              </p>
            </div>
            <div className="border-t border-[var(--red)] pt-6">
              <p className="pretty text-base leading-8 text-[#b9bec5]">
                Community projects, event floors, classrooms, and leadership roles have
                shaped how I work as much as the technical projects have. They taught me
                to listen carefully, make decisions with incomplete information, and
                communicate so that different kinds of people can move together.
              </p>
              <Link
                href="/experience"
                className="mt-8 inline-flex min-h-12 items-center gap-4 border border-[var(--border-strong)] px-6 text-[10px] font-black uppercase tracking-[0.16em] transition-colors hover:border-[var(--blue-border)] hover:text-[var(--blue-quiet)]"
              >
                Explore my experience <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(176,32,32,0.16),transparent_28rem)]" />
          <div className="site-shell relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--red)]">
                Start a conversation
              </p>
              <h2 className="balanced mt-5 max-w-4xl text-[clamp(2.6rem,6vw,5.6rem)] font-black leading-[0.94] tracking-[-0.04em]">
                Have a difficult system worth untangling?
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-14 shrink-0 items-center justify-center bg-[var(--red)] px-8 text-[11px] font-black uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#971b1b]"
            >
              Discuss a project
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
