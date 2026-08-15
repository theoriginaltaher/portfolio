import Image from "next/image";
import Link from "next/link";
import { portableTextToPlainText } from "@/src/lib/adapters";
import type { SiteSettings } from "@/src/types";

const focusItems = ["AI Workflows", "Media Systems", "Web Architecture"];

export function Hero({ settings }: { settings: SiteSettings }) {
  const [firstName, ...lastNameParts] = settings.name.split(" ");
  const lastName = lastNameParts.join(" ");
  const summary = portableTextToPlainText(settings.bio).split(/\n{2,}/)[0];
  const portrait = settings.portrait?.asset?.url;
  return (
    <section className="relative overflow-hidden border-b hairline bg-[#060606] px-0 pb-7 pt-[72px] md:pb-10 md:pt-[84px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(59,88,124,0.18),transparent_34rem),radial-gradient(circle_at_12%_84%,rgba(176,32,32,0.1),transparent_28rem)]" />

      <div className="site-shell relative max-w-[1440px]">
        <div className="relative flex min-h-[620px] flex-col justify-between overflow-hidden border border-[var(--border-strong)] bg-[linear-gradient(145deg,#0d0e10_0%,#090a0b_56%,#070707_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] md:min-h-[min(790px,calc(100svh-112px))] md:p-9 lg:p-11">
          {portrait ? <div className="hero-image-reveal absolute bottom-0 right-0 top-0 hidden w-[46%] overflow-hidden bg-[#101215] lg:block">
            <Image src={portrait} alt={settings.portrait?.alt || settings.name} fill priority sizes="46vw" className="object-cover object-[56%_34%] saturate-[0.82] contrast-[1.04]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0b0c_0%,rgba(10,11,12,0.42)_25%,rgba(10,11,12,0.02)_66%,rgba(10,11,12,0.2)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#0a0b0c] to-transparent" />
          </div> : null}

          <div className="hero-reveal relative z-10 text-[11px] font-black uppercase leading-5 tracking-[0.13em] text-[var(--red)] md:text-xs">
            <p className="m-0">SESSION_01 / CREATIVE COMMAND CENTER</p>
          </div>

          <div className="hero-reveal hero-reveal--2 relative z-10 py-12 md:py-[min(10vh,92px)]">
            <h1 className="m-0 max-w-full text-[clamp(2.8rem,13vw,4.4rem)] font-black uppercase leading-[0.88] tracking-[-0.035em] text-[var(--text)] md:text-[clamp(4.5rem,9vw,6rem)] md:leading-[0.86] md:tracking-[-0.04em]">
              <span className="block">{firstName}</span>
              <span className="block text-[#eceef1] md:ml-[clamp(20px,7vw,120px)]">
                {lastName}<span className="text-[var(--red)]">.</span>
              </span>
            </h1>
          </div>

          <div className="hero-reveal hero-reveal--3 relative z-10 grid items-end gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.42fr)] lg:gap-14">
            <div className="max-w-xl flex-1 basis-[300px]">
              <p className="m-0 flex flex-wrap gap-x-2.5 gap-y-1.5 text-xs font-black uppercase leading-6 tracking-[0.11em] text-[#e2e4e8] md:text-sm">
                <span>Founder</span>
                <span className="text-[var(--red)]">/</span>
                <span>{settings.role}</span>
                <span className="text-[var(--red)]">/</span>
                <span>Chief Technology Officer</span>
              </p>
              <p className="mt-4 max-w-[62ch] break-words pretty text-[15px] leading-[1.85] text-[#c2c7cf] md:text-[17px]">
                {summary}
              </p>
              <div className="mt-6 flex flex-col gap-2.5 min-[560px]:flex-row min-[560px]:flex-wrap md:mt-7">
                <Link
                  href="/projects"
                  className="pressable inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--red)] px-7 text-[11px] font-black uppercase tracking-[0.16em] text-white hover:bg-[#9e1c1c] min-[560px]:w-auto"
                >
                  View Systems
                </Link>
                <Link
                  href="/contact"
                  className="pressable inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 px-7 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--text)] hover:border-[var(--blue-border)] hover:bg-white/[0.03] min-[560px]:w-auto"
                >
                  Initiate Contact
                </Link>
              </div>
            </div>

            <aside className="w-full border-y border-white/10 py-4 text-sm text-[#b8bec7] lg:self-end">
              <div className="flex items-center justify-between gap-4 pb-3">
                <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--text)]">
                  Workspace Focus
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
              </div>
              <div className="flex flex-col gap-3 border-t border-white/7 pt-3.5">
                {focusItems.map((item) => (
                  <div key={item} className="flex items-center justify-between gap-5">
                    <span>{item}</span>
                    <span className="h-px w-7 bg-[var(--blue-border)]" />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
