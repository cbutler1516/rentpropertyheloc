import { getSiteUrl, isSupabaseConfigured } from "@/app/deal-analyzer/lib/supabase/env";
import { generateDemoComplianceScan } from "../generate-compliance-scan-fallback";
import { generateDemoPackage } from "../generate-fallback";
import { generateDemoLandingPage } from "../generate-landing-fallback";
import { generateDemoLeadCapture } from "../generate-lead-capture-fallback";
import {
  buildPublishedUrl,
  getPackagePreviewDraft,
  publishCampaignPage,
} from "../published-pages";
import { savePackageToSupabase } from "../supabase/packages";
import { submitCampaignLead } from "../submit-campaign-lead";
import { createContentEngineSupabaseClient } from "../supabase/client";
import { OUTPUT_TAB_KEYS } from "../types";
import type { FunnelCleanupResult, FunnelTestReport, FunnelTestStep, QaStatus } from "./qa-types";

export const QA_FUNNEL_SLUG = "qa-funnel-test";
const QA_SOURCE =
  "QA funnel test: Fed steady, buyers need strategy without rate bait. Automated production readiness check.";

function step(
  id: string,
  label: string,
  status: QaStatus,
  message?: string,
  durationMs?: number,
): FunnelTestStep {
  return { id, label, status, message, durationMs };
}

function overallFromSteps(steps: FunnelTestStep[]): QaStatus {
  if (steps.some((s) => s.status === "fail")) return "fail";
  if (steps.some((s) => s.status === "warn")) return "warn";
  return "pass";
}

async function runStep<T>(
  id: string,
  label: string,
  fn: () => Promise<T>,
): Promise<{ step: FunnelTestStep; value?: T }> {
  const start = Date.now();
  try {
    const value = await fn();
    return {
      value,
      step: step(id, label, "pass", "OK", Date.now() - start),
    };
  } catch (err) {
    return {
      step: step(
        id,
        label,
        "fail",
        err instanceof Error ? err.message : "Step failed",
        Date.now() - start,
      ),
    };
  }
}

