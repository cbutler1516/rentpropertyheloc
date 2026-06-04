"use client";

import { InvestorScenariosBlock } from "@/components/marketing/investor-scenarios-block";
import { Section } from "@/components/layout/section";

export function HomeScenariosSection() {
  return (
    <Section id="scenarios" divider muted className="bg-surface-50 py-12 sm:py-14 md:py-16 lg:py-20">
      <InvestorScenariosBlock showViewAll={false} />
    </Section>
  );
}
