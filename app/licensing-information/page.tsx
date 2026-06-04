import { ComplianceDocumentPage } from "@/components/legal/compliance-document-page";
import { LICENSING_INFORMATION_SECTIONS } from "@/lib/legal/document-sections";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licensing Information",
  description: `Licensing, lending partner, and mortgage disclosures for ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/licensing-information` },
  robots: { index: true, follow: true },
};

export default function LicensingInformationPage() {
  return (
    <ComplianceDocumentPage
      title="Licensing Information"
      sections={LICENSING_INFORMATION_SECTIONS}
    />
  );
}
