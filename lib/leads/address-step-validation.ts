import type { LeadFunnelData } from "@/lib/leads/types";

export function isGooglePlacesAddressReady(
  data: Pick<LeadFunnelData, "propertyStreet" | "googlePlaceId" | "propertyFormattedAddress">,
): boolean {
  const street = data.propertyStreet?.trim();
  if (!street) return false;
  return Boolean(data.googlePlaceId?.trim() || data.propertyFormattedAddress?.trim());
}

export function isManualAddressReady(
  data: Pick<
    LeadFunnelData,
    "propertyStreet" | "propertyCity" | "propertyState" | "propertyZip"
  >,
): boolean {
  return Boolean(
    data.propertyStreet?.trim() &&
      data.propertyCity?.trim() &&
      data.propertyState?.trim().length >= 2 &&
      data.propertyZip?.trim(),
  );
}

export function canContinueAddressStep(data: LeadFunnelData): boolean {
  return isGooglePlacesAddressReady(data) || isManualAddressReady(data);
}
