export const googleReviewConfig = {
  label: "Share your experience on Google",
  href:
    process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ??
    "https://www.google.com/search?q=Broadview+Lending+reviews",
};

/** Restrained review snippets — outcome-style, no fake names. Swap when verified. */
export const googleReviewSnippets = [
  {
    id: "buyer-clarity",
    text: "Finally understood payment and cash to close before we toured—no rate-quote pressure.",
    context: "Buyer readiness",
  },
  {
    id: "agent-context",
    text: "Financing showed up in the conversation before the offer, not after inspection.",
    context: "Agent partnership",
  },
  {
    id: "homeowner-timing",
    text: "Refinance framing around break-even and timeline—not just ‘rates dropped.’",
    context: "Homeowner strategy",
  },
] as const;

export const whyClientsWorkWithUs = [
  "Education before rate quotes—context you can actually use.",
  "Residential and commercial paths under one strategic lens.",
  "Puget Sound depth and multi-state licensing—jumbo, Eastside, and move-up sequencing.",
  "Clear lending partnership through Broadview Lending.",
];

export const borrowerOutcomes = [
  {
    label: "Buyer readiness",
    outcome:
      "Payment and cash-to-close clarity before touring competitive listings.",
  },
  {
    label: "Move-up timing",
    outcome:
      "Buy-before-sell sequencing framed early—so the next home does not depend on guesswork.",
  },
  {
    label: "Jumbo structure",
    outcome:
      "Documentation and reserve expectations clarified before Eastside offer week.",
  },
];

export const agentTrustSnippets = [
  {
    outcome:
      "Financing context that shows up before the offer—not as a post-inspection surprise.",
  },
  {
    outcome:
      "Buyer letters backed by a prepared file, not just a pre-qualification estimate.",
  },
];
