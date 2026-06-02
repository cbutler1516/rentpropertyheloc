import { updateHubSpotContactAddress } from "@/lib/crm/hubspot";
import { NextResponse } from "next/server";

type AddressPayload = {
  leadId: string;
  propertyAddress: string;
  city: string;
  state: string;
  zip: string;
  googlePlaceId?: string;
};

function validateAddressPayload(
  body: unknown,
): { valid: true; data: AddressPayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const { leadId, propertyAddress, city, state, zip, googlePlaceId } = body as Record<
    string,
    unknown
  >;

  if (typeof leadId !== "string" || !leadId.trim()) {
    return { valid: false, error: "leadId is required." };
  }
  if (typeof propertyAddress !== "string" || !propertyAddress.trim()) {
    return { valid: false, error: "propertyAddress is required." };
  }
  if (typeof city !== "string" || !city.trim()) {
    return { valid: false, error: "city is required." };
  }
  if (typeof state !== "string" || !state.trim()) {
    return { valid: false, error: "state is required." };
  }
  if (typeof zip !== "string" || !zip.trim()) {
    return { valid: false, error: "zip is required." };
  }

  return {
    valid: true,
    data: {
      leadId: leadId.trim(),
      propertyAddress: propertyAddress.trim(),
      city: city.trim(),
      state: state.trim().toUpperCase(),
      zip: zip.trim(),
      googlePlaceId: typeof googlePlaceId === "string" ? googlePlaceId.trim() : undefined,
    },
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validateAddressPayload(body);
  if (!validation.valid) {
    return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
  }

  const { leadId, propertyAddress, city, state, zip, googlePlaceId } = validation.data;

  try {
    await updateHubSpotContactAddress({
      leadId,
      propertyAddress,
      city,
      state,
      zip,
      googlePlaceId,
    });

    console.info("[leads/address] address saved", {
      leadId,
      city,
      state,
      zip: zip.slice(0, 3) + "**",
      hasPlaceId: Boolean(googlePlaceId),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[leads/address] failed to save address", error);
    return NextResponse.json(
      { success: false, error: "Failed to save address. Please try again." },
      { status: 500 },
    );
  }
}
