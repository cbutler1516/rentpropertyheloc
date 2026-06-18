import type { SeoPageConfig } from "@/lib/seo/types";
import { MARKETING_SITE_NAME } from "@/lib/legal/compliance";
import { getDefaultOpenGraphImages, getDefaultTwitterImages } from "@/lib/og";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

function formatPageTitle(config: SeoPageConfig): string {
  const base = config.metadata.title;
  if (base.includes(MARKETING_SITE_NAME)) return base;
  return `${base} | ${MARKETING_SITE_NAME}`;
}

export function buildSeoMetadata(config: SeoPageConfig): Metadata {
  const canonical = `${SITE_URL}${config.path}`;
  const title = formatPageTitle(config);
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
      siteName: MARKETING_SITE_NAME,
      type: "article",
      images: getDefaultOpenGraphImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: getDefaultTwitterImages(),
    },
  };
}
