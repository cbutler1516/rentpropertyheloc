import { MarketingLandingPage } from "@/components/marketing/marketing-landing-page";
import { COMMERCIAL_PAGE } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: COMMERCIAL_PAGE.seo.title,
  description: COMMERCIAL_PAGE.seo.description,
  keywords: [...SEO_KEYWORDS, "commercial mortgage strategy"],
  alternates: { canonical: `${SITE_URL}${COMMERCIAL_PAGE.path}` },
};

export default function CommercialPage() {
  return <MarketingLandingPage config={COMMERCIAL_PAGE} />;
}
