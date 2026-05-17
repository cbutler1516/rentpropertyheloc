import { CTASection } from "./design-system";
import { LeadCaptureForm, type LeadFormType } from "./lead-capture-form";

type ConversionCTAProps = {
  eyebrow: string;
  title: string;
  body: string;
  submitLabel: string;
  formType: LeadFormType;
  note?: string;
};

export function ConversionCTA({
  eyebrow,
  title,
  body,
  submitLabel,
  formType,
  note = "Preview form. Submission wiring will be connected before launch.",
}: ConversionCTAProps) {
  return (
    <CTASection eyebrow={eyebrow} title={title} body={body}>
      <LeadCaptureForm formType={formType} submitLabel={submitLabel} />
      <p className="reveal-item mt-5 font-mono text-[10px] tracking-[0.18em] text-zinc-600 uppercase">
        {note}
      </p>
    </CTASection>
  );
}

export const conversionCtas = {
  buyerStrategy: {
    eyebrow: "Buyer Strategy Call",
    title: "Map the mortgage strategy before the search gets loud.",
    body: "For buyers who want to discuss readiness, cash-to-close, payment design, loan options, and next steps without treating education as a loan approval.",
    formType: "Buyer Strategy Call" as const,
    submitLabel: "Request Buyer Strategy Call",
  },
  agentPartnership: {
    eyebrow: "Agent Partnership Conversation",
    title: "Build better financing conversations for your buyers.",
    body: "For agents who want compliant education, media support, market context, and buyer-readiness workflows.",
    formType: "Agent Partnership Conversation" as const,
    submitLabel: "Request Agent Conversation",
  },
  brokerPartnership: {
    eyebrow: "Managing Broker Partnership",
    title: "Explore a firm-level lending education platform.",
    body: "For managing brokers and firm owners evaluating agent adoption, compliant lead generation, co-branded education, and media infrastructure.",
    formType: "Managing Broker Partnership" as const,
    submitLabel: "Request Broker Discovery",
  },
  commercialReview: {
    eyebrow: "Commercial Scenario Review",
    title: "Make the deal legible before chasing terms.",
    body: "For investors and operators who want to frame asset, sponsor, capital stack, and execution risk before a commercial lending conversation.",
    formType: "Commercial Scenario Review" as const,
    submitLabel: "Request Scenario Review",
  },
  newsletter: {
    eyebrow: "Content / Newsletter Signup",
    title: "Follow the mortgage strategy media engine.",
    body: "For educational updates, social video drops, article launches, and Broadview Lending content imports. No rates, quotes, or loan approvals.",
    formType: "Newsletter Signup" as const,
    submitLabel: "Join Content List",
  },
};
