import Link from "next/link";
import type { BlogPostPreview } from "@/src/types";

export function BlogPostRow({ post }: { post: BlogPostPreview }) {
  const date = new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.publishedAt));
  return <article className="grid gap-5 border-b hairline py-8 md:grid-cols-[180px_1fr_auto] md:items-start"><div className="text-sm text-[var(--muted)]"><p>{date}</p><p className="mt-1">{post.readingTime} min read</p></div><div><h2 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl"><Link href={`/blog/${post.slug}`} className="transition-colors hover:text-[var(--accent)]">{post.title}</Link></h2><p className="pretty mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">{post.excerpt}</p></div><Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`} className="text-xl text-[var(--accent)]">↗</Link></article>;
}
