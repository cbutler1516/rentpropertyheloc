import {
  HUBSPOT_CUSTOM_CONTACT_PROPERTIES,
  HUBSPOT_ROUTING_PROPERTY_KEYS,
} from "@/lib/crm/hubspot";
import { getHubSpotSyncLog } from "@/lib/crm/hubspot-sync-log";
import { isHubSpotConfigured } from "@/lib/leads/pipeline-health";

export type HubSpotPropertyMappingStatus = {
  property: string;
  category: "standard" | "routing" | "custom";
  requiredForFullSync: boolean;
};

export type HubSpotHealth = {
  configured: boolean;
  lastSuccessAt: string | null;
  lastFailureAt: string | null;
  lastTest: ReturnType<typeof getHubSpotSyncLog>["lastTest"];
  propertyMappings: HubSpotPropertyMappingStatus[];
  routingPropertyKeys: readonly string[];
  customPropertyCount: number;
};

export function getHubSpotPropertyMappings(): HubSpotPropertyMappingStatus[] {
  const routingSet = new Set<string>(HUBSPOT_ROUTING_PROPERTY_KEYS);

  return HUBSPOT_CUSTOM_CONTACT_PROPERTIES.map((property) => ({
    property,
    category: routingSet.has(property) ? "routing" : "custom",
    requiredForFullSync: routingSet.has(property),
  }));
}

export function getHubSpotHealth(): HubSpotHealth {
  const syncLog = getHubSpotSyncLog();

  return {
    configured: isHubSpotConfigured(),
    lastSuccessAt: syncLog.lastSuccessAt,
    lastFailureAt: syncLog.lastFailureAt,
    lastTest: syncLog.lastTest,
    propertyMappings: getHubSpotPropertyMappings(),
    routingPropertyKeys: HUBSPOT_ROUTING_PROPERTY_KEYS,
    customPropertyCount: HUBSPOT_CUSTOM_CONTACT_PROPERTIES.length,
  };
}
