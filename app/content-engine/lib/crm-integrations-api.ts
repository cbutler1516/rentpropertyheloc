import type { CrmProvider } from "./crm-providers";
import type {
  CrmConnectionPublic,
  CrmConnectionStatusResponse,
  CrmIntegrationRecord,
  CrmPushLeadResponse,
  CrmTestLeadPayload,
  SaveCrmCredentialsRequest,
} from "./types";

export async function fetchCrmConnectionStatus(
  packageId: string,
): Promise<CrmConnectionPublic[]> {
  const response = await fetch(
    `/api/content-engine/crm-integrations/status?packageId=${encodeURIComponent(packageId)}`,
  );
  const data = (await response.json()) as
    | CrmConnectionStatusResponse
    | { error: string };
  if (!response.ok || "error" in data) {
    throw new Error("error" in data ? data.error : "Failed to load CRM status.");
  }
  return data.connections;
}

export async function saveCrmCredentials(
  body: SaveCrmCredentialsRequest,
): Promise<CrmConnectionPublic> {
  const response = await fetch("/api/content-engine/crm-integrations/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as
    | { connection: CrmConnectionPublic }
    | { error: string };
  if (!response.ok || "error" in data) {
    throw new Error("error" in data ? data.error : "Failed to save credentials.");
  }
  return data.connection;
}

export async function disconnectCrmProvider(input: {
  packageId: string;
  provider: CrmProvider;
}): Promise<void> {
  const response = await fetch("/api/content-engine/crm-integrations/credentials", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await response.json()) as { error?: string };
  if (!response.ok) {
    throw new Error(data.error ?? "Failed to disconnect.");
  }
}

export async function pushCrmLead(input: {
  packageId: string;
  provider: CrmProvider;
  lead: CrmTestLeadPayload;
  integration: CrmIntegrationRecord;
  testMode?: boolean;
}): Promise<CrmPushLeadResponse> {
  const response = await fetch("/api/content-engine/crm-integrations/push-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      packageId: input.packageId,
      provider: input.provider,
      lead: input.lead,
      integration: input.integration,
      testMode: input.testMode ?? false,
    }),
  });
  const data = (await response.json()) as CrmPushLeadResponse | { error: string };
  if (!response.ok || "error" in data) {
    throw new Error("error" in data ? data.error : "CRM push failed.");
  }
  return data;
}

export async function retryCrmPush(input: {
  packageId: string;
  provider: CrmProvider;
  lead: CrmTestLeadPayload;
  integration: CrmIntegrationRecord;
  relatedEntryId?: string;
}): Promise<CrmPushLeadResponse> {
  const response = await fetch("/api/content-engine/crm-integrations/retry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await response.json()) as CrmPushLeadResponse | { error: string };
  if (!response.ok || "error" in data) {
    throw new Error("error" in data ? data.error : "Retry failed.");
  }
  return data;
}
