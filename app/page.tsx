import { CinematicHero } from "@/components/home/cinematic-hero";
import { HomeExplainerVideoSection } from "@/components/home/home-explainer-video-section";
import { HomeScenariosSection } from "@/components/home/home-scenarios-section";
import { FaqSection } from "@/components/home/faq-section";
import { BorrowerTrustSection } from "@/components/trust/borrower-trust-section";
import { CompanyTrustSection } from "@/components/trust/company-trust-section";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <BorrowerTrustSection variant="hero" />
      <CompanyTrustSection />
      <HomeExplainerVideoSection />
      <HomeScenariosSection />
      <FaqSection />
    </>
  );
}
