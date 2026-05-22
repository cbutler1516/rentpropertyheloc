"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CAPITAL_PATH_META } from "../lib/form-options";
import {
  LAW_FIRM_DEAL_FACTS,
  LAW_FIRM_SAMPLE_INTAKE,
} from "../lib/sample-strategy";
import {
  ccmAccentLabel,
  ccmBtnGhost,
  ccmBtnPrimary,
  ccmBtnSecondary,
  ccmGoldLabel,
  ccmPanel,
  ccmPanelElevated,
  ccmPanelGold,
} from "../lib/ccm-ui";
import { CcmCtaBand } from "./ccm-cta-band";
import { useCcm } from "./ccm-provider";
import { CapitalMatchCard } from "./capital-match-card";

export function SampleStrategyView() {
  const { loadSampleStrategy, hydrated, recommendation, matches, summary } =
    useCcm();

  useEffect(() => {
    loadSampleStrategy();
  }, [loadSampleStrategy]);

  if (!hydrated || !recommendation || !summary) {
    return (
      <p className="text-sm text-zinc-500">Loading sample capital strategy…</p>
    );
  }

  const primaryMeta = CAPITAL_PATH_META[recommendation.primaryPath];
  const secondaryMeta = recommendation.secondaryPath
    ? CAPITAL_PATH_META[recommendation.secondaryPath]
    : null;

  return (
    <div className="space-y-16 md:space-y-20">
      <div className="space-y-6">
        <p className={ccmGoldLabel}>Sample capital strategy</p>
        <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
          {LAW_FIRM_DEAL_FACTS.scenario}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
          Illustrative preliminary strategy for{" "}
          <span className="text-zinc-200">{LAW_FIRM_SAMPLE_INTAKE.companyName}</span>
          . See how Broadview frames owner-user SBA and bank paths before you run
          your own deal.
        </p>
        <p className="rounded-full bg-[#7c3aed]/10 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-[#c4b5fd] uppercase ring-1 ring-[#7c3aed]/25 w-fit">
          Example only · Not your deal
        </p>
      </div>

      <section className={`${ccmPanelElevated} grid gap-8 p-8 md:grid-cols-2 md:p-12 lg:grid-cols-4`}>
        {[
          { label: "Purchase price", value: LAW_FIRM_DEAL_FACTS.purchasePrice },
          { label: "Loan request", value: LAW_FIRM_DEAL_FACTS.loanRequest },
          { label: "Occupancy", value: LAW_FIRM_DEAL_FACTS.occupancy },
          { label: "Market", value: LAW_FIRM_DEAL_FACTS.location },
        ].map((item) => (
          <div key={item.label}>
            <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-medium text-white md:text-base">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className={`${ccmPanelGold} space-y-8 p-8 md:p-12`}>
        <div>
          <p className={ccmAccentLabel}>Preliminary capital strategy</p>
          <p className="mt-4 text-5xl font-semibold text-white">
            {recommendation.capitalFitScore}
            <span className="ml-2 text-lg font-normal text-zinc-500">
              Capital Fit Score
            </span>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Recommended path
            </p>
            <p className="mt-2 text-xl font-medium text-white">
              SBA 504 + conventional interim structure
            </p>
            <p className="mt-2 text-sm text-zinc-400">{primaryMeta.typicalUse}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Secondary path
            </p>
            <p className="mt-2 text-xl font-medium text-white">
              Regional bank owner-user loan
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              {secondaryMeta?.label ?? "Bank portfolio"} — quoted in parallel
            </p>
          </div>
        </div>

        <div className={`${ccmPanel} p-6`}>
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#c9a227] uppercase">
            Broadview recommendation
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            {summary.broadviewRecommendation}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <p className={ccmAccentLabel}>Lender concerns for this scenario</p>
        <ul className={`${ccmPanelElevated} space-y-3 p-8 md:p-10`}>
          {recommendation.risks.map((risk) => (
            <li
              key={risk}
              className="flex gap-3 text-sm leading-relaxed text-zinc-400"
            >
              <span className="text-[#7c3aed]" aria-hidden>
                —
              </span>
              {risk}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <p className={ccmGoldLabel}>Illustrative lender lanes</p>
        <div className="grid gap-6">
          {matches.map((match, index) => (
            <CapitalMatchCard key={match.id} match={match} rank={index + 1} />
          ))}
        </div>
      </section>

      <div className={`${ccmPanelElevated} flex flex-wrap gap-3 p-8 md:p-10`}>
        <Link href="/commercial-capital-matchmaker/intake" className={ccmBtnPrimary}>
          Analyze My Deal
        </Link>
        <Link
          href="/commercial-capital-matchmaker/results"
          className={ccmBtnSecondary}
        >
          Open full strategy view
        </Link>
        <Link
          href="/commercial-capital-matchmaker/summary"
          className={ccmBtnGhost}
        >
          View executive memo
        </Link>
      </div>

      <CcmCtaBand location="sample" variant="compact" />
    </div>
  );
}
