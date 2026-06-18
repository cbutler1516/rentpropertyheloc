import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { FooterNavLink } from "@/components/layout/footer-nav-link";
import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { MortgageProductCtaSection } from "@/components/marketing/mortgage-product-cta-section";
import { PlatformPhoneLink } from "@/components/trust/platform-phone-link";
import { Card } from "@/components/ui/card";
import { QUESTIONS_CALL_TEAM_LABEL } from "@/lib/contact";
import { COMPLIANCE_SHORT } from "@/lib/cta";
import type { MortgageProductConfig } from "@/lib/mortgage-products/types";
import { MORTGAGE_PRODUCTS } from "@/lib/mortgage-products/content";
import { COMMERCIAL_PAGE } from "@/lib/marketing-pages";
import { SEO_PAGES, type SeoPagePath } from "@/lib/seo/pages";
import type { MortgageProductPath } from "@/lib/mortgage-products/content";
import { buildMortgageProductJsonLd } from "@/lib/mortgage-products/schema";
import Link from "next/link";

function resolveRelatedProducts(config: MortgageProductConfig) {
  return config.relatedPaths
    .map((path) => {
      const product = MORTGAGE_PRODUCTS[path as MortgageProductPath];
      if (product) return { href: path, label: product.metadata.title };
      const seo = SEO_PAGES[path as SeoPagePath];
      if (seo) return { href: path, label: seo.metadata.title };
      if (path === COMMERCIAL_PAGE.path) {
        return { href: path, label: COMMERCIAL_PAGE.seo.title };
      }
      return null;
    })
    .filter((link): link is { href: string; label: string } => link !== null);
}

function MortgageProductJsonLd({ config }: { config: MortgageProductConfig }) {
  const graphs = buildMortgageProductJsonLd(config);
  return (
    <>
      {graphs.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}

export function MortgageProductPage({ config }: { config: MortgageProductConfig }) {
  const relatedProducts = resolveRelatedProducts(config);

  return (
    <>
      <MortgageProductJsonLd config={config} />

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
          <MortgageProductCtaSection
            className="mt-8"
            ctaLocationPrefix={`${config.path}-hero`}
            compact
          />
          <CtaReassurance tone="light" className="mt-3 max-w-lg" align="left" />
          <p className="mt-3 text-sm text-slate-600">
            <PlatformPhoneLink size="sm" label={QUESTIONS_CALL_TEAM_LABEL} />
          </p>
        </Container>
      </header>

      <section className="section-light py-10 sm:py-14" aria-labelledby="who-its-for">
        <Container className="max-w-3xl">
          <h2 id="who-its-for" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {config.whoItsFor.title}
          </h2>
          {config.whoItsFor.intro ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {config.whoItsFor.intro}
            </p>
          ) : null}
          <ul className="mt-4 space-y-2.5">
            {config.whoItsFor.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-500" aria-hidden />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        className="section-light border-t border-slate-100 py-10 sm:py-14"
        aria-labelledby="benefits"
      >
        <Container className="max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 id="benefits" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {config.benefits.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {config.benefits.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[10px] font-bold text-teal-800"
                      aria-hidden
                    >
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {config.considerations.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {config.considerations.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" aria-hidden />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-light py-10 sm:py-14" aria-labelledby="scenarios">
        <Container className="max-w-5xl">
          <h2 id="scenarios" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {config.scenarios.title}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.scenarios.items.map((scenario) => (
              <li key={scenario.title}>
                <Card className="card-surface h-full p-4">
                  <h3 className="text-sm font-semibold text-slate-900">{scenario.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{scenario.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <MortgageProductCtaSection
        className="border-y border-slate-200/80 bg-slate-50/50 py-10 sm:py-12"
        ctaLocationPrefix={`${config.path}-mid`}
        title="Ready to compare your options?"
      />

      <section className="section-light py-10 sm:py-14" aria-labelledby="product-faq">
        <Container className="max-w-3xl">
          <h2 id="product-faq" className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Compliance-safe answers — educational only, not financial advice.
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

      <section className="section-light border-t border-slate-100 py-10 sm:py-14">
        <Container className="max-w-3xl">
          {relatedProducts.length > 0 ? (
            <nav aria-label="Related loan programs" className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Related products
              </p>
              <ul className="mt-3 space-y-1">
                {relatedProducts.map((link) => (
                  <li key={link.href}>
                    <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                  </li>
                ))}
                <li>
                  <FooterNavLink href="/mortgage-resources">Mortgage resources hub</FooterNavLink>
                </li>
              </ul>
            </nav>
          ) : null}

          <MortgageProductCtaSection
            ctaLocationPrefix={`${config.path}-footer`}
            title="Build your loan playbook"
            compact
          />

          <ComplianceNote className="mt-8 max-w-2xl text-left text-[11px] sm:text-xs">
            {COMPLIANCE_SHORT}
          </ComplianceNote>

          <p className="mt-6 text-sm text-slate-500">
            <Link
              href="/mortgage-resources"
              className="font-medium text-teal-700 underline-offset-4 hover:underline"
            >
              ← Mortgage resources
            </Link>
            <span className="mx-2 text-slate-300">·</span>
            <Link
              href="/"
              className="font-medium text-teal-700 underline-offset-4 hover:underline"
            >
              Home
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
