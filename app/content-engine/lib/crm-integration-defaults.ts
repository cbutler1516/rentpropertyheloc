import type { CrmProvider } from "./crm-providers";
import {
  LEAD_CAPTURE_FIELD_KEYS,
  type CrmActivityLogEntry,
  type CrmAutomationSettings,
  type CrmConnectionPublic,
  type CrmFieldMapping,
  type CrmIntegrationRecord,
  type LeadCaptureFieldKey,
  type LeadCaptureRecord,
  type LaunchHubRecord,
} from "./types";

const DEFAULT_CRM_FIELD_IDS: Record<LeadCaptureFieldKey, string> = {
  firstName: "first_name",
  lastName: "last_name",
  email: "email",
  phone: "phone",
  buyerTimeline: "buyer_timeline",
  loanTypeInterest: "loan_type_interest",
  purchasePriceOrLoanAmount: "purchase_price_or_loan_amount",
  creditRange: "credit_range",
  agentStatus: "agent_status",
  notes: "lead_notes",
  smsCallConsent: "sms_call_consent",
  emailOptIn: "email_opt_in",
};

export function defaultFieldMappings(
  leadCapture?: LeadCaptureRecord | null,
): CrmFieldMapping[] {
  return LEAD_CAPTURE_FIELD_KEYS.map((field) => {
    const enabled = leadCapture?.fields[field]?.enabled ?? true;
    return {
      leadCaptureField: field,
      crmFieldId: DEFAULT_CRM_FIELD_IDS[field],
      enabled,
    };
  });
}

export function defaultAutomations(
  launchHub?: LaunchHubRecord | null,
): CrmAutomationSettings {
  const crmTag = launchHub?.fields?.crmTag?.trim();
  return {
    pushFromLandingPage: true,
    autoTags: [
      "content_engine",
      crmTag || "loan_playbook_lead",
    ].filter(Boolean),
    createOpportunity: true,
    opportunityPipeline: "Mortgage pipeline",
    opportunityStage: "New lead",
    assignedLoanOfficer: "",
    triggerWorkflowId: "",
    triggerCampaignId: "",
    createTasks: true,
    taskReminderDays: 1,
    pushUtmSource: true,
  };
}

export function emptyConnections(): CrmConnectionPublic[] {
  return [];
}

export function createDefaultCrmIntegration(input?: {
  leadCapture?: LeadCaptureRecord | null;
  launchHub?: LaunchHubRecord | null;
  activeProvider?: CrmProvider;
}): CrmIntegrationRecord {
  return {
    activeProvider: input?.activeProvider ?? "gohighlevel",
    fieldMappings: defaultFieldMappings(input?.leadCapture),
    automations: defaultAutomations(input?.launchHub),
    connections: emptyConnections(),
    activityLog: [],
    updatedAt: new Date().toISOString(),
  };
}

export function appendActivityLog(
  log: CrmActivityLogEntry[],
  entry: Omit<CrmActivityLogEntry, "id" | "at">,
  max = 50,
): CrmActivityLogEntry[] {
  const next: CrmActivityLogEntry = {
    ...entry,
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
  };
  return [next, ...log].slice(0, max);
}
