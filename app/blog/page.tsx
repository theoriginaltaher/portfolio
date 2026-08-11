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
        title="Signals from the systems behind the work."
        summary="A writing space for technical notes, workflow observations, and field reports from the overlap of AI, media, web architecture, and business operations."
        stats={[
          { label: "Format", value: "Notes / Essays / Case files" },
          { label: "Focus", value: "AI, systems, media, operations" },
          { label: "Status", value: "Editorial index in progress" },
        ]}
        primaryItems={posts.map((post) => ({
          title: post.title,
          description: post.excerpt,
          meta: `${new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.publishedAt))} / ${post.readingTime} min read`,
          href: `/blog/${post.slug}`,
        }))}
        sideTitle="Editorial System"
        sideItems={[
          "Writing is grouped by signal type rather than by publishing date alone.",
          "Short notes can become case files when the underlying system matures.",
          "Published notes are managed through the portfolio content system.",
        ]}
        cta={{ label: "Discuss Writing", href: "/contact" }}
      />
    </PageFrame>
  );
}
