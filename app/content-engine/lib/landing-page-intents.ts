export const LANDING_PAGE_INTENTS = [
  "buyer-lead",
  "refinance-lead",
  "agent-referral",
  "commercial-borrower",
  "jumbo-luxury",
  "first-time-buyer",
  "seller-concession-strategy",
  "rate-market-alert",
] as const;

export type LandingPageIntent = (typeof LANDING_PAGE_INTENTS)[number];

export type LandingPageIntentConfig = {
  id: LandingPageIntent;
  label: string;
  description: string;
  defaultAudience: string;
};

export const LANDING_PAGE_INTENT_CONFIG: Record<
  LandingPageIntent,
  LandingPageIntentConfig
> = {
  "buyer-lead": {
    id: "buyer-lead",
    label: "Buyer lead",
    description: "Pre-approval, payment clarity, and offer readiness.",
    defaultAudience: "buyer",
  },
  "refinance-lead": {
    id: "refinance-lead",
    label: "Refinance lead",
    description: "Timing, break-even, and equity options.",
    defaultAudience: "homeowner",
  },
  "agent-referral": {
    id: "agent-referral",
    label: "Agent referral",
    description: "Partner-forwardable financing clarity for clients.",
    defaultAudience: "agent",
  },
  "commercial-borrower": {
    id: "commercial-borrower",
    label: "Commercial borrower",
    description: "DSCR, investor structure, and portfolio moves.",
    defaultAudience: "commercial",
  },
  "jumbo-luxury": {
    id: "jumbo-luxury",
    label: "Jumbo / luxury borrower",
    description: "High-balance paths, discretion, and structure.",
    defaultAudience: "buyer",
  },
  "first-time-buyer": {
    id: "first-time-buyer",
    label: "First-time buyer",
    description: "Education-first path from budget to keys.",
    defaultAudience: "buyer",
  },
  "seller-concession-strategy": {
    id: "seller-concession-strategy",
    label: "Seller concession strategy",
    description: "Credits, buydowns, and offer leverage.",
    defaultAudience: "buyer",
  },
  "rate-market-alert": {
    id: "rate-market-alert",
    label: "Rate update / market alert",
    description: "Fed, inventory, and headline context without panic.",
    defaultAudience: "general",
  },
};

export function isLandingPageIntent(value: string): value is LandingPageIntent {
  return LANDING_PAGE_INTENTS.includes(value as LandingPageIntent);
}

export function getLandingPageIntent(id: LandingPageIntent) {
  return LANDING_PAGE_INTENT_CONFIG[id];
}
