import {
  SEO_LANDING_SLUGS,
  getSeoLandingContent,
  partnerSeoLandingPath,
} from "../seo-landing-content";
import type {
  AgentDashboardStats,
  PartnerAgent,
  PartnerAgentInput,
  PartnerLandingPageStat,
} from "../agent-types";
import { mapBrandingFromRow } from "../agent-branding";
import { createServerSupabaseClient } from "./server";

const AGENT_SELECT =
  "id, name, email, phone, company, slug, referral_code, headshot_url, logo_url, bio, brokerage, cta_phone, cta_email, brand_color";

type AgentRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  slug: string;
  referral_code: string;
  headshot_url?: string | null;
  logo_url?: string | null;
  bio?: string | null;
  brokerage?: string | null;
  cta_phone?: string | null;
  cta_email?: string | null;
  brand_color?: string | null;
  created_at?: string;
};

function mapAgentRow(row: AgentRow): PartnerAgent {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    slug: row.slug,
    referralCode: row.referral_code,
    ...mapBrandingFromRow(row),
  };
}

function brandingPatch(input: Partial<PartnerAgentInput>): Record<string, unknown> {
  const patch: Record<string, unknown> = {};
  if (input.headshotUrl !== undefined) patch.headshot_url = input.headshotUrl || null;
  if (input.logoUrl !== undefined) patch.logo_url = input.logoUrl || null;
  if (input.bio !== undefined) patch.bio = input.bio || null;
  if (input.brokerage !== undefined) patch.brokerage = input.brokerage || null;
  if (input.ctaPhone !== undefined) patch.cta_phone = input.ctaPhone || null;
  if (input.ctaEmail !== undefined) patch.cta_email = input.ctaEmail || null;
  if (input.brandColor !== undefined) patch.brand_color = input.brandColor || null;
  return patch;
}

export async function fetchAgentBySlug(
  slug: string,
): Promise<PartnerAgent | null | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { data, error } = await supabase
    .from("deal_analyzer_agents")
    .select(AGENT_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) return { error: error.message };
  if (!data) return null;
  return mapAgentRow(data as AgentRow);
}

export async function fetchAgentById(
  id: string,
): Promise<PartnerAgent | null | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { data, error } = await supabase
    .from("deal_analyzer_agents")
    .select(AGENT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) return { error: error.message };
  if (!data) return null;
  return mapAgentRow(data as AgentRow);
}

export async function listAgents(): Promise<
  PartnerAgent[] | { error: string }
> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { data, error } = await supabase
    .from("deal_analyzer_agents")
    .select(AGENT_SELECT)
    .order("name", { ascending: true });

  if (error) return { error: error.message };
  return (data ?? []).map((row) => mapAgentRow(row as AgentRow));
}

export async function createAgent(
  input: PartnerAgentInput,
): Promise<{ agent: PartnerAgent } | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { data, error } = await supabase
    .from("deal_analyzer_agents")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      company: input.company || null,
      slug: input.slug,
      referral_code: input.referralCode,
      updated_at: new Date().toISOString(),
      ...brandingPatch(input),
    })
    .select(AGENT_SELECT)
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Failed to create agent." };
  }

  return { agent: mapAgentRow(data as AgentRow) };
}

export async function updateAgent(
  id: string,
  input: Partial<PartnerAgentInput>,
): Promise<{ agent: PartnerAgent } | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
    ...brandingPatch(input),
  };
  if (input.name !== undefined) patch.name = input.name;
  if (input.email !== undefined) patch.email = input.email;
  if (input.phone !== undefined) patch.phone = input.phone || null;
  if (input.company !== undefined) patch.company = input.company || null;
  if (input.slug !== undefined) patch.slug = input.slug;
  if (input.referralCode !== undefined) patch.referral_code = input.referralCode;

  const { data, error } = await supabase
    .from("deal_analyzer_agents")
    .update(patch)
    .eq("id", id)
    .select(AGENT_SELECT)
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Failed to update agent." };
  }

  return { agent: mapAgentRow(data as AgentRow) };
}

export async function deleteAgent(
  id: string,
): Promise<{ ok: true } | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { error } = await supabase.from("deal_analyzer_agents").delete().eq("id", id);

  if (error) return { error: error.message };
  return { ok: true };
}

async function fetchPartnerLandingPageStats(): Promise<
  Map<string, PartnerLandingPageStat[]>
