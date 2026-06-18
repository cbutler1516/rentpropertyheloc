"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { WHAT_WE_DO } from "@/lib/playbook-content";

export function WhatWeDoSection() {
  return (
    <Section id="what-we-do" divider className="bg-white py-8 sm:py-10 md:py-12">
      <Reveal>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700 sm:text-xs">
          {WHAT_WE_DO.eyebrow}
        </p>
        <h2 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-[1.75rem]">
          {WHAT_WE_DO.title}
        </h2>
        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
          {WHAT_WE_DO.lead}
        </p>
      </Reveal>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHAT_WE_DO.items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.04}>
            <article className="h-full rounded-2xl border border-slate-200/90 bg-surface-50 p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
