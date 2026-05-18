import type { LeadFormType } from "../components/lead-capture-form";

export type MoneyFunnel = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  heroLead: string;
  heroFocus?: string;
  videoSlug: string;
  videoTitle?: string;
  videoLead?: string;
  takeaways: string[];
  takeawaysEyebrow?: string;
  takeawaysTitle?: string;
  takeawaysLead?: string;
  mistakes: string[];
  mistakesEyebrow?: string;
  mistakesTitle?: string;
  mistakesLead?: string;
  clarifies: string[];
  clarifiesEyebrow?: string;
  clarifiesTitle?: string;
  clarifiesLead?: string;
  howItWorks: Array<{
    title: string;
    body: string;
  }>;
  howItWorksEyebrow?: string;
  howItWorksTitle?: string;
  howItWorksLead?: string;
  trustSignals?: string[];
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
    title: "Lower the payment without lowering your offer.",
    description:
      "A concise seller concessions funnel for understanding payment relief, cash to close, buyer affordability, and offer strategy.",
    ogTitle: "Seller concessions can change the monthly payment.",
    ogDescription:
      "Understand how seller credits may support payment relief, cash to close, and negotiation strategy before writing an offer.",
    heroLead: "Most buyers do not realize what sellers can contribute.",
    heroFocus: "Payment relief. Cash to close. Offer leverage.",
    videoSlug: "buyer-readiness-before-search",
    videoTitle: "Why credits matter before the offer",
    videoLead: "Start with the payment story, then structure the ask.",
    takeaways: [
      "Seller concessions are negotiated credits toward eligible buyer costs.",
      "A credit can affect affordability more than buyers expect.",
      "Agents can use credits to frame a stronger offer conversation.",
      "Program rules decide what can actually be used.",
      "Concessions matter most when cash and payment are tight.",
    ],
    takeawaysEyebrow: "Buyer + Agent Lens",
    takeawaysTitle: "What concessions actually do.",
    takeawaysLead: "A credit is not magic. It is structure.",
    mistakes: [
      "Assuming sellers cannot contribute.",
      "Asking for a credit without checking limits.",
      "Focusing only on rate.",
      "Ignoring seller motivation.",
      "Treating credits like cash back.",
    ],
    mistakesEyebrow: "Misconceptions",
    mistakesTitle: "Where buyers get it wrong.",
    mistakesLead: "The problem is usually structure, not the idea.",
    clarifies: [
      "Lower monthly payment",
      "Reduce cash to close",
      "Help buy down the rate",
      "Improve affordability",
    ],
    clarifiesEyebrow: "Payment Impact",
    clarifiesTitle: "How concessions can help.",
    clarifiesLead: "No calculator. Just the practical levers.",
    howItWorks: [
      { title: "Compare", body: "Price, payment, credit, and cash." },
      { title: "Confirm", body: "Eligible costs and program limits." },
      { title: "Negotiate", body: "Ask with a clear reason." },
    ],
    howItWorksEyebrow: "Negotiation Strategy",
    howItWorksTitle: "Structure before the ask.",
    howItWorksLead: "Buyers need the numbers. Agents need the story.",
    trustSignals: [
      "Education-first approach",
      "Financing structure guidance",
      "Strategy before touring or offers",
    ],
    ctaLabel: "Explore Seller Options",
    ctaTitle: "Explore the credit before you write the offer.",
    ctaBody: "Send the scenario. We will help frame payment, cash, and offer leverage.",
    formType: "Buyer Strategy Call",
    bookingType: "buyer",
    relatedGuides: [
      { label: "Guide", title: "2-1 buydowns", href: "/learn/2-1-buydowns" },
      { label: "Guide", title: "Buyer readiness", href: "/learn/buyer-readiness" },
      { label: "Guide", title: "Jumbo loans", href: "/learn/jumbo-loans" },
    ],
    relatedSocialSlugs: ["buyer-readiness-before-search", "mortgage-strategy-clear-idea"],
    transcriptPlaceholder:
      "Transcript placeholder for a seller concessions video covering payment relief, cash to close, and offer strategy.",
    faqPlaceholder: [
      "What can seller concessions help pay for?",
      "Can concessions lower the monthly payment?",
      "When is a credit better than a price reduction?",
      "What should agents confirm before writing the offer?",
    ],
  },
  twoOneBuydowns: {
    slug: "2-1-buydowns",
    eyebrow: "2-1 Buydowns",
    title: "Create breathing room when rates feel high.",
    description:
      "A concise 2-1 buydown funnel for understanding temporary payment relief, seller credits, buyer affordability, and long-term payment planning.",
    ogTitle: "2-1 buydowns can create early payment breathing room.",
    ogDescription:
      "Understand how temporary payment relief works, who may fund it, and when buyers and agents should consider the structure.",
    heroLead: "The payment buyers qualify for is not always the payment they want.",
    heroFocus: "Temporary relief. Gradual transition. Long-term payment clarity.",
    videoSlug: "mortgage-strategy-clear-idea",
    videoTitle: "The payment path matters",
    videoLead: "A buydown can help only when the future payment still makes sense.",
    takeaways: [
      "A 2-1 buydown temporarily lowers the payment.",
      "Seller concessions often fund the structure.",
      "The note payment still matters.",
      "Buydowns can help buyers adjust into ownership.",
      "Agents can use buydowns to frame affordability in slower markets.",
    ],
    takeawaysEyebrow: "Buyer + Agent Lens",
    takeawaysTitle: "What a buydown actually solves.",
    takeawaysLead: "Payment psychology matters, but the full path matters more.",
    mistakes: [
      "Treating year-one payment as permanent.",
      "Ignoring who pays for the buydown.",
      "Skipping the long-term payment review.",
      "Using credits without comparing alternatives.",
      "Assuming refinance timing is guaranteed.",
    ],
    mistakesEyebrow: "Misconceptions",
    mistakesTitle: "Where buydowns get misunderstood.",
    mistakesLead: "Temporary relief should not hide long-term affordability.",
    clarifies: ["Year one", "Year two", "Note payment", "Seller credit", "Fit"],
    clarifiesEyebrow: "Payment Relief",
    clarifiesTitle: "How temporary payment relief works.",
    clarifiesLead: "No calculator. Just the basic payment path.",
    howItWorks: [
      { title: "Lower", body: "Year one starts with more payment support." },
      { title: "Step", body: "Year two transitions toward the note payment." },
      { title: "Plan", body: "The long-term payment must still fit." },
    ],
    howItWorksEyebrow: "How It Works",
    howItWorksTitle: "Relief first. Clarity always.",
    howItWorksLead:
      "The structure can create flexibility, not a guarantee of future savings.",
    trustSignals: [
      "Education-first guidance",
      "Financing structure clarity",
      "Long-term payment planning",
    ],
    ctaLabel: "Understand Buydown Options",
    ctaTitle: "Understand the payment path before using a buydown.",
    ctaBody: "Send the scenario. We will help frame payment relief, credits, and fit.",
    formType: "Buyer Strategy Call",
    bookingType: "buyer",
    relatedGuides: [
      { label: "Guide", title: "Seller concessions", href: "/learn/seller-concessions" },
      { label: "Guide", title: "Buyer readiness", href: "/learn/buyer-readiness" },
      { label: "Guide", title: "Refinance timing", href: "/learn/refinance-timing" },
    ],
    relatedSocialSlugs: ["mortgage-strategy-clear-idea", "buyer-readiness-before-search"],
    transcriptPlaceholder:
      "Transcript placeholder for a 2-1 buydown video covering year-one relief, year-two transition, funding source, and long-term payment planning.",
    faqPlaceholder: [
      "What is a 2-1 buydown?",
      "Who can pay for a temporary buydown?",
      "Is the lower payment permanent?",
      "When does a buydown help buyers?",
      "When might a buydown not make sense?",
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
