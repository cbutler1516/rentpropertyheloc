import { NextResponse } from "next/server";
import { fetchAgentBySlug } from "@/app/deal-analyzer/lib/supabase/agents";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const result = await fetchAgentBySlug(slug);

  if (!result) {
    return NextResponse.json({ error: "Agent not found." }, { status: 404 });
  }

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ agent: result });
}
