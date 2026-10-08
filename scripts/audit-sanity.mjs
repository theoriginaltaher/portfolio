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
  perspective: "published",
});

const result = await client.fetch(`{
  "counts": {
    "projects": count(*[_type == "project" && published == true]),
    "systems": count(*[_type == "project" && published == true && category == "systems"]),
    "media": count(*[_type == "project" && published == true && category == "media"]),
    "mediaAlbums": count(*[_type == "mediaAlbum" && published == true]),
    "experience": count(*[_type == "experience"]),
    "education": count(*[_type == "education"]),
    "certifications": count(*[_type == "certification"]),
    "courses": count(*[_type == "course"]),
    "languages": count(*[_type == "language"]),
    "careerProjects": count(*[_type == "careerProject" && published == true]),
    "recommendations": count(*[_type == "recommendation" && published == true]),
    "skills": count(*[_type == "skill"]),
    "posts": count(*[_type == "post" && defined(publishedAt)]),
    "settings": count(*[_type == "siteSettings"])
  },
  "missingProjectAlt": *[_type == "project" && published == true && !defined(media) && (!defined(featuredImage.alt) || featuredImage.alt == "")]{_id,title},
  "mediaRecords": *[_type in ["project", "mediaAlbum"] && published == true]{_id,title,"items":coalesce(media,items,[])[hidden != true]{title,type,alt,"src":select(type == "video" => video.asset->url,image.asset->url),"width":image.asset->metadata.dimensions.width,"height":image.asset->metadata.dimensions.height}},
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
const visibleMedia = result.mediaRecords.flatMap(record => record.items.map(item => ({ ...item, document: record.title })));
const mediaFailures = visibleMedia.filter(item => !item.src || !item.alt?.trim() || !item.title?.trim() || (item.type === "image" && !(item.width > 0 && item.height > 0)));
const galleryAltFailures = result.missingGalleryAlt.filter((project) => project.missing?.length);
const settingsFailure = result.counts.settings !== 1 || !result.siteSettings;

console.log(JSON.stringify({ ...result.counts, projectImageCount: allImages.length, visibleMediaCount: visibleMedia.length, mediaFailureCount: mediaFailures.length, undersizedImageCount: undersized.length, missingFeaturedAltCount: result.missingProjectAlt.length, missingGalleryAltCount: galleryAltFailures.length }, null, 2));

if (settingsFailure || undersized.length || result.missingProjectAlt.length || galleryAltFailures.length || mediaFailures.length) {
  console.error(JSON.stringify({ settingsFailure, undersized, missingFeaturedAlt: result.missingProjectAlt, galleryAltFailures, mediaFailures }, null, 2));
  process.exitCode = 1;
}
