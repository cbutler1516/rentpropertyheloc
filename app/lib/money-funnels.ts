import type { LeadFormType } from "../components/lead-capture-form";

export type MoneyFunnel = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  heroLead: string;
  videoSlug: string;
  takeaways: string[];
  mistakes: string[];
  clarifies: string[];
  howItWorks: Array<{
    title: string;
    body: string;
  }>;
  ctaLabel: string;
  ctaTitle: string;
  ctaBody: string;
  formType: LeadFormType;
  bookingType?: "buyer" | "agent";
  relatedGuides: Array<{
    label: string;
    title: string;
    href: string;
  }>;
  relatedSocialSlugs: string[];
  transcriptPlaceholder: string;
  faqPlaceholder: string[];
};

export const moneyFunnels = {
  sellerConcessions: {
    slug: "seller-concessions",
    eyebrow: "Seller Concessions",
    title: "Use credits with a plan.",
    description:
      "A concise seller concessions funnel for understanding credits, cash to close, payment tradeoffs, and offer strategy.",
    heroLead: "Credits can help. Structure decides whether they actually work.",
    videoSlug: "buyer-readiness-before-search",
    takeaways: [
      "Credits must fit program rules.",
      "Cash to close matters more than headline price.",
      "Unused credits can create friction.",
      "Offer strength still matters.",
    ],
    mistakes: [
      "Asking for a credit without confirming limits.",
      "Ignoring appraisal and seller motivation.",
      "Treating credits like guaranteed cash back.",
    ],
    clarifies: ["Credit limits", "Eligible costs", "Cash to close", "Payment", "Offer path"],
    howItWorks: [
      { title: "Compare", body: "Credit, price, payment, and cash." },
      { title: "Confirm", body: "Program rules and eligible costs." },
      { title: "Write", body: "Structure the offer with context." },
    ],
    ctaLabel: "Explore Seller Options",
    ctaTitle: "Compare the credit before you write the offer.",
    ctaBody: "Send the scenario. We will help frame the next move.",
    formType: "Buyer Strategy Call",
    bookingType: "buyer",
    relatedGuides: [
      { label: "Guide", title: "2-1 buydowns", href: "/learn/2-1-buydowns" },
      { label: "Guide", title: "Buyer readiness", href: "/learn/buyer-readiness" },
      { label: "Guide", title: "Jumbo loans", href: "/learn/jumbo-loans" },
    ],
    relatedSocialSlugs: ["buyer-readiness-before-search", "mortgage-strategy-clear-idea"],
    transcriptPlaceholder: "Transcript placeholder for seller concessions video.",
    faqPlaceholder: [
      "What can seller credits pay for?",
      "How much credit is allowed?",
      "Is a credit better than a price cut?",
    ],
  },
  twoOneBuydowns: {
    slug: "2-1-buydowns",
    eyebrow: "2-1 Buydowns",
    title: "Know the payment path.",
    description:
      "A concise 2-1 buydown funnel for understanding temporary payment relief, seller credits, and long-term affordability.",
    heroLead: "A lower first-year payment is not the whole strategy.",
    videoSlug: "mortgage-strategy-clear-idea",
    takeaways: [
      "Temporary is not permanent.",
      "Funding source matters.",
      "Long-term payment still has to fit.",
      "Credits have tradeoffs.",
    ],
    mistakes: [
      "Selling the temporary payment as the real payment.",
      "Skipping the funding-source review.",
      "Ignoring other uses for the credit.",
    ],
    clarifies: ["Year one", "Year two", "Note payment", "Seller credit", "Fit"],
    howItWorks: [
      { title: "Model", body: "Temporary and long-term payment." },
      { title: "Review", body: "Funding source and program rules." },
      { title: "Decide", body: "Compare against other credit uses." },
    ],
    ctaLabel: "Start Your Buyer Strategy",
    ctaTitle: "Understand the buydown before you use it.",
    ctaBody: "Send the deal. We will help frame the payment path.",
    formType: "Buyer Strategy Call",
    bookingType: "buyer",
    relatedGuides: [
      { label: "Guide", title: "Seller concessions", href: "/learn/seller-concessions" },
      { label: "Guide", title: "Buyer readiness", href: "/learn/buyer-readiness" },
      { label: "Guide", title: "Refinance timing", href: "/learn/refinance-timing" },
    ],
    relatedSocialSlugs: ["mortgage-strategy-clear-idea", "buyer-readiness-before-search"],
    transcriptPlaceholder: "Transcript placeholder for 2-1 buydown video.",
    faqPlaceholder: [
      "Who funds a 2-1 buydown?",
      "Is the lower payment permanent?",
      "How should buyers compare credits?",
    ],
  },
  refinanceTiming: {
    slug: "refinance-timing",
    eyebrow: "Refinance Timing",
    title: "Do not chase the headline.",
    description:
      "A concise refinance timing funnel for comparing payment, costs, break-even, cash flow, and borrower goals.",
    heroLead: "A refinance should solve a real problem, not react to noise.",
    videoSlug: "market-context-without-noise",
    takeaways: [
      "Rate is only one input.",
      "Costs and time horizon matter.",
      "Break-even is context, not a guarantee.",
      "Goals drive the structure.",
    ],
    mistakes: [
      "Reacting to headline rates.",
      "Ignoring the loan term reset.",
      "Looking only at monthly payment.",
    ],
    clarifies: ["Payment", "Costs", "Break-even", "Cash flow", "Time horizon"],
    howItWorks: [
      { title: "Compare", body: "Current loan vs. new structure." },
      { title: "Measure", body: "Costs, payment, term, and time." },
      { title: "Decide", body: "Move only if the goal is clear." },
    ],
    ctaLabel: "Review Refinance Timing",
    ctaTitle: "Review timing before you reset the loan.",
    ctaBody: "Send the scenario. We will help organize the tradeoffs.",
    formType: "Buyer Strategy Call",
    bookingType: "buyer",
    relatedGuides: [
      { label: "Guide", title: "HELOC strategy", href: "/learn/heloc-strategy" },
      { label: "Guide", title: "2-1 buydowns", href: "/learn/2-1-buydowns" },
      { label: "Guide", title: "Jumbo loans", href: "/learn/jumbo-loans" },
    ],
    relatedSocialSlugs: ["market-context-without-noise", "mortgage-strategy-clear-idea"],
    transcriptPlaceholder: "Transcript placeholder for refinance timing video.",
    faqPlaceholder: [
      "When does a refinance make sense?",
      "What is a break-even period?",
      "How do costs affect timing?",
    ],
  },
  helocStrategy: {
    slug: "heloc-strategy",
    eyebrow: "HELOC Strategy",
    title: "Use equity with intent.",
    description:
      "A concise HELOC funnel for understanding equity access, repayment risk, draw periods, variable rates, and alternatives.",
    heroLead: "A HELOC is flexible. It is still debt secured by the home.",
    videoSlug: "creative-mortgage-media-test",
    takeaways: [
      "Purpose comes first.",
      "Variable-rate risk matters.",
      "Draw and repayment periods matter.",
      "Compare alternatives.",
    ],
    mistakes: [
      "Using equity without a repayment plan.",
      "Ignoring future payment changes.",
      "Treating access like income.",
    ],
    clarifies: ["Equity", "Purpose", "Payment risk", "Draw period", "Alternatives"],
    howItWorks: [
      { title: "Define", body: "Use case and repayment plan." },
      { title: "Compare", body: "HELOC, cash-out, savings, or waiting." },
      { title: "Protect", body: "Know the risk before drawing." },
    ],
    ctaLabel: "Understand Your Equity Options",
    ctaTitle: "Review equity before you use it.",
    ctaBody: "Send the goal. We will help compare the structure.",
    formType: "Buyer Strategy Call",
    bookingType: "buyer",
    relatedGuides: [
      { label: "Guide", title: "Refinance timing", href: "/learn/refinance-timing" },
      { label: "Guide", title: "Jumbo loans", href: "/learn/jumbo-loans" },
      { label: "Guide", title: "Buyer readiness", href: "/learn/buyer-readiness" },
    ],
    relatedSocialSlugs: ["creative-mortgage-media-test", "market-context-without-noise"],
    transcriptPlaceholder: "Transcript placeholder for HELOC strategy video.",
    faqPlaceholder: [
      "What is a HELOC used for?",
      "How does repayment work?",
      "How should borrowers compare alternatives?",
    ],
  },
  agentFinancingPlaybook: {
    slug: "financing-playbook",
    eyebrow: "Agent Financing Playbook",
    title: "Help buyers think clearer.",
    description:
      "A concise agent financing playbook funnel for buyer readiness, financing context, offer conversations, and agent education.",
    heroLead: "Better financing context creates cleaner client conversations.",
    videoSlug: "agent-financing-conversation",
    takeaways: [
      "Pre-approval is not the whole story.",
      "Payment context changes buyer behavior.",
      "Credits and terms shape offers.",
      "Prepared buyers move cleaner.",
    ],
    mistakes: [
      "Treating the letter as the full strategy.",
      "Waiting until contract to discuss risk.",
      "Using generic mortgage content.",
    ],
    clarifies: ["Readiness", "Payment", "Credits", "Timeline", "Risk"],
    howItWorks: [
      { title: "Educate", body: "Give buyers the right context early." },
      { title: "Prepare", body: "Spot friction before the offer." },
      { title: "Support", body: "Use content that feels premium." },
    ],
    ctaLabel: "Talk With Our Team",
    ctaTitle: "Build better financing conversations.",
    ctaBody: "Tell us your market, audience, and content needs.",
    formType: "Agent Partnership Conversation",
    bookingType: "agent",
    relatedGuides: [
      { label: "Guide", title: "Buyer readiness", href: "/learn/buyer-readiness" },
      { label: "Guide", title: "Seller concessions", href: "/learn/seller-concessions" },
      { label: "Guide", title: "Jumbo loans", href: "/learn/jumbo-loans" },
    ],
    relatedSocialSlugs: ["agent-financing-conversation", "buyer-readiness-before-search"],
    transcriptPlaceholder: "Transcript placeholder for agent financing playbook video.",
    faqPlaceholder: [
      "How can agents use financing education?",
      "What can be co-branded?",
      "What needs compliance review?",
    ],
  },
} satisfies Record<string, MoneyFunnel>;
