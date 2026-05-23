"use client";

import { HeroQuickStart } from "@/components/forms/hero-quick-start";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionLeadCta } from "@/components/ui/section-lead-cta";
import { COMPLIANCE_SHORT } from "@/lib/cta";

export function LeadFormSection() {
  return (
    <Section id="apply" light divider>
      <Reveal>
        <SectionHeader
          eyebrow="Get started"
          title="Check rental HELOC options"
          description="Share portfolio basics for a no-obligation review. Program availability and terms are subject to approval."
        />
      </Reveal>
      <Reveal delay={0.08} className="mx-auto max-w-xl">
        <HeroQuickStart tone="light" />
      </Reveal>
      <Reveal delay={0.12}>
        <SectionLeadCta className="mt-8" />
        <ComplianceNote className="mx-auto mt-6 max-w-xl text-center text-slate-500">
          {COMPLIANCE_SHORT}
        </ComplianceNote>
      </Reveal>
    </Section>
  );
}
