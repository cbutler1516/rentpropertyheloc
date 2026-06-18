import { isGooglePlacesAddressReady, isManualAddressReady } from "@/lib/leads/address-step-validation";
import { isValidPropertyType, FUNNEL_VERSION } from "@/lib/leads/funnel-config";
import { LEAD_NUMERIC_LIMITS, LEAD_SOURCE } from "@/lib/leads/constants";
import { isJourneySlug } from "@/lib/leads/investor-journeys";
import { CREDIT_SCORE_RANGES, EQUITY_ACCESS_RANGES, inferEquityAccessRange } from "@/lib/leads/funnel-ranges";
import { normalizeFundingGoalId } from "@/lib/leads/funding-goals";
import { isValidOwnershipType } from "@/lib/leads/ownership-type";
import { isPropertyOccupancyId, resolveLeadCategory } from "@/lib/leads/property-occupancy";
import type { LeadCreateRequest } from "@/lib/leads/types";
import {
  isValidPhone,
  normalizePhoneDigits,
  normalizePhoneForStorage,
} from "@/lib/phone-format";

export { isValidPhone, normalizePhoneDigits } from "@/lib/phone-format";

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isInRange(value: number, min: number, max: number): boolean {
  return Number.isFinite(value) && value >= min && value <= max;
}

function isValidCreditRange(value: string): boolean {
  return CREDIT_SCORE_RANGES.some((r) => r.id === value);
}

function isValidEquityRange(value: string): boolean {
  return EQUITY_ACCESS_RANGES.some((r) => r.id === value);
}

export type LeadValidationResult =
  | { valid: true; data: LeadCreateRequest }
  | { valid: false; error: string };

