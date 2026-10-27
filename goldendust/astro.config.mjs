import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.goldendustsafaris.com",
  trailingSlash: "never",
  build: { format: "file" },
  // keep scripts in separate files so the admin pages can use a strict Content-Security-Policy
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [
    sitemap({
      // the planner, the printable itinerary and the admin pages stay out of Google (in every language)
      filter: (p) => !/^\/(?:(?:nl|de|fr)\/)?(admin|planner|itinerary)(\/|\.html|$)/.test(new URL(p).pathname),
      // English at the root, the other languages under /nl, /de and /fr (adds hreflang links)
      i18n: { defaultLocale: "en", locales: { en: "en", nl: "nl", de: "de", fr: "fr" } },
    }),
  ],
});
