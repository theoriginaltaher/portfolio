import { defineQuery } from "next-sanity";

export const mediaItemFields = `{"id":_key,type,title,alt,caption,"src":select(type == "video" => video.asset->url, image.asset->url),"poster":poster.asset->url,"captionsUrl":captions.asset->url,"width":image.asset->metadata.dimensions.width,"height":image.asset->metadata.dimensions.height}`;
const visibleMedia = `items[hidden != true && ((type == "image" && defined(image.asset)) || (type == "video" && defined(video.asset)))]`;
const albumFields = `{title,"slug":slug.current,date,category,description,"tags":coalesce(tags,[]),"items":${visibleMedia}${mediaItemFields}}`;
export const MEDIA_ALBUMS_QUERY = defineQuery(`*[_type == "mediaAlbum" && published == true && !(_id in path("drafts.**"))] | order(order asc, title asc) ${albumFields}`);
const projectFields = `{_id,title,"slug":slug.current,category,shortDescription,fullDescription,featuredImage{...,asset->{url,metadata{dimensions}}},gallery[hidden != true]{...,asset->{url,metadata{dimensions}}},"media":media[hidden != true]${mediaItemFields},externalUrl,year,role,"tools":coalesce(tools,[]),order,featured,published}`;
const postFields = `{_id,title,"slug":slug.current,excerpt,publishedAt,readingTime,body,coverImage{...,asset->{url,metadata{dimensions}}}}`;

export const ALL_PUBLISHED_PROJECTS_QUERY = defineQuery(`*[_type == "project" && published == true] | order(order asc) ${projectFields}`);
export const SYSTEMS_PROJECTS_QUERY = defineQuery(`*[_type == "project" && published == true && category == "systems"] | order(order asc) ${projectFields}`);
export const MEDIA_PROJECTS_QUERY = defineQuery(`*[_type == "project" && published == true && category == "media"] | order(order asc) ${projectFields}`);
export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "project" && published == true && category == "systems" && slug.current == $slug][0] ${projectFields}`);
export const ALL_PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "project" && published == true && category == "systems"]{"slug":slug.current}`);
export const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "project" && published == true && featured == true] | order(order asc)[0...6] ${projectFields}`);
export const ALL_EXPERIENCE_QUERY = defineQuery(`*[_type == "experience"] | order(order asc){_id,role,organisation,location,dateRange,description,category,order,current}`);
export const FEATURED_EXPERIENCE_QUERY = defineQuery(`*[_type == "experience"] | order(order asc)[0...5]{_id,role,organisation,location,dateRange,description,category,order,current}`);
export const ALL_SKILLS_QUERY = defineQuery(`*[_type == "skill"] | order(order asc){_id,label,order}`);
export const ALL_EDUCATION_QUERY = defineQuery(`*[_type == "education"] | order(order asc){_id,school,qualification,startDate,endDate,description,activities,order}`);
export const ALL_CERTIFICATIONS_QUERY = defineQuery(`*[_type == "certification"] | order(order asc){_id,name,issuer,issuedOn,credentialId,credentialUrl,order}`);
export const ALL_COURSES_QUERY = defineQuery(`*[_type == "course"] | order(order asc){_id,name,reference,order}`);
export const ALL_LANGUAGES_QUERY = defineQuery(`*[_type == "language"] | order(order asc){_id,name,proficiency,order}`);
export const ALL_CAREER_PROJECTS_QUERY = defineQuery(`*[_type == "careerProject" && published == true] | order(order asc){_id,title,description,startDate,endDate,externalUrl,order,published}`);
export const ALL_RECOMMENDATIONS_QUERY = defineQuery(`*[_type == "recommendation" && published == true] | order(order asc){_id,personName,role,organisation,quote,receivedAt,order,published}`);
export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{name,role,headline,location,bio,portrait{...,asset->{url,metadata{dimensions}}},email,linkedIn,metaDescription}`);
export const ALL_POSTS_QUERY = defineQuery(`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) ${postFields}`);
export const LATEST_POSTS_QUERY = defineQuery(`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...3] ${postFields}`);
export const POST_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0] ${postFields}`);
export const ALL_POST_SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(publishedAt)]{"slug":slug.current}`);
