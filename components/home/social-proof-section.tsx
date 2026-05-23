"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { MotionCard } from "@/components/motion/motion-card";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { SectionLeadCta } from "@/components/ui/section-lead-cta";
import {
  FUNDING_TIMELINES,
  PORTFOLIO_STORIES,
  TESTIMONIALS,
  TRUST_INDICATORS,
} from "@/lib/home-content";

export function SocialProofSection() {
  return (
    <Section id="proof" muted divider>
      <SectionHeader
        eyebrow="Social proof"
        title="Built for investors who value clarity"
        description="Placeholder stories and timelines—replace with verified client outcomes when available."
      />

      <Reveal>
        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
          Investor testimonials
        </h3>
        <StaggerReveal className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <StaggerItem key={item.name}>
              <MotionCard>
                <Card className="h-full border-white/20 bg-white/95">
                  <p className="text-sm leading-relaxed text-slate-700">&ldquo;{item.quote}&rdquo;</p>
                  <p className="mt-5 text-sm font-semibold text-navy-950">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                  <p className="mt-3 text-[10px] uppercase tracking-wide text-slate-400">
                    Illustrative placeholder
                  </p>
                </Card>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Reveal>

      <Reveal delay={0.1} className="mt-16">
        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
          Portfolio growth stories
        </h3>
        <div className="grid gap-5 lg:grid-cols-3">
          {PORTFOLIO_STORIES.map((story) => (
            <MotionCard key={story.title}>
              <div className="glass-panel h-full p-6">
                <h4 className="text-lg font-semibold text-white">{story.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{story.summary}</p>
                <p className="mt-4 text-xs text-accent-bright">{story.outcome}</p>
              </div>
            </MotionCard>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.12} className="mt-16">
        <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
          Funding timelines
        </h3>
        <div className="mx-auto max-w-2xl space-y-0">
          {FUNDING_TIMELINES.map((step, index) => (
            <div
              key={step.stage}
              className="relative flex gap-4 border-l border-accent/30 pb-8 pl-6 last:pb-0"
            >
              <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
              <div>
                <p className="text-sm font-bold text-accent-bright">{step.stage}</p>
                <p className="mt-1 text-sm text-white/70">{step.detail}</p>
                {index === FUNDING_TIMELINES.length - 1 ? (
                  <p className="mt-2 text-xs text-white/45">Subject to approval</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.16}>
        <SectionLeadCta className="mt-10" />
      </Reveal>
      <Reveal delay={0.14} className="mt-14">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {TRUST_INDICATORS.map((label) => (
            <span
              key={label}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/75 backdrop-blur-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
