import { Container } from "@/components/layout/container";
import { FundingTimelineBlock } from "@/components/marketing/funding-timeline-block";
import { HowItWorksBlock } from "@/components/marketing/how-it-works-block";
import { InvestorScenariosBlock } from "@/components/marketing/investor-scenarios-block";
import { InvestorUseCasesBlock } from "@/components/marketing/investor-use-cases-block";

/** Shared marketing blocks for SEO landing pages — compact, mobile-friendly. */
export function SeoMarketingSections() {
  return (
    <>
      <section className="section-light border-t border-slate-100 py-10 sm:py-14" aria-labelledby="seo-how-it-works">
        <Container className="max-w-5xl">
          <HowItWorksBlock compact showCta={false} id="seo-how-it-works" />
        </Container>
      </section>

      <section className="section-light border-t border-slate-100 py-10 sm:py-14" aria-labelledby="seo-use-cases">
        <Container className="max-w-5xl">
          <InvestorUseCasesBlock compact />
        </Container>
      </section>

      <section className="section-light border-t border-slate-100 py-10 sm:py-14" aria-labelledby="seo-scenarios">
        <Container className="max-w-5xl">
          <InvestorScenariosBlock compact showViewAll={false} />
        </Container>
      </section>

      <section className="section-light border-t border-slate-100 py-10 sm:py-14" aria-labelledby="seo-timeline">
        <Container className="max-w-3xl">
          <FundingTimelineBlock compact />
        </Container>
      </section>
    </>
  );
}
