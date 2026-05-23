"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { SectionLeadCta } from "@/components/ui/section-lead-cta";
import { FAQ_ITEMS, TRUST_INDICATORS } from "@/lib/home-content";

export function FaqSection() {
  return (
    <Section id="faq" divider>
      <Reveal>
        <SectionHeader
          eyebrow="FAQ"
          title="Questions investors ask first"
          description="Direct answers on rental eligibility, structure, and timing—without the sales script."
        />
      </Reveal>
      <StaggerReveal className="mx-auto max-w-3xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
        {FAQ_ITEMS.map((item) => (
          <StaggerItem key={item.question}>
            <details className="group px-5 py-5 sm:px-7">
              <summary className="cursor-pointer list-none text-base font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span className="pr-2">{item.question}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 text-accent-bright transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{item.answer}</p>
            </details>
          </StaggerItem>
        ))}
      </StaggerReveal>
      <Reveal delay={0.14}>
        <SectionLeadCta className="mt-10" />
      </Reveal>
      <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-3">
        {TRUST_INDICATORS.map((label) => (
          <span
            key={label}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60"
          >
            {label}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}
