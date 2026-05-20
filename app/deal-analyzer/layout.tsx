import type { Metadata } from "next";
import { DealAnalyzerProvider } from "./components/deal-analyzer-provider";
import { DealAnalyzerShell } from "./components/deal-analyzer-shell";

export const metadata: Metadata = {
  title: "Deal Analyzer | The Loan Playbook",
  description:
    "Premium mortgage strategy analyzer—payment, DSCR, cap rate, refinance comparison, and your Playbook Report.",
};

export default function DealAnalyzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DealAnalyzerProvider>
      <DealAnalyzerShell>{children}</DealAnalyzerShell>
    </DealAnalyzerProvider>
  );
}
