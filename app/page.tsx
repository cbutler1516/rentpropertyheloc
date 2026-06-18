import { CinematicHero } from "@/components/home/cinematic-hero";
import { BuiltForPartnersSection } from "@/components/home/built-for-partners-section";
import { DealAnalyzerFeaturedSection } from "@/components/home/deal-analyzer-featured-section";
import { FaqSection } from "@/components/home/faq-section";
import { LearnFromChrisSection } from "@/components/home/learn-from-chris-section";
import { MortgageSolutionsSection } from "@/components/home/mortgage-solutions-section";
import { PlaybookApproachSection } from "@/components/home/playbook-approach-section";
import { WhatWeDoSection } from "@/components/home/what-we-do-section";
import { BorrowerTrustSection } from "@/components/trust/borrower-trust-section";
import { PLAYBOOK_HERO, SEO_KEYWORDS } from "@/lib/playbook-content";
import { getDefaultOpenGraphImages } from "@/lib/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Modern Mortgage Company & Strategy Platform`,
  description: PLAYBOOK_HERO.subheadline,
  keywords: [...SEO_KEYWORDS],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: PLAYBOOK_HERO.headline,
    description: PLAYBOOK_HERO.subheadline,
    url: SITE_URL,
    images: getDefaultOpenGraphImages(),
  },
};

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <WhatWeDoSection />
      <MortgageSolutionsSection />
      <PlaybookApproachSection />
      <DealAnalyzerFeaturedSection />
      <BuiltForPartnersSection />
      <LearnFromChrisSection />
      <BorrowerTrustSection variant="hero" />
      <FaqSection />
    </>
  );
}
