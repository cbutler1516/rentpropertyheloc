"use client";

import { Section } from "@/components/layout/section";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FloatingGlow } from "@/components/motion/floating-glow";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import {
  COMPLIANCE_SHORT,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
} from "@/lib/cta";

export function CtaBand() {
  return (
    <Section divider className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <FloatingGlow className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2" />
      <Reveal>
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-navy-900/90 to-navy-950/90 px-6 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:px-10 sm:py-12">
          <div className="absolute inset-0 rounded-3xl bg-grid opacity-30" aria-hidden />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              See what may be available on your rentals
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Start a no-obligation options review. Eligibility and terms are subject to approval.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:items-center">
              <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="w-full sm:w-auto">
                {PRIMARY_CTA_LABEL}
              </CtaLink>
              <CtaLink
                href={SECONDARY_CTA_HREF}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {SECONDARY_CTA_LABEL}
              </CtaLink>
            </div>
            <ComplianceNote className="mx-auto mt-6 max-w-lg">{COMPLIANCE_SHORT}</ComplianceNote>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
