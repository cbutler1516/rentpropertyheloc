import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/app/deal-analyzer/lib/supabase/env";
import { deletePackageFromSupabase } from "@/app/content-engine/lib/supabase/packages";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, source: "local" });
  }

  const result = await deletePackageFromSupabase(id);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, source: "supabase" });
}
