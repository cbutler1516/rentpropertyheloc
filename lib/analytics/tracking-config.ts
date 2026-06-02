import { getLastTestAnalyticsResult } from "@/lib/analytics/last-test-analytics";
import type { LastTestAnalyticsResult } from "@/lib/analytics/last-test-analytics";

export type TrackingConfig = {
  ga4MeasurementId: string | null;
  metaPixelId: string | null;
  googleAdsId: string | null;
  googleAdsLeadConversionLabel: string | null;
  clarityProjectId: string | null;
};

export type AnalyticsEnvVisibility = {
  nextPublicGaId: boolean;
  nextPublicGa4MeasurementId: boolean;
  nextPublicMetaPixelId: boolean;
  nextPublicGoogleAdsId: boolean;
  nextPublicGoogleAdsLeadConversionLabel: boolean;
  nextPublicClarityProjectId: boolean;
};

export type AnalyticsHealth = {
  ga4Configured: boolean;
  metaPixelConfigured: boolean;
  googleAdsConfigured: boolean;
  googleAdsConversionConfigured: boolean;
  clarityConfigured: boolean;
  envVars: AnalyticsEnvVisibility;
  lastTestAnalytics: LastTestAnalyticsResult | null;
};

function envIsSet(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

function readPublicEnv(...names: string[]): string | null {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return null;
}

export function getTrackingConfig(): TrackingConfig {
  return {
    ga4MeasurementId: readPublicEnv(
      "NEXT_PUBLIC_GA4_MEASUREMENT_ID",
      "NEXT_PUBLIC_GA_ID",
    ),
    metaPixelId: readPublicEnv("NEXT_PUBLIC_META_PIXEL_ID"),
    googleAdsId: readPublicEnv("NEXT_PUBLIC_GOOGLE_ADS_ID"),
    googleAdsLeadConversionLabel: readPublicEnv("NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL"),
    clarityProjectId: readPublicEnv("NEXT_PUBLIC_CLARITY_PROJECT_ID"),
  };
}

export function getAnalyticsEnvVisibility(): AnalyticsEnvVisibility {
  return {
    nextPublicGaId: envIsSet("NEXT_PUBLIC_GA_ID"),
    nextPublicGa4MeasurementId: envIsSet("NEXT_PUBLIC_GA4_MEASUREMENT_ID"),
    nextPublicMetaPixelId: envIsSet("NEXT_PUBLIC_META_PIXEL_ID"),
    nextPublicGoogleAdsId: envIsSet("NEXT_PUBLIC_GOOGLE_ADS_ID"),
    nextPublicGoogleAdsLeadConversionLabel: envIsSet("NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL"),
    nextPublicClarityProjectId: envIsSet("NEXT_PUBLIC_CLARITY_PROJECT_ID"),
  };
}

export function getAnalyticsHealth(): AnalyticsHealth {
  const config = getTrackingConfig();

  return {
    ga4Configured: Boolean(config.ga4MeasurementId),
    metaPixelConfigured: Boolean(config.metaPixelId),
    googleAdsConfigured: Boolean(config.googleAdsId),
    googleAdsConversionConfigured: Boolean(
      config.googleAdsId && config.googleAdsLeadConversionLabel,
    ),
    clarityConfigured: Boolean(config.clarityProjectId),
    envVars: getAnalyticsEnvVisibility(),
    lastTestAnalytics: getLastTestAnalyticsResult(),
  };
}

export function hasAnyAnalyticsProvider(config: TrackingConfig = getTrackingConfig()): boolean {
  return Boolean(
    config.ga4MeasurementId ||
      config.metaPixelId ||
      config.googleAdsId ||
      config.clarityProjectId,
  );
}
