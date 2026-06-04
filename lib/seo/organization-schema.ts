import { PLATFORM_EMAIL, PLATFORM_PHONE_TEL } from "@/lib/contact";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: PLATFORM_EMAIL,
    telephone: PLATFORM_PHONE_TEL,
    description:
      "Lead generation and information platform connecting rental property investors with financing specialists and licensed lending partners.",
  };
}
