import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { CtaLink } from "@/components/ui/cta-link";
import { COMPLIANCE_SHORT, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import type { Metadata } from "next";

export function placeholderMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
  };
}

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
          Coming soon
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">{description}</p>
        <div className="mt-10">
          <CtaLink href={PRIMARY_CTA_HREF} size="lg">
            {PRIMARY_CTA_LABEL}
          </CtaLink>
        </div>
        <ComplianceNote className="mt-8 max-w-xl">
          {COMPLIANCE_SHORT} This page is provided for informational purposes and will be updated
          with full content.
        </ComplianceNote>
      </Container>
    </div>
  );
}
