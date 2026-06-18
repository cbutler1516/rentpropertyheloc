"use client";

import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";

export function CtaBand() {
  return (
    <Section divider className="section-soft py-14 sm:py-20 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-brand-navy/20 bg-gradient-to-br from-brand-dark via-brand-navy to-brand-dark px-5 py-10 shadow-[0_20px_60px_rgba(23,212,212,0.12)] sm:rounded-3xl sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-primary/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-brand-secondary/10 blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto max-w-xl text-center lg:max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-primary/90">
              Ready when you are
            </p>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
              Find out what may be available for your rental
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
              ~60 seconds · No obligation · Licensed guidance
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <CtaLink
                href={PRIMARY_CTA_HREF}
                size="lg"
                className="glow-accent-hero w-full"
                onDark
                ctaLocation="cta-band"
              >
                {PRIMARY_CTA_LABEL}
              </CtaLink>
            </div>
            <CtaReassurance tone="dark" className="mx-auto mt-4 max-w-lg" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
