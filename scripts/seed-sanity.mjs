import { join } from "node:path";
import { createClient } from "@sanity/client";
import sharp from "sharp";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are required.");
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });
const block = (text, key = "body") => ({
  _key: key,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
});

const imageSources = [
  ["taher-hero-camera.png", "Taher operating a camera in a low-lit production workspace"],
  ["taher-portrait-hero-color.png", "Taher Hussain seated in a blue-lit creative workspace"],
  ["taher-hero-reference.png", "Portrait study from the Memento visual archive"],
  ["taher-hero-wide.png", "Wide production still from Taher's media archive"],
  ["taher-portrait.png", "Monochrome portrait of Taher Hussain"],
  ["taher-reference-portrait.png", "Portrait detail from the YOUTH 2K25 archive"],
];

async function uploadImage(filename, alt) {
  const sourcePath = join(process.cwd(), "public", "assets", filename);
  const buffer = await sharp(sourcePath)
    .resize(1600, 1000, { fit: "cover", position: "attention", withoutEnlargement: false })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
  const asset = await client.assets.upload("image", buffer, { filename: filename.replace(/\.[^.]+$/, ".jpg") });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt };
}

const imageDocuments = Object.fromEntries(
  await Promise.all(imageSources.map(async ([filename, alt]) => [filename, await uploadImage(filename, alt)])),
);

const projects = [
  ["project-thc", "TaherHussainCreations", "taher-hussain-creations", "systems", "A modular creative operations practice connecting client intake, production, publishing, and delivery.", "2018–Now", "Founder and Creative Technologist", ["Next.js", "Automation", "Cloud workflows"], 1, "taher-hero-camera.png"],
  ["project-starsons", "Starsons Digital Presence", "starsons-digital-presence", "systems", "A unified web, media, and operational foundation for a growing Sri Lankan business.", "2019–Now", "CTO and systems lead", ["Web architecture", "Content systems", "Analytics"], 2, "taher-portrait-hero-color.png"],
  ["project-pixel", "Pixel Perfect V1", "pixel-perfect-v1", "systems", "A design-to-code experiment for turning visual references into responsive production components.", "2024", "Designer and developer", ["React", "TypeScript", "Design systems"], 3, "taher-hero-reference.png"],
  ["project-echo", "WRO / EchoLens", "echolens", "systems", "A robotics research concept exploring sensing, accessible feedback, and reliable real-time decisions.", "2023", "Research and prototyping", ["Robotics", "Sensors", "Rapid prototyping"], 4, "taher-hero-wide.png"],
  ["project-youth", "YOUTH 2K25", "youth-2k25", "media", "Event media direction, photography, and delivery for a youth-led cultural programme.", "2025", "Media lead", ["Photography", "Video production", "Event media"], 5, "taher-portrait-hero-color.png"],
  ["project-memento", "Memento", "memento", "media", "A portrait and moving-image study about memory, presence, and the spaces between takes.", "2025", "Photographer and editor", ["Photography", "Direction", "Post-production"], 6, "taher-hero-reference.png"],
].map(([id, title, slug, category, shortDescription, year, role, tools, order, image]) => ({
  _id: id,
  _type: "project",
  title,
  slug: { _type: "slug", current: slug },
  category,
  shortDescription,
  fullDescription: [block(`${shortDescription} The work is documented as a practical system of decisions, production methods, and operating outcomes.`, `${id}-body`)],
  featuredImage: imageDocuments[image],
  gallery: category === "media"
    ? imageSources.slice(category === "media" && slug === "youth-2k25" ? 0 : 3, category === "media" && slug === "youth-2k25" ? 3 : 6).map(([filename]) => imageDocuments[filename])
    : [],
  year,
  role,
  tools,
  order,
  featured: true,
  published: true,
}));

