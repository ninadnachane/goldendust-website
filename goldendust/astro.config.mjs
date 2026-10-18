import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.goldendustsafaris.com",
  trailingSlash: "never",
  build: { format: "file" },
  // keep scripts in separate files so the admin pages can use a strict Content-Security-Policy
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [sitemap({ filter: (p) => !/\/(admin|planner)(\.html)?$/.test(p) })],
});
