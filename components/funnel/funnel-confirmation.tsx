"use client";

import { FunnelComplianceNote } from "@/components/funnel/funnel-compliance-note";
import { PostSubmitEnrichment } from "@/components/funnel/post-submit-enrichment";
import {
  CompactReviewSummary,
  EnrichmentAdvisorHelp,
} from "@/components/funnel/enrichment-compact-sidebar";
import { PostSubmitProfileStrength } from "@/components/funnel/gamification/post-submit-profile-strength";
import { ProfileSavedState } from "@/components/funnel/gamification/profile-saved-state";
import {
  BASE_PROFILE_STRENGTH,
  isProfileComplete,
  MAX_PROFILE_STRENGTH,
} from "@/lib/leads/investor-review-gamification";
import {
  getEquityAccessLabel,
  isPriorityReviewFunds,
  type EquityAccessRangeId,
} from "@/lib/leads/funnel-ranges";
import type { PropertyTypeId, RoutingTier } from "@/lib/leads/types";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type FunnelConfirmationProps = {
  propertyType: PropertyTypeId | "";
  leadId?: string;
  routingTier?: RoutingTier;
  propertyStreet: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  equityAccessRange: EquityAccessRangeId | "";
  submittedAt: string;
};

function formatPropertyAddress(
  street: string,
  city: string,
  state: string,
  zip: string,
): string {
  const line2 = [city, state].filter(Boolean).join(", ");
  const line3 = zip ? `${line2} ${zip}`.trim() : line2;
  return [street, line3].filter(Boolean).join(", ");
}

function formatSubmissionDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "Today";
  }
}

export function FunnelConfirmation({
  propertyType: _propertyType,
  leadId,
  routingTier: _routingTier,
  propertyStreet,
  propertyCity,
  propertyState,
  propertyZip,
  equityAccessRange,
  submittedAt,
}: FunnelConfirmationProps) {
  const reduceMotion = useReducedMotion();
  const [profileStrength, setProfileStrength] = useState(BASE_PROFILE_STRENGTH);
  const [profileComplete, setProfileComplete] = useState(false);
  const [enrichmentSaved, setEnrichmentSaved] = useState(false);

  const address = formatPropertyAddress(
    propertyStreet,
    propertyCity,
    propertyState,
    propertyZip,
  );
  const requestedFunds = getEquityAccessLabel(equityAccessRange);
  const showPriority = isPriorityReviewFunds(null, equityAccessRange);
  const submissionDateLabel = formatSubmissionDate(submittedAt);
  const complete = isProfileComplete(profileStrength) || profileComplete;
  const reviewStatus = complete
    ? "Profile Complete — Review In Progress"
    : "Review Started";

  const snapshotContext = {
    propertyAddress: address,
    requestedFunds,
    submissionDate: submissionDateLabel,
    reviewStatus,
    profileStrength: complete ? MAX_PROFILE_STRENGTH : profileStrength,
    priorityReviewActive: showPriority,
    profileComplete: complete,
  };

  if (enrichmentSaved) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-sm lg:rounded-3xl"
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <ProfileSavedState snapshotData={snapshotContext} />
          <div className="mt-6 lg:grid lg:grid-cols-10 lg:gap-6">
            <div className="lg:col-span-3 lg:col-start-8">
              <PostSubmitProfileStrength
                strength={complete ? MAX_PROFILE_STRENGTH : profileStrength}
              />
            </div>
          </div>
        </div>
        <ComplianceFooter />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-sm lg:rounded-3xl lg:shadow-[0_12px_48px_rgba(15,23,42,0.08)]"
    >
      <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <header className="max-w-2xl">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Complete Your Investor Profile
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Help us identify the best financing options for your property.
          </p>
        </header>

        {leadId ? (
          <div className="mt-5 lg:mt-6 lg:grid lg:grid-cols-10 lg:items-start lg:gap-6">
            <div className="min-w-0 lg:col-span-7">
              <PostSubmitEnrichment
                leadId={leadId}
                embedded
                focused
                showPriority={showPriority}
                snapshotContext={{
                  propertyAddress: address,
                  requestedFunds,
                  submissionDate: submissionDateLabel,
                }}
                onProfileStrengthChange={setProfileStrength}
                onProfileComplete={() => setProfileComplete(true)}
                onEnrichmentSaved={() => setEnrichmentSaved(true)}
              />
            </div>

            <aside className="mt-5 space-y-3 lg:col-span-3 lg:mt-0">
              <CompactReviewSummary
                propertyAddress={address}
                requestedFunds={requestedFunds}
                showPriority={showPriority}
              />
              <EnrichmentAdvisorHelp />
            </aside>
          </div>
        ) : null}
      </div>

      <ComplianceFooter />
    </motion.div>
  );
}

function ComplianceFooter() {
  return (
    <div className="border-t border-slate-100 px-5 py-4 sm:px-6 lg:px-8">
      <FunnelComplianceNote />
      <p className="mt-3 text-center">
        <Link
          href="/"
          className="text-xs text-slate-400 underline-offset-2 transition hover:text-slate-600 hover:underline"
        >
          Back to home
        </Link>
      </p>
    </div>
  );
}
