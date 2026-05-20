import {
  CRM_SEQUENCE_KEYS,
  LEAD_CAPTURE_FIELD_KEYS,
  type LeadCaptureConsentCopy,
  type LeadCaptureCrmSequence,
  type LeadCaptureFieldConfig,
  type LeadCaptureRecord,
} from "./types";
import { isLeadCapturePreset } from "./lead-capture-presets";
import { defaultFieldConfigs } from "./lead-capture-fields";

function parseCrmSequence(raw: unknown): LeadCaptureCrmSequence | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const sequence = {} as LeadCaptureCrmSequence;
  for (const key of CRM_SEQUENCE_KEYS) {
    const value = record[key];
    if (typeof value !== "string" || !value.trim()) return null;
    sequence[key] = value.trim();
  }
  return sequence;
}

function parseConsent(raw: unknown): LeadCaptureConsentCopy | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  if (
    typeof record.smsCallConsentCopy !== "string" ||
    typeof record.emailOptInCopy !== "string"
  ) {
    return null;
  }
  return {
    smsCallConsentCopy: record.smsCallConsentCopy.trim(),
    emailOptInCopy: record.emailOptInCopy.trim(),
  };
}

export function parseLeadCaptureAiPayload(
  raw: unknown,
  preset: string,
): Pick<LeadCaptureRecord, "crmSequence" | "consent"> | null {
  if (!isLeadCapturePreset(preset) || !raw || typeof raw !== "object") {
    return null;
  }
  const crmSequence = parseCrmSequence(raw);
  const consent = parseConsent(raw);
  if (!crmSequence || !consent) return null;
  return { crmSequence, consent };
}

export function parseLeadCaptureJson(raw: unknown): LeadCaptureRecord | null {
  if (!raw || typeof raw !== "object") return null;
  const record = raw as Record<string, unknown>;
  const preset =
    typeof record.preset === "string" && isLeadCapturePreset(record.preset)
      ? record.preset
      : null;
  if (!preset) return null;

  const fieldsRaw = record.fields;
  const fields = defaultFieldConfigs(preset);
  if (fieldsRaw && typeof fieldsRaw === "object") {
    for (const key of LEAD_CAPTURE_FIELD_KEYS) {
      const item = (fieldsRaw as Record<string, unknown>)[key];
      if (!item || typeof item !== "object") continue;
      const cfg = item as Record<string, unknown>;
      if (typeof cfg.label === "string") fields[key].label = cfg.label;
      if (typeof cfg.placeholder === "string") {
        fields[key].placeholder = cfg.placeholder;
      }
      if (typeof cfg.enabled === "boolean") fields[key].enabled = cfg.enabled;
      if (typeof cfg.required === "boolean") fields[key].required = cfg.required;
    }
  }

  const crmSequence =
    parseCrmSequence(record.crmSequence) ??
    parseCrmSequence(record);
  const consent =
    parseConsent(record.consent) ?? parseConsent(record);
  if (!crmSequence || !consent) return null;

  return {
    preset,
    fields,
    crmSequence,
    consent,
    generatedAt:
      typeof record.generatedAt === "string"
        ? record.generatedAt
        : new Date().toISOString(),
    modelUsed:
      typeof record.modelUsed === "string" ? record.modelUsed : "demo",
  };
}
