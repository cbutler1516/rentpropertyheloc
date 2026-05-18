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
    title: "Get buyer guidance before the search gets serious.",
    body: "Discuss readiness, payment, cash-to-close, loan options, and next steps.",
    formType: "Buyer Strategy Call" as const,
    submitLabel: "Book a Buyer Consultation",
  },
  agentPartnership: {
    eyebrow: "Agent Partnership Conversation",
    title: "Build better financing conversations for your buyers.",
    body: "Education, media support, market context, and buyer-readiness workflows.",
    formType: "Agent Partnership Conversation" as const,
    submitLabel: "Explore Agent Partnerships",
  },
  brokerPartnership: {
    eyebrow: "Managing Broker Partnership",
    title: "Explore a firm-level lending education platform.",
    body: "Agent adoption, compliant lead paths, co-branded education, and media infrastructure.",
    formType: "Managing Broker Partnership" as const,
    submitLabel: "Schedule a Broker Conversation",
  },
  commercialReview: {
    eyebrow: "Commercial Scenario Review",
    title: "Review the financing structure before chasing terms.",
    body: "Frame asset, sponsor, capital stack, and execution risk before lender conversations.",
    formType: "Commercial Scenario Review" as const,
    submitLabel: "Review Commercial Financing Options",
  },
  newsletter: {
    eyebrow: "Content / Newsletter Signup",
    title: "Follow the media engine.",
    body: "Education updates, video drops, article launches, and Broadview imports. No rates, quotes, or approvals.",
    formType: "Newsletter Signup" as const,
    submitLabel: "Join Content List",
  },
};
