import type { SeoFaqItem, SeoPageConfig } from "@/lib/seo/types";
import { BRAND_ASSETS } from "@/lib/brand";
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

function buildAreaServed(config: SeoPageConfig) {
  if (config.service.areaServed) {
    return {
      "@type": "State",
      name: config.service.areaServed,
      containedInPlace: { "@type": "Country", name: "United States" },
    };
  }
  return { "@type": "Country", name: "United States" };
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
    areaServed: buildAreaServed(config),
    serviceType: config.service.serviceType ?? "Home equity line of credit review",
    url: `${SITE_URL}${config.path}`,
  };
}

export function buildArticleSchema(config: SeoPageConfig): JsonLdGraph {
  const url = `${SITE_URL}${config.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.hero.h1,
    description: config.metadata.description,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${BRAND_ASSETS.light}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}

export function buildSeoPageJsonLd(config: SeoPageConfig): JsonLdGraph[] {
  return [
    buildBreadcrumbSchema(config),
    buildArticleSchema(config),
    buildServiceSchema(config),
    buildFaqSchema(config.faqs),
  ];
}
