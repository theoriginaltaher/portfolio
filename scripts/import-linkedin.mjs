import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createClient } from "@sanity/client";
import { JSDOM } from "jsdom";

const sourceDirectory = process.argv[2];
if (!sourceDirectory) throw new Error("Pass the extracted LinkedIn export directory as the first argument.");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
if (!projectId || !token) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are required.");

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const [headers = [], ...values] = rows;
  return values
    .filter((cells) => cells.some(Boolean))
    .map((cells) => Object.fromEntries(headers.map((header, index) => [header.replace(/^\uFEFF/, ""), cells[index] || ""])));
}

async function readCsv(fileName) {
  return parseCsv(await readFile(path.join(sourceDirectory, fileName), "utf8"));
}

function clean(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function cleanParagraphs(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/[ \t]{2,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slugify(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72).replace(/-$/g, "");
}

function block(text, index, style = "normal") {
  return {
    _key: `block-${index}`,
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: `span-${index}`, _type: "span", marks: [], text: clean(text) }],
  };
}

function portableText(paragraphs) {
  return paragraphs.filter(Boolean).map((paragraph, index) => block(paragraph, index));
}

function dateRange(start, finish) {
  return [clean(start), clean(finish) || "Present"].filter(Boolean).join(" · ");
}

function splitActivities(value) {
  return cleanParagraphs(value)
    .split(/\s*\|\s*|\n{2,}/)
    .map(clean)
    .filter(Boolean);
}

async function findArticleFiles(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const itemPath = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await findArticleFiles(itemPath));
    else if (entry.name.toLowerCase().endsWith(".html")) found.push(itemPath);
  }
  return found;
}

async function importArticles() {
  const articleRoot = path.join(sourceDirectory, "Articles");
  let files = [];
  try {
    files = await findArticleFiles(articleRoot);
  } catch {
    return [];
  }

  const posts = [];
  for (const file of files) {
    const dom = new JSDOM(await readFile(file, "utf8"));
    const document = dom.window.document;
    const title = clean(document.querySelector("h1")?.textContent || document.title);
    if (!title) continue;

    const content = [...document.querySelectorAll("body > div")].at(-1);
    if (!content) continue;
    const articleBlocks = [...content.querySelectorAll("p")]
      .map((paragraph, index) => {
        const text = clean(paragraph.textContent || "");
        if (!text) return null;
        const isHeading = paragraph.children.length === 1 && paragraph.firstElementChild?.tagName === "STRONG";
        return block(text, index, isHeading ? "h2" : "normal");
      })
      .filter(Boolean);
    if (!articleBlocks.length) continue;

    const publishedLabel = clean(document.querySelector(".published")?.textContent || "").replace(/^Published on\s*/i, "");
    const createdLabel = clean(document.querySelector(".created")?.textContent || "").replace(/^Created on\s*/i, "");
    const sourceDate = publishedLabel && publishedLabel !== "---" ? publishedLabel : createdLabel;
    const publishedAt = `${sourceDate.replace(" ", "T")}:00+05:30`;
    const plainParagraphs = articleBlocks.filter((item) => item.style === "normal").map((item) => item.children[0].text);
    const wordCount = plainParagraphs.join(" ").split(/\s+/).filter(Boolean).length;
    const slug = slugify(title);

    posts.push({
      _id: `linkedin-post-${slug}`,
      _type: "post",
      title,
      slug: { _type: "slug", current: slug },
      excerpt: plainParagraphs.slice(0, 2).join(" ").slice(0, 237).replace(/\s+\S*$/, "") + "…",
      publishedAt,
      readingTime: Math.max(1, Math.ceil(wordCount / 220)),
      body: articleBlocks,
    });
  }
  return posts;
}

const [profileRows, positions, education, certifications, courses, skills, languages, volunteering, projects, recommendations, posts] = await Promise.all([
  readCsv("Profile.csv"),
  readCsv("Positions.csv"),
  readCsv("Education.csv"),
  readCsv("Certifications.csv"),
  readCsv("Courses.csv"),
  readCsv("Skills.csv"),
  readCsv("Languages.csv"),
  readCsv("Volunteering.csv"),
  readCsv("Projects.csv"),
  readCsv("Recommendations_Received.csv"),
  importArticles(),
]);

const profile = profileRows[0];
if (!profile) throw new Error("Profile.csv did not contain a profile row.");

