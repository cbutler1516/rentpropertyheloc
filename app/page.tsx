import { CinematicHero } from "@/components/home/cinematic-hero";
import { CinematicVideoCards } from "@/components/home/cinematic-video-cards";
import { CtaBand } from "@/components/home/cta-band";
import { EquityDashboardSection } from "@/components/home/equity-dashboard";
import { FaqSection } from "@/components/home/faq-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { InvestorUseCasesSection } from "@/components/home/investor-use-cases-section";
import { LeadFormSection } from "@/components/home/lead-form-section";
import { MetricsRow } from "@/components/home/metrics-row";
import { OverviewExplainerSection } from "@/components/home/overview-explainer-section";
import { ProgramHighlightsSection } from "@/components/home/program-highlights-section";
import { SocialProofSection } from "@/components/home/social-proof-section";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <OverviewExplainerSection />
      <MetricsRow />
      <EquityDashboardSection />
      <CinematicVideoCards />
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
