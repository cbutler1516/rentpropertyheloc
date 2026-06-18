import { MarketingLandingPage } from "@/components/marketing/marketing-landing-page";
import { INVESTORS_PAGE } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: INVESTORS_PAGE.seo.title,
  description: INVESTORS_PAGE.seo.description,
  keywords: [...SEO_KEYWORDS, "investor DSCR loans"],
  alternates: { canonical: `${SITE_URL}${INVESTORS_PAGE.path}` },
};

export default function InvestorsPage() {
  return <MarketingLandingPage config={INVESTORS_PAGE} />;
}
