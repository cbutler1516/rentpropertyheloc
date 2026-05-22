import { readFile } from "fs/promises";
import path from "path";
import { getCrmIntegrationStatus, isCrmPushConfigured } from "../crm/env";
import { SEO_LANDING_SLUGS } from "../seo-landing-content";
import {
  getSiteUrl,
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "../supabase/env";
import { createServerSupabaseClient } from "../supabase/server";
import { getPublicSitemapPaths, SITEMAP_BASE_URL } from "@/app/lib/sitemap-inventory";
import { isAdminPasswordConfigured } from "./auth";
import type {
  LaunchCheckResult,
  LaunchCheckStatus,
  LaunchEnvVar,
  LaunchMigrationCheck,
  LaunchReadinessReport,
} from "./launch-types";

const DEAL_ANALYZER_MIGRATIONS: {
  version: string;
  file: string;
  label: string;
  probe: () => Promise<{ ok: boolean; error?: string }>;
}[] = [
  {
    version: "001",
    file: "001_deal_analyzer.sql",
    label: "Core leads, scenarios, reports",
    probe: async () => tableReachable("deal_analyzer_leads"),
  },
  {
    version: "002",
    file: "002_deal_analyzer_consent.sql",
    label: "Consent fields on leads",
    probe: async () => columnReachable("deal_analyzer_leads", "sms_call_consent"),
  },
  {
    version: "003",
    file: "003_deal_analyzer_followups.sql",
    label: "Follow-ups + lead workflow",
    probe: async () => {
      const followups = await tableReachable("deal_analyzer_followups");
      if (!followups.ok) return followups;
      return columnReachable("deal_analyzer_leads", "lead_status");
    },
  },
  {
    version: "004",
    file: "004_deal_analyzer_agents.sql",
    label: "Partner agents + attribution",
    probe: async () => {
      const agents = await tableReachable("deal_analyzer_agents");
      if (!agents.ok) return agents;
      return columnReachable("deal_analyzer_leads", "agent_id");
    },
  },
  {
    version: "005",
    file: "005_deal_analyzer_agent_branding.sql",
    label: "Agent co-branding fields",
    probe: async () => columnReachable("deal_analyzer_agents", "headshot_url"),
  },
  {
    version: "006",
    file: "006_deal_analyzer_crm_push.sql",
    label: "CRM push columns on reports",
    probe: async () => columnReachable("deal_analyzer_reports", "crm_push_status"),
  },
  {
    version: "007",
    file: "007_deal_analyzer_events.sql",
    label: "Analytics events table",
    probe: async () => tableReachable("deal_analyzer_events"),
  },
];

function check(
  id: string,
  label: string,
  status: LaunchCheckStatus,
  message?: string,
  fix?: string,
): LaunchCheckResult {
  return { id, label, status, message, fix };
}

function summarize(checks: LaunchCheckResult[]) {
  return checks.reduce(
    (acc, c) => {
      acc[c.status] += 1;
      return acc;
    },
    { pass: 0, warn: 0, fail: 0, skip: 0, manual: 0 },
  );
}

async function tableReachable(
  table: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase client unavailable." };

  const { error } = await supabase.from(table).select("id").limit(1);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

async function columnReachable(
  table: string,
  column: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { ok: false, error: "Supabase client unavailable." };

  const { error } = await supabase.from(table).select(column).limit(0);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

function buildEnvVars(): {
  required: LaunchEnvVar[];
  optional: LaunchEnvVar[];
} {
  const required: LaunchEnvVar[] = [
    {
      name: "ADMIN_DEAL_ANALYZER_PASSWORD",
      required: true,
      configured: isAdminPasswordConfigured(),
      hint: "Protects /admin/deal-analyzer routes.",
    },
    {
      name: "NEXT_PUBLIC_SUPABASE_URL",
      required: true,
      configured: Boolean(getSupabaseUrl()?.trim()),
    },
    {
      name: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      required: true,
      configured: Boolean(getSupabaseAnonKey()?.trim()),
    },
  ];

  const optional: LaunchEnvVar[] = [
    {
      name: "SUPABASE_SERVICE_ROLE_KEY",
      required: false,
      configured: Boolean(getSupabaseServiceRoleKey()?.trim()),
      hint: "Recommended for reliable server writes and events.",
    },
    {
      name: "NEXT_PUBLIC_SITE_URL",
      required: false,
      configured: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()),
      hint: "Production canonical URL for reports and sitemap.",
    },
    {
      name: "OPENAI_API_KEY",
      required: false,
      configured: Boolean(process.env.OPENAI_API_KEY?.trim()),
      hint: "AI narratives; static fallback if unset.",
    },
    {
      name: "OPENAI_MODEL",
      required: false,
      configured: Boolean(process.env.OPENAI_MODEL?.trim()),
      hint: "Defaults to gpt-4o-mini.",
    },
    {
      name: "GHL_WEBHOOK_URL",
      required: false,
      configured: Boolean(process.env.GHL_WEBHOOK_URL?.trim()),
    },
    {
      name: "ZAPIER_WEBHOOK_URL",
      required: false,
      configured: Boolean(process.env.ZAPIER_WEBHOOK_URL?.trim()),
    },
    {
      name: "CRM_PUSH_SECRET",
      required: false,
      configured: Boolean(process.env.CRM_PUSH_SECRET?.trim()),
    },
    {
      name: "CRM_AUTO_PUSH",
      required: false,
      configured: Boolean(process.env.CRM_AUTO_PUSH?.trim()),
      hint: "true enables push after each new report.",
    },
  ];

  return { required, optional };
}

async function runMigrationChecks(): Promise<LaunchMigrationCheck[]> {
  if (!isSupabaseConfigured()) {
    return DEAL_ANALYZER_MIGRATIONS.map((m) => ({
      version: m.version,
      file: m.file,
      label: m.label,
      status: "skip" as const,
      message: "Configure Supabase env vars first.",
    }));
  }

  const results: LaunchMigrationCheck[] = [];
  for (const migration of DEAL_ANALYZER_MIGRATIONS) {
    const probe = await migration.probe();
    results.push({
      version: migration.version,
      file: migration.file,
      label: migration.label,
      status: probe.ok ? "pass" : "fail",
      message: probe.ok
        ? "Schema reachable."
        : (probe.error ?? "Migration may not be applied."),
    });
  }
  return results;
}

async function runRobotsCheck(siteUrl: string): Promise<LaunchCheckResult> {
  try {
    const robotsPath = path.join(process.cwd(), "app", "robots.ts");
    const source = await readFile(robotsPath, "utf8");
    const hasSitemap = source.includes("sitemap:");
    const expectedHost = siteUrl.replace(/\/$/, "");
    const mentionsProduction = source.includes(SITEMAP_BASE_URL);

    if (!hasSitemap) {
      return check(
        "robots-txt",
        "Robots.txt sitemap",
        "fail",
        "app/robots.ts has no sitemap entry.",
        "Add sitemap URL to robots.ts.",
      );
    }

    return check(
      "robots-txt",
      "Robots.txt sitemap",
      mentionsProduction || expectedHost.includes("localhost")
        ? "pass"
        : "warn",
      mentionsProduction
        ? `Sitemap points to ${SITEMAP_BASE_URL}.`
        : `Sitemap host may not match NEXT_PUBLIC_SITE_URL (${expectedHost}).`,
      mentionsProduction
        ? undefined
        : "Align robots sitemap URL with production domain.",
    );
  } catch {
    return check(
      "robots-txt",
      "Robots.txt",
      "warn",
      "Could not read app/robots.ts.",
    );
  }
}

function runSitemapChecks(): LaunchCheckResult[] {
  const paths = getPublicSitemapPaths();
  const required = [
    "/deal-analyzer",
    "/deal-analyzer/analyze",
    ...SEO_LANDING_SLUGS.map((s) => `/deal-analyzer/${s}`),
  ];
  const missing = required.filter((p) => !paths.includes(p));

  return [
    check(
      "sitemap-deal-analyzer",
      "Sitemap includes Deal Analyzer routes",
      missing.length === 0 ? "pass" : "fail",
      missing.length === 0
        ? `${required.length} core paths present.`
        : `Missing: ${missing.join(", ")}`,
      missing.length === 0
        ? undefined
        : "Update app/lib/sitemap-inventory.ts.",
    ),
    check(
      "sitemap-count",
      "Sitemap inventory size",
      "pass",
      `${paths.length} public paths in inventory.`,
    ),
  ];
}

async function fetchSamplePartnerSlug(): Promise<string | null> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("deal_analyzer_agents")
    .select("slug")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  return data?.slug ?? null;
}

export async function runDealAnalyzerLaunchReadiness(): Promise<LaunchReadinessReport> {
  const siteUrl = getSiteUrl();
  const env = buildEnvVars();
  const crm = getCrmIntegrationStatus();
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const openAiModel = process.env.OPENAI_MODEL?.trim() ?? "gpt-4o-mini (default)";

  const checks: LaunchCheckResult[] = [];

  for (const v of env.required) {
    checks.push(
      check(
        `env-${v.name}`,
        v.name,
        v.configured ? "pass" : "fail",
        v.configured ? "Configured." : "Missing.",
        v.configured ? undefined : v.hint ?? "Set in production environment.",
      ),
    );
  }

  for (const v of env.optional) {
    if (v.name === "OPENAI_MODEL") continue;
    checks.push(
      check(
        `env-${v.name}`,
        v.name,
        v.configured ? "pass" : "warn",
        v.configured ? "Configured." : "Not set.",
        v.configured ? undefined : v.hint,
      ),
    );
  }

  checks.push(
    check(
      "env-openai",
      "OpenAI narratives",
      openAiKey ? "pass" : "warn",
      openAiKey
        ? `Live AI enabled (${openAiModel}).`
        : "Using static narrative fallback only.",
      openAiKey ? undefined : "Add OPENAI_API_KEY for production-quality copy.",
    ),
  );

  checks.push(
    check(
      "crm-webhooks",
      "CRM webhooks",
      isCrmPushConfigured() ? "pass" : "warn",
      isCrmPushConfigured()
        ? `GHL: ${crm.ghlConfigured ? "yes" : "no"} · Zapier: ${crm.zapierConfigured ? "yes" : "no"}`
        : "No GHL or Zapier webhook URL configured.",
      isCrmPushConfigured()
        ? undefined
        : "Set GHL_WEBHOOK_URL and/or ZAPIER_WEBHOOK_URL for CRM push.",
    ),
    check(
      "crm-auto-push",
      "CRM auto-push",
      crm.autoPushEnabled ? "warn" : "pass",
      crm.autoPushEnabled
        ? "CRM_AUTO_PUSH is enabled — every new report triggers a webhook."
        : "Manual push from admin only (recommended until webhooks are verified).",
    ),
  );

  if (isSupabaseConfigured()) {
    const supabase = createServerSupabaseClient();
    const { count, error } = await supabase!
      .from("deal_analyzer_reports")
      .select("*", { count: "exact", head: true });

    checks.push(
      check(
        "supabase-reports",
        "Supabase reports table",
        error ? "fail" : "pass",
        error
          ? error.message
          : `${count ?? 0} report(s) stored.`,
        error ? "Verify migrations and service role." : undefined,
      ),
    );

    const events = await tableReachable("deal_analyzer_events");
    checks.push(
      check(
        "event-tracking-db",
        "Event tracking storage",
        events.ok ? "pass" : "warn",
        events.ok
          ? "deal_analyzer_events table reachable."
          : (events.error ?? "Run migration 007."),
        events.ok ? undefined : "Apply 007_deal_analyzer_events.sql.",
      ),
    );
  } else {
    checks.push(
      check(
        "supabase-config",
        "Supabase",
        "fail",
        "Not configured — reports save to browser localStorage only.",
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      ),
    );
  }

  checks.push(...runSitemapChecks());
  checks.push(await runRobotsCheck(siteUrl));

  checks.push(
    check(
      "test-report-sharing",
      "Report sharing test",
      "manual",
      "Open a saved report → Copy link + Copy client message. Confirm URL loads in incognito.",
    ),
    check(
      "test-pdf-print",
      "PDF / print test",
      "manual",
      "Download PDF → Save as PDF. Confirm charts, co-brand header, and disclaimer print cleanly.",
    ),
    check(
      "test-event-tracking",
      "Event tracking test",
      "manual",
      "Walk funnel (SEO → analyze → lead → report). Confirm events in admin analytics.",
    ),
  );

  const migrations = await runMigrationChecks();
  const samplePartnerSlug = await fetchSamplePartnerSlug();

  const allChecks = [...checks];
  const summary = summarize(allChecks);

  return {
    generatedAt: new Date().toISOString(),
    siteUrl,
    samplePartnerSlug,
    env,
    checks: allChecks,
    migrations,
    summary,
  };
}
