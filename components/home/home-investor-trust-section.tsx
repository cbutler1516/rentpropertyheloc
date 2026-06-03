"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import {
  HOME_INVESTOR_TRUST_CARDS,
  HOME_INVESTOR_TRUST_HEADLINE,
  HOME_INVESTOR_TRUST_SUBHEADLINE,
} from "@/lib/home-investor-trust";
import { cn } from "@/lib/cn";

export function HomeInvestorTrustSection() {
  return (
    <Section id="why-investors" divider className="border-b border-slate-200/80 bg-white py-12 sm:py-16 md:py-20">
      <Reveal>
        <SectionHeader
          tone="light"
          title={HOME_INVESTOR_TRUST_HEADLINE}
          description={HOME_INVESTOR_TRUST_SUBHEADLINE}
        />
      </Reveal>

      <StaggerReveal className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
        {HOME_INVESTOR_TRUST_CARDS.map((card) => (
          <StaggerItem key={card.id}>
            <article className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] sm:p-6">
              <TrustCardIcon id={card.id} />
              <h3 className="mt-4 text-base font-semibold text-slate-900 sm:text-lg">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{card.description}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Section>
  );
}

function TrustCardIcon({ id }: { id: (typeof HOME_INVESTOR_TRUST_CARDS)[number]["id"] }) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-xl",
        "bg-gradient-to-br from-teal-50 to-teal-100/80 text-teal-800 ring-1 ring-teal-100",
        "transition group-hover:from-teal-100 group-hover:to-teal-50 group-hover:ring-teal-200",
      )}
      aria-hidden
    >
      {id === "investor-focused" ? <BuildingIcon /> : null}
      {id === "human-review" ? <SpecialistIcon /> : null}
      {id === "fast-process" ? <ClockIcon /> : null}
    </span>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d="M4 20V9l8-5 8 5v11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 20v-5h6v5M9 12h.01M15 12h.01"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpecialistIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M6 19c.6-2.8 3-4.5 6-4.5s5.4 1.7 6 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M17 11l2 1.5-2 1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 8v4l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
