import type { SeoFaqItem, SeoPageConfig } from "@/lib/seo/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export type JsonLdGraph = Record<string, unknown>;

export function buildBreadcrumbSchema(config: SeoPageConfig): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.hero.h1,
        item: `${SITE_URL}${config.path}`,
      },
    ],
  };
}

export function buildFaqSchema(faqs: SeoFaqItem[]): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceSchema(config: SeoPageConfig): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.service.name,
    description: config.service.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Rental property equity review",
    url: `${SITE_URL}${config.path}`,
  };
}

export function buildSeoPageJsonLd(config: SeoPageConfig): JsonLdGraph[] {
  return [
    buildBreadcrumbSchema(config),
    buildServiceSchema(config),
    buildFaqSchema(config.faqs),
  ];
}
