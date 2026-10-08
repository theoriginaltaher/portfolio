import type { MetadataRoute } from "next";
import { getMediaAlbums, getPostSlugs, getProjectSlugs } from "@/src/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [projects, posts, albums] = await Promise.all([getProjectSlugs(), getPostSlugs(), getMediaAlbums()]);
  const routes = ["", "/experience", "/projects", "/projects/systems", "/projects/media", "/about", "/blog", "/contact"];
  return [
    ...routes.map(route => ({ url: `${base}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...projects.map(({ slug }) => ({ url: `${base}/projects/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...albums.map(({ slug }) => ({ url: `${base}/projects/media/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...posts.map(({ slug }) => ({ url: `${base}/blog/${slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
