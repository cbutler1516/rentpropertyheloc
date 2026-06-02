import type { LeadQualityTier } from "@/lib/leads/types";

export type PersistenceMode = "supabase" | "local-fallback";

export type LastTestLeadResult = {
  success: boolean;
  ranAt: string;
  leadId?: string;
  error?: string;
  qualityScore?: number;
  qualityTier?: LeadQualityTier;
  recommendedFollowUp?: string;
  persistenceMode: PersistenceMode;
  hubspotConfigured: boolean;
  hubspotSynced: boolean;
  resendConfigured: boolean;
};

let lastTestLead: LastTestLeadResult | null = null;

export function getLastTestLeadResult(): LastTestLeadResult | null {
  return lastTestLead;
}

export function setLastTestLeadResult(result: LastTestLeadResult): void {
  lastTestLead = result;
}
