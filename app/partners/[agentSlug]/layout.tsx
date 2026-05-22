import { DealAnalyzerProvider } from "@/app/deal-analyzer/components/deal-analyzer-provider";
import { DealAnalyzerShell } from "@/app/deal-analyzer/components/deal-analyzer-shell";
import { PartnerInvalidAgentView } from "@/app/deal-analyzer/components/partner-invalid-agent-view";
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
    return (
      <DealAnalyzerProvider>
        <DealAnalyzerShell eyebrow="Partner link">
          <PartnerInvalidAgentView agentSlug={agentSlug} />
        </DealAnalyzerShell>
      </DealAnalyzerProvider>
    );
  }

  return (
    <DealAnalyzerProvider>
      <PartnerAgentProvider agent={result}>{children}</PartnerAgentProvider>
    </DealAnalyzerProvider>
  );
}
