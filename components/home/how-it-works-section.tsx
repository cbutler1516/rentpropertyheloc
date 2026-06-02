"use client";

import { HowItWorksBlock } from "@/components/marketing/how-it-works-block";
import { Section } from "@/components/layout/section";

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" divider className="section-light py-14 sm:py-20">
      <HowItWorksBlock />
    </Section>
  );
}
