import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { DealAnalyzerFeaturedSection } from "@/components/home/deal-analyzer-featured-section";
import { PlatformEmailLink } from "@/components/trust/platform-email-link";
import { PlatformPhoneLink } from "@/components/trust/platform-phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { ABOUT_CHRIS, marketingComplianceFooter } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Chris Butler & The Loan Playbook",
  description:
    "Chris Butler, founder and mortgage strategist behind The Loan Playbook — a modern mortgage company built around Deal Analyzer technology and playbook reports.",
  keywords: [...SEO_KEYWORDS, "Seattle mortgage advisor", "Washington mortgage company"],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      "Founder-led mortgage strategy platform for buyers, investors, agents, and commercial clients.",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="section-light py-10 sm:py-14">
        <Container className="max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
            About
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {ABOUT_CHRIS.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {ABOUT_CHRIS.lead}
          </p>
          {ABOUT_CHRIS.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base"
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href={PRIMARY_CTA_HREF} size="md">
              {PRIMARY_CTA_LABEL}
            </CtaLink>
            <StrategyCallLink variant="secondary" ctaLocation="about-hero" />
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Contact</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-slate-900">Phone</dt>
                <dd className="mt-1">
                  <PlatformPhoneLink />
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Email</dt>
                <dd className="mt-1">
                  <PlatformEmailLink size="md" />
                </dd>
              </div>
            </dl>
          </div>

          <ComplianceNote className="mt-10">{marketingComplianceFooter()}</ComplianceNote>
        </Container>
      </div>
      <DealAnalyzerFeaturedSection />
    </>
  );
}
