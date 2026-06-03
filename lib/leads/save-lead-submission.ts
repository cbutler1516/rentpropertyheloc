import { TCPA_CONSENT_TEXT } from "@/lib/leads/constants";
import { resolveRecommendedProduct } from "@/lib/leads/recommended-product";
import type { ScoredLeadCreateRequest, StoredLead, LeadCreateRequest } from "@/lib/leads/types";
import type { FundingGoalId } from "@/lib/leads/funding-goals";
import { FUNDING_GOAL_OPTIONS } from "@/lib/leads/funding-goals";
import type { LeadSubmissionContext } from "@/lib/leads/submission-context";
import {
  getSupabaseRestBase,
  getSupabaseRestHeaders,
  getSupabaseServiceRoleKey,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { randomUUID } from "crypto";

export type HubSpotSyncStatus = "pending" | "synced" | "failed" | "skipped";

export type LeadSubmissionRecord = {
  id: string;
  createdAt: string;
  submissionId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  propertyState: string | null;
  estimatedPropertyValue: number;
  estimatedMortgageBalance: number;
  desiredHelocAmount: number;
  funnelAnswers: Record<string, unknown>;
  leadScore: number;
  recommendedProduct: string;
  tcpaConsent: boolean;
  tcpaConsentText: string;
  tcpaConsentAt: string;
  ipAddress: string | null;
  userAgent: string | null;
  landingPage: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  hubspotContactId: string | null;
  hubspotSyncStatus: HubSpotSyncStatus;
  hubspotSyncError: string | null;
};

type LeadSubmissionRow = {
  id?: string;
  created_at: string;
  submission_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  property_type: string;
  property_state: string | null;
  estimated_property_value: number;
  estimated_mortgage_balance: number;
  desired_heloc_amount: number;
  funnel_answers: Record<string, unknown>;
  lead_score: number;
  recommended_product: string;
  tcpa_consent: boolean;
  tcpa_consent_text: string;
  tcpa_consent_at: string;
  ip_address: string | null;
  user_agent: string | null;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  hubspot_contact_id: string | null;
  hubspot_sync_status: HubSpotSyncStatus;
  hubspot_sync_error: string | null;
};

const devSubmissionStore = new Map<string, LeadSubmissionRecord>();

function parseFundingGoal(value: unknown): FundingGoalId | "" {
  const raw = typeof value === "string" ? value.trim() : "";
  return FUNDING_GOAL_OPTIONS.some((option) => option.id === raw)
    ? (raw as FundingGoalId)
    : "";
}

export function getDevLeadSubmissions(): LeadSubmissionRecord[] {
  return Array.from(devSubmissionStore.values());
}

export function buildFunnelAnswers(lead: ScoredLeadCreateRequest): Record<string, unknown> {
  return {
    journey: lead.journey,
    funnelVersion: lead.funnelVersion,
    propertyType: lead.propertyType,
    propertyValueRange: lead.propertyValueRange,
    mortgageBalanceRange: lead.mortgageBalanceRange,
    equityAccessRange: lead.equityAccessRange,
    creditScoreRange: lead.creditScoreRange,
    creditScoreEstimate: lead.creditScoreEstimate,
    propertyCount: lead.propertyCount,
    fundingTimeline: lead.fundingTimeline,
    propertyRented: lead.propertyRented,
    propertyStreet: lead.propertyStreet,
    propertyCity: lead.propertyCity,
    propertyState: lead.propertyState,
    propertyZip: lead.propertyZip,
    googlePlaceId: lead.googlePlaceId,
    estimatedEquity: lead.estimatedEquity,
    estimatedHeloc: lead.estimatedHeloc,
    estimatedHelocLow: lead.estimatedHelocLow,
    estimatedHelocHigh: lead.estimatedHelocHigh,
    avmSource: lead.avmSource,
    propertySqft: lead.propertySqft,
    propertyBeds: lead.propertyBeds,
    propertyBaths: lead.propertyBaths,
    propertyYearBuilt: lead.propertyYearBuilt,
    propertyLatitude: lead.propertyLatitude,
    propertyLongitude: lead.propertyLongitude,
    estimatedRent: lead.estimatedRent,
    targetCltvPercent: lead.targetCltvPercent,
    investorScore: lead.investorScore,
    confidenceRating: lead.confidenceRating,
    valuationLastUpdated: lead.valuationLastUpdated,
    propertyValueLow: lead.propertyValueLow,
    propertyValueHigh: lead.propertyValueHigh,
    mortgageBalanceLow: lead.mortgageBalanceLow,
    mortgageBalanceHigh: lead.mortgageBalanceHigh,
    lastSaleDate: lead.lastSaleDate,
    lastSalePrice: lead.lastSalePrice,
    recordedMortgageAmount: lead.recordedMortgageAmount,
    actualMortgageBalance: lead.actualMortgageBalance,
    useMortgageEstimate: lead.useMortgageEstimate,
    fundingGoal: lead.fundingGoal,
    funnelStepCompleted: lead.funnelStepCompleted,
    property_value: lead.propertyValue,
    estimated_equity: lead.estimatedEquity,
    estimated_heloc: lead.estimatedHeloc,
    avm_source: lead.avmSource,
    sqft: lead.propertySqft,
    beds: lead.propertyBeds,
    baths: lead.propertyBaths,
    qualityTier: lead.qualityTier,
    recommendedFollowUp: lead.recommendedFollowUp,
    keyReasons: lead.keyReasons,
    routingTier: lead.routingTier,
    routingLabel: lead.routingLabel,
    recommendedAction: lead.recommendedAction,
    routingReasons: lead.routingReasons,
    routingConfidence: lead.routingConfidence,
    secondLienFit: lead.secondLienFit,
    marketingOptIn: lead.marketingOptIn,
    source: lead.source,
    queryParams: lead.queryParams,
  };
}

function resolvePropertyState(lead: ScoredLeadCreateRequest): string | null {
  if (lead.propertyState?.trim()) return lead.propertyState.trim().toUpperCase();
  const qp = lead.queryParams ?? {};
  const state = qp.property_state?.trim() || qp.propertyState?.trim();
  return state || null;
}

function toSubmissionRow(
  lead: ScoredLeadCreateRequest,
  context: LeadSubmissionContext,
  submissionId: string,
): LeadSubmissionRow {
  const utm = lead.utm ?? {};

  return {
    created_at: lead.createdAt,
    submission_id: submissionId,
    first_name: lead.firstName.trim(),
    last_name: lead.lastName.trim(),
    email: lead.email.trim().toLowerCase(),
    phone: lead.phone.trim(),
    property_type: lead.propertyType,
    property_state: resolvePropertyState(lead),
    estimated_property_value: lead.propertyValue ?? 0,
    estimated_mortgage_balance: lead.mortgageBalance ?? 0,
    desired_heloc_amount: lead.desiredFunds,
    funnel_answers: buildFunnelAnswers(lead),
    lead_score: lead.qualityScore,
    recommended_product: resolveRecommendedProduct(lead),
    tcpa_consent: lead.tcpaConsent,
    tcpa_consent_text: TCPA_CONSENT_TEXT,
    tcpa_consent_at: lead.tcpaConsentAt,
    ip_address: context.ipAddress ?? null,
    user_agent: context.userAgent ?? null,
    landing_page: context.landingPage ?? null,
    referrer: context.referrer ?? null,
    utm_source: utm.utm_source ?? null,
    utm_medium: utm.utm_medium ?? null,
    utm_campaign: utm.utm_campaign ?? null,
    utm_content: utm.utm_content ?? null,
    utm_term: utm.utm_term ?? null,
    hubspot_contact_id: null,
    hubspot_sync_status: "pending",
    hubspot_sync_error: null,
  };
}

function rowToRecord(row: LeadSubmissionRow): LeadSubmissionRecord {
  return {
    id: row.id ?? `submission-${row.submission_id}`,
    createdAt: row.created_at,
    submissionId: row.submission_id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    propertyType: row.property_type,
    propertyState: row.property_state,
    estimatedPropertyValue: row.estimated_property_value,
    estimatedMortgageBalance: row.estimated_mortgage_balance,
    desiredHelocAmount: row.desired_heloc_amount,
    funnelAnswers: row.funnel_answers ?? {},
    leadScore: row.lead_score,
    recommendedProduct: row.recommended_product,
    tcpaConsent: row.tcpa_consent,
    tcpaConsentText: row.tcpa_consent_text,
    tcpaConsentAt: row.tcpa_consent_at,
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
    landingPage: row.landing_page,
    referrer: row.referrer,
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    utmContent: row.utm_content,
    utmTerm: row.utm_term,
    hubspotContactId: row.hubspot_contact_id,
    hubspotSyncStatus: row.hubspot_sync_status,
    hubspotSyncError: row.hubspot_sync_error,
  };
}

function recordFromLead(
  lead: ScoredLeadCreateRequest,
  context: LeadSubmissionContext,
  submissionId: string,
  id: string,
): LeadSubmissionRecord {
  const utm = lead.utm ?? {};
  return {
    id,
    createdAt: lead.createdAt,
    submissionId,
    firstName: lead.firstName.trim(),
    lastName: lead.lastName.trim(),
    email: lead.email.trim().toLowerCase(),
    phone: lead.phone.trim(),
    propertyType: lead.propertyType,
    propertyState: resolvePropertyState(lead),
    estimatedPropertyValue: lead.propertyValue ?? 0,
    estimatedMortgageBalance: lead.mortgageBalance ?? 0,
    desiredHelocAmount: lead.desiredFunds,
    funnelAnswers: buildFunnelAnswers(lead),
    leadScore: lead.qualityScore,
    recommendedProduct: resolveRecommendedProduct(lead),
    tcpaConsent: lead.tcpaConsent,
    tcpaConsentText: TCPA_CONSENT_TEXT,
    tcpaConsentAt: lead.tcpaConsentAt,
    ipAddress: context.ipAddress ?? null,
    userAgent: context.userAgent ?? null,
    landingPage: context.landingPage ?? null,
    referrer: context.referrer ?? null,
    utmSource: utm.utm_source ?? null,
    utmMedium: utm.utm_medium ?? null,
    utmCampaign: utm.utm_campaign ?? null,
    utmContent: utm.utm_content ?? null,
    utmTerm: utm.utm_term ?? null,
    hubspotContactId: null,
    hubspotSyncStatus: "pending",
    hubspotSyncError: null,
  };
}

async function insertSubmissionToSupabase(
  row: LeadSubmissionRow,
  base: string,
  serviceRoleKey: string,
): Promise<LeadSubmissionRecord> {
  const response = await fetch(`${base}/rest/v1/lead_submissions`, {
    method: "POST",
    headers: {
      ...getSupabaseRestHeaders(serviceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Supabase lead_submissions insert failed (${response.status})${detail ? `: ${detail}` : ""}`,
    );
  }

  const rows = (await response.json()) as LeadSubmissionRow[];
  const inserted = rows[0];
  if (!inserted?.id) {
    throw new Error("Supabase insert succeeded but no lead submission id was returned.");
  }

  return rowToRecord(inserted);
}

export async function saveLeadSubmission(
  lead: ScoredLeadCreateRequest,
  context: LeadSubmissionContext = {},
): Promise<LeadSubmissionRecord> {
  const submissionId = randomUUID();
  const row = toSubmissionRow(lead, context, submissionId);

  const base = getSupabaseRestBase();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (base && serviceRoleKey) {
    const record = await insertSubmissionToSupabase(row, base, serviceRoleKey);
    devSubmissionStore.set(record.id, record);
    return record;
  }

  const id = `local-${Date.now()}`;
  const record = recordFromLead(lead, context, submissionId, id);
  devSubmissionStore.set(id, record);

  if (process.env.NODE_ENV === "development") {
    console.info("[leads] lead_submission saved (local fallback)", {
      id,
      submissionId,
      routingTier: lead.routingTier,
      emailDomain: lead.email.split("@")[1],
    });
  } else {
    console.warn("[leads] Supabase not configured — submission accepted without persistence", {
      id,
      submissionId,
    });
  }

  return record;
}

export type HubSpotSyncUpdate = {
  status: HubSpotSyncStatus;
  contactId?: string;
  error?: string;
};

export async function updateLeadSubmissionHubSpotSync(
  submissionDbId: string,
  update: HubSpotSyncUpdate,
): Promise<void> {
  const existing = devSubmissionStore.get(submissionDbId);
  if (existing) {
    devSubmissionStore.set(submissionDbId, {
      ...existing,
      hubspotSyncStatus: update.status,
      hubspotContactId: update.contactId ?? existing.hubspotContactId,
      hubspotSyncError: update.error ?? null,
    });
  }

  const base = getSupabaseRestBase();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  if (!base || !serviceRoleKey) return;

  const patchBody: Partial<LeadSubmissionRow> = {
    hubspot_sync_status: update.status,
    hubspot_sync_error: update.error ?? null,
  };

  if (update.contactId) {
    patchBody.hubspot_contact_id = update.contactId;
  }

  try {
    const response = await fetch(
      `${base}/rest/v1/lead_submissions?id=eq.${encodeURIComponent(submissionDbId)}`,
      {
        method: "PATCH",
        headers: getSupabaseRestHeaders(serviceRoleKey),
        body: JSON.stringify(patchBody),
      },
    );

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn("[leads] failed to update hubspot sync status on lead_submissions", {
        submissionDbId,
        status: response.status,
        detail: detail.slice(0, 300),
      });
    }
  } catch (error) {
    console.warn("[leads] hubspot sync status update error", { submissionDbId, error });
  }
}

export function leadSubmissionToStoredLead(
  submission: LeadSubmissionRecord,
  lead: ScoredLeadCreateRequest,
): StoredLead {
  return { ...lead, id: submission.id };
}

export type LeadSubmissionListResult = {
  submissions: LeadSubmissionRecord[];
  persistenceMode: "supabase" | "local-fallback";
};

export async function listLeadSubmissions(limit = 100): Promise<LeadSubmissionListResult> {
  const capped = Math.min(Math.max(limit, 1), 500);
  const base = getSupabaseRestBase();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (base && serviceRoleKey) {
    try {
      const response = await fetch(
        `${base}/rest/v1/lead_submissions?select=*&order=created_at.desc&limit=${capped}`,
        {
          headers: getSupabaseRestHeaders(serviceRoleKey),
          cache: "no-store",
        },
      );

      if (response.ok) {
        const rows = (await response.json()) as LeadSubmissionRow[];
        return {
          submissions: rows.map(rowToRecord),
          persistenceMode: "supabase",
        };
      }
    } catch (error) {
      console.warn("[leads] lead_submissions list failed — using local fallback", error);
    }
  }

  const submissions = Array.from(devSubmissionStore.values())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, capped);

  return {
    submissions,
    persistenceMode: "local-fallback",
  };
}

export { isSupabaseConfigured as isLeadSubmissionStorageConfigured };

export async function getLeadSubmissionById(
  id: string,
): Promise<LeadSubmissionRecord | null> {
  const local = devSubmissionStore.get(id);
  if (local) return local;

  const base = getSupabaseRestBase();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  if (!base || !serviceRoleKey) return null;

  try {
    const response = await fetch(
      `${base}/rest/v1/lead_submissions?id=eq.${encodeURIComponent(id)}&limit=1`,
      {
        headers: getSupabaseRestHeaders(serviceRoleKey),
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const rows = (await response.json()) as LeadSubmissionRow[];
    return rows[0] ? rowToRecord(rows[0]) : null;
  } catch {
    return null;
  }
}

export function submissionToLeadCreateRequest(submission: LeadSubmissionRecord): LeadCreateRequest {
  const fa = submission.funnelAnswers;
  const propertyValue =
    submission.estimatedPropertyValue > 0 ? submission.estimatedPropertyValue : null;
  const mortgageBalance =
    submission.estimatedMortgageBalance > 0 ? submission.estimatedMortgageBalance : null;

  return {
    journey: String(fa.journey ?? "sfr"),
    funnelVersion: String(fa.funnelVersion ?? "v5-minimal-capture-2026"),
    propertyType: (submission.propertyType || String(fa.propertyType ?? "")) as LeadCreateRequest["propertyType"],
    propertyValueRange: String(fa.propertyValueRange ?? ""),
    mortgageBalanceRange: String(fa.mortgageBalanceRange ?? ""),
    equityAccessRange: String(fa.equityAccessRange ?? ""),
    creditScoreRange: String(fa.creditScoreRange ?? ""),
    propertyCount: String(fa.propertyCount ?? ""),
    fundingTimeline: String(fa.fundingTimeline ?? ""),
    propertyRented: String(fa.propertyRented ?? ""),
    propertyStreet: String(fa.propertyStreet ?? ""),
    propertyCity: String(fa.propertyCity ?? ""),
    propertyState: String(fa.propertyState ?? submission.propertyState ?? ""),
    propertyZip: String(fa.propertyZip ?? ""),
    googlePlaceId: String(fa.googlePlaceId ?? ""),
    propertyValue,
    mortgageBalance,
    desiredFunds: submission.desiredHelocAmount,
    estimatedEquity: typeof fa.estimatedEquity === "number" ? fa.estimatedEquity : null,
    estimatedHeloc: typeof fa.estimatedHeloc === "number" ? fa.estimatedHeloc : null,
    estimatedHelocLow:
      typeof fa.estimatedHelocLow === "number" ? fa.estimatedHelocLow : null,
    estimatedHelocHigh:
      typeof fa.estimatedHelocHigh === "number" ? fa.estimatedHelocHigh : null,
    avmSource: typeof fa.avmSource === "string" ? fa.avmSource : "",
    propertySqft: typeof fa.propertySqft === "number" ? fa.propertySqft : null,
    propertyBeds: typeof fa.propertyBeds === "number" ? fa.propertyBeds : null,
    propertyBaths: typeof fa.propertyBaths === "number" ? fa.propertyBaths : null,
    propertyYearBuilt:
      typeof fa.propertyYearBuilt === "number" ? fa.propertyYearBuilt : null,
    propertyLatitude:
      typeof fa.propertyLatitude === "number" ? fa.propertyLatitude : null,
    propertyLongitude:
      typeof fa.propertyLongitude === "number" ? fa.propertyLongitude : null,
    estimatedRent: typeof fa.estimatedRent === "number" ? fa.estimatedRent : null,
    propertyValueLow:
      typeof fa.propertyValueLow === "number" ? fa.propertyValueLow : null,
    propertyValueHigh:
      typeof fa.propertyValueHigh === "number" ? fa.propertyValueHigh : null,
    mortgageBalanceLow:
      typeof fa.mortgageBalanceLow === "number" ? fa.mortgageBalanceLow : null,
    mortgageBalanceHigh:
      typeof fa.mortgageBalanceHigh === "number" ? fa.mortgageBalanceHigh : null,
    lastSaleDate: typeof fa.lastSaleDate === "string" ? fa.lastSaleDate : "",
    lastSalePrice: typeof fa.lastSalePrice === "number" ? fa.lastSalePrice : null,
    recordedMortgageAmount:
      typeof fa.recordedMortgageAmount === "number" ? fa.recordedMortgageAmount : null,
    actualMortgageBalance:
      typeof fa.actualMortgageBalance === "number" ? fa.actualMortgageBalance : null,
    useMortgageEstimate: fa.useMortgageEstimate !== false,
    fundingGoal: parseFundingGoal(fa.fundingGoal),
    funnelStepCompleted:
      typeof fa.funnelStepCompleted === "number" ? fa.funnelStepCompleted : 0,
    targetCltvPercent:
      typeof fa.targetCltvPercent === "number" ? fa.targetCltvPercent : 75,
    investorScore: typeof fa.investorScore === "number" ? fa.investorScore : null,
    confidenceRating:
      typeof fa.confidenceRating === "string" ? fa.confidenceRating : "",
    valuationLastUpdated:
      typeof fa.valuationLastUpdated === "string" ? fa.valuationLastUpdated : "",
    creditScoreEstimate:
      typeof fa.creditScoreEstimate === "number" ? fa.creditScoreEstimate : null,
    firstName: submission.firstName,
    lastName: submission.lastName,
    email: submission.email,
    phone: submission.phone,
    tcpaConsent: submission.tcpaConsent,
    tcpaConsentAt: submission.tcpaConsentAt,
    marketingOptIn: fa.marketingOptIn === true,
    sourceUrl: submission.landingPage ?? undefined,
    queryParams:
      fa.queryParams && typeof fa.queryParams === "object"
        ? (fa.queryParams as Record<string, string>)
        : undefined,
    utm: {
      ...(submission.utmSource ? { utm_source: submission.utmSource } : {}),
      ...(submission.utmMedium ? { utm_medium: submission.utmMedium } : {}),
      ...(submission.utmCampaign ? { utm_campaign: submission.utmCampaign } : {}),
      ...(submission.utmContent ? { utm_content: submission.utmContent } : {}),
      ...(submission.utmTerm ? { utm_term: submission.utmTerm } : {}),
    },
    createdAt: submission.createdAt,
    source: String(fa.source ?? "check-options-funnel"),
  };
}

export async function updateLeadSubmissionAfterEnrichment(
  submissionDbId: string,
  lead: ScoredLeadCreateRequest,
): Promise<void> {
  const funnelAnswers = buildFunnelAnswers(lead);
  funnelAnswers.enrichmentCompletedAt = new Date().toISOString();

  const existing = devSubmissionStore.get(submissionDbId);
  if (existing) {
    devSubmissionStore.set(submissionDbId, {
      ...existing,
      propertyType: lead.propertyType,
      propertyState: resolvePropertyState(lead),
      estimatedPropertyValue: lead.propertyValue ?? 0,
      estimatedMortgageBalance: lead.mortgageBalance ?? 0,
      desiredHelocAmount: lead.desiredFunds,
      funnelAnswers,
      leadScore: lead.qualityScore,
      recommendedProduct: resolveRecommendedProduct(lead),
    });
  }

  const base = getSupabaseRestBase();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  if (!base || !serviceRoleKey) return;

  try {
    const response = await fetch(
      `${base}/rest/v1/lead_submissions?id=eq.${encodeURIComponent(submissionDbId)}`,
      {
        method: "PATCH",
        headers: getSupabaseRestHeaders(serviceRoleKey),
        body: JSON.stringify({
          property_type: lead.propertyType,
          property_state: resolvePropertyState(lead),
          estimated_property_value: lead.propertyValue ?? 0,
          estimated_mortgage_balance: lead.mortgageBalance ?? 0,
          desired_heloc_amount: lead.desiredFunds,
          funnel_answers: funnelAnswers,
          lead_score: lead.qualityScore,
          recommended_product: resolveRecommendedProduct(lead),
        }),
      },
    );

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn("[leads] enrichment update failed", {
        submissionDbId,
        status: response.status,
        detail: detail.slice(0, 300),
      });
    }
  } catch (error) {
    console.warn("[leads] enrichment update error", { submissionDbId, error });
  }
}
