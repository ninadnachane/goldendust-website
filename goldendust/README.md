# Golden Dust Safaris website

Static site built with [Astro](https://astro.build). Hosted on Cloudflare Pages, domain at GoDaddy.

## Where things live

| What | File |
| --- | --- |
| Tours (itineraries, prices, SEO text) | `src/data/tours.wix.json` (content) and `src/data/tours.ts` (titles, descriptions, routes) |
| Blog posts | `src/content/blog/*.md`, one file per post |
| Homepage | `src/pages/index.astro` |
| WhatsApp number, Instagram, logo | `src/lib/site.ts` |
| Colors and fonts | `src/styles/global.css` |
| Old-URL redirects | `public/_redirects` |

## Commands

```
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # builds to dist/ (also copies images from Wix into public/images)
```

## Deploy (Cloudflare Pages)

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` redeploys the site.