const experiences = [
  ["experience-thc", "Founder & Creative Technologist", "TaherHussainCreations", "Jul 2018 · Present", "Built a creative practice spanning video, design, photography, web development, and AI-assisted production.", "work", 1, true],
  ["experience-cto", "Chief Technology Officer", "Starsons International (Pvt) Ltd", "Dec 2024 · Present", "Leads digital systems, cloud tools, web platforms, media operations, and technology decisions.", "work", 2, true],
  ["experience-it", "Head of Information Technology & Media", "Starsons International (Pvt) Ltd", "Jun 2019 · Dec 2024", "Built the company's web, content, media, and cloud operation from the ground up.", "work", 3, false],
  ["experience-ict", "Vice President", "The ICT & Media Society · Burhani Serendib School", "Jul 2025 · Present", "Supports practical technology and media programmes, peer learning, and event delivery.", "leadership", 4, true],
  ["experience-interact", "Editor & Director of Public Relations", "The Interact Club · Burhani Serendib School", "Jul 2024 · Aug 2025", "Led editorial consistency, promotional content, trailers, highlight reels, and event videos.", "leadership", 5, false],
].map(([id, role, organisation, dateRange, description, category, order, current]) => ({ _id: id, _type: "experience", role, organisation, dateRange, description, category, order, current }));

const skills = ["AI & Automation", "Multimedia Production", "Video & Photography", "Graphic Design", "Web Development", "Cloud Infrastructure", "Robotics", "Event Media", "Digital Strategy"].map((label, index) => ({ _id: `skill-${index + 1}`, _type: "skill", label, order: index + 1 }));

const posts = [
  { _id: "post-signals", _type: "post", title: "Architecting Meaningful Signals", slug: { _type: "slug", current: "architecting-meaningful-signals" }, excerpt: "How AI becomes useful in creative work when intent, source material, and review are designed as one system.", publishedAt: "2026-07-18T09:00:00.000Z", readingTime: 6, body: [block("AI is most useful when it strengthens a workflow instead of becoming the workflow.", "signals-1"), block("A reliable creative system begins with a clear input contract, deliberate constraints, and human review.", "signals-2")], coverImage: imageDocuments["taher-hero-camera.png"] },
  { _id: "post-memory", _type: "post", title: "Digital Systems Need Operating Memory", slug: { _type: "slug", current: "digital-systems-need-operating-memory" }, excerpt: "Documentation works best when it records why a system behaves as it does, not only what buttons to press.", publishedAt: "2026-06-29T09:00:00.000Z", readingTime: 5, body: [block("Most systems slowly lose the reasoning that shaped them.", "memory-1"), block("Operating memory preserves ownership, naming rules, failure paths, and the reasons exceptions exist.", "memory-2")], coverImage: imageDocuments["taher-portrait-hero-color.png"] },
];

const settings = {
  _id: "siteSettings",
  _type: "siteSettings",
  name: "Taher Hussain",
  role: "Creative Technologist",
  bio: [block("I design, build, and manage digital solutions across web development, multimedia production, AI-assisted systems, and technology-driven business operations.", "bio-1"), block("Based in Sri Lanka and working globally, I build systems that remain understandable, maintainable, and useful after launch.", "bio-2")],
  portrait: imageDocuments["taher-portrait-hero-color.png"],
  email: process.env.CONTACT_EMAIL || "hello@taherhussain.com",
  linkedIn: "https://www.linkedin.com/in/taherhussain",
  metaDescription: "Portfolio of Taher Hussain, a Sri Lankan creative technologist building digital systems, media workflows, and AI-assisted operations.",
};

const documents = [...projects, ...experiences, ...skills, ...posts, settings];
for (const document of documents) {
  await client.createOrReplace(document);
  console.log(`Seeded ${document._type}: ${document._id}`);
}

const counts = await client.fetch(`{
  "projects": count(*[_type == "project" && published == true]),
  "experience": count(*[_type == "experience"]),
  "skills": count(*[_type == "skill"]),
  "posts": count(*[_type == "post" && defined(publishedAt)]),
  "settings": count(*[_type == "siteSettings"]),
  "undersizedImages": count(*[_type == "sanity.imageAsset" && (metadata.dimensions.width < 1200 || metadata.dimensions.height < 800)])
}`);
console.log("Sanity verification", counts);
