"use client";

import { Container } from "@/components/layout/container";
import { BrandPillars } from "@/components/marketing/brand-pillars";
import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { HeroReviewPreviewCard } from "@/components/home/hero-review-preview-card";
import { Reveal } from "@/components/motion/reveal";
import { BackgroundVideo } from "@/components/video/background-video";
import { CtaLink } from "@/components/ui/cta-link";
import { HERO_CTA_LABEL, HERO_FUNNEL_HREF } from "@/lib/cta";
import { HERO_HEADLINE, HERO_SUPPORTING_COPY } from "@/lib/brand-positioning";
import { SITE_VIDEOS } from "@/lib/videos";

const HERO_OVERLAY =
  "bg-gradient-to-r from-navy-950/72 via-navy-950/48 to-navy-950/28 sm:from-navy-950/70 sm:via-navy-950/45 sm:to-navy-950/22";

export function CinematicHero() {
  return (
    <section id="overview" className="site-anchor-section relative overflow-hidden">
      <BackgroundVideo
        src={SITE_VIDEOS.heroBackground}
        priority
        preload="auto"
        mobileStatic={false}
        replaceDefaultOverlay
        overlayClassName={HERO_OVERLAY}
        videoClassName="opacity-80 md:opacity-90"
      />
      <div className="absolute inset-0 cinematic-vignette opacity-45" aria-hidden />

      <Container className="relative z-10 py-8 sm:py-14 md:py-16 lg:py-20">
        <div className="flex flex-col gap-7 md:grid md:grid-cols-2 md:items-center md:gap-10 lg:gap-12">
          <div className="max-w-2xl">
            <Reveal>
              <BrandPillars className="mb-4 hero-text-shadow-sm" />
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="hero-text-shadow text-[1.75rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.08]">
                {HERO_HEADLINE}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="hero-text-shadow-sm mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-white/85 sm:mt-5 sm:text-base md:text-lg">
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
              <CtaReassurance tone="dark" align="left" className="hero-text-shadow-sm mt-3 max-w-lg" />
            </Reveal>
          </div>

          <HeroReviewPreviewCard />
        </div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-navy-950/70 to-transparent md:h-20"
        aria-hidden
      />
    </section>
  );
}
