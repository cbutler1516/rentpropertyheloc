import { Container } from "@/components/layout/container";
import { HomeInvestorTrustSection } from "@/components/home/home-investor-trust-section";
import { BorrowerTrustSection } from "@/components/trust/borrower-trust-section";
import { PlatformEmailLink } from "@/components/trust/platform-email-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { StateAvailabilitySection } from "@/components/trust/state-availability-section";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { FOOTER_PLATFORM_DISCLOSURE } from "@/lib/legal/compliance";
import { ABOUT_PLATFORM } from "@/lib/trust-content";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `Learn how ${SITE_NAME} connects rental property investors with financing specialists and licensed lending partners.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      "Investor-focused rental property equity review platform with team-based guidance and licensed lending partners.",
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
          {ABOUT_PLATFORM.summary}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CtaLink href={PRIMARY_CTA_HREF} size="md">
            {PRIMARY_CTA_LABEL}
          </CtaLink>
          <StrategyCallLink variant="secondary" ctaLocation="about-hero" />
        </div>

        <div className="mt-10 -mx-4 sm:mx-0">
          <HomeInvestorTrustSection />
        </div>

        <div className="mt-10">
          <BorrowerTrustSection variant="embedded" />
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">Contact our team</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Questions about your review or available financing paths? Our financing specialists and
            licensed lending partners can help after you submit a property review.
          </p>
          <p className="mt-4 text-sm">
            <PlatformEmailLink size="md" />
          </p>
        </div>

        <div className="mt-10">
          <StateAvailabilitySection variant="inline" />
        </div>

        <p className="mt-10 text-xs leading-relaxed text-slate-500">{FOOTER_PLATFORM_DISCLOSURE}</p>
      </Container>
    </div>
  );
}
