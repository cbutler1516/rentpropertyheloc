"use client";

import type { TrackingConfig } from "@/lib/analytics/tracking-config";
import Script from "next/script";

type AnalyticsScriptsProps = {
  config: TrackingConfig;
};

/**
 * Third-party measurement scripts — lazyOnload to avoid blocking render.
 * Page views are sent only via AnalyticsPageView (no duplicate Meta PageView on init).
 */
export function AnalyticsScripts({ config }: AnalyticsScriptsProps) {
  const primaryGtagId = config.ga4MeasurementId ?? config.googleAdsId;

  return (
    <>
      {primaryGtagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${primaryGtagId}`}
            strategy="lazyOnload"
          />
          <Script id="theloanplaybook-gtag-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              ${config.ga4MeasurementId ? `gtag('config', '${config.ga4MeasurementId}', { send_page_view: false });` : ""}
              ${config.googleAdsId && config.googleAdsId !== config.ga4MeasurementId ? `gtag('config', '${config.googleAdsId}');` : ""}
            `}
          </Script>
        </>
      ) : null}

      {config.metaPixelId ? (
        <Script id="theloanplaybook-meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${config.metaPixelId}');
          `}
        </Script>
      ) : null}

      {config.clarityProjectId ? (
        <Script id="theloanplaybook-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${config.clarityProjectId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
