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
import type {
  ContentAudience,
  ContentOutputs,
  ContentPackage,
  DateFilterPreset,
  OutputTabKey,
  PackageFilters,
} from "../lib/types";
import { CopyButton } from "./copy-button";
import { ContentEngineShell } from "./content-engine-shell";
import { ExportActions } from "./export-actions";
import { PackageHistoryPanel } from "./package-history-panel";
import { PackageMetadataForm } from "./package-metadata-form";

const PLACEHOLDER = `Paste a market update, video transcript, Fed commentary, borrower scenario, or rough idea…

Example: "Fed held steady but dot plot shifted. Buyers in Seattle are asking whether to wait for spring inventory. Agent partners want forwardable language without rate bait."`;

const SAMPLE_INPUT = `Fed held rates steady but signaled fewer cuts in 2026. Puget Sound buyers are asking whether to wait for spring inventory or lock a buy-before-sell plan now. Agents want forwardable talking points that don't sound like rate spam.`;

const DEFAULT_FILTERS: PackageFilters = {
  search: "",
  audience: "all",
  topic: "all",
  datePreset: "all",
};

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

function buildExportPackage(
  draft: {
    id: string | null;
    title: string;
    sourceInput: string;
    audience: ContentAudience;
    tone: string;
    topic: string;
    modelUsed: string;
    tagsInput: string;
    outputs: ContentOutputs;
  },
): ContentPackage {
  return {
    id: draft.id ?? "draft",
    createdAt: new Date().toISOString(),
    title: draft.title,
    sourceInput: draft.sourceInput,
    audience: draft.audience,
    tone: draft.tone,
    topic: draft.topic,
    modelUsed: draft.modelUsed,
    outputs: draft.outputs,
    tags: parseTagsInput(draft.tagsInput),
  };
}