export function validateLeadCreateRequest(body: unknown): LeadValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;

  let journey = typeof raw.journey === "string" ? raw.journey.trim() : "";
  if (!journey || !isJourneySlug(journey)) {
    journey = "sfr";
  }

  const propertyTypeRaw = typeof raw.propertyType === "string" ? raw.propertyType.trim() : "";
  const propertyType =
    propertyTypeRaw && isValidPropertyType(propertyTypeRaw) ? propertyTypeRaw : "";

  const propertyStreet = typeof raw.propertyStreet === "string" ? raw.propertyStreet.trim() : "";
  const propertyCity = typeof raw.propertyCity === "string" ? raw.propertyCity.trim() : "";
  const propertyState = typeof raw.propertyState === "string" ? raw.propertyState.trim() : "";
  const propertyZip = typeof raw.propertyZip === "string" ? raw.propertyZip.trim() : "";

  if (!propertyStreet) return { valid: false, error: "Property address is required." };

  const googlePlaceIdForCheck =
    typeof raw.googlePlaceId === "string" ? raw.googlePlaceId.trim() : "";
  const propertyFormattedAddressForCheck =
    typeof raw.propertyFormattedAddress === "string" ? raw.propertyFormattedAddress.trim() : "";

  const googleAddressReady = isGooglePlacesAddressReady({
    propertyStreet,
    googlePlaceId: googlePlaceIdForCheck,
    propertyFormattedAddress: propertyFormattedAddressForCheck,
  });
  const manualAddressReady = isManualAddressReady({
    propertyStreet,
    propertyCity,
    propertyState,
    propertyZip,
  });

  if (!googleAddressReady && !manualAddressReady) {
    return {
      valid: false,
      error: "Complete the property address or select a suggested address.",
    };
  }

  const propertyOccupancyRaw =
    typeof raw.propertyOccupancy === "string" ? raw.propertyOccupancy.trim() : "";
  const propertyOccupancy = isPropertyOccupancyId(propertyOccupancyRaw)
    ? propertyOccupancyRaw
    : "";
  if (!propertyOccupancy) {
    return { valid: false, error: "Property use is required." };
  }
  const leadCategory = resolveLeadCategory(propertyOccupancy);

  if (!googleAddressReady) {
    if (!propertyCity) return { valid: false, error: "City is required." };
    if (!propertyState) return { valid: false, error: "State is required." };
    if (!propertyZip) return { valid: false, error: "ZIP code is required." };
  }

  const equityAccessRangeRaw = parseStringField(raw.equityAccessRange);
  const desiredFunds = parseRequiredNumber(raw.desiredFunds, "desired funds");
  if (!desiredFunds.ok) return { valid: false, error: desiredFunds.error };

  let equityAccessRange = equityAccessRangeRaw;
  if (!equityAccessRange || !isValidEquityRange(equityAccessRange)) {
    if (desiredFunds.value > 0) {
      equityAccessRange = inferEquityAccessRange(desiredFunds.value);
    } else {
      return { valid: false, error: "A valid desired funds amount is required." };
    }
  }

  const creditScoreRange = parseStringField(raw.creditScoreRange);
  if (!creditScoreRange || !isValidCreditRange(creditScoreRange)) {
    return { valid: false, error: "Credit score range is required." };
  }

  if (
    !isInRange(
      desiredFunds.value,
      LEAD_NUMERIC_LIMITS.desiredFunds.min,
      LEAD_NUMERIC_LIMITS.desiredFunds.max,
    )
  ) {
    return { valid: false, error: "Desired funds amount is outside the allowed range." };
  }

  const propertyValue = parseOptionalNumber(raw.propertyValue);
  const mortgageBalance = parseOptionalNumber(raw.mortgageBalance);

  if (propertyValue != null && !isInRange(propertyValue, LEAD_NUMERIC_LIMITS.propertyValue.min, LEAD_NUMERIC_LIMITS.propertyValue.max)) {
    return { valid: false, error: "Property value is outside the allowed range." };
  }

  if (mortgageBalance != null && !isInRange(mortgageBalance, LEAD_NUMERIC_LIMITS.mortgageBalance.min, LEAD_NUMERIC_LIMITS.mortgageBalance.max)) {
    return { valid: false, error: "Mortgage balance is outside the allowed range." };
  }

  if (
    propertyValue != null &&
    mortgageBalance != null &&
    mortgageBalance > 0 &&
    propertyValue <= mortgageBalance
  ) {
    return { valid: false, error: "Property value must be greater than the mortgage balance." };
  }

  const firstName = typeof raw.firstName === "string" ? raw.firstName.trim() : "";
  const lastName = typeof raw.lastName === "string" ? raw.lastName.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";

  if (!firstName) return { valid: false, error: "First name is required." };
  if (!lastName) return { valid: false, error: "Last name is required." };
  if (!email) return { valid: false, error: "Email is required." };
  if (!isValidEmail(email)) return { valid: false, error: "A valid email address is required." };
  if (!phone) return { valid: false, error: "Phone number is required." };
  if (!isValidPhone(phone)) {
    return { valid: false, error: "A valid phone number is required." };
  }

  const tcpaConsent = raw.tcpaConsent === true;
  if (!tcpaConsent) {
    return { valid: false, error: "TCPA consent is required before submitting." };
  }

  const tcpaConsentAt = typeof raw.tcpaConsentAt === "string" ? raw.tcpaConsentAt.trim() : "";
  if (!tcpaConsentAt || Number.isNaN(Date.parse(tcpaConsentAt))) {
    return { valid: false, error: "A valid consent timestamp is required." };
  }

  const sourceUrl = typeof raw.sourceUrl === "string" ? raw.sourceUrl.trim() : "";
  const createdAt = typeof raw.createdAt === "string" ? raw.createdAt.trim() : "";

  if (!createdAt || Number.isNaN(Date.parse(createdAt))) {
    return { valid: false, error: "A valid submission timestamp is required." };
  }

  const estimatedEquity =
    raw.estimatedEquity == null ? null : parseOptionalNumber(raw.estimatedEquity);

  const estimatedHeloc =
    raw.estimatedHeloc == null ? null : parseOptionalNumber(raw.estimatedHeloc);
  const estimatedHelocLow =
    raw.estimatedHelocLow == null ? null : parseOptionalNumber(raw.estimatedHelocLow);
  const estimatedHelocHigh =
    raw.estimatedHelocHigh == null ? null : parseOptionalNumber(raw.estimatedHelocHigh);
  const propertyValueLow =
    raw.propertyValueLow == null ? null : parseOptionalNumber(raw.propertyValueLow);
  const propertyValueHigh =
    raw.propertyValueHigh == null ? null : parseOptionalNumber(raw.propertyValueHigh);
  const mortgageBalanceLow =
    raw.mortgageBalanceLow == null ? null : parseOptionalNumber(raw.mortgageBalanceLow);
  const mortgageBalanceHigh =
    raw.mortgageBalanceHigh == null ? null : parseOptionalNumber(raw.mortgageBalanceHigh);
  const lastSalePrice =
    raw.lastSalePrice == null ? null : parseOptionalNumber(raw.lastSalePrice);
  const recordedMortgageAmount =
    raw.recordedMortgageAmount == null ? null : parseOptionalNumber(raw.recordedMortgageAmount);
  const actualMortgageBalance =
    raw.actualMortgageBalance == null ? null : parseOptionalNumber(raw.actualMortgageBalance);
  const funnelStepCompleted =
    raw.funnelStepCompleted == null ? 0 : parseOptionalNumber(raw.funnelStepCompleted) ?? 0;

  const lastSaleDate = typeof raw.lastSaleDate === "string" ? raw.lastSaleDate.trim() : "";
  const fundingGoalRaw = typeof raw.fundingGoal === "string" ? raw.fundingGoal.trim() : "";
  const fundingGoal = normalizeFundingGoalId(fundingGoalRaw);
  const ownershipTypeRaw = typeof raw.ownershipType === "string" ? raw.ownershipType.trim() : "";
  const ownershipType = isValidOwnershipType(ownershipTypeRaw) ? ownershipTypeRaw : "";
  const useMortgageEstimate = raw.useMortgageEstimate !== false;

  const creditScoreEstimate =
    raw.creditScoreEstimate == null ? null : parseOptionalNumber(raw.creditScoreEstimate);

  const propertySqft = raw.propertySqft == null ? null : parseOptionalNumber(raw.propertySqft);
  const propertyBeds = raw.propertyBeds == null ? null : parseOptionalNumber(raw.propertyBeds);
  const propertyBaths = raw.propertyBaths == null ? null : parseOptionalNumber(raw.propertyBaths);
  const propertyYearBuilt =
    raw.propertyYearBuilt == null ? null : parseOptionalNumber(raw.propertyYearBuilt);
  const propertyLatitude =
    raw.propertyLatitude == null ? null : parseOptionalNumber(raw.propertyLatitude);
  const propertyLongitude =
    raw.propertyLongitude == null ? null : parseOptionalNumber(raw.propertyLongitude);
  const estimatedRent = raw.estimatedRent == null ? null : parseOptionalNumber(raw.estimatedRent);
  const targetCltvPercent =
    raw.targetCltvPercent == null ? 75 : parseOptionalNumber(raw.targetCltvPercent) ?? 75;
  const investorScore =
    raw.investorScore == null ? null : parseOptionalNumber(raw.investorScore);

  const avmSource = typeof raw.avmSource === "string" ? raw.avmSource.trim() : "";
  const confidenceRating =
    typeof raw.confidenceRating === "string" ? raw.confidenceRating.trim() : "";
  const valuationLastUpdated =
    typeof raw.valuationLastUpdated === "string" ? raw.valuationLastUpdated.trim() : "";

  const funnelVersion =
    typeof raw.funnelVersion === "string" && raw.funnelVersion.trim()
      ? raw.funnelVersion.trim()
      : FUNNEL_VERSION;

  const googlePlaceId = typeof raw.googlePlaceId === "string" ? raw.googlePlaceId.trim() : "";
  const propertyFormattedAddress =
    typeof raw.propertyFormattedAddress === "string" ? raw.propertyFormattedAddress.trim() : "";

  return {
    valid: true,
    data: {
      journey,
      funnelVersion,
      propertyOccupancy,
      leadCategory,
      propertyType,
      propertyValueRange: parseStringField(raw.propertyValueRange),
      mortgageBalanceRange: parseStringField(raw.mortgageBalanceRange),
      equityAccessRange,
      creditScoreRange,
      propertyCount: parseStringField(raw.propertyCount),
      fundingTimeline: parseStringField(raw.fundingTimeline),
      propertyRented: parseStringField(raw.propertyRented),
      propertyStreet,
      propertyCity,
      propertyState: propertyState.toUpperCase(),
      propertyZip,
      googlePlaceId,
      propertyFormattedAddress,
      propertyValue,
      mortgageBalance,
      desiredFunds: desiredFunds.value,
      estimatedEquity,
      estimatedHeloc,
      estimatedHelocLow,
      estimatedHelocHigh,
      avmSource,
      propertySqft,
      propertyBeds,
      propertyBaths,
      propertyYearBuilt,
      propertyLatitude,
      propertyLongitude,
      estimatedRent,
      propertyValueLow,
      propertyValueHigh,
      mortgageBalanceLow,
      mortgageBalanceHigh,
      lastSaleDate,
      lastSalePrice,
      recordedMortgageAmount,
      actualMortgageBalance,
      useMortgageEstimate,
      fundingGoal,
      ownershipType,
      funnelStepCompleted,
      targetCltvPercent,
      investorScore,
      confidenceRating,
      valuationLastUpdated,
      creditScoreEstimate,
      firstName,
      lastName,
      email,
      phone: phone ? normalizePhoneForStorage(phone) : "",
      tcpaConsent,
      tcpaConsentAt,
      marketingOptIn: raw.marketingOptIn === true,
      sourceUrl: sourceUrl || undefined,
      queryParams: parseStringRecord(raw.queryParams),
      utm: parseStringRecord(raw.utm),
      createdAt,
      source: typeof raw.source === "string" && raw.source.trim() ? raw.source.trim() : LEAD_SOURCE,
    },
  };
}

function parseStringField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseRequiredNumber(
  value: unknown,
  label: string,
): { ok: true; value: number } | { ok: false; error: string } {
  const parsed = parseOptionalNumber(value);
  if (parsed == null) {
    return { ok: false, error: `A valid ${label} is required.` };
  }
  return { ok: true, value: parsed };
}

function parseOptionalNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function parseStringRecord(value: unknown): Record<string, string> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;

  const record: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (typeof entry === "string" && entry.trim()) {
      record[key] = entry.trim();
    }
  }

  return Object.keys(record).length > 0 ? record : undefined;
}
