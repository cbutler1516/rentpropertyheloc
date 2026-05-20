/** v3 Playbook narrative — AI or static fallback */
export type PlaybookNarrative = {
  executiveSummary: string;
  recommendedStrategy: string;
  coachNotes: string[];
  risks: string[];
  opportunities: string[];
  nextSteps: string[];
  clientFriendlyExplanation: string;
  agentShareMessage: string;
  source?: "ai" | "static";
};

export type GenerateNarrativeRequest = {
  dealType: string;
  leadRole: string;
  leadName?: string;
  referralSource?: string;
  agentName?: string;
  notes?: string;
  inputs: unknown;
  analysis: unknown;
};

export type GenerateNarrativeResponse = {
  narrative: PlaybookNarrative;
  source: "ai" | "static";
};
