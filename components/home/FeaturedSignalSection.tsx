import Link from "next/link";
import type { BlogPost } from "@/src/types";

export function FeaturedSignalSection({ post }: { post?: BlogPost }) {
  if (!post) return null;
  const titleParts = post.title.split(" ");
  const accentWord = titleParts.pop() || "Signals";
  const titleLead = titleParts.join(" ");
  return (
    <section className="border-b hairline py-14 md:py-20" id="signal">
      <div className="site-shell max-w-[1440px]">
        <article className="grid overflow-hidden border-y border-[var(--border-strong)] md:grid-cols-[minmax(0,1fr)_300px]">
          <div className="py-10 pr-0 md:py-14 md:pr-14">
            <p className="mb-8 text-[11px] font-black uppercase tracking-[0.18em] text-[var(--blue-quiet)]">
              Selected Signal
            </p>
            <h2 className="balanced max-w-xl text-5xl font-black leading-[0.96] tracking-[-0.045em] md:text-6xl">
              {titleLead}
              <span className="block text-[var(--red)]">{accentWord}.</span>
            </h2>
            <p className="mt-8 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
              {post.excerpt}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-10 inline-flex h-11 items-center bg-[var(--red)] px-6 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#9e1c1c]"
            >
              Read Signal
            </Link>
          </div>
          <aside className="border-t hairline py-8 text-sm md:border-l md:border-t-0 md:px-8 md:py-14">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--blue-quiet)]">Notes on AI, media, systems, and operations.</p>
            <p className="mt-5 leading-6 text-[var(--muted)]">A short field note from the work behind the visible output.</p>
          </aside>
        </article>
      </div>
    </section>
  );
}