export async function runFullFunnelTest(): Promise<FunnelTestReport> {
  const runAt = new Date().toISOString();
  const steps: FunnelTestStep[] = [];
  let packageId = "";
  let publishedPageId: string | undefined;
  let leadId: string | undefined;
  const slug = QA_FUNNEL_SLUG;

  if (!isSupabaseConfigured()) {
    return {
      runAt,
      slug,
      packageId: "",
      steps: [
        step(
          "prereq",
          "Supabase configured",
          "fail",
          "Full funnel test requires Supabase (publish + lead submit).",
        ),
      ],
      overall: "fail",
    };
  }

  const outputs = generateDemoPackage(QA_SOURCE);
  const landing = generateDemoLandingPage({
    intent: "buyer-lead",
    sourceInput: QA_SOURCE,
    topic: "QA Funnel Test",
    title: "[QA] Funnel Test Campaign",
  });
  const leadCapture = generateDemoLeadCapture({
    preset: "buyer-lead",
    sourceInput: QA_SOURCE,
    topic: "QA Funnel Test",
    title: "[QA] Funnel Test Campaign",
    brandVoiceId: "chris-butler-loan-playbook",
    landingPage: landing,
  });

  const createStep = await runStep("create-package", "Create test campaign package", async () => {
    const emptyOutputs = OUTPUT_TAB_KEYS.reduce(
      (acc, key) => {
        acc[key] = outputs[key];
        return acc;
      },
      {} as typeof outputs,
    );
    const saved = await savePackageToSupabase({
      title: "[QA] Funnel Test Campaign",
      sourceInput: QA_SOURCE,
      audience: "buyer",
      tone: "strategic",
      topic: "QA Funnel Test",
      modelUsed: "demo",
      brandVoiceId: "chris-butler-loan-playbook",
      generationMode: "single",
      outputs: emptyOutputs,
      landingPage: landing,
      leadCapture,
      tags: [],
    });
    if ("error" in saved) throw new Error(saved.error);
    packageId = saved.id;
    return saved.id;
  });
  steps.push(createStep.step);
  if (!createStep.value) {
    return { runAt, slug, packageId, steps, overall: overallFromSteps(steps) };
  }

  const contentStep = await runStep("generate-content", "Generate content", async () => {
    if (!OUTPUT_TAB_KEYS.every((k) => outputs[k]?.trim())) {
      throw new Error("Demo content pack incomplete.");
    }
    return true;
  });
  steps.push(contentStep.step);

  const landingStep = await runStep("generate-landing", "Generate landing page", async () => {
    if (!landing.sections.heroHeadline?.trim()) {
      throw new Error("Landing page missing hero headline.");
    }
    return true;
  });
  steps.push(landingStep.step);

  const captureStep = await runStep("generate-lead-capture", "Generate lead capture", async () => {
    if (!leadCapture.consent.smsCallConsentCopy?.trim()) {
      throw new Error("Lead capture missing consent copy.");
    }
    return true;
  });
  steps.push(captureStep.step);

  const publishStep = await runStep("publish-page", "Publish test page", async () => {
    const result = await publishCampaignPage({
      packageId,
      slug,
      packageTitle: "[QA] Funnel Test Campaign",
      landingPage: landing,
      leadCapture,
    });
    if ("error" in result) throw new Error(result.error);
    return result.publishedUrl;
  });
  steps.push(publishStep.step);

  const leadStep = await runStep("submit-lead", "Submit test lead", async () => {
    const result = await submitCampaignLead({
      slug,
      lead: {
        firstName: "QA",
        lastName: "Tester",
        email: `qa-funnel+${Date.now()}@loanplaybook.test`,
        phone: "5555550100",
        smsCallConsent: true,
        emailOptIn: true,
      },
      utm: { utmSource: "qa-admin", utmMedium: "funnel-test", utmCampaign: slug },
    });
    if (!result.success) throw new Error(result.error ?? "Lead submit failed");
    leadId = result.leadId;
    return result.leadId;
  });
  steps.push(leadStep.step);

  const complianceStep = await runStep("compliance-scan", "Run compliance scan", async () => {
    const record = generateDemoComplianceScan({
      title: "[QA] Funnel Test Campaign",
      topic: "QA Funnel Test",
      generationMode: "single",
      outputs,
      landingPage: landing,
      leadCapture,
      publishedStatus: {
        slug,
        isPublished: true,
        publishedAt: runAt,
        unpublishedAt: null,
        publishedUrl: buildPublishedUrl(slug),
      },
    });
    return `Risk: ${record.riskScore}, ${record.issues.length} issue(s)`;
  });
  steps.push({
    ...complianceStep.step,
    message:
      typeof complianceStep.value === "string"
        ? complianceStep.value
        : complianceStep.step.message,
  });

  const preview = await getPackagePreviewDraft(packageId);
  const previewUrl = `${getSiteUrl().replace(/\/$/, "")}/campaigns/preview/${packageId}`;
  const publishedUrl = buildPublishedUrl(slug);

  const supabase = createContentEngineSupabaseClient();
  if (supabase) {
    const { data: pageRow } = await supabase
      .from("content_engine_published_pages")
      .select("id")
      .eq("package_id", packageId)
      .maybeSingle();
    publishedPageId = pageRow?.id as string | undefined;
  }

  steps.push(
    step(
      "preview-route",
      "Public page preview route",
      preview ? "pass" : "warn",
      preview
        ? `Preview draft OK — ${previewUrl}`
        : "Preview draft empty; published URL may still work.",
    ),
  );

  return {
    runAt,
    slug,
    packageId,
    publishedPageId,
    leadId,
    previewUrl,
    publishedUrl,
    steps,
    overall: overallFromSteps(steps),
  };
}

export async function cleanupFunnelTest(input: {
  packageId?: string;
  slug?: string;
}): Promise<FunnelCleanupResult> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) {
    return { ok: false, message: "Supabase not configured." };
  }

  const packageId = input.packageId?.trim();
  const slug = (input.slug?.trim() || QA_FUNNEL_SLUG).toLowerCase();

  let resolvedPackageId = packageId;
  if (!resolvedPackageId) {
    const { data: page } = await supabase
      .from("content_engine_published_pages")
      .select("package_id")
      .eq("slug", slug)
      .maybeSingle();
    resolvedPackageId = page?.package_id as string | undefined;
  }

  if (!resolvedPackageId) {
    const { data: pkg } = await supabase
      .from("content_engine_packages")
      .select("id")
      .ilike("title", "[QA] Funnel Test%")
      .limit(1)
      .maybeSingle();
    resolvedPackageId = pkg?.id as string | undefined;
  }

  if (!resolvedPackageId) {
    return { ok: true, message: "No QA funnel test records found to delete." };
  }

  const { count } = await supabase
    .from("content_engine_campaign_leads")
    .delete({ count: "exact" })
    .eq("package_id", resolvedPackageId);

  await supabase
    .from("content_engine_published_pages")
    .delete()
    .eq("package_id", resolvedPackageId);

  await supabase
    .from("content_engine_crm_credentials")
    .delete()
    .eq("package_id", resolvedPackageId);

  const { error: pkgError } = await supabase
    .from("content_engine_packages")
    .delete()
    .eq("id", resolvedPackageId);

  if (pkgError) {
    return { ok: false, message: pkgError.message };
  }

  return {
    ok: true,
    message: "QA funnel test records removed.",
    deleted: {
      packageId: resolvedPackageId,
      slug,
      leads: count ?? 0,
    },
  };
}
