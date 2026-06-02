"use client";

import { FundingTimelineBlock } from "@/components/marketing/funding-timeline-block";
import { Section } from "@/components/layout/section";

export function FundingTimelineSection() {
  return (
    <Section divider className="section-mist py-14 sm:py-20">
      <FundingTimelineBlock />
    </Section>
  );
}
