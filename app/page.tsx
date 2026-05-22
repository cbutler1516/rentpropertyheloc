import { CinematicHero } from "@/components/home/cinematic-hero";
import { CtaBand } from "@/components/home/cta-band";
import { EquityDashboardSection } from "@/components/home/equity-dashboard";
import { FaqSection } from "@/components/home/faq-section";
import { FounderVideoSection } from "@/components/home/founder-video-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { InvestorUseCasesSection } from "@/components/home/investor-use-cases-section";
import { LeadFormSection } from "@/components/home/lead-form-section";
import { MetricsRow } from "@/components/home/metrics-row";
import { ProgramHighlightsSection } from "@/components/home/program-highlights-section";
import { SocialProofSection } from "@/components/home/social-proof-section";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <MetricsRow />
      <FounderVideoSection />
      <EquityDashboardSection />
      <HowItWorksSection />
      <ProgramHighlightsSection />
      <InvestorUseCasesSection />
      <SocialProofSection />
      <CtaBand />
      <FaqSection />
      <LeadFormSection />
    </>
  );
}
