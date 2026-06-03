import { CinematicHero } from "@/components/home/cinematic-hero";
import { HomeExplainerVideoSection } from "@/components/home/home-explainer-video-section";
import { HomeInvestorTrustSection } from "@/components/home/home-investor-trust-section";
import { FaqSection } from "@/components/home/faq-section";
import { BorrowerTrustSection } from "@/components/trust/borrower-trust-section";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <BorrowerTrustSection variant="hero" />
      <HomeInvestorTrustSection />
      <HomeExplainerVideoSection />
      <FaqSection />
    </>
  );
}
