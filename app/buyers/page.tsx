import { MarketingLandingPage } from "@/components/marketing/marketing-landing-page";
import { BUYERS_PAGE } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: BUYERS_PAGE.seo.title,
  description: BUYERS_PAGE.seo.description,
  keywords: [...SEO_KEYWORDS, "homebuyer financing strategy"],
  alternates: { canonical: `${SITE_URL}${BUYERS_PAGE.path}` },
};

export default function BuyersPage() {
  return <MarketingLandingPage config={BUYERS_PAGE} />;
}
