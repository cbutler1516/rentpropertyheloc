import { isAdminTestAuthorized } from "@/lib/leads/admin-auth";
import { listLeads } from "@/lib/leads/list-leads";
import { NextResponse } from "next/server";

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

  const result = await listLeads(Number.isFinite(limit) ? limit : 100);

  return NextResponse.json({
    success: true,
    ...result,
  });
}
