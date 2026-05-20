import type { AgentBrandingFields } from "./agent-branding";

export type PartnerAgent = AgentBrandingFields & {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  slug: string;
  referralCode: string;
};

export type PartnerAgentInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  slug: string;
  referralCode: string;
  headshotUrl?: string;
  logoUrl?: string;
  bio?: string;
  brokerage?: string;
  ctaPhone?: string;
  ctaEmail?: string;
  brandColor?: string;
};

export type AgentDashboardStats = PartnerAgent & {
  totalReports: number;
  totalLeads: number;
  appointmentSetCount: number;
  conversionRate: number;
  createdAt: string;
};

export function slugifyAgent(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function referralCodeFromName(name: string): string {
  const base = name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "")
    .slice(0, 8);
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${base || "AGENT"}${suffix}`;
}

export function partnerDealAnalyzerBase(slug: string): string {
  return `/partners/${slug}/deal-analyzer`;
}

export function partnerLandingPath(slug: string): string {
  return `/partners/${slug}`;
}

export function partnerLink(siteUrl: string, slug: string): string {
  return `${siteUrl.replace(/\/$/, "")}${partnerLandingPath(slug)}`;
}

export function partnerSampleReportPath(slug: string): string {
  return `/partners/${slug}/sample-report`;
}
