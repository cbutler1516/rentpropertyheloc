import { PLATFORM_EMAIL, PLATFORM_PHONE_TEL } from "@/lib/contact";
import { BRAND_ASSETS } from "@/lib/brand";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: SITE_NAME,
    url: SITE_URL,
    email: PLATFORM_EMAIL,
    telephone: PLATFORM_PHONE_TEL,
    logo: `${SITE_URL}${BRAND_ASSETS.light}`,
    description:
      "HELOC and home equity review platform for homeowners and investors exploring equity options.",
    areaServed: ["Washington", "Seattle", "United States"],
  };
}
