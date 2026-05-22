import type {
  CapitalMatch,
  CapitalPathRecommendation,
  CcmSession,
  DealIntake,
  ExecutiveSummary,
} from "./types";

/** Curated owner-user law firm acquisition — sample strategy only */
export const LAW_FIRM_SAMPLE_INTAKE: DealIntake = {
  propertyType: "mixed-use",
  dealPurpose: "acquisition",
  loanAmountRange: "1-3m",
  occupancyStatus: "stabilized",
  sponsorExperience: "2-5-deals",
  timeline: "60-90-days",
  leveragePosture: "moderate",
  sponsorName: "Jordan Hartwell",
  sponsorEmail: "sample@broadview.example",
  companyName: "Hartwell & Associates LLP",
  dealNotes:
    "Owner-user law firm acquisition of two mixed-use commercial units. Purchase price $2.4M; loan request $2.0M. Practice occupancy with ground-floor retail component.",
};

export const LAW_FIRM_DEAL_FACTS = {
  scenario: "Owner-user law firm · mixed-use commercial acquisition",
  purchasePrice: "$2,400,000",
  loanRequest: "$2,000,000",
  occupancy: "Owner-user (practice + partial retail)",
  location: "Pacific Northwest · urban mixed-use corridor",
};

const LAW_FIRM_RECOMMENDATION: CapitalPathRecommendation = {
  primaryPath: "sba-504",
  secondaryPath: "bank-portfolio",
  alternatePaths: ["bank-portfolio", "private-credit"],
  confidence: "high",
  capitalFitScore: 86,
  headline:
    "SBA 504 with conventional interim structure is the lead path—run a regional bank owner-user quote in parallel.",
  rationale: [
    "Owner-user mixed-use acquisition at $2.0M request aligns with SBA 504 debenture + bank note structures.",
    "Practice cash flow and professional occupancy support an owner-user narrative versus pure investment underwriting.",
    "60–90 day timeline allows CDC/bank coordination without forcing bridge pricing.",
  ],
  structureNotes: [
    "Lead with SBA 504: bank note + debenture with long-term fixed component on qualifying portion.",
    "Pair with conventional interim / acquisition financing while 504 components are placed.",
    "Keep regional bank owner-user term sheet in parallel for comparison on guaranty, prepay, and covenants.",
  ],
  risks: [
    "New LLC formation and limited operating history at the borrowing entity.",
    "Global cash flow reliance on practice performance—not property NOI alone.",
    "Business financials and partner compensation must support debt service under lender stress.",
    "Property allocation between owner-occupied and non-owner portions affects SBA eligibility.",
  ],
  keyLenderConcern:
    "Lenders will scrutinize how practice cash flow, entity structure, and owner-occupancy allocation support the $2.0M request—not just appraised value.",
  bestNextStep:
    "Schedule a Broadview commercial strategy call to package SBA 504 and bank owner-user options side-by-side before term sheets.",
  timingFit:
    "60–90 days supports SBA 504 placement with parallel bank quoting—avoid compressing CDC and third-party report timelines.",
};

const LAW_FIRM_MATCHES: CapitalMatch[] = [
  {
    id: "sample-sba-504",
    lenderName: "SBA 504 Program Lane",
    productLabel: "504 Debenture + Bank Note (Owner-User)",
    pathId: "sba-504",
    fitScore: 91,
    rateBand: "Bank note + fixed debenture blend",
    termSnapshot: "10 / 20 / 25-year options on qualifying structure",
    leverageRange: "Up to 90% on eligible owner-occupied portion",
    speedToQuote: "30–45 business days (CDC + bank)",
    highlights: [
      "Long-term fixed component attractive for professional practice stability",
      "Designed for owner-user acquisitions with job creation / occupancy rules",
    ],
    considerations: [
      "Eligibility driven by occupancy allocation and business financial strength",
      "CDC and bank timelines require disciplined document packaging early",
    ],
  },
  {
    id: "sample-bank-owner-user",
    lenderName: "Regional Bank — Owner-User Desk",
    productLabel: "Conventional Owner-User Commercial Mortgage",
    pathId: "bank-portfolio",
    fitScore: 84,
    rateBand: "6.50% – 7.35% est. (illustrative)",
    termSnapshot: "5–10 year fixed or 25-year amortizing",
    leverageRange: "~75–80% LTV on stabilized mixed-use",
    speedToQuote: "14–21 business days",
    highlights: [
      "Faster path if SBA timing or occupancy split is constrained",
      "Relationship pricing possible with deposit and practice banking",
    ],
    considerations: [
      "Full recourse and practice guaranties typical",
      "May price tighter on new LLC without seasoned entity financials",
    ],
  },
  {
    id: "sample-interim-bank",
    lenderName: "Portfolio Bank — Interim Acquisition",
    productLabel: "Conventional Interim / Bridge-to-Perm",
    pathId: "bank-portfolio",
    fitScore: 78,
    rateBand: "7.25% – 8.10% est. (illustrative)",
    termSnapshot: "12–18 month bridge with perm takeout",
    leverageRange: "70–75% LTV initial close",
    speedToQuote: "10–14 business days",
    highlights: [
      "Useful while SBA 504 components are placed",
      "Keeps acquisition timeline intact for PSA deadlines",
    ],
    considerations: [
      "Higher interim carry—underwrite to perm takeout early",
      "Requires clear exit to 504 or conventional perm",
    ],
  },
];

