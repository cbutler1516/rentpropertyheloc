export type LearnArticle = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  keyTakeaways: string[];
  howItWorks: string[];
  whenItMakesSense: string[];
  commonMistakes?: string[];
  videoTitle?: string;
  videoDescription?: string;
  ctaTitle: string;
  ctaBody: string;
};

export const learnArticles: LearnArticle[] = [
  {
    slug: "seller-concessions",
    title: "Seller Concessions",
    description:
      "A practical seller concessions guide covering buyer credits, cash-to-close, payment strategy, offer structure, and lending guideline limits.",
    intro:
      "Seller concessions are one of the most useful and misunderstood tools in a purchase negotiation. A concession may help with allowable closing costs, temporary buydown funding, prepaid items, or cash-to-close planning, but it has to fit the loan program, contract, property, and underwriting guidelines. The strategy is not simply asking for a credit; it is deciding whether the credit creates more practical value than a price reduction or another negotiation move.",
    keyTakeaways: [
      "A seller concession is generally a seller-paid credit toward eligible buyer costs, subject to loan-program and transaction limits.",
      "A credit can improve cash-to-close planning, but it does not erase qualification requirements or guarantee approval.",
      "The best concession strategy compares cash needed, monthly payment, offer strength, appraisal risk, and seller motivation together.",
      "Unused or ineligible credits can create issues late in the transaction if they are not structured correctly.",
    ],
    howItWorks: [
      "The buyer and agent negotiate a seller-paid credit in the purchase contract or an approved addendum.",
      "The lender reviews the credit against the loan program, occupancy type, property type, down payment, and investor guidelines.",
      "The credit is applied only to eligible costs shown on the loan estimate and closing disclosure.",
      "If the credit is larger than eligible costs, the buyer may not receive the full benefit unless the structure is adjusted early enough.",
      "The strategy should be compared with alternatives such as a lower purchase price, temporary buydown, permanent buydown, or preserving seller confidence.",
    ],
    whenItMakesSense: [
      "The buyer wants to preserve cash for reserves or post-closing needs.",
      "The buyer has enough eligible costs for the credit to be used effectively.",
      "A credit creates more practical value than a small price reduction in the buyer's scenario.",
      "The seller is motivated to negotiate terms without materially reducing the headline price.",
      "The lender, agent, and buyer can confirm program limits before the offer strategy is finalized.",
    ],
    commonMistakes: [
      "Assuming every credit can be used for any cost.",
      "Negotiating a concession before confirming program limits and seller-credit rules.",
      "Focusing only on the credit amount instead of the full payment and cash-to-close picture.",
      "Treating seller concessions as a substitute for borrower qualification, documentation, or underwriting review.",
    ],
    videoTitle: "Seller concessions vs. price reductions",
    videoDescription:
      "Future embed placeholder for a short explainer comparing credits, price reductions, cash-to-close, and payment design.",
    ctaTitle: "Compare credits, cash, and payment before writing the offer.",
    ctaBody:
      "Use The Loan Playbook to evaluate concessions as part of a broader financing strategy, not as a one-size-fits-all tactic.",
  },
  {
    slug: "2-1-buydowns",
    title: "2-1 Buydowns",
    description:
      "Understand 2-1 buydowns, temporary payment relief, seller-credit funding, qualifying considerations, and common borrower mistakes.",
    intro:
      "A 2-1 buydown is a temporary payment strategy that may lower the borrower's effective payment for the first two years of a loan before stepping to the note payment. It can be useful when the borrower understands the full payment path, the funding source is eligible, and the long-term payment still fits the household plan. It should not be used to make an unaffordable loan feel affordable.",
    keyTakeaways: [
      "A temporary buydown is not the same as a permanent rate reduction.",
      "The upfront cost is typically funded through an approved source such as seller credit or other eligible funds.",
      "Borrowers should understand the future payment after the buydown period ends.",
      "The strategy should be compared with other uses of seller credit, including closing-cost support or permanent discount points where available.",
    ],
    howItWorks: [
      "The loan has a note rate and note payment, while the temporary buydown provides scheduled payment support during the early period.",
      "An eligible funding source pays an upfront buydown cost into an account used to subsidize the temporary payment difference.",
      "In a common 2-1 structure, the first year receives more temporary support than the second year, then the payment reaches the note payment.",
      "The lender reviews whether the structure, funding source, and borrower qualification meet program requirements.",
      "The borrower should evaluate the payment after the buydown period, not just the temporary first-year payment.",
    ],
    whenItMakesSense: [
      "The buyer expects income or cash-flow improvement but can support the long-term payment.",
      "Seller credits are available and the structure passes program guidelines.",
      "The buyer values temporary payment relief more than another use of available credits.",
      "The buyer wants time to adjust after purchase while keeping a clear plan for the note payment.",
      "The agent and lender can explain the structure without implying a permanent rate or guaranteed savings.",
    ],
    commonMistakes: [
      "Treating the temporary payment as the long-term affordability number.",
      "Ignoring how the buydown is funded and whether the credit is allowable.",
      "Using a buydown when a different credit strategy would better support the buyer.",
      "Marketing the buydown as a lower rate without clearly explaining the temporary payment path.",
    ],
    videoTitle: "2-1 buydown in under 60 seconds",
    videoDescription:
      "Future embed placeholder for a fast visual explanation of year-one, year-two, and long-term payment expectations.",
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
      "A jumbo loan strategy guide for higher-balance buyers preparing documentation, reserves, liquidity, appraisal risk, and offer expectations.",
    intro:
      "Jumbo lending is not just a larger version of a standard mortgage. Higher-balance loans can involve different investor guidelines, deeper asset review, reserve requirements, property scrutiny, and documentation expectations. The strategy is to make the borrower profile, liquidity, income, and property story clear before the buyer is competing for a higher-value home.",
    keyTakeaways: [
      "Jumbo guidelines can vary by lender and investor.",
      "Reserves, asset documentation, income stability, and property details often matter more.",
      "Preparation should happen before the buyer is under contract.",
      "A strong jumbo strategy makes the file easier to understand for underwriting, listing agents, and transaction partners.",
    ],
    howItWorks: [
      "The borrower is reviewed under higher-balance loan requirements that may be more detailed than conforming guidelines.",
      "Income, assets, credit, reserves, debts, property type, occupancy, and loan structure are documented carefully.",
      "Large deposits, complex compensation, self-employment, RSUs, bonuses, business ownership, or multiple properties may require added explanation.",
      "The lender evaluates the file against investor-specific guidelines and may require more time for review.",
      "Offer strategy should account for appraisal risk, documentation timing, and seller confidence.",
    ],
    whenItMakesSense: [
      "The loan amount exceeds conforming limits and the buyer profile supports jumbo requirements.",
      "The borrower can document reserves and assets clearly.",
      "The timeline allows for a more detailed underwriting review.",
      "The buyer is purchasing a higher-value property where listing agents expect proof of strength and clear financing communication.",
      "The borrower wants to compare jumbo structure with alternatives such as larger down payment, portfolio options, or other available products.",
    ],
    commonMistakes: [
      "Waiting until contract to organize asset and reserve documentation.",
      "Assuming jumbo guidelines are the same across lenders and investors.",
      "Underestimating property review, appraisal, or liquidity requirements.",
      "Treating a high credit score as the whole strategy when income, reserves, and property details also matter.",
    ],
    videoTitle: "Jumbo readiness checklist",
    videoDescription:
      "Future embed placeholder for a film-room style checklist covering reserves, documentation, property risk, and offer timing.",
    ctaTitle: "Prepare the jumbo file before the negotiation starts.",
    ctaBody:
      "Use The Loan Playbook to organize liquidity, documentation, and offer strategy before a high-balance purchase moves quickly.",
  },
  {
    slug: "refinance-timing",
    title: "Refinance Timing",
    description:
      "Learn how to evaluate refinance timing with payment, costs, break-even, cash flow, debt strategy, loan term, and time horizon in mind.",
    intro:
      "Refinance timing is not just about whether rates moved. A useful refinance conversation starts with the borrower's goal: lower payment, shorter term, debt consolidation, cash flow, equity access, risk reduction, or long-term flexibility. From there, costs, break-even period, loan term, cash flow, and time horizon need to be compared together.",
    keyTakeaways: [
      "A lower rate does not automatically mean a refinance makes sense.",
      "Costs, time horizon, loan structure, and borrower goals should be compared together.",
      "Refinance education should avoid implying future rates or guaranteed savings.",
      "The right answer can change depending on how long the borrower expects to keep the loan or property.",
    ],
    howItWorks: [
      "The current loan is compared with one or more potential new structures.",
      "The borrower reviews payment, closing costs, prepaid items, escrow changes, loan term, and total cash-flow impact.",
      "A break-even estimate helps frame how long it may take for monthly benefit to offset costs, when applicable.",
      "Debt consolidation, cash-out, or term changes are evaluated against the borrower's broader financial plan.",
      "The borrower decides whether the new structure supports their goals without relying on rate predictions.",
    ],
    whenItMakesSense: [
      "The borrower can identify a clear financial or strategic objective.",
      "The expected benefit reasonably supports the costs and timeline.",
      "The new loan structure improves flexibility, cash flow, or long-term planning.",
      "The borrower understands how the new loan term, balance, and closing costs affect the full picture.",
      "The refinance solves a real problem rather than reacting to a market headline.",
    ],
    commonMistakes: [
      "Reacting to a headline rate without comparing total costs and time horizon.",
      "Ignoring how long the borrower expects to keep the new loan.",
      "Looking only at payment reduction instead of broader financial objectives.",
      "Resetting the loan term without understanding how it affects long-term interest and payoff goals.",
    ],
    videoTitle: "Rates moved. Should you refinance?",
    videoDescription:
      "Future embed placeholder for a refinance timing explainer focused on break-even, costs, and strategy rather than rate predictions.",
    ctaTitle: "Treat refinance timing as a strategy decision.",
    ctaBody:
      "The Loan Playbook helps borrowers evaluate refinance scenarios with context instead of reacting to market headlines.",
  },
  {
    slug: "heloc-strategy",
    title: "HELOC Strategy",
    description:
      "A HELOC strategy guide for understanding home equity access, draw periods, repayment risk, variable rates, lien position, and responsible planning.",
    intro:
      "A HELOC can provide flexible access to home equity, but it is still debt secured by the home. The strategy should begin with purpose, repayment plan, rate structure, draw period, lien position, risk, and alternatives. The goal is to use equity intentionally rather than treating it like casual cash flow.",
    keyTakeaways: [
      "A HELOC is revolving credit secured by the home.",
      "Variable rates, draw periods, repayment terms, and lien position matter.",
      "Equity access should be tied to a clear plan, not casual borrowing.",
      "A HELOC should be compared with cash-out refinance, savings, personal credit, or waiting, depending on the goal.",
    ],
    howItWorks: [
      "The lender evaluates available equity, credit, income, debts, property details, and lien position.",
      "If approved, the borrower receives a line of credit that may be drawn during the permitted draw period.",
      "Interest, payment requirements, and future repayment terms depend on the HELOC agreement and usage.",
      "Many HELOCs have variable rates, so payment risk should be reviewed before funds are used.",
      "The borrower should compare how the HELOC affects monthly obligations, available equity, and future financing flexibility.",
    ],
    whenItMakesSense: [
      "The borrower needs flexible access to equity for a defined purpose.",
      "The repayment plan is realistic under the line's terms.",
      "Alternatives such as cash-out refinance or savings have been considered.",
      "The borrower wants access to funds over time rather than one lump-sum refinance structure.",
      "The borrower understands variable-rate and secured-debt risk.",
    ],
    commonMistakes: [
      "Using equity without a defined repayment strategy.",
      "Ignoring variable-rate risk, draw periods, and future payment changes.",
      "Comparing a HELOC to a refinance without considering total structure and goals.",
      "Using short-term equity access for ongoing expenses without a sustainable plan.",
    ],
    videoTitle: "HELOC strategy before borrowing",
    videoDescription:
      "Future embed placeholder for an educational video on equity access, repayment planning, and alternatives.",
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
