"use client";

import { CredibilityBar } from "@/components/marketing/credibility-bar";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { StateAvailabilitySection } from "@/components/trust/state-availability-section";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { FAQ_ITEMS } from "@/lib/home-content";

export function FaqSection() {
  return (
    <Section id="faq" divider className="bg-white">
      <Reveal>
        <SectionHeader
          tone="light"
          eyebrow="FAQ"
          title="Questions investors ask first"
          description="Rental HELOC eligibility, equity access, and timing—straight answers, no sales script."
        />
      </Reveal>
      <StaggerReveal className="mx-auto max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm lg:max-w-5xl">
        {FAQ_ITEMS.map((item) => (
          <StaggerItem key={item.question}>
            <details className="group px-5 py-5 sm:px-7">
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span className="pr-2">{item.question}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 text-teal-600 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </details>
          </StaggerItem>
        ))}
      </StaggerReveal>
      <Reveal delay={0.08} className="mt-10">
        <StateAvailabilitySection />
      </Reveal>
      <Reveal delay={0.1} className="mt-8">
        <CredibilityBar />
      </Reveal>
      <Reveal delay={0.12} className="mt-10 flex justify-center">
        <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="w-full sm:w-auto" ctaLocation="faq-section">
          {PRIMARY_CTA_LABEL}
        </CtaLink>
      </Reveal>
    </Section>
  );
}
