import type { PlaybookNarrative } from "./narrative-types";
import { dealPathMeta } from "./constants";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import type { DealAnalysisResult, DealInputs, DealPath } from "./types";

export type { PlaybookNarrative };
export type ReportNarrative = PlaybookNarrative;

type StaticMeta = {
  leadRole?: string;
  leadName?: string;
  agentName?: string;
};

function pathLabel(path: DealPath): string {
  return dealPathMeta[path].label;
}

export function generateStaticNarrative(
  inputs: DealInputs,
  analysis: DealAnalysisResult,
  meta?: StaticMeta,
): PlaybookNarrative {
  const path = pathLabel(inputs.path);
  const payment = formatCurrency(analysis.payment.total);
  const ltv = formatPercent(analysis.ltv, 1);
  const firstName = meta?.leadName?.split(" ")[0];
  const greeting = firstName ? `${firstName}, here's` : "Here's";

  let recommendedStrategy = `For this ${path.toLowerCase()} scenario, the structure centers on a ${ltv} LTV position with an estimated total housing or debt payment near ${payment}. Before you commit to terms, I'd want clarity on cash, reserves, timeline, and what problem we're actually solving.`;
  let executiveSummary = `${greeting} the Playbook read on your ${path.toLowerCase()} scenario: roughly ${payment} per month on the debt/housing line, with structure driven by price, down payment, and program fit—not just rate.`;
  let clientFriendlyExplanation = `Think of this as a directional map, not a final loan offer. Your estimated monthly cost lands around ${payment}, and the loan amount relative to the property value (LTV) is about ${ltv}. The right next move is to confirm which loan program fits your timeline and comfort with cash to close.`;
  let agentShareMessage = `I put together a Playbook Report on the financing picture for this property—payment, cash, and strategy tradeoffs. Numbers are educational estimates; when you're ready, we can walk through it with Chris Butler and confirm what actually works for your situation.`;

  const coachNotes: string[] = [
    "Start with the monthly payment and cash-to-close together—one number without the other rarely tells the story.",
    "These figures are directional; your actual structure depends on program, property, credit, and full underwriting.",
    "Confirm allowable seller credits, reserves, and timeline before you lean on any single structure.",
  ];

  const risks: string[] = [
    "Rate and payment assumptions can shift with market movement and product selection.",
    "Taxes, insurance, HOA, and operating costs may change after closing.",
    "Investor and commercial paths require lender-specific DSCR and reserve overlays.",
  ];

  const opportunities: string[] = [
    "Use this snapshot to align price, down payment, and concession strategy before writing or offering.",
    "Compare multiple structures (buydown, ARM, fixed) in a strategy call—not in isolation online.",
  ];

  const nextSteps: string[] = [
    "Pressure-test the monthly payment against your real budget—including maintenance and reserves.",
    "List your target timeline (search, offer, close) so structure matches urgency.",
    "Book a strategy call to confirm program fit with a licensed loan advisor.",
  ];

  if (inputs.path === "buy-home") {
    if (analysis.sellerConcession) {
      recommendedStrategy += ` Seller concessions of ${formatCurrency(analysis.sellerConcession.concessionAmount)} (${formatPercent(analysis.sellerConcession.percentOfPrice, 2)} of price) may reduce estimated cash to close by ${formatCurrency(analysis.sellerConcession.cashToCloseReduction)} when applied to allowable costs.`;
      opportunities.push(
        "Seller credits may improve cash-to-close if applied to allowable closing costs—not automatic price reduction.",
      );
    }
    if (analysis.buydown && analysis.buydown.type !== "none") {
      recommendedStrategy += ` A ${analysis.buydown.type} buydown could lower payments in years one–two, with roughly ${formatCurrency(analysis.buydown.totalTwoYearSavings)} in illustrative two-year payment relief.`;
      coachNotes.push(
        "If a buydown is in play, confirm who funds it and whether it beats a price reduction for your goals.",
      );
    }
    clientFriendlyExplanation += ` If you're buying, focus on what you need at closing and what you're comfortable paying each month—not just the rate on a quote.`;
  }

  if (inputs.path === "refinance" && analysis.refinance) {
    const { monthlySavings, breakEvenMonths } = analysis.refinance;
    recommendedStrategy = `Refinance framing: proposed payment ${formatCurrency(analysis.refinance.newPayment)} vs current ${formatCurrency(analysis.refinance.currentPayment)}. Illustrative monthly change: ${formatCurrency(Math.abs(monthlySavings))} ${monthlySavings >= 0 ? "lower" : "higher"}.`;
    executiveSummary = `${greeting} how a refinance might reshape this deal: current vs proposed payment, plus whether the math supports the closing costs.`;
    if (breakEvenMonths) {
      recommendedStrategy += ` Break-even on estimated closing costs lands near ${breakEvenMonths} months if savings hold.`;
      nextSteps.unshift(
        `If you stay in the home past ~${breakEvenMonths} months, the closing-cost tradeoff looks more reasonable—verify with full quotes.`,
      );
    } else {
      risks.push(
        "At these inputs, monthly savings may not cover closing costs—recast goals before proceeding.",
      );
    }
    coachNotes.push(
      "Weigh break-even, term extension, and equity use—not just rate.",
    );
  }

  if (inputs.path === "investor-dscr" && analysis.investor) {
    recommendedStrategy = `Investor read: DSCR ${formatNumber(analysis.investor.dscr, 2)}x, cap rate ${formatPercent(analysis.investor.capRate, 2)}, monthly cash flow ${formatCurrency(analysis.investor.monthlyCashFlow)}. Lenders often target 1.0x+ DSCR depending on product and reserves.`;
    executiveSummary = `${greeting} the rental economics: coverage (DSCR), cap rate, and whether cash flow matches how you underwrite the asset.`;
    clientFriendlyExplanation = `For an investment property, lenders care whether rent covers the debt. Your DSCR is about ${formatNumber(analysis.investor.dscr, 2)}x—meaning rent relative to the payment—and estimated monthly cash flow is ${formatCurrency(analysis.investor.monthlyCashFlow)} before you factor in real-world surprises.`;
    if (analysis.investor.dscr < 1) {
      risks.push(
        "DSCR below 1.0x may limit product options or require larger down payment or rate adjustment.",
      );
    } else {
      opportunities.push(
        "Coverage above 1.0x supports a cleaner DSCR narrative—validate with lease and expense documentation.",
      );
    }
    coachNotes.push("Stress-test vacancy, management, and rate—not headline rent.");
    nextSteps.push("Bring actual rent roll or lease terms to confirm income assumptions.");
  }

  if (inputs.path === "commercial" && analysis.commercial) {
    recommendedStrategy = `Commercial snapshot: NOI ${formatCurrency(analysis.commercial.noi)}, DSCR ${formatNumber(analysis.commercial.dscr, 2)}x, cap rate ${formatPercent(analysis.commercial.capRate, 2)}, debt yield ${formatPercent(analysis.commercial.debtYield, 2)}.`;
    executiveSummary = `${greeting} a sponsor-level read: NOI, coverage, and whether debt service leaves room for reserves and exit flexibility.`;
    clientFriendlyExplanation = `Commercial deals hinge on net operating income and how comfortably income covers debt service. This snapshot is a starting point for lender conversations—not a commitment.`;
    coachNotes.push(
      "Pair this with rent roll, T-12, and exit narrative for lender meetings.",
    );
    opportunities.push(
      "Strong NOI relative to debt service improves lender readability—document reserves and guarantor strength.",
    );
  }

  if (meta?.leadRole === "Agent") {
    agentShareMessage = meta.agentName
      ? `Hi${firstName ? ` ${firstName}` : ""}—${meta.agentName} here. I had Chris Butler's team run a Playbook Report on the financing picture for this property (payment, cash, structure). It's educational only—not a loan approval or guaranteed terms. Take a look and let me know what questions you want to walk through together.`
      : agentShareMessage;
    coachNotes.unshift(
      "Agents: use the share message below when texting or emailing this link—it's written for your client, not for underwriting.",
    );
  }

  return {
    executiveSummary,
    recommendedStrategy,
    coachNotes,
    risks,
    opportunities,
    nextSteps,
    clientFriendlyExplanation,
    agentShareMessage,
    source: "static",
  };
}

/** @deprecated Use generateStaticNarrative or resolveReportNarrative */
export function generateReportNarrative(
  inputs: DealInputs,
  analysis: DealAnalysisResult,
): PlaybookNarrative {
  return generateStaticNarrative(inputs, analysis);
}