> {
  const supabase = createServerSupabaseClient();
  const byAgent = new Map<string, PartnerLandingPageStat[]>();

  if (!supabase) return byAgent;

  const since = new Date();
  since.setDate(since.getDate() - 90);
  const sinceIso = since.toISOString();

  const { data: events } = await supabase
    .from("deal_analyzer_events")
    .select("agent_id, event_name, page_path, metadata")
    .gte("created_at", sinceIso)
    .in("event_name", ["seo_landing_view", "lead_submitted"])
    .not("agent_id", "is", null);

  const viewCounts = new Map<string, Map<string, number>>();
  const leadCounts = new Map<string, Map<string, number>>();

  for (const row of events ?? []) {
    if (!row.agent_id) continue;
    const meta = row.metadata as { landingSlug?: string } | null;
    const landingSlug =
      meta?.landingSlug ??
      (row.page_path?.match(/\/deal-analyzer\/([^/]+)$/)?.[1] ?? null);
    if (!landingSlug || !(SEO_LANDING_SLUGS as readonly string[]).includes(landingSlug)) {
      continue;
    }

    if (row.event_name === "seo_landing_view") {
      const agentViews = viewCounts.get(row.agent_id) ?? new Map<string, number>();
      agentViews.set(landingSlug, (agentViews.get(landingSlug) ?? 0) + 1);
      viewCounts.set(row.agent_id, agentViews);
    }

    if (row.event_name === "lead_submitted") {
      const agentLeads = leadCounts.get(row.agent_id) ?? new Map<string, number>();
      agentLeads.set(landingSlug, (agentLeads.get(landingSlug) ?? 0) + 1);
      leadCounts.set(row.agent_id, agentLeads);
    }
  }

  const { data: agentRows } = await supabase
    .from("deal_analyzer_agents")
    .select("id, slug");

  for (const agent of agentRows ?? []) {
    const stats: PartnerLandingPageStat[] = SEO_LANDING_SLUGS.map((slug) => ({
      slug,
      label: getSeoLandingContent(slug).navLabel,
      path: partnerSeoLandingPath(agent.slug as string, slug),
      views: viewCounts.get(agent.id)?.get(slug) ?? 0,
      leads: leadCounts.get(agent.id)?.get(slug) ?? 0,
    }));
    byAgent.set(agent.id, stats);
  }

  return byAgent;
}

export async function fetchAgentDashboardStats(): Promise<
  AgentDashboardStats[] | { error: string }
> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const landingByAgent = await fetchPartnerLandingPageStats();

  const { data: reports, error: reportsError } = await supabase
    .from("deal_analyzer_reports")
    .select("agent_id, lead_id");

  if (reportsError) return { error: reportsError.message };

  const leadIds = [...new Set((reports ?? []).map((r) => r.lead_id))];
  let leadStatusMap = new Map<string, string>();

  if (leadIds.length > 0) {
    const { data: leads, error: leadsError } = await supabase
      .from("deal_analyzer_leads")
      .select("id, lead_status")
      .in("id", leadIds);

    if (leadsError) return { error: leadsError.message };
    leadStatusMap = new Map((leads ?? []).map((l) => [l.id, l.lead_status]));
  }

  const statsByAgent = new Map<
    string,
    { reports: number; leads: Set<string>; appointments: number }
  >();

  for (const report of reports ?? []) {
    if (!report.agent_id) continue;
    const bucket = statsByAgent.get(report.agent_id) ?? {
      reports: 0,
      leads: new Set<string>(),
      appointments: 0,
    };
    bucket.reports += 1;
    bucket.leads.add(report.lead_id);
    if (leadStatusMap.get(report.lead_id) === "Appointment Set") {
      bucket.appointments += 1;
    }
    statsByAgent.set(report.agent_id, bucket);
  }

  const { data: agentRows } = await supabase
    .from("deal_analyzer_agents")
    .select(`${AGENT_SELECT}, created_at`)
    .order("name", { ascending: true });

  return (agentRows ?? []).map((row) => {
    const agent = mapAgentRow(row as AgentRow);
    const bucket = statsByAgent.get(row.id);
    const totalLeads = bucket?.leads.size ?? 0;
    const appointmentSetCount = bucket?.appointments ?? 0;
    const conversionRate =
      totalLeads > 0 ? Math.round((appointmentSetCount / totalLeads) * 100) : 0;

    return {
      ...agent,
      totalReports: bucket?.reports ?? 0,
      totalLeads,
      appointmentSetCount,
      conversionRate,
      createdAt: row.created_at as string,
      landingPageStats: landingByAgent.get(row.id) ?? [],
    };
  });
}
