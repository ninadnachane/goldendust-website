import { site, img } from "./site";

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${site.url}/#org`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  identifier: [
    { "@type": "PropertyValue", propertyID: "Tanzania tourism licence (TALA), Ministry of Natural Resources and Tourism", value: site.talaNo },
    { "@type": "PropertyValue", propertyID: "BRELA company registration number", value: site.companyNo },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Tourism Agent licence, Tour Operator",
    credentialCategory: "license",
    identifier: site.talaNo,
    expires: site.talaExpiry,
    recognizedBy: { "@type": "GovernmentOrganization", name: "Ministry of Natural Resources and Tourism, United Republic of Tanzania" },
  },
  logo: img(site.logo, 400),
  image: img("7df076_f9426230a0e84400a48f65dcfbca9bc0~mv2.png", 1200),
  description:
    "TALA-registered Tanzania safari operator based in Arusha, with two local guides who plan and lead every trip.",
  telephone: "+" + site.whatsapp,
  address: { "@type": "PostalAddress", postOfficeBoxNumber: site.poBox, addressLocality: site.city, addressCountry: site.country },
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
