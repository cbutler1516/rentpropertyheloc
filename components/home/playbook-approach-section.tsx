"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PLAYBOOK_APPROACH } from "@/lib/playbook-content";

export function PlaybookApproachSection() {
  return (
    <Section id="approach" divider muted className="bg-surface-50 py-8 sm:py-10 md:py-12">
      <Reveal>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700 sm:text-xs">
          {PLAYBOOK_APPROACH.eyebrow}
        </p>
        <h2 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-[1.75rem]">
          {PLAYBOOK_APPROACH.title}
        </h2>
      </Reveal>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLAYBOOK_APPROACH.steps.map((step, index) => (
          <Reveal key={step.step} delay={index * 0.05}>
            <li className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
              <span className="font-mono text-xs font-bold text-teal-700">{step.step}</span>
              <h3 className="mt-2 text-base font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
