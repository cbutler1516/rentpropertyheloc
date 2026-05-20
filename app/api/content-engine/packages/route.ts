import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/app/deal-analyzer/lib/supabase/env";
import {
  listPackagesFromSupabase,
  savePackageToSupabase,
} from "@/app/content-engine/lib/supabase/packages";
import type { SavePackageRequest } from "@/app/content-engine/lib/types";
import { OUTPUT_TAB_KEYS } from "@/app/content-engine/lib/types";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ packages: [], source: "local" });
  }

  const result = await listPackagesFromSupabase();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ packages: result, source: "supabase" });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured. Using local storage." },
      { status: 503 },
    );
  }

  let body: SavePackageRequest;
  try {
    body = (await request.json()) as SavePackageRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.title?.trim() || !body.sourceInput?.trim()) {
    return NextResponse.json(
      { error: "Title and source material are required." },
      { status: 400 },
    );
  }

  for (const key of OUTPUT_TAB_KEYS) {
    if (!body.outputs?.[key]?.trim()) {
      return NextResponse.json(
        { error: "Complete outputs are required before saving." },
        { status: 400 },
      );
    }
  }

  const result = await savePackageToSupabase({
    id: body.id,
    title: body.title.trim(),
    sourceInput: body.sourceInput.trim(),
    audience: body.audience ?? "general",
    tone: body.tone ?? "strategic",
    topic: body.topic ?? "Mortgage strategy",
    modelUsed: body.modelUsed ?? "demo",
    outputs: body.outputs,
    tags: body.tags ?? [],
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ package: result, source: "supabase" });
}
