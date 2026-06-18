"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { BUILT_FOR_PARTNERS } from "@/lib/playbook-content";

export function BuiltForPartnersSection() {
  return (
    <Section id="partners" divider muted className="bg-surface-50 py-8 sm:py-10 md:py-12">
      <Reveal>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700 sm:text-xs">
          {BUILT_FOR_PARTNERS.eyebrow}
        </p>
        <h2 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-[1.75rem]">
          {BUILT_FOR_PARTNERS.title}
        </h2>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
          {BUILT_FOR_PARTNERS.lead}
        </p>
      </Reveal>
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {BUILT_FOR_PARTNERS.bullets.map((bullet, index) => (
          <Reveal key={bullet} delay={index * 0.04}>
            <li className="rounded-xl border border-slate-200/90 bg-white p-4 text-sm leading-relaxed text-slate-700">
              {bullet}
            </li>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={0.1} className="mt-6">
        <CtaLink href={BUILT_FOR_PARTNERS.href} size="md" ctaLocation="home-partners">
          {BUILT_FOR_PARTNERS.cta}
        </CtaLink>
      </Reveal>
    </Section>
  );
}
