import { LeadForm } from "@/components/forms/lead-form";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { Section, SectionHeader } from "@/components/layout/section";
import { COMPLIANCE_SHORT } from "@/lib/cta";

export function LeadFormSection() {
  return (
    <Section id="apply" muted divider>
      <SectionHeader
        eyebrow="Get started"
        title="Check rental HELOC options"
        description="Share portfolio basics for a no-obligation review. Program availability and terms are subject to approval."
      />
      <div className="mx-auto max-w-xl">
        <LeadForm />
        <ComplianceNote className="mt-6 text-center">{COMPLIANCE_SHORT}</ComplianceNote>
      </div>
    </Section>
  );
}
