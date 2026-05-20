import type { CrmProvider } from "./crm-providers";
import { loadCrmCredentials } from "./crm-credentials-store";
import type {
  CrmAutomationSettings,
  CrmFieldMapping,
  CrmIntegrationRecord,
  CrmTestLeadPayload,
} from "./types";

export type CrmPushResult = {
  success: boolean;
  mode: "live" | "demo";
  message: string;
  workflowTriggered?: boolean;
};

function mapLeadToPayload(
  lead: CrmTestLeadPayload,
  mappings: CrmFieldMapping[],
  automations: CrmAutomationSettings,
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  const leadRecord = lead as Record<string, unknown>;

  for (const mapping of mappings) {
    if (!mapping.enabled) continue;
    const value = leadRecord[mapping.leadCaptureField];
    if (value !== undefined && value !== "") {
      payload[mapping.crmFieldId] = value;
    }
  }

  if (automations.autoTags.length) {
    payload.tags = automations.autoTags;
  }
  if (automations.assignedLoanOfficer) {
    payload.assigned_loan_officer = automations.assignedLoanOfficer;
  }
  if (automations.createOpportunity) {
    payload.opportunity = {
      pipeline: automations.opportunityPipeline,
      stage: automations.opportunityStage,
    };
  }
  if (automations.triggerWorkflowId) {
    payload.workflow_id = automations.triggerWorkflowId;
  }
  if (automations.triggerCampaignId) {
    payload.campaign_id = automations.triggerCampaignId;
  }
  if (automations.createTasks) {
    payload.task_reminder_days = automations.taskReminderDays;
  }
  if (automations.pushUtmSource) {
    payload.utm_source = lead.utmSource;
    payload.utm_medium = lead.utmMedium;
    payload.utm_campaign = lead.utmCampaign;
  }

  payload.source = "content_engine";
  return payload;
}

async function pushToZapier(
  webhookUrl: string,
  payload: Record<string, unknown>,
): Promise<CrmPushResult> {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    return {
      success: false,
      mode: "live",
      message: `Zapier webhook returned ${response.status}.`,
    };
  }
  return {
    success: true,
    mode: "live",
    message: "Lead posted to Zapier webhook.",
    workflowTriggered: true,
  };
}

async function pushToGoHighLevel(
  apiKey: string,
  locationId: string,
  lead: CrmTestLeadPayload,
  payload: Record<string, unknown>,
): Promise<CrmPushResult> {
  const body = {
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    locationId,
    tags: (payload.tags as string[]) ?? [],
    customFields: Object.entries(payload)
      .filter(
        ([key]) =>
          ![
            "tags",
            "source",
            "opportunity",
            "workflow_id",
            "campaign_id",
            "utm_source",
            "utm_medium",
            "utm_campaign",
          ].includes(key),
      )
      .map(([key, value]) => ({ key, value: String(value) })),
  };

  const response = await fetch(
    "https://services.leadconnectorhq.com/contacts/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return {
      success: false,
      mode: "live",
      message: `GoHighLevel API error (${response.status})${text ? `: ${text.slice(0, 120)}` : ""}.`,
    };
  }

  return {
    success: true,
    mode: "live",
    message: "Contact created in GoHighLevel.",
    workflowTriggered: Boolean(payload.workflow_id || payload.campaign_id),
  };
}

async function pushToHubSpot(
  token: string,
  lead: CrmTestLeadPayload,
  payload: Record<string, unknown>,
): Promise<CrmPushResult> {
  const properties: Record<string, string> = {
    firstname: lead.firstName,
    lastname: lead.lastName,
    email: lead.email,
    phone: lead.phone,
  };

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string" && !(key in properties)) {
      properties[key] = value;
    }
  }

  const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return {
      success: false,
      mode: "live",
      message: `HubSpot API error (${response.status})${text ? `: ${text.slice(0, 120)}` : ""}.`,
    };
  }

  return {
    success: true,
    mode: "live",
    message: "Contact created in HubSpot.",
    workflowTriggered: Boolean(payload.workflow_id),
  };
}

async function pushToRadCrm(
  apiKey: string,
  accountId: string,
  payload: Record<string, unknown>,
): Promise<CrmPushResult> {
  const baseUrl =
    process.env.RAD_CRM_API_BASE_URL ?? "https://api.radcrm.io/v1/leads";
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Account-Id": accountId,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      success: false,
      mode: "live",
      message: `RAD CRM API error (${response.status}). Check RAD_CRM_API_BASE_URL if needed.`,
    };
  }

  return {
    success: true,
    mode: "live",
    message: "Lead synced to RAD CRM.",
    workflowTriggered: true,
  };
}

export async function pushLeadToCrm(input: {
  packageId: string;
  provider: CrmProvider;
  integration: CrmIntegrationRecord;
  lead: CrmTestLeadPayload;
  testMode?: boolean;
}): Promise<CrmPushResult> {
  const payload = mapLeadToPayload(
    input.lead,
    input.integration.fieldMappings,
    input.integration.automations,
  );

  const credentials = await loadCrmCredentials({
    packageId: input.packageId,
    provider: input.provider,
  });

  if (!credentials) {
    if (input.testMode) {
      return {
        success: true,
        mode: "demo",
        message: `Demo: test lead mapped for ${input.provider} (connect credentials for live push).`,
        workflowTriggered: true,
      };
    }
    return {
      success: false,
      mode: "demo",
      message: "No CRM credentials connected for this provider.",
    };
  }

  try {
    switch (input.provider) {
      case "zapier": {
        const url = credentials.webhookUrl;
        if (!url) {
          return { success: false, mode: "live", message: "Webhook URL missing." };
        }
        return pushToZapier(url, payload);
      }
      case "gohighlevel": {
        const apiKey = credentials.apiKey;
        const locationId = credentials.locationId;
        if (!apiKey || !locationId) {
          return {
            success: false,
            mode: "live",
            message: "GoHighLevel API key and location ID required.",
          };
        }
        return pushToGoHighLevel(apiKey, locationId, input.lead, payload);
      }
      case "hubspot": {
        const token = credentials.privateAppToken;
        if (!token) {
          return {
            success: false,
            mode: "live",
            message: "HubSpot private app token required.",
          };
        }
        return pushToHubSpot(token, input.lead, payload);
      }
      case "rad-crm": {
        const apiKey = credentials.apiKey;
        const accountId = credentials.accountId;
        if (!apiKey || !accountId) {
          return {
            success: false,
            mode: "live",
            message: "RAD API key and account ID required.",
          };
        }
        return pushToRadCrm(apiKey, accountId, payload);
      }
      default:
        return { success: false, mode: "demo", message: "Unknown CRM provider." };
    }
  } catch (err) {
    return {
      success: false,
      mode: "live",
      message: err instanceof Error ? err.message : "CRM push failed.",
    };
  }
}
