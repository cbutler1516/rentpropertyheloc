import type { MetadataRoute } from "next";
import { buildSitemapEntries } from "./lib/sitemap-inventory";

/** Pre-render sitemap at build time with full URL inventory. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
