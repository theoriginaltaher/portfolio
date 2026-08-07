import type { QueryParams } from "next-sanity";
import { isSanityConfigured, sanityClient } from "@/src/lib/sanity/client";
import * as queries from "@/src/lib/sanity/queries";
import type { BlogPost, ExperienceEntry, Project, SiteSettings, Skill } from "@/src/types";

async function fetchContent<T>(query: string, params: QueryParams = {}): Promise<T> {
  if (!isSanityConfigured) {
    throw new Error("Live Sanity content is required but NEXT_PUBLIC_SANITY_PROJECT_ID is missing.");
  }

  const result = await sanityClient.fetch<T>(query, params, { next: { revalidate: 60 } });
  if (result === null || result === undefined) {
    throw new Error("Live Sanity returned no content for a required query.");
  }
  return result;
}

export const getProjects = () => fetchContent<Project[]>(queries.ALL_PUBLISHED_PROJECTS_QUERY);
export const getFeaturedProjects = () => fetchContent<Project[]>(queries.FEATURED_PROJECTS_QUERY);
export const getProjectsByCategory = (category: Project["category"]) => fetchContent<Project[]>(category === "systems" ? queries.SYSTEMS_PROJECTS_QUERY : queries.MEDIA_PROJECTS_QUERY);
export const getProject = (slug: string) => fetchContent<Project | null>(queries.PROJECT_BY_SLUG_QUERY, { slug });
export const getProjectSlugs = () => fetchContent<{ slug: string }[]>(queries.ALL_PROJECT_SLUGS_QUERY);
export const getExperience = (featured = false) => fetchContent<ExperienceEntry[]>(featured ? queries.FEATURED_EXPERIENCE_QUERY : queries.ALL_EXPERIENCE_QUERY);
export const getSkills = () => fetchContent<Skill[]>(queries.ALL_SKILLS_QUERY);
export const getSiteSettings = () => fetchContent<SiteSettings>(queries.SITE_SETTINGS_QUERY);
export const getPosts = (latest = false) => fetchContent<BlogPost[]>(latest ? queries.LATEST_POSTS_QUERY : queries.ALL_POSTS_QUERY);
export const getPost = (slug: string) => fetchContent<BlogPost | null>(queries.POST_BY_SLUG_QUERY, { slug });
export const getPostSlugs = () => fetchContent<{ slug: string }[]>(queries.ALL_POST_SLUGS_QUERY);
