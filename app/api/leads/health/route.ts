import { getHubSpotHealth } from "@/lib/crm/hubspot-health";
import type { HubSpotHealth } from "@/lib/crm/hubspot-health";
import { getAnalyticsHealth } from "@/lib/analytics/tracking-config";
import { getLeadPipelineHealth } from "@/lib/leads/pipeline-health";
import { NextResponse } from "next/server";

export async function GET() {
  const health = getLeadPipelineHealth();

  return NextResponse.json({
    apiRouteStatus: health.apiRouteStatus,
    supabaseConfigured: health.supabaseConfigured,
    hubspotConfigured: health.hubspotConfigured,
    resendConfigured: health.resendConfigured,
    zapierConfigured: health.zapierConfigured,
    resend: health.resend,
    persistenceMode: health.persistenceMode,
    scoringEnabled: health.scoringEnabled,
    environment: health.environment,
    testLeadEndpointEnabled: health.testLeadEndpointEnabled,
    lastTestLead: health.lastTestLead,
    analytics: getAnalyticsHealth(),
    hubspot: getHubSpotHealth(),
  });
}
