import Link from "next/link";
import type { BlogPost } from "@/src/types";

export function FeaturedSignalSection({ post }: { post?: BlogPost }) {
  if (!post) return null;
  const titleParts = post.title.split(" ");
  const accentWord = titleParts.pop() || "Signals";
  const titleLead = titleParts.join(" ");
  return (
    <section className="border-b hairline py-16 md:py-24" id="signal">
      <div className="site-shell max-w-[1440px]">
        <article className="relative overflow-hidden border border-[var(--border-strong)] bg-[var(--panel-muted)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_20%,rgba(59,88,124,.16),transparent_26rem),radial-gradient(circle_at_12%_90%,rgba(176,32,32,.1),transparent_24rem)]" />
          <div className="relative grid md:grid-cols-[minmax(0,1fr)_300px]">
          <div className="p-7 md:p-12">
            <p className="mb-8 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--blue-quiet)]">
              Selected Signal
            </p>
            <h2 className="balanced max-w-3xl text-[clamp(2.5rem,5vw,5.25rem)] font-black leading-[0.92] tracking-[-0.04em]">
              {titleLead}
              <span className="block text-[var(--red)]">{accentWord}.</span>
            </h2>
            <p className="mt-8 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
              {post.excerpt}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-10 inline-flex min-h-12 items-center bg-[var(--red)] px-6 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#9e1c1c]"
            >
              Read Signal
            </Link>
          </div>
          <aside className="flex flex-col justify-between border-t hairline p-7 text-sm md:border-l md:border-t-0 md:p-10">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--blue-quiet)]">Field notes</p>
            <p className="mt-10 text-2xl font-black leading-tight tracking-[-0.03em] text-[var(--text)]">AI, media, systems, and the decisions that connect them.</p>
            <p className="mt-10 border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--dim)]">Essays / case files / operating notes</p>
          </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
