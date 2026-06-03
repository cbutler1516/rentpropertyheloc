import type { LeadCreateRequest, LeadRouting, RoutingTier } from "@/lib/leads/types";



const ROUTING_LABELS: Record<RoutingTier, string> = {

  fast_track: "HIGH PRIORITY — Fast track",

  standard: "Standard review",

  review: "Extended review",

  nurture: "Nurture / follow-up",

};



const ROUTING_ACTIONS: Record<RoutingTier, string> = {

  fast_track: "Recommended callback: within 5 minutes — strong 2nd lien candidate",

  standard: "Contact within 2 business days — solid investor scenario",

  review: "Manual review within 3–5 business days — additional details needed",

  nurture: "Add to nurture sequence — follow up when timing or profile improves",

};



function hasPropertyFinancials(lead: LeadCreateRequest): boolean {

  return (

    lead.propertyValue != null &&

    lead.propertyValue > 0 &&

    lead.mortgageBalance != null &&

    Boolean(lead.propertyType)

  );

}



export function routeLead(lead: LeadCreateRequest): LeadRouting {

  const reasons: string[] = [];

  let score = 0;



  const creditScore = lead.creditScoreEstimate;

  const desiredFunds = lead.desiredFunds;

  const hasFinancials = hasPropertyFinancials(lead);

  const propertyValue = lead.propertyValue ?? 0;

  const mortgageBalance = lead.mortgageBalance ?? 0;

  const equity = hasFinancials

    ? (lead.estimatedEquity ?? Math.max(0, propertyValue - mortgageBalance))

    : 0;

  const cltv =

    hasFinancials && propertyValue > 0

      ? (mortgageBalance + desiredFunds) / propertyValue

      : 1;



  if (!hasFinancials) {

    reasons.push("Initial routing — property details pending enrichment");

  }



  if (lead.propertyStreet?.trim()) {

    score += 6;

    reasons.push("Property address on file");

  }



  if (creditScore != null && creditScore >= 760) {

    score += 25;

    reasons.push("Excellent credit profile (760+)");

  } else if (creditScore != null && creditScore >= 720) {

    score += 20;

    reasons.push("Strong credit profile (720+)");

  } else if (creditScore != null && creditScore >= 680) {

    score += 12;

    reasons.push("Acceptable credit range (680+)");

  } else if (creditScore != null && creditScore >= 640) {

    score += 6;

    reasons.push("Below-target credit range (640–679)");

  } else if (creditScore != null) {

    score += 2;

    reasons.push("Credit below typical 2nd lien minimums");

  } else {

    score += 8;

    reasons.push("Credit score pending confirmation");

  }



  if (desiredFunds >= 250_000) {

    score += 20;

    reasons.push("Large equity draw — high-value opportunity");

  } else if (desiredFunds >= 100_000) {

    score += 16;

    reasons.push("Solid equity draw ($100k+)");

  } else if (desiredFunds >= 50_000) {

    score += 10;

    reasons.push("Moderate equity draw ($50k–$100k)");

  } else if (desiredFunds >= 35_000) {

    score += 5;

    reasons.push("Smaller draw — may be below some program minimums");

  } else {

    score += 2;

    reasons.push("Very small draw — limited 2nd lien program fit");

  }



  if (hasFinancials) {

    if (equity >= 150_000) {

      score += 15;

      reasons.push("Strong estimated equity position");

    } else if (equity >= 75_000) {

      score += 10;

      reasons.push("Moderate equity position");

    } else {

      score += 3;

      reasons.push("Limited equity may constrain options");

    }



    if (cltv <= 0.70) {

      score += 12;

      reasons.push("Conservative CLTV (≤70%)");

    } else if (cltv <= 0.80) {

      score += 8;

      reasons.push("Moderate CLTV (70–80%)");

    } else if (cltv <= 0.90) {

      score += 4;

      reasons.push("Elevated CLTV (80–90%)");

    } else {

      score += 1;

      reasons.push("Aggressive CLTV (>90%) — limited options");

    }

  }



  if (lead.propertyCount === "5-plus") {

    score += 10;

    reasons.push("Experienced portfolio investor (5+ properties)");

  } else if (lead.propertyCount === "2-4") {

    score += 7;

    reasons.push("Multi-property investor (2–4)");

  } else if (lead.propertyCount === "1") {

    score += 4;

    reasons.push("Single investment property");

  }



  if (lead.fundingTimeline === "asap") {

    score += 8;

    reasons.push("High urgency — ready now");

  } else if (lead.fundingTimeline === "within-30-days") {

    score += 6;

    reasons.push("Active timeline (within 30 days)");

  } else if (lead.fundingTimeline === "researching") {

    score += 2;

    reasons.push("Early stage — researching options");

  }



  let secondLienFit: string;

  if (

    hasFinancials &&

    cltv <= 0.80 &&

    desiredFunds >= 50_000 &&

    (creditScore == null || creditScore >= 680)

  ) {

    secondLienFit = "strong";

  } else if (

    hasFinancials &&

    cltv <= 0.90 &&

    desiredFunds >= 35_000 &&

    (creditScore == null || creditScore >= 640)

  ) {

    secondLienFit = "moderate";

  } else if (!hasFinancials && desiredFunds >= 50_000 && (creditScore == null || creditScore >= 680)) {

    secondLienFit = "moderate";

  } else {

    secondLienFit = "needs_review";

  }



  const clampedScore = Math.max(0, Math.min(100, score));



  let routingTier: RoutingTier;



  const notResearching = !lead.fundingTimeline || lead.fundingTimeline !== "researching";



  const urgentTimeline =

    lead.fundingTimeline === "asap" || lead.fundingTimeline === "within-30-days";



  if (

    hasFinancials &&

    clampedScore >= 70 &&

    (creditScore == null || creditScore >= 720) &&

    desiredFunds >= 100_000 &&

    cltv <= 0.80 &&

    secondLienFit === "strong" &&

    notResearching &&

    (urgentTimeline || !lead.fundingTimeline)

  ) {

    routingTier = "fast_track";

  } else if (

    clampedScore >= 45 &&

    (creditScore == null || creditScore >= 640) &&

    desiredFunds >= 35_000

  ) {

    routingTier = "standard";

  } else if (

    (creditScore != null && creditScore < 640) ||

    desiredFunds < 35_000 ||

    lead.fundingTimeline === "researching"

  ) {

    routingTier = "nurture";

  } else {

    routingTier = "review";

  }



  return {

    routingTier,

    routingLabel: ROUTING_LABELS[routingTier],

    recommendedAction: ROUTING_ACTIONS[routingTier],

    routingReasons: reasons,

    secondLienFit,

    routingConfidence: hasFinancials ? "enriched" : "initial",

  };

}

