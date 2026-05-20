import { DealAnalyzerAnalyzeView } from "@/app/deal-analyzer/components/deal-analyzer-analyze-view";

export default async function PartnerDealAnalyzerAnalyzePage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ path?: string; step?: string }>;
  params: Promise<{ agentSlug: string }>;
}) {
  const query = await searchParams;
  await params;
  return <DealAnalyzerAnalyzeView step={query.step} path={query.path} />;
}
