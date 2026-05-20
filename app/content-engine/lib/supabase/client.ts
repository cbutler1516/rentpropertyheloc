import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "@/app/deal-analyzer/lib/supabase/env";

let serverClient: SupabaseClient | null = null;

/** Untyped client for content_engine_packages (avoids coupling deal-analyzer DB types). */
export function createContentEngineSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  const url = getSupabaseUrl()!;
  const key = getSupabaseServiceRoleKey() ?? getSupabaseAnonKey()!;

  if (!serverClient) {
    serverClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return serverClient;
}
