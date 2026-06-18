import { LeadPageContent } from "@/components/deal-analyzer/lead-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unlock Your Playbook Report",
  robots: { index: false, follow: false },
};

export default function DealAnalyzerLeadPage() {
  return <LeadPageContent />;
}
