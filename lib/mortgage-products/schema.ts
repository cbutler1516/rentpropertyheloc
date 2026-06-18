import { buildFaqSchema } from "@/lib/seo/schema";
import type { MortgageProductConfig } from "@/lib/mortgage-products/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

function buildProductBreadcrumbSchema(config: MortgageProductConfig) {
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
        name: "Mortgage Resources",
        item: `${SITE_URL}/mortgage-resources`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.hero.h1,
        item: `${SITE_URL}${config.path}`,
      },
    ],
  };
}

export function buildMortgageProductServiceSchema(config: MortgageProductConfig) {
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
    serviceType: "Mortgage financing strategy",
    url: `${SITE_URL}${config.path}`,
  };
}

export function buildMortgageProductJsonLd(config: MortgageProductConfig) {
  return [
    buildProductBreadcrumbSchema(config),
    buildMortgageProductServiceSchema(config),
    buildFaqSchema(config.faqs),
  ];
}
