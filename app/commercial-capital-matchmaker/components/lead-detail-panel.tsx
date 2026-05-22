"use client";

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
import { LEAD_SOURCE_LABELS, LEAD_STATUS_LABELS } from "../lib/leads";
import {
  ccmAccentLabel,
  ccmBtnGhost,
  ccmGoldLabel,
  ccmPanel,
  ccmPanelElevated,
} from "../lib/ccm-ui";
import type { CcmLeadRecord, LeadQualityTag } from "../lib/types";

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

type LeadDetailPanelProps = {
  lead: CcmLeadRecord;
  onNotesChange: (notes: string) => void;
  onQualityChange: (tag: LeadQualityTag) => void;
  onMarkReviewed: () => void;
  onMarkDocsNeeded: () => void;
  onMarkLenderReady: () => void;
  onArchive: () => void;
  onClose: () => void;
};

export function LeadDetailPanel({
  lead,
  onNotesChange,
  onQualityChange,
  onMarkReviewed,
  onMarkDocsNeeded,
  onMarkLenderReady,
  onArchive,
  onClose,
}: LeadDetailPanelProps) {
  const { intake, recommendation, strategyReview } = lead;
  const contactPhone = strategyReview?.phone;

  return (
    <div className={`${ccmPanelElevated} space-y-8 p-8 md:p-10`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className={ccmGoldLabel}>Lead detail</p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            {intake.sponsorName || "Unnamed lead"}
          </h2>
          <p className="text-sm text-zinc-500">{intake.sponsorEmail}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase ring-1 ring-white/10 hover:text-white"
        >
          Close
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className={`${ccmPanel} p-4`}>
          <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
            Source
          </p>
          <p className="mt-2 text-sm text-zinc-200">
            {LEAD_SOURCE_LABELS[lead.source]}
          </p>
        </div>
        <div className={`${ccmPanel} p-4`}>
          <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
            Status
          </p>
          <p className="mt-2 text-sm text-zinc-200">
            {LEAD_STATUS_LABELS[lead.status]}
          </p>
        </div>
        <div className={`${ccmPanel} p-4`}>
          <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
            Created
          </p>
          <p className="mt-2 text-xs text-zinc-400">{formatDate(lead.createdAt)}</p>
        </div>
        <div className={`${ccmPanel} p-4`}>
          <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
            Last updated
          </p>
          <p className="mt-2 text-xs text-zinc-400">
            {formatDate(lead.lastUpdatedAt)}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className={ccmAccentLabel}>Contact</h3>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-zinc-500">Email</dt>
            <dd className="text-zinc-200">{intake.sponsorEmail || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Phone</dt>
            <dd className="text-zinc-200">{contactPhone || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Company</dt>
            <dd className="text-zinc-200">{intake.companyName || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Quality tag</dt>
            <dd>
              <select
                value={lead.qualityTag}
                onChange={(e) =>
                  onQualityChange(e.target.value as LeadQualityTag)
                }
                className="mt-1 rounded-full bg-white/[0.04] px-3 py-1 font-mono text-[9px] tracking-[0.12em] text-zinc-300 uppercase ring-1 ring-white/10 outline-none"
              >
                {LEAD_QUALITY_TAGS.map((tag) => (
                  <option key={tag} value={tag} className="bg-zinc-900">
                    {LEAD_QUALITY_LABELS[tag]}
                  </option>
                ))}
              </select>
            </dd>
          </div>
        </dl>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className={ccmAccentLabel}>Deal snapshot</h3>
          <dl className="space-y-3 text-sm">
            {strategyReview?.propertyAddress ? (
              <div>
                <dt className="text-zinc-500">Address</dt>
                <dd className="text-zinc-300">{strategyReview.propertyAddress}</dd>
              </div>
            ) : null}
            {strategyReview?.transactionType ? (
              <div>
                <dt className="text-zinc-500">Transaction</dt>
                <dd className="text-zinc-300">{strategyReview.transactionType}</dd>
              </div>
            ) : null}
            {intake.propertyType ? (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Asset</dt>
                <dd className="text-zinc-200">
                  {labelFor(propertyTypeOptions, intake.propertyType)}
                </dd>
              </div>
            ) : null}
            {intake.dealPurpose ? (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Purpose</dt>
                <dd className="text-zinc-200">
                  {labelFor(dealPurposeOptions, intake.dealPurpose)}
                </dd>
              </div>
            ) : null}
            {intake.loanAmountRange ? (
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Loan range</dt>
                <dd className="text-zinc-200">
                  {labelFor(loanAmountOptions, intake.loanAmountRange)}
                </dd>
              </div>
            ) : null}
            {strategyReview?.estimatedValue ? (
              <div>
                <dt className="text-zinc-500">Est. value</dt>
                <dd className="text-zinc-300">{strategyReview.estimatedValue}</dd>
              </div>
            ) : null}
            {strategyReview?.requestedLoanAmount ? (
              <div>
                <dt className="text-zinc-500">Loan request</dt>
                <dd className="text-zinc-300">
                  {strategyReview.requestedLoanAmount}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="space-y-4">
          <h3 className={ccmAccentLabel}>Recommended path</h3>
          {recommendation ? (
            <>
              <p className="text-lg font-medium text-white">
                {CAPITAL_PATH_META[recommendation.primaryPath].label}
              </p>
              <p className="text-sm text-zinc-500">
                Fit {recommendation.capitalFitScore} · {recommendation.confidence}
              </p>
            </>
          ) : (
            <p className="text-sm text-zinc-500">
              Awaiting intake analysis or manual path assignment.
            </p>
          )}
        </div>
      </div>

      {(intake.dealNotes || strategyReview?.notes) && (
        <div className="space-y-3">
          <h3 className={ccmAccentLabel}>Deal notes</h3>
          <p className="text-sm leading-relaxed text-zinc-400 whitespace-pre-wrap">
            {strategyReview?.notes || intake.dealNotes}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <h3 className={ccmAccentLabel}>Recommended next action</h3>
        <p className="text-sm leading-relaxed text-zinc-300">
          {lead.recommendedFollowUp}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-mono text-[10px] tracking-[0.22em] text-amber-400/90 uppercase">
          Missing documents
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {lead.missingDocuments.map((doc) => (
            <li
              key={doc}
              className="rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-zinc-400 ring-1 ring-white/[0.05]"
            >
              {doc}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={onMarkReviewed} className={ccmBtnGhost}>
          Mark reviewed
        </button>
        <button type="button" onClick={onMarkDocsNeeded} className={ccmBtnGhost}>
          Mark docs needed
        </button>
        <button type="button" onClick={onMarkLenderReady} className={ccmBtnGhost}>
          Mark lender-ready
        </button>
        <button
          type="button"
          onClick={onArchive}
          className="rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-zinc-500 uppercase ring-1 ring-white/10 hover:text-red-300"
        >
          Archive
        </button>
      </div>

      <div className="space-y-3">
        <label className={ccmAccentLabel} htmlFor="lead-notes">
          Advisor notes (local only)
        </label>
        <textarea
          id="lead-notes"
          value={lead.notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Call notes, lender targets, outreach log…"
          className="input-glow min-h-[120px] w-full resize-y rounded-2xl bg-white/[0.03] px-5 py-4 text-sm text-white ring-1 ring-white/[0.08] outline-none placeholder:text-zinc-600 focus:ring-[#7c3aed]/50"
        />
      </div>
    </div>
  );
}
