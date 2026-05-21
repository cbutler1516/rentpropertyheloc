export function getGhlWebhookUrl(): string | undefined {
  const url = process.env.GHL_WEBHOOK_URL?.trim();
  return url || undefined;
}

export function getZapierWebhookUrl(): string | undefined {
  const url = process.env.ZAPIER_WEBHOOK_URL?.trim();
  return url || undefined;
}

export function getCrmPushSecret(): string | undefined {
  const secret = process.env.CRM_PUSH_SECRET?.trim();
  return secret || undefined;
}

export function isCrmAutoPushEnabled(): boolean {
  const raw = process.env.CRM_AUTO_PUSH?.trim().toLowerCase();
  return raw === "true" || raw === "1" || raw === "yes";
}

export function isCrmPushConfigured(): boolean {
  return Boolean(getGhlWebhookUrl() || getZapierWebhookUrl());
}

export function getCrmIntegrationStatus() {
  return {
    ghlConfigured: Boolean(getGhlWebhookUrl()),
    zapierConfigured: Boolean(getZapierWebhookUrl()),
    autoPushEnabled: isCrmAutoPushEnabled(),
    secretConfigured: Boolean(getCrmPushSecret()),
  };
}
