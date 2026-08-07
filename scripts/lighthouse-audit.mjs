import { mkdir, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const baseUrl = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

if (!baseUrl) {
  console.error("Usage: npm run audit:lighthouse -- https://example.com");
  process.exit(1);
}

const routes = [
  ["home", "/"],
  ["projects", "/projects"],
  ["about", "/about"],
  ["blog", "/blog"],
  ["contact", "/contact"],
];

const outputDirectory = path.resolve("reports", "lighthouse", "latest");
await mkdir(outputDirectory, { recursive: true });

function runLighthouse(url, outputPath) {
  const lighthouseArgs = [
    "--yes",
    "lighthouse@12.8.2",
    url,
    "--output=json",
    `--output-path=${outputPath}`,
    "--preset=desktop",
    "--only-categories=performance,accessibility",
    "--quiet",
    "--chrome-flags=--headless --no-sandbox --disable-gpu",
  ];

  const executable = process.platform === "win32" ? process.execPath : "npx";
  const args = process.platform === "win32"
    ? [path.join(path.dirname(process.execPath), "node_modules", "npm", "bin", "npx-cli.js"), ...lighthouseArgs]
    : lighthouseArgs;

  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, { env: process.env, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`Lighthouse exited with code ${code}`)));
  });
}

const results = [];

for (const [name, route] of routes) {
  const url = new URL(route, `${baseUrl}/`).toString();
  const outputPath = path.join(outputDirectory, `${name}.json`);
  console.log(`Auditing ${url}`);
  await runLighthouse(url, outputPath);
  const report = JSON.parse(await readFile(outputPath, "utf8"));
  const performance = Math.round(report.categories.performance.score * 100);
  const accessibility = Math.round(report.categories.accessibility.score * 100);
  results.push({ name, route, performance, accessibility });
}

console.table(results);

const failures = results.filter(({ performance, accessibility }) => performance < 85 || accessibility < 90);
if (failures.length) {
  console.error("Lighthouse thresholds failed.");
  process.exit(1);
}

console.log("All pages meet performance >= 85 and accessibility >= 90.");
