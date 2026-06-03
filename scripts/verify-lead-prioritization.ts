/**
 * Manual verification for lead prioritization scenarios.
 * Run: npx tsx scripts/verify-lead-prioritization.ts
 */
import assert from "node:assert/strict";

import { computeLeadPrioritization } from "../lib/leads/lead-prioritization";
import type { LeadCreateRequest } from "../lib/leads/types";

const baseLead: LeadCreateRequest = {
  journey: "sfr",
  funnelVersion: "v10-credit-qualify-2026",
  propertyType: "",
  propertyValueRange: "",
  mortgageBalanceRange: "",
  equityAccessRange: "500k-plus",
  creditScoreRange: "760-plus",
  creditScoreEstimate: 780,
  propertyCount: "",
  fundingTimeline: "",
  propertyRented: "",
  propertyStreet: "123 Main St",
  propertyCity: "Seattle",
  propertyState: "WA",
  propertyZip: "98101",
  googlePlaceId: "",
  propertyValue: null,
  mortgageBalance: null,
  desiredFunds: 0,
  estimatedEquity: null,
  estimatedHeloc: null,
  estimatedHelocLow: null,
  estimatedHelocHigh: null,
  avmSource: "",
  propertySqft: null,
  propertyBeds: null,
  propertyBaths: null,
  propertyYearBuilt: null,
  propertyLatitude: null,
  propertyLongitude: null,
  estimatedRent: null,
  propertyValueLow: null,
  propertyValueHigh: null,
  mortgageBalanceLow: null,
  mortgageBalanceHigh: null,
  lastSaleDate: "",
  lastSalePrice: null,
  recordedMortgageAmount: null,
  actualMortgageBalance: null,
  useMortgageEstimate: false,
  fundingGoal: "",
  ownershipType: "",
  funnelStepCompleted: 5,
  targetCltvPercent: 0,
  investorScore: null,
  confidenceRating: "",
  valuationLastUpdated: "",
  firstName: "Test",
  lastName: "Lead",
  email: "test@example.com",
  phone: "2065550100",
  tcpaConsent: true,
  tcpaConsentAt: new Date().toISOString(),
  marketingOptIn: false,
  createdAt: new Date().toISOString(),
  source: "check-options-funnel",
};

function runScenarios() {
  const scenarioA = computeLeadPrioritization({
    ...baseLead,
    desiredFunds: 750_000,
  });
  assert.equal(scenarioA.leadType, "PARTIAL");
  assert.equal(scenarioA.completionPercent, 70);
  assert.equal(scenarioA.dataConfidence, "MEDIUM");
  assert.equal(scenarioA.leadScore, 70);
  assert.equal(scenarioA.scoringBreakdown.creditScorePoints, 35);
  assert.equal(scenarioA.scoringBreakdown.desiredLoanAmountPoints, 35);
  assert.equal(scenarioA.scoringBreakdown.profileCompletionPoints, 0);
  assert.equal(scenarioA.salesQualityTier, "Medium Potential Partial");
  assert.equal(scenarioA.revenueTier, "Platinum");
  assert.equal(scenarioA.callPriority, "CALL NOW");

  const scenarioB = computeLeadPrioritization({
    ...baseLead,
    desiredFunds: 500_000,
    propertyValue: 1_200_000,
    mortgageBalance: 400_000,
    propertyValueRange: "750k-1m",
    mortgageBalanceRange: "250k-500k",
    propertyType: "single-family",
    propertyCount: "2-4",
    fundingTimeline: "asap",
    fundingGoal: "buy-rental",
    ownershipType: "llc-entity",
  });
  assert.equal(scenarioB.leadType, "COMPLETE");
  assert.equal(scenarioB.completionPercent, 100);
  assert.equal(scenarioB.dataConfidence, "HIGH");
  assert.equal(scenarioB.leadScore, 100);
  assert.equal(scenarioB.salesQualityTier, "Excellent");
  assert.equal(scenarioB.revenueTier, "Platinum");
  assert.equal(scenarioB.callPriority, "CALL NOW");

  const scenarioC = computeLeadPrioritization({
    ...baseLead,
    creditScoreRange: "680-719",
    creditScoreEstimate: 700,
    desiredFunds: 300_000,
    propertyValue: 700_000,
    mortgageBalance: 450_000,
    propertyValueRange: "500k-750k",
    mortgageBalanceRange: "250k-500k",
  });
  assert.equal(scenarioC.leadType, "COMPLETE");
  assert.equal(scenarioC.dataConfidence, "HIGH");
  assert.equal(scenarioC.leadScore, 55);
  assert.equal(scenarioC.salesQualityTier, "Mid-Tier");
  assert.equal(scenarioC.callPriority, "CALL TODAY");

  const scenarioD = computeLeadPrioritization({
    ...baseLead,
    creditScoreRange: "640-679",
    creditScoreEstimate: 650,
    desiredFunds: 75_000,
    propertyValue: 165_000,
    mortgageBalance: 75_000,
    propertyValueRange: "under-300k",
    mortgageBalanceRange: "under-100k",
  });
  assert.equal(scenarioD.leadScore, 25);
  assert.equal(scenarioD.salesQualityTier, "Low Priority");
  assert.equal(scenarioD.callPriority, "AUTOMATION");
}

runScenarios();
console.log("Lead prioritization scenarios passed.");
