import { MarketingLandingPage } from "@/components/marketing/marketing-landing-page";
import { PARTNERS_PAGE } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: PARTNERS_PAGE.seo.title,
  description: PARTNERS_PAGE.seo.description,
  keywords: [...SEO_KEYWORDS, "agent mortgage partnerships"],
  alternates: { canonical: `${SITE_URL}${PARTNERS_PAGE.path}` },
};

export default function PartnersPage() {
  return <MarketingLandingPage config={PARTNERS_PAGE} />;
}
