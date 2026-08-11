import Image from "next/image";
import Link from "next/link";
import { portableTextToPlainText } from "@/src/lib/adapters";
import type { SiteSettings } from "@/src/types";

export function Hero({ settings }: { settings: SiteSettings }) {
  const [firstName, ...lastNameParts] = settings.name.split(" ");
  const lastName = lastNameParts.join(" ") || "Hussain";
  const summary = portableTextToPlainText(settings.bio).split(/\n{2,}/)[0];
  return (
    <section className="relative overflow-hidden border-b hairline bg-[#060606] px-0 pb-4 pt-[72px] md:pb-7 md:pt-[84px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_40%,rgba(59,88,124,0.16),transparent_30rem),radial-gradient(circle_at_8%_90%,rgba(176,32,32,0.08),transparent_24rem)]" />

      <div className="site-shell relative max-w-[1440px]">
        <div className="relative flex min-h-[auto] flex-col justify-between overflow-hidden border border-[var(--border-strong)] bg-[#0a0b0c] p-5 md:min-h-[min(700px,calc(100svh-118px))] md:p-9">
          <div className="hero-image-reveal absolute bottom-0 right-0 top-0 hidden w-[46%] overflow-hidden bg-[#101215] lg:block">
            <Image
              src="/assets/taher-hero-camera.png"
              alt=""
              fill
              priority
              sizes="46vw"
              className="object-cover object-[56%_34%] saturate-[0.82] contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0b0c_0%,rgba(10,11,12,0.42)_25%,rgba(10,11,12,0.02)_66%,rgba(10,11,12,0.2)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#0a0b0c] to-transparent" />
          </div>

          <div className="hero-reveal relative z-10 flex flex-wrap items-start justify-between gap-x-5 gap-y-3 text-xs font-semibold leading-5 text-[var(--muted)] md:text-sm">
            <p className="m-0 max-w-[34ch] text-[#d0d3d8]">
              Creative work, digital systems, and the thinking that connects them.
            </p>
            <p className="m-0 hidden text-[var(--blue-quiet)] sm:block">
              Colombo, Sri Lanka
            </p>
          </div>

          <div className="hero-reveal hero-reveal--2 relative z-10 py-10 md:py-[min(9vh,78px)]">
            <h1 className="m-0 text-[clamp(3rem,15vw,4.4rem)] font-black uppercase leading-[0.88] tracking-[-0.035em] text-[var(--text)] md:text-[clamp(3.4rem,9vw,6rem)] md:leading-[0.86] md:tracking-[-0.04em]">
              <span className="block">{firstName}</span>
              <span className="block text-[#eceef1] md:ml-[clamp(20px,7vw,120px)]">
                {lastName}<span className="text-[var(--red)]">.</span>
              </span>
            </h1>
          </div>

          <div className="hero-reveal hero-reveal--3 relative z-10 flex flex-wrap items-end justify-between gap-8 md:gap-12">
            <div className="max-w-xl flex-1 basis-[300px]">
              <p className="m-0 flex flex-wrap gap-x-2.5 gap-y-1 text-sm font-semibold leading-6 text-[#d8dbe0] md:text-base">
                <span>Founder</span>
                <span className="text-[var(--red)]">/</span>
                <span>{settings.role}</span>
                <span className="text-[var(--red)]">/</span>
                <span>Chief Technology Officer</span>
              </p>
              <p className="mt-4 max-w-lg break-words pretty text-[14px] leading-[1.75] text-[#b8bdc5] md:text-base">
                {summary || "I design, build, and manage digital solutions across web development, multimedia production, AI-assisted systems, and technology-driven business operations."}
              </p>
              <div className="mt-6 flex flex-col gap-2.5 min-[560px]:flex-row min-[560px]:flex-wrap md:mt-7">
                <Link
                  href="/projects"
                  className="pressable inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--red)] px-7 text-[11px] font-black uppercase tracking-[0.16em] text-white hover:bg-[#9e1c1c] min-[560px]:w-auto"
                >
                  Explore my work
                </Link>
                <Link
                  href="/contact"
                  className="pressable inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 px-7 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--text)] hover:border-[var(--blue-border)] hover:bg-white/[0.03] min-[560px]:w-auto"
                >
                  Start a conversation
                </Link>
              </div>
            </div>

          </div>
        </div>

        <div className="hero-reveal hero-reveal--4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 pt-3.5 text-xs text-[var(--dim)]">
          <span>Based in Colombo</span>
          <span className="hidden sm:inline">Working with people and teams across media, web, and technology</span>
        </div>
      </div>
    </section>
  );
}
