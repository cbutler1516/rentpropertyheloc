import { PLATFORM_EMAIL } from "@/lib/contact";
import { COMPANY_NMLS_LABEL, NMLS_LABEL, NMLS_NUMBER } from "@/lib/legal/nmls";
import { MORTGAGE_COMPANY_NAME, LICENSED_STATES_FULL_LIST } from "@/lib/legal/compliance";

/** Loan originator — disclosed on Licensing Information only */
export const LICENSED_ORIGINATOR_NAME = "Chris Butler";

export const LICENSED_ORIGINATOR_TITLE = "Branch Manager / Sr. Loan Originator";

export const LICENSED_ORIGINATOR_NMLS_URL = `https://www.nmlsconsumeraccess.org/EntityDetails.aspx/INDIVIDUAL/${NMLS_NUMBER}`;

export const LICENSING_INQUIRY_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_LICENSING_PHONE ??
  process.env.NEXT_PUBLIC_CONTACT_PHONE ??
  "(206) 558-3048";

export const LICENSING_PARTNER_DISCLOSURES = {
  platformOperator:
    "Rent Property HELOC is a lead generation and information platform. Financing options may be provided through licensed lending partners.",
  originator: `${LICENSED_ORIGINATOR_NAME} — ${NMLS_LABEL}.`,
  company: `${MORTGAGE_COMPANY_NAME} — ${COMPANY_NMLS_LABEL}.`,
  licensedStatesIntro: `${LICENSED_ORIGINATOR_NAME} is licensed in the following states:`,
  inquiryEmail: PLATFORM_EMAIL,
  inquiryPhone: LICENSING_INQUIRY_PHONE_DISPLAY,
  licensedStatesList: LICENSED_STATES_FULL_LIST,
} as const;
