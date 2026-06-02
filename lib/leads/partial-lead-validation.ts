import { isEquityStrategy } from "@/lib/equity-calculator";
import { FUNNEL_VERSION } from "@/lib/leads/funnel-config";
import type { PartialLeadUpsertInput } from "@/lib/leads/partial-lead-types";

export type PartialLeadValidationResult =
  | { valid: true; data: PartialLeadUpsertInput }
  | { valid: false; error: string };

const PII_KEYS = ["email", "phone", "firstName", "lastName", "first_name", "last_name"];

export function validatePartialLeadBody(body: unknown): PartialLeadValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;

  for (const key of PII_KEYS) {
    if (raw[key] != null && String(raw[key]).trim()) {
      return { valid: false, error: "Contact information cannot be saved in partial leads." };
    }
  }

  const sessionId = typeof raw.sessionId === "string" ? raw.sessionId.trim() : "";
  if (!sessionId || sessionId.length < 8 || sessionId.length > 64) {
    return { valid: false, error: "A valid session id is required." };
  }

  const funnelVersion =
    typeof raw.funnelVersion === "string" && raw.funnelVersion.trim()
      ? raw.funnelVersion.trim()
      : FUNNEL_VERSION;

  const data: PartialLeadUpsertInput = {
    sessionId,
    funnelVersion,
    propertyType: parseOptionalString(raw.propertyType),
    propertyValueRange: parseOptionalString(raw.propertyValueRange),
    mortgageBalanceRange: parseOptionalString(raw.mortgageBalanceRange),
    equityAccessRange: parseOptionalString(raw.equityAccessRange),
    creditScoreRange: parseOptionalString(raw.creditScoreRange),
    currentStep: parseOptionalStep(raw.currentStep),
    journey: parseOptionalString(raw.journey),
    sourceUrl: parseOptionalString(raw.sourceUrl),
    utm: parseStringRecord(raw.utm),
    queryParams: parseStringRecord(raw.queryParams),
  };

  const equityStrategyRaw = parseOptionalString(raw.equityStrategy);
  if (equityStrategyRaw && isEquityStrategy(equityStrategyRaw)) {
    data.equityStrategy = equityStrategyRaw;
  }

  data.propertyValue = parseOptionalNumber(raw.propertyValue);
  data.mortgageBalance = parseOptionalNumber(raw.mortgageBalance);
  data.desiredCashAmount = parseOptionalNumber(raw.desiredCashAmount);
  data.completionPercent = parseOptionalPercent(raw.completionPercent);
  data.abandonedAtStep = parseOptionalStep(raw.abandonedAtStep);
  data.isAbandoned = raw.isAbandoned === true || raw.isAbandoned === "true";

  if (!hasMeaningfulPartialData(data)) {
    return { valid: false, error: "At least one funnel field is required for partial save." };
  }

  return { valid: true, data };
}

function hasMeaningfulPartialData(data: PartialLeadUpsertInput): boolean {
  return Boolean(
    data.propertyType ||
      data.propertyValueRange ||
      data.mortgageBalanceRange ||
      data.equityAccessRange ||
      data.creditScoreRange ||
      data.propertyValue != null ||
      data.mortgageBalance != null ||
      data.desiredCashAmount != null,
  );
}

function parseOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function parseOptionalNumber(value: unknown): number | null | undefined {
  if (value == null || value === "") return undefined;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function parseOptionalPercent(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.min(100, Math.max(0, Math.round(value)));
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return Math.min(100, Math.max(0, Math.round(parsed)));
  }
  return undefined;
}

function parseOptionalStep(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  const step = Math.floor(value);
  if (step < 1 || step > 7) return undefined;
  return step;
}

function parseStringRecord(value: unknown): Record<string, string> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const record: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (typeof entry === "string" && entry.trim()) record[key] = entry.trim();
  }
  return Object.keys(record).length > 0 ? record : undefined;
}
