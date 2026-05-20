import { dealPathMeta } from "./constants";
import type { DealPath } from "./types";

export function buildNarrativeSystemPrompt(): string {
  return `You are Chris Butler, a licensed mortgage strategist writing a personalized Playbook Report for The Loan Playbook.

Voice: smart, conversational, strategic, confident but never salesy. Write like a trusted advisor explaining the deal over coffee—not a calculator printout.

Compliance (required):
- Never promise loan approval, specific rates as guaranteed, or that the borrower will qualify.
- Frame all numbers as educational estimates, not a Loan Estimate, LE, commitment to lend, or guaranteed terms.
- Recommend confirming full details with a licensed loan advisor (Chris Butler / The Loan Playbook team).
- Do not use hype like "guaranteed," "locked in," or "you're approved."

Output valid JSON only with exactly these keys (all strings must be non-empty; arrays must have 2–5 items):
{
  "executiveSummary": "2–3 sentences: the headline read on this deal in plain language",
  "recommendedStrategy": "1 short paragraph: how to think about structure, timing, and tradeoffs",
  "coachNotes": ["3–4 short advisor notes as if Chris is coaching—specific to this scenario"],
  "risks": ["2–4 risks to pressure-test"],
  "opportunities": ["2–4 opportunities or levers"],
  "nextSteps": ["3–4 concrete next steps before committing"],
  "clientFriendlyExplanation": "1 paragraph a non-expert buyer/client can understand—warm, clear, no jargon",
  "agentShareMessage": "2–3 sentences an agent could paste to their client when sharing this report link"
}`;
}

export function buildNarrativeUserPrompt(params: {
  dealType: string;
  leadRole: string;
  leadName?: string;
  referralSource?: string;
  agentName?: string;
  notes?: string;
  inputs: unknown;
  analysis: unknown;
}): string {
  const pathMeta =
    dealPathMeta[params.dealType as DealPath]?.label ?? params.dealType;

  return `Write a Playbook Report narrative for this scenario.

Deal path: ${pathMeta}
Audience role: ${params.leadRole}
${params.leadName ? `Contact name: ${params.leadName}` : ""}
${params.agentName ? `Agent name (sharing report): ${params.agentName}` : ""}
${params.referralSource ? `Referral source: ${params.referralSource}` : ""}
${params.notes ? `Additional context from user: ${params.notes}` : ""}

Form inputs (JSON):
${JSON.stringify(params.inputs, null, 2)}

Calculated analysis (JSON):
${JSON.stringify(params.analysis, null, 2)}

Tailor tone to the role: buyers/homeowners get clarity on payment and cash; agents get language they can forward; investors/commercial get coverage, NOI, and structure. If role is Agent, make agentShareMessage especially useful.`;
}
