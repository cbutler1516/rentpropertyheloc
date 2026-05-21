import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/app/deal-analyzer/lib/supabase/env";
import {
  getPublishedPageStatus,
  publishCampaignPage,
  unpublishCampaignPage,
} from "@/app/content-engine/lib/published-pages";
import type { PublishCampaignRequest } from "@/app/content-engine/lib/types";

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ status: null, source: "local" });
  }

  const packageId = new URL(request.url).searchParams.get("packageId")?.trim();
  if (!packageId) {
    return NextResponse.json({ error: "packageId required." }, { status: 400 });
  }

  const status = await getPublishedPageStatus(packageId);
  return NextResponse.json({ status, source: "supabase" });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Publishing requires Supabase. Save drafts locally only." },
      { status: 503 },
    );
  }

  let body: PublishCampaignRequest;
  try {
    body = (await request.json()) as PublishCampaignRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.packageId?.trim() || !body.slug?.trim() || !body.landingPage) {
    return NextResponse.json(
      { error: "packageId, slug, and landingPage are required." },
      { status: 400 },
    );
  }

  const result = await publishCampaignPage({
    packageId: body.packageId.trim(),
    slug: body.slug,
    packageTitle: body.packageTitle?.trim() || "Campaign",
    landingPage: body.landingPage,
    leadCapture: body.leadCapture,
    crmIntegration: body.crmIntegration,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ status: result });
}

export async function DELETE(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Unpublish requires Supabase." },
      { status: 503 },
    );
  }

  let body: { packageId?: string };
  try {
    body = (await request.json()) as { packageId?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.packageId?.trim()) {
    return NextResponse.json({ error: "packageId required." }, { status: 400 });
  }

  const result = await unpublishCampaignPage(body.packageId.trim());
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  const status = await getPublishedPageStatus(body.packageId.trim());
  return NextResponse.json({ ok: true, status });
}
