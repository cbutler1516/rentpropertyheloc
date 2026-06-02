import type { PartialLeadRecord, PartialLeadUpsertInput } from "@/lib/leads/partial-lead-types";

type PartialLeadRow = {
  id?: string;
  session_id: string;
  status: string;
  funnel_version: string;
  property_type: string | null;
  property_value: number | null;
  mortgage_balance: number | null;
  desired_funds: number | null;
  credit_score_range: string | null;
  equity_strategy: string | null;
  property_value_range: string | null;
  mortgage_balance_range: string | null;
  equity_access_range: string | null;
  current_step: number | null;
  journey: string | null;
  source_url: string | null;
  utm_params: Record<string, string> | null;
  query_params: Record<string, string> | null;
  updated_at: string;
  created_at: string;
};

const devPartialStore = new Map<string, PartialLeadRecord>();

function parseQueryMeta(queryParams: Record<string, string> | null | undefined) {
  const qp = queryParams ?? {};
  const completionRaw = qp.completionPercent;
  const abandonedStepRaw = qp.abandonedAtStep;
  return {
    completionPercent:
      completionRaw && Number.isFinite(Number(completionRaw))
        ? Math.min(100, Math.max(0, Math.round(Number(completionRaw))))
        : undefined,
    abandonedAtStep:
      abandonedStepRaw && Number.isFinite(Number(abandonedStepRaw))
        ? Number(abandonedStepRaw)
        : undefined,
    isAbandoned: qp.isAbandoned === "true",
  };
}

function toRow(input: PartialLeadUpsertInput, now: string): PartialLeadRow {
  const queryParams: Record<string, string> = {
    ...(input.queryParams ?? {}),
    leadStatus: "partial",
    noContactInfo: "true",
    noHubSpotSync: "true",
    equityStrategy: input.equityStrategy ?? "",
    completionPercent:
      input.completionPercent != null ? String(input.completionPercent) : "",
    abandonedAtStep:
      input.abandonedAtStep != null ? String(input.abandonedAtStep) : "",
    isAbandoned: input.isAbandoned ? "true" : "false",
  };

  return {
    session_id: input.sessionId,
    status: "partial",
    funnel_version: input.funnelVersion,
    property_type: input.propertyType ?? null,
    property_value: input.propertyValue ?? null,
    mortgage_balance: input.mortgageBalance ?? null,
    desired_funds: input.desiredCashAmount ?? null,
    credit_score_range: input.creditScoreRange ?? null,
    equity_strategy: input.equityStrategy ?? null,
    property_value_range: input.propertyValueRange ?? null,
    mortgage_balance_range: input.mortgageBalanceRange ?? null,
    equity_access_range: input.equityAccessRange ?? null,
    current_step: input.currentStep ?? null,
    journey: input.journey ?? null,
    source_url: input.sourceUrl ?? null,
    utm_params: input.utm ?? null,
    query_params: queryParams,
    updated_at: now,
    created_at: now,
  };
}

function rowToRecord(row: PartialLeadRow): PartialLeadRecord {
  const meta = parseQueryMeta(row.query_params);
  return {
    id: row.id ?? `partial-${row.session_id}`,
    sessionId: row.session_id,
    status: "partial",
    funnelVersion: row.funnel_version,
    propertyType: row.property_type ?? undefined,
    propertyValue: row.property_value ?? undefined,
    mortgageBalance: row.mortgage_balance ?? undefined,
    desiredCashAmount: row.desired_funds ?? undefined,
    creditScoreRange: row.credit_score_range ?? undefined,
    equityStrategy: (row.equity_strategy as PartialLeadRecord["equityStrategy"]) ?? undefined,
    propertyValueRange: row.property_value_range ?? undefined,
    mortgageBalanceRange: row.mortgage_balance_range ?? undefined,
    equityAccessRange: row.equity_access_range ?? undefined,
    currentStep: row.current_step ?? undefined,
    journey: row.journey ?? undefined,
    sourceUrl: row.source_url ?? undefined,
    utm: row.utm_params ?? undefined,
    completionPercent: meta.completionPercent,
    abandonedAtStep: meta.abandonedAtStep,
    isAbandoned: meta.isAbandoned,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
  };
}

