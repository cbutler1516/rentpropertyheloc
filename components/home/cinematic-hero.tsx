"use client";

import { Container } from "@/components/layout/container";
import { BrandPillars } from "@/components/marketing/brand-pillars";
import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { Reveal } from "@/components/motion/reveal";
import { BackgroundVideo } from "@/components/video/background-video";
import { HeroExplainerVideo } from "@/components/video/hero-explainer-video";
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

      <Container className="relative z-10 py-8 sm:py-14 md:py-20 lg:py-24">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:items-center md:gap-10 lg:gap-12">
          <div className="order-2 md:order-1">
            <Reveal>
              <BrandPillars className="mb-4" />
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-[1.625rem] font-bold leading-[1.12] tracking-tight text-white sm:text-[2rem] md:max-w-xl md:text-[2.5rem] lg:max-w-2xl lg:text-[3rem] lg:leading-[1.08]">
                {HERO_HEADLINE}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-white/75 sm:mt-5 sm:text-base md:max-w-xl md:text-lg">
                {HERO_SUPPORTING_COPY}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-6 sm:mt-7">
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

          <Reveal delay={0.06} y={12} className="order-1 md:order-2">
            <HeroExplainerVideo label="Investor financing with real human guidance" />
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
