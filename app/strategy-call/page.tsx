import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { CalendarEmbedPlaceholder } from "@/components/trust/calendar-embed-placeholder";
import { CtaLink } from "@/components/ui/cta-link";
import { Card } from "@/components/ui/card";
import {
  DEAL_ANALYZER_HREF,
  COMPLIANCE_SHORT,
  LAUNCH_ANALYZER_HREF,
  LAUNCH_ANALYZER_LABEL,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_LABEL,
  SCHEDULE_STRATEGY_CALL_LABEL,
} from "@/lib/cta";
import { marketingComplianceFooter } from "@/lib/marketing-pages";
import { SEO_KEYWORDS } from "@/lib/playbook-content";
import { buildFaqSchema } from "@/lib/seo/schema";
import {
  AFTER_THE_CALL,
  MEET_CHRIS,
  MORTGAGE_EXPERIENCE,
  REAL_ESTATE_BACKGROUND,
  STRATEGY_CALL_FAQ,
  STRATEGY_CALL_HERO,
  WHAT_WE_COVER,
  WHO_STRATEGY_CALL_IS_FOR,
  WHY_CLIENTS_USE_TLP,
} from "@/lib/strategy-call-content";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Strategy Call | Custom Financing Session",
  description:
    "Book a premium mortgage strategy session with Chris Butler and The Loan Playbook team. Educational guidance — not a commitment to lend.",
  keywords: [...SEO_KEYWORDS, "mortgage strategy call", "Seattle mortgage advisor"],
  alternates: { canonical: `${SITE_URL}/strategy-call` },
  openGraph: {
    title: STRATEGY_CALL_HERO.headline,
    description: STRATEGY_CALL_HERO.subheadline,
    url: `${SITE_URL}/strategy-call`,
    siteName: SITE_NAME,
    type: "website",
  },
};

function FaqSection() {
  return (
    <section className="section-light border-t border-slate-100 py-10 sm:py-14" aria-labelledby="strategy-faq">
      <Container className="max-w-3xl">
        <h2 id="strategy-faq" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Frequently asked questions
        </h2>
        <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
          {STRATEGY_CALL_FAQ.map((faq) => (
            <details key={faq.question} className="group px-5 py-5 sm:px-6">
              <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 sm:text-base [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  <span className="pr-2">{faq.question}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 text-teal-600 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm text-slate-700">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-500" aria-hidden />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function StrategyCallPage() {
  const faqSchema = buildFaqSchema([...STRATEGY_CALL_FAQ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="section-light border-b border-slate-200/80 py-10 sm:py-14 md:py-16">
        <Container className="max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
            Strategy call
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            {STRATEGY_CALL_HERO.headline}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            {STRATEGY_CALL_HERO.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href="#schedule" size="lg" ctaLocation="strategy-call-hero-schedule">
              {SCHEDULE_STRATEGY_CALL_LABEL}
            </CtaLink>
            <CtaLink
              href={PRIMARY_CTA_HREF}
              variant="secondary"
              size="lg"
              ctaLocation="strategy-call-hero-playbook"
            >
              {PRIMARY_CTA_LABEL}
            </CtaLink>
            <CtaLink
              href={DEAL_ANALYZER_HREF}
              variant="secondary"
              size="lg"
              ctaLocation="strategy-call-hero-analyzer"
            >
              {SECONDARY_CTA_LABEL}
            </CtaLink>
          </div>
        </Container>
      </header>

      <section className="section-light py-10 sm:py-14">
        <Container className="max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="card-surface p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900">{MEET_CHRIS.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{MEET_CHRIS.lead}</p>
              <BulletList items={MEET_CHRIS.bullets} />
            </Card>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <Card className="card-surface p-6">
                <h2 className="text-lg font-bold text-slate-900">{MORTGAGE_EXPERIENCE.title}</h2>
                <BulletList items={MORTGAGE_EXPERIENCE.items} />
              </Card>
              <Card className="card-surface p-6">
                <h2 className="text-lg font-bold text-slate-900">{REAL_ESTATE_BACKGROUND.title}</h2>
                <BulletList items={REAL_ESTATE_BACKGROUND.items} />
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-light border-t border-slate-100 py-10 sm:py-14">
        <Container className="max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{WHO_STRATEGY_CALL_IS_FOR.title}</h2>
              <BulletList items={WHO_STRATEGY_CALL_IS_FOR.items} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{WHAT_WE_COVER.title}</h2>
              <BulletList items={WHAT_WE_COVER.items} />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-light border-t border-slate-100 py-10 sm:py-14">
        <Container className="max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{WHY_CLIENTS_USE_TLP.title}</h2>
              <BulletList items={WHY_CLIENTS_USE_TLP.items} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{AFTER_THE_CALL.title}</h2>
              <BulletList items={AFTER_THE_CALL.items} />
            </div>
          </div>
        </Container>
      </section>

      <section
        id="schedule"
        className="section-light border-t border-slate-100 py-10 sm:py-14 scroll-mt-24"
      >
        <Container className="max-w-3xl">
          <CalendarEmbedPlaceholder title={SCHEDULE_STRATEGY_CALL_LABEL} />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={LAUNCH_ANALYZER_HREF} size="md" ctaLocation="strategy-call-analyzer">
              {LAUNCH_ANALYZER_LABEL}
            </CtaLink>
            <CtaLink
              href={PRIMARY_CTA_HREF}
              variant="secondary"
              size="md"
              ctaLocation="strategy-call-playbook"
            >
              {PRIMARY_CTA_LABEL}
            </CtaLink>
          </div>
          <ComplianceNote className="mt-8">{marketingComplianceFooter()}</ComplianceNote>
          <ComplianceNote className="mt-4 text-[11px]">{COMPLIANCE_SHORT}</ComplianceNote>
        </Container>
      </section>

      <FaqSection />
    </>
  );
}
