import { DealAnalyzerAnalyzeView } from "../components/deal-analyzer-analyze-view";

export default async function DealAnalyzerAnalyzePage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string; step?: string }>;
}) {
  const params = await searchParams;
  return <DealAnalyzerAnalyzeView step={params.step} path={params.path} />;
}
