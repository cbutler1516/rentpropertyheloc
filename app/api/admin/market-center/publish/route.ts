import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import { publishStoredDraft } from "@/app/lib/market-center/repository";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await publishStoredDraft();
  if (!snapshot.published) {
    return NextResponse.json(
      { error: "No draft to publish. Save a draft first." },
      { status: 400 },
    );
  }

  return NextResponse.json(snapshot);
}
