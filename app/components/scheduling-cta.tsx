import { CTASection } from "./design-system";
import { TrackedBookingAnchor } from "./tracked-link";

type SchedulingType =
  | "buyer"
  | "agent"
  | "broker"
  | "commercial";

type SchedulingConfig = {
  eyebrow: string;
  title: string;
  body: string;
  label: string;
  path: string;
};

const schedulingConfigs: Record<SchedulingType, SchedulingConfig> = {
  buyer: {
    eyebrow: "Buyer Consultation",
    title: "Book a buyer consultation.",
    body: "Use this when you are ready to discuss readiness, payment, cash-to-close, loan options, and next steps.",
    label: "Book a Buyer Consultation",
    path: "buyer-consultation",
  },
  agent: {
    eyebrow: "Agent Partnership Consultation",
    title: "Explore agent partnership support.",
    body: "Use this to discuss buyer education, content workflows, market context, and compliant co-marketing support.",
    label: "Book an Agent Partnership Call",
    path: "agent-partnership",
  },
  broker: {
    eyebrow: "Broker Partnership Consultation",
    title: "Schedule a broker partnership conversation.",
    body: "Use this to discuss firm-level education infrastructure, agent adoption, and compliance-aware partnership design.",
    label: "Schedule a Broker Conversation",
    path: "broker-partnership",
  },
  commercial: {
    eyebrow: "Commercial Financing Review",
    title: "Review a commercial financing scenario.",
    body: "Use this to discuss asset, sponsor, capital stack, execution risk, and next steps before chasing terms.",
    label: "Book a Commercial Review",
    path: "commercial-review",
  },
};

function getSchedulingUrl(type: SchedulingType) {
  const baseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  if (!baseUrl) return null;

  const trimmedBase = baseUrl.replace(/\/$/, "");
  return `${trimmedBase}/${schedulingConfigs[type].path}`;
}

export function SchedulingLink({
  type,
  className = "",
}: {
  type: SchedulingType;
  className?: string;
}) {
  const href = getSchedulingUrl(type);
  if (!href) return null;

  return (
    <TrackedBookingAnchor
      href={href}
      className={className}
      bookingType={type}
      label={schedulingConfigs[type].label}
    >
      {schedulingConfigs[type].label}
    </TrackedBookingAnchor>
  );
}

export function SchedulingCTASection({ type }: { type: SchedulingType }) {
  const href = getSchedulingUrl(type);
  if (!href) return null;

  const config = schedulingConfigs[type];

  return (
    <CTASection
      eyebrow={config.eyebrow}
      title={config.title}
      body={config.body}
      analyticsSection="booking_cta"
    >
      <TrackedBookingAnchor
        href={href}
        className="reveal-item btn-primary mt-10 inline-flex h-14 w-fit items-center justify-center bg-white px-8 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
        bookingType={type}
        label={config.label}
      >
        {config.label}
      </TrackedBookingAnchor>
    </CTASection>
  );
}
