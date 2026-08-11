import type { Metadata } from "next";
import { InnerPage } from "@/components/pages/InnerPage";
import { PageFrame } from "@/components/pages/PageFrame";
import { getPosts } from "@/src/lib/content";

export const metadata: Metadata = {
  title: "Blog | Taher Hussain",
  description:
    "Notes and essays from Taher Hussain on AI workflows, digital systems, media pipelines, and creative technology.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <PageFrame>
      <InnerPage
        eyebrow="05 / Blog"
        title="Notes on making and building."
        summary="Thoughts from the overlap of creative work, technology, media, and the practical lessons that come from bringing ideas to life."
        stats={[
          { label: "What you will find", value: "Notes, essays, and project reflections" },
          { label: "Subjects", value: "AI, creative systems, media, and leadership" },
          { label: "Perspective", value: "Written from active practice" },
        ]}
        primaryItems={posts.map((post) => ({
          title: post.title,
          description: post.excerpt,
          meta: `${new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.publishedAt))} / ${post.readingTime} min read`,
          href: `/blog/${post.slug}`,
        }))}
        sideTitle="About the writing"
        sideItems={[
          "These pieces begin with questions and observations from real work.",
          "Some are short notes. Others grow into fuller reflections as a project develops.",
          "The aim is to share what was learned clearly, without polishing away the useful details.",
        ]}
        cta={{ label: "Start a conversation", href: "/contact" }}
      />
    </PageFrame>
  );
}
