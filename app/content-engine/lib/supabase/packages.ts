import { randomUUID } from "crypto";
import { createContentEngineSupabaseClient } from "./client";
import { OUTPUT_TAB_KEYS } from "../types";
import { rowToPackage, packageToRow } from "../mappers";
import type { ContentEnginePackageRow } from "../database.types";
import type { ContentPackage, PackageDraft } from "../types";

export async function listPackagesFromSupabase(): Promise<
  ContentPackage[] | { error: string }
> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { data, error } = await supabase
    .from("content_engine_packages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return { error: error.message };
  return (data as ContentEnginePackageRow[]).map(rowToPackage);
}

export async function savePackageToSupabase(
  draft: PackageDraft & { id?: string },
): Promise<ContentPackage | { error: string }> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const id = draft.id ?? randomUUID();
  const createdAt = new Date().toISOString();
  const emptySingle = OUTPUT_TAB_KEYS.reduce(
    (acc, key) => {
      acc[key] = draft.outputs[key] ?? "";
      return acc;
    },
    {} as ContentPackage["outputs"],
  );

  const pkg: ContentPackage = {
    id,
    createdAt,
    title: draft.title,
    sourceInput: draft.sourceInput,
    audience: draft.audience,
    tone: draft.tone,
    topic: draft.topic,
    modelUsed: draft.modelUsed,
    brandVoiceId: draft.brandVoiceId,
    generationMode: draft.generationMode,
    outputs: emptySingle,
    campaignOutputs:
      draft.generationMode === "campaign" ? draft.campaignOutputs : undefined,
    landingPage: draft.landingPage,
    calendar: draft.calendar,
    leadMagnet: draft.leadMagnet,
    launchHub: draft.launchHub,
    leadCapture: draft.leadCapture,
    crmIntegration: draft.crmIntegration,
    analytics: draft.analytics,
    tags: draft.tags,
  };

  const row = packageToRow(pkg);
  const { data, error } = await supabase
    .from("content_engine_packages")
    .upsert(row)
    .select("*")
    .single();

  if (error || !data) return { error: error?.message ?? "Failed to save package." };
  return rowToPackage(data as ContentEnginePackageRow);
}

export async function deletePackageFromSupabase(
  id: string,
): Promise<{ ok: true } | { error: string }> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { error } = await supabase
    .from("content_engine_packages")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };
  return { ok: true };
}
