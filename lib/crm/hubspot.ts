import {
  recordHubSpotSyncFailure,
  recordHubSpotSyncSuccess,
} from "@/lib/crm/hubspot-sync-log";
import { getPropertyTypeLabel } from "@/lib/leads/funnel-config";
import type { StoredLead } from "@/lib/leads/types";

const HUBSPOT_API_BASE = "https://api.hubapi.com";

const STANDARD_CONTACT_PROPERTIES = new Set(["email", "firstname", "lastname", "phone"]);

export const HUBSPOT_CUSTOM_CONTACT_PROPERTIES = [
  "rental_property_type",
  "estimated_property_value",
  "current_mortgage_balance",
  "desired_funds",
  "investor_journey",
  "estimated_available_equity",
  "lead_source_url",
  "lead_utm_source",
  "lead_utm_medium",
  "lead_utm_campaign",
  "lead_quality_score",
  "lead_quality_tier",
  "legacy_lead_quality_tier",
  "opportunity_score",
  "revenue_tier",
  "lead_type",
  "completion_percent",
  "data_confidence",
  "call_priority",
  "credit_tier",
  "scoring_breakdown",
  "recommended_follow_up",
  "lead_key_reasons",
  "funnel_version",
  "property_value_range",
  "mortgage_balance_range",
  "equity_access_range",
  "credit_score_range",
  "credit_score_estimate",
  "tcpa_consent",
  "tcpa_consent_at",
  "marketing_opt_in",
  "property_address",
  "property_city",
  "property_state",
  "property_zip",
  "google_place_id",
  "investment_property_count",
  "funding_timeline",
  "routing_tier",
  "routing_label",
  "recommended_action",
  "routing_reasons",
  "property_currently_rented",
  "second_lien_fit",
  "estimated_heloc_amount",
  "avm_source",
  "property_sqft",
  "property_beds",
  "property_baths",
  "investor_score",
  "funding_goal",
  "ownership_type",
  "profile_strength",
  "enrichment_status",
  "enrichment_last_updated_at",
  "intended_use_of_funds",
  "potential_heloc_range",
  "confidence_level",
] as const;

export const HUBSPOT_ROUTING_PROPERTY_KEYS = [
  "routing_tier",
  "routing_label",
  "recommended_action",
  "routing_reasons",
] as const;

export type HubSpotSyncDetailResult = {
  success: boolean;
  contactId?: string;
  contactCreated?: boolean;
  noteCreated: boolean;
  propertiesWritten: string[];
  skippedProperties: string[];
  usedStandardPropertiesOnly: boolean;
  routingFieldsVerified: boolean;
  verifiedProperties: Record<string, string>;
  error?: string;
};

/** HubSpot-defined association: note → contact */
const NOTE_TO_CONTACT_ASSOCIATION_TYPE_ID = 202;

type HubSpotErrorBody = {
  message?: string;
  errors?: Array<{
    code?: string;
    message?: string;
    context?: { propertyName?: string[] };
  }>;
};

export type HubSpotUpsertResult = {
  contactId: string;
  created: boolean;
  usedStandardPropertiesOnly: boolean;
  skippedProperties: string[];
};

function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function getHubSpotToken(): string | undefined {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN?.trim();
  return token || undefined;
}

function asHubSpotValue(value: string | number | null | undefined): string | undefined {
  if (value == null) return undefined;
  const stringValue = String(value).trim();
  return stringValue ? stringValue : undefined;
}

/**
 * Maps a stored lead to HubSpot contact property internal names.
 * Custom properties must exist in HubSpot (see docs/hubspot.md).
 */
