"use client";

import { InvestorEquityStrategiesBlock } from "@/components/marketing/investor-equity-strategies-block";
import { Section } from "@/components/layout/section";

export function HomeScenariosSection() {
  return (
    <Section
      id="scenarios"
      divider
      muted
      className="bg-surface-50 py-8 sm:py-10 md:py-12"
    >
      <InvestorEquityStrategiesBlock />
    </Section>
  );
}
