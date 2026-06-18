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
      "Modern mortgage company and financing strategy platform — Deal Analyzer, playbook reports, and strategy-first guidance for buyers, investors, agents, and commercial clients.",
    areaServed: ["Washington", "Seattle", "United States"],
  };
}
