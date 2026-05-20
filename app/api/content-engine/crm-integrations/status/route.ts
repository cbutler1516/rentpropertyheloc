import { NextResponse } from "next/server";
import { listCrmConnectionStatus } from "@/app/content-engine/lib/crm-credentials-store";

export async function GET(request: Request) {
  const packageId = new URL(request.url).searchParams.get("packageId")?.trim();
  if (!packageId) {
    return NextResponse.json({ error: "packageId query param required." }, { status: 400 });
  }

  const connections = await listCrmConnectionStatus(packageId);
  return NextResponse.json({ connections });
}
