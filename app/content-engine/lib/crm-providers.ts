export const CRM_PROVIDERS = [
  "gohighlevel",
  "rad-crm",
  "hubspot",
  "zapier",
] as const;

export type CrmProvider = (typeof CRM_PROVIDERS)[number];

export type CrmCredentialFieldKey =
  | "apiKey"
  | "locationId"
  | "accountId"
  | "privateAppToken"
  | "webhookUrl";

export type CrmCredentialField = {
  key: CrmCredentialFieldKey;
  label: string;
  placeholder: string;
  secret: boolean;
};

export type CrmProviderConfig = {
  id: CrmProvider;
  label: string;
  description: string;
  credentialFields: CrmCredentialField[];
};

export const CRM_PROVIDER_CONFIGS: Record<CrmProvider, CrmProviderConfig> = {
  gohighlevel: {
    id: "gohighlevel",
    label: "GoHighLevel",
    description: "Contacts, tags, workflows, and opportunities in GHL.",
    credentialFields: [
      {
        key: "apiKey",
        label: "API key",
        placeholder: "Private integration token",
        secret: true,
      },
      {
        key: "locationId",
        label: "Location ID",
        placeholder: "Sub-account / location ID",
        secret: false,
      },
    ],
  },
  "rad-crm": {
    id: "rad-crm",
    label: "RAD CRM",
    description: "RAD CRM lead sync via API key and account.",
    credentialFields: [
      {
        key: "apiKey",
        label: "API key",
        placeholder: "RAD API key",
        secret: true,
      },
      {
        key: "accountId",
        label: "Account ID",
        placeholder: "RAD account or office ID",
        secret: false,
      },
    ],
  },
  hubspot: {
    id: "hubspot",
    label: "HubSpot",
    description: "Create contacts, deals, and workflow enrollments.",
    credentialFields: [
      {
        key: "privateAppToken",
        label: "Private app token",
        placeholder: "pat-na1-…",
        secret: true,
      },
    ],
  },
  zapier: {
    id: "zapier",
    label: "Zapier webhook",
    description: "Fallback — POST mapped lead JSON to any Zap.",
    credentialFields: [
      {
        key: "webhookUrl",
        label: "Webhook URL",
        placeholder: "https://hooks.zapier.com/hooks/catch/…",
        secret: true,
      },
    ],
  },
};

export function isCrmProvider(value: string): value is CrmProvider {
  return CRM_PROVIDERS.includes(value as CrmProvider);
}

export function getCrmProviderConfig(provider: CrmProvider) {
  return CRM_PROVIDER_CONFIGS[provider];
}
