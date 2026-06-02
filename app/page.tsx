import { CinematicHero } from "@/components/home/cinematic-hero";
import { CtaBand } from "@/components/home/cta-band";
import { FaqSection } from "@/components/home/faq-section";
import { FundingTimelineSection } from "@/components/home/funding-timeline-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { InvestorEducationSection } from "@/components/home/investor-education-section";
import { InvestorUseCasesSection } from "@/components/home/investor-use-cases-section";
import { WhyInvestorsChooseSection } from "@/components/home/why-investors-choose-section";
import { AboutPlatformSection } from "@/components/trust/about-platform-section";
import { AdvisorCredibilitySection } from "@/components/trust/advisor-credibility-section";
import { BorrowerTrustSection } from "@/components/trust/borrower-trust-section";
import { PlatformComparisonTable } from "@/components/trust/platform-comparison-table";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <BorrowerTrustSection variant="hero" />
      <HowItWorksSection />
      <AdvisorCredibilitySection />
      <AboutPlatformSection />
      <WhyInvestorsChooseSection />
      <PlatformComparisonTable />
      <InvestorUseCasesSection />
      <FundingTimelineSection />
      <InvestorEducationSection />
      <CtaBand />
      <FaqSection />
    </>
  );
}
