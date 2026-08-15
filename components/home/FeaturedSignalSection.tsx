import Link from "next/link";
import type { BlogPost } from "@/src/types";
import { SectionLabel } from "./SectionLabel";

export function FeaturedSignalSection({ post }: { post?: BlogPost }) {
  if (!post) return null;
  const titleParts = post.title.split(" ");
  const accentWord = titleParts.pop() || "Signals";
  const titleLead = titleParts.join(" ");
  return (
    <section className="border-b hairline py-14 md:py-20" id="signal">
      <div className="site-shell">
        <SectionLabel index="04 /" label="Selected Signal" tone="blue" />
        <div className="grid-field border-y border-white/7 px-0 py-6 sm:px-6 md:py-8">
          <article className="w-full overflow-hidden border-y border-[var(--border-strong)] bg-[#0d0d0d]/95 lg:grid lg:grid-cols-[minmax(0,1fr)_230px]">
            <div>
              <div className="flex min-h-12 items-center justify-between gap-4 border-b hairline px-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--dim)] md:px-7">
                <span className="text-[var(--blue-quiet)]">Signal note</span>
                <span>AI + media</span>
              </div>
              <div className="p-5 md:p-8 lg:p-10">
                <h3 className="balanced max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-black leading-[0.96] tracking-[-0.04em]">
                  {titleLead} <span className="text-[var(--red)]">{accentWord}.</span>
                </h3>
                <p className="mt-5 max-w-2xl pretty text-[15px] leading-7 text-[#b7bbc2]">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="pressable mt-7 inline-flex min-h-11 items-center bg-[var(--red)] px-5 text-[11px] font-black uppercase tracking-[0.14em] text-white hover:bg-[#9e1c1c]">Read Signal</Link>
              </div>
            </div>
            <aside className="flex flex-col justify-between gap-8 border-t hairline p-5 text-xs lg:border-l lg:border-t-0 lg:p-7">
              <div>
                <p className="uppercase tracking-[0.12em] text-[var(--dim)]">Discipline</p>
                <p className="mt-2 leading-6 text-[var(--blue-quiet)]">Workflow architecture</p>
              </div>
              <p className="leading-6 text-[var(--muted)]">Ideas, methods, and operating notes from the work.</p>
            </aside>
          </article>
        </div>
      </div>
    </section>
  );
}
