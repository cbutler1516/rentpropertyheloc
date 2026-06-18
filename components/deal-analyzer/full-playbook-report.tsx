"use client";

import type { FullDealAnalyzerReport } from "@/lib/deal-analyzer/types";
import { BRAND_ASSETS } from "@/lib/brand";
import { SITE_NAME } from "@/lib/site";
import Image from "next/image";

type FullPlaybookReportProps = {
  data: FullDealAnalyzerReport;
};

export function FullPlaybookReport({ data }: FullPlaybookReportProps) {
  const { narrative } = { narrative: data.report.narrativeJson };

  return (
    <div id="playbook-report-print" className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-brand-navy to-slate-900 px-6 py-6 text-white sm:px-8">
        <div className="relative h-8 w-[140px]">
          <Image src={BRAND_ASSETS.dark} alt={SITE_NAME} fill className="object-contain object-left" />
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-teal-300/90">
          Playbook Report
        </p>
        <h2 className="mt-2 text-2xl font-bold">Your financing playbook</h2>
        <p className="mt-2 text-sm text-white/80">Prepared for {data.lead.name}</p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Executive summary</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{narrative.executiveSummary}</p>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Deal snapshot</h3>
          <dl className="mt-3 grid gap-2 sm:grid-cols-2">
            {Object.entries(narrative.dealSnapshot).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{key}</dt>
                <dd className="mt-0.5 text-sm font-medium text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Key metrics</h3>
          <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
            {narrative.keyMetrics.map((m) => (
              <li key={m.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <span className="text-slate-600">{m.label}</span>
                <span className="font-semibold text-slate-900">{m.value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Coach&apos;s Notes</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {narrative.coachesNotes.map((note) => (
              <li key={note} className="flex gap-2">
                <span className="text-teal-600">→</span>
                {note}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Recommended strategy</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{narrative.recommendedStrategy}</p>
        </section>

        <div className="grid gap-6 sm:grid-cols-2">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Risks</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              {narrative.risks.map((r) => (
                <li key={r}>• {r}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Opportunities</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              {narrative.opportunities.map((o) => (
                <li key={o}>• {o}</li>
              ))}
            </ul>
          </section>
        </div>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Next steps</h3>
          <ol className="mt-3 space-y-2 text-sm text-slate-700">
            {narrative.nextSteps.map((step, i) => (
              <li key={step}>
                <span className="font-semibold text-teal-800">{i + 1}.</span> {step}
              </li>
            ))}
          </ol>
        </section>

        <p className="text-[11px] leading-relaxed text-slate-500 border-t border-slate-100 pt-6">
          {narrative.disclaimer}
        </p>
      </div>
    </div>
  );
}

export function printPlaybookReport() {
  window.print();
}
