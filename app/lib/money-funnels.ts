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
    ogTitle: "A seller credit can change the monthly payment.",
    ogDescription:
      "Understand how seller credits may support payment relief, cash to close, and negotiation strategy before writing an offer.",
    heroLead: "Most buyers do not realize what sellers can contribute.",
    heroFocus: "Payment relief. Cash to close. Offer leverage.",
    videoSlug: "buyer-readiness-before-search",
    videoTitle: "A credit may beat a price cut.",
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
    ctaTitle: "Use the credit with a plan.",
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
    ogTitle: "The first-year payment can breathe.",
    ogDescription:
      "Understand how temporary payment relief works, who may fund it, and when buyers and agents should consider the structure.",
    heroLead: "The payment buyers qualify for is not always the payment they want.",
    heroFocus: "Temporary relief. Gradual transition. Long-term payment clarity.",
    videoSlug: "mortgage-strategy-clear-idea",
    videoTitle: "Can the first-year payment breathe?",
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
    ctaTitle: "Know the future payment first.",
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
    title: "The best refinance timing is not always obvious.",
    description:
      "A concise refinance timing funnel for evaluating payment strategy, rate movement, cash-flow flexibility, equity access, and long-term planning.",
    ogTitle: "Rate movement is only part of the decision.",
    ogDescription:
      "Review refinance timing through payment, costs, equity, cash flow, HELOC alternatives, and long-term flexibility.",
    heroLead: "Rate movement is only part of the equation.",
    heroFocus: "Payment. Equity. Cash flow. Timing.",
    videoSlug: "market-context-without-noise",
    videoTitle: "Rates moved. Now what?",
    videoLead: "A refinance should solve a real problem, not react to a headline.",
    takeaways: [
      "A lower rate does not automatically mean better timing.",
      "Payment structure can matter more than the headline.",
      "Equity access should be compared with HELOC options.",
      "Cash flow, costs, and time horizon belong in the same conversation.",
      "Waiting too long can create missed flexibility.",
    ],
    takeawaysEyebrow: "Homeowner Lens",
    takeawaysTitle: "What timing really depends on.",
    takeawaysLead: "The right move starts with the goal, not the rate.",
    mistakes: [
      "Waiting for the perfect rate.",
      "Focusing only on rate.",
      "Ignoring payment structure.",
      "Missing equity opportunities.",
      "Delaying until pressure builds.",
    ],
    mistakesEyebrow: "Misconceptions",
    mistakesTitle: "Where homeowners get stuck.",
    mistakesLead: "Refinance timing is rarely one number.",
    clarifies: [
      "Lower payment",
      "Shorten term",
      "Access equity",
      "Remove debt pressure",
      "Improve cash flow",
    ],
    clarifiesEyebrow: "Flexibility",
    clarifiesTitle: "How refinancing can create flexibility.",
    clarifiesLead: "No calculator. Just the main homeowner levers.",
    howItWorks: [
      { title: "Compare", body: "Refinance, HELOC, cash-out, or waiting." },
      { title: "Measure", body: "Payment, costs, equity, term, and cash flow." },
      { title: "Choose", body: "Preserve flexibility where it matters." },
    ],
    howItWorksEyebrow: "Refi / HELOC Relationship",
    howItWorksTitle: "Structure before action.",
    howItWorksLead:
      "A refinance, HELOC, and cash-out strategy can solve different problems.",
    trustSignals: [
      "Education-first approach",
      "Long-term planning",
      "Payment strategy",
      "Financing structure clarity",
    ],
    ctaLabel: "Review Refinance Timing",
    ctaTitle: "Do not reset the loan on a headline.",
    ctaBody: "Send the scenario. We will help frame payment, equity, cash flow, and fit.",
    formType: "Buyer Strategy Call",
    bookingType: "buyer",
    relatedGuides: [
      { label: "Guide", title: "HELOC strategy", href: "/learn/heloc-strategy" },
      { label: "Guide", title: "2-1 buydowns", href: "/learn/2-1-buydowns" },
      { label: "Guide", title: "Jumbo loans", href: "/learn/jumbo-loans" },
    ],
    relatedSocialSlugs: ["market-context-without-noise", "mortgage-strategy-clear-idea"],
    transcriptPlaceholder:
      "Transcript placeholder for a refinance timing video covering rate movement, payment structure, cash flow, equity access, HELOC alternatives, and long-term planning.",
    faqPlaceholder: [
      "When does a refinance make sense?",
      "Should homeowners wait for a lower rate?",
      "How do refinance costs affect timing?",
      "When is a HELOC better than refinancing?",
      "How should cash-out be compared with other options?",
    ],
  },
  helocStrategy: {
    slug: "heloc-strategy",
    eyebrow: "HELOC Strategy",
    title: "Access flexibility without rebuilding the whole mortgage.",
    description:
      "A concise HELOC strategy funnel for understanding equity access, liquidity, payment strategy, first-mortgage preservation, and refinance alternatives.",
    ogTitle: "Your equity may be more useful than you think.",
    ogDescription:
      "Understand how a HELOC may support flexibility, liquidity, renovations, debt restructuring, and equity strategy without replacing the entire mortgage.",
    heroLead: "Sometimes the smartest move is leaving the first mortgage alone.",
    heroFocus: "Equity access. Liquidity. Payment strategy.",
    videoSlug: "creative-mortgage-media-test",
    videoTitle: "Sometimes leave the first mortgage alone.",
    videoLead: "Flexibility matters, but secured debt still needs structure.",
    takeaways: [
      "A HELOC can preserve a low first mortgage.",
      "Flexibility is different from permanence.",
      "Equity should have a defined purpose.",
      "Payment changes and repayment terms matter.",
      "Cash-out refinancing may solve a different problem.",
    ],
    takeawaysEyebrow: "Homeowner Lens",
    takeawaysTitle: "What a HELOC actually changes.",
    takeawaysLead: "Access is useful only when the structure makes sense.",
    mistakes: [
      "Comparing HELOCs and cash-out refis too quickly.",
      "Ignoring the value of a low first mortgage.",
      "Treating flexibility like free cash.",
      "Missing future payment changes.",
      "Using equity without a repayment plan.",
    ],
    mistakesEyebrow: "Misconceptions",
    mistakesTitle: "Where equity decisions get messy.",
    mistakesLead: "The question is not just access. It is structure.",
    clarifies: [
      "Renovations",
      "Debt restructuring",
      "Reserves / liquidity",
      "Investment opportunities",
      "Bridge flexibility",
      "Business or real estate opportunities",
    ],
    clarifiesEyebrow: "Flexibility + Liquidity",
    clarifiesTitle: "How homeowners use equity strategically.",
    clarifiesLead: "No calculator. Just the main use cases.",
    howItWorks: [
      { title: "Compare", body: "HELOC, cash-out refinance, or waiting." },
      { title: "Blend", body: "First mortgage, line payment, and cash flow." },
      { title: "Preserve", body: "Keep future refinance optionality open." },
    ],
    howItWorksEyebrow: "HELOC / Refinance Relationship",
    howItWorksTitle: "Structure the equity move.",
    howItWorksLead:
      "A HELOC, cash-out refinance, and blended payment strategy can each play a different role.",
    trustSignals: [
      "Education-first approach",
      "Financing structure clarity",
      "Long-term flexibility",
      "Payment strategy",
      "Advisory mindset",
    ],
    ctaLabel: "Understand HELOC Options",
    ctaTitle: "Use equity without losing flexibility.",
    ctaBody: "Send the goal. We will help compare access, payment, flexibility, and fit.",
    formType: "Buyer Strategy Call",
    bookingType: "buyer",
    relatedGuides: [
      { label: "Guide", title: "Refinance timing", href: "/learn/refinance-timing" },
      { label: "Guide", title: "Jumbo loans", href: "/learn/jumbo-loans" },
      { label: "Guide", title: "Buyer readiness", href: "/learn/buyer-readiness" },
    ],
    relatedSocialSlugs: ["creative-mortgage-media-test", "market-context-without-noise"],
    transcriptPlaceholder:
      "Transcript placeholder for a HELOC strategy video covering equity access, first-mortgage preservation, cash-out alternatives, payment strategy, and long-term flexibility.",
    faqPlaceholder: [
      "When does a HELOC make sense?",
      "How is a HELOC different from a cash-out refinance?",
      "Can a HELOC preserve a low first mortgage?",
      "What payment risks should homeowners understand?",
      "How should equity access be compared with future refinance options?",
    ],
  },
  agentFinancingPlaybook: {
    slug: "financing-playbook",
    eyebrow: "Agent Financing Playbook",
    title: "Help buyers make the move clearer.",
    description:
      "A concise agent financing playbook funnel for buyer readiness, financing context, offer conversations, and agent education.",
    heroLead: "The buyer who understands payment moves differently.",
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