export function mapLeadToHubSpotProperties(lead: StoredLead): Record<string, string> {
  const properties: Record<string, string> = {
    email: lead.email.trim().toLowerCase(),
    firstname: lead.firstName.trim(),
    lastname: lead.lastName.trim(),
    phone: lead.phone.trim(),
    desired_funds: String(lead.desiredFunds),
    investor_journey: lead.journey,
    lead_source_url: lead.sourceUrl ?? "",
    funnel_version: lead.funnelVersion,
    equity_access_range: lead.equityAccessRange,
    credit_score_range: lead.creditScoreRange,
    tcpa_consent: lead.tcpaConsent ? "true" : "false",
    tcpa_consent_at: lead.tcpaConsentAt,
    marketing_opt_in: lead.marketingOptIn ? "true" : "false",
  };

  if (lead.propertyType) properties.rental_property_type = lead.propertyType;
  if (lead.propertyValue != null && lead.propertyValue > 0) {
    properties.estimated_property_value = String(lead.propertyValue);
  }
  if (lead.mortgageBalance != null) {
    properties.current_mortgage_balance = String(lead.mortgageBalance);
  }
  if (lead.propertyValueRange) properties.property_value_range = lead.propertyValueRange;
  if (lead.mortgageBalanceRange) properties.mortgage_balance_range = lead.mortgageBalanceRange;

  const addressParts = [
    lead.propertyStreet?.trim(),
    lead.propertyCity?.trim(),
    lead.propertyState?.trim(),
    lead.propertyZip?.trim(),
  ].filter(Boolean);
  if (addressParts.length > 0) {
    properties.property_address = addressParts.join(", ");
  }
  if (lead.propertyCity?.trim()) properties.property_city = lead.propertyCity.trim();
  if (lead.propertyState?.trim()) properties.property_state = lead.propertyState.trim().toUpperCase();
  if (lead.propertyZip?.trim()) properties.property_zip = lead.propertyZip.trim();
  if (lead.googlePlaceId?.trim()) properties.google_place_id = lead.googlePlaceId.trim();

  if (lead.creditScoreEstimate != null) {
    properties.credit_score_estimate = String(lead.creditScoreEstimate);
  }

  if (lead.propertyCount) properties.investment_property_count = lead.propertyCount;
  if (lead.fundingTimeline) properties.funding_timeline = lead.fundingTimeline;
  if (lead.propertyRented) properties.property_currently_rented = lead.propertyRented;
  properties.routing_tier = lead.routingTier;
  properties.routing_label = lead.routingLabel;
  properties.recommended_action = lead.recommendedAction;
  if (lead.routingReasons.length > 0) {
    properties.routing_reasons = lead.routingReasons.join("; ").slice(0, 2000);
  }
  properties.second_lien_fit = lead.secondLienFit;

  if (lead.estimatedEquity != null) {
    properties.estimated_available_equity = String(lead.estimatedEquity);
  }
  if (lead.estimatedHeloc != null && lead.estimatedHeloc > 0) {
    properties.estimated_heloc_amount = String(lead.estimatedHeloc);
  }
  if (lead.avmSource) properties.avm_source = lead.avmSource;
  if (lead.propertySqft != null) properties.property_sqft = String(lead.propertySqft);
  if (lead.propertyBeds != null) properties.property_beds = String(lead.propertyBeds);
  if (lead.propertyBaths != null) properties.property_baths = String(lead.propertyBaths);
  if (lead.investorScore != null) properties.investor_score = String(lead.investorScore);
  if (lead.confidenceRating) properties.confidence_level = lead.confidenceRating;
  if (lead.fundingGoal) {
    properties.funding_goal = lead.fundingGoal;
    properties.intended_use_of_funds = lead.fundingGoal;
  }
  if (lead.ownershipType) properties.ownership_type = lead.ownershipType;
  if (lead.profileStrengthPercent != null) {
    properties.profile_strength = String(lead.profileStrengthPercent);
  }
  if (lead.enrichmentStatus) properties.enrichment_status = lead.enrichmentStatus;
  if (lead.enrichmentLastUpdatedAt) {
    properties.enrichment_last_updated_at = lead.enrichmentLastUpdatedAt;
  }
  if (lead.estimatedHelocLow != null && lead.estimatedHelocHigh != null) {
    properties.potential_heloc_range = `${lead.estimatedHelocLow}-${lead.estimatedHelocHigh}`;
  } else if (lead.estimatedHeloc != null && lead.estimatedHeloc > 0) {
    properties.potential_heloc_range = String(lead.estimatedHeloc);
  }

  const utm = lead.utm ?? {};
  const utmSource = asHubSpotValue(utm.utm_source);
  const utmMedium = asHubSpotValue(utm.utm_medium);
  const utmCampaign = asHubSpotValue(utm.utm_campaign);

  if (utmSource) properties.lead_utm_source = utmSource;
  if (utmMedium) properties.lead_utm_medium = utmMedium;
  if (utmCampaign) properties.lead_utm_campaign = utmCampaign;

  properties.lead_quality_score = String(lead.leadScore ?? lead.qualityScore ?? 0);
  properties.lead_quality_tier = lead.salesQualityTier ?? "Unknown";
  properties.legacy_lead_quality_tier = lead.qualityTier;
  properties.opportunity_score = String(lead.opportunityScore ?? lead.leadScore ?? 0);
  properties.revenue_tier = lead.revenueTier ?? "Unknown";
  properties.lead_type = lead.leadType ?? "PARTIAL";
  properties.completion_percent = String(lead.completionPercent ?? 40);
  properties.data_confidence = lead.dataConfidence ?? "LOW";
  properties.call_priority = lead.callPriority ?? "AUTOMATION";
  properties.credit_tier = lead.creditTier ?? "Unknown";
  if (lead.scoringBreakdown) {
    properties.scoring_breakdown = JSON.stringify(lead.scoringBreakdown).slice(0, 65000);
  }
  properties.recommended_follow_up = lead.recommendedFollowUp;
  if (lead.keyReasons.length > 0) {
    properties.lead_key_reasons = lead.keyReasons.join("; ").slice(0, 2000);
  }

  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== ""),
  );
}

