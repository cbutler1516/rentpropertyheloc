import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { NMLS_LABEL } from "@/lib/legal/nmls";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: CONTACT_PHONE_TEL,
    description:
      "Rental property equity review platform connecting investors with licensed mortgage professionals.",
    areaServed: "United States",
    employee: {
      "@type": "Person",
      name: "Chris Butler",
      jobTitle: "Branch Manager / Sr. Loan Originator",
      identifier: NMLS_LABEL,
    },
  };
}

export function formatContactPhoneForDisplay(): string {
  return CONTACT_PHONE_DISPLAY;
}
