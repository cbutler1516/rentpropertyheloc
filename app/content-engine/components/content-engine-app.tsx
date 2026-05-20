"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  DEFAULT_BRAND_VOICE_ID,
  type BrandVoiceId,
} from "../lib/brand-voices";
import { CAMPAIGN_TABS } from "../lib/campaign-tabs";
import {
  inferAudience,
  inferTags,
  inferTone,
  inferTopic,
  packageTitleFromInput,
} from "../lib/metadata";
import {
  fetchPackages,
  isRemoteStorageAvailable,
  removePackage,
  savePackage,
} from "../lib/packages-client";
import { OUTPUT_TABS } from "../lib/tabs";
import {
  CAMPAIGN_OUTPUT_TAB_KEYS,
  OUTPUT_TAB_KEYS,
  type CampaignOutputTabKey,
  type CampaignOutputs,
  type ContentAudience,
  type ContentOutputs,
  type ContentPackage,
  type GenerationMode,
  type ContentCalendarRecord,
  type LandingPageRecord,
  type LandingPageSectionKey,
  type OutputTabKey,
  type PackageFilters,
} from "../lib/types";
import { calendarToMarkdown } from "../lib/calendar-export";
import { BrandVoiceSelector } from "./brand-voice-selector";
import { CalendarGeneratorCard } from "./calendar-generator-card";
import { CalendarOutputsPanel } from "./calendar-outputs-panel";
import { CampaignOutputsPanel } from "./campaign-outputs-panel";
import { CopyButton } from "./copy-button";
import { ContentEngineShell } from "./content-engine-shell";
import { ExportActions } from "./export-actions";
import { GenerationModeToggle } from "./generation-mode-toggle";
import { LandingPageGeneratorCard } from "./landing-page-generator-card";
import { LandingPageOutputsPanel } from "./landing-page-outputs-panel";
import { OutputViewTabs, type OutputView } from "./output-view-tabs";
import { PackageHistoryPanel } from "./package-history-panel";
import { PackageMetadataForm } from "./package-metadata-form";
import {
  type LandingPageIntent,
} from "../lib/landing-page-intents";
import { landingPageToMarkdown } from "../lib/landing-page-export";

const SINGLE_PLACEHOLDER = `Paste a market update, video transcript, Fed commentary, borrower scenario, or rough idea…

Example: "Fed held steady but dot plot shifted. Buyers in Seattle are asking whether to wait for spring inventory."`;

const CAMPAIGN_PLACEHOLDER = `Enter one campaign topic — the app builds your 7-day content plan.

Example: "Spring inventory crunch for Puget Sound buyers"`;

const SAMPLE_SINGLE = `Fed held rates steady but signaled fewer cuts in 2026. Puget Sound buyers are asking whether to wait for spring inventory or lock a buy-before-sell plan now. Agents want forwardable talking points that don't sound like rate spam.`;

const SAMPLE_CAMPAIGN = `Spring inventory crunch for Puget Sound buyers — how to win offers without rate bait`;

const DEFAULT_FILTERS: PackageFilters = {
  search: "",
  audience: "all",
  topic: "all",
  datePreset: "all",
};

function emptySingleOutputs(): ContentOutputs {
  return OUTPUT_TAB_KEYS.reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as ContentOutputs);
}

