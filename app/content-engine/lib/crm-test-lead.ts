import type { CrmTestLeadPayload } from "./types";

export function buildTestLeadPayload(): CrmTestLeadPayload {
  return {
    firstName: "Jordan",
    lastName: "Testlead",
    email: "jordan.testlead@example.com",
    phone: "+15555550123",
    buyerTimeline: "30-60 days",
    loanTypeInterest: "Conventional purchase",
    purchasePriceOrLoanAmount: "$525,000",
    creditRange: "720+",
    agentStatus: "Working with agent",
    notes: "Content Engine test lead — safe to delete.",
    smsCallConsent: true,
    emailOptIn: true,
    utmSource: "content_engine",
    utmMedium: "test",
    utmCampaign: "crm_hub_test",
  };
}
