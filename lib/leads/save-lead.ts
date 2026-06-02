import type { ScoredLeadCreateRequest, StoredLead } from "@/lib/leads/types";

type SupabaseLeadRow = {
  id?: string;
  created_at: string;
  journey: string;
  property_type: string;
  property_state: string;
  property_value: number;
  mortgage_balance: number;
  desired_funds: number;
  monthly_rental_income: number;
  estimated_equity: number | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  source_url: string | null;
  source: string;
  query_params: Record<string, string> | null;
  utm_params: Record<string, string> | null;
  quality_score: number;
  quality_tier: string;
  recommended_follow_up: string;
  key_reasons: string[];
};

const devLeadStore: StoredLead[] = [];

export function getDevLeads(): StoredLead[] {
  return [...devLeadStore];
}

function toSupabaseRow(lead: ScoredLeadCreateRequest): SupabaseLeadRow {
  const queryParams: Record<string, string> = {
    ...(lead.queryParams ?? {}),
    funnelVersion: lead.funnelVersion,
    propertyValueRange: lead.propertyValueRange,
    mortgageBalanceRange: lead.mortgageBalanceRange,
    equityAccessRange: lead.equityAccessRange,
    creditScoreRange: lead.creditScoreRange,
    creditScoreEstimate: lead.creditScoreEstimate != null ? String(lead.creditScoreEstimate) : "",
    tcpaConsent: lead.tcpaConsent ? "true" : "false",
    tcpaConsentAt: lead.tcpaConsentAt,
    marketingOptIn: lead.marketingOptIn ? "true" : "false",
    propertyCount: lead.propertyCount,
    fundingTimeline: lead.fundingTimeline,
    propertyRented: lead.propertyRented,
    routingTier: lead.routingTier,
    routingLabel: lead.routingLabel,
    recommendedAction: lead.recommendedAction,
    secondLienFit: lead.secondLienFit,
  };

  return {
    created_at: lead.createdAt,
    journey: lead.journey,
    property_type: lead.propertyType,
    property_state: "",
    property_value: lead.propertyValue ?? 0,
    mortgage_balance: lead.mortgageBalance ?? 0,
    desired_funds: lead.desiredFunds,
    monthly_rental_income: 0,
    estimated_equity: lead.estimatedEquity,
    first_name: lead.firstName,
    last_name: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    source_url: lead.sourceUrl ?? null,
    source: lead.source,
    query_params: queryParams,
    utm_params: lead.utm ?? null,
    quality_score: lead.qualityScore,
    quality_tier: lead.qualityTier,
    recommended_follow_up: lead.recommendedFollowUp,
    key_reasons: lead.keyReasons,
  };
}

function redactLeadForLog(lead: ScoredLeadCreateRequest) {
  return {
    journey: lead.journey,
    funnelVersion: lead.funnelVersion,
    propertyType: lead.propertyType,
    propertyValue: lead.propertyValue,
    mortgageBalance: lead.mortgageBalance,
    desiredFunds: lead.desiredFunds,
    qualityScore: lead.qualityScore,
    qualityTier: lead.qualityTier,
    routingTier: lead.routingTier,
    secondLienFit: lead.secondLienFit,
    tcpaConsent: lead.tcpaConsent,
    marketingOptIn: lead.marketingOptIn,
    source: lead.source,
    createdAt: lead.createdAt,
    emailDomain: lead.email.split("@")[1] ?? "unknown",
    phoneLast4: lead.phone.replace(/\D/g, "").slice(-4) || "****",
  };
}

async function saveLeadToSupabase(
  lead: ScoredLeadCreateRequest,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<{ id: string }> {
  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(toSupabaseRow(lead)),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Supabase insert failed (${response.status})${detail ? `: ${detail}` : ""}`);
  }

  const rows = (await response.json()) as SupabaseLeadRow[];
  const id = rows[0]?.id;

  if (!id) {
    throw new Error("Supabase insert succeeded but no lead id was returned.");
  }

  return { id };
}

export async function saveLead(lead: ScoredLeadCreateRequest): Promise<StoredLead> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceRoleKey) {
    const { id } = await saveLeadToSupabase(lead, supabaseUrl, serviceRoleKey);
    return { ...lead, id };
  }

  const id = `local-${Date.now()}`;
  const stored: StoredLead = { ...lead, id };
  devLeadStore.unshift(stored);

  if (process.env.NODE_ENV === "development") {
    console.info("[leads] saved (local fallback)", redactLeadForLog(lead), { id });
  } else {
    console.warn("[leads] Supabase not configured — lead accepted without persistence", {
      id,
      journey: lead.journey,
    });
  }

  return stored;
}
