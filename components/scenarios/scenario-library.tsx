import { ComplianceNote } from "@/components/layout/compliance-note";
import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import {
  COMPLIANCE_SHORT,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  NAV_CTA_LABEL,
} from "@/lib/cta";
import {
  formatUsd,
} from "@/lib/equity-calculator";
import {
  INVESTOR_SCENARIOS,
  SCENARIO_LIBRARY_DISCLAIMER,
  type InvestorScenario,
} from "@/lib/scenarios/investor-scenarios";
import { FOOTER_LINKS, SITE_URL, type SiteLink } from "@/lib/site";
import Link from "next/link";

type ScenarioLibraryProps = {
  /** When true, show compact hero for embedding on homepage teaser */
  compact?: boolean;
};

export function ScenarioLibrary({ compact = false }: ScenarioLibraryProps) {
  if (compact) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INVESTOR_SCENARIOS.slice(0, 3).map((scenario) => (
          <ScenarioTeaserCard key={scenario.id} scenario={scenario} />
        ))}
      </div>
    );
  }

  const relatedLinks: SiteLink[] = [
    { href: PRIMARY_CTA_HREF, label: NAV_CTA_LABEL },
    ...FOOTER_LINKS.topics.slice(0, 4),
  ];

  return (
    <div className="section-light py-16 sm:py-20 md:py-24">
      <Container className="max-w-5xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
          Investor scenario library
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          Illustrative equity scenarios for rental investors
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Explore how investors might think about available equity across common property types.
          Every example below uses hypothetical numbers—programs, terms, and eligibility are
          subject to approval.
        </p>

        <p className="mt-4 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-xs leading-relaxed text-amber-950 sm:text-sm">
          {SCENARIO_LIBRARY_DISCLAIMER}
        </p>

        <div className="mt-10 grid gap-5 sm:gap-6 lg:grid-cols-2">
          {INVESTOR_SCENARIOS.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            See rate options for your properties
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Run your numbers in ~60 seconds—no obligation.
          </p>
          <div className="mt-6">
            <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="w-full sm:w-auto">
              {PRIMARY_CTA_LABEL}
            </CtaLink>
          </div>
        </div>

        <nav className="mt-10 border-t border-slate-200 pt-8" aria-label="Related pages">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Related pages
          </p>
          <ul className="mt-3 space-y-1">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-teal-700 underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ComplianceNote className="mt-8 text-left">{COMPLIANCE_SHORT}</ComplianceNote>

        <p className="mt-6 text-sm text-slate-500">
          <Link
            href="/"
            className="font-medium text-teal-700 underline-offset-4 hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </Container>
    </div>
  );
}

function ScenarioCard({ scenario }: { scenario: InvestorScenario }) {
  return (
    <article
      id={scenario.id}
      className="card-surface flex h-full flex-col rounded-2xl p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
          {scenario.title}
        </h2>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          Illustrative
        </span>
      </div>
      <p className="mt-1 text-xs font-medium text-teal-700">{scenario.propertyType}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{scenario.summary}</p>

      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 text-sm">
        <Metric label="Property value" value={formatUsd(scenario.propertyValue)} />
        <Metric label="Existing loan" value={formatUsd(scenario.existingLoan)} />
        <Metric label="Estimated equity" value={formatUsd(scenario.estimatedEquity)} />
        <Metric label="Illustrative HELOC range" value={scenario.helocRangeLabel} wide />
      </dl>

      <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          Potential use case
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{scenario.useCase}</p>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
        {scenario.snapshot.illustrativeCltv} · Not an offer or approval amount
      </p>

      {scenario.relatedPath ? (
        <Link
          href={scenario.relatedPath}
          className="mt-4 text-sm font-medium text-teal-700 underline-offset-4 hover:underline"
        >
          Learn more about this property type →
        </Link>
      ) : null}
    </article>
  );
}

function ScenarioTeaserCard({ scenario }: { scenario: InvestorScenario }) {
  return (
    <article className="card-surface flex h-full flex-col rounded-2xl p-5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        Illustrative scenario
      </p>
      <h3 className="mt-1 text-base font-bold text-slate-900">{scenario.title}</h3>
      <p className="mt-2 text-xs text-teal-700">{scenario.propertyType}</p>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">Equity</dt>
          <dd className="font-semibold tabular-nums text-slate-900">
            {formatUsd(scenario.estimatedEquity)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">Use case</dt>
          <dd className="max-w-[58%] text-right text-xs leading-snug text-slate-700">
            {scenario.useCase.split(".")[0]}.
          </dd>
        </div>
      </dl>
    </article>
  );
}

function Metric({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : undefined}>
      <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-0.5 font-semibold tabular-nums text-slate-900">{value}</dd>
    </div>
  );
}

export function scenarioLibraryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Investor Scenario Library",
    description:
      "Illustrative rental property equity scenarios for investors exploring HELOC options.",
    url: `${SITE_URL}/scenarios`,
    hasPart: INVESTOR_SCENARIOS.map((scenario) => ({
      "@type": "CreativeWork",
      name: scenario.title,
      description: scenario.summary,
      url: `${SITE_URL}/scenarios#${scenario.id}`,
    })),
  };
}