export function ContentEngineApp() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<ContentOutputs | null>(null);
  const [activeTab, setActiveTab] = useState<OutputTabKey>("tiktokHooks");
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

  const refreshPackages = useCallback(async () => {
    const result = await fetchPackages();
    setPackages(result.packages);
    setStorageSource(result.source);
  }, []);

  useEffect(() => {
    void refreshPackages();
  }, [refreshPackages]);

  const activeOutput = outputs?.[activeTab] ?? "";
  const activeTabConfig = OUTPUT_TABS.find((tab) => tab.key === activeTab);

  const exportPackage = useMemo(() => {
    if (!outputs) return null;
    return buildExportPackage({
      id: activePackageId,
      title: title || packageTitleFromInput(input),
      sourceInput: input,
      audience,
      tone,
      topic,
      modelUsed,
      tagsInput,
      outputs,
    });
  }, [
    activePackageId,
    audience,
    input,
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
      channels: outputs ? OUTPUT_TABS.length : 0,
    }),
    [input, packages.length, outputs],
  );

  const applyInferredMetadata = useCallback((source: string, nextMode: "ai" | "demo", nextModel: string) => {
    const nextAudience = inferAudience(source);
    const nextTopic = inferTopic(source);
    const nextTone = inferTone(source);
    setAudience(nextAudience);
    setTopic(nextTopic);
    setTone(nextTone);
    setTagsInput(inferTags(source, nextTopic, nextAudience).join(", "));
    setTitle(packageTitleFromInput(source));
    setMode(nextMode);
    setModelUsed(nextModel);
  }, []);

  const handleGenerate = useCallback(async (overrideInput?: string) => {
    const source = (overrideInput ?? input).trim();
    if (source.length < 24) return;

    setError(null);
    setSaveMessage(null);
    setLoading(true);
    try {
      const response = await fetch("/api/content-engine/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: source }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Generation failed.");
      }

      if (overrideInput) setInput(overrideInput);

      setOutputs(data.outputs as ContentOutputs);
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
      setActiveTab("tiktokHooks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [applyInferredMetadata, input]);

  const handleSavePackage = useCallback(async () => {
    if (!outputs) return;
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
        outputs,
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
    input,
    modelUsed,
    outputs,
    refreshPackages,
    tagsInput,
    title,
    tone,
    topic,
  ]);

  const loadPackage = useCallback((pkg: ContentPackage) => {
    setInput(pkg.sourceInput);
    setOutputs(pkg.outputs);
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
    setError(null);
    setSaveMessage(null);
    setMobileHistoryOpen(false);
  }, []);

  const handleDuplicate = useCallback((pkg: ContentPackage) => {
    loadPackage(pkg);
    setTitle(`${pkg.title} (copy)`);
    setActivePackageId(null);
    setIsUnsaved(true);
    setSidebarView("studio");
  }, [loadPackage]);

  const handleRegenerate = useCallback(
    async (pkg: ContentPackage) => {
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
                Generate a pack, refine metadata, then save to your playbook
                library.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={() => setInput(SAMPLE_INPUT)}
              >
                Load sample
              </Button>
            </Card>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li className="flex gap-2">
                <span className="text-[#c9a227]">01</span>
                Paste source material
              </li>
              <li className="flex gap-2">
                <span className="text-[#c9a227]">02</span>
                Generate content pack
              </li>
              <li className="flex gap-2">
                <span className="text-[#c9a227]">03</span>
                Save package + export
              </li>
            </ul>
            <p className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[11px] text-zinc-400">
              Storage:{" "}
              <span className="text-zinc-200">
                {isRemoteStorageAvailable()
                  ? `Supabase (${storageSource})`
                  : "Local only — add Supabase env vars"}
              </span>
            </p>
            <p className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-[11px] leading-relaxed text-amber-200/80">
              <code className="text-amber-100">OPENAI_API_KEY</code> enables live
              AI. Demo mode always works offline.
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
            <Badge variant={mode === "ai" ? "purple" : "gold"}>{mode} mode</Badge>
          )}
          {isUnsaved && <Badge variant="warning">Unsaved</Badge>}
        </div>

        {mobileHistoryOpen && (
          <Card className="lg:hidden">
            <CardContent className="max-h-[28rem] overflow-y-auto pt-4">
              {sidebarView === "history" ? (
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
              ) : (
                <p className="text-xs text-zinc-500">
                  Use desktop sidebar for studio tips, or switch to History tab.
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Source words", value: stats.words },
            { label: "Saved packages", value: stats.packages },
            { label: "Channels ready", value: stats.channels },
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

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Source material</CardTitle>
              <CardDescription>
                Market updates, transcripts, Fed notes, borrower scenarios, or
                rough ideas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={PLACEHOLDER}
                className="min-h-[280px] flex-1 resize-y font-mono text-[13px] leading-relaxed md:min-h-[360px]"
              />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="gold"
                  size="lg"
                  disabled={loading || input.trim().length < 24}
                  onClick={() => void handleGenerate()}
                >
                  {loading ? "Running playbook…" : "Generate content pack"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setInput("");
                    setOutputs(null);
                    setMode(null);
                    setError(null);
                    setSaveMessage(null);
                    setActivePackageId(null);
                    setIsUnsaved(false);
                  }}
                >
                  Clear
                </Button>
                {mode && (
                  <Badge variant={mode === "ai" ? "purple" : "gold"}>
                    {mode === "ai" ? modelUsed : "Demo engine"}
                  </Badge>
                )}
                {isUnsaved && outputs && (
                  <Badge variant="warning">Unsaved draft</Badge>
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
            <CardHeader className="border-b border-white/[0.06] pb-0">
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
                    Your 12-channel playbook appears here—hooks, posts, email,
                    SEO, AI video prompts, and agent/consumer versions.
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
          </Card>
        </div>

        {outputs && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Package details</CardTitle>
                <CardDescription>
                  Refine audience, tone, and tags before saving to your library.
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
                    Regenerate outputs
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
                    Markdown for Notion/CMS, or PDF-ready text with page breaks.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ExportActions pkg={exportPackage} />
                  <CopyButton
                    text={OUTPUT_TABS.map(
                      (tab) => `## ${tab.label}\n\n${outputs[tab.key]}`,
                    ).join("\n\n---\n\n")}
                    label="Copy all channels"
                  />
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </ContentEngineShell>
  );
}
