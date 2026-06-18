import { PreviewPageContent } from "@/components/deal-analyzer/preview-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preview Playbook Report",
  robots: { index: false, follow: false },
};

export default function DealAnalyzerPreviewPage() {
  return <PreviewPageContent />;
}
