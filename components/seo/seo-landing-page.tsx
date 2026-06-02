import { SeoCtaBand } from "@/components/seo/seo-cta-band";
import { SeoJsonLd } from "@/components/seo/seo-json-ld";
import { SeoPageAnalytics } from "@/components/seo/seo-page-analytics";
import { SeoMarketingSections } from "@/components/marketing/seo-marketing-sections";
import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FooterNavLink } from "@/components/layout/footer-nav-link";
import { CtaLink } from "@/components/ui/cta-link";
import { Card } from "@/components/ui/card";
import { COMPLIANCE_SHORT, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL, NAV_CTA_LABEL } from "@/lib/cta";
import { SEO_PAGES, type SeoPagePath } from "@/lib/seo/pages";
import type { SeoPageConfig } from "@/lib/seo/types";
import { CHECK_OPTIONS_HREF } from "@/lib/site";
import Link from "next/link";

function resolveRelatedLinks(config: SeoPageConfig) {
  return config.relatedPaths
    .map((path) => {
      const page = SEO_PAGES[path as SeoPagePath];
      if (!page) return null;
      return { href: path, label: page.hero.h1 };
    })
    .filter((link): link is { href: string; label: string } => link !== null);
}

export function SeoLandingPage({ config }: { config: SeoPageConfig }) {
  const relatedLinks = resolveRelatedLinks(config);

  return (
    <>
      <SeoPageAnalytics path={config.path} topic={config.hero.eyebrow} />
      <SeoJsonLd config={config} />

      {/* Hero */}
      <header className="section-light border-b border-slate-200/80 py-10 sm:py-14 md:py-16">
        <Container className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
            {config.hero.eyebrow}
          </p>
          <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            {config.hero.h1}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            {config.hero.intro}
          </p>
          {config.hero.highlights && config.hero.highlights.length > 0 ? (
            <ul className="mt-5 space-y-2">
              {config.hero.highlights.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8">
            <CtaLink
              href={PRIMARY_CTA_HREF}
              size="lg"
              className="w-full sm:w-auto"
              ctaLocation="seo-hero"
            >
              {PRIMARY_CTA_LABEL}
            </CtaLink>
          </div>
          <CtaReassurance className="mt-3 max-w-lg" align="left" />
          <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
            Programs may be available, subject to approval. Licensed mortgage professional guidance
            available—this page is educational, not financial advice or a commitment to lend.
          </p>
        </Container>
      </header>

      <SeoCtaBand compact className="md:hidden" ctaLocation="seo-hero-mobile" />

      <SeoMarketingSections />

      {/* What it is */}
      <section className="section-light py-10 sm:py-14" aria-labelledby="what-it-is">
        <Container className="max-w-3xl">
          <h2 id="what-it-is" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {config.whatItIs.title}
          </h2>
          <div className="mt-4 space-y-4">
            {config.whatItIs.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-slate-600 sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Who it fits + use cases */}
      <section className="section-light border-t border-slate-100 py-10 sm:py-14" aria-labelledby="who-it-fits">
        <Container className="max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 id="who-it-fits" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {config.whoItFits.title}
              </h2>
              {config.whoItFits.intro ? (
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {config.whoItFits.intro}
                </p>
              ) : null}
              <ul className="mt-4 space-y-2.5">
                {config.whoItFits.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-500" aria-hidden />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {config.useCases.title}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {config.useCases.items.map((item) => (
                  <li key={item.title}>
                    <Card className="card-surface h-full p-4">
                      <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <SeoCtaBand ctaLocation="seo-mid-page" />

      {/* Process */}
      <section className="section-light py-10 sm:py-14" aria-labelledby="review-process">
        <Container className="max-w-3xl">
          <h2 id="review-process" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {config.process.title}
          </h2>
          {config.process.intro ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {config.process.intro}
            </p>
          ) : null}
          <ol className="mt-6 space-y-4">
            {config.process.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {config.secondPosition ? (
        <section
          className="section-light border-t border-slate-100 py-10 sm:py-14"
          aria-labelledby="second-position"
        >
          <Container className="max-w-3xl">
            <h2 id="second-position" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {config.secondPosition.title}
            </h2>
            <div className="mt-4 space-y-4">
              {config.secondPosition.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sm leading-relaxed text-slate-600 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="section-light border-t border-slate-100 py-10 sm:py-14" aria-labelledby="page-faq">
        <Container className="max-w-3xl">
          <h2 id="page-faq" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Compliance-safe answers for investors exploring rental equity options.
          </p>
          <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
            {config.faqs.map((faq) => (
              <details key={faq.question} className="group px-5 py-5 sm:px-6">
                <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
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

      {/* Related + final CTA */}
      <section className="section-light border-t border-slate-100 py-10 sm:py-14">
        <Container className="max-w-3xl">
          {relatedLinks.length > 0 ? (
            <nav aria-label="Related investor guides" className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Related guides
              </p>
              <ul className="mt-3 space-y-1">
                {relatedLinks.map((link) => (
                  <li key={link.href}>
                    <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                  </li>
                ))}
                <li>
                  <FooterNavLink href={CHECK_OPTIONS_HREF}>{NAV_CTA_LABEL}</FooterNavLink>
                </li>
                <li>
                  <FooterNavLink href="/faq">FAQ</FooterNavLink>
                </li>
              </ul>
            </nav>
          ) : null}

          <SeoCtaBand compact className="!py-0" ctaLocation="seo-footer" />

          <ComplianceNote className="mt-8 max-w-2xl text-left text-[11px] sm:text-xs">
            {COMPLIANCE_SHORT}
          </ComplianceNote>

          <p className="mt-6 text-sm text-slate-500">
            <Link
              href="/"
              className="font-medium text-teal-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              ← Back to home
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
