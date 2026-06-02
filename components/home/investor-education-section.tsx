"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { MotionCard } from "@/components/motion/motion-card";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { INVESTOR_EDUCATION_BLOCKS } from "@/lib/home-content";

export function InvestorEducationSection() {
  return (
    <Section id="investor-education" divider className="bg-white py-14 sm:py-20">
      <Reveal>
        <SectionHeader
          tone="light"
          eyebrow="Investor education"
          title="Rental equity, explained clearly"
          description="Short guides on how investors use HELOCs and second-position lines—without the generic mortgage-blog noise."
        />
      </Reveal>

      <StaggerReveal className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
        {INVESTOR_EDUCATION_BLOCKS.map((block) => (
          <StaggerItem key={block.id}>
            <MotionCard>
              <article className="card-surface flex h-full flex-col rounded-2xl p-5 sm:p-6">
                <h3 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{block.summary}</p>
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {block.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-xs leading-relaxed text-slate-600 sm:text-sm"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-relaxed text-slate-500">
        Educational content only—not financial, tax, or legal advice. Programs, terms, and
        eligibility vary by property, credit, and lender guidelines.
      </p>
    </Section>
  );
}
