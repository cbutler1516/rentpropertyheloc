import { dealPathMeta } from "./constants";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { DealAnalysisResult, DealInputs, LeadCapture } from "./types";
import type { PlaybookNarrative } from "./narrative-types";

export function buildFollowUpSystemPrompt(): string {
  return `You are Chris Butler, mortgage strategist at The Loan Playbook / Broadview Lending.
Write follow-up outreach for a lead who unlocked their Playbook Report.

Tone: conversational, helpful, confident, not pushy. Sound like Chris on a strategy call.

Compliance (strict):
- Do NOT promise approval, specific rates, guaranteed savings, or eligibility.
- Use educational language only — estimates, scenarios, "may," "could," "worth exploring."
- Encourage booking a strategy call to confirm structure, program fit, and timing.
- Never say they are approved or that terms are locked in.

Return JSON only with these exact keys:
{
  "textMessage": "SMS-length friendly message",
  "emailSubject": "short subject line",
  "emailBody": "2-4 short paragraphs for email",
  "agentPartnerMessage": "message if lead is agent/referral partner, or brief note for internal use",
  "callNotes": ["bullet for Chris before calling", "..."],
  "priorityReason": "one sentence why to prioritize now",
  "recommendedTiming": "e.g. Within 24 hours, This week morning, After they review report"
}`;
}

export function buildFollowUpUserPrompt(input: {
  lead: LeadCapture;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  narrative?: PlaybookNarrative | null;
  reportSlug: string;
  siteUrl: string;
}): string {
  const path = dealPathMeta[input.inputs.path];
  const payment = formatCurrency(input.analysis.payment.total);
  const ltv = formatPercent(input.analysis.ltv, 1);

  return `Lead: ${input.lead.name} (${input.lead.role})
Email: ${input.lead.email}
Phone: ${input.lead.phone}
Agent on file: ${input.lead.agentName || "—"}
Referral: ${input.lead.referralSource || "—"}
Notes: ${input.lead.notes || "—"}
Consent to contact: ${input.lead.smsCallConsent ? "yes" : "no"}

Deal path: ${path.label}
Est. payment (educational): ${payment}
LTV (illustrative): ${ltv}
Loan amount (est.): ${formatCurrency(input.analysis.loanAmount)}

Report link: ${input.siteUrl}/deal-analyzer/report/${input.reportSlug}

Executive summary (from report):
${input.narrative?.executiveSummary ?? "—"}

Next steps from report:
${(input.narrative?.nextSteps ?? []).join("; ") || "—"}

Generate follow-up assets Chris can use today.`;
}
