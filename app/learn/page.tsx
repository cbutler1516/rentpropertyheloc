import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FooterNavLink } from "@/components/layout/footer-nav-link";
import { CtaLink } from "@/components/ui/cta-link";
import { LEARN_PAGE } from "@/lib/marketing-pages";
import { marketingComplianceFooter } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

import { MORTGAGE_SOLUTION_LINKS } from "@/lib/mortgage-products/content";

const TOPIC_LINKS = [
  { href: "/mortgage-resources", label: "Mortgage resources hub" },
  { href: "/conventional-loans", label: "Conventional loans" },
  { href: "/dscr-loans", label: "DSCR loans" },
  { href: "/heloc", label: "HELOC strategy" },
  { href: "/cash-out-refinance", label: "Cash-out refinance" },
  { href: "/rental-property-heloc", label: "Rental property HELOC" },
  { href: "/heloc-on-investment-property", label: "HELOC on investment property" },
  { href: "/cash-out-vs-heloc", label: "Cash-out vs HELOC" },
  { href: "/investor-second-mortgage", label: "Investor second mortgage" },
  { href: "/use-equity-to-buy-another-rental", label: "Use equity for next rental" },
  { href: "/no-tax-return-heloc", label: "No tax return HELOC" },
  { href: "/scenarios", label: "Investor scenario library" },
  { href: "/faq", label: "FAQ" },
] as const;

export const metadata: Metadata = {
  title: LEARN_PAGE.seo.title,
  description: LEARN_PAGE.seo.description,
  keywords: [...SEO_KEYWORDS, "mortgage education", "mortgage strategy"],
  alternates: { canonical: `${SITE_URL}${LEARN_PAGE.path}` },
};

export default function LearnPage() {
  return (
    <div className="section-light py-10 sm:py-14 md:py-16">
      <Container className="max-w-4xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
          {LEARN_PAGE.eyebrow}
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          {LEARN_PAGE.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {LEARN_PAGE.lead}
        </p>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">Loan programs</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {MORTGAGE_SOLUTION_LINKS.map((link) => (
              <li key={link.href}>
                <FooterNavLink href={link.href} className="text-sm text-teal-800 hover:text-teal-950">
                  {link.label}
                </FooterNavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">Topics & guides</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {TOPIC_LINKS.map((link) => (
              <li key={link.href}>
                <FooterNavLink href={link.href} className="text-sm text-teal-800 hover:text-teal-950">
                  {link.label}
                </FooterNavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/check-options" size="lg" ctaLocation="learn-primary">
            {LEARN_PAGE.primaryCta.label}
          </CtaLink>
          <CtaLink href="/deal-analyzer" variant="secondary" size="lg" ctaLocation="learn-secondary">
            Explore the Deal Analyzer
          </CtaLink>
        </div>

        <ComplianceNote className="mt-10">{marketingComplianceFooter()}</ComplianceNote>
      </Container>
    </div>
  );
}
