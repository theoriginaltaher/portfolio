import Image from "next/image";
import Link from "next/link";

const focusItems = ["AI Workflows", "Media Systems", "Web Architecture"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b hairline bg-[#060606] pt-14">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[length:48px_48px] opacity-22 md:bg-[length:96px_96px] md:opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(176,32,32,0.12),transparent_19rem),radial-gradient(circle_at_85%_36%,rgba(0,72,172,0.08),transparent_24rem),linear-gradient(180deg,rgba(6,6,6,0)_0%,#060606_100%)] md:bg-[radial-gradient(circle_at_78%_34%,rgba(0,72,172,0.12),transparent_28rem),linear-gradient(180deg,rgba(6,6,6,0)_0%,#060606_100%)]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-86px)] w-[min(100%-36px,1280px)] items-center gap-10 py-10 md:min-h-[calc(100vh-118px)] md:w-[min(100%-40px,1280px)] md:py-12 lg:grid-cols-[minmax(460px,600px)_1fr]">
        <div className="z-10 w-full max-w-[620px]">
          <p className="mb-4 max-w-[15rem] text-[9px] font-black uppercase leading-5 tracking-[0.18em] text-[var(--red)] md:mb-6 md:max-w-none md:text-[11px] md:leading-normal md:tracking-[0.22em]">
            SESSION_01 / CREATIVE COMMAND CENTER
          </p>

          <h1 className="text-[clamp(3.35rem,16.5vw,4.65rem)] font-black uppercase leading-[0.9] tracking-[-0.038em] text-[var(--text)] md:text-[clamp(5.2rem,7.4vw,7.4rem)] md:leading-[0.86] md:tracking-[-0.045em]">
            Taher
            <br />
            Hussain
          </h1>

          <p className="mt-4 flex max-w-[22rem] flex-wrap gap-x-2 gap-y-1 text-[12px] font-semibold leading-5 text-[#d8d8d8] md:mt-6 md:max-w-none md:text-base md:leading-6">
            <span>Founder</span>
            <span className="text-[var(--dim)]">/</span>
            <span>Creative Technologist</span>
            <span className="text-[var(--dim)]">/</span>
            <span>Chief Technology Officer</span>
          </p>

          <p className="mt-5 max-w-[22rem] pretty text-[15px] leading-[1.75] text-[#c6c9ce] md:max-w-xl md:text-[17px] md:leading-[1.7]">
            I design, build, and manage digital solutions across web development,
            multimedia production, AI-assisted systems, and technology-driven
            business operations.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 min-[420px]:flex min-[420px]:flex-wrap md:mt-8">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center bg-[var(--red)] px-7 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#9e1c1c] md:h-11"
            >
              View Systems
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center border border-white/12 bg-black/18 px-7 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--text)] transition hover:border-[var(--blue-border)] md:h-11"
            >
              Initiate Contact
            </Link>
          </div>

          <div className="mt-7 flex max-w-[22rem] flex-wrap gap-x-3 gap-y-2 border-t border-white/7 pt-4 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--dim)] md:hidden">
            <span>Sri Lanka / Global</span>
            <span className="text-[var(--red)]">AI</span>
            <span>Media</span>
            <span>Web</span>
            <span>Cloud</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto hidden w-full max-w-[580px] md:block lg:mr-0 lg:max-w-[590px]">
          <div className="relative border border-white/9 bg-[#101010]">
            <div className="flex h-10 items-center justify-between border-b border-white/7 px-4 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--dim)]">
              <span>CANVAS_01 / PORTRAIT</span>
              <span className="text-[var(--blue-quiet)]">Creative Workspace</span>
            </div>
            <div className="relative aspect-[4/5] max-h-[calc(100vh-190px)] min-h-[420px] overflow-hidden md:aspect-[5/4] md:min-h-0 lg:aspect-[4/5]">
              <Image
                src="/assets/taher-hero-camera.png"
                alt="Taher Hussain holding a camera in a dark creative workspace"
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-[52%_45%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,6,6,0.16)_0%,rgba(6,6,6,0.02)_42%,rgba(6,6,6,0.14)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#060606] to-transparent" />
              <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-white/18" />
              <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-white/18" />
              <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-white/18" />
              <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-white/18" />
            </div>
          </div>

          <aside className="absolute bottom-4 right-4 w-[min(68%,220px)] border border-white/8 bg-[#101010]/92 p-3 text-[12px] text-[var(--muted)]">
            <div className="mb-2.5 flex items-center justify-between border-b border-white/6 pb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--text)]">
                Workspace Focus
              </span>
              <span className="h-1 w-1 bg-[var(--red)]" />
            </div>
            <div className="space-y-2">
              {focusItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-4 border-b border-white/5 pb-2 last:border-b-0 last:pb-0"
                >
                  <span>{item}</span>
                  <span className="h-px w-8 bg-[var(--blue-border)]" />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="relative border-t border-white/5 bg-[#060606]/60">
        <div className="site-shell flex h-7 items-center justify-between text-[8px] font-normal uppercase tracking-[0.12em] text-[var(--dim)] opacity-65 md:h-8 md:text-[9px] md:tracking-[0.14em] md:opacity-75">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 bg-[#20c56b]" />
            System Ready
          </span>
          <span className="hidden md:inline">
            Sri Lanka / Working Globally / AI / Media / Web / Cloud
          </span>
        </div>
      </div>
    </section>
  );
}
