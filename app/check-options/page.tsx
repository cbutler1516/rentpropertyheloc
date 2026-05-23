import { FunnelLoading, QualificationFunnel } from "@/components/forms/qualification-funnel";
import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { COMPLIANCE_SHORT, COMPLIANCE_TIMING } from "@/lib/cta";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Check Rental HELOC Options",
  description:
    "Submit your rental portfolio details for a no-obligation HELOC options review. Programs may be available, subject to approval.",
};

export default function CheckOptionsPage() {
  return (
    <div className="section-funnel py-10 sm:py-16 md:py-24">
      <Container className="max-w-xl px-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-bright sm:text-xs">
          Options review
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-navy-950 sm:mt-4 sm:text-3xl md:text-4xl">
          Check My Rental HELOC Options
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base md:text-lg">
          Tell us about your rentals and objective. A licensed loan officer will follow up with
          structures that may be available—subject to approval and property eligibility.
        </p>
        <div className="mt-8 sm:mt-10">
          <Suspense fallback={<FunnelLoading />}>
            <QualificationFunnel />
          </Suspense>
        </div>
        <ComplianceNote className="mt-8 text-slate-500">
          {COMPLIANCE_SHORT} {COMPLIANCE_TIMING}
        </ComplianceNote>
      </Container>
    </div>
  );
}
