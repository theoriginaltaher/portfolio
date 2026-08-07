import { defineQuery } from "next-sanity";

const projectFields = `{_id,title,"slug":slug.current,category,shortDescription,fullDescription,featuredImage{...,asset->{url,metadata{dimensions}}},gallery[]{...,asset->{url,metadata{dimensions}}},year,role,tools,order,featured,published}`;
const postFields = `{_id,title,"slug":slug.current,excerpt,publishedAt,readingTime,body,coverImage{...,asset->{url,metadata{dimensions}}}}`;

export const ALL_PUBLISHED_PROJECTS_QUERY = defineQuery(`*[_type == "project" && published == true] | order(order asc) ${projectFields}`);
export const SYSTEMS_PROJECTS_QUERY = defineQuery(`*[_type == "project" && published == true && category == "systems"] | order(order asc) ${projectFields}`);
export const MEDIA_PROJECTS_QUERY = defineQuery(`*[_type == "project" && published == true && category == "media"] | order(order asc) ${projectFields}`);
export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] ${projectFields}`);
export const ALL_PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "project" && published == true]{"slug":slug.current}`);
export const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "project" && published == true && featured == true] | order(order asc)[0...6] ${projectFields}`);
export const ALL_EXPERIENCE_QUERY = defineQuery(`*[_type == "experience"] | order(order asc){_id,role,organisation,dateRange,description,category,order,current}`);
export const FEATURED_EXPERIENCE_QUERY = defineQuery(`*[_type == "experience"] | order(order asc)[0...5]{_id,role,organisation,dateRange,description,category,order,current}`);
export const ALL_SKILLS_QUERY = defineQuery(`*[_type == "skill"] | order(order asc){_id,label,order}`);
export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{name,role,bio,portrait{...,asset->{url,metadata{dimensions}}},email,linkedIn,metaDescription}`);
export const ALL_POSTS_QUERY = defineQuery(`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) ${postFields}`);
export const LATEST_POSTS_QUERY = defineQuery(`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...3] ${postFields}`);
export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] ${postFields}`);
export const ALL_POST_SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(publishedAt)]{"slug":slug.current}`);
