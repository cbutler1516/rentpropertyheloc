import { CTASection } from "./design-system";

type ConversionCTAProps = {
  eyebrow: string;
  title: string;
  body: string;
  submitLabel: string;
  fields?: Array<{
    name: string;
    label: string;
    placeholder: string;
    type?: "text" | "email";
  }>;
  note?: string;
};

const defaultFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Your name",
    type: "text" as const,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "you@email.com",
    type: "email" as const,
  },
];

export function ConversionCTA({
  eyebrow,
  title,
  body,
  submitLabel,
  fields = defaultFields,
  note = "Front-end placeholder only. No information is submitted yet.",
}: ConversionCTAProps) {
  return (
    <CTASection eyebrow={eyebrow} title={title} body={body}>
      <form className="reveal-item mt-10 grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="sr-only">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              className="input-glow h-14 w-full border border-zinc-800 bg-[#050505] px-5 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
            />
          </div>
        ))}
        <button
          type="button"
          className="btn-primary h-14 bg-white px-8 text-sm font-medium tracking-wide text-black hover:bg-zinc-100 md:col-span-2"
        >
          {submitLabel}
        </button>
      </form>
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
    body: "A front-end placeholder for buyers who want to discuss readiness, cash-to-close, payment design, loan options, and next steps without treating education as a loan approval.",
    submitLabel: "Request Buyer Strategy Call",
  },
  agentPartnership: {
    eyebrow: "Agent Partnership Conversation",
    title: "Build better financing conversations for your buyers.",
    body: "A front-end placeholder for agents who want compliant education, media support, market context, and buyer-readiness workflows.",
    submitLabel: "Request Agent Conversation",
  },
  brokerPartnership: {
    eyebrow: "Managing Broker Partnership",
    title: "Explore a firm-level lending education platform.",
    body: "A front-end placeholder for managing brokers and firm owners evaluating agent adoption, compliant lead generation, co-branded education, and media infrastructure.",
    submitLabel: "Request Broker Discovery",
  },
  commercialReview: {
    eyebrow: "Commercial Scenario Review",
    title: "Make the deal legible before chasing terms.",
    body: "A front-end placeholder for investors and operators who want to frame asset, sponsor, capital stack, and execution risk before a commercial lending conversation.",
    submitLabel: "Request Scenario Review",
  },
  newsletter: {
    eyebrow: "Content / Newsletter Signup",
    title: "Follow the mortgage strategy media engine.",
    body: "A front-end placeholder for educational updates, social video drops, article launches, and Broadview Lending content imports. No rates, quotes, or loan approvals.",
    submitLabel: "Join Content List",
  },
};
