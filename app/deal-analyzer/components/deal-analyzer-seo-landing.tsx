import Link from "next/link";
import { JsonLd } from "@/app/components/json-ld";
import { Card, CardDescription, CardHeader } from "@/app/components/ui/card";
import type { PartnerAgent } from "../lib/agent-types";
import { getSeoLandingContent } from "../lib/seo-landing-content";
import { DEAL_ANALYZER_DISCLAIMER } from "../lib/constants";
import {
  buildFaqJsonLd,
  getAnalyzeHref,
  getPartnerAnalyzeHref,
  getPartnerSeoLandingHref,
  getSeoLandingHref,
  type SeoLandingContent,
} from "../lib/seo-landing-content";
import { PartnerSeoLandingAnalytics } from "./partner-seo-landing-analytics";
import { PartnerSeoLandingHeader } from "./partner-seo-landing-header";

type DealAnalyzerSeoLandingProps = {
  content: SeoLandingContent;
  partner?: {
    agent: PartnerAgent;
    agentSlug: string;
  };
};

export function DealAnalyzerSeoLanding({
  content,
  partner,
}: DealAnalyzerSeoLandingProps) {
  const analyzeHref = partner
    ? getPartnerAnalyzeHref(partner.agentSlug, content.analyzerPath)
    : getAnalyzeHref(content.analyzerPath);

  const related = content.relatedSlugs.map((slug) => ({
    slug,
    href: partner
      ? getPartnerSeoLandingHref(partner.agentSlug, slug)
      : getSeoLandingHref(slug),
    label: getSeoLandingContent(slug).navLabel,
  }));

  const calculatorsHubHref = partner
    ? `/partners/${partner.agentSlug}/deal-analyzer/analyze`
    : "/deal-analyzer";

  return (
    <>
      <JsonLd data={buildFaqJsonLd(content.faq)} />
      {partner ? (
        <PartnerSeoLandingAnalytics
          agentId={partner.agent.id}
          referralCode={partner.agent.referralCode}
          agentSlug={partner.agentSlug}
          calculatorSlug={content.slug}
        />
      ) : null}

      <article className="space-y-20 pb-8">
        {partner ? (
          <PartnerSeoLandingHeader
            agent={partner.agent}
            calculatorLabel={content.navLabel}
          />
        ) : null}

        <section className="max-w-3xl space-y-6">
          <p className="font-mono text-[10px] tracking-[0.32em] text-[#c9a227] uppercase">
            {content.hero.eyebrow}
          </p>
          <h1 className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
            {content.hero.title}
          </h1>
          <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
            {content.hero.lead}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={analyzeHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#c9a227] to-[#e8c547] px-8 font-mono text-[11px] tracking-[0.16em] text-black uppercase hover:brightness-110"
            >
              {content.hero.ctaLabel}
            </Link>
            <Link
              href={calculatorsHubHref}
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 px-6 font-mono text-[10px] tracking-[0.16em] text-zinc-300 uppercase hover:border-[#7c3aed]/50"
            >
              {partner ? "All partner calculators" : "All calculators"}
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/40 p-8">
            <h2 className="text-xl font-medium text-white">{content.problem.title}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-400">
              {content.problem.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c3aed]"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#7c3aed]/25 bg-[#7c3aed]/10 p-8">
            <h2 className="text-xl font-medium text-white">{content.solution.title}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-300">
              {content.solution.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a227]"
                    aria-hidden
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-medium text-white">
            {content.calculatorShows.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.calculatorShows.items.map((item) => (
              <Card key={item}>
                <CardHeader className="pb-4">
                  <CardDescription className="text-sm leading-relaxed text-zinc-400">
                    {item}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#c9a227]/20 bg-gradient-to-br from-[#c9a227]/10 via-transparent to-[#7c3aed]/10 p-8 md:p-10">
          <p className="font-mono text-[9px] tracking-[0.24em] text-[#c9a227] uppercase">
            Example scenario
          </p>
          <h2 className="mt-3 text-2xl font-medium text-white">
            {content.exampleScenario.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {content.exampleScenario.setup}
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {content.exampleScenario.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/[0.06] bg-[#030712]/60 px-5 py-4"
              >
                <dt className="font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase">
                  {metric.label}
                </dt>
                <dd className="mt-2 text-lg font-medium text-white">{metric.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-xs text-zinc-500">
            Illustrative only. Run your own numbers in the analyzer—results depend on your
            inputs and program.
          </p>
          <Link
            href={analyzeHref}
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-[#c9a227]/40 px-6 font-mono text-[10px] tracking-[0.16em] text-[#e8c547] uppercase hover:border-[#c9a227]"
          >
            Run this scenario type →
          </Link>
        </section>

        <section className="rounded-2xl border border-white/[0.08] bg-zinc-900/30 px-8 py-10 text-center">
          <h2 className="text-2xl font-medium text-white">Ready to model your deal?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
            Your path is preselected. Enter your numbers, then unlock a Playbook Report for
            your strategy conversation.
          </p>
          <Link
            href={analyzeHref}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] px-8 font-mono text-[11px] tracking-[0.16em] text-white uppercase hover:brightness-110"
          >
            {content.hero.ctaLabel}
          </Link>
        </section>

        <section className="space-y-6" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-medium text-white">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {content.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/[0.08] bg-zinc-900/40 px-6 py-4 open:border-[#7c3aed]/30"
              >
                <summary className="cursor-pointer list-none text-base font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span
                      className="font-mono text-[10px] text-zinc-500 transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-white">Related calculators</h2>
          <nav
            className="flex flex-wrap gap-2"
            aria-label="Related Deal Analyzer calculators"
          >
            {related.map((link) => (
              <Link
                key={link.slug}
                href={link.href}
                className="rounded-full border border-zinc-700 px-4 py-2 font-mono text-[9px] tracking-[0.14em] text-zinc-400 uppercase transition-colors hover:border-[#7c3aed]/50 hover:text-zinc-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </section>

        <section
          className="rounded-xl border border-white/[0.06] bg-zinc-950/80 px-6 py-6"
          aria-label="Compliance disclaimer"
        >
          <h2 className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
            Important disclosures
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-zinc-500">
            {DEAL_ANALYZER_DISCLAIMER} Calculators and reports do not constitute financial,
            tax, or legal advice. Only a licensed loan officer can provide official quotes,
            disclosures, and approval to lend. Equal Housing Lender.
          </p>
        </section>
      </article>
    </>
  );
}
