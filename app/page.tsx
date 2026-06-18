import { CinematicHero } from "@/components/home/cinematic-hero";
import { CtaBand } from "@/components/home/cta-band";
import { FaqSection } from "@/components/home/faq-section";
import { HomeExplainerVideoSection } from "@/components/home/home-explainer-video-section";
import { InvestorUseCasesSection } from "@/components/home/investor-use-cases-section";
import { BorrowerTrustSection } from "@/components/trust/borrower-trust-section";
import { CompanyTrustSection } from "@/components/trust/company-trust-section";
import { HERO_HEADLINE, HERO_SUPPORTING_COPY } from "@/lib/brand-positioning";
import { BRAND, BRAND_ASSETS, LOGO_LIGHT_ASPECT } from "@/lib/brand";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Rental & Owner-Occupied HELOC Review`,
  description: HERO_SUPPORTING_COPY,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: HERO_HEADLINE,
    description: HERO_SUPPORTING_COPY,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: BRAND_ASSETS.light,
        width: LOGO_LIGHT_ASPECT.width,
        height: LOGO_LIGHT_ASPECT.height,
        alt: BRAND.name,
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <BorrowerTrustSection variant="hero" />
      <CompanyTrustSection />
      <HomeExplainerVideoSection />
      <InvestorUseCasesSection />
      <CtaBand />
      <FaqSection />
    </>
  );
}
