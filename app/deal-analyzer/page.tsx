import { MarketingLandingPage } from "@/components/marketing/marketing-landing-page";
import { DEAL_ANALYZER_PAGE } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: DEAL_ANALYZER_PAGE.seo.title,
  description: DEAL_ANALYZER_PAGE.seo.description,
  keywords: [...SEO_KEYWORDS, "mortgage deal analyzer"],
  alternates: { canonical: `${SITE_URL}${DEAL_ANALYZER_PAGE.path}` },
};

export default function DealAnalyzerPage() {
  return <MarketingLandingPage config={DEAL_ANALYZER_PAGE} />;
}