const LAW_FIRM_SUMMARY: ExecutiveSummary = {
  dealTitle: "Hartwell & Associates — Mixed-Use Owner-User Acquisition",
  preparedFor: "Jordan Hartwell",
  generatedAt: new Date().toISOString(),
  memoClassification: "Confidential preliminary financing memo",
  informationDisclaimer:
    "This memo is based on user-provided information and illustrative lender categories only. It is subject to lender review, third-party reports, and final underwriting—not an approval or commitment to lend.",
  preparedBy: {
    name: "Chris Butler",
    organization: "Broadview Lending",
    role: "Commercial & Residential Capital Strategy",
  },
  advisorOpening:
    "Hartwell & Associates is acquiring two mixed-use commercial units to house an expanding law practice while retaining a modest retail component. This preliminary memo frames how the $2.0M loan request against a $2.4M purchase may read to SBA and regional bank owner-user lenders.",
  snapshot: {
    propertyType: "Mixed-use commercial (2 units)",
    purpose: "Owner-user acquisition",
    loanRange: "$2.0M request · $2.4M purchase",
    occupancy: "Owner-user — practice + partial retail",
    timeline: "60–90 days",
    sponsor: "2–5 completed commercial deals",
  },
  likelyCapitalPath:
    "SBA 504 with conventional interim structure as the lead path, with a regional bank owner-user loan quoted in parallel for comparison.",
  strengths: [
    "Clear owner-user narrative tied to an operating professional practice.",
    "Moderate leverage request relative to purchase price.",
    "Timeline allows SBA 504 coordination without forced bridge execution.",
    "Sponsor with prior commercial experience—not a first-time operator.",
  ],
  lenderConcerns: LAW_FIRM_RECOMMENDATION.risks,
  suggestedStructure: LAW_FIRM_RECOMMENDATION.structureNotes,
  documentChecklist: [
    "Executed purchase agreement and allocation summary (owner-user vs. non-owner portions)",
    "Trailing practice financials, tax returns, and partner K-1s / compensation detail",
    "New LLC operating agreement and borrowing entity chart",
    "Rent roll and T-12 for retail portion; pro forma for practice occupancy",
    "Sponsor personal financial statement and global debt schedule",
    "Environmental and appraisal reports as required by SBA CDC / bank",
  ],
  broadviewRecommendation:
    "Broadview recommends packaging SBA 504 and regional bank owner-user options side-by-side before term sheets—so Hartwell & Associates can compare long-term fixed economics, guaranty structure, and timing without committing to a single lane too early. Chris Butler can align CDC, bank, and attorney timelines around the PSA.",
  disclaimer:
    "Preliminary strategy for discussion purposes only. Not a loan approval, commitment, or offer. Illustrative terms require live lender and CDC outreach.",
  footerLine: "Prepared by Broadview Lending — Commercial Capital Matchmaker",
};

export function buildLawFirmSampleSession(): Pick<
  CcmSession,
  "intake" | "recommendation" | "matches" | "summary"
> {
  return {
    intake: LAW_FIRM_SAMPLE_INTAKE,
    recommendation: LAW_FIRM_RECOMMENDATION,
    matches: LAW_FIRM_MATCHES,
    summary: LAW_FIRM_SUMMARY,
  };
}

/** @deprecated Use buildLawFirmSampleSession */
export function buildSampleSession() {
  return buildLawFirmSampleSession();
}
