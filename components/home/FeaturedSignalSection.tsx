import Link from "next/link";
import type { BlogPost } from "@/src/types";

export function FeaturedSignalSection({ post }: { post?: BlogPost }) {
  if (!post) return null;

  const published = new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    new Date(post.publishedAt),
  );

  return (
    <section className="border-b hairline py-14 md:py-20" id="signal">
      <div className="site-shell max-w-[1320px]">
        <article className="grid gap-8 border-y border-white/10 py-10 md:grid-cols-[0.36fr_1fr] md:gap-14 md:py-14">
          <div>
            <p className="text-sm font-semibold text-[var(--red)]">From the journal</p>
            <p className="mt-4 text-sm leading-6 text-[var(--dim)]">
              {published}<br />{post.readingTime} minute read
            </p>
          </div>

          <div>
            <h2 className="balanced max-w-4xl text-[clamp(2rem,4vw,3.6rem)] font-black leading-[0.96] tracking-[-0.04em]">
              {post.title}
            </h2>
            <p className="mt-5 max-w-2xl pretty text-base leading-7 text-[var(--muted)]">
              {post.excerpt}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-7 inline-flex min-h-11 items-center border-b border-[var(--red)] text-sm font-semibold text-white transition hover:text-[var(--red)]"
            >
              Read the article <span className="ml-3" aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
