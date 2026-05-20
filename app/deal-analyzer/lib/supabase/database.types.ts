export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      deal_analyzer_leads: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          role: string;
          notes: string | null;
          referral_source: string | null;
          agent_name: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          role: string;
          notes?: string | null;
          referral_source?: string | null;
          agent_name?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["deal_analyzer_leads"]["Insert"]>;
      };
      deal_analyzer_scenarios: {
        Row: {
          id: string;
          created_at: string;
          lead_id: string;
          deal_type: string;
          inputs_json: Json;
          analysis_json: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          lead_id: string;
          deal_type: string;
          inputs_json: Json;
          analysis_json: Json;
        };
        Update: Partial<Database["public"]["Tables"]["deal_analyzer_scenarios"]["Insert"]>;
      };
      deal_analyzer_reports: {
        Row: {
          id: string;
          created_at: string;
          lead_id: string;
          scenario_id: string;
          report_slug: string;
          narrative_json: Json | null;
          referral_source: string | null;
          agent_name: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          lead_id: string;
          scenario_id: string;
          report_slug: string;
          narrative_json?: Json | null;
          referral_source?: string | null;
          agent_name?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["deal_analyzer_reports"]["Insert"]>;
      };
    };
  };
};
