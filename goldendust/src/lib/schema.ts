import { site, img } from "./site";

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${site.url}/#org`,
  name: site.name,
  url: site.url,
  logo: img(site.logo, 400),
  image: img("7df076_f9426230a0e84400a48f65dcfbca9bc0~mv2.png", 1200),
  description:
    "TALA-registered Tanzania safari operator based in Arusha, with two local guides who plan and lead every trip.",
  telephone: "+" + site.whatsapp,
  address: { "@type": "PostalAddress", addressLocality: "Arusha", addressCountry: "TZ" },
  areaServed: "Tanzania",
  sameAs: [site.instagram, site.tripadvisorUrl].filter(Boolean),
};

export const breadcrumbs = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: site.url + path,
  })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
