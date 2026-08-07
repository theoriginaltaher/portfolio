import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";

const mode = process.argv[2];
const baseUrl = (process.argv[3] || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const statePath = path.resolve("reports", "isr-state.json");

if (!mode || !baseUrl) {
  console.error("Usage: node --env-file=.env.local scripts/verify-isr.mjs <mark|check-marked|restore|check-restored> <base-url>");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function readState() {
  return JSON.parse(await readFile(statePath, "utf8"));
}

async function fetchHomepage() {
  const response = await fetch(`${baseUrl}/?isr_check=${Date.now()}`, {
    headers: { "Cache-Control": "no-cache" },
  });
  if (!response.ok) throw new Error(`Homepage returned ${response.status}.`);
  return response.text();
}

if (mode === "mark") {
  const original = await client.fetch('*[_id == "siteSettings"][0].role');
  if (!original) throw new Error("siteSettings.role is missing.");
  const marker = `ISR-CHECK-${Date.now()}`;
  await client.patch("siteSettings").set({ role: `${original} · ${marker}` }).commit();
  await mkdir(path.dirname(statePath), { recursive: true });
  await writeFile(statePath, JSON.stringify({ original, marker, markedAt: new Date().toISOString() }, null, 2));
  console.log(`Published temporary marker ${marker}.`);
} else if (mode === "check-marked") {
  const state = await readState();
  const html = await fetchHomepage();
  const visible = html.includes(state.marker);
  console.log(`ISR marker visible: ${visible}`);
  process.exit(visible ? 0 : 2);
} else if (mode === "restore") {
  const state = await readState();
  await client.patch("siteSettings").set({ role: state.original }).commit();
  await writeFile(statePath, JSON.stringify({ ...state, restoredAt: new Date().toISOString() }, null, 2));
  console.log("Restored the original Sanity role value.");
} else if (mode === "check-restored") {
  const state = await readState();
  const html = await fetchHomepage();
  const restored = html.includes(state.original) && !html.includes(state.marker);
  console.log(`Original value restored in production: ${restored}`);
  process.exit(restored ? 0 : 2);
} else {
  throw new Error(`Unknown mode: ${mode}`);
}
