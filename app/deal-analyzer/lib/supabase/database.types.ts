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
          sms_call_consent: boolean;
          consent_text: string | null;
          consent_timestamp: string | null;
          consent_ip: string | null;
          consent_user_agent: string | null;
          lead_status: string;
          last_contacted_at: string | null;
          next_follow_up_at: string | null;
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
          sms_call_consent?: boolean;
          consent_text?: string | null;
          consent_timestamp?: string | null;
          consent_ip?: string | null;
          consent_user_agent?: string | null;
          lead_status?: string;
          last_contacted_at?: string | null;
          next_follow_up_at?: string | null;
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
      deal_analyzer_followups: {
        Row: {
          id: string;
          report_id: string;
          lead_id: string;
          scenario_id: string;
          text_message: string | null;
          email_subject: string | null;
          email_body: string | null;
          agent_partner_message: string | null;
          call_notes: Json;
          priority_reason: string | null;
          recommended_timing: string | null;
          status: string;
          last_contacted_at: string | null;
          next_follow_up_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          report_id: string;
          lead_id: string;
          scenario_id: string;
          text_message?: string | null;
          email_subject?: string | null;
          email_body?: string | null;
          agent_partner_message?: string | null;
          call_notes?: Json;
          priority_reason?: string | null;
          recommended_timing?: string | null;
          status?: string;
          last_contacted_at?: string | null;
          next_follow_up_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["deal_analyzer_followups"]["Insert"]>;
      };
    };
  };
};
