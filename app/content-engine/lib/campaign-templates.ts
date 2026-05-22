import type { BrandVoiceId } from "./brand-voices";
import type { LeadCapturePreset } from "./lead-capture-presets";
import type { LeadMagnetType } from "./lead-magnet-types";
import type { LandingPageIntent } from "./landing-page-intents";
import type { ContentAudience } from "./types";

export const CAMPAIGN_TEMPLATE_IDS = [
  "investor-heloc",
  "refinance-watchlist",
  "seller-concession-strategy",
  "first-time-buyer",
  "jumbo-luxury-buyer",
  "agent-partner-recruitment",
  "commercial-purchase",
  "bridge-private-money",
  "rate-drop-alert",
  "move-up-buyer",
] as const;

export type CampaignTemplateId = (typeof CAMPAIGN_TEMPLATE_IDS)[number];

export type CampaignTemplate = {
  id: CampaignTemplateId;
  title: string;
  description: string;
  targetAudience: ContentAudience;
  brandVoiceId: BrandVoiceId;
  sourcePromptStarter: string;
  landingPageIntent: LandingPageIntent;
  leadMagnetType: LeadMagnetType;
  leadCapturePreset: LeadCapturePreset;
  suggestedCta: string;
  suggestedCrmTag: string;
  suggestedUtmCampaign: string;
  recommendedPlatforms: string[];
};

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    id: "investor-heloc",
    title: "Investor HELOC",
    description:
      "Equity access for investors — when a HELOC beats a refinance or new lien.",
    targetAudience: "homeowner",
    brandVoiceId: "consumer-friendly-guide",
    sourcePromptStarter:
      "Investor HELOC strategy: when to tap equity for the next deal, how to model payment shock, and what lenders scrutinize on second-lien HELOCs for rental portfolios.",
    landingPageIntent: "refinance-lead",
    leadMagnetType: "refinance-guide",
    leadCapturePreset: "refinance-lead",
    suggestedCta: "Request your HELOC strategy review",
    suggestedCrmTag: "investor_heloc",
    suggestedUtmCampaign: "investor-heloc",
    recommendedPlatforms: ["LinkedIn", "Email", "Facebook", "Blog"],
  },
  {
    id: "refinance-watchlist",
    title: "Refinance Watchlist",
    description:
      "Rate-aware homeowners on a watchlist — timing, break-even, and structure.",
    targetAudience: "homeowner",
    brandVoiceId: "serious-market-update",
    sourcePromptStarter:
      "Refinance watchlist campaign: how homeowners should track rate moves, when break-even math actually works, and why payment-only comparisons mislead.",
    landingPageIntent: "refinance-lead",
    leadMagnetType: "market-update-report",
    leadCapturePreset: "refinance-lead",
    suggestedCta: "Join the refinance watchlist review",
    suggestedCrmTag: "refinance_watchlist",
    suggestedUtmCampaign: "refinance-watchlist",
    recommendedPlatforms: ["Email", "Facebook", "LinkedIn", "Blog"],
  },
  {
    id: "seller-concession-strategy",
    title: "Seller Concession Strategy",
    description:
      "Buyer leverage playbook — concessions, buydowns, and seller-paid costs.",
    targetAudience: "buyer",
    brandVoiceId: "chris-butler-loan-playbook",
    sourcePromptStarter:
      "Seller concession strategy for competitive offers: how buyers ask for concessions without killing the deal, buydown math, and what agents should forward to listing agents.",
    landingPageIntent: "seller-concession-strategy",
    leadMagnetType: "seller-concession-playbook",
    leadCapturePreset: "seller-concession-lead",
    suggestedCta: "Get your concession strategy call",
    suggestedCrmTag: "seller_concession",
    suggestedUtmCampaign: "seller-concession",
    recommendedPlatforms: ["TikTok / Reels", "Instagram", "Facebook", "Email"],
  },
  {
    id: "first-time-buyer",
    title: "First-Time Buyer",
    description:
      "Education-first path from pre-approval to keys — no rate-bait noise.",
    targetAudience: "buyer",
    brandVoiceId: "first-time-buyer",
    sourcePromptStarter:
      "First-time buyer campaign: pre-approval vs pre-qualified, realistic payment planning, and how to avoid losing deposits in a competitive market.",
    landingPageIntent: "first-time-buyer",
    leadMagnetType: "first-time-buyer-checklist",
    leadCapturePreset: "first-time-buyer",
    suggestedCta: "Start your first-time buyer game plan",
    suggestedCrmTag: "first_time_buyer",
    suggestedUtmCampaign: "first-time-buyer",
    recommendedPlatforms: ["TikTok / Reels", "Instagram", "Facebook", "Email"],
  },
  {
    id: "jumbo-luxury-buyer",
    title: "Jumbo / Luxury Buyer",
    description:
      "High-balance borrowers — reserves, asset documentation, and structure.",
    targetAudience: "buyer",
    brandVoiceId: "luxury-jumbo-borrower",
    sourcePromptStarter:
      "Jumbo and luxury buyer campaign: reserve requirements, asset-based underwriting, and how jumbo pricing differs from conforming — without hype.",
    landingPageIntent: "jumbo-luxury",
    leadMagnetType: "jumbo-borrower-guide",
    leadCapturePreset: "jumbo-borrower",
    suggestedCta: "Book a private jumbo strategy review",
    suggestedCrmTag: "jumbo_luxury",
    suggestedUtmCampaign: "jumbo-luxury",
    recommendedPlatforms: ["LinkedIn", "Email", "Blog", "Facebook"],
  },
  {
    id: "agent-partner-recruitment",
    title: "Agent Partner Recruitment",
    description:
      "Recruit agent partners with forwardable financing clarity.",
    targetAudience: "agent",
    brandVoiceId: "agent-facing-educator",
    sourcePromptStarter:
      "Agent partner recruitment: how loan officers become the financing coach agents forward — pre-approval clarity, offer strategy, and co-marketing that does not sound like rate spam.",
    landingPageIntent: "agent-referral",
    leadMagnetType: "agent-cheat-sheet",
    leadCapturePreset: "agent-partner",
    suggestedCta: "Schedule a partner strategy call",
    suggestedCrmTag: "agent_partner",
    suggestedUtmCampaign: "agent-partner",
    recommendedPlatforms: ["LinkedIn", "Email", "Facebook"],
  },
  {
    id: "commercial-purchase",
    title: "Commercial Purchase",
    description:
      "Owner-occupied and investor commercial purchases — DSCR and structure.",
    targetAudience: "commercial",
    brandVoiceId: "commercial-capital-markets",
    sourcePromptStarter:
      "Commercial purchase campaign: DSCR vs traditional underwriting, entity structure, and how borrowers should compare term sheets before rate shopping.",
    landingPageIntent: "commercial-borrower",
    leadMagnetType: "commercial-lending-brief",
    leadCapturePreset: "commercial-borrower",
    suggestedCta: "Request a commercial scenario review",
    suggestedCrmTag: "commercial_purchase",
    suggestedUtmCampaign: "commercial-purchase",
    recommendedPlatforms: ["LinkedIn", "Email", "Blog"],
  },
  {
    id: "bridge-private-money",
    title: "Bridge / Private Money",
    description:
      "Short-term capital for acquisitions, renovations, and bridge exits.",
    targetAudience: "commercial",
    brandVoiceId: "commercial-capital-markets",
    sourcePromptStarter:
      "Bridge and private money campaign: when bridge debt makes sense, how to model exit risk, and what sponsors need before taking hard or private money.",
    landingPageIntent: "commercial-borrower",
    leadMagnetType: "commercial-lending-brief",
    leadCapturePreset: "commercial-borrower",
    suggestedCta: "Book a bridge capital review",
    suggestedCrmTag: "bridge_private",
    suggestedUtmCampaign: "bridge-private",
    recommendedPlatforms: ["LinkedIn", "Email", "Blog"],
  },
  {
    id: "rate-drop-alert",
    title: "Rate Drop Alert",
    description:
      "Market-update list for borrowers watching Fed and index moves.",
    targetAudience: "general",
    brandVoiceId: "serious-market-update",
    sourcePromptStarter:
      "Rate drop alert campaign: what a Fed hold or cut actually means for payments, who should act vs wait, and how to avoid refinance scams when headlines spike.",
    landingPageIntent: "rate-market-alert",
    leadMagnetType: "market-update-report",
    leadCapturePreset: "market-update-subscriber",
    suggestedCta: "Get the rate drop playbook",
    suggestedCrmTag: "rate_drop_alert",
    suggestedUtmCampaign: "rate-drop-alert",
    recommendedPlatforms: ["Email", "LinkedIn", "Facebook", "Blog", "TikTok / Reels"],
  },
  {
    id: "move-up-buyer",
    title: "Move-Up Buyer",
    description:
      "Buy-before-sell and move-up logistics for growing households.",
    targetAudience: "buyer",
    brandVoiceId: "chris-butler-loan-playbook",
    sourcePromptStarter:
      "Move-up buyer campaign: buy-before-sell sequencing, bridge options, carrying two payments, and how to write offers when you still own your current home.",
    landingPageIntent: "buyer-lead",
    leadMagnetType: "buyer-guide",
    leadCapturePreset: "buyer-lead",
    suggestedCta: "Plan your move-up financing path",
    suggestedCrmTag: "move_up_buyer",
    suggestedUtmCampaign: "move-up-buyer",
    recommendedPlatforms: ["Facebook", "Email", "Instagram", "LinkedIn"],
  },
];

export function getCampaignTemplate(id: CampaignTemplateId): CampaignTemplate {
  const found = CAMPAIGN_TEMPLATES.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown template: ${id}`);
  return found;
}
