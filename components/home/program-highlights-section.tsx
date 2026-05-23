"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { ProgramIcon } from "@/components/icons/program-icons";
import { MotionCard } from "@/components/motion/motion-card";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { SectionLeadCta } from "@/components/ui/section-lead-cta";
import { PROGRAM_HIGHLIGHTS } from "@/lib/home-content";

export function ProgramHighlightsSection() {
  return (
    <Section id="program" divider>
      <Reveal>
        <SectionHeader
          eyebrow="Program"
          title="Built for scaling rental portfolios"
          description="Liquidity, leverage, and growth—without the traditional mortgage funnel. Programs may be available, subject to approval."
        />
      </Reveal>
      <StaggerReveal className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {PROGRAM_HIGHLIGHTS.map((item) => (
          <StaggerItem key={item.title}>
            <MotionCard>
              <Card className="flex gap-4 sm:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-accent-bright">
                  <ProgramIcon name={item.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </Card>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerReveal>
      <Reveal delay={0.12}>
        <SectionLeadCta className="mt-12" />
      </Reveal>
    </Section>
  );
}
