"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { LoopVideoCard } from "@/components/video/loop-video-card";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { VIDEO_CARDS } from "@/lib/videos";

export function CinematicVideoCards() {
  return (
    <Section id="visuals" divider className="relative overflow-hidden">
      <Reveal>
        <SectionHeader
          eyebrow="In motion"
          title="Rental equity, in context"
          description="Short visual loops that support the process—investor-focused, compliant, and easy to scan."
        />
      </Reveal>
      <StaggerReveal className="grid gap-5 md:grid-cols-3 md:gap-6">
        {VIDEO_CARDS.map((card) => (
          <StaggerItem key={card.key}>
            <LoopVideoCard src={card.src} title={card.title} description={card.description} />
          </StaggerItem>
        ))}
      </StaggerReveal>
      <Reveal delay={0.12} className="mt-12 flex justify-center">
        <CtaLink href={PRIMARY_CTA_HREF} size="lg">
          {PRIMARY_CTA_LABEL}
        </CtaLink>
      </Reveal>
    </Section>
  );
}
