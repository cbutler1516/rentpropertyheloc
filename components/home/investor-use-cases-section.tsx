"use client";

import { InvestorUseCasesBlock } from "@/components/marketing/investor-use-cases-block";
import { Section } from "@/components/layout/section";
import { LazyBackgroundVideo } from "@/components/video/lazy-background-video";
import { SITE_VIDEOS } from "@/lib/videos";

export function InvestorUseCasesSection() {
  return (
    <Section id="use-cases" divider className="relative overflow-hidden bg-surface-50 py-14 sm:py-20">
      <LazyBackgroundVideo src={SITE_VIDEOS.portfolioAmbient} />
      <div className="pointer-events-none absolute inset-0 bg-surface-50/92" aria-hidden />
      <div className="relative">
        <InvestorUseCasesBlock showFooterLink />
      </div>
    </Section>
  );
}
