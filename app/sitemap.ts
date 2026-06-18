import { MORTGAGE_PRODUCT_PATHS } from "@/lib/mortgage-products/content";
import { SEO_PAGE_PATHS } from "@/lib/seo/pages";
import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

/** Funnel-first static routes included in sitemap */
const STATIC_PATHS = [
  "/",
  "/check-options",
  "/scenarios",
  "/faq",
  "/privacy-policy",
  "/terms-of-use",
  "/licensing-information",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [...STATIC_PATHS, ...MORTGAGE_PRODUCT_PATHS, ...SEO_PAGE_PATHS];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/check-options") ? 0.9 : path.endsWith("-heloc") ? 0.75 : 0.7,
  }));
}
