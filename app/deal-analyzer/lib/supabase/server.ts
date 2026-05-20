import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "./env";

let serverClient: SupabaseClient | null = null;

export function createServerSupabaseClient(): SupabaseClient | null {
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
