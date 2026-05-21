import { getSiteUrl } from "@/app/deal-analyzer/lib/supabase/env";
import { parseCrmIntegrationJson } from "./crm-integration-parse";
import { parseLeadCaptureJson } from "./lead-capture-parse";
import { createContentEngineSupabaseClient } from "./supabase/client";
import { normalizeCampaignSlug, validateCampaignSlug } from "./campaign-slug";
import type {
  CrmIntegrationRecord,
  LandingPageRecord,
  LeadCaptureRecord,
  PublishedPageRecord,
  PublishedPageStatus,
} from "./types";

type UnknownRecord = { [key: string]: unknown };

function parseLandingFromJson(raw: unknown): LandingPageRecord | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as UnknownRecord;
  if (!r.sections || typeof r.sections !== "object") return null;
  return raw as LandingPageRecord;
}

export function buildPublishedUrl(slug: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  return `${base}/campaigns/${slug}`;
}

export async function getPublishedPageBySlug(
  slug: string,
): Promise<PublishedPageRecord | null> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) return null;

  const normalized = normalizeCampaignSlug(slug);
  const { data, error } = await supabase
    .from("content_engine_published_pages")
    .select("*")
    .eq("slug", normalized)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) return null;

  const landing = parseLandingFromJson(data.landing_page_json);
  if (!landing) return null;

  return {
    id: data.id,
    packageId: data.package_id,
    slug: data.slug,
    packageTitle: data.package_title,
    landingPage: landing,
    leadCapture: parseLeadCaptureJson(data.lead_capture_json) ?? undefined,
    crmIntegration: parseCrmIntegrationJson(data.crm_integration_json) ?? undefined,
    isPublished: data.is_published === true,
    publishedAt: data.published_at,
    updatedAt: data.updated_at,
    unpublishedAt: data.unpublished_at ?? undefined,
  };
}

export async function getPublishedPageStatus(
  packageId: string,
): Promise<PublishedPageStatus | null> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("content_engine_published_pages")
    .select("slug, is_published, published_at, unpublished_at")
    .eq("package_id", packageId)
    .maybeSingle();

  if (error || !data) return null;

  return {
    slug: data.slug,
    isPublished: data.is_published === true,
    publishedAt: data.published_at,
    unpublishedAt: data.unpublished_at ?? null,
    publishedUrl: buildPublishedUrl(data.slug),
  };
}

export async function getPackagePreviewDraft(
  packageId: string,
): Promise<PublishedPageRecord | null> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("content_engine_packages")
    .select(
      "id, title, landing_page_json, lead_capture_json, crm_integration_json",
    )
    .eq("id", packageId)
    .maybeSingle();

  if (error || !data) return null;

  const landing = parseLandingFromJson(data.landing_page_json);
  if (!landing) return null;

  return {
    id: `preview-${packageId}`,
    packageId: data.id,
    slug: "preview",
    packageTitle: data.title,
    landingPage: landing,
    leadCapture: parseLeadCaptureJson(data.lead_capture_json) ?? undefined,
    crmIntegration: parseCrmIntegrationJson(data.crm_integration_json) ?? undefined,
    isPublished: false,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function publishCampaignPage(input: {
  packageId: string;
  slug: string;
  packageTitle: string;
  landingPage: LandingPageRecord;
  leadCapture?: LeadCaptureRecord;
  crmIntegration?: CrmIntegrationRecord;
}): Promise<PublishedPageStatus | { error: string }> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) {
    return { error: "Publishing requires Supabase. Configure env keys first." };
  }

  const slugError = validateCampaignSlug(input.slug);
  if (slugError) return { error: slugError };

  const slug = normalizeCampaignSlug(input.slug);
  const now = new Date().toISOString();

  const { data: existingSlug, error: slugCheckError } = await supabase
    .from("content_engine_published_pages")
    .select("package_id")
    .eq("slug", slug)
    .maybeSingle();

  if (slugCheckError) return { error: slugCheckError.message };
  if (existingSlug && existingSlug.package_id !== input.packageId) {
    return { error: "This slug is already in use by another campaign." };
  }

  const row = {
    package_id: input.packageId,
    slug,
    package_title: input.packageTitle.trim(),
    landing_page_json: input.landingPage,
    lead_capture_json: input.leadCapture ?? null,
    crm_integration_json: input.crmIntegration ?? null,
    is_published: true,
    published_at: now,
    updated_at: now,
    unpublished_at: null,
  };

  const { error } = await supabase
    .from("content_engine_published_pages")
    .upsert(row, { onConflict: "package_id" });

  if (error) return { error: error.message };

  return {
    slug,
    isPublished: true,
    publishedAt: now,
    unpublishedAt: null,
    publishedUrl: buildPublishedUrl(slug),
  };
}

export async function unpublishCampaignPage(
  packageId: string,
): Promise<{ ok: true } | { error: string }> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) {
    return { error: "Unpublish requires Supabase." };
  }

  const now = new Date().toISOString();
  const { error } = await supabase
    .from("content_engine_published_pages")
    .update({
      is_published: false,
      unpublished_at: now,
      updated_at: now,
    })
    .eq("package_id", packageId);

  if (error) return { error: error.message };
  return { ok: true };
}
