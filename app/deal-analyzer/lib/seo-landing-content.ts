import type { Metadata } from "next";
import type { DealPath } from "./types";

export type SeoLandingSlug =
  | "homebuyer"
  | "refinance"
  | "investor-dscr"
  | "commercial"
  | "seller-concessions"
  | "rate-buydown"
  | "heloc-vs-cash-out"
  | "wait-vs-buy";

export type SeoLandingFaq = {
  question: string;
  answer: string;
};

export type SeoLandingContent = {
  slug: SeoLandingSlug;
  navLabel: string;
  analyzerPath: DealPath;
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    ctaLabel: string;
  };
  problem: {
    title: string;
    bullets: string[];
  };
  solution: {
    title: string;
    bullets: string[];
  };
  calculatorShows: {
    title: string;
    items: string[];
  };
  exampleScenario: {
    title: string;
    setup: string;
    metrics: { label: string; value: string }[];
  };
  faq: SeoLandingFaq[];
  relatedSlugs: SeoLandingSlug[];
};

export const SEO_LANDING_SLUGS: SeoLandingSlug[] = [
  "homebuyer",
  "refinance",
  "investor-dscr",
  "commercial",
  "seller-concessions",
  "rate-buydown",
  "heloc-vs-cash-out",
  "wait-vs-buy",
];

export function getSeoLandingHref(slug: SeoLandingSlug): string {
  return `/deal-analyzer/${slug}`;
}

export function getAnalyzeHref(path: DealPath): string {
  return `/deal-analyzer/analyze?path=${path}`;
}

function landing(
  content: SeoLandingContent,
): SeoLandingContent {
  return content;
}

