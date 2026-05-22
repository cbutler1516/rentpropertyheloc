import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { InvestorUseCasesSection } from "@/components/home/investor-use-cases-section";
import { LeadFormSection } from "@/components/home/lead-form-section";
import { ProgramHighlightsSection } from "@/components/home/program-highlights-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <ProgramHighlightsSection />
      <InvestorUseCasesSection />
      <FaqSection />
      <LeadFormSection />
    </>
  );
}