const documents = [
  ...positions.map((item, index) => ({
    _id: `linkedin-work-${slugify(`${item["Company Name"]}-${item.Title}-${item["Started On"]}`)}`,
    _type: "experience",
    role: clean(item.Title),
    organisation: clean(item["Company Name"]),
    location: clean(item.Location),
    dateRange: dateRange(item["Started On"], item["Finished On"]),
    description: cleanParagraphs(item.Description) || undefined,
    category: "work",
    order: index + 1,
    current: !item["Finished On"],
  })),
  ...volunteering.map((item, index) => ({
    _id: `linkedin-leadership-${slugify(`${item["Company Name"]}-${item.Role}-${item["Started On"]}`)}`,
    _type: "experience",
    role: clean(item.Role),
    organisation: clean(item["Company Name"]),
    dateRange: dateRange(item["Started On"], item["Finished On"]),
    description: cleanParagraphs(item.Description) || undefined,
    category: "leadership",
    order: positions.length + index + 1,
    current: !item["Finished On"],
  })),
  ...education.map((item, index) => ({
    _id: `linkedin-education-${slugify(`${item["School Name"]}-${item["Degree Name"]}`)}`,
    _type: "education",
    school: clean(item["School Name"]),
    qualification: clean(item["Degree Name"]),
    startDate: clean(item["Start Date"]),
    endDate: clean(item["End Date"]),
    description: cleanParagraphs(item.Notes),
    activities: splitActivities(item.Activities),
    order: index + 1,
  })),
  ...certifications.map((item, index) => ({
    _id: `linkedin-certification-${slugify(`${item.Authority}-${item.Name}`)}`,
    _type: "certification",
    name: clean(item.Name),
    issuer: clean(item.Authority),
    issuedOn: clean(item["Started On"]),
    credentialId: clean(item["License Number"]),
    credentialUrl: clean(item.Url) || undefined,
    order: index + 1,
  })),
  ...courses.map((item, index) => ({
    _id: `linkedin-course-${slugify(item.Name)}`,
    _type: "course",
    name: clean(item.Name),
    reference: clean(item.Number),
    order: index + 1,
  })),
  ...skills.map((item, index) => ({
    _id: `linkedin-skill-${slugify(item.Name)}`,
    _type: "skill",
    label: clean(item.Name),
    order: index + 1,
  })),
  ...languages.map((item, index) => ({
    _id: `linkedin-language-${slugify(item.Name)}`,
    _type: "language",
    name: clean(item.Name),
    proficiency: clean(item.Proficiency),
    order: index + 1,
  })),
  ...projects.map((item, index) => ({
    _id: `linkedin-career-project-${slugify(`${item.Title}-${item["Started On"]}`)}`,
    _type: "careerProject",
    title: clean(item.Title),
    description: cleanParagraphs(item.Description),
    startDate: clean(item["Started On"]),
    endDate: clean(item["Finished On"]),
    externalUrl: clean(item.Url) || undefined,
    order: index + 1,
    published: true,
  })),
  ...recommendations.filter((item) => item.Status === "VISIBLE").map((item, index) => ({
    _id: `linkedin-recommendation-${slugify(`${item["First Name"]}-${item["Last Name"]}-${item.Company}`)}`,
    _type: "recommendation",
    personName: clean(`${item["First Name"]} ${item["Last Name"]}`),
    role: clean(item["Job Title"]),
    organisation: clean(item.Company),
    quote: cleanParagraphs(item.Text),
    receivedAt: clean(item["Creation Date"]),
    order: index + 1,
    published: true,
  })),
  ...posts,
];

const replaceTypes = ["experience", "education", "certification", "course", "skill", "language", "careerProject", "recommendation", "post"];
const legacyIds = [
  "experience-ict", "experience-space", "experience-memento", "experience-thc", "experience-ashara-1447",
  "experience-cto", "experience-ashara-1446", "experience-it", "experience-interact", "experience-video-team",
  ...Array.from({ length: 34 }, (_, index) => `skill-${index + 1}`),
];
const existingIds = await client.fetch(`*[_id match "linkedin-*" || _id in $legacyIds]._id`, { legacyIds });
let transaction = client.transaction();
for (const id of existingIds) transaction = transaction.delete(id);
for (const document of documents) transaction = transaction.createOrReplace(document);
transaction = transaction.patch("siteSettings", (patch) => patch.set({
  name: clean(`${profile["First Name"]} ${profile["Last Name"]}`),
  role: "Creative Technologist",
  headline: clean(profile.Headline),
  location: clean(profile["Geo Location"]),
  bio: portableText([
    "I build at the intersection of storytelling and technology, working across video production, graphic design, photography, web development, cloud systems, and AI-assisted workflows.",
    "I run TaherHussainCreations and serve as Chief Technology Officer at Starsons International, where I lead digital strategy, technical decisions, and multimedia production.",
    "Based in Sri Lanka, I work with brands, schools, community organisations, and event teams on practical creative and technical projects.",
  ]),
}));

const result = await transaction.commit({ visibility: "sync" });
console.log(JSON.stringify({ transactionId: result.transactionId, imported: documents.length, counts: Object.fromEntries(replaceTypes.map((type) => [type, documents.filter((document) => document._type === type).length])) }, null, 2));
