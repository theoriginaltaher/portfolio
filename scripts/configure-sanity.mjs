import { readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const projectName = process.argv[2] || "Taher Hussain Portfolio";
const sanityConfigPath = path.join(os.homedir(), ".config", "sanity", "config.json");
const localEnvPath = path.resolve(".env.local");

const sanityConfig = JSON.parse(await readFile(sanityConfigPath, "utf8"));
if (!sanityConfig.authToken) {
  throw new Error("Sanity CLI is not authenticated. Run `npx sanity login` first.");
}

const headers = {
  Authorization: `Bearer ${sanityConfig.authToken}`,
  "Content-Type": "application/json",
};

const projectsResponse = await fetch("https://api.sanity.io/v2021-06-07/projects", { headers });
if (!projectsResponse.ok) {
  throw new Error(`Unable to list Sanity projects (${projectsResponse.status}).`);
}

const projects = await projectsResponse.json();
const project = projects.find((candidate) => candidate.displayName === projectName);
if (!project) {
  throw new Error(`Sanity project \"${projectName}\" was not found.`);
}

const tokenResponse = await fetch(`https://api.sanity.io/v2021-06-07/projects/${project.id}/tokens`, {
  method: "POST",
  headers,
  body: JSON.stringify({ label: "Portfolio production", roleName: "editor" }),
});
if (!tokenResponse.ok) {
  throw new Error(`Unable to create the Sanity project token (${tokenResponse.status}).`);
}

const token = await tokenResponse.json();
if (!token.key) {
  throw new Error("Sanity created the token but did not return its key.");
}

let envFile = await readFile(localEnvPath, "utf8");
const values = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: project.id,
  NEXT_PUBLIC_SANITY_DATASET: "production",
  SANITY_API_TOKEN: token.key,
};

for (const [name, value] of Object.entries(values)) {
  const line = `${name}=${value}`;
  const pattern = new RegExp(`^${name}=.*$`, "m");
  envFile = pattern.test(envFile) ? envFile.replace(pattern, line) : `${envFile.trimEnd()}\n${line}\n`;
}

await writeFile(localEnvPath, envFile, { encoding: "utf8", mode: 0o600 });
console.log(`Configured Sanity project ${project.id} with dataset production.`);
console.log("The editor token was stored in .env.local and was not printed.");
