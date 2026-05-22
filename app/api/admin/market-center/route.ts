import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import {
  loadMarketCenterSnapshot,
  publishMarketUpdate,
  saveDraftMarketUpdate,
} from "@/app/lib/market-center/repository";
import { normalizeDailyMarketUpdate } from "@/app/lib/market-center/normalize";
import type { DailyMarketUpdate } from "@/app/lib/market-center/types";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const snapshot = await loadMarketCenterSnapshot();
  return NextResponse.json(snapshot);
}

type PutBody = {
  update?: DailyMarketUpdate;
  publish?: boolean;
};

export async function PUT(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: PutBody;
  try {
    body = (await request.json()) as PutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.update) {
    return NextResponse.json({ error: "Missing update" }, { status: 400 });
  }

  const update = normalizeDailyMarketUpdate(body.update);
  const snapshot = body.publish
    ? await publishMarketUpdate(update)
    : await saveDraftMarketUpdate(update);

  return NextResponse.json(snapshot);
}
