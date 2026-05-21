import type { CapitalMatch, CapitalPathId, CapitalPathRecommendation, DealIntake } from "./types";

type SourceTemplate = Omit<CapitalMatch, "fitScore" | "pathId"> & {
  pathIds: CapitalPathId[];
  baseFit: number;
};

const SOURCE_TEMPLATES: SourceTemplate[] = [
  {
    id: "broadview-agency",
    lenderName: "Broadview Agency Desk",
    productLabel: "Agency Multifamily Term",
    pathIds: ["agency-multifamily"],
    baseFit: 88,
    rateBand: "5.85% – 6.45% est.",
    termSnapshot: "5–10 year fixed, 30-year amortization",
    leverageRange: "Up to 75% LTV stabilized",
    speedToQuote: "10–14 business days",
    highlights: ["Non-recourse options on qualifying deals", "Strong for 5+ unit stabilized assets"],
    considerations: ["Requires stabilized occupancy and agency-ready reporting"],
  },
  {
    id: "capital-markets-cmbs",
    lenderName: "Capital Markets Group",
    productLabel: "CMBS Conduit Execution",
    pathIds: ["cmbs"],
    baseFit: 84,
    rateBand: "6.10% – 6.75% est.",
    termSnapshot: "10-year fixed, defeasance or yield maintenance",
    leverageRange: "65% – 70% LTV typical",
    speedToQuote: "21–30 business days",
    highlights: ["Competitive for $5M+ stabilized collateral", "Institutional prepay structure"],
    considerations: ["Less flexible for heavy value-add stories"],
  },
  {
    id: "regional-portfolio",
    lenderName: "Regional Portfolio Bank",
    productLabel: "Relationship Portfolio Loan",
    pathIds: ["bank-portfolio"],
    baseFit: 82,
    rateBand: "6.35% – 7.10% est.",
    termSnapshot: "3–7 year fixed or hybrid ARM",
    leverageRange: "65% – 72% LTV",
    speedToQuote: "14–21 business days",
    highlights: ["Flexible prepay on smaller relationship deals", "Good for first-time sponsors with liquidity"],
    considerations: ["Full recourse common on transitional assets"],
  },
  {
    id: "transitional-bridge",
    lenderName: "Transitional Credit Partners",
    productLabel: "Bridge + Takeout Planning",
    pathIds: ["bridge-debt-fund"],
    baseFit: 90,
    rateBand: "8.25% – 9.75% est.",
    termSnapshot: "12–24 month IO bridge",
    leverageRange: "70% – 75% LTC / LTV",
    speedToQuote: "7–10 business days",
    highlights: ["Built for lease-up and value-add timelines", "Parallel permanent path planning"],
    considerations: ["Requires clear exit or refinance strategy"],
  },
  {
    id: "sba-owner-user",
    lenderName: "SBA Owner-User Program",
    productLabel: "SBA 504 Structure",
    pathIds: ["sba-504"],
    baseFit: 78,
    rateBand: "Fixed debenture + bank note blend",
    termSnapshot: "10 / 20 / 25 year options",
    leverageRange: "Up to 90% on qualifying owner-user",
    speedToQuote: "30–45 business days",
    highlights: ["Long-term fixed component", "Works for smaller acquisition scenarios"],
    considerations: ["Owner-occupancy and job creation rules apply"],
  },
  {
    id: "private-credit-fund",
    lenderName: "Private Credit Fund IV",
    productLabel: "Flexible Senior / Mezz",
    pathIds: ["private-credit"],
    baseFit: 86,
    rateBand: "9.50% – 12.00% est.",
    termSnapshot: "12–36 month flexible",
    leverageRange: "Up to 80% LTC on select assets",
    speedToQuote: "5–7 business days",
    highlights: ["Speed and leverage for complex collateral", "Works when banks pause"],
    considerations: ["Higher all-in cost—underwrite to business plan"],
  },
  {
    id: "sponsor-equity-desk",
    lenderName: "Sponsor Equity Desk",
    productLabel: "JV Equity Co-GP",
    pathIds: ["equity-jv"],
    baseFit: 80,
    rateBand: "Preferred return + promote structure",
    termSnapshot: "Deal-level partnership terms",
    leverageRange: "30% – 45% of total capitalization",
    speedToQuote: "14–21 business days",
    highlights: ["Pairs with construction and land plays", "Brings operational partner depth"],
    considerations: ["Align on control, fees, and exit before term sheets"],
  },
  {
    id: "middle-market-bridge",
    lenderName: "Middle Market Bridge Co.",
    productLabel: "Light Transitional Bridge",
    pathIds: ["bridge-debt-fund", "bank-portfolio"],
    baseFit: 76,
    rateBand: "7.75% – 8.95% est.",
    termSnapshot: "18-month bridge with extension",
    leverageRange: "68% – 72% LTV",
    speedToQuote: "10–12 business days",
    highlights: ["Middle ground between bank and debt fund pricing", "Useful for moderate value-add"],
    considerations: ["May require partial recourse on smaller deals"],
  },
];

function timelineBoost(intake: DealIntake): number {
  if (intake.timeline === "under-30-days") return 4;
  if (intake.timeline === "flexible") return 1;
  return 0;
}

export function matchCapitalSources(
  intake: DealIntake,
  recommendation: CapitalPathRecommendation,
): CapitalMatch[] {
  const rankedPaths = [
    recommendation.primaryPath,
    ...recommendation.alternatePaths,
  ];

  const matches = SOURCE_TEMPLATES.map((template) => {
    const pathIndex = rankedPaths.findIndex((pathId) =>
      template.pathIds.includes(pathId),
    );
    const pathBoost = pathIndex === 0 ? 12 : pathIndex > 0 ? 6 : 0;
    const fitScore = Math.min(
      98,
      template.baseFit + pathBoost + (pathIndex >= 0 ? timelineBoost(intake) : -8),
    );

    return {
      id: template.id,
      lenderName: template.lenderName,
      productLabel: template.productLabel,
      pathId: template.pathIds[0],
      fitScore,
      rateBand: template.rateBand,
      termSnapshot: template.termSnapshot,
      leverageRange: template.leverageRange,
      speedToQuote: template.speedToQuote,
      highlights: template.highlights,
      considerations: template.considerations,
    } satisfies CapitalMatch;
  })
    .filter((match) => match.fitScore >= 72)
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 5);

  return matches.length > 0 ? matches : SOURCE_TEMPLATES.slice(0, 3).map((t) => ({
    id: t.id,
    lenderName: t.lenderName,
    productLabel: t.productLabel,
    pathId: t.pathIds[0],
    fitScore: t.baseFit,
    rateBand: t.rateBand,
    termSnapshot: t.termSnapshot,
    leverageRange: t.leverageRange,
    speedToQuote: t.speedToQuote,
    highlights: t.highlights,
    considerations: t.considerations,
  }));
}
