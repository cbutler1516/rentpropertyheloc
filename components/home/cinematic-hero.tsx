"use client";

import { Container } from "@/components/layout/container";
import { BrandPillars } from "@/components/marketing/brand-pillars";
import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { Reveal } from "@/components/motion/reveal";
import { BackgroundVideo } from "@/components/video/background-video";
import { CtaLink } from "@/components/ui/cta-link";
import { HERO_CTA_LABEL, HERO_FUNNEL_HREF } from "@/lib/cta";
import { HERO_HEADLINE, HERO_SUPPORTING_COPY } from "@/lib/brand-positioning";
import { SITE_VIDEOS } from "@/lib/videos";

export function CinematicHero() {
  return (
    <section id="overview" className="relative overflow-hidden">
      <BackgroundVideo
        src={SITE_VIDEOS.heroBackground}
        priority
        mobileStatic
        overlayClassName="from-navy-950/88 via-navy-950/94 to-navy-950"
      />
      <div className="absolute inset-0 cinematic-vignette opacity-80" aria-hidden />

      <Container className="relative z-10 py-10 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-2xl">
          <Reveal>
            <BrandPillars className="mb-4" />
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.08]">
              {HERO_HEADLINE}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-white/75 sm:mt-5 sm:text-base md:text-lg">
              {HERO_SUPPORTING_COPY}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-6 sm:mt-8">
              <CtaLink
                href={HERO_FUNNEL_HREF}
                size="lg"
                className="glow-accent-hero w-full sm:w-auto sm:min-w-[220px]"
                onDark
                ctaLocation="hero-primary"
              >
                {HERO_CTA_LABEL}
              </CtaLink>
            </div>
            <CtaReassurance tone="dark" align="left" className="mt-3 max-w-lg" />
          </Reveal>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-navy-950 to-transparent md:h-20"
        aria-hidden
      />
    </section>
  );
}
