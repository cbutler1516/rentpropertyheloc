import { defaultFormValues } from "./constants";
import { analyzeDeal } from "./calculators";
import { generateStaticNarrative } from "./report-content";
import type { PartnerAgent } from "./agent-types";
import type { DealInputs, LeadCapture } from "./types";

export function buildSampleReportForAgent(agent: PartnerAgent) {
  const inputs: DealInputs = {
    path: "buy-home",
    propertyValue: defaultFormValues.propertyValue,
    interestRate: defaultFormValues.interestRate,
    loanTermYears: defaultFormValues.loanTermYears,
    annualPropertyTax: defaultFormValues.annualPropertyTax,
    annualInsurance: defaultFormValues.annualInsurance,
    monthlyHoa: defaultFormValues.monthlyHoa,
    downPaymentPercent: defaultFormValues.downPaymentPercent,
    sellerConcession: defaultFormValues.sellerConcession,
    buydownType: defaultFormValues.buydownType,
  };

  const analysis = analyzeDeal(inputs);
  const lead: LeadCapture = {
    name: "Sample Client",
    email: "client@example.com",
    phone: "(555) 555-0100",
    role: "Buyer",
    notes: "Sample report preview for agent branding.",
    referralSource: `Partner: ${agent.name}`,
    agentName: agent.name,
    smsCallConsent: true,
  };

  const narrative = generateStaticNarrative(inputs, analysis, {
    leadRole: "Buyer",
    leadName: lead.name,
    partnerAgentName: agent.name,
  });

  return {
    slug: "sample-preview",
    createdAt: new Date().toISOString(),
    lead,
    inputs,
    analysis,
    narrative,
    referralSource: lead.referralSource ?? null,
    agentName: agent.name,
    partnerAgentName: agent.name,
    partnerBranding: agent,
  };
}
