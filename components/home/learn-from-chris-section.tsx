"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { LEARN_FROM_CHRIS } from "@/lib/playbook-content";

export function LearnFromChrisSection() {
  return (
    <Section id="learn" divider className="bg-white py-8 sm:py-10 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700 sm:text-xs">
            {LEARN_FROM_CHRIS.eyebrow}
          </p>
          <h2 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-[1.75rem]">
            {LEARN_FROM_CHRIS.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
            {LEARN_FROM_CHRIS.lead}
          </p>
          <ul className="mt-5 space-y-2">
            {LEARN_FROM_CHRIS.bullets.map((bullet) => (
              <li key={bullet} className="text-sm text-slate-700">
                · {bullet}
              </li>
            ))}
          </ul>
          <CtaLink href={LEARN_FROM_CHRIS.href} size="md" className="mt-6" ctaLocation="home-learn">
            {LEARN_FROM_CHRIS.cta}
          </CtaLink>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-300/90">
              Social & video education
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              Market explainers, financing strategy shorts, and playbook thinking — built for
              agents to share and buyers to understand before the call.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
