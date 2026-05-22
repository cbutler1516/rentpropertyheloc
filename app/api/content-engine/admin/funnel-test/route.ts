import { NextResponse } from "next/server";
import {
  cleanupFunnelTest,
  runFullFunnelTest,
} from "@/app/content-engine/lib/admin/funnel-test";

export async function POST() {
  try {
    const report = await runFullFunnelTest();
    return NextResponse.json(report);
  } catch (err) {
    console.error("Funnel test error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Funnel test failed." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  let body: { packageId?: string; slug?: string } = {};
  try {
    if (request.headers.get("content-length") !== "0") {
      body = (await request.json()) as { packageId?: string; slug?: string };
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const result = await cleanupFunnelTest(body);
    const status = result.ok ? 200 : 400;
    return NextResponse.json(result, { status });
  } catch (err) {
    console.error("Funnel cleanup error", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Cleanup failed." },
      { status: 500 },
    );
  }
}
