import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FooterNavLink } from "@/components/layout/footer-nav-link";
import { MortgageProductCtaSection } from "@/components/marketing/mortgage-product-cta-section";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { marketingComplianceFooter } from "@/lib/marketing-pages";
import {
  MORTGAGE_RESOURCES_HERO,
  MORTGAGE_RESOURCES_SECTIONS,
} from "@/lib/mortgage-resources-content";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Resources | Guides, Programs & Tools",
  description:
    "Mortgage resources from The Loan Playbook — loan programs, buyer and investor guides, Deal Analyzer, and strategy content. Educational only.",
  keywords: [...SEO_KEYWORDS, "mortgage resources", "mortgage guides", "loan programs"],
  alternates: { canonical: `${SITE_URL}/mortgage-resources` },
  openGraph: {
    title: MORTGAGE_RESOURCES_HERO.title,
    description: MORTGAGE_RESOURCES_HERO.lead,
    url: `${SITE_URL}/mortgage-resources`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function MortgageResourcesPage() {
  return (
    <div className="section-light py-10 sm:py-14 md:py-16">
      <Container className="max-w-5xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
          {MORTGAGE_RESOURCES_HERO.eyebrow}
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          {MORTGAGE_RESOURCES_HERO.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {MORTGAGE_RESOURCES_HERO.lead}
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {MORTGAGE_RESOURCES_SECTIONS.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2
                id={section.id}
                className="text-sm font-bold uppercase tracking-[0.14em] text-slate-800"
              >
                {section.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <FooterNavLink href={link.href} className="text-sm text-teal-800">
                      {link.label}
                    </FooterNavLink>
                    {"description" in link && link.description ? (
                      <p className="mt-0.5 text-xs text-slate-500">{link.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={PRIMARY_CTA_HREF} size="lg" ctaLocation="mortgage-resources-primary">
            {PRIMARY_CTA_LABEL}
          </CtaLink>
          <CtaLink
            href="/strategy-call"
            variant="secondary"
            size="lg"
            ctaLocation="mortgage-resources-strategy"
          >
            Book a strategy call
          </CtaLink>
        </div>

        <MortgageProductCtaSection className="mt-12" ctaLocationPrefix="mortgage-resources" compact />

        <ComplianceNote className="mt-10">{marketingComplianceFooter()}</ComplianceNote>
      </Container>
    </div>
  );
}
