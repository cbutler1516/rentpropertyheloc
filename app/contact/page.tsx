import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { PlatformEmailLink } from "@/components/trust/platform-email-link";
import { PlatformPhoneLink } from "@/components/trust/platform-phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { CtaLink } from "@/components/ui/cta-link";
import { BOOKING_URL } from "@/lib/contact";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { CONTACT_PAGE, marketingComplianceFooter } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: CONTACT_PAGE.seo.title,
  description: CONTACT_PAGE.seo.description,
  keywords: [...SEO_KEYWORDS, "Seattle mortgage advisor", "Washington mortgage company"],
  alternates: { canonical: `${SITE_URL}${CONTACT_PAGE.path}` },
};

export default function ContactPage() {
  return (
    <div className="section-light py-10 sm:py-14 md:py-16">
      <Container className="max-w-4xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
          {CONTACT_PAGE.eyebrow}
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          {CONTACT_PAGE.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {CONTACT_PAGE.lead}
        </p>

        <div id="book" className="mt-10 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Book a strategy call</h2>
          <p className="mt-2 text-sm text-slate-600">
            Schedule time with our team to review purchase, equity, investor, or commercial goals.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <StrategyCallLink variant="primary" ctaLocation="contact-book" />
            <CtaLink href={BOOKING_URL} variant="secondary" size="md" ctaLocation="contact-booking-url">
              Open scheduling
            </CtaLink>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-surface-50 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Other ways to reach us</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-slate-900">Phone</dt>
              <dd className="mt-1">
                <PlatformPhoneLink />
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-900">Email</dt>
              <dd className="mt-1">
                <PlatformEmailLink size="md" />
              </dd>
            </div>
          </dl>
          <CtaLink href={PRIMARY_CTA_HREF} size="md" className="mt-6" ctaLocation="contact-playbook">
            {PRIMARY_CTA_LABEL}
          </CtaLink>
        </div>

        <ComplianceNote className="mt-10">{marketingComplianceFooter()}</ComplianceNote>
      </Container>
    </div>
  );
}
