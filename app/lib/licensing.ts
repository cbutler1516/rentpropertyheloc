export type LicensedState = {
  name: string;
  abbreviation: string;
};

export type LoanOfficer = {
  name: string;
  title: string;
  nmlsId: string;
  states?: string[];
};

export const companyLicensing = {
  companyName: "The Loan Playbook",
  lendingPartnerName: "Broadview Lending / Barrett Financial Group",
  companyNmlsId: "NMLS #XXXXXXX",
  equalHousingText: "Equal Housing Opportunity",
  licensingSummary:
    "Licensing, loan availability, and product eligibility vary by state, loan program, borrower qualifications, and investor guidelines.",
};

export const licensedStates: LicensedState[] = [
  { name: "Arizona", abbreviation: "AZ" },
  { name: "California", abbreviation: "CA" },
  { name: "Colorado", abbreviation: "CO" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Idaho", abbreviation: "ID" },
  { name: "Illinois", abbreviation: "IL" },
  { name: "Michigan", abbreviation: "MI" },
  { name: "Oregon", abbreviation: "OR" },
  { name: "Texas", abbreviation: "TX" },
  { name: "Washington", abbreviation: "WA" },
];

export const loanOfficers: LoanOfficer[] = [
  {
    name: "Loan Officer Name",
    title: "Mortgage Loan Originator",
    nmlsId: "NMLS #XXXXXXX",
    states: licensedStates.map((state) => state.abbreviation),
  },
];

export const complianceDisclosures = {
  consumerEducation:
    "Content on this site is provided for general consumer education and strategy discussion only. It is not legal, tax, financial, or credit advice.",
  noCommitment:
    "This is not a commitment to lend, extend credit, or guarantee loan approval. All loans are subject to application, underwriting, credit approval, property review, investor guidelines, and applicable law.",
  licensing:
    "Mortgage licensing and disclosures are provided for transparency. Licensing requirements, available products, and loan terms may vary by state and borrower scenario.",
  socialMedia:
    "Videos, articles, social posts, and other media are educational in nature and may not reflect every available loan option, rate, fee, or program requirement.",
};
