import type { CSSProperties } from "react";
import type { PartnerAgent } from "./agent-types";

export type AgentBrandingFields = {
  headshotUrl: string | null;
  logoUrl: string | null;
  bio: string | null;
  brokerage: string | null;
  ctaPhone: string | null;
  ctaEmail: string | null;
  brandColor: string | null;
};

export type PartnerAgentBranding = AgentBrandingFields & {
  id: string;
  name: string;
  slug: string;
  email: string;
};

export function mapBrandingFromRow(row: {
  headshot_url?: string | null;
  logo_url?: string | null;
  bio?: string | null;
  brokerage?: string | null;
  cta_phone?: string | null;
  cta_email?: string | null;
  brand_color?: string | null;
}): AgentBrandingFields {
  return {
    headshotUrl: row.headshot_url ?? null,
    logoUrl: row.logo_url ?? null,
    bio: row.bio ?? null,
    brokerage: row.brokerage ?? null,
    ctaPhone: row.cta_phone ?? null,
    ctaEmail: row.cta_email ?? null,
    brandColor: row.brand_color ?? null,
  };
}

export function resolveBrokerage(agent: Pick<PartnerAgent, "brokerage" | "company">): string | null {
  return agent.brokerage?.trim() || agent.company?.trim() || null;
}

export function resolveCtaPhone(agent: Pick<PartnerAgent, "ctaPhone" | "phone">): string | null {
  return agent.ctaPhone?.trim() || agent.phone?.trim() || null;
}

export function resolveCtaEmail(agent: Pick<PartnerAgent, "ctaEmail" | "email">): string | null {
  return agent.ctaEmail?.trim() || agent.email?.trim() || null;
}

export function agentBrandStyle(brandColor: string | null | undefined): CSSProperties | undefined {
  if (!brandColor?.trim()) return undefined;
  const color = brandColor.trim();
  return {
    ["--agent-brand" as string]: color,
  };
}

export function hasAgentVisualBranding(
  agent: Pick<AgentBrandingFields, "headshotUrl" | "logoUrl">,
): boolean {
  return Boolean(agent.headshotUrl?.trim() || agent.logoUrl?.trim());
}
