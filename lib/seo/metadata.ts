import type { SeoPageConfig } from "@/lib/seo/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export function buildSeoMetadata(config: SeoPageConfig): Metadata {
  const canonical = `${SITE_URL}${config.path}`;
  const title = config.metadata.title;
  const description = config.metadata.description;
  const ogTitle = config.metadata.ogTitle ?? title;
  const ogDescription = config.metadata.ogDescription ?? description;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
    },
  };
}
