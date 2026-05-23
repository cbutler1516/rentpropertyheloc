"use client";

import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FloatingGlow } from "@/components/motion/floating-glow";
import { Reveal } from "@/components/motion/reveal";
import { VideoPlayer } from "@/components/video/video-player";
import { CtaLink } from "@/components/ui/cta-link";
import {
  COMPLIANCE_SHORT,
  COMPLIANCE_TIMING,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  PRIMARY_CTA_SHORT,
} from "@/lib/cta";
import { SITE_VIDEOS } from "@/lib/videos";

export function OverviewExplainerSection() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden border-y border-white/10 py-20 sm:py-28"
    >
      <FloatingGlow className="right-[-8%] top-1/3 h-72 w-72 opacity-60" color="cyan" />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
              Watch the 60-second overview
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              See how rental HELOC options may fit your portfolio
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              A direct overview of revolving equity on rental collateral—when it may be available,
              what approval involves, and how funding in as little as 7 days may be possible when
              your file is complete.
            </p>
            <p className="mt-4 text-sm text-white/55">
              Not a commitment to lend. All programs subject to approval and lender guidelines.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="w-full sm:w-auto">
                {PRIMARY_CTA_SHORT}
              </CtaLink>
              <CtaLink
                href={PRIMARY_CTA_HREF}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {PRIMARY_CTA_LABEL}
              </CtaLink>
            </div>
            <ComplianceNote className="mt-6 max-w-lg">
              {COMPLIANCE_SHORT} {COMPLIANCE_TIMING}
            </ComplianceNote>
          </Reveal>

          <Reveal delay={0.1} y={32} className="order-1 lg:order-2">
            <VideoPlayer
              src={SITE_VIDEOS.explainer}
              label="60-second overview"
              withAudio
              controls
              className="shadow-[0_0_80px_rgba(34,211,238,0.2)]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
