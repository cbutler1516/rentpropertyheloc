import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import type { PartnerAgentInput } from "@/app/deal-analyzer/lib/agent-types";
import {
  createAgent,
  fetchAgentDashboardStats,
  listAgents,
} from "@/app/deal-analyzer/lib/supabase/agents";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const [agentsResult, statsResult] = await Promise.all([
    listAgents(),
    fetchAgentDashboardStats(),
  ]);

  if ("error" in agentsResult) {
    return NextResponse.json({ error: agentsResult.error }, { status: 500 });
  }

  if ("error" in statsResult) {
    return NextResponse.json({ error: statsResult.error }, { status: 500 });
  }

  return NextResponse.json({ agents: agentsResult, stats: statsResult });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as PartnerAgentInput;

  if (!body.name?.trim() || !body.email?.trim() || !body.slug?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and slug are required." },
      { status: 400 },
    );
  }

  const result = await createAgent({
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone?.trim(),
    company: body.company?.trim(),
    slug: body.slug.trim(),
    referralCode: body.referralCode?.trim() || body.slug.trim().toUpperCase(),
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ agent: result.agent });
}