export const seoLandingContent: Record<SeoLandingSlug, SeoLandingContent> = {
  homebuyer: landing({
    slug: "homebuyer",
    navLabel: "Homebuyer",
    analyzerPath: "buy-home",
    metadata: {
      title: "Homebuyer Mortgage Calculator | Deal Analyzer",
      description:
        "Model purchase payment, cash-to-close, and down payment structure before you tour or write an offer. Educational estimates—not a loan commitment.",
    },
    hero: {
      eyebrow: "Homebuyer path",
      title: "See your purchase numbers before you fall in love with a listing",
      lead:
        "Walk into showings knowing estimated payment, cash-to-close, and how structure changes your monthly budget—without guessing from online calculators alone.",
      ctaLabel: "Start homebuyer analysis",
    },
    problem: {
      title: "Why buyers get surprised at the offer table",
      bullets: [
        "Payment quotes rarely include taxes, insurance, HOA, and realistic cash-to-close in one view.",
        "Small changes in down payment or concessions shift monthly payment more than most buyers expect.",
        "Agents and lenders speak in rate and price—but buyers need a single snapshot they can explain to a partner or co-borrower.",
      ],
    },
    solution: {
      title: "What the homebuyer analyzer gives you",
      bullets: [
        "One premium read: estimated payment, LTV, and cash-to-close framing.",
        "Adjust down payment, seller concessions, and buydown options to compare structure—not just rate.",
        "Unlock a Playbook Report you can review with your loan officer before you commit to terms.",
      ],
    },
    calculatorShows: {
      title: "What this calculator shows you",
      items: [
        "Estimated principal & interest, taxes, insurance, and HOA in a monthly payment breakdown",
        "Loan amount, LTV, and cash-to-close with down payment and concession inputs",
        "Seller concession and temporary buydown impact on early-year payment (when modeled)",
        "Strategy notes and risks framed for conversation—not approval",
      ],
    },
    exampleScenario: {
      title: "Example: first-time buyer in the mid-$600s",
      setup:
        "$650,000 list price, 20% down, 6.75% note rate, $15,000 seller concession modeled for closing-cost help.",
      metrics: [
        { label: "Est. monthly payment", value: "~$3,400/mo" },
        { label: "Cash to close (illustrative)", value: "~$145k" },
        { label: "Loan amount", value: "~$520k" },
      ],
    },
    faq: [
      {
        question: "Is this a loan estimate or pre-approval?",
        answer:
          "No. The Deal Analyzer produces educational estimates for planning conversations. Only your lender can issue official disclosures and approve you to borrow.",
      },
      {
        question: "Can I model seller-paid closing costs?",
        answer:
          "Yes. On the buy-home path you can enter seller concessions to see how they may affect cash-to-close framing in your scenario.",
      },
      {
        question: "Do I need perfect credit scores to use it?",
        answer:
          "No. Enter the rate you are discussing with your loan officer or use a planning rate. Final pricing depends on credit, program, and property details.",
      },
    ],
    relatedSlugs: [
      "seller-concessions",
      "rate-buydown",
      "wait-vs-buy",
      "refinance",
    ],
  }),

  refinance: landing({
    slug: "refinance",
    navLabel: "Refinance",
    analyzerPath: "refinance",
    metadata: {
      title: "Refinance Calculator & Break-Even | Deal Analyzer",
      description:
        "Compare current vs proposed refinance structure, monthly savings, and break-even timing. Educational modeling—not a commitment to lend.",
    },
    hero: {
      eyebrow: "Refinance path",
      title: "Know if a refinance move pencils before you pay for an appraisal",
      lead:
        "Compare your current payment stack to a proposed refinance—including cash-out—and see break-even style framing in one premium read.",
      ctaLabel: "Start refinance analysis",
    },
    problem: {
      title: "Why homeowners refinance without a clear break-even",
      bullets: [
        "Rate-only math ignores closing costs, term reset, and how long you will keep the loan.",
        "Cash-out decisions blend payment, proceeds, and long-term interest—hard to explain in one text thread.",
        "Online tools rarely show side-by-side current vs proposed in a report you can keep.",
      ],
    },
    solution: {
      title: "What the refinance analyzer gives you",
      bullets: [
        "Side-by-side current vs proposed payment and structure.",
        "Cash-out amount and closing cost inputs for realistic scenario planning.",
        "Playbook Report framing for a strategy call with your loan officer.",
      ],
    },
    calculatorShows: {
      title: "What this calculator shows you",
      items: [
        "Current vs proposed monthly payment comparison",
        "Estimated closing costs and cash-out proceeds framing",
        "Break-even style read based on your inputs (educational, not guaranteed)",
        "Strategy notes on term, rate, and hold period",
      ],
    },
    exampleScenario: {
      title: "Example: rate reduction with modest cash-out",
      setup:
        "$420,000 balance at 7.25% refi to 6.5% with $50,000 cash-out and ~$8,500 closing costs modeled.",
      metrics: [
        { label: "Monthly savings (illustrative)", value: "~$180/mo" },
        { label: "New loan amount", value: "~$470k" },
        { label: "Break-even framing", value: "~4–5 yrs*" },
      ],
    },
    faq: [
      {
        question: "Does this guarantee I will save money?",
        answer:
          "No. Savings depend on your actual terms, how long you keep the loan, and market conditions. Use outputs to guide questions for your licensed loan officer.",
      },
      {
        question: "Can I model cash-out refinance?",
        answer:
          "Yes. The refinance path includes cash-out and closing cost fields so you can see how proceeds and payment interact in one scenario.",
      },
      {
        question: "Should I refinance just because rates dropped?",
        answer:
          "Not automatically. Consider closing costs, remaining term, and how long you plan to stay. This tool helps you model those tradeoffs—not decide for you.",
      },
    ],
    relatedSlugs: [
      "heloc-vs-cash-out",
      "homebuyer",
      "wait-vs-buy",
    ],
  }),

  "investor-dscr": landing({
    slug: "investor-dscr",
    navLabel: "Investor / DSCR",
    analyzerPath: "investor-dscr",
    metadata: {
      title: "DSCR & Rental Property Calculator | Deal Analyzer",
      description:
        "Model rental income, debt service coverage, cap rate, and monthly cash flow for investor purchases. Educational estimates for portfolio planning.",
    },
    hero: {
      eyebrow: "Investor / DSCR path",
      title: "Underwrite the rental before you wire the earnest money",
      lead:
        "See DSCR-style coverage, cap rate framing, and monthly cash flow in one investor-focused snapshot—built for buy-and-hold and portfolio conversations.",
      ctaLabel: "Start investor analysis",
    },
    problem: {
      title: "Why investors miss the real monthly picture",
      bullets: [
        "Gross rent quotes ignore vacancy, management, and maintenance reserves.",
        "DSCR programs care about coverage—not just whether rent exceeds payment on paper.",
        "Spreadsheets rarely produce a client-ready report for partners or lenders.",
      ],
    },
    solution: {
      title: "What the investor analyzer gives you",
      bullets: [
        "Rental income, vacancy, and operating expense inputs in one flow.",
        "DSCR and cash-flow framing with premium charts in your Playbook Report.",
        "Clear educational labels—so you know what to verify with your lender.",
      ],
    },
    calculatorShows: {
      title: "What this calculator shows you",
      items: [
        "Estimated monthly rent vs debt service and operating costs",
        "DSCR-style coverage read based on your inputs",
        "Cap rate and cash-flow framing for hold vs sell conversations",
        "Investor strategy notes—not program approval",
      ],
    },
    exampleScenario: {
      title: "Example: SFR rental in the low $400s",
      setup:
        "$425,000 purchase, $3,400/mo rent, 5% vacancy, 25% down, investor rate modeled at 7.25%.",
      metrics: [
        { label: "Est. DSCR (illustrative)", value: "~1.05" },
        { label: "Monthly cash flow", value: "~$150/mo" },
        { label: "Cap rate framing", value: "~6.2%" },
      ],
    },
    faq: [
      {
        question: "Is this the same as a lender DSCR approval?",
        answer:
          "No. Lenders use specific programs, appraisals, and lease documentation. This tool helps you plan scenarios before you apply.",
      },
      {
        question: "Can I model multiple units?",
        answer:
          "Enter combined rent and expenses for the property you are analyzing. For complex portfolios, run separate scenarios per asset.",
      },
      {
        question: "What DSCR do I need?",
        answer:
          "Requirements vary by lender and program. Use this analyzer to see how rent, expenses, and rate change coverage—then confirm with your loan officer.",
      },
    ],
    relatedSlugs: ["commercial", "homebuyer", "refinance"],
  }),

  commercial: landing({
    slug: "commercial",
    navLabel: "Commercial",
    analyzerPath: "commercial",
    metadata: {
      title: "Commercial Mortgage Calculator | Deal Analyzer",
      description:
        "Model NOI, cap rate, coverage, and sponsor-ready deal snapshots for commercial acquisitions. Educational commercial scenario planning.",
    },
    hero: {
      eyebrow: "Commercial path",
      title: "Frame the commercial deal like a sponsor—not a residential borrower",
      lead:
        "NOI-led inputs, cap rate, and coverage framing in one premium read—so you can align brokers, sponsors, and lenders on the same numbers.",
      ctaLabel: "Start commercial analysis",
    },
    problem: {
      title: "Why commercial deals stall in spreadsheet limbo",
      bullets: [
        "Residential payment calculators do not speak NOI, cap rate, or coverage language.",
        "Sponsors need a snapshot brokers can forward—not a tab nobody understands.",
        "Small assumption changes in expenses or rate move DSCR and cash flow materially.",
      ],
    },
    solution: {
      title: "What the commercial analyzer gives you",
      bullets: [
        "NOI and operating expense inputs with cap-rate framing.",
        "Coverage and payment read aligned to commercial conversations.",
        "Playbook Report output suitable for internal sponsor review.",
      ],
    },
    calculatorShows: {
      title: "What this calculator shows you",
      items: [
        "NOI-based structure with income and expense breakdown",
        "Cap rate and coverage framing from your inputs",
        "Estimated debt service and payment stack",
        "Commercial strategy notes for lender follow-up",
      ],
    },
    exampleScenario: {
      title: "Example: small retail strip with stabilized NOI",
      setup:
        "$1.2M value, $72k NOI, $18k operating expenses modeled, 25-year amortization at 7.5%.",
      metrics: [
        { label: "Cap rate (illustrative)", value: "~6.0%" },
        { label: "NOI after expenses", value: "~$54k/yr" },
        { label: "Coverage framing", value: "~1.15*" },
      ],
    },
    faq: [
      {
        question: "Does this replace a commercial term sheet?",
        answer:
          "No. It is an educational planning tool. Final terms depend on lender credit boxes, appraisal, and asset-specific underwriting.",
      },
      {
        question: "Which property types does it support?",
        answer:
          "Use it for income-producing scenarios where NOI and expenses are known or estimated. Confirm program fit with a commercial lender.",
      },
      {
        question: "Can I share the report with my broker?",
        answer:
          "Yes. After you complete the flow you can unlock a Playbook Report link for internal review—still not a commitment to lend.",
      },
    ],
    relatedSlugs: ["investor-dscr", "refinance", "homebuyer"],
  }),

  "seller-concessions": landing({
    slug: "seller-concessions",
    navLabel: "Seller concessions",
    analyzerPath: "buy-home",
    metadata: {
      title: "Seller Concessions Calculator | Deal Analyzer",
      description:
        "See how seller-paid closing costs may affect cash-to-close and purchase structure. Educational buyer scenario modeling.",
    },
    hero: {
      eyebrow: "Purchase strategy",
      title: "Understand seller concessions before you negotiate credits",
      lead:
        "Model how seller-paid closing costs interact with price, down payment, and cash-to-close—so you know what to ask for and what to verify with your lender.",
      ctaLabel: "Model concessions on buy-home path",
    },
    problem: {
      title: "Why concession conversations get confusing",
      bullets: [
        "Buyers hear “seller pays closing costs” but do not see the net effect on cash-to-close.",
        "Concessions have program limits—amount alone does not mean approval.",
        "Credits can be structured differently (price vs credits) with different net results.",
      ],
    },
    solution: {
      title: "What this scenario tool clarifies",
      bullets: [
        "Enter seller concession dollars on the buy-home analyzer path.",
        "Compare cash-to-close with and without credits in one snapshot.",
        "Bring clearer questions to your agent and loan officer.",
      ],
    },
    calculatorShows: {
      title: "What this calculator shows you",
      items: [
        "Cash-to-close with seller concession dollars applied in your scenario",
        "How concessions interact with down payment and loan amount",
        "Monthly payment context so credits are not viewed in isolation",
        "Educational notes on verifying program limits with your lender",
      ],
    },
    exampleScenario: {
      title: "Example: $15,000 seller credit on a $650k purchase",
      setup:
        "20% down, 6.75% rate, $15,000 concession applied toward closing-cost framing.",
      metrics: [
        { label: "Concession modeled", value: "$15,000" },
        { label: "Cash-to-close shift", value: "Illustrative reduction*" },
        { label: "Monthly payment", value: "Unchanged by credit alone*" },
      ],
    },
    faq: [
      {
        question: "Will any seller credit amount work?",
        answer:
          "No. Concessions must typically align with actual closing costs and program limits. Your loan officer confirms allowable credits.",
      },
      {
        question: "Do concessions lower my monthly payment?",
        answer:
          "Usually they help cash-to-close, not the note rate or principal balance. This tool shows both payment and cash needs together.",
      },
      {
        question: "Is a higher price with more credits better?",
        answer:
          "It depends on appraisal, program, and net cash. Model scenarios here, then validate structure with your agent and lender.",
      },
    ],
    relatedSlugs: ["homebuyer", "rate-buydown", "wait-vs-buy"],
  }),

  "rate-buydown": landing({
    slug: "rate-buydown",
    navLabel: "Rate buydown",
    analyzerPath: "buy-home",
    metadata: {
      title: "2-1 Rate Buydown Calculator | Deal Analyzer",
      description:
        "Model temporary buydowns (2-1, 1-0) and see early-year payment relief vs long-term cost. Educational purchase scenario planning.",
    },
    hero: {
      eyebrow: "Purchase strategy",
      title: "See what a 2-1 buydown does to year-one payment",
      lead:
        "Temporary buydowns can improve affordability early—but they are not free magic. Model 2-1 and 1-0 structures alongside your base payment before you accept seller or builder credits.",
      ctaLabel: "Model buydown on buy-home path",
    },
    problem: {
      title: "Why buydowns get oversold in marketing",
      bullets: [
        "Year-one payment savings distract from full-term cost and who funds the buydown.",
        "Buyers confuse temporary payment relief with a permanent lower rate.",
        "Seller-funded vs lender-paid buydowns have different rules and limits.",
      ],
    },
    solution: {
      title: "What the buydown analyzer clarifies",
      bullets: [
        "Select 2-1 or 1-0 buydown types on the buy-home path.",
        "See early-year payment vs standard amortization framing.",
        "Discuss funding and permanence with your loan officer—not just the listing agent.",
      ],
    },
    calculatorShows: {
      title: "What this calculator shows you",
      items: [
        "Year-by-year payment framing with 2-1 or 1-0 buydown selected",
        "Comparison to non-buydown payment for the same price and rate",
        "How buydown choice interacts with down payment and concessions",
        "Strategy notes on who typically funds the buydown",
      ],
    },
    exampleScenario: {
      title: "Example: 2-1 buydown on a $650k purchase",
      setup:
        "6.75% note rate with 2-1 buydown selected—year one and two payments reduced per buydown schedule.",
      metrics: [
        { label: "Year 1 payment (illustrative)", value: "Lower than base*" },
        { label: "Year 3+ payment", value: "Returns to full amortization*" },
        { label: "Buydown type", value: "2-1 modeled" },
      ],
    },
    faq: [
      {
        question: "Does a buydown lower my rate forever?",
        answer:
          "No. Temporary buydowns reduce payments in early years via a subsidy account, then payments step up. Confirm structure on your loan estimate.",
      },
      {
        question: "Who pays for the buydown?",
        answer:
          "Often seller, builder, or borrower via pricing. Funding affects what is negotiable—your loan officer explains allowable sources.",
      },
      {
        question: "Is a buydown better than a price reduction?",
        answer:
          "Depends on hold period, cash available, and program. Model both in separate scenarios and compare net cost with your advisor.",
      },
    ],
    relatedSlugs: ["homebuyer", "seller-concessions", "wait-vs-buy"],
  }),

  "heloc-vs-cash-out": landing({
    slug: "heloc-vs-cash-out",
    navLabel: "HELOC vs cash-out",
    analyzerPath: "refinance",
    metadata: {
      title: "HELOC vs Cash-Out Refinance Calculator | Deal Analyzer",
      description:
        "Compare cash-out refinance structure to HELOC-style thinking for accessing home equity. Educational homeowner scenario planning.",
    },
    hero: {
      eyebrow: "Homeowner strategy",
      title: "Access equity with eyes open: cash-out refi vs line of credit",
      lead:
        "Cash-out refinance resets your first mortgage; a HELOC is a separate line. Model cash-out refi payment and proceeds here, then discuss HELOC alternatives with your loan officer.",
      ctaLabel: "Start cash-out refinance analysis",
    },
    problem: {
      title: "Why homeowners blend HELOC and refi math",
      bullets: [
        "Cash-out refi changes your entire first-lien payment and term.",
        "HELOCs often have variable rates and interest-only periods—different risk profile.",
        "Choosing based on rate alone ignores closing costs and how long you need funds.",
      ],
    },
    solution: {
      title: "What this analyzer helps you compare",
      bullets: [
        "Model cash-out refinance with proceeds, closing costs, and new payment.",
        "Use outputs to ask your lender how a HELOC might differ on payment and flexibility.",
        "Keep a Playbook Report for side-by-side conversations—not a single-rate quote.",
      ],
    },
    calculatorShows: {
      title: "What this calculator shows you",
      items: [
        "New loan amount and estimated proceeds after cash-out",
        "Proposed monthly payment vs your current payment inputs",
        "Closing cost and break-even style framing (educational)",
        "Questions to raise about HELOC payment variability with your lender",
      ],
    },
    exampleScenario: {
      title: "Example: $50k cash-out on a $420k balance",
      setup:
        "7.25% current rate refi to 6.5% with $50,000 proceeds and closing costs modeled.",
      metrics: [
        { label: "Proceeds modeled", value: "$50,000" },
        { label: "New balance (illustrative)", value: "~$470k" },
        { label: "Payment change", value: "Compare in report*" },
      ],
    },
    faq: [
      {
        question: "Does this model a HELOC payment directly?",
        answer:
          "This path focuses on cash-out refinance structure. For HELOC math, take your refi snapshot to your lender and request line-of-credit scenarios with the same proceeds goal.",
      },
      {
        question: "Which is cheaper?",
        answer:
          "Depends on rate type, draw period, closing costs, and how long you carry the balance. No online tool can guarantee which product wins for your situation.",
      },
      {
        question: "Will I qualify for both?",
        answer:
          "Eligibility depends on credit, equity, DTI, and lender overlays. Use this tool for planning, then get official options from your loan officer.",
      },
    ],
    relatedSlugs: ["refinance", "homebuyer", "wait-vs-buy"],
  }),

  "wait-vs-buy": landing({
    slug: "wait-vs-buy",
    navLabel: "Wait vs buy",
    analyzerPath: "buy-home",
    metadata: {
      title: "Wait vs Buy Home Calculator | Deal Analyzer",
      description:
        "Model a purchase scenario today to frame the wait-vs-buy decision with real payment and cash-to-close numbers. Educational planning—not predictions.",
    },
    hero: {
      eyebrow: "Purchase timing",
      title: "Stop debating wait vs buy without real numbers",
      lead:
        "Rates and prices move—but your budget does not live in headlines. Model a purchase today, then adjust inputs to stress-test what would change your decision.",
      ctaLabel: "Model a buy scenario today",
    },
    problem: {
      title: "Why timing debates go in circles",
      bullets: [
        "Nobody can predict rates or prices reliably—yet buyers still argue from fear.",
        "Waiting has a cost too: rent, missed equity, and lifestyle goals.",
        "Without a baseline scenario, every headline feels like a reason to freeze.",
      ],
    },
    solution: {
      title: "What this timing exercise gives you",
      bullets: [
        "A concrete purchase snapshot with payment and cash-to-close you can stress-test.",
        "Clear inputs to change (price, rate, down payment) and see sensitivity.",
        "A calmer conversation with your loan officer about readiness—not hype.",
      ],
    },
    calculatorShows: {
      title: "What this calculator shows you",
      items: [
        "Estimated payment and cash-to-close for a purchase you define today",
        "How down payment and price changes move your monthly budget",
        "Structure tools (concessions, buydown) that may change near-term affordability",
        "Educational framing—not a market forecast",
      ],
    },
    exampleScenario: {
      title: "Example: buy now vs wait—same budget, different rate",
      setup:
        "Run once at 6.75%, then rerun at 7.25% on the same $650k price to see payment sensitivity—not a prediction of the future.",
      metrics: [
        { label: "Payment at 6.75%", value: "~$3,400/mo*" },
        { label: "Payment at 7.25%", value: "~$3,550/mo*" },
        { label: "Delta", value: "~$150/mo*" },
      ],
    },
    faq: [
      {
        question: "Can this tell me if rates will drop?",
        answer:
          "No. It models scenarios you enter. Use it to understand sensitivity, not to time the market.",
      },
      {
        question: "Should I wait for prices to fall?",
        answer:
          "Local markets vary. This tool helps you quantify a purchase budget; it does not forecast home prices.",
      },
      {
        question: "What if I am not ready to apply yet?",
        answer:
          "You can still model numbers for planning. When you are ready, share your Playbook Report with a licensed loan officer for official options.",
      },
    ],
    relatedSlugs: ["homebuyer", "refinance", "rate-buydown"],
  }),
};

export function getSeoLandingContent(
  slug: SeoLandingSlug,
): SeoLandingContent {
  return seoLandingContent[slug];
}

export function buildSeoLandingMetadata(slug: SeoLandingSlug): Metadata {
  const { metadata } = getSeoLandingContent(slug);
  const title = `${metadata.title} | The Loan Playbook`;
  return {
    title,
    description: metadata.description,
    openGraph: {
      title,
      description: metadata.description,
      type: "website",
      images: [
        {
          url: "/loan-playbook-social-preview.svg",
          width: 1200,
          height: 630,
          alt: "The Loan Playbook Deal Analyzer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metadata.description,
      images: ["/loan-playbook-social-preview.svg"],
    },
  };
}

export function buildFaqJsonLd(faq: SeoLandingFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
