import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from "./env";

let browserClient: SupabaseClient | null = null;

export function createBrowserSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (typeof window === "undefined") return null;

  if (!browserClient) {
    browserClient = createClient(
      getSupabaseUrl()!,
      getSupabaseAnonKey()!,
    );
  }

  return browserClient;
}
