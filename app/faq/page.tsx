import { Container } from "@/components/layout/container";
import { FooterNavLink } from "@/components/layout/footer-nav-link";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { CtaLink } from "@/components/ui/cta-link";
import { CredibilityBar } from "@/components/marketing/credibility-bar";
import { COMPLIANCE_SHORT, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { FAQ_ITEMS } from "@/lib/home-content";
import { type SiteLink } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about HELOC eligibility, equity access, property types, credit, and review timing for primary homes, rentals, and second homes.",
};

const FAQ_RELATED: SiteLink[] = [
  { href: PRIMARY_CTA_HREF, label: PRIMARY_CTA_LABEL },
  { href: "/owner-occupied-heloc", label: "Owner-occupied HELOC" },
  { href: "/washington-heloc", label: "Washington HELOC" },
  { href: "/texas-heloc", label: "Texas HELOC" },
];

export default function FaqPage() {
  return (
    <div className="section-light py-16 sm:py-20 md:py-24">
      <FaqJsonLd />
      <Container className="max-w-3xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
          FAQ
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          Questions property owners ask first
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          HELOC eligibility, equity access, and timing for primary homes, second homes, and rentals.
          Programs may be available, subject to approval—not a commitment to lend.
        </p>

        <div className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group px-5 py-5 sm:px-7">
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span className="pr-2">{item.question}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 text-teal-600 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-8">
          <CredibilityBar />
        </div>

        <div className="mt-10">
          <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="w-full sm:w-auto">
            {PRIMARY_CTA_LABEL}
          </CtaLink>
        </div>

        <nav className="mt-10 border-t border-slate-200 pt-8" aria-label="Related pages">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Related pages
          </p>
          <ul className="mt-3 space-y-1">
            {FAQ_RELATED.map((link) => (
              <li key={link.href}>
                <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
              </li>
            ))}
          </ul>
        </nav>

        <ComplianceNote className="mt-8 text-left">{COMPLIANCE_SHORT}</ComplianceNote>

        <p className="mt-6 text-sm text-slate-500">
          <Link
            href="/"
            className="font-medium text-teal-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            ← Back to home
          </Link>
        </p>
      </Container>
    </div>
  );
}
