import { AnalyzePageContent } from "@/components/deal-analyzer/analyze-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyze Your Deal",
  description:
    "Model purchase, refinance, investor, and commercial scenarios with The Loan Playbook Deal Analyzer. Educational estimates only.",
};

export default function DealAnalyzerAnalyzePage() {
  return <AnalyzePageContent />;
}
