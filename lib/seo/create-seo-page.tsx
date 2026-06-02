import { SeoLandingPage } from "@/components/seo/seo-landing-page";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { SEO_PAGES, type SeoPagePath } from "@/lib/seo/pages";
import type { Metadata } from "next";

export function createSeoPage(path: SeoPagePath) {
  const config = SEO_PAGES[path];

  function Page() {
    return <SeoLandingPage config={config} />;
  }

  const metadata: Metadata = buildSeoMetadata(config);

  return { Page, metadata, config };
}
