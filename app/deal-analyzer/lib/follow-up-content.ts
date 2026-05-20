import { dealPathMeta } from "./constants";
import { formatCurrency } from "@/lib/utils";
import type { GeneratedFollowUp } from "./follow-up-types";
import type { DealAnalysisResult, DealInputs, LeadCapture } from "./types";
import type { PlaybookNarrative } from "./narrative-types";

export function generateStaticFollowUp(input: {
  lead: LeadCapture;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  narrative?: PlaybookNarrative | null;
  reportSlug: string;
  siteUrl: string;
}): GeneratedFollowUp {
  const { lead, inputs, reportSlug, siteUrl } = input;
  const firstName = lead.name.trim().split(/\s+/)[0] || "there";
  const pathLabel = dealPathMeta[inputs.path].shortLabel;
  const reportUrl = `${siteUrl}/deal-analyzer/report/${reportSlug}`;
  const payment = formatCurrency(input.analysis.payment.total);

  const isAgent = lead.role === "Agent" || Boolean(lead.agentName?.trim());

  const textMessage = isAgent
    ? `Hi ${firstName} — Chris Butler here. Your client's ${pathLabel} Playbook is ready: ${reportUrl}. Happy to hop on a quick call to walk through structure and timing (educational estimates only).`
    : `Hi ${firstName} — Chris Butler with The Loan Playbook. I put together your ${pathLabel} Playbook snapshot (educational estimates). Worth a quick look: ${reportUrl}. Open to a short strategy call when you're ready — no pressure.`;

  const emailSubject = `${firstName}, your ${pathLabel} Playbook Report`;

  const emailBody = `Hi ${firstName},

Thanks for running your scenario through the Deal Analyzer. Your Playbook Report is a directional read on structure and monthly housing cost — around ${payment} in this illustration — not a loan approval or locked quote.

When you have a few minutes, skim the report here:
${reportUrl}

If it would help, book a Strategy Call with me and we'll pressure-test timing, program fit, and cash-to-close together. Everything stays educational until you're ready to move forward with a licensed advisor.

— Chris Butler
The Loan Playbook · Broadview Lending`;

  const agentPartnerMessage = isAgent
    ? `Hi ${firstName} — sharing the Playbook link for your borrower (${pathLabel}). Numbers are illustrative; I'm glad to join a call with you and your client to align structure before they shop rates. Report: ${reportUrl}`
    : `Internal: ${lead.role} lead — ${pathLabel}. Review report before outreach.`;

  const callNotes = [
    `Confirm timeline and what problem they're solving (${pathLabel}).`,
    `Walk through that payment (~${payment}) as educational — taxes, insurance, and program still need confirmation.`,
    input.narrative?.nextSteps?.[0] ??
      "Offer Strategy Call to validate structure with a licensed loan advisor.",
  ];

  return {
    textMessage,
    emailSubject,
    emailBody,
    agentPartnerMessage,
    callNotes,
    priorityReason: `New ${pathLabel} Playbook unlock — connect while the report is fresh.`,
    recommendedTiming: "Within 24 hours",
  };
}
