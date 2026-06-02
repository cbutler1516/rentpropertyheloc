import { Container } from "@/components/layout/container";
import { AdvisorCredibilitySection } from "@/components/trust/advisor-credibility-section";
import { BorrowerTrustSection } from "@/components/trust/borrower-trust-section";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { PhoneLink } from "@/components/trust/phone-link";
import { StateAvailabilitySection } from "@/components/trust/state-availability-section";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { NMLS_CONSUMER_ACCESS_URL } from "@/lib/contact";
import { ADVISOR } from "@/lib/trust-content";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: `Who operates ${SITE_NAME}, our investor-focused mission, and how licensed mortgage professionals guide rental property equity reviews.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      "Investor-focused rental property equity platform with licensed human guidance.",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="section-light py-10 sm:py-14">
      <Container className="max-w-4xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
          About
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          About {SITE_NAME}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {ADVISOR.name} leads investor lending guidance through {ADVISOR.company}. With{" "}
          {ADVISOR.credentials[0].toLowerCase()} and a real estate investor background, the
          platform helps rental property owners compare HELOC, second mortgage, and other equity
          paths—with a licensed professional who understands portfolio strategy.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CtaLink href={PRIMARY_CTA_HREF} size="md">
            {PRIMARY_CTA_LABEL}
          </CtaLink>
          <StrategyCallLink variant="secondary" ctaLocation="about-hero" />
        </div>

        <div className="mt-10">
          <AdvisorCredibilitySection variant="full" />
        </div>

        <div className="mt-10">
          <BorrowerTrustSection variant="embedded" />
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Contact & licensing</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-slate-900">Advisor</dt>
              <dd className="mt-1 text-slate-600">
                {ADVISOR.name} · {ADVISOR.title}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Phone</dt>
              <dd className="mt-1">
                <PhoneLink />
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${ADVISOR.email}`}
                  className="font-medium text-teal-700 underline-offset-2 hover:underline"
                >
                  {ADVISOR.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Individual NMLS</dt>
              <dd className="mt-1 text-slate-600">
                {ADVISOR.nmls}.{" "}
                <a
                  href={NMLS_CONSUMER_ACCESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 underline-offset-2 hover:underline"
                >
                  Verify at NMLS Consumer Access
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Company</dt>
              <dd className="mt-1 text-slate-600">
                {ADVISOR.company} · {ADVISOR.companyNmls}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10">
          <StateAvailabilitySection variant="inline" />
        </div>
      </Container>
    </div>
  );
}
