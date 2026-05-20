import { NextResponse } from "next/server";
import { isCrmProvider } from "@/app/content-engine/lib/crm-providers";
import {
  deleteCrmCredentials,
  saveCrmCredentials,
} from "@/app/content-engine/lib/crm-credentials-store";
import type { SaveCrmCredentialsRequest } from "@/app/content-engine/lib/types";

export async function POST(request: Request) {
  let body: SaveCrmCredentialsRequest;
  try {
    body = (await request.json()) as SaveCrmCredentialsRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.packageId?.trim()) {
    return NextResponse.json({ error: "packageId is required." }, { status: 400 });
  }
  if (!isCrmProvider(body.provider)) {
    return NextResponse.json({ error: "Invalid CRM provider." }, { status: 400 });
  }
  if (!body.credentials || typeof body.credentials !== "object") {
    return NextResponse.json({ error: "credentials object required." }, { status: 400 });
  }

  const result = await saveCrmCredentials({
    packageId: body.packageId.trim(),
    provider: body.provider,
    credentials: body.credentials,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ connection: result });
}

export async function DELETE(request: Request) {
  let body: { packageId?: string; provider?: string };
  try {
    body = (await request.json()) as { packageId?: string; provider?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body.packageId?.trim() || !body.provider || !isCrmProvider(body.provider)) {
    return NextResponse.json(
      { error: "packageId and valid provider required." },
      { status: 400 },
    );
  }

  const result = await deleteCrmCredentials({
    packageId: body.packageId.trim(),
    provider: body.provider,
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
