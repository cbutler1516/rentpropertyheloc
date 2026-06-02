import { COMPANY_NMLS_LABEL, NMLS_LABEL } from "@/lib/legal/nmls";

export const MARKETING_SITE_NAME = "Rent Property HELOC";

export const MORTGAGE_COMPANY_NAME = "Barrett Financial Group, LLC";

export const LICENSED_STATES_FULL_NAMES = [
  "Arizona",
  "California",
  "Colorado",
  "Florida",
  "Illinois",
  "Michigan",
  "Oregon",
  "Texas",
  "Washington",
] as const;

export const LICENSED_STATES_FULL_LIST =
  "Arizona, California, Colorado, Florida, Illinois, Michigan, Oregon, Texas, and Washington";

export const NMLS_CONSUMER_ACCESS_HOME = "https://www.nmlsconsumeraccess.org/";

export const FOOTER_FINE_PRINT = [
  `${MARKETING_SITE_NAME} is a marketing website operated by Chris Butler, ${NMLS_LABEL}.`,
  `Mortgage financing is provided through ${MORTGAGE_COMPANY_NAME}, ${COMPANY_NMLS_LABEL}.`,
  `Licensed in ${LICENSED_STATES_FULL_LIST}.`,
  "Not all applicants will qualify. Programs, rates, terms, and availability are subject to change without notice. Equal Housing Opportunity.",
] as const;

export const ABOUT_COMPLIANCE_BLOCK = `Mortgage financing is provided through ${MORTGAGE_COMPANY_NAME} (${COMPANY_NMLS_LABEL}). Chris Butler is licensed in ${LICENSED_STATES_FULL_LIST}.`;

export const FUNNEL_COMPLIANCE_DISCLAIMER =
  "This is not a loan application, pre-approval, commitment to lend, or lending decision. Financing options are subject to lender review, qualification, underwriting, property eligibility, and applicable lending guidelines.";

export const MORTGAGE_STANDARD_DISCLAIMER =
  "This website provides educational information and a lead intake experience. Nothing on this site is a loan application, pre-approval, commitment to lend, guarantee of rates or terms, or financial, legal, or tax advice. Programs, rates, and terms may be available for qualifying borrowers and properties, subject to approval, underwriting, property eligibility, investor/lender guidelines, and state licensing. Not all applicants will qualify. Equal Housing Opportunity.";
