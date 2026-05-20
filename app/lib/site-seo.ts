import type { Metadata } from "next";

export const SITE_URL = "https://theloanplaybook.com";
export const SITE_NAME = "The Loan Playbook";
export const DEFAULT_OG_IMAGE = "/loan-playbook-social-preview.svg";

export function isSiteIndexable() {
  return process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
}

export function siteRobots(): Metadata["robots"] {
  if (!isSiteIndexable()) {
    return {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  };
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogType = "website",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: ogType,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : siteRobots(),
  };
}
