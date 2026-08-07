import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required.");

const client = createClient({
  projectId,
  dataset,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const result = await client.fetch(`{
  "counts": {
    "projects": count(*[_type == "project" && published == true]),
    "systems": count(*[_type == "project" && published == true && category == "systems"]),
    "media": count(*[_type == "project" && published == true && category == "media"]),
    "experience": count(*[_type == "experience"]),
    "skills": count(*[_type == "skill"]),
    "posts": count(*[_type == "post" && defined(publishedAt)]),
    "settings": count(*[_type == "siteSettings"])
  },
  "missingProjectAlt": *[_type == "project" && published == true && (!defined(featuredImage.alt) || featuredImage.alt == "")]{_id,title},
  "missingGalleryAlt": *[_type == "project" && published == true]{_id,title,"missing": gallery[!defined(alt) || alt == ""]},
  "projectImages": *[_type == "project" && published == true]{
    _id,
    title,
    "featured": featuredImage.asset->{_id,url,"width":metadata.dimensions.width,"height":metadata.dimensions.height},
    "gallery": gallery[].asset->{_id,url,"width":metadata.dimensions.width,"height":metadata.dimensions.height}
  },
  "siteSettings": *[_type == "siteSettings"][0]{name,email,metaDescription,"portrait":portrait.asset->{url,"width":metadata.dimensions.width,"height":metadata.dimensions.height}}
}`);

const allImages = result.projectImages.flatMap((project) => [project.featured, ...(project.gallery || [])].filter(Boolean));
const undersized = allImages.filter((image) => image.width < 1200 || image.height < 800);
const galleryAltFailures = result.missingGalleryAlt.filter((project) => project.missing?.length);
const expected = { projects: 6, systems: 4, media: 2, experience: 5, skills: 9, posts: 2, settings: 1 };
const countFailures = Object.entries(expected).filter(([key, value]) => result.counts[key] < value);

console.log(JSON.stringify({ ...result.counts, projectImageCount: allImages.length, undersizedImageCount: undersized.length, missingFeaturedAltCount: result.missingProjectAlt.length, missingGalleryAltCount: galleryAltFailures.length }, null, 2));

if (countFailures.length || undersized.length || result.missingProjectAlt.length || galleryAltFailures.length || !result.siteSettings) {
  console.error(JSON.stringify({ countFailures, undersized, missingFeaturedAlt: result.missingProjectAlt, galleryAltFailures }, null, 2));
  process.exitCode = 1;
}
