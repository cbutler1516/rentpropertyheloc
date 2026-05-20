export const LEAD_CAPTURE_PRESETS = [
  "buyer-lead",
  "refinance-lead",
  "agent-partner",
  "commercial-borrower",
  "jumbo-borrower",
  "first-time-buyer",
  "seller-concession-lead",
  "market-update-subscriber",
] as const;

export type LeadCapturePreset = (typeof LEAD_CAPTURE_PRESETS)[number];

export type LeadCapturePresetConfig = {
  id: LeadCapturePreset;
  label: string;
  description: string;
};

export const LEAD_CAPTURE_PRESET_CONFIG: Record<
  LeadCapturePreset,
  LeadCapturePresetConfig
> = {
  "buyer-lead": {
    id: "buyer-lead",
    label: "Buyer lead",
    description: "Pre-approval and purchase timeline capture.",
  },
  "refinance-lead": {
    id: "refinance-lead",
    label: "Refinance lead",
    description: "Equity, timing, and break-even questions.",
  },
  "agent-partner": {
    id: "agent-partner",
    label: "Agent partner",
    description: "Referral partner intake and co-marketing.",
  },
  "commercial-borrower": {
    id: "commercial-borrower",
    label: "Commercial borrower",
    description: "DSCR, investor, and portfolio structure.",
  },
  "jumbo-borrower": {
    id: "jumbo-borrower",
    label: "Jumbo borrower",
    description: "High-balance path and discretion intake.",
  },
  "first-time-buyer": {
    id: "first-time-buyer",
    label: "First-time buyer",
    description: "Education-first budget-to-keys intake.",
  },
  "seller-concession-lead": {
    id: "seller-concession-lead",
    label: "Seller concession lead",
    description: "Credits, buydowns, and offer leverage.",
  },
  "market-update-subscriber": {
    id: "market-update-subscriber",
    label: "Market update subscriber",
    description: "Lightweight Fed/inventory alert signup.",
  },
};

export function isLeadCapturePreset(value: string): value is LeadCapturePreset {
  return LEAD_CAPTURE_PRESETS.includes(value as LeadCapturePreset);
}

export function getLeadCapturePreset(id: LeadCapturePreset) {
  return LEAD_CAPTURE_PRESET_CONFIG[id];
}
