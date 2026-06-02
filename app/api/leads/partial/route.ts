import { isAdminTestAuthorized } from "@/lib/leads/admin-auth";
import { computePartialLeadStats } from "@/lib/leads/partial-lead-stats";
import { listPartialLeads } from "@/lib/leads/save-partial-lead";
import { validatePartialLeadBody } from "@/lib/leads/partial-lead-validation";
import { savePartialLead } from "@/lib/leads/save-partial-lead";
import { NextResponse } from "next/server";

/** Partial saves only — never creates HubSpot contacts or sends notifications. */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validatePartialLeadBody(body);
  if (!validation.valid) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
  }

  try {
    const record = await savePartialLead(validation.data);
    return NextResponse.json({
      success: true,
      id: record.id,
      sessionId: record.sessionId,
      status: "partial",
      completionPercent: record.completionPercent,
      updatedAt: record.updatedAt,
    });
  } catch (error) {
    console.error("[leads] partial save failed", error);
    return NextResponse.json(
      { success: false, error: "Unable to save partial progress." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  if (!isAdminTestAuthorized(request)) {
    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "production"
            ? "Unauthorized. Pass ADMIN_TEST_TOKEN via Authorization header."
            : "Unauthorized.",
      },
      { status: 403 },
    );
  }

  const url = new URL(request.url);
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : 100;

  const { partials, persistenceMode } = await listPartialLeads(
    Number.isFinite(limit) ? limit : 100,
  );

  return NextResponse.json({
    success: true,
    partials,
    stats: computePartialLeadStats(partials),
    persistenceMode,
  });
}
