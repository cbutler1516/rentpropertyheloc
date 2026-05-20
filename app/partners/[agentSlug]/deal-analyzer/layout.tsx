import { DealAnalyzerShell } from "@/app/deal-analyzer/components/deal-analyzer-shell";
import "@/app/deal-analyzer/deal-analyzer-preview.css";

export default function PartnerDealAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DealAnalyzerShell eyebrow="Partner Deal Analyzer">{children}</DealAnalyzerShell>;
}
