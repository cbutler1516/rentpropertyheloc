import { isCrmProvider, type CrmProvider } from "./crm-providers";
import { createDefaultCrmIntegration } from "./crm-integration-defaults";
import {
  LEAD_CAPTURE_FIELD_KEYS,
  type CrmActivityLogEntry,
  type CrmActivityType,
  type CrmAutomationSettings,
  type CrmConnectionPublic,
  type CrmFieldMapping,
  type CrmIntegrationRecord,
  type LeadCaptureFieldKey,
} from "./types";

const ACTIVITY_TYPES: CrmActivityType[] = [
  "lead_pushed",
  "workflow_triggered",
  "error",
  "retry",
];

function parseFieldMappings(raw: unknown): CrmFieldMapping[] | null {
  if (!Array.isArray(raw)) return null;
  const mappings: CrmFieldMapping[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const field = record.leadCaptureField;
    const crmFieldId = record.crmFieldId;
    if (
      typeof field !== "string" ||
      !LEAD_CAPTURE_FIELD_KEYS.includes(field as LeadCaptureFieldKey) ||
      typeof crmFieldId !== "string"
    ) {
      continue;
    }
    mappings.push({
      leadCaptureField: field as LeadCaptureFieldKey,
      crmFieldId,
      enabled: record.enabled !== false,
    });
  }
  return mappings.length ? mappings : null;
}

function parseAutomations(raw: unknown): CrmAutomationSettings | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  return {
    pushFromLandingPage: r.pushFromLandingPage !== false,
    autoTags: Array.isArray(r.autoTags)
      ? r.autoTags.filter((t): t is string => typeof t === "string")
      : [],
    createOpportunity: r.createOpportunity === true,
    opportunityPipeline:
      typeof r.opportunityPipeline === "string" ? r.opportunityPipeline : "",
    opportunityStage:
      typeof r.opportunityStage === "string" ? r.opportunityStage : "",
    assignedLoanOfficer:
      typeof r.assignedLoanOfficer === "string" ? r.assignedLoanOfficer : "",
    triggerWorkflowId:
      typeof r.triggerWorkflowId === "string" ? r.triggerWorkflowId : "",
    triggerCampaignId:
      typeof r.triggerCampaignId === "string" ? r.triggerCampaignId : "",
    createTasks: r.createTasks !== false,
    taskReminderDays:
      typeof r.taskReminderDays === "number" ? r.taskReminderDays : 1,
    pushUtmSource: r.pushUtmSource !== false,
  };
}

function parseConnections(raw: unknown): CrmConnectionPublic[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item): CrmConnectionPublic | null => {
      if (!item || typeof item !== "object") return null;
      const r = item as Record<string, unknown>;
      if (typeof r.provider !== "string" || !isCrmProvider(r.provider)) {
        return null;
      }
      return {
        provider: r.provider,
        connected: r.connected === true,
        credentialHint:
          typeof r.credentialHint === "string" ? r.credentialHint : undefined,
        lastVerifiedAt:
          typeof r.lastVerifiedAt === "string" ? r.lastVerifiedAt : undefined,
      };
    })
    .filter((c): c is CrmConnectionPublic => c !== null);
}

function parseActivityLog(raw: unknown): CrmActivityLogEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item): CrmActivityLogEntry | null => {
      if (!item || typeof item !== "object") return null;
      const r = item as Record<string, unknown>;
      if (
        typeof r.id !== "string" ||
        typeof r.at !== "string" ||
        typeof r.type !== "string" ||
        !ACTIVITY_TYPES.includes(r.type as CrmActivityType) ||
        typeof r.provider !== "string" ||
        !isCrmProvider(r.provider) ||
        typeof r.message !== "string" ||
        typeof r.success !== "boolean"
      ) {
        return null;
      }
      return {
        id: r.id,
        at: r.at,
        type: r.type as CrmActivityType,
        provider: r.provider as CrmProvider,
        message: r.message,
        success: r.success,
        leadEmail: typeof r.leadEmail === "string" ? r.leadEmail : undefined,
        retryable: r.retryable === true,
        relatedEntryId:
          typeof r.relatedEntryId === "string" ? r.relatedEntryId : undefined,
      };
    })
    .filter((e): e is CrmActivityLogEntry => e !== null);
}

export function parseCrmIntegrationJson(
  raw: unknown,
): CrmIntegrationRecord | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as Record<string, unknown>;
  const activeProvider =
    typeof record.activeProvider === "string" &&
    isCrmProvider(record.activeProvider)
      ? record.activeProvider
      : "gohighlevel";

  const defaults = createDefaultCrmIntegration({ activeProvider });
  const fieldMappings =
    parseFieldMappings(record.fieldMappings) ?? defaults.fieldMappings;
  const automations =
    parseAutomations(record.automations) ?? defaults.automations;

  return {
    activeProvider,
    fieldMappings,
    automations,
    connections: parseConnections(record.connections),
    activityLog: parseActivityLog(record.activityLog),
    updatedAt:
      typeof record.updatedAt === "string"
        ? record.updatedAt
        : new Date().toISOString(),
  };
}

/** Strip any credential-like keys that must never persist in package JSON. */
export function sanitizeCrmIntegrationForClient(
  record: CrmIntegrationRecord,
): CrmIntegrationRecord {
  return {
    ...record,
    connections: record.connections.map((c) => ({
      provider: c.provider,
      connected: c.connected,
      credentialHint: c.credentialHint,
      lastVerifiedAt: c.lastVerifiedAt,
    })),
  };
}
