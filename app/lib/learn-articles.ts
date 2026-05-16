export type LearnArticle = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  keyTakeaways: string[];
  howItWorks: string[];
  whenItMakesSense: string[];
  ctaTitle: string;
  ctaBody: string;
};

export const learnArticles: LearnArticle[] = [
  {
    slug: "seller-concessions",
    title: "Seller Concessions",
    description:
      "A placeholder guide to seller concessions, credits, cash-to-close strategy, and compliant buyer education.",
    intro:
      "Seller concessions can help buyers think beyond price alone. This placeholder guide explains how credits may affect cash-to-close, payment design, and offer strategy without implying a specific approval, quote, or loan outcome.",
    keyTakeaways: [
      "A seller concession is generally a seller-paid credit toward allowable buyer costs.",
      "Credits can affect cash needed at closing, but they do not automatically make a loan stronger.",
      "The right structure depends on loan type, property, contract terms, and underwriting guidelines.",
    ],
    howItWorks: [
      "The buyer and seller negotiate a credit in the purchase contract.",
      "The lender reviews whether the credit is allowed under the selected loan program.",
      "Approved credits are applied to eligible costs based on guidelines and final settlement figures.",
    ],
    whenItMakesSense: [
      "The buyer wants to preserve cash for reserves or post-closing needs.",
      "A credit creates more practical value than a small price reduction.",
      "The offer strategy can support the credit without weakening seller confidence.",
    ],
    ctaTitle: "Compare credits, cash, and payment before writing the offer.",
    ctaBody:
      "Use The Loan Playbook to evaluate concessions as part of a broader financing strategy, not as a one-size-fits-all tactic.",
  },
  {
    slug: "2-1-buydowns",
    title: "2-1 Buydowns",
    description:
      "A placeholder guide to temporary buydowns, payment education, and borrower strategy.",
    intro:
      "A 2-1 buydown is a temporary payment strategy that may reduce the borrower's payment in the early years of a loan. This page is an educational placeholder for understanding when that structure may or may not fit.",
    keyTakeaways: [
      "A temporary buydown is not the same as a permanent rate reduction.",
      "The upfront cost is typically funded through an approved source such as seller credit or other eligible funds.",
      "Borrowers should understand the future payment after the buydown period ends.",
    ],
    howItWorks: [
      "The loan is underwritten to the required qualifying terms for the program.",
      "A buydown account subsidizes part of the payment during the temporary period.",
      "The payment steps toward the note payment according to the buydown schedule.",
    ],
    whenItMakesSense: [
      "The buyer expects income or cash-flow improvement but can support the long-term payment.",
      "Seller credits are available and the structure passes program guidelines.",
      "The buyer values temporary payment relief more than another use of available credits.",
    ],
    ctaTitle: "Understand the full payment path before using a buydown.",
    ctaBody:
      "The Loan Playbook helps buyers and agents discuss temporary payment relief with context and compliance-aware expectations.",
  },
  {
    slug: "fha-loans",
    title: "FHA Loans",
    description:
      "A placeholder FHA loan guide for buyer education, agent conversations, and loan strategy.",
    intro:
      "FHA loans can be useful for buyers who need flexible credit, down payment, or qualification options. This placeholder guide frames FHA as a strategy conversation, not a label on buyer strength.",
    keyTakeaways: [
      "FHA financing can support buyers with different credit and cash profiles.",
      "Property condition, mortgage insurance, and appraisal requirements matter.",
      "FHA does not automatically mean a weak buyer or weak offer.",
    ],
    howItWorks: [
      "The borrower applies and is reviewed under FHA program guidelines.",
      "The property is evaluated for eligibility and condition standards.",
      "The lender reviews credit, income, assets, debt, and documentation before approval.",
    ],
    whenItMakesSense: [
      "The buyer needs a lower down payment path or more flexible qualification profile.",
      "The property condition and seller expectations align with FHA requirements.",
      "The agent can explain the financing clearly in the offer conversation.",
    ],
    ctaTitle: "Position FHA with clarity, not assumptions.",
    ctaBody:
      "Use the playbook to understand how FHA may fit into buyer readiness, offer strategy, and transaction execution.",
  },
  {
    slug: "va-loans",
    title: "VA Loans",
    description:
      "A placeholder VA loan guide for eligible borrowers, agents, and education-led strategy.",
    intro:
      "VA loans can provide powerful financing options for eligible service members, veterans, and qualifying surviving spouses. This page is a placeholder for strategy-first VA education.",
    keyTakeaways: [
      "VA eligibility is only one part of the approval and property review process.",
      "VA financing can be competitive when the buyer is prepared and the offer is explained well.",
      "Funding fee, entitlement, occupancy, and property standards should be understood early.",
    ],
    howItWorks: [
      "Eligibility and entitlement are reviewed alongside the loan application.",
      "The borrower is evaluated for income, credit, assets, debts, and program requirements.",
      "The property is reviewed through VA appraisal and lender guidelines.",
    ],
    whenItMakesSense: [
      "The borrower is eligible and wants to preserve cash where program rules allow.",
      "The property and transaction timeline fit VA requirements.",
      "The agent and buyer can communicate the financing path with confidence.",
    ],
    ctaTitle: "Make VA strategy part of the offer conversation.",
    ctaBody:
      "The Loan Playbook helps eligible buyers and agents understand how VA financing can be positioned clearly and responsibly.",
  },
  {
    slug: "jumbo-loans",
    title: "Jumbo Loans",
    description:
      "A placeholder jumbo loan guide for higher-balance mortgage strategy and buyer preparation.",
    intro:
      "Jumbo loans can require a deeper look at liquidity, reserves, documentation, property type, and investor guidelines. This placeholder frames jumbo financing as a preparation exercise.",
    keyTakeaways: [
      "Jumbo guidelines can vary by lender and investor.",
      "Reserves, asset documentation, and property details often matter more.",
      "Preparation should happen before the buyer is under contract.",
    ],
    howItWorks: [
      "The borrower is reviewed under higher-balance loan requirements.",
      "Assets, income, credit, reserves, and property details are documented carefully.",
      "The lender evaluates the file against investor-specific guidelines.",
    ],
    whenItMakesSense: [
      "The loan amount exceeds conforming limits and the buyer profile supports jumbo requirements.",
      "The borrower can document reserves and assets clearly.",
      "The timeline allows for a more detailed underwriting review.",
    ],
    ctaTitle: "Prepare the jumbo file before the negotiation starts.",
    ctaBody:
      "Use The Loan Playbook to organize liquidity, documentation, and offer strategy before a high-balance purchase moves quickly.",
  },
  {
    slug: "refinance-timing",
    title: "Refinance Timing",
    description:
      "A placeholder refinance timing guide for education around payment, break-even, and long-term strategy.",
    intro:
      "Refinance timing is not just about whether rates moved. It depends on goals, costs, break-even period, cash flow, debt strategy, and how long the borrower expects the new loan to matter.",
    keyTakeaways: [
      "A lower rate does not automatically mean a refinance makes sense.",
      "Costs, time horizon, loan structure, and borrower goals should be compared together.",
      "Refinance education should avoid implying future rates or guaranteed savings.",
    ],
    howItWorks: [
      "The current loan is compared with a potential new structure.",
      "Costs, payment, cash flow, and break-even period are evaluated.",
      "The borrower decides whether the new structure supports their goals.",
    ],
    whenItMakesSense: [
      "The borrower can identify a clear financial or strategic objective.",
      "The expected benefit reasonably supports the costs and timeline.",
      "The new loan structure improves flexibility, cash flow, or long-term planning.",
    ],
    ctaTitle: "Treat refinance timing as a strategy decision.",
    ctaBody:
      "The Loan Playbook helps borrowers evaluate refinance scenarios with context instead of reacting to market headlines.",
  },
  {
    slug: "heloc-strategy",
    title: "HELOC Strategy",
    description:
      "A placeholder HELOC strategy guide for home equity education and borrower planning.",
    intro:
      "A HELOC can provide access to home equity, but it should be evaluated alongside purpose, repayment plan, risk, and alternatives. This placeholder keeps the conversation educational and strategy-first.",
    keyTakeaways: [
      "A HELOC is revolving credit secured by the home.",
      "Variable rates, draw periods, repayment terms, and lien position matter.",
      "Equity access should be tied to a clear plan, not casual borrowing.",
    ],
    howItWorks: [
      "The lender evaluates equity, credit, income, debts, and property details.",
      "Approved borrowers may draw against the line during the allowed period.",
      "Repayment requirements depend on the HELOC terms and usage.",
    ],
    whenItMakesSense: [
      "The borrower needs flexible access to equity for a defined purpose.",
      "The repayment plan is realistic under the line's terms.",
      "Alternatives such as cash-out refinance or savings have been considered.",
    ],
    ctaTitle: "Use equity with a plan.",
    ctaBody:
      "The Loan Playbook helps borrowers think through HELOC strategy, tradeoffs, and responsible usage before applying.",
  },
  {
    slug: "dscr-loans",
    title: "DSCR Loans",
    description:
      "A placeholder DSCR loan guide for real estate investor education and property cash-flow strategy.",
    intro:
      "DSCR loans are often used by real estate investors when the property's income profile is central to the lending conversation. This placeholder introduces the strategy without implying eligibility or approval.",
    keyTakeaways: [
      "DSCR generally compares property income to debt obligations.",
      "Investor experience, property type, reserves, and market rent assumptions can matter.",
      "Guidelines vary by lender, investor, property, and scenario.",
    ],
    howItWorks: [
      "The lender reviews the property income or rent schedule against proposed debt payments.",
      "The borrower and property are evaluated under investor-focused guidelines.",
      "Terms depend on credit profile, leverage, property type, and program requirements.",
    ],
    whenItMakesSense: [
      "The borrower is evaluating rental property financing.",
      "The property's income profile supports the requested loan structure.",
      "The investor wants a financing path that emphasizes asset cash flow.",
    ],
    ctaTitle: "Underwrite the investment before chasing leverage.",
    ctaBody:
      "Use The Loan Playbook to frame DSCR loans around property performance, reserves, and investor strategy.",
  },
  {
    slug: "commercial-lending",
    title: "Commercial Lending",
    description:
      "A placeholder commercial lending guide for asset, sponsor, structure, and capital strategy education.",
    intro:
      "Commercial lending starts with the asset, sponsor, structure, and business plan. This placeholder gives future content a framework for explaining commercial finance without overpromising terms.",
    keyTakeaways: [
      "Commercial financing depends heavily on the asset, borrower, income, and use case.",
      "Sponsor strength, reserves, tenant profile, and exit strategy can shape the conversation.",
      "Terms and availability vary widely by lender, market, and transaction type.",
    ],
    howItWorks: [
      "The deal is reviewed through collateral, cash flow, borrower strength, and business plan.",
      "The lender evaluates risk, documentation, valuation, and repayment strategy.",
      "Loan structure is matched to the project, property, and sponsor profile where available.",
    ],
    whenItMakesSense: [
      "The borrower is financing an investment, business, development, or income-producing asset.",
      "The property and sponsor story can be documented clearly.",
      "The capital stack and exit strategy support the requested structure.",
    ],
    ctaTitle: "Read the deal before structuring the debt.",
    ctaBody:
      "The Loan Playbook helps operators, investors, and advisors frame commercial lending as a strategy conversation.",
  },
];

export function getLearnArticle(slug: string) {
  return learnArticles.find((article) => article.slug === slug);
}