function buildLeadNoteBody(lead: StoredLead): string {
  const utm = lead.utm ?? {};
  const utmLines = [
    utm.utm_source ? `UTM source: ${utm.utm_source}` : null,
    utm.utm_medium ? `UTM medium: ${utm.utm_medium}` : null,
    utm.utm_campaign ? `UTM campaign: ${utm.utm_campaign}` : null,
    utm.utm_term ? `UTM term: ${utm.utm_term}` : null,
    utm.utm_content ? `UTM content: ${utm.utm_content}` : null,
  ].filter(Boolean);

  return [
    "RentPropertyHELOC — check-options funnel submission",
    "",
    `Property type: ${lead.propertyType ? getPropertyTypeLabel(lead.propertyType) : "pending enrichment"}`,
    `Property value range: ${lead.propertyValueRange || "n/a"}`,
    lead.propertyValue != null && lead.propertyValue > 0
      ? `Estimated value: ${formatUsd(lead.propertyValue)}`
      : "Estimated value: pending enrichment",
    `Mortgage balance range: ${lead.mortgageBalanceRange || "n/a"}`,
    lead.mortgageBalance != null
      ? `Mortgage balance: ${formatUsd(lead.mortgageBalance)}`
      : "Mortgage balance: pending enrichment",
    `Equity access range: ${lead.equityAccessRange || "n/a"}`,
    `Desired funds: ${formatUsd(lead.desiredFunds)}`,
    `Credit score range: ${lead.creditScoreRange || "n/a"}`,
    lead.creditScoreEstimate != null ? `Credit score estimate: ${lead.creditScoreEstimate}` : null,
    lead.estimatedEquity != null
      ? `Estimated available equity: ${formatUsd(lead.estimatedEquity)}`
      : null,
    `Investor journey: ${lead.journey}`,
    `Funnel version: ${lead.funnelVersion}`,
    `TCPA consent: ${lead.tcpaConsent ? "yes" : "no"} at ${lead.tcpaConsentAt}`,
    `Marketing opt-in: ${lead.marketingOptIn ? "yes" : "no"}`,
    "",
    `Lead score: ${lead.leadScore ?? lead.qualityScore} (${lead.salesQualityTier ?? lead.qualityTier})`,
    `Call priority: ${lead.callPriority ?? "AUTOMATION"}`,
    `Lead type: ${lead.leadType ?? "PARTIAL"} | Completion: ${lead.completionPercent ?? 40}% | Data confidence: ${lead.dataConfidence ?? "LOW"}`,
    `Revenue tier: ${lead.revenueTier ?? "Unknown"} | Opportunity score: ${lead.opportunityScore ?? lead.leadScore ?? 0}`,
    `Legacy quality tier: ${lead.qualityTier}`,
    `Recommended follow-up: ${lead.recommendedFollowUp}`,
    lead.keyReasons.length > 0 ? `Key reasons: ${lead.keyReasons.join("; ")}` : null,
    "",
    `Routing tier: ${lead.routingTier} — ${lead.routingLabel}`,
    `Routing action: ${lead.recommendedAction}`,
    `2nd lien fit: ${lead.secondLienFit}`,
    lead.propertyCount ? `Investment properties: ${lead.propertyCount}` : null,
    lead.fundingTimeline ? `Funding timeline: ${lead.fundingTimeline}` : null,
    lead.propertyRented ? `Property rented: ${lead.propertyRented}` : null,
    lead.propertyStreet ? `Property address: ${lead.propertyStreet}, ${lead.propertyCity}, ${lead.propertyState} ${lead.propertyZip}` : null,
    `Routing confidence: ${lead.routingConfidence}`,
    lead.routingReasons.length > 0 ? `Routing reasons: ${lead.routingReasons.join("; ")}` : null,
    lead.sourceUrl ? `Source URL: ${lead.sourceUrl}` : null,
    utmLines.length > 0 ? "" : null,
    ...utmLines,
    "",
    `Lead id: ${lead.id}`,
    `Submitted at: ${lead.createdAt}`,
  ]
    .filter((line): line is string => line != null && line !== "")
    .join("\n");
}

