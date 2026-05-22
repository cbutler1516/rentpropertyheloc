"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  ccmAccentLabel,
  ccmBtnGhost,
  ccmBtnPrimary,
  ccmGoldLabel,
  ccmPanelElevated,
} from "../lib/ccm-ui";
import { BroadviewReviewCta } from "./broadview-review-cta";
import { CcmCtaBand } from "./ccm-cta-band";
import { useCcm } from "./ccm-provider";

export function ExecutiveSummaryView() {
  const router = useRouter();
  const { hydrated, summary } = useCcm();

  useEffect(() => {
    if (hydrated && !summary) {
      router.replace("/commercial-capital-matchmaker/intake");
    }
  }, [hydrated, summary, router]);

  if (!hydrated || !summary) {
    return <p className="text-sm text-zinc-500">Preparing executive summary…</p>;
  }

  const generatedDate = new Date(summary.generatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-14 md:space-y-16">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl space-y-4">
          <p className={ccmGoldLabel}>Lender-facing package</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {summary.dealTitle}
          </h1>
          <p className="text-sm text-zinc-400">
            {summary.preparedFor} · {generatedDate}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/commercial-capital-matchmaker/results"
            className={ccmBtnGhost}
          >
            Back to capital strategy
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className={ccmBtnPrimary}
          >
            Print memo
          </button>
        </div>
      </div>

      <article
        className={`${ccmPanelElevated} overflow-hidden print:bg-white print:text-black print:shadow-none`}
      >
        <header className="space-y-6 border-b border-white/[0.06] bg-gradient-to-r from-[#7c3aed]/10 to-transparent px-8 py-10 md:px-14 md:py-12 print:border-zinc-200 print:bg-transparent">
          <p className="font-mono text-[11px] tracking-[0.32em] text-[#c9a227] uppercase print:text-amber-800">
            {summary.memoClassification}
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-zinc-300 print:text-zinc-800">
            {summary.advisorOpening}
          </p>
          <p className="max-w-3xl text-xs leading-relaxed text-zinc-500 print:text-zinc-600">
            {summary.informationDisclaimer}
          </p>
        </header>

        <div className="border-b border-white/[0.06] px-8 py-8 md:px-14 print:border-zinc-200">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
                Prepared by
              </p>
              <p className="mt-2 text-lg font-medium text-white print:text-black">
                {summary.preparedBy.name}
              </p>
              <p className="text-sm text-zinc-400 print:text-zinc-700">
                {summary.preparedBy.organization}
              </p>
              <p className="text-xs text-zinc-500 print:text-zinc-600">
                {summary.preparedBy.role}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
                Prepared for
              </p>
              <p className="mt-2 text-lg font-medium text-white print:text-black">
                {summary.preparedFor}
              </p>
            </div>
          </div>
        </div>

        <section className="space-y-5 px-8 py-10 md:px-14 print:py-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase print:text-zinc-600">
            Deal snapshot
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(summary.snapshot).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <dt className="font-mono text-[9px] tracking-[0.16em] text-zinc-600 uppercase">
                  {key.replace(/([A-Z])/g, " $1")}
                </dt>
                <dd className="text-sm text-zinc-200 print:text-black">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-4 bg-white/[0.02] px-8 py-10 md:px-14 print:bg-transparent print:py-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] text-[#7c3aed] uppercase print:text-violet-800">
            Likely capital path
          </h2>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-white print:text-black">
            {summary.likelyCapitalPath}
          </p>
        </section>

        <section className="grid gap-10 px-8 py-10 md:grid-cols-2 md:px-14 md:py-12 print:py-8">
          <div className="space-y-4">
            <h2 className="font-mono text-[10px] tracking-[0.22em] text-[#c9a227] uppercase">
              Strengths
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-400 print:text-zinc-700">
              {summary.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
              Lender concerns
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-zinc-500 print:text-zinc-700">
              {summary.lenderConcerns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4 px-8 py-10 md:px-14 print:py-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
            Suggested structure
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-400 print:text-zinc-800">
            {summary.suggestedStructure.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>

        <section className="space-y-4 px-8 py-10 md:px-14 print:py-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] text-zinc-500 uppercase">
            Document checklist
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-zinc-400 print:text-zinc-700">
            {summary.documentChecklist.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-zinc-600" aria-hidden>
                  □
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 bg-gradient-to-r from-[#c9a227]/10 to-transparent px-8 py-10 md:px-14 print:bg-transparent print:py-8">
          <h2 className={ccmAccentLabel}>Broadview recommendation</h2>
          <p className="max-w-3xl text-base leading-relaxed text-zinc-300 print:text-zinc-800">
            {summary.broadviewRecommendation}
          </p>
        </section>

        <footer className="space-y-4 border-t border-white/[0.06] px-8 py-8 md:px-14 print:border-zinc-200">
          <p className="text-xs leading-relaxed text-zinc-600 print:text-zinc-500">
            {summary.disclaimer}
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase print:text-zinc-600">
            {summary.footerLine}
          </p>
        </footer>
      </article>

      <BroadviewReviewCta sendDealHref="/commercial-capital-matchmaker/strategy-review?source=memo-cta" />

      <CcmCtaBand location="summary" variant="compact" />
    </div>
  );
}
