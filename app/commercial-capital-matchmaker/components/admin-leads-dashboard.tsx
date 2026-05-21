"use client";

import { useMemo, useState } from "react";
import {
  CAPITAL_PATH_META,
  dealPurposeOptions,
  loanAmountOptions,
  propertyTypeOptions,
} from "../lib/form-options";
import {
  LEAD_QUALITY_LABELS,
  LEAD_QUALITY_TAGS,
} from "../lib/lead-quality";
import { ccmAccentLabel, ccmPanel, ccmPanelElevated } from "../lib/ccm-ui";
import type { CcmLeadRecord, LeadQualityTag } from "../lib/types";
import { useCcm } from "./ccm-provider";

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

const qualityStyles: Record<LeadQualityTag, string> = {
  hot: "bg-[#c9a227]/15 text-[#e8c547] ring-[#c9a227]/30",
  "needs-review": "bg-[#7c3aed]/10 text-[#c4b5fd] ring-[#7c3aed]/30",
  "docs-needed": "bg-amber-500/10 text-amber-200 ring-amber-500/25",
  "lender-ready": "bg-emerald-500/10 text-emerald-300 ring-emerald-500/25",
};

export function AdminLeadsDashboard() {
  const { leads, updateLeadQuality, clearAll, hydrated } = useCcm();
  const [filter, setFilter] = useState<LeadQualityTag | "all">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return leads;
    return leads.filter((lead) => lead.qualityTag === filter);
  }, [leads, filter]);

  const counts = useMemo(() => {
    const base: Record<LeadQualityTag | "all", number> = {
      all: leads.length,
      hot: 0,
      "needs-review": 0,
      "docs-needed": 0,
      "lender-ready": 0,
    };
    for (const lead of leads) {
      base[lead.qualityTag] += 1;
    }
    return base;
  }, [leads]);

  if (!hydrated) {
    return <p className="text-sm text-zinc-500">Loading pipeline…</p>;
  }

  return (
    <div className="space-y-12 md:space-y-14">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl space-y-4">
          <p className={ccmAccentLabel}>Advisor pipeline · local</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Commercial capital leads
          </h1>
          <p className="text-base leading-relaxed text-zinc-400">
            Boutique dashboard view for Chris / Broadview follow-up. Stored in
            your browser until CRM is connected.
          </p>
        </div>
        {leads.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear all local leads and session data?")) {
                clearAll();
              }
            }}
            className="rounded-full px-5 py-2.5 font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase ring-1 ring-white/10 transition hover:text-red-300 hover:ring-red-500/30"
          >
            Clear local data
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(["all", ...LEAD_QUALITY_TAGS] as const).map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setFilter(tag)}
            className={`${ccmPanel} p-6 text-left transition ${
              filter === tag ? "ring-[#7c3aed]/40" : "hover:ring-white/10"
            }`}
          >
            <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              {tag === "all" ? "All leads" : LEAD_QUALITY_LABELS[tag]}
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">{counts[tag]}</p>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={`${ccmPanelElevated} p-12 text-center`}>
          <p className="text-lg font-medium text-white">No leads in this view</p>
          <p className="mt-2 text-sm text-zinc-500">
            Run a deal through intake to populate the pipeline.
          </p>
        </div>
      ) : (
        <div className={`${ccmPanelElevated} overflow-x-auto`}>
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase">
              <tr className="border-b border-white/[0.06]">
                <th className="px-6 py-4 font-normal">Sponsor</th>
                <th className="px-6 py-4 font-normal">Deal</th>
                <th className="px-6 py-4 font-normal">Primary path</th>
                <th className="px-6 py-4 font-normal">Quality</th>
                <th className="px-6 py-4 font-normal">Recommended follow-up</th>
                <th className="px-6 py-4 font-normal">Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <LeadRow
                  key={lead.id}
                  lead={lead}
                  onQualityChange={(tag) => updateLeadQuality(lead.id, tag)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LeadRow({
  lead,
  onQualityChange,
}: {
  lead: CcmLeadRecord;
  onQualityChange: (tag: LeadQualityTag) => void;
}) {
  const { intake, recommendation } = lead;
  const created = new Date(lead.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <tr className="border-b border-white/[0.04] transition hover:bg-white/[0.02]">
      <td className="px-6 py-5 align-top">
        <p className="font-medium text-white">{intake.sponsorName}</p>
        <p className="text-xs text-zinc-500">{intake.sponsorEmail}</p>
        {intake.companyName ? (
          <p className="text-xs text-zinc-600">{intake.companyName}</p>
        ) : null}
      </td>
      <td className="px-6 py-5 align-top text-zinc-400">
        {labelFor(propertyTypeOptions, intake.propertyType)}
        <br />
        <span className="text-zinc-500">
          {labelFor(dealPurposeOptions, intake.dealPurpose)}
        </span>
        <br />
        <span className="text-xs text-zinc-600">
          {labelFor(loanAmountOptions, intake.loanAmountRange)}
        </span>
      </td>
      <td className="px-6 py-5 align-top text-zinc-300">
        {CAPITAL_PATH_META[recommendation.primaryPath].label}
        <p className="mt-1 text-xs text-zinc-600">
          Fit {recommendation.capitalFitScore} · {lead.matchCount} lanes
        </p>
      </td>
      <td className="px-6 py-5 align-top">
        <select
          value={lead.qualityTag}
          onChange={(e) => onQualityChange(e.target.value as LeadQualityTag)}
          className={`rounded-full px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] uppercase ring-1 outline-none ${qualityStyles[lead.qualityTag]}`}
        >
          {LEAD_QUALITY_TAGS.map((tag) => (
            <option key={tag} value={tag} className="bg-zinc-900 text-white">
              {LEAD_QUALITY_LABELS[tag]}
            </option>
          ))}
        </select>
      </td>
      <td className="max-w-xs px-6 py-5 align-top text-sm leading-relaxed text-zinc-400">
        {lead.recommendedFollowUp}
      </td>
      <td className="px-6 py-5 align-top text-xs text-zinc-600">{created}</td>
    </tr>
  );
}
