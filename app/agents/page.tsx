import { MarketingLandingPage } from "@/components/marketing/marketing-landing-page";
import { AGENTS_PAGE } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: AGENTS_PAGE.seo.title,
  description: AGENTS_PAGE.seo.description,
  keywords: [...SEO_KEYWORDS, "agent mortgage partnership tools"],
  alternates: { canonical: `${SITE_URL}${AGENTS_PAGE.path}` },
};

export default function AgentsPage() {
  return <MarketingLandingPage config={AGENTS_PAGE} />;
}
