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
      className="relative overflow-hidden border-y border-white/[0.06] bg-navy-900/30 py-20 sm:py-28"
    >
      <FloatingGlow className="left-[-10%] top-1/4 h-96 w-96 opacity-50" color="green" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-bright">
              Watch the 60-second overview
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Strategic leverage without resetting your first mortgage
            </h2>
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-white/75">
              <li>
                Built for duplexes, townhomes, long-term rentals, and Airbnb-style assets—not
                primary-residence fluff.
              </li>
              <li>
                Preserve lower first-lien rates while accessing revolving equity for acquisitions,
                renovations, or reserves.
              </li>
              <li>
                Faster digital review systems may be available—funding possible in as little as 7
                days when files are complete, subject to approval.
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="glow-accent w-full sm:w-auto">
                {PRIMARY_CTA_SHORT}
              </CtaLink>
              <CtaLink href={PRIMARY_CTA_HREF} variant="secondary" size="lg" className="w-full sm:w-auto">
                {PRIMARY_CTA_LABEL}
              </CtaLink>
            </div>
            <ComplianceNote className="mt-6 max-w-lg">
              {COMPLIANCE_SHORT} {COMPLIANCE_TIMING}
            </ComplianceNote>
          </Reveal>

          <Reveal delay={0.08} y={28} className="order-1 lg:order-2">
            <div className="glass-panel glow-accent overflow-hidden rounded-3xl p-1">
              <VideoPlayer
                src={SITE_VIDEOS.explainer}
                label="60-second investor overview"
                withAudio
                controls
                className="border-0 shadow-none"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
