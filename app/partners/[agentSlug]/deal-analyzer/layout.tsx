import { DealAnalyzerAnalyticsTracker } from "@/app/deal-analyzer/components/deal-analyzer-analytics-tracker";
import { DealAnalyzerShell } from "@/app/deal-analyzer/components/deal-analyzer-shell";
import "@/app/deal-analyzer/deal-analyzer-preview.css";

export default function PartnerDealAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DealAnalyzerAnalyticsTracker />
      <DealAnalyzerShell eyebrow="Partner Deal Analyzer">{children}</DealAnalyzerShell>
    </>
  );
}
