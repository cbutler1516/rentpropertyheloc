import { createContentEngineSupabaseClient } from "./supabase/client";
import {
  CRM_PROVIDER_CONFIGS,
  type CrmProvider,
  type CrmCredentialFieldKey,
} from "./crm-providers";
import type { CrmConnectionPublic } from "./types";

type StoredCredentials = Record<string, string>;

/** In-memory fallback when Supabase is unavailable (dev / local-only). */
const memoryStore = new Map<string, StoredCredentials>();

function storeKey(packageId: string, provider: CrmProvider) {
  return `${packageId}:${provider}`;
}

function credentialHint(
  provider: CrmProvider,
  credentials: StoredCredentials,
): string | undefined {
  const fields = CRM_PROVIDER_CONFIGS[provider].credentialFields;
  const secretField = fields.find((f) => f.secret);
  const value = secretField ? credentials[secretField.key] : undefined;
  if (!value || value.length < 4) return value ? "••••" : undefined;
  return `••••${value.slice(-4)}`;
}

export function validateCredentials(
  provider: CrmProvider,
  credentials: Record<string, string>,
): string | null {
  const config = CRM_PROVIDER_CONFIGS[provider];
  for (const field of config.credentialFields) {
    const value = credentials[field.key]?.trim();
    if (!value) {
      return `${field.label} is required.`;
    }
  }
  if (provider === "zapier") {
    const url = credentials.webhookUrl?.trim() ?? "";
    if (!url.startsWith("https://")) {
      return "Webhook URL must start with https://";
    }
  }
  return null;
}

export async function saveCrmCredentials(input: {
  packageId: string;
  provider: CrmProvider;
  credentials: Record<string, string>;
}): Promise<CrmConnectionPublic | { error: string }> {
  const validationError = validateCredentials(input.provider, input.credentials);
  if (validationError) return { error: validationError };

  const trimmed: StoredCredentials = {};
  for (const [key, value] of Object.entries(input.credentials)) {
    trimmed[key as CrmCredentialFieldKey] = value.trim();
  }

  const supabase = createContentEngineSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("content_engine_crm_credentials").upsert(
      {
        package_id: input.packageId,
        provider: input.provider,
        credentials_json: trimmed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "package_id,provider" },
    );
    if (error) return { error: error.message };
  } else {
    memoryStore.set(storeKey(input.packageId, input.provider), trimmed);
  }

  return {
    provider: input.provider,
    connected: true,
    credentialHint: credentialHint(input.provider, trimmed),
    lastVerifiedAt: new Date().toISOString(),
  };
}

export async function deleteCrmCredentials(input: {
  packageId: string;
  provider: CrmProvider;
}): Promise<{ ok: true } | { error: string }> {
  const supabase = createContentEngineSupabaseClient();
  if (supabase) {
    const { error } = await supabase
      .from("content_engine_crm_credentials")
      .delete()
      .eq("package_id", input.packageId)
      .eq("provider", input.provider);
    if (error) return { error: error.message };
  } else {
    memoryStore.delete(storeKey(input.packageId, input.provider));
  }
  return { ok: true };
}

export async function loadCrmCredentials(input: {
  packageId: string;
  provider: CrmProvider;
}): Promise<StoredCredentials | null> {
  const supabase = createContentEngineSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("content_engine_crm_credentials")
      .select("credentials_json")
      .eq("package_id", input.packageId)
      .eq("provider", input.provider)
      .maybeSingle();
    if (error || !data?.credentials_json) return null;
    return data.credentials_json as StoredCredentials;
  }
  return memoryStore.get(storeKey(input.packageId, input.provider)) ?? null;
}

export async function listCrmConnectionStatus(
  packageId: string,
): Promise<CrmConnectionPublic[]> {
  const supabase = createContentEngineSupabaseClient();
  const connections: CrmConnectionPublic[] = [];

  if (supabase) {
    const { data, error } = await supabase
      .from("content_engine_crm_credentials")
      .select("provider, credentials_json, updated_at")
      .eq("package_id", packageId);
    if (error || !data) return connections;

    for (const row of data) {
      if (!row.provider || typeof row.provider !== "string") continue;
      const provider = row.provider as CrmProvider;
      const creds = (row.credentials_json ?? {}) as StoredCredentials;
      connections.push({
        provider,
        connected: true,
        credentialHint: credentialHint(provider, creds),
        lastVerifiedAt:
          typeof row.updated_at === "string" ? row.updated_at : undefined,
      });
    }
    return connections;
  }

  for (const provider of Object.keys(CRM_PROVIDER_CONFIGS) as CrmProvider[]) {
    const creds = memoryStore.get(storeKey(packageId, provider));
    if (creds) {
      connections.push({
        provider,
        connected: true,
        credentialHint: credentialHint(provider, creds),
        lastVerifiedAt: new Date().toISOString(),
      });
    }
  }
  return connections;
}
