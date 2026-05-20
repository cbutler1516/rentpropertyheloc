import { dealPathMeta } from "./constants";
import { fetchReportFromSupabase } from "./supabase/save-report";
import type { DealPath } from "./types";

export type ReportOgMeta = {
  slug: string;
  title: string;
  description: string;
  pathLabel: string;
  clientName?: string;
  agentName?: string | null;
};

export async function fetchReportMetaForOg(
  slug: string,
): Promise<ReportOgMeta | null> {
  const result = await fetchReportFromSupabase(slug);
  if ("error" in result) return null;

  const pathLabel =
    dealPathMeta[result.inputs.path as DealPath]?.label ?? "Mortgage Strategy";
  const clientName = result.lead.name?.trim();
  const title = clientName
    ? `Playbook Report for ${clientName}`
    : `${pathLabel} Playbook Report`;

  const description =
    result.narrative.executiveSummary?.slice(0, 155) ??
    `Educational mortgage strategy snapshot — ${pathLabel}. Not a loan estimate or commitment.`;

  return {
    slug: result.slug,
    title,
    description: description.length > 155 ? `${description}…` : description,
    pathLabel,
    clientName: clientName || undefined,
    agentName: result.agentName ?? result.lead.agentName,
  };
}
