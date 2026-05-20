import type { Json } from "@/app/deal-analyzer/lib/supabase/database.types";

/** Database-ready row shape for `content_engine_packages`. */
export type ContentEnginePackageRow = {
  id: string;
  created_at: string;
  title: string;
  source_input: string;
  audience: string;
  tone: string;
  topic: string;
  model_used: string;
  brand_voice_id: string;
  generation_mode: string;
  outputs_json: Json;
  landing_page_json: Json | null;
  calendar_json: Json | null;
  lead_magnet_json: Json | null;
  launch_hub_json: Json | null;
  lead_capture_json: Json | null;
  crm_integration_json: Json | null;
  tags: string[];
};

export type ContentEnginePackageInsert = {
  id?: string;
  created_at?: string;
  title: string;
  source_input: string;
  audience?: string;
  tone?: string;
  topic?: string;
  model_used?: string;
  brand_voice_id?: string;
  generation_mode?: string;
  outputs_json: Json;
  landing_page_json?: Json | null;
  calendar_json?: Json | null;
  lead_magnet_json?: Json | null;
  launch_hub_json?: Json | null;
  lead_capture_json?: Json | null;
  crm_integration_json?: Json | null;
  tags?: string[];
};

export type Database = {
  public: {
    Tables: {
      content_engine_packages: {
        Row: ContentEnginePackageRow;
        Insert: ContentEnginePackageInsert;
        Update: Partial<ContentEnginePackageInsert>;
      };
      content_engine_crm_credentials: {
        Row: {
          id: string;
          package_id: string;
          provider: string;
          credentials_json: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          package_id: string;
          provider: string;
          credentials_json: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<{
          credentials_json: Json;
          updated_at: string;
        }>;
      };
    };
  };
};
