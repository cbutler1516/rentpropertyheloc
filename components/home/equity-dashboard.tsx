"use client";

import { InteractiveEquityDashboard } from "@/components/home/interactive-equity-dashboard";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { LazyBackgroundVideo } from "@/components/video/lazy-background-video";
import { SITE_VIDEOS } from "@/lib/videos";

export function EquityDashboardSection() {
  return (
    <section id="dashboard" className="site-anchor-section relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <LazyBackgroundVideo src={SITE_VIDEOS.rentalEquity} />
      <Container className="relative">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Portfolio view
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Interactive investor equity dashboard
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Adjust values to explore illustrative available equity on rental collateral—may be
            available, subject to approval. Not a commitment to lend.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <InteractiveEquityDashboard />
        </Reveal>
      </Container>
    </section>
  );
}