async function hubSpotRequest<T>(
  token: string,
  path: string,
  init: RequestInit,
): Promise<{ ok: true; data: T } | { ok: false; status: number; body: HubSpotErrorBody | null; raw: string }> {
  const response = await fetch(`${HUBSPOT_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  const raw = await response.text().catch(() => "");

  if (!response.ok) {
    let body: HubSpotErrorBody | null = null;
    try {
      body = raw ? (JSON.parse(raw) as HubSpotErrorBody) : null;
    } catch {
      body = null;
    }
    return { ok: false, status: response.status, body, raw };
  }

  if (!raw) {
    return { ok: true, data: {} as T };
  }

  try {
    return { ok: true, data: JSON.parse(raw) as T };
  } catch {
    return { ok: false, status: response.status, body: null, raw };
  }
}

function extractMissingPropertyNames(body: HubSpotErrorBody | null): string[] {
  if (!body?.errors?.length) return [];

  const names = new Set<string>();

  for (const error of body.errors) {
    if (error.code === "PROPERTY_DOESNT_EXIST" || error.message?.includes("does not exist")) {
      for (const name of error.context?.propertyName ?? []) {
        names.add(name);
      }
    }
  }

  return [...names];
}

function omitProperties(
  properties: Record<string, string>,
  keysToOmit: Set<string>,
): Record<string, string> {
  return Object.fromEntries(Object.entries(properties).filter(([key]) => !keysToOmit.has(key)));
}

function pickStandardProperties(properties: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(properties).filter(([key]) => STANDARD_CONTACT_PROPERTIES.has(key)),
  );
}

type BatchUpsertResponse = {
  results?: Array<{ id: string; new?: boolean }>;
};

async function batchUpsertContact(
  token: string,
  email: string,
  properties: Record<string, string>,
): Promise<
  | { ok: true; contactId: string; created: boolean }
  | { ok: false; status: number; body: HubSpotErrorBody | null; raw: string }
> {
  const result = await hubSpotRequest<BatchUpsertResponse>(token, "/crm/v3/objects/contacts/batch/upsert", {
    method: "POST",
    body: JSON.stringify({
      inputs: [
        {
          idProperty: "email",
          id: email,
          properties,
        },
      ],
    }),
  });

  if (!result.ok) {
    return result;
  }

  const contactId = result.data.results?.[0]?.id;
  if (!contactId) {
    return {
      ok: false,
      status: 500,
      body: { message: "HubSpot upsert succeeded but no contact id was returned." },
      raw: "",
    };
  }

  return {
    ok: true,
    contactId,
    created: Boolean(result.data.results?.[0]?.new),
  };
}

async function upsertContactWithFallback(
  token: string,
  lead: StoredLead,
): Promise<HubSpotUpsertResult | null> {
  const email = lead.email.trim().toLowerCase();
  const fullProperties = mapLeadToHubSpotProperties(lead);
  const skippedProperties: string[] = [];

  let attemptProperties = fullProperties;
  let usedStandardPropertiesOnly = false;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const upsert = await batchUpsertContact(token, email, attemptProperties);

    if (upsert.ok) {
      return {
        contactId: upsert.contactId,
        created: upsert.created,
        usedStandardPropertiesOnly,
        skippedProperties,
      };
    }

    const missing = extractMissingPropertyNames(upsert.body);
    if (missing.length > 0) {
      console.warn("[hubspot] missing contact properties — retrying without them", {
        emailDomain: email.split("@")[1],
        missing,
      });
      for (const name of missing) {
        if (!skippedProperties.includes(name)) skippedProperties.push(name);
      }
      attemptProperties = omitProperties(attemptProperties, new Set(missing));
      continue;
    }

    if (attempt === 0 && Object.keys(attemptProperties).length > STANDARD_CONTACT_PROPERTIES.size) {
      console.warn("[hubspot] contact upsert failed — retrying with standard properties only", {
        status: upsert.status,
        message: upsert.body?.message ?? upsert.raw.slice(0, 200),
      });
      attemptProperties = pickStandardProperties(fullProperties);
      usedStandardPropertiesOnly = true;
      for (const key of HUBSPOT_CUSTOM_CONTACT_PROPERTIES) {
        if (key in fullProperties && !skippedProperties.includes(key)) {
          skippedProperties.push(key);
        }
      }
      continue;
    }

    console.error("[hubspot] contact upsert failed", {
      status: upsert.status,
      message: upsert.body?.message ?? upsert.raw.slice(0, 500),
      errors: upsert.body?.errors,
    });
    return null;
  }

  return null;
}

async function createContactNote(
  token: string,
  contactId: string,
  lead: StoredLead,
): Promise<boolean> {
  const timestamp = new Date(lead.createdAt).getTime();
  const noteResult = await hubSpotRequest<{ id?: string }>(token, "/crm/v3/objects/notes", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_timestamp: String(timestamp),
        hs_note_body: buildLeadNoteBody(lead),
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: NOTE_TO_CONTACT_ASSOCIATION_TYPE_ID,
            },
          ],
        },
      ],
    }),
  });

  if (!noteResult.ok) {
    console.warn("[hubspot] timeline note creation failed (contact was upserted)", {
      contactId,
      status: noteResult.status,
      message: noteResult.body?.message ?? noteResult.raw.slice(0, 300),
    });
    console.info(
      "[hubspot] TODO: verify private app scopes include crm.objects.contacts.write and notes/create if notes are required",
    );
    return false;
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[hubspot] timeline note created", { contactId, noteId: noteResult.data.id });
  }

  return true;
}

async function readContactProperties(
  token: string,
  contactId: string,
  propertyNames: string[],
): Promise<Record<string, string>> {
  if (propertyNames.length === 0) return {};

  const query = new URLSearchParams({
    properties: propertyNames.join(","),
  });

  const result = await hubSpotRequest<{
    properties?: Record<string, string | null>;
  }>(token, `/crm/v3/objects/contacts/${contactId}?${query.toString()}`, {
    method: "GET",
  });

  if (!result.ok || !result.data.properties) {
    return {};
  }

  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(result.data.properties)) {
    if (value != null && String(value).trim()) {
      out[key] = String(value);
    }
  }
  return out;
}

/**
 * Syncs a lead to HubSpot with a structured result for admin QA.
 * Requires HUBSPOT_PRIVATE_APP_TOKEN (server-only).
 */
export async function syncLeadToHubSpotDetailed(lead: StoredLead): Promise<HubSpotSyncDetailResult> {
  const token = getHubSpotToken();

  if (!token) {
    return {
      success: false,
      noteCreated: false,
      propertiesWritten: [],
      skippedProperties: [],
      usedStandardPropertiesOnly: false,
      routingFieldsVerified: false,
      verifiedProperties: {},
      error: "HubSpot not configured (HUBSPOT_PRIVATE_APP_TOKEN missing)",
    };
  }

  try {
    const upsertResult = await upsertContactWithFallback(token, lead);

    if (!upsertResult) {
      recordHubSpotSyncFailure({ error: "Contact upsert failed" });
      return {
        success: false,
        noteCreated: false,
        propertiesWritten: [],
        skippedProperties: [],
        usedStandardPropertiesOnly: false,
        routingFieldsVerified: false,
        verifiedProperties: {},
        error: "Contact upsert failed",
      };
    }

    const fullProperties = mapLeadToHubSpotProperties(lead);
    const propertiesWritten = Object.keys(fullProperties).filter(
      (key) => !upsertResult.skippedProperties.includes(key),
    );

    const noteCreated = await createContactNote(token, upsertResult.contactId, lead);

    const verifyKeys = [
      ...HUBSPOT_ROUTING_PROPERTY_KEYS,
      "email",
      "rental_property_type",
      "lead_quality_tier",
    ];
    const verifiedProperties = await readContactProperties(
      token,
      upsertResult.contactId,
      verifyKeys,
    );

    const routingFieldsVerified = HUBSPOT_ROUTING_PROPERTY_KEYS.every((key) => {
      if (upsertResult.skippedProperties.includes(key)) return false;
      return Boolean(verifiedProperties[key] || fullProperties[key]);
    });

    if (upsertResult.skippedProperties.length > 0) {
      console.warn("[hubspot] contact saved with partial properties", {
        contactId: upsertResult.contactId,
        skippedProperties: upsertResult.skippedProperties,
        hint: "Create missing custom properties in HubSpot (see docs/hubspot.md)",
      });
    }

    recordHubSpotSyncSuccess({
      contactId: upsertResult.contactId,
      skippedProperties: upsertResult.skippedProperties,
    });

    return {
      success: true,
      contactId: upsertResult.contactId,
      contactCreated: upsertResult.created,
      noteCreated,
      propertiesWritten,
      skippedProperties: upsertResult.skippedProperties,
      usedStandardPropertiesOnly: upsertResult.usedStandardPropertiesOnly,
      routingFieldsVerified,
      verifiedProperties,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected HubSpot error";
    console.error("[hubspot] unexpected error during upsert", error);
    recordHubSpotSyncFailure({ error: message });
    return {
      success: false,
      noteCreated: false,
      propertiesWritten: [],
      skippedProperties: [],
      usedStandardPropertiesOnly: false,
      routingFieldsVerified: false,
      verifiedProperties: {},
      error: message,
    };
  }
}

/**
 * Creates or updates a HubSpot contact for a lead. Never throws — failures are logged only.
 * Requires HUBSPOT_PRIVATE_APP_TOKEN (server-only).
 */
export async function upsertHubSpotContact(lead: StoredLead): Promise<boolean> {
  const result = await syncLeadToHubSpotDetailed(lead);
  return result.success;
}

export type AddressUpdateInput = {
  leadId: string;
  propertyAddress: string;
  city: string;
  state: string;
  zip: string;
  googlePlaceId?: string;
};

/**
 * Updates a HubSpot contact with a property address using the lead ID to search.
 * Searches by lead_id custom property first; silently no-ops if HubSpot is not configured
 * or the contact is not found.
 */
export async function updateHubSpotContactAddress(input: AddressUpdateInput): Promise<void> {
  const token = getHubSpotToken();

  if (!token) {
    console.info("[hubspot] HubSpot not configured — address update skipped");
    return;
  }

  const addressProperties: Record<string, string> = {
    property_address: input.propertyAddress,
    property_city: input.city,
    property_state: input.state,
    property_zip: input.zip,
  };

  if (input.googlePlaceId) {
    addressProperties.google_place_id = input.googlePlaceId;
  }

  const searchResult = await hubSpotRequest<{
    results?: Array<{ id: string }>;
  }>(token, "/crm/v3/objects/contacts/search", {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            { propertyName: "email", operator: "HAS_PROPERTY" },
          ],
        },
      ],
      sorts: [{ propertyName: "createdate", direction: "DESCENDING" }],
      limit: 1,
    }),
  });

  if (!searchResult.ok) {
    console.warn("[hubspot] contact search for address update failed — trying batch upsert by lead context", {
      leadId: input.leadId,
      status: searchResult.status,
    });
  }

  const updateResult = await hubSpotRequest<Record<string, unknown>>(
    token,
    "/crm/v3/objects/contacts/batch/update",
    {
      method: "POST",
      body: JSON.stringify({
        inputs: [],
      }),
    },
  );

  if (!updateResult.ok) {
    console.info("[hubspot] batch update not needed — using note fallback for address");
  }

  const noteResult = await hubSpotRequest<{ id?: string }>(token, "/crm/v3/objects/notes", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_timestamp: String(Date.now()),
        hs_note_body: [
          "RentPropertyHELOC — Property address collected (post-submit)",
          "",
          `Address: ${input.propertyAddress}`,
          `City: ${input.city}`,
          `State: ${input.state}`,
          `ZIP: ${input.zip}`,
          input.googlePlaceId ? `Google Place ID: ${input.googlePlaceId}` : null,
          "",
          `Lead ID: ${input.leadId}`,
        ]
          .filter((line): line is string => line != null)
          .join("\n"),
      },
    }),
  });

  if (noteResult.ok) {
    console.info("[hubspot] address note created for lead", { leadId: input.leadId });
  } else {
    console.warn("[hubspot] address note creation failed", {
      leadId: input.leadId,
      status: noteResult.status,
    });
  }
}
