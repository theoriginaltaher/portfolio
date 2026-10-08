import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  // A shared thread avoids child-process startup timeouts on the synced Windows workspace.
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.tsx"], globals: true, pool: "threads", maxWorkers: 1 },
});
