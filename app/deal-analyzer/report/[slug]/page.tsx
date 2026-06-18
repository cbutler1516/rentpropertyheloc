import { ReportViewContent } from "@/components/deal-analyzer/report-view-content";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: "Playbook Report",
    description: "Your Loan Playbook financing scenario report — educational estimates only.",
    robots: { index: false, follow: false },
    openGraph: { title: `Playbook Report · ${slug}` },
  };
}

export default async function DealAnalyzerReportPage({ params }: PageProps) {
  const { slug } = await params;
  return <ReportViewContent slug={slug} />;
}
