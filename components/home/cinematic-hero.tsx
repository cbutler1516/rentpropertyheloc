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

const HERO_OVERLAY =
  "bg-gradient-to-r from-navy-950/82 via-navy-950/58 to-navy-950/36 md:from-navy-950/70 md:via-navy-950/45 md:to-navy-950/22";

export function CinematicHero() {
  return (
    <section
      id="overview"
      className="site-anchor-section relative flex min-h-[min(460px,86dvh)] items-center overflow-hidden md:min-h-[clamp(420px,58vh,640px)]"
    >
      <BackgroundVideo
        src={SITE_VIDEOS.heroBackground}
        poster={SITE_VIDEOS.heroBackgroundPoster}
        startTime={0.75}
        priority
        preload="auto"
        mobileStatic={false}
        replaceDefaultOverlay
        overlayClassName={HERO_OVERLAY}
        videoClassName="opacity-75 max-md:object-[72%_35%] md:opacity-90"
      />
      <div className="absolute inset-0 cinematic-vignette opacity-50 max-md:opacity-55" aria-hidden />

      <Container className="relative z-10 w-full py-8 sm:py-14 md:py-16 lg:py-20">
        <div className="max-w-2xl">
          <Reveal>
            <BrandPillars className="mb-3 hero-text-shadow-sm sm:mb-4" />
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="hero-text-shadow text-balance text-[1.625rem] font-bold leading-[1.14] tracking-tight text-white sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.08]">
              {HERO_HEADLINE}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="hero-text-shadow-sm mt-3 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-white/90 sm:mt-5 sm:text-base md:max-w-lg md:text-lg">
              {HERO_SUPPORTING_COPY}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-6 sm:mt-8">
              <CtaLink
                href={HERO_FUNNEL_HREF}
                size="lg"
                className="glow-accent-hero w-full sm:w-auto sm:min-w-[240px]"
                onDark
                ctaLocation="hero-primary"
              >
                {HERO_CTA_LABEL}
              </CtaLink>
            </div>
            <CtaReassurance tone="dark" align="left" className="hero-text-shadow-sm mt-3.5 max-w-lg" />
          </Reveal>
        </div>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-navy-950/70 to-transparent md:h-20"
        aria-hidden
      />
    </section>
  );
}
