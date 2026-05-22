"use client";

import { LeadForm } from "@/components/forms/lead-form";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { COMPLIANCE_SHORT } from "@/lib/cta";

export function LeadFormSection() {
  return (
    <Section id="apply" muted divider>
      <Reveal>
        <SectionHeader
          eyebrow="Get started"
          title="Check rental HELOC options"
          description="Share portfolio basics for a no-obligation review. Program availability and terms are subject to approval."
        />
      </Reveal>
      <Reveal delay={0.1} className="mx-auto max-w-xl">
        <LeadForm />
        <ComplianceNote className="mt-6 text-center">{COMPLIANCE_SHORT}</ComplianceNote>
      </Reveal>
    </Section>
  );
}
