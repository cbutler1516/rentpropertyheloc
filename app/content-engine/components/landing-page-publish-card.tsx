"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { isRemoteStorageAvailable } from "../lib/packages-client";
import { slugifyCampaignTitle, validateCampaignSlug } from "../lib/campaign-slug";
import { buildPublishedUrl } from "../lib/published-pages";
import type {
  CrmIntegrationRecord,
  LandingPageRecord,
  LeadCaptureRecord,
  PublishedPageStatus,
} from "../lib/types";

type LandingPagePublishCardProps = {
  packageId: string | null;
  packageTitle: string;
  landingPage: LandingPageRecord;
  leadCapture?: LeadCaptureRecord | null;
  crmIntegration?: CrmIntegrationRecord | null;
  initialStatus?: PublishedPageStatus | null;
  onStatusChange?: (status: PublishedPageStatus | null) => void;
};

export function LandingPagePublishCard({
  packageId,
  packageTitle,
  landingPage,
  leadCapture,
  crmIntegration,
  initialStatus,
  onStatusChange,
}: LandingPagePublishCardProps) {
  const remote = isRemoteStorageAvailable();
  const [slug, setSlug] = useState(
    initialStatus?.slug ?? slugifyCampaignTitle(packageTitle),
  );
  const [status, setStatus] = useState<PublishedPageStatus | null>(
    initialStatus ?? null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = useCallback(
    (next: PublishedPageStatus | null) => {
      setStatus(next);
      onStatusChange?.(next);
    },
    [onStatusChange],
  );

  useEffect(() => {
    if (!packageId || !remote) return;
    void (async () => {
      try {
        const res = await fetch(
          `/api/content-engine/publish?packageId=${encodeURIComponent(packageId)}`,
        );
        const data = await res.json();
        if (data.status) {
          updateStatus(data.status as PublishedPageStatus);
          setSlug(data.status.slug);
        }
      } catch {
        /* ignore */
      }
    })();
  }, [packageId, remote, updateStatus]);

  const handlePublish = async () => {
    if (!packageId) {
      setError("Save the package to Supabase before publishing.");
      return;
    }
    const slugError = validateCampaignSlug(slug);
    if (slugError) {
      setError(slugError);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/content-engine/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          slug,
          packageTitle,
          landingPage,
          leadCapture: leadCapture ?? undefined,
          crmIntegration: crmIntegration ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Publish failed.");
      updateStatus(data.status as PublishedPageStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublish = async () => {
    if (!packageId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/content-engine/publish", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unpublish failed.");
      updateStatus(
        data.status
          ? (data.status as PublishedPageStatus)
          : {
              slug,
              isPublished: false,
              publishedAt: status?.publishedAt ?? null,
              unpublishedAt: new Date().toISOString(),
              publishedUrl: buildPublishedUrl(slug),
            },
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unpublish failed.");
    } finally {
      setLoading(false);
    }
  };

  const previewHref = packageId
    ? status?.isPublished
      ? `/campaigns/${status.slug}`
      : `/campaigns/preview/${packageId}`
    : null;

  const publishedUrl =
    status?.isPublished && status.slug
      ? status.publishedUrl || buildPublishedUrl(status.slug)
      : null;

  return (
    <div className="mb-4 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[9px] tracking-[0.18em] text-emerald-300 uppercase">
          Public campaign page
        </p>
        {status?.isPublished ? (
          <Badge variant="success">Published</Badge>
        ) : status?.slug ? (
          <Badge variant="gold">Unpublished</Badge>
        ) : (
          <Badge variant="default">Draft</Badge>
        )}
      </div>

      {!remote && (
        <p className="mt-2 text-xs text-amber-200/90">
          Publishing requires Supabase. Packages save to local storage only.
        </p>
      )}

      {!packageId && remote && (
        <p className="mt-2 text-xs text-zinc-500">
          Save this package before publishing.
        </p>
      )}

      <div className="mt-3">
        <Label htmlFor="campaign-slug">URL slug</Label>
        <div className="mt-1 flex flex-wrap gap-2">
          <span className="flex items-center text-sm text-zinc-500">/campaigns/</span>
          <Input
            id="campaign-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="max-w-xs flex-1 bg-black/40"
            disabled={!remote || loading}
          />
        </div>
      </div>

      {publishedUrl && status?.isPublished && (
        <p className="mt-3 break-all text-sm text-emerald-200">
          <a
            href={publishedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            {publishedUrl}
          </a>
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          disabled={!remote || !packageId || loading}
          onClick={() => void handlePublish()}
        >
          {loading ? "Working…" : status?.isPublished ? "Update publish" : "Publish page"}
        </Button>
        {previewHref && (
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/60 px-4 font-mono text-[9px] tracking-[0.16em] text-zinc-200 uppercase transition-all hover:border-[#7c3aed]/50 hover:text-white"
          >
            Preview page
          </a>
        )}
        {status?.isPublished && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={loading}
            onClick={() => void handleUnpublish()}
          >
            Unpublish
          </Button>
        )}
      </div>
    </div>
  );
}
