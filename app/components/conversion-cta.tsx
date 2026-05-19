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
  note = "Educational only. Not a loan application.",
}: ConversionCTAProps) {
  return (
    <CTASection
      eyebrow={eyebrow}
      title={title}
      body={body}
      analyticsSection="lead_capture"
    >
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
    title: "Know your number first.",
    body: "Readiness, payment, cash, options, next steps.",
    formType: "Buyer Strategy Call" as const,
    submitLabel: "Start Your Buyer Strategy",
  },
  agentPartnership: {
    eyebrow: "Agent Partnership Conversation",
    title: "Help buyers move clearer.",
    body: "For individual agents who want stronger buyer financing conversations.",
    formType: "Agent Partnership Conversation" as const,
    submitLabel: "Talk With Our Team",
  },
  brokerPartnership: {
    eyebrow: "Managing Broker Partnership",
    title: "Build a cleaner finance layer.",
    body: "For managing brokers, teams, brokerages, and firms exploring compliant partnership models.",
    formType: "Managing Broker Partnership" as const,
    submitLabel: "Schedule a Broker Conversation",
  },
  commercialReview: {
    eyebrow: "Commercial Scenario Review",
    title: "Make the deal legible.",
    body: "Asset, sponsor, capital stack, execution risk.",
    formType: "Commercial Scenario Review" as const,
    submitLabel: "Talk Through a Scenario",
  },
  newsletter: {
    eyebrow: "Content / Newsletter Signup",
    title: "Follow the media engine.",
    body: "Video drops, article launches, education updates.",
    formType: "Newsletter Signup" as const,
    submitLabel: "Get Market Updates",
  },
};
