import type { LastTestLeadResult, PersistenceMode } from "@/lib/leads/last-test-lead";
import { getLastTestLeadResult } from "@/lib/leads/last-test-lead";
import {
  getNotificationFromAddress,
  getNotificationRecipients,
} from "@/lib/leads/notify-lead-received";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type { PersistenceMode };
export { isSupabaseConfigured };

export type ResendHealth = {
  configured: boolean;
  recipientCount: number;
  fromEmail: string;
};

export type LeadPipelineHealth = {
  apiRouteStatus: "ok";
  supabaseConfigured: boolean;
  hubspotConfigured: boolean;
  resendConfigured: boolean;
  zapierConfigured: boolean;
  resend: ResendHealth;
  persistenceMode: PersistenceMode;
  scoringEnabled: boolean;
  environment: string;
  testLeadEndpointEnabled: boolean;
  lastTestLead: LastTestLeadResult | null;
};

export function isHubSpotConfigured(): boolean {
  return Boolean(process.env.HUBSPOT_PRIVATE_APP_TOKEN?.trim());
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function isZapierWebhookConfigured(): boolean {
  return Boolean(process.env.ZAPIER_WEBHOOK_URL?.trim());
}

export function getResendHealth(): ResendHealth {
  return {
    configured: isResendConfigured(),
    recipientCount: getNotificationRecipients().length,
    fromEmail: getNotificationFromAddress(),
  };
}

export function getPersistenceMode(): PersistenceMode {
  return isSupabaseConfigured() ? "supabase" : "local-fallback";
}

export function isTestLeadEndpointEnabled(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return Boolean(process.env.ADMIN_TEST_TOKEN?.trim());
}

export function getLeadPipelineHealth(): LeadPipelineHealth {
  return {
    apiRouteStatus: "ok",
    supabaseConfigured: isSupabaseConfigured(),
    hubspotConfigured: isHubSpotConfigured(),
    resendConfigured: isResendConfigured(),
    zapierConfigured: isZapierWebhookConfigured(),
    resend: getResendHealth(),
    persistenceMode: getPersistenceMode(),
    scoringEnabled: true,
    environment: process.env.NODE_ENV ?? "unknown",
    testLeadEndpointEnabled: isTestLeadEndpointEnabled(),
    lastTestLead: getLastTestLeadResult(),
  };
}
