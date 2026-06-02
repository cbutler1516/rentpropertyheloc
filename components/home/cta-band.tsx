"use client";

import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL, PRIMARY_CTA_SHORT } from "@/lib/cta";

export function CtaBand() {
  return (
    <Section divider className="section-soft py-14 sm:py-20 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-teal-900/10 bg-gradient-to-br from-teal-950 via-teal-900 to-slate-900 px-5 py-10 shadow-[0_20px_60px_rgba(13,148,136,0.15)] sm:rounded-3xl sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-400/8 blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto max-w-xl text-center lg:max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-300/90">
              Ready when you are
            </p>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
              Find out what may be available for your rental
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-teal-100/75 sm:text-base">
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
                <span className="md:hidden">{PRIMARY_CTA_SHORT}</span>
                <span className="hidden md:inline">{PRIMARY_CTA_LABEL}</span>
              </CtaLink>
            </div>
            <CtaReassurance tone="dark" className="mx-auto mt-4 max-w-lg" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