async function upsertPartialToSupabase(
  row: PartialLeadRow,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<PartialLeadRecord> {
  const base = supabaseUrl.replace(/\/$/, "");
  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=representation",
  };

  const existing = await fetch(
    `${base}/rest/v1/partial_leads?session_id=eq.${encodeURIComponent(row.session_id)}&select=id,created_at&limit=1`,
    { headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` } },
  );

  let createdAt = row.created_at;
  if (existing.ok) {
    const rows = (await existing.json()) as { id?: string; created_at?: string }[];
    if (rows[0]?.created_at) createdAt = rows[0].created_at;
  }

  const payload = { ...row, created_at: createdAt };

  const response = await fetch(`${base}/rest/v1/partial_leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Supabase partial upsert failed (${response.status})${detail ? `: ${detail.slice(0, 200)}` : ""}`);
  }

  const rows = (await response.json()) as PartialLeadRow[];
  return rowToRecord(rows[0] ?? { ...payload, id: `partial-${row.session_id}` });
}

export async function savePartialLead(input: PartialLeadUpsertInput): Promise<PartialLeadRecord> {
  const now = new Date().toISOString();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceRoleKey) {
    try {
      return await upsertPartialToSupabase(toRow(input, now), supabaseUrl, serviceRoleKey);
    } catch (error) {
      console.warn("[leads] partial Supabase save failed — using dev fallback", error);
    }
  }

  const existing = devPartialStore.get(input.sessionId);
  const record: PartialLeadRecord = {
    id: existing?.id ?? `partial-local-${input.sessionId}`,
    sessionId: input.sessionId,
    status: "partial",
    funnelVersion: input.funnelVersion,
    propertyType: input.propertyType,
    propertyValue: input.propertyValue ?? undefined,
    mortgageBalance: input.mortgageBalance ?? undefined,
    desiredCashAmount: input.desiredCashAmount ?? undefined,
    creditScoreRange: input.creditScoreRange,
    equityStrategy: input.equityStrategy,
    propertyValueRange: input.propertyValueRange,
    mortgageBalanceRange: input.mortgageBalanceRange,
    equityAccessRange: input.equityAccessRange,
    currentStep: input.currentStep,
    journey: input.journey,
    sourceUrl: input.sourceUrl,
    utm: input.utm,
    completionPercent: input.completionPercent,
    abandonedAtStep: input.abandonedAtStep,
    isAbandoned: input.isAbandoned,
    updatedAt: now,
    createdAt: existing?.createdAt ?? now,
  };

  devPartialStore.set(input.sessionId, record);

  if (process.env.NODE_ENV === "development") {
    console.info("[leads] partial saved (local)", {
      sessionId: input.sessionId,
      step: input.currentStep,
      propertyType: input.propertyType,
    });
  }

  return record;
}

export type PartialLeadListResult = {
  partials: PartialLeadRecord[];
  persistenceMode: "supabase" | "local-fallback";
};

export async function listPartialLeads(limit = 100): Promise<PartialLeadListResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const capped = Math.min(Math.max(limit, 1), 500);

  if (supabaseUrl && serviceRoleKey) {
    try {
      const base = supabaseUrl.replace(/\/$/, "");
      const response = await fetch(
        `${base}/rest/v1/partial_leads?select=*&order=updated_at.desc&limit=${capped}`,
        {
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
          },
          cache: "no-store",
        },
      );

      if (response.ok) {
        const rows = (await response.json()) as PartialLeadRow[];
        return {
          partials: rows.map(rowToRecord),
          persistenceMode: "supabase",
        };
      }
    } catch (error) {
      console.warn("[leads] partial list Supabase fetch failed — using local fallback", error);
    }
  }

  const partials = Array.from(devPartialStore.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return {
    partials: partials.slice(0, capped),
    persistenceMode: "local-fallback",
  };
}
