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
    };
  };
};
