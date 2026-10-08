// Import selected local portfolio assets into Sanity without replacing existing documents.
// Usage: node --env-file=.env.local scripts/import-portfolio.mjs --root "path" [--apply]
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createClient } from "@sanity/client";
import sharp from "sharp";
import ts from "typescript";

const args = process.argv.slice(2);
const root = args[args.indexOf("--root") + 1];
if (!args.includes("--root") || !root) throw new Error("Provide --root pointing to the original portfolio folder.");
const apply = args.includes("--apply");
const cache = path.resolve("reports/media/import-cache");
await fs.mkdir(cache, { recursive: true });
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", token: process.env.SANITY_API_TOKEN, apiVersion: "2024-01-01", useCdn: false });
const run = promisify(execFile);
const hash = value => createHash("sha1").update(value).digest("hex").slice(0, 16);
const legacyCode = ts.transpileModule(await fs.readFile("src/data/media-albums.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const legacy = { exports: {} };
new Function("exports", "module", legacyCode)(legacy.exports, legacy);
const seeds = legacy.exports.mediaAlbums;
const curation = JSON.parse(await fs.readFile("data/portfolio-curation.json", "utf8"));
const photoFolders = {
  "interact-installation-29": "BSS - 29th Annual Installation Ceremony of the Interact Club",
  "interhouse-cricket-2024-25": "BSS - InterHouse Cricket Tournament (2024 25)",
  "interhouse-swimming-2024-25": "BSS - InterHouse Swimming Meet (2024 25)",
  "interhouse-athletics-2024-25": "BSS - InterHouse Athletic Meet (2024 25)",
  "interhouse-scrabble-2024-25": "BSS - InterHouse Scrabble Tournament (2024 25)",
  "interhouse-karate-2025-26": "BSS - InterHouse Karate Tournament (2025 26)",
  "interhouse-scrabble-2025-26": "BSS - InterHouse Scrabble Tournament (2025 26)",
  "interhouse-swimming-2025-26": "BSS - InterHouse Swimming Meet (2025 26)",
};
const filmFolders = {
  "interhouse-athletics-films-2025-26": "BSS - InterHouse Athletics Meet (2025 26)",
  "youth-series-films": "ICBSS - YOUTH Series",
  "rangers-safety-systems-films": "Rangers Safety Systems LLC",
  "annual-prize-giving-films-2024-25": "BSS - Annual Prize Giving (2024 25)",
  "annual-prize-giving-films-2023-24": "BSS - Annual Prize Giving (2023 24)",
};
const graphicsFolders = { "into-the-hoop-graphics": "ICBSS - Into the Hoop", "youth-series-graphics": "ICBSS - YOUTH Series", "icbss-pr-series": "ICBSS - PR", "space-digital-graphics": "Space Digital", "thc-identity": "THC", "icbss-merch": "ICBSS - Our Merch" };
const systems = [
  { folder: "ServeFlow", slug: "serveflow", title: "ServeFlow", cover: "Welcome & Table Selection.png", tools: ["Mobile UI", "Ordering flows"], description: "A table-to-checkout restaurant experience, bringing menus, item customisation, order tracking, split bills, and feedback into one flow." },
  { folder: "EchoLens Mobile App (Flutter)", slug: "echolens", title: "EchoLens", cover: "Home.png", tools: ["Flutter", "Accessibility"], description: "An assistive mobile interface with live captions, vision assistance, and connected-device controls. Explore the home, captioning, and vision screens." },
  { folder: "SplitMate", slug: "splitmate", title: "SplitMate", cover: "Dashboard.png", tools: ["Mobile UI", "Expense sharing"], description: "A shared-expense interface for tracking balances, splitting bills, recording payments, and reviewing group spending." },
  { folder: "Lanka360 (React)", slug: "lanka360", title: "Lanka360", cover: "Home.png", tools: ["React", "Civic information"], description: "An interactive guide to Sri Lanka’s governance, history, and economy, bringing national institutions, timelines, and regional information into one interface." },
  { folder: "Word Robot Olympiad - Sri Lanka (WordPress + PHP) - wro.lk", slug: "wro-sri-lanka", title: "World Robot Olympiad Sri Lanka", cover: "Home.png", tools: ["WordPress", "PHP"], externalUrl: "https://wro.lk", description: "A national robotics competition website connecting participants with competition details, registration, updates, and the WRO community." },
];
async function filesIn(folder) { return (await fs.readdir(folder, { withFileTypes: true })).filter(x => x.isFile() && (/\.(png|jpe?g|webp|mp4)$/i.test(x.name) || x.name === "#ByTHC")).map(x => x.name).sort((a,b) => a.localeCompare(b, undefined, { numeric: true })); }
async function uploadImage(file) {
  const content = await sharp(file).rotate().resize({ width: 2400, height: 5000, fit: "inside", withoutEnlargement: true }).webp({ quality: 87 }).toBuffer();
  const asset = await client.assets.upload("image", content, { filename: `${path.parse(file).name}.webp` });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}
async function makeItem(folder, name, albumTitle) {
  const file = path.join(folder, name);
  const key = hash(file);
  const cachedFile = path.join(cache, `${key}.json`);
  try { return JSON.parse(await fs.readFile(cachedFile, "utf8")); } catch {}
  const title = path.parse(name).name.replace(/^Copy of /, "");
  const item = { _key: key, _type: "mediaItem", title, alt: `${albumTitle}: ${title}`, hidden: /template/i.test(name), type: /\.mp4$/i.test(name) ? "video" : "image" };
  if (item.type === "image") item.image = await uploadImage(file);
  else {
    const poster = path.join(cache, `${key}.jpg`);
    const video = path.join(cache, `${key}.mp4`);
    console.log(`Preparing film: ${name}`);
    await run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-ss", "3", "-i", file, "-frames:v", "1", "-vf", "scale=1280:1280:force_original_aspect_ratio=decrease", poster], { timeout: 120000 });
    try { await fs.access(video); } catch {
      const partial = path.join(cache, `${key}.partial.mp4`);
      await run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", file, "-vf", "scale=1280:1280:force_original_aspect_ratio=decrease:force_divisible_by=2", "-c:v", "libx264", "-preset", "fast", "-crf", "25", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", partial], { timeout: 1200000 });
      await fs.rename(partial, video);
    }
    item.poster = await uploadImage(poster);
    const asset = await client.assets.upload("file", await fs.readFile(video), { filename: `${title}.mp4`, contentType: "video/mp4" });
    item.video = { _type: "file", asset: { _type: "reference", _ref: asset._id } };
  }
  await fs.writeFile(cachedFile, JSON.stringify(item));
  return item;
}
async function exists(type, slug) { return client.fetch('count(*[_type == $type && slug.current == $slug]) > 0', { type, slug }); }
async function itemsFor(folder, names, title) {
  const items = [];
  // Small batches limit memory and avoid flooding the asset API.
  for (let i = 0; i < names.length; i += 3) items.push(...await Promise.all(names.slice(i, i + 3).map(name => makeItem(folder, name, title))));
  return items;
}
for (const [order, system] of systems.entries()) {
  const folder = path.join(root, "4. Web & Digital Design", system.folder);
  const names = (await filesIn(folder)).sort((a,b) => Number(b === system.cover) - Number(a === system.cover));
  if (!apply) { console.log(`Project ${system.title}: ${names.length} screenshots`); continue; }
  if (await exists("project", system.slug)) { console.log(`Preserved existing project: ${system.slug}`); continue; }
  const media = await itemsFor(folder, names, system.title);
  await client.createIfNotExists({ _id: `portfolio-system-${system.slug}`, _type: "project", title: system.title, slug: { _type: "slug", current: system.slug }, category: "systems", shortDescription: system.description, fullDescription: [{ _type: "block", _key: "overview", style: "normal", markDefs: [], children: [{ _type: "span", _key: "text", text: system.description, marks: [] }] }], media, year: "Selected work", role: "Digital design & development", tools: system.tools, order, featured: order < 3, published: true, ...(system.externalUrl ? { externalUrl: system.externalUrl } : {}) });
  console.log(`Imported project: ${system.title} (${media.length} screens)`);
}
// Import photos and graphics first; films can take longer to prepare.
for (const [order, seed] of [...seeds].sort((a,b) => Number(a.category === "Video") - Number(b.category === "Video")).entries()) {
  const folderName = photoFolders[seed.slug] || graphicsFolders[seed.slug] || filmFolders[seed.slug];
  if (!folderName) continue;
  const group = seed.category === "Photography" ? "1. Photography" : seed.category === "Video" ? "2. Video" : "3. Graphics & PR";
  const folder = path.join(root, group, folderName);
  let names = await filesIn(folder);
  if (seed.category === "Photography") { names = names.filter(x => !/\.mp4$/i.test(x)); const count = Math.min(18, names.length); names = Array.from({ length: count }, (_,i) => names[Math.round(i * (names.length - 1) / Math.max(count - 1, 1))]); }
  if (!apply) { console.log(`Album ${seed.title}: ${names.length} selected files`); continue; }
  if (await exists("mediaAlbum", seed.slug)) { console.log(`Preserved existing album: ${seed.slug}`); continue; }
  const items = await itemsFor(folder, names, seed.title);
  const edit = curation[seed.slug];
  if (edit) {
    items.forEach((item, i) => { item.title = `Frame ${String(i + 1).padStart(2, "0")}`; item.alt = `${seed.title}, selected photograph ${i + 1}`; item.hidden = edit.hide.includes(i + 1); });
    const cover = items.splice(edit.cover - 1, 1)[0];
    cover.title = edit.coverTitle; cover.alt = edit.coverAlt; items.unshift(cover);
  }
  await client.createIfNotExists({ _id: `portfolio-album-${seed.slug}`, _type: "mediaAlbum", title: seed.title, slug: { _type: "slug", current: seed.slug }, category: seed.category, date: seed.date, description: seed.description, tags: seed.tags, order, published: true, items, portfolioCurationVersion: 1 });
  console.log(`Imported album: ${seed.title} (${items.length} items)`);
}
console.log(apply ? "Import complete. Existing documents and original files were preserved." : "Dry run complete. Add --apply to upload and create these documents.");
