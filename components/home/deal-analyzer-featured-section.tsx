"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import {
  LAUNCH_ANALYZER_HREF,
  LAUNCH_ANALYZER_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
} from "@/lib/cta";
import { DEAL_ANALYZER_FEATURE } from "@/lib/playbook-content";
import { DealAnalyzerScreenshotPlaceholder } from "@/components/home/deal-analyzer-screenshot-placeholder";

export function DealAnalyzerFeaturedSection() {
  return (
    <Section id="deal-analyzer" divider className="bg-white py-8 sm:py-10 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700 sm:text-xs">
            {DEAL_ANALYZER_FEATURE.eyebrow}
          </p>
          <h2 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-[1.75rem]">
            {DEAL_ANALYZER_FEATURE.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
            {DEAL_ANALYZER_FEATURE.lead}
          </p>
          <ul className="mt-5 space-y-2">
            {DEAL_ANALYZER_FEATURE.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1 text-teal-600" aria-hidden>→</span>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink
              href={LAUNCH_ANALYZER_HREF}
              size="lg"
              ctaLocation="home-deal-analyzer-launch"
            >
              {LAUNCH_ANALYZER_LABEL}
            </CtaLink>
            <CtaLink
              href={SECONDARY_CTA_HREF}
              variant="secondary"
              size="lg"
              ctaLocation="home-deal-analyzer-explore"
            >
              {SECONDARY_CTA_LABEL}
            </CtaLink>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-4">
            <DealAnalyzerScreenshotPlaceholder />

            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-navy to-slate-900 p-6 text-white shadow-lg sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-300/90">
                Playbook Report preview
              </p>
              <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Scenario A · Purchase</span>
                  <span>Est. payment</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-[62%] rounded-full bg-teal-400/80" />
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Scenario B · HELOC</span>
                  <span>Draw capacity</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-[48%] rounded-full bg-teal-300/70" />
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold leading-snug">
                Side-by-side comparison · Shareable output · Strategy-first
              </p>
              <p className="mt-2 text-xs text-white/60">
                Educational estimates only — not a commitment to lend.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
