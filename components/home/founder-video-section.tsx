"use client";

import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FloatingGlow } from "@/components/motion/floating-glow";
import { Reveal } from "@/components/motion/reveal";
import { VideoPlayer } from "@/components/video/video-player";
import { CtaLink } from "@/components/ui/cta-link";
import { COMPLIANCE_SHORT, PRIMARY_CTA_HREF, PRIMARY_CTA_SHORT } from "@/lib/cta";
const FOUNDER_VIDEO = "/videos/founder-talking-head.mp4";

export function FounderVideoSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <FloatingGlow className="left-[-5%] top-1/4 h-80 w-80 opacity-70" color="green" />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
              Straight talk
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How rental HELOCs fit an investor portfolio
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              A clear walkthrough of when revolving equity may make sense, what approval looks
              like, and how to think about timing—without the rate-shopping noise.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Programs may be available on qualifying rentals. Structure, line size, and funding
              speed are subject to approval and documentation completeness.
            </p>
            <div className="mt-8">
              <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="w-full sm:w-auto">
                {PRIMARY_CTA_SHORT}
              </CtaLink>
            </div>
            <ComplianceNote className="mt-6 max-w-md">{COMPLIANCE_SHORT}</ComplianceNote>
          </Reveal>

          <Reveal delay={0.1} y={36} className="order-1 lg:order-2">
            <VideoPlayer src={FOUNDER_VIDEO} label="Founder overview" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
