import { redirect } from "next/navigation";
import { DealAnalyzerProvider } from "@/app/deal-analyzer/components/deal-analyzer-provider";
import { PartnerAgentProvider } from "@/app/deal-analyzer/components/partner-agent-provider";
import { fetchAgentBySlug } from "@/app/deal-analyzer/lib/supabase/agents";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ agentSlug: string }>;
};

export default async function PartnerAgentLayout({ children, params }: LayoutProps) {
  const { agentSlug } = await params;
  const result = await fetchAgentBySlug(agentSlug);

  if (!result || "error" in result) {
    redirect("/deal-analyzer");
  }

  return (
    <DealAnalyzerProvider>
      <PartnerAgentProvider agent={result}>{children}</PartnerAgentProvider>
    </DealAnalyzerProvider>
  );
}
