"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CAPITAL_PATH_META } from "../lib/form-options";
import {
  ccmAccentLabel,
  ccmBtnGhost,
  ccmBtnPrimary,
  ccmGoldLabel,
  ccmPanel,
  ccmPanelElevated,
  ccmPanelGold,
} from "../lib/ccm-ui";
import { CcmCtaBand } from "./ccm-cta-band";
import { useCcm } from "./ccm-provider";
import { CapitalMatchCard } from "./capital-match-card";

export function ResultsView() {
  const router = useRouter();
  const { hydrated, recommendation, matches, intake } = useCcm();

  useEffect(() => {
    if (hydrated && !recommendation) {
      router.replace("/commercial-capital-matchmaker/intake");
    }
  }, [hydrated, recommendation, router]);

  if (!hydrated || !recommendation) {
    return (
      <p className="text-sm text-zinc-500">Preparing your capital strategy…</p>
    );
  }

  const primaryMeta = CAPITAL_PATH_META[recommendation.primaryPath];
  const secondaryMeta = recommendation.secondaryPath
    ? CAPITAL_PATH_META[recommendation.secondaryPath]
    : null;

  return (
    <div className="space-y-16 md:space-y-20">
      <div className="max-w-3xl space-y-5">
        <p className={ccmAccentLabel}>Capital Strategy</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Your preliminary capital strategy
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          {intake.sponsorName
            ? `Prepared for ${intake.sponsorName}${intake.companyName ? ` · ${intake.companyName}` : ""}.`
            : "Based on your deal profile."}{" "}
          Illustrative lender categories ranked for fit—confirm with Broadview before outreach.
        </p>
      </div>

      <section className={`${ccmPanelGold} grid gap-8 p-8 md:grid-cols-2 md:gap-10 md:p-12 lg:grid-cols-3`}>
        <div className="space-y-2 lg:col-span-1">
          <p className={ccmGoldLabel}>Capital Fit Score</p>
          <p className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
            {recommendation.capitalFitScore}
          </p>
          <p className="text-xs text-zinc-500">Preliminary fit · not a credit score</p>
        </div>

        <div className="space-y-6 md:col-span-1 lg:col-span-2">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                Primary recommended path
              </p>
              <p className="mt-2 text-lg font-medium text-white">{primaryMeta.label}</p>
              <p className="mt-1 text-sm text-zinc-500">{primaryMeta.tagline}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                Secondary path
              </p>
              <p className="mt-2 text-lg font-medium text-white">
                {secondaryMeta?.label ?? "Validate on outreach"}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                {secondaryMeta?.tagline ?? "Run one parallel quote lane for comparison."}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className={`${ccmPanel} p-5`}>
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                Key lender concern
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {recommendation.keyLenderConcern}
              </p>
            </div>
            <div className={`${ccmPanel} p-5`}>
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#c9a227] uppercase">
                Best next step
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {recommendation.bestNextStep}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/commercial-capital-matchmaker/summary" className={ccmBtnPrimary}>
          View Executive Summary
        </Link>
        <Link href="/commercial-capital-matchmaker/intake" className={ccmBtnGhost}>
          Refine deal profile
        </Link>
      </div>

      <section className="space-y-4">
        <div className="max-w-2xl space-y-2">
          <p className={ccmAccentLabel}>Strategy read</p>
          <p className="text-base leading-relaxed text-zinc-400">
            {recommendation.headline}
          </p>
        </div>
        <div className={`${ccmPanelElevated} p-8 md:p-10`}>
          <ul className="space-y-3 text-sm leading-relaxed text-zinc-400">
            {recommendation.rationale.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[#7c3aed]" aria-hidden>
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-zinc-500">{recommendation.timingFit}</p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={ccmGoldLabel}>Lender categories</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Ranked for your deal profile
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Representative lanes—not live quotes. Broadview confirms appetite and terms.
            </p>
          </div>
          <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
            {matches.length} categories
          </p>
        </div>
        <div className="grid gap-6">
          {matches.map((match, index) => (
            <CapitalMatchCard key={match.id} match={match} rank={index + 1} />
          ))}
        </div>
      </section>

      <CcmCtaBand location="results" variant="compact" />
    </div>
  );
}
