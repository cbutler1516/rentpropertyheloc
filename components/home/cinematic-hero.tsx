"use client";

import { HeroPreviewDashboard } from "@/components/home/hero-preview-dashboard";
import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FloatingGlow } from "@/components/motion/floating-glow";
import { Reveal } from "@/components/motion/reveal";
import { BackgroundVideo } from "@/components/video/background-video";
import { Badge } from "@/components/ui/badge";
import { CtaLink } from "@/components/ui/cta-link";
import { BRAND } from "@/lib/brand";
import { COMPLIANCE_SHORT, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL, SECONDARY_CTA_LABEL } from "@/lib/cta";
import { SITE_DESCRIPTOR } from "@/lib/site";
import { SITE_VIDEOS } from "@/lib/videos";

export function CinematicHero() {
  return (
    <section className="relative min-h-[94vh] overflow-hidden">
      <BackgroundVideo
        src={SITE_VIDEOS.heroBackground}
        priority
        overlayClassName="from-navy-950/80 via-navy-950/90 to-navy-950"
      />
      <div className="absolute inset-0 cinematic-vignette" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-[0.18]" aria-hidden />
      <FloatingGlow className="left-[5%] top-[15%] h-72 w-72" color="cyan" />
      <FloatingGlow className="right-[8%] top-[40%] h-80 w-80" color="green" />

      <Container className="relative z-10 flex min-h-[94vh] flex-col justify-center py-24 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl lg:max-w-2xl">
            <Reveal>
              <Badge className="mb-6 border-accent/20 bg-accent/5">
                Residential rental investors
              </Badge>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-[2rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                {BRAND.headline.split(" — ")[0]}
                <span className="mt-2 block text-gradient-brand sm:mt-3">
                  {BRAND.headline.includes(" — ")
                    ? `— ${BRAND.headline.split(" — ")[1]}`
                    : null}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl">
                {SITE_DESCRIPTOR}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
                <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="glow-accent w-full sm:w-auto">
                  {PRIMARY_CTA_LABEL}
                </CtaLink>
                <CtaLink href="#overview" variant="secondary" size="lg" className="w-full sm:w-auto">
                  {SECONDARY_CTA_LABEL}
                </CtaLink>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <ComplianceNote className="mt-7 max-w-lg">{COMPLIANCE_SHORT}</ComplianceNote>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={20}>
            <HeroPreviewDashboard className="glow-accent" />
          </Reveal>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent"
        aria-hidden
      />
    </section>
  );
}
