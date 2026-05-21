import { isSupabaseConfigured } from "@/app/deal-analyzer/lib/supabase/env";
import {
  deleteLocalPackage,
  loadLocalPackages,
  saveLocalPackages,
  upsertLocalPackage,
} from "./storage";
import type { ContentPackage, PackageDraft, SavePackageRequest } from "./types";

export function isRemoteStorageAvailable() {
  return isSupabaseConfigured();
}

export async function fetchPackages(): Promise<{
  packages: ContentPackage[];
  source: "supabase" | "local";
}> {
  if (isRemoteStorageAvailable()) {
    try {
      const response = await fetch("/api/content-engine/packages");
      if (response.ok) {
        const data = (await response.json()) as { packages: ContentPackage[] };
        return { packages: data.packages ?? [], source: "supabase" };
      }
    } catch {
      /* fall through to local */
    }
  }

  return { packages: loadLocalPackages(), source: "local" };
}

export async function savePackage(
  draft: SavePackageRequest,
): Promise<{ package: ContentPackage; source: "supabase" | "local" }> {
  const id = draft.id ?? crypto.randomUUID();
  const payload: PackageDraft & { id?: string } = { ...draft, id };

  if (isRemoteStorageAvailable()) {
    try {
      const response = await fetch("/api/content-engine/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data.package) {
        const pkg = data.package as ContentPackage;
        const local = upsertLocalPackage(loadLocalPackages(), pkg);
        saveLocalPackages(local);
        return { package: pkg, source: "supabase" };
      }
    } catch {
      /* fall through */
    }
  }

  const pkg: ContentPackage = {
    id,
    createdAt: new Date().toISOString(),
    title: draft.title,
    sourceInput: draft.sourceInput,
    audience: draft.audience,
    tone: draft.tone,
    topic: draft.topic,
    modelUsed: draft.modelUsed,
    brandVoiceId: draft.brandVoiceId,
    generationMode: draft.generationMode,
    outputs: draft.outputs,
    campaignOutputs: draft.campaignOutputs,
    landingPage: draft.landingPage,
    calendar: draft.calendar,
    leadMagnet: draft.leadMagnet,
    launchHub: draft.launchHub,
    leadCapture: draft.leadCapture,
    crmIntegration: draft.crmIntegration,
    analytics: draft.analytics,
    tags: draft.tags,
  };
  const next = upsertLocalPackage(loadLocalPackages(), pkg);
  saveLocalPackages(next);
  return { package: pkg, source: "local" };
}

export async function removePackage(id: string): Promise<void> {
  if (isRemoteStorageAvailable()) {
    try {
      await fetch(`/api/content-engine/packages/${id}`, { method: "DELETE" });
    } catch {
      /* still update local */
    }
  }
  const next = deleteLocalPackage(loadLocalPackages(), id);
  saveLocalPackages(next);
}
