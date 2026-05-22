"use client";

import { useMemo, useState } from "react";
import { CAPITAL_PATH_META, propertyTypeOptions } from "../lib/form-options";
import {
  LEAD_QUALITY_LABELS,
  LEAD_QUALITY_TAGS,
} from "../lib/lead-quality";
import { LEAD_SOURCE_LABELS } from "../lib/leads";
import { ccmAccentLabel, ccmPanelElevated } from "../lib/ccm-ui";
import type { CcmLeadRecord, LeadQualityTag, LeadStatus } from "../lib/types";
import { LeadDetailPanel } from "./lead-detail-panel";
import { useCcm } from "./ccm-provider";

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

type FilterKey = "all" | LeadQualityTag | "archived";

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hot", label: LEAD_QUALITY_LABELS.hot },
  { key: "lender-ready", label: LEAD_QUALITY_LABELS["lender-ready"] },
  { key: "docs-needed", label: LEAD_QUALITY_LABELS["docs-needed"] },
  { key: "needs-review", label: LEAD_QUALITY_LABELS["needs-review"] },
  { key: "archived", label: "Archived" },
];

const qualityStyles: Record<LeadQualityTag, string> = {
  hot: "bg-[#c9a227]/15 text-[#e8c547] ring-[#c9a227]/30",
  "needs-review": "bg-[#7c3aed]/10 text-[#c4b5fd] ring-[#7c3aed]/30",
  "docs-needed": "bg-amber-500/10 text-amber-200 ring-amber-500/25",
  "lender-ready": "bg-emerald-500/10 text-emerald-300 ring-emerald-500/25",
};

export function AdminLeadsDashboard() {
  const {
    leads,
    updateLeadQuality,
    updateLeadNotes,
    markLeadReviewed,
    markLeadDocsNeeded,
    markLeadLenderReady,
    archiveLead,
    clearAll,
    hydrated,
  } = useCcm();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") {
      return leads.filter((l) => l.status !== "archived");
    }
    if (filter === "archived") {
      return leads.filter((l) => l.status === "archived");
    }
    return leads.filter(
      (l) => l.qualityTag === filter && l.status !== "archived",
    );
  }, [leads, filter]);

  const selectedLead = useMemo(
    () => leads.find((l) => l.id === selectedId) ?? null,
    [leads, selectedId],
  );

  const counts = useMemo(() => {
    const base: Record<FilterKey, number> = {
      all: leads.filter((l) => l.status !== "archived").length,
      hot: 0,
      "lender-ready": 0,
      "docs-needed": 0,
      "needs-review": 0,
      archived: 0,
    };
    for (const lead of leads) {
      if (lead.status === "archived") {
        base.archived += 1;
      } else {
        base[lead.qualityTag] += 1;
      }
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
            Click a row for source, contact, documents, and local notes. Status
            actions sync to your browser until CRM is connected.
          </p>
        </div>
        {leads.length > 0 ? (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear all local leads and session data?")) {
                clearAll();
                setSelectedId(null);
              }
            }}
            className="rounded-full px-5 py-2.5 font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase ring-1 ring-white/10 transition hover:text-red-300 hover:ring-red-500/30"
          >
            Clear local data
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTER_OPTIONS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.14em] uppercase transition ${
              filter === key
                ? "bg-[#7c3aed]/20 text-[#e9d5ff] ring-1 ring-[#7c3aed]/40"
                : "bg-white/[0.04] text-zinc-500 ring-1 ring-white/[0.06] hover:text-zinc-300"
            }`}
          >
            {label} ({counts[key]})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={`${ccmPanelElevated} p-12 text-center`}>
          <p className="text-lg font-medium text-white">No leads in this view</p>
          <p className="mt-2 text-sm text-zinc-500">
            Complete intake or submit a strategy review to populate the pipeline.
          </p>
        </div>
      ) : (
        <div className={`${ccmPanelElevated} overflow-x-auto`}>
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase">
              <tr className="border-b border-white/[0.06]">
                <th className="px-6 py-4 font-normal">Sponsor</th>
                <th className="px-6 py-4 font-normal">Source</th>
                <th className="px-6 py-4 font-normal">Deal</th>
                <th className="px-6 py-4 font-normal">Path</th>
                <th className="px-6 py-4 font-normal">Quality</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() =>
                    setSelectedId((id) => (id === lead.id ? null : lead.id))
                  }
                  className={`cursor-pointer border-b border-white/[0.04] transition hover:bg-white/[0.03] ${
                    selectedId === lead.id ? "bg-[#7c3aed]/10" : ""
                  }`}
                >
                  <td className="px-6 py-5 align-top">
                    <p className="font-medium text-white">
                      {lead.intake.sponsorName || "—"}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {lead.intake.sponsorEmail}
                    </p>
                  </td>
                  <td className="px-6 py-5 align-top text-xs text-zinc-500">
                    {LEAD_SOURCE_LABELS[lead.source]}
                  </td>
                  <td className="px-6 py-5 align-top text-zinc-400">
                    {lead.strategyReview?.transactionType ??
                      (lead.intake.propertyType
                        ? labelFor(propertyTypeOptions, lead.intake.propertyType)
                        : "—")}
                  </td>
                  <td className="px-6 py-5 align-top text-zinc-300">
                    {lead.recommendation
                      ? CAPITAL_PATH_META[lead.recommendation.primaryPath].label
                      : "—"}
                  </td>
                  <td className="px-6 py-5 align-top">
                    <span
                      className={`inline-block rounded-full px-3 py-1 font-mono text-[9px] tracking-[0.12em] uppercase ring-1 ${qualityStyles[lead.qualityTag]}`}
                    >
                      {LEAD_QUALITY_LABELS[lead.qualityTag]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedLead ? (
        <LeadDetailPanel
          lead={selectedLead}
          onNotesChange={(notes) => updateLeadNotes(selectedLead.id, notes)}
          onQualityChange={(tag) => updateLeadQuality(selectedLead.id, tag)}
          onMarkReviewed={() => markLeadReviewed(selectedLead.id)}
          onMarkDocsNeeded={() => markLeadDocsNeeded(selectedLead.id)}
          onMarkLenderReady={() => markLeadLenderReady(selectedLead.id)}
          onArchive={() => archiveLead(selectedLead.id)}
          onClose={() => setSelectedId(null)}
        />
      ) : null}
    </div>
  );
}
