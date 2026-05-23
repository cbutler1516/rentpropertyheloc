"use client";

import { HeroPreviewDashboard } from "@/components/home/hero-preview-dashboard";
import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FloatingGlow } from "@/components/motion/floating-glow";
import { Reveal } from "@/components/motion/reveal";
import { BackgroundVideo } from "@/components/video/background-video";
import { Badge } from "@/components/ui/badge";
import { CtaLink } from "@/components/ui/cta-link";
import {
  COMPLIANCE_SHORT,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_LABEL,
} from "@/lib/cta";
import { SITE_TAGLINE } from "@/lib/site";
import { SITE_VIDEOS } from "@/lib/videos";

export function CinematicHero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden sm:min-h-[88vh]">
      <BackgroundVideo
        src={SITE_VIDEOS.heroBackground}
        priority
        overlayClassName="from-navy-950/75 via-navy-950/88 to-navy-950"
      />
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
      <FloatingGlow className="left-[8%] top-[18%] h-64 w-64" color="cyan" />
      <FloatingGlow className="right-[10%] top-[35%] h-72 w-72" color="green" />

      <Container className="relative z-10 flex min-h-[92vh] flex-col justify-center py-24 sm:py-28 lg:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="max-w-2xl">
            <Reveal>
              <Badge className="mb-6">Rental-property HELOC</Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-[2.125rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                Put rental equity to work{" "}
                <span className="bg-gradient-to-r from-accent via-accent to-accent-bright bg-clip-text text-transparent">
                  without resetting the mortgage
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
                {SITE_TAGLINE}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
                <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="w-full sm:w-auto">
                  {PRIMARY_CTA_LABEL}
                </CtaLink>
                <CtaLink
                  href="#overview"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {SECONDARY_CTA_LABEL}
                </CtaLink>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <ComplianceNote className="mt-7 max-w-xl">{COMPLIANCE_SHORT}</ComplianceNote>
            </Reveal>
          </div>

          <Reveal delay={0.12} y={24}>
            <HeroPreviewDashboard />
          </Reveal>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent"
        aria-hidden
      />
    </section>
  );
}
