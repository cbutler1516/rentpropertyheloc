"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { MotionCard } from "@/components/motion/motion-card";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { INVESTOR_USE_CASES } from "@/lib/home-content";

export function InvestorUseCasesSection() {
  return (
    <Section id="use-cases" muted divider>
      <Reveal>
        <SectionHeader
          eyebrow="Use cases"
          title="Where investors deploy line capacity"
          description="Common capital paths we see when revolving HELOCs are secured by rental collateral."
        />
      </Reveal>
      <StaggerReveal className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {INVESTOR_USE_CASES.map((item) => (
          <StaggerItem key={item.title}>
            <MotionCard>
              <Card className="h-full">
                <h3 className="text-lg font-semibold text-navy-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </Card>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Section>
  );
}
