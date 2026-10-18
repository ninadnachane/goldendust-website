import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.goldendustsafaris.com",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap({ filter: (p) => !/\/(admin|planner)(\.html)?$/.test(p) })],
});