function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function parseTagsInput(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function buildExportPackage(draft: {
  id: string | null;
  title: string;
  sourceInput: string;
  audience: ContentAudience;
  tone: string;
  topic: string;
  modelUsed: string;
  brandVoiceId: BrandVoiceId;
  generationMode: GenerationMode;
  tagsInput: string;
  outputs: ContentOutputs;
  campaignOutputs?: CampaignOutputs;
  landingPage?: LandingPageRecord;
  calendar?: ContentCalendarRecord;
}): ContentPackage {
  return {
    id: draft.id ?? "draft",
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
    tags: parseTagsInput(draft.tagsInput),
  };
}

function inferLandingIntent(
  audience: ContentAudience,
  topic: string,
): LandingPageIntent {
  const lower = topic.toLowerCase();
  if (lower.includes("concession") || lower.includes("buydown"))
    return "seller-concession-strategy";
  if (lower.includes("fed") || lower.includes("rate") || lower.includes("market"))
    return "rate-market-alert";
  if (lower.includes("jumbo") || lower.includes("luxury")) return "jumbo-luxury";
  if (lower.includes("refinanc") || lower.includes("heloc")) return "refinance-lead";
  if (lower.includes("investor") || lower.includes("dscr")) return "commercial-borrower";
  if (audience === "agent") return "agent-referral";
  if (audience === "commercial") return "commercial-borrower";
  if (audience === "homeowner") return "refinance-lead";
  if (audience === "buyer") return "buyer-lead";
  return "first-time-buyer";
}

export function ContentEngineApp() {
  const [input, setInput] = useState("");
  const [generationMode, setGenerationMode] = useState<GenerationMode>("single");
  const [brandVoiceId, setBrandVoiceId] =
    useState<BrandVoiceId>(DEFAULT_BRAND_VOICE_ID);
  const [outputs, setOutputs] = useState<ContentOutputs | null>(null);
  const [campaignOutputs, setCampaignOutputs] = useState<CampaignOutputs | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<OutputTabKey>("tiktokHooks");
  const [campaignActiveTab, setCampaignActiveTab] =
    useState<CampaignOutputTabKey>("shortFormVideoIdeas");
  const [packages, setPackages] = useState<ContentPackage[]>([]);
  const [storageSource, setStorageSource] = useState<"supabase" | "local">(
    "local",
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<"ai" | "demo" | null>(null);
  const [modelUsed, setModelUsed] = useState("demo");
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState<ContentAudience>("general");
  const [tone, setTone] = useState("strategic");
  const [topic, setTopic] = useState("Mortgage strategy");
  const [tagsInput, setTagsInput] = useState("");
  const [activePackageId, setActivePackageId] = useState<string | null>(null);
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [sidebarView, setSidebarView] = useState<"studio" | "history">("studio");
  const [filters, setFilters] = useState<PackageFilters>(DEFAULT_FILTERS);
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false);
  const [landingPage, setLandingPage] = useState<LandingPageRecord | null>(null);
  const [landingIntent, setLandingIntent] = useState<LandingPageIntent>("buyer-lead");
  const [landingActiveSection, setLandingActiveSection] =
    useState<LandingPageSectionKey>("heroHeadline");
  const [outputView, setOutputView] = useState<OutputView>("content");
  const [landingLoading, setLandingLoading] = useState(false);
  const [calendar, setCalendar] = useState<ContentCalendarRecord | null>(null);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [regeneratingDayIndex, setRegeneratingDayIndex] = useState<number | null>(
    null,
  );

  const minInputLength = generationMode === "campaign" ? 8 : 24;
  const hasResults =
    generationMode === "campaign" ? Boolean(campaignOutputs) : Boolean(outputs);

  const refreshPackages = useCallback(async () => {
    const result = await fetchPackages();
    setPackages(result.packages);
    setStorageSource(result.source);
  }, []);

  useEffect(() => {
    void refreshPackages();
  }, [refreshPackages]);

  const activeOutput =
    generationMode === "campaign"
      ? (campaignOutputs?.[campaignActiveTab] ?? "")
      : (outputs?.[activeTab] ?? "");
  const activeTabConfig = OUTPUT_TABS.find((tab) => tab.key === activeTab);

  const exportPackage = useMemo(() => {
    if (!hasResults) return null;
    return buildExportPackage({
      id: activePackageId,
      title: title || packageTitleFromInput(input),
      sourceInput: input,
      audience,
      tone,
      topic,
      modelUsed,
      brandVoiceId,
      generationMode,
      tagsInput,
      outputs: outputs ?? emptySingleOutputs(),
      campaignOutputs: campaignOutputs ?? undefined,
      landingPage: landingPage ?? undefined,
    });
  }, [
    activePackageId,
    audience,
    brandVoiceId,
    campaignOutputs,
    generationMode,
    hasResults,
    input,
    calendar,
    landingPage,
    modelUsed,
    outputs,
    tagsInput,
    title,
    tone,
    topic,
  ]);

  const stats = useMemo(
    () => ({
      words: countWords(input),
      packages: packages.length,
      channels:
        generationMode === "campaign"
          ? campaignOutputs
            ? CAMPAIGN_OUTPUT_TAB_KEYS.length
            : 0
          : outputs
            ? OUTPUT_TAB_KEYS.length
            : 0,
    }),
    [campaignOutputs, generationMode, input, outputs, packages.length],
  );

  const clearResults = useCallback(() => {
    setOutputs(null);
    setCampaignOutputs(null);
    setLandingPage(null);
    setCalendar(null);
    setOutputView("content");
    setMode(null);
    setIsUnsaved(false);
  }, []);

  const handleModeChange = useCallback(
    (next: GenerationMode) => {
      setGenerationMode(next);
      clearResults();
      setError(null);
      setSaveMessage(null);
      setActivePackageId(null);
    },
    [clearResults],
  );

  const applyInferredMetadata = useCallback(
    (source: string, nextMode: "ai" | "demo", nextModel: string) => {
      const nextAudience = inferAudience(source);
      const nextTopic =
        generationMode === "campaign" ? source : inferTopic(source);
      const nextTone = inferTone(source);
      setAudience(nextAudience);
      setTopic(nextTopic);
      setTone(nextTone);
      setTagsInput(inferTags(source, nextTopic, nextAudience).join(", "));
      setLandingIntent(inferLandingIntent(nextAudience, nextTopic));
      setTitle(
        generationMode === "campaign"
          ? `Campaign: ${source.slice(0, 48)}${source.length > 48 ? "…" : ""}`
          : packageTitleFromInput(source),
      );
      setMode(nextMode);
      setModelUsed(nextModel);
    },
    [generationMode],
  );

  const handleGenerate = useCallback(
    async (overrideInput?: string) => {
      const source = (overrideInput ?? input).trim();
      if (source.length < minInputLength) return;

      setError(null);
      setSaveMessage(null);
      setLoading(true);
      try {
        const response = await fetch("/api/content-engine/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: source,
            mode: generationMode,
            brandVoiceId,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error ?? "Generation failed.");
        }

        if (overrideInput) setInput(overrideInput);

        if (data.generationMode === "campaign" || generationMode === "campaign") {
          setCampaignOutputs(data.campaignOutputs as CampaignOutputs);
          setOutputs(null);
          setCampaignActiveTab("shortFormVideoIdeas");
        } else {
          setOutputs(data.outputs as ContentOutputs);
          setCampaignOutputs(null);
          setActiveTab("tiktokHooks");
        }

        if (data.brandVoiceId) setBrandVoiceId(data.brandVoiceId);
        applyInferredMetadata(
          source,
          data.mode as "ai" | "demo",
          data.modelUsed ?? (data.mode === "ai" ? "gpt-4o-mini" : "demo"),
        );
        if (data.topic) setTopic(data.topic);
        if (data.audience) setAudience(data.audience);
        if (data.title) setTitle(data.title);

        setActivePackageId(null);
        setIsUnsaved(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [applyInferredMetadata, brandVoiceId, generationMode, input, minInputLength],
  );

  const handleSavePackage = useCallback(async () => {
    if (!hasResults) return;
    setSaving(true);
    setError(null);
    setSaveMessage(null);
    try {
      const result = await savePackage({
        id: activePackageId ?? undefined,
        title: title.trim() || packageTitleFromInput(input),
        sourceInput: input,
        audience,
        tone,
        topic,
        modelUsed,
        brandVoiceId,
        generationMode,
        outputs: outputs ?? emptySingleOutputs(),
        campaignOutputs: campaignOutputs ?? undefined,
        landingPage: landingPage ?? undefined,
        tags: parseTagsInput(tagsInput),
      });
      setActivePackageId(result.package.id);
      setIsUnsaved(false);
      setSaveMessage(
        `Saved to ${result.source === "supabase" ? "Supabase" : "local storage"}.`,
      );
      await refreshPackages();
      setSidebarView("history");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save package.");
    } finally {
      setSaving(false);
    }
  }, [
    activePackageId,
    audience,
    brandVoiceId,
    campaignOutputs,
    generationMode,
    hasResults,
    input,
    modelUsed,
    outputs,
    refreshPackages,
    tagsInput,
    title,
    tone,
    topic,
    calendar,
    landingPage,
  ]);

  const packageContextPayload = useCallback(
    () => ({
      sourceInput: input,
      topic,
      title: title || packageTitleFromInput(input),
      brandVoiceId,
      generationMode,
      audience,
      tone,
      outputs: outputs ?? undefined,
      campaignOutputs: campaignOutputs ?? undefined,
      landingPage: landingPage ?? undefined,
    }),
    [
      audience,
      brandVoiceId,
      campaignOutputs,
      generationMode,
      input,
      landingPage,
      outputs,
      title,
      tone,
      topic,
    ],
  );

  const handleGenerateLandingPage = useCallback(async () => {
    if (!hasResults) return;
    setLandingLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/content-engine/landing-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: landingIntent,
          sourceInput: input,
          topic,
          title: title || packageTitleFromInput(input),
          brandVoiceId,
          generationMode,
          audience,
          tone,
          outputs: outputs ?? undefined,
          campaignOutputs: campaignOutputs ?? undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Landing page generation failed.");
      }
      setLandingPage(data.landingPage as LandingPageRecord);
      setLandingActiveSection("heroHeadline");
      setOutputView("landing");
      setIsUnsaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLandingLoading(false);
    }
  }, [
    audience,
    brandVoiceId,
    campaignOutputs,
    generationMode,
    hasResults,
    input,
    landingIntent,
    outputs,
    title,
    tone,
    topic,
  ]);

  const handleGenerateCalendar = useCallback(async () => {
    if (!hasResults) return;
    setCalendarLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/content-engine/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageContextPayload()),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Calendar generation failed.");
      }
      setCalendar(data.calendar as ContentCalendarRecord);
      setOutputView("calendar");
      setIsUnsaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setCalendarLoading(false);
    }
  }, [hasResults, packageContextPayload]);

  const handleCalendarChange = useCallback((next: ContentCalendarRecord) => {
    setCalendar(next);
    setIsUnsaved(true);
  }, []);

  const handleRegenerateCalendarDay = useCallback(
    async (dayIndex: number) => {
      if (!calendar || !hasResults) return;
      setRegeneratingDayIndex(dayIndex);
      setError(null);
      try {
        const response = await fetch("/api/content-engine/calendar/day", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...packageContextPayload(),
            dayIndex,
            calendar,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error ?? "Day regeneration failed.");
        }
        const day = data.day as ContentCalendarRecord["days"][number];
        setCalendar({
          ...calendar,
          days: calendar.days.map((d) =>
            d.dayIndex === dayIndex ? { ...day, status: d.status } : d,
          ),
        });
        setIsUnsaved(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setRegeneratingDayIndex(null);
      }
    },
    [calendar, hasResults, packageContextPayload],
  );

  const loadPackage = useCallback((pkg: ContentPackage) => {
    setInput(pkg.sourceInput);
    setGenerationMode(pkg.generationMode);
    setBrandVoiceId(pkg.brandVoiceId);
    setOutputs(pkg.generationMode === "single" ? pkg.outputs : null);
    setCampaignOutputs(pkg.campaignOutputs ?? null);
    setLandingPage(pkg.landingPage ?? null);
    setCalendar(pkg.calendar ?? null);
    setLandingIntent(
      pkg.landingPage?.intent ?? inferLandingIntent(pkg.audience, pkg.topic),
    );
    setOutputView(
      pkg.calendar ? "calendar" : pkg.landingPage ? "landing" : "content",
    );
    setTitle(pkg.title);
    setAudience(pkg.audience);
    setTone(pkg.tone);
    setTopic(pkg.topic);
    setTagsInput(pkg.tags.join(", "));
    setModelUsed(pkg.modelUsed);
    setMode(pkg.modelUsed === "demo" ? "demo" : "ai");
    setActivePackageId(pkg.id);
    setIsUnsaved(false);
    setActiveTab("tiktokHooks");
    setCampaignActiveTab("shortFormVideoIdeas");
    setError(null);
    setSaveMessage(null);
    setMobileHistoryOpen(false);
  }, []);

  const handleDuplicate = useCallback(
    (pkg: ContentPackage) => {
      loadPackage(pkg);
      setTitle(`${pkg.title} (copy)`);
      setActivePackageId(null);
      setIsUnsaved(true);
      setSidebarView("studio");
    },
    [loadPackage],
  );

  const handleRegenerate = useCallback(
    async (pkg: ContentPackage) => {
      setGenerationMode(pkg.generationMode);
      setBrandVoiceId(pkg.brandVoiceId);
      setSidebarView("studio");
      setActivePackageId(null);
      setIsUnsaved(true);
      await handleGenerate(pkg.sourceInput);
    },
    [handleGenerate],
  );

  const handleDeletePackage = useCallback(
    async (id: string) => {
      await removePackage(id);
      if (activePackageId === id) {
        setActivePackageId(null);
        setIsUnsaved(false);
      }
      await refreshPackages();
    },
    [activePackageId, refreshPackages],
  );

  const sidebar = (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav className="flex gap-1 border-b border-white/[0.06] px-3 py-3">
        {(
          [
            ["studio", "Studio"],
            ["history", "History"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setSidebarView(key)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 font-mono text-[9px] tracking-[0.16em] uppercase transition-colors",
              sidebarView === key
                ? "bg-[#7c3aed]/20 text-[#e9d5ff]"
                : "text-zinc-500 hover:text-zinc-300",
            )}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        {sidebarView === "studio" ? (
          <div className="space-y-4">
            <Card className="border-[#7c3aed]/20 bg-[#0f1a2e]/80 p-4">
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#c9a227] uppercase">
                Quick start
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Pick a brand voice, choose single pack or campaign mode, then
                generate and save.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={() =>
                  setInput(
                    generationMode === "campaign" ? SAMPLE_CAMPAIGN : SAMPLE_SINGLE,
                  )
                }
              >
                Load sample
              </Button>
            </Card>
            <p className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[11px] text-zinc-400">
              Storage:{" "}
              <span className="text-zinc-200">
                {isRemoteStorageAvailable()
                  ? `Supabase (${storageSource})`
                  : "Local only"}
              </span>
            </p>
          </div>
        ) : (
          <PackageHistoryPanel
            packages={packages}
            filters={filters}
            activePackageId={activePackageId}
            onFiltersChange={setFilters}
            onSelect={loadPackage}
            onDelete={(id) => void handleDeletePackage(id)}
            onDuplicate={handleDuplicate}
            onRegenerate={(pkg) => void handleRegenerate(pkg)}
          />
        )}
      </div>
    </div>
  );

  return (
    <ContentEngineShell sidebar={sidebar}>
      <div className="space-y-6 p-5 lg:p-8">
        <div className="flex flex-wrap items-center gap-3 lg:hidden">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setMobileHistoryOpen((open) => !open)}
          >
            {mobileHistoryOpen ? "Hide panel" : "Studio / history"}
          </Button>
          {mode && (
            <Badge variant={mode === "ai" ? "purple" : "gold"}>{mode}</Badge>
          )}
          {isUnsaved && <Badge variant="warning">Unsaved</Badge>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Source words", value: stats.words },
            { label: "Saved packages", value: stats.packages },
            {
              label: generationMode === "campaign" ? "Campaign assets" : "Channels",
              value: stats.channels,
            },
            {
              label: "Engine",
              value: mode === "ai" ? "Live AI" : mode === "demo" ? "Demo" : "—",
            },
          ].map((stat) => (
            <Card key={stat.label} className="p-4">
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-medium tracking-tight text-white">
                {stat.value}
              </p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <GenerationModeToggle value={generationMode} onChange={handleModeChange} />
          {hasResults && (
            <Badge variant={generationMode === "campaign" ? "gold" : "purple"}>
              {generationMode === "campaign" ? "Campaign ready" : "Pack ready"}
            </Badge>
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>
                {generationMode === "campaign" ? "Campaign topic" : "Source material"}
              </CardTitle>
              <CardDescription>
                {generationMode === "campaign"
                  ? "One topic drives your full week of content."
                  : "Market updates, transcripts, Fed notes, or borrower scenarios."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <BrandVoiceSelector
                value={brandVoiceId}
                onChange={setBrandVoiceId}
              />
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={
                  generationMode === "campaign"
                    ? CAMPAIGN_PLACEHOLDER
                    : SINGLE_PLACEHOLDER
                }
                className="min-h-[220px] flex-1 resize-y font-mono text-[13px] leading-relaxed md:min-h-[300px]"
              />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="gold"
                  size="lg"
                  disabled={loading || input.trim().length < minInputLength}
                  onClick={() => void handleGenerate()}
                >
                  {loading
                    ? "Running playbook…"
                    : generationMode === "campaign"
                      ? "Build campaign"
                      : "Generate content pack"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setInput("");
                    clearResults();
                    setError(null);
                    setSaveMessage(null);
                    setActivePackageId(null);
                  }}
                >
                  Clear
                </Button>
                {mode && (
                  <Badge variant={mode === "ai" ? "purple" : "gold"}>
                    {mode === "ai" ? modelUsed : "Demo"}
                  </Badge>
                )}
              </div>
              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="flex min-h-[480px] flex-col overflow-hidden">
            {generationMode === "campaign" ? (
              <div className="flex flex-1 flex-col overflow-hidden p-6">
                <OutputViewTabs
                  showLanding={Boolean(landingPage)}
                  showCalendar={Boolean(calendar)}
                  activeView={outputView}
                  onViewChange={setOutputView}
                  contentLabel="Campaign"
                />
                {outputView === "landing" && landingPage ? (
                  <LandingPageOutputsPanel
                    landingPage={landingPage}
                    packageTitle={title || packageTitleFromInput(input)}
                    activeSection={landingActiveSection}
                    onSectionChange={setLandingActiveSection}
                  />
                ) : outputView === "calendar" && calendar ? (
                  <CalendarOutputsPanel
                    calendar={calendar}
                    packageTitle={title || packageTitleFromInput(input)}
                    regeneratingDayIndex={regeneratingDayIndex}
                    onCalendarChange={handleCalendarChange}
                    onRegenerateDay={(dayIndex) =>
                      void handleRegenerateCalendarDay(dayIndex)
                    }
                  />
                ) : (
                  <CampaignOutputsPanel
                    outputs={campaignOutputs}
                    activeTab={campaignActiveTab}
                    onTabChange={setCampaignActiveTab}
                  />
                )}
              </div>
            ) : outputView === "landing" && landingPage ? (
              <div className="flex flex-1 flex-col overflow-hidden p-6">
                <OutputViewTabs
                  showLanding
                  activeView={outputView}
                  onViewChange={setOutputView}
                />
                <LandingPageOutputsPanel
                  landingPage={landingPage}
                  packageTitle={title || packageTitleFromInput(input)}
                  activeSection={landingActiveSection}
                  onSectionChange={setLandingActiveSection}
                />
              </div>
            ) : (
              <>
                <CardHeader className="border-b border-white/[0.06] pb-0">
                  <OutputViewTabs
                    showLanding={Boolean(landingPage)}
                    showCalendar={Boolean(calendar)}
                    activeView={outputView}
                    onViewChange={setOutputView}
                  />
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-4">
                    <div>
                      <CardTitle>Content outputs</CardTitle>
                      <CardDescription>
                        {activeTabConfig?.description ??
                          "Generate a pack to unlock all channels."}
                      </CardDescription>
                    </div>
                    {outputs && (
                      <CopyButton text={activeOutput} label="Copy tab" />
                    )}
                  </div>
                  <div
                    className="-mx-2 flex gap-1 overflow-x-auto pb-3"
                    role="tablist"
                  >
                    {OUTPUT_TABS.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        disabled={!outputs}
                        className={cn(
                          "shrink-0 rounded-lg px-3 py-2 font-mono text-[9px] tracking-[0.12em] uppercase transition-all",
                          activeTab === tab.key
                            ? "bg-[#7c3aed]/25 text-[#e9d5ff] ring-1 ring-[#7c3aed]/40"
                            : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300 disabled:opacity-40",
                        )}
                      >
                        <span className="mr-1 opacity-60">{tab.icon}</span>
                        {tab.shortLabel}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
                {!outputs ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c9a227]/30 bg-[#c9a227]/10 font-mono text-lg text-[#e8c547]">
                      LP
                    </div>
                    <p className="max-w-sm text-sm text-zinc-500">
                      Your 12-channel playbook appears here.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-3">
                      <p className="font-mono text-[9px] tracking-[0.2em] text-[#c9a227] uppercase">
                        {activeTabConfig?.label}
                      </p>
                      <CopyButton text={activeOutput} label="Copy" />
                    </div>
                    <pre className="flex-1 overflow-auto whitespace-pre-wrap px-6 py-5 font-sans text-sm leading-relaxed text-zinc-200">
                      {activeOutput}
                    </pre>
                  </div>
                )}
              </CardContent>
              </>
            )}
          </Card>
        </div>

        {hasResults && (
          <>
            <LandingPageGeneratorCard
              intent={landingIntent}
              onIntentChange={setLandingIntent}
              onGenerate={() => void handleGenerateLandingPage()}
              loading={landingLoading}
              hasLandingPage={Boolean(landingPage)}
            />

            <CalendarGeneratorCard
              onGenerate={() => void handleGenerateCalendar()}
              loading={calendarLoading}
              hasCalendar={Boolean(calendar)}
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Package details</CardTitle>
                <CardDescription>
                  Refine metadata before saving. Brand voice:{" "}
                  <span className="text-zinc-300">{brandVoiceId}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <PackageMetadataForm
                  title={title}
                  audience={audience}
                  tone={tone}
                  topic={topic}
                  tagsInput={tagsInput}
                  onTitleChange={setTitle}
                  onAudienceChange={setAudience}
                  onToneChange={setTone}
                  onTopicChange={setTopic}
                  onTagsChange={setTagsInput}
                />
                <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6">
                  <Button
                    type="button"
                    variant="default"
                    size="lg"
                    disabled={saving}
                    onClick={() => void handleSavePackage()}
                  >
                    {saving ? "Saving…" : "Save package"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={loading}
                    onClick={() => void handleGenerate()}
                  >
                    Regenerate
                  </Button>
                  {saveMessage && (
                    <p className="text-sm text-emerald-400">{saveMessage}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {exportPackage && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Export package</CardTitle>
                  <CardDescription>
                    Markdown or PDF-ready text for your VA or content folder.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ExportActions pkg={exportPackage} />
                  <CopyButton
                    text={
                      generationMode === "campaign" && campaignOutputs
                        ? CAMPAIGN_TABS.map(
                            (tab) =>
                              `## ${tab.label}\n\n${campaignOutputs[tab.key]}`,
                          ).join("\n\n---\n\n")
                        : OUTPUT_TABS.map(
                            (tab) => `## ${tab.label}\n\n${outputs![tab.key]}`,
                          ).join("\n\n---\n\n")
                    }
                    label="Copy all content"
                  />
                  {landingPage && exportPackage && (
                    <CopyButton
                      text={landingPageToMarkdown(
                        landingPage,
                        exportPackage.title,
                      )}
                      label="Copy landing page"
                    />
                  )}
                  {calendar && exportPackage && (
                    <CopyButton
                      text={calendarToMarkdown(calendar, exportPackage.title)}
                      label="Copy calendar"
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </ContentEngineShell>
  );
}
