"use client";

import { Section } from "@/components/layout/section";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import {
  HOME_INVESTOR_TRUST_CARDS,
  HOME_INVESTOR_TRUST_HEADLINE,
} from "@/lib/home-investor-trust";

export function HomeInvestorTrustSection() {
  return (
    <Section id="why-investors" divider className="border-b border-slate-200/80 bg-white py-12 sm:py-16 md:py-20">
      <Reveal>
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {HOME_INVESTOR_TRUST_HEADLINE}
        </h2>
      </Reveal>

      <StaggerReveal className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
        {HOME_INVESTOR_TRUST_CARDS.map((card) => (
          <StaggerItem key={card.title}>
            <article className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-sm transition hover:border-teal-200/80 hover:shadow-md sm:p-6">
              <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{card.description}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Section>
  );
}
