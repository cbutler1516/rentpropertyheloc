"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { MotionCard } from "@/components/motion/motion-card";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { HOW_IT_WORKS } from "@/lib/home-content";

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" muted divider className="relative overflow-hidden">
      <AmbientBackground className="opacity-60" />
      <div className="relative">
        <Reveal>
          <SectionHeader
            eyebrow="Process"
            title="How it works"
            description="Three steps from portfolio snapshot to deployed capital—built for investors who need clarity before they commit."
          />
        </Reveal>
        <StaggerReveal className="grid gap-5 md:grid-cols-3 md:gap-6">
          {HOW_IT_WORKS.map((item) => (
            <StaggerItem key={item.step}>
              <MotionCard>
                <Card className="flex h-full flex-col">
                  <p className="text-sm font-bold tracking-wide text-accent">{item.step}</p>
                  <h3 className="mt-3 text-xl font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </Card>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
        <Reveal delay={0.15} className="mt-14 flex justify-center">
          <CtaLink href={PRIMARY_CTA_HREF} size="lg">
            {PRIMARY_CTA_LABEL}
          </CtaLink>
        </Reveal>
      </div>
    </Section>
  );
}
