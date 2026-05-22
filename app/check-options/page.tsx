import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { COMPLIANCE_SHORT, COMPLIANCE_TIMING } from "@/lib/cta";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Rental HELOC Options",
  description:
    "Submit your rental portfolio details for a no-obligation HELOC options review. Programs may be available, subject to approval.",
};

export default function CheckOptionsPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
          Options review
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Check My Rental HELOC Options
        </h1>
        <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
          Tell us about your rentals and objective. A licensed loan officer will follow up with
          structures that may be available—subject to approval and property eligibility.
        </p>
        <div className="mt-10">
          <LeadForm />
        </div>
        <ComplianceNote className="mt-8">
          {COMPLIANCE_SHORT} {COMPLIANCE_TIMING}
        </ComplianceNote>
      </Container>
    </div>
  );
}
