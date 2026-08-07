import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { PageFrame } from "@/components/pages/PageFrame";
import { BackLink } from "@/components/ui/Primitives";
import { getPost, getPostSlugs } from "@/src/lib/content";

type Props = { params: Promise<{ slug: string }> };
export const revalidate = 60;
export async function generateStaticParams() { return getPostSlugs(); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const post = await getPost((await params).slug); return post ? { title: `${post.title} | Taher Hussain`, description: post.excerpt } : { title: "Article not found | Taher Hussain" }; }
export default async function PostPage({ params }: Props) { const post = await getPost((await params).slug); if (!post) notFound(); const date = new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(post.publishedAt)); return <PageFrame><main><article className="site-shell max-w-5xl px-0 pb-24 pt-28 sm:pt-36"><BackLink href="/blog">Back to writing</BackLink><header className="border-b hairline pb-12 pt-16"><p className="text-sm text-[var(--muted)]">{date} · {post.readingTime} min read</p><h1 className="balanced mt-5 text-[clamp(3rem,8vw,6rem)] font-black leading-[0.94] tracking-[-0.04em]">{post.title}</h1><p className="pretty mt-8 max-w-3xl text-xl leading-9 text-[var(--muted)]">{post.excerpt}</p></header><ArticleBody value={post.body} /></article></main></PageFrame>; }
