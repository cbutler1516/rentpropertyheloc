import type { CcmSession, DealIntake } from "./types";

export const emptyIntake: DealIntake = {
  propertyType: "",
  dealPurpose: "",
  loanAmountRange: "",
  occupancyStatus: "",
  sponsorExperience: "",
  timeline: "",
  leveragePosture: "",
  sponsorName: "",
  sponsorEmail: "",
  companyName: "",
  dealNotes: "",
};

export const defaultSession: CcmSession = {
  intake: emptyIntake,
  recommendation: null,
  matches: [],
  summary: null,
  leads: [],
};
