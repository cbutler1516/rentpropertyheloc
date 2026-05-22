import {
  getSiteUrl,
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "@/app/deal-analyzer/lib/supabase/env";
import { generateDemoAnalyticsRecommend } from "../generate-analytics-recommend-fallback";
import { generateDemoCalendar } from "../generate-calendar-fallback";
import { generateDemoComplianceScan } from "../generate-compliance-scan-fallback";
import { generateDemoPackage } from "../generate-fallback";
import { generateDemoLandingPage } from "../generate-landing-fallback";
import { generateDemoLeadCapture } from "../generate-lead-capture-fallback";
import { generateDemoLeadMagnet } from "../generate-lead-magnet-fallback";
import { buildLaunchHubFromPackage } from "../build-launch-hub";
import { createDefaultAnalytics } from "../analytics-defaults";
import { createDefaultCrmIntegration } from "../crm-integration-defaults";
import { buildTestLeadPayload } from "../crm-test-lead";
import { pushLeadToCrm } from "../crm-push";
import { getPackagePreviewDraft } from "../published-pages";
import { randomUUID } from "crypto";
import { createContentEngineSupabaseClient } from "../supabase/client";
import { OUTPUT_TAB_KEYS } from "../types";
import type { QaCheckResult, QaHealthReport, QaStatus } from "./qa-types";

const QA_TEST_INPUT =
  "Fed held rates steady. Puget Sound buyers want agent-forwardable strategy without rate bait. QA health check.";

const REQUIRED_PACKAGE_COLUMNS = [
  "id",
  "created_at",
  "title",
  "source_input",
  "audience",
  "tone",
  "topic",
  "model_used",
  "brand_voice_id",
  "generation_mode",
  "outputs_json",
  "landing_page_json",
  "calendar_json",
  "lead_magnet_json",
  "launch_hub_json",
  "lead_capture_json",
  "crm_integration_json",
  "analytics_json",
  "compliance_json",
  "tags",
] as const;

const CONTENT_ENGINE_MIGRATIONS: {
  version: string;
  label: string;
  column?: (typeof REQUIRED_PACKAGE_COLUMNS)[number];
  table?: string;
}[] = [
  { version: "002", label: "Packages table (002)", table: "content_engine_packages" },
  { version: "003", label: "Brand voice + generation mode (003)", column: "brand_voice_id" },
  { version: "004", label: "Landing page JSON (004)", column: "landing_page_json" },
  { version: "005", label: "Calendar JSON (005)", column: "calendar_json" },
  { version: "006", label: "Lead magnet JSON (006)", column: "lead_magnet_json" },
  { version: "007", label: "Launch hub JSON (007)", column: "launch_hub_json" },
  { version: "008", label: "Lead capture JSON (008)", column: "lead_capture_json" },
  { version: "009", label: "Reserved slot (009)", column: "lead_capture_json" },
  { version: "010", label: "CRM integration JSON (010)", column: "crm_integration_json" },
  { version: "011", label: "Analytics JSON (011)", column: "analytics_json" },
  { version: "012", label: "Published pages + campaign leads (012)" },
  { version: "013", label: "Compliance JSON (013)", column: "compliance_json" },
];

function summarize(checks: QaCheckResult[]) {
  return checks.reduce(
    (acc, c) => {
      acc[c.status] += 1;
      return acc;
    },
    { pass: 0, warn: 0, fail: 0, skip: 0 },
  );
}

function timed<T>(fn: () => T | Promise<T>): Promise<{ result: T; durationMs: number }> {
  const start = Date.now();
  return Promise.resolve(fn()).then((result) => ({
    result,
    durationMs: Date.now() - start,
  }));
}

function check(
  id: string,
  label: string,
  status: QaStatus,
  message?: string,
  fix?: string,
  durationMs?: number,
): QaCheckResult {
  return { id, label, status, message, fix, durationMs };
}

export function runEnvironmentChecks(): QaCheckResult[] {
  const openAi = process.env.OPENAI_API_KEY?.trim();
  const openAiModel = process.env.OPENAI_MODEL?.trim() ?? "gpt-4o-mini (default)";
  const supabaseUrl = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  const serviceKey = getSupabaseServiceRoleKey();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  return [
    check(
      "env-openai-key",
      "OPENAI_API_KEY",
      openAi ? "pass" : "warn",
      openAi ? "Configured — AI routes can use live model." : "Not set — demo fallbacks only.",
      openAi ? undefined : "Add OPENAI_API_KEY to .env.local for production AI generation.",
    ),
    check(
      "env-openai-model",
      "OPENAI_MODEL",
      "pass",
      openAi ? `Using ${openAiModel}` : `Demo mode (default ${openAiModel})`,
    ),
    check(
      "env-supabase-url",
      "NEXT_PUBLIC_SUPABASE_URL",
      supabaseUrl ? "pass" : "fail",
      supabaseUrl ? "Configured." : "Missing.",
      supabaseUrl ? undefined : "Set NEXT_PUBLIC_SUPABASE_URL from your Supabase project settings.",
    ),
    check(
      "env-supabase-anon",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      anonKey ? "pass" : "fail",
      anonKey ? "Configured." : "Missing.",
      anonKey ? undefined : "Set NEXT_PUBLIC_SUPABASE_ANON_KEY for client and server reads.",
    ),
    check(
      "env-supabase-service",
      "SUPABASE_SERVICE_ROLE_KEY",
      serviceKey ? "pass" : "warn",
      serviceKey
        ? "Configured — server can bypass RLS for CRM credentials."
        : "Not set — using anon key for server client.",
      serviceKey
        ? undefined
        : "Add SUPABASE_SERVICE_ROLE_KEY for secure CRM credential storage and admin writes.",
    ),
    check(
      "env-site-url",
      "NEXT_PUBLIC_SITE_URL",
      siteUrl ? "pass" : "warn",
      siteUrl ? siteUrl : "Not set — falling back to http://localhost:3000",
      siteUrl
        ? undefined
        : "Set NEXT_PUBLIC_SITE_URL to your production domain for published campaign URLs.",
    ),
  ];
}

async function tableReachable(table: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase client unavailable." };

  const { error } = await supabase.from(table).select("id").limit(1);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

async function columnReachable(
  column: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase client unavailable." };

  const { error } = await supabase
    .from("content_engine_packages")
    .select(column)
    .limit(0);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function runDatabaseChecks(): Promise<QaCheckResult[]> {
  if (!isSupabaseConfigured()) {
    return [
      check(
        "db-supabase",
        "Supabase connection",
        "skip",
        "Supabase env vars not configured.",
        "Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then re-run checks.",
      ),
    ];
  }

  const results: QaCheckResult[] = [];
  const seenColumns = new Set<string>();

  for (const migration of CONTENT_ENGINE_MIGRATIONS) {
    if (migration.version === "009") {
      results.push(
        check(
          "migration-009",
          migration.label,
          "skip",
          "No migration file — slot reserved in QA sequence.",
        ),
      );
      continue;
    }

    if (migration.version === "012") {
      const { result: tables, durationMs } = await timed(async () => {
        const pages = await tableReachable("content_engine_published_pages");
        const leads = await tableReachable("content_engine_campaign_leads");
        return { pages, leads };
      });
      const ok = tables.pages.ok && tables.leads.ok;
      results.push(
        check(
          `migration-${migration.version}`,
          migration.label,
          ok ? "pass" : "fail",
          ok
            ? "Published pages and campaign leads tables reachable."
            : [tables.pages.error, tables.leads.error].filter(Boolean).join(" · "),
          ok
            ? undefined
            : "Apply supabase/migrations/012_content_engine_public_pages.sql",
          durationMs,
        ),
      );
      continue;
    }

    if (migration.table === "content_engine_packages" && !migration.column) {
      const { result, durationMs } = await timed(() =>
        tableReachable("content_engine_packages"),
      );
      results.push(
        check(
          `migration-${migration.version}`,
          migration.label,
          result.ok ? "pass" : "fail",
          result.ok ? "Table reachable." : result.error,
          result.ok ? undefined : "Apply supabase/migrations/002_content_engine_packages.sql",
          durationMs,
        ),
      );
      continue;
    }

    if (migration.column) {
      if (seenColumns.has(migration.column)) {
        results.push(
          check(
            `migration-${migration.version}`,
            migration.label,
            "pass",
            `Column ${migration.column} already verified.`,
          ),
        );
        continue;
      }
      seenColumns.add(migration.column);
      const { result, durationMs } = await timed(() =>
        columnReachable(migration.column!),
      );
      results.push(
        check(
          `migration-${migration.version}`,
          migration.label,
          result.ok ? "pass" : "fail",
          result.ok ? `Column ${migration.column} exists.` : result.error,
          result.ok
            ? undefined
            : `Run the migration that adds ${migration.column} on content_engine_packages.`,
          durationMs,
        ),
      );
    }
  }

  const { result: credsTable, durationMs: credsMs } = await timed(() =>
    tableReachable("content_engine_crm_credentials"),
  );
  results.push(
    check(
      "db-crm-credentials",
      "CRM credentials table (010)",
      credsTable.ok ? "pass" : "fail",
      credsTable.ok ? "Table reachable." : credsTable.error,
      credsTable.ok
        ? undefined
        : "Apply supabase/migrations/010_content_engine_crm_integrations.sql",
      credsMs,
    ),
  );

  const missingCols: string[] = [];
  for (const col of REQUIRED_PACKAGE_COLUMNS) {
    const { result } = await timed(() => columnReachable(col));
    if (!result.ok) missingCols.push(col);
  }
  results.push(
    check(
      "db-package-columns",
      "Required package columns",
      missingCols.length === 0 ? "pass" : "fail",
      missingCols.length === 0
        ? `All ${REQUIRED_PACKAGE_COLUMNS.length} columns present.`
        : `Missing: ${missingCols.join(", ")}`,
      missingCols.length === 0
        ? undefined
        : "Apply pending content engine migrations 002–013 in order.",
    ),
  );

  return results;
}

export async function runFeatureHealthChecks(): Promise<QaCheckResult[]> {
  const checks: QaCheckResult[] = [];

  try {
    const { result, durationMs } = await timed(() =>
      generateDemoPackage(QA_TEST_INPUT),
    );
    const ok = OUTPUT_TAB_KEYS.every((k) => result[k]?.trim());
    checks.push(
      check(
        "feat-content",
        "Content generation",
        ok ? "pass" : "fail",
        ok ? "Demo content pack produced all channels." : "Incomplete output tabs.",
        ok ? undefined : "Inspect generate-fallback.ts and OUTPUT_TAB_KEYS.",
        durationMs,
      ),
    );
  } catch (err) {
    checks.push(
      check(
        "feat-content",
        "Content generation",
        "fail",
        err instanceof Error ? err.message : "Unknown error",
        "Check demo generator and types.",
      ),
    );
  }

  try {
    const outputs = generateDemoPackage(QA_TEST_INPUT);
    const { result, durationMs } = await timed(() =>
      generateDemoLandingPage({
        intent: "buyer-lead",
        sourceInput: QA_TEST_INPUT,
        topic: "QA test",
        title: "QA Landing",
      }),
    );
    checks.push(
      check(
        "feat-landing",
        "Landing page generation",
        result.sections.heroHeadline ? "pass" : "fail",
        result.sections.heroHeadline
          ? "Landing sections generated."
          : "Missing hero headline.",
        undefined,
        durationMs,
      ),
    );
  } catch (err) {
    checks.push(
      check(
        "feat-landing",
        "Landing page generation",
        "fail",
        err instanceof Error ? err.message : "Unknown error",
      ),
    );
  }

  try {
    const { result, durationMs } = await timed(() =>
      generateDemoCalendar({
        sourceInput: QA_TEST_INPUT,
        topic: "QA calendar",
        title: "QA Week",
        brandVoiceId: "chris-butler-loan-playbook",
      }),
    );
    checks.push(
      check(
        "feat-calendar",
        "Calendar generation",
        result.days.length === 7 ? "pass" : "fail",
        `${result.days.length} day(s) generated.`,
        result.days.length === 7 ? undefined : "Calendar should produce 7 days.",
        durationMs,
      ),
    );
  } catch (err) {
    checks.push(
      check(
        "feat-calendar",
        "Calendar generation",
        "fail",
        err instanceof Error ? err.message : "Unknown error",
      ),
    );
  }

  try {
    const { result, durationMs } = await timed(() =>
      generateDemoLeadMagnet({
        type: "buyer-guide",
        sourceInput: QA_TEST_INPUT,
        topic: "QA magnet",
        title: "QA Magnet",
        brandVoiceId: "chris-butler-loan-playbook",
      }),
    );
    checks.push(
      check(
        "feat-lead-magnet",
        "Lead magnet generation",
        result.sections.coverTitle ? "pass" : "fail",
        "Lead magnet sections generated.",
        undefined,
        durationMs,
      ),
    );
  } catch (err) {
    checks.push(
      check(
        "feat-lead-magnet",
        "Lead magnet generation",
        "fail",
        err instanceof Error ? err.message : "Unknown error",
      ),
    );
  }

  try {
    const outputs = generateDemoPackage(QA_TEST_INPUT);
    const { result, durationMs } = await timed(() =>
      buildLaunchHubFromPackage({
        title: "QA Launch",
        topic: "QA",
        audience: "buyer",
        brandVoiceId: "chris-butler-loan-playbook",
        generationMode: "single",
        hasContentOutputs: true,
        outputs,
      }),
    );
    checks.push(
      check(
        "feat-launch-hub",
        "Launch hub",
        result.fields.campaignName ? "pass" : "fail",
        "Launch hub record built from package context.",
        undefined,
        durationMs,
      ),
    );
  } catch (err) {
    checks.push(
      check(
        "feat-launch-hub",
        "Launch hub",
        "fail",
        err instanceof Error ? err.message : "Unknown error",
      ),
    );
  }

  try {
    const landing = generateDemoLandingPage({
      intent: "buyer-lead",
      sourceInput: QA_TEST_INPUT,
      topic: "QA",
      title: "QA",
    });
    const { result, durationMs } = await timed(() =>
      generateDemoLeadCapture({
        preset: "buyer-lead",
        sourceInput: QA_TEST_INPUT,
        topic: "QA",
        title: "QA Capture",
        brandVoiceId: "chris-butler-loan-playbook",
        landingPage: landing,
      }),
    );
    checks.push(
      check(
        "feat-lead-capture",
        "Lead capture",
        result.consent.smsCallConsentCopy ? "pass" : "fail",
        "Lead capture preset with consent copy.",
        undefined,
        durationMs,
      ),
    );
  } catch (err) {
    checks.push(
      check(
        "feat-lead-capture",
        "Lead capture",
        "fail",
        err instanceof Error ? err.message : "Unknown error",
      ),
    );
  }

  try {
    const integration = createDefaultCrmIntegration();
    const lead = buildTestLeadPayload();
    const { result, durationMs } = await timed(() =>
      pushLeadToCrm({
        packageId: randomUUID(),
        provider: integration.activeProvider,
        integration,
        lead,
        testMode: true,
      }),
    );
    checks.push(
      check(
        "feat-crm-test",
        "CRM test lead",
        result.success ? "pass" : "warn",
        result.message,
        result.success ? undefined : "CRM push returned failure in demo/test mode.",
        durationMs,
      ),
    );
  } catch (err) {
    checks.push(
      check(
        "feat-crm-test",
        "CRM test lead",
        "fail",
        err instanceof Error ? err.message : "Unknown error",
      ),
    );
  }

  try {
    const analytics = createDefaultAnalytics();
    const { result, durationMs } = await timed(() =>
      generateDemoAnalyticsRecommend({
        title: "QA",
        topic: "QA",
        analytics,
        hasLandingPage: true,
        hasLeadCapture: true,
      }),
    );
    checks.push(
      check(
        "feat-analytics",
        "Analytics recommendation",
        result.nextRecommendedAction ? "pass" : "fail",
        "Insights generated.",
        undefined,
        durationMs,
      ),
    );
  } catch (err) {
    checks.push(
      check(
        "feat-analytics",
        "Analytics recommendation",
        "fail",
        err instanceof Error ? err.message : "Unknown error",
      ),
    );
  }

  if (!isSupabaseConfigured()) {
    checks.push(
      check(
        "feat-preview",
        "Public page preview",
        "skip",
        "Requires Supabase to load package preview draft.",
        "Configure Supabase to test /campaigns/preview/[packageId].",
      ),
    );
  } else {
    const supabase = createContentEngineSupabaseClient();
    const { data } = await supabase!
      .from("content_engine_packages")
      .select("id")
      .limit(1)
      .maybeSingle();
    if (data?.id) {
      const { result, durationMs } = await timed(() =>
        getPackagePreviewDraft(data.id as string),
      );
      checks.push(
        check(
          "feat-preview",
          "Public page preview",
          result ? "pass" : "warn",
          result
            ? "Preview draft loader works for an existing package."
            : "Package found but no landing_page_json for preview.",
          result ? undefined : "Generate a landing page on a saved package first.",
          durationMs,
        ),
      );
    } else {
      checks.push(
        check(
          "feat-preview",
          "Public page preview",
          "warn",
          "No packages in DB — preview route not exercised.",
          "Save a package with a landing page, or run the full funnel test.",
        ),
      );
    }
  }

  try {
    const outputs = generateDemoPackage(QA_TEST_INPUT);
    const landing = generateDemoLandingPage({
      intent: "buyer-lead",
      sourceInput: QA_TEST_INPUT,
      topic: "QA",
      title: "QA",
    });
    const leadCapture = generateDemoLeadCapture({
      preset: "buyer-lead",
      sourceInput: QA_TEST_INPUT,
      topic: "QA",
      title: "QA",
      brandVoiceId: "chris-butler-loan-playbook",
      landingPage: landing,
    });
    const { result, durationMs } = await timed(() =>
      generateDemoComplianceScan({
        title: "QA Compliance",
        topic: "QA",
        generationMode: "single",
        outputs,
        landingPage: landing,
        leadCapture,
      }),
    );
    checks.push(
      check(
        "feat-compliance",
        "Compliance scan",
        result.riskScore ? "pass" : "fail",
        `Risk score: ${result.riskScore}, ${result.issues.length} issue(s).`,
        undefined,
        durationMs,
      ),
    );
  } catch (err) {
    checks.push(
      check(
        "feat-compliance",
        "Compliance scan",
        "fail",
        err instanceof Error ? err.message : "Unknown error",
      ),
    );
  }

  return checks;
}

export async function runQaHealthReport(): Promise<QaHealthReport> {
  const environment = runEnvironmentChecks();
  const database = await runDatabaseChecks();
  const features = await runFeatureHealthChecks();
  const all = [...environment, ...database, ...features];

  return {
    generatedAt: new Date().toISOString(),
    environment,
    database,
    features,
    summary: summarize(all),
  };
}
