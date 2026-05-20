export const LEAD_MAGNET_TYPES = [
  "buyer-guide",
  "refinance-guide",
  "agent-cheat-sheet",
  "commercial-lending-brief",
  "jumbo-borrower-guide",
  "market-update-report",
  "seller-concession-playbook",
  "first-time-buyer-checklist",
] as const;

export type LeadMagnetType = (typeof LEAD_MAGNET_TYPES)[number];

export type LeadMagnetTypeConfig = {
  id: LeadMagnetType;
  label: string;
  description: string;
};

export const LEAD_MAGNET_TYPE_CONFIG: Record<LeadMagnetType, LeadMagnetTypeConfig> =
  {
    "buyer-guide": {
      id: "buyer-guide",
      label: "Buyer guide",
      description: "Pre-approval, payments, and offer readiness.",
    },
    "refinance-guide": {
      id: "refinance-guide",
      label: "Refinance guide",
      description: "Timing, break-even, and equity strategy.",
    },
    "agent-cheat-sheet": {
      id: "agent-cheat-sheet",
      label: "Agent cheat sheet",
      description: "Forwardable financing talking points.",
    },
    "commercial-lending-brief": {
      id: "commercial-lending-brief",
      label: "Commercial lending brief",
      description: "DSCR, investor structure, portfolio moves.",
    },
    "jumbo-borrower-guide": {
      id: "jumbo-borrower-guide",
      label: "Jumbo borrower guide",
      description: "High-balance paths and structure.",
    },
    "market-update-report": {
      id: "market-update-report",
      label: "Market update report",
      description: "Fed, inventory, and headline context.",
    },
    "seller-concession-playbook": {
      id: "seller-concession-playbook",
      label: "Seller concession playbook",
      description: "Credits, buydowns, and offer leverage.",
    },
    "first-time-buyer-checklist": {
      id: "first-time-buyer-checklist",
      label: "First-time buyer checklist",
      description: "Education-first path from budget to keys.",
    },
  };

export function isLeadMagnetType(value: string): value is LeadMagnetType {
  return LEAD_MAGNET_TYPES.includes(value as LeadMagnetType);
}

export function getLeadMagnetType(id: LeadMagnetType) {
  return LEAD_MAGNET_TYPE_CONFIG[id];
}
