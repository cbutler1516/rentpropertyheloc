import { ComplianceDocumentPage } from "@/components/legal/compliance-document-page";
import { MARKETING_SITE_NAME } from "@/lib/legal/compliance";
import { PRIVACY_POLICY_SECTIONS } from "@/lib/legal/document-sections";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${MARKETING_SITE_NAME} collects, uses, and protects information submitted through ${SITE_URL}.`,
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return <ComplianceDocumentPage title="Privacy Policy" sections={PRIVACY_POLICY_SECTIONS} />;
}
