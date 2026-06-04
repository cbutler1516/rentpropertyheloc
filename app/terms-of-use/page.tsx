import { ComplianceDocumentPage } from "@/components/legal/compliance-document-page";
import { MARKETING_SITE_NAME } from "@/lib/legal/compliance";
import { TERMS_OF_USE_SECTIONS } from "@/lib/legal/document-sections";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${MARKETING_SITE_NAME} website and lead intake experience.`,
  alternates: { canonical: `${SITE_URL}/terms-of-use` },
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
  return <ComplianceDocumentPage title="Terms of Use" sections={TERMS_OF_USE_SECTIONS} />;
}
