import { ComplianceDocumentPage } from "@/components/legal/compliance-document-page";
import { DISCLOSURES_SECTIONS } from "@/lib/legal/document-sections";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Licensing & Disclosures",
  description: `Licensing, NMLS, and mortgage disclosures for ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/disclosures` },
  robots: { index: true, follow: true },
};

export default function DisclosuresPage() {
  return <ComplianceDocumentPage title="Licensing & Disclosures" sections={DISCLOSURES_SECTIONS} />;
}
