import Link from "next/link";
import type { BlogPost } from "@/src/types";

export function FeaturedSignalSection({ post }: { post?: BlogPost }) {
  if (!post) return null;
  const titleParts = post.title.split(" ");
  const accentWord = titleParts.pop() || "Signals";
  const titleLead = titleParts.join(" ");
  return (
    <section className="border-b hairline py-14 md:py-20" id="signal">
      <div className="site-shell grid-field flex min-h-[300px] items-center justify-center py-10 md:min-h-[380px] md:py-16">
        <article className="w-full max-w-3xl overflow-hidden border border-[var(--border-strong)] bg-[#101010]">
          <div className="grid min-h-12 grid-cols-[minmax(0,1fr)_170px] border-b hairline text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--dim)]">
            <div className="flex items-center px-5 text-[var(--blue-quiet)]">Signal lab / note manifest</div>
            <div className="flex items-center border-l hairline px-5">AI + media</div>
          </div>
          <div className="grid md:grid-cols-[minmax(0,1fr)_170px]">
            <div className="p-5 md:p-7">
              <h2 className="balanced max-w-xl text-[clamp(2rem,4vw,3.4rem)] font-black leading-[0.92] tracking-[-0.04em]">
                {titleLead} <span className="text-[var(--red)]">{accentWord}.</span>
              </h2>
              <p className="mt-4 max-w-xl pretty text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex min-h-9 items-center bg-[var(--red)] px-4 text-[9px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#9e1c1c]">Read Signal</Link>
            </div>
            <aside className="border-t hairline p-5 text-[9px] md:border-l md:border-t-0">
              <p className="uppercase tracking-[0.14em] text-[var(--dim)]">Discipline</p>
              <p className="mt-2 text-[var(--blue-quiet)]">Workflow architecture</p>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
