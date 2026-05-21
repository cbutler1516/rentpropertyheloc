import { SITE_NAME, SITE_URL } from "./site-seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/loan-playbook-icon.png`,
    description:
      "Education-first mortgage strategy for buyers, homeowners, agents, and investors.",
    sameAs: [
      "https://www.tiktok.com/@theloanplaybook",
      "https://www.instagram.com/theloanplaybook/",
      "https://www.facebook.com/theloanplaybook/",
      "https://www.youtube.com/@TheLoanPlaybook",
      "https://www.linkedin.com/company/the-loan-playbook/",
    ],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Mortgage strategy videos, guides, and market context—licensed in multiple states.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function videoObjectSchema(input: {
  name: string;
  description: string;
  slug: string;
  uploadDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    contentUrl: `${SITE_URL}/videos/hero/${input.slug}.mp4`,
    embedUrl: `${SITE_URL}/videos/${input.slug}`,
    url: `${SITE_URL}/videos/${input.slug}`,
    uploadDate: input.uploadDate ?? "2025-01-01",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
