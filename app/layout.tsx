import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { GoogleAdsScripts } from "@/components/analytics/google-ads-scripts";
import { HashScrollHandler } from "@/components/layout/hash-scroll-handler";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BRAND, BRAND_ASSETS, LOGO_LIGHT_ASPECT } from "@/lib/brand";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | HELOC & Home Equity Review`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: BRAND.headline,
    description: SITE_TAGLINE,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: BRAND_ASSETS.light,
        width: LOGO_LIGHT_ASPECT.width,
        height: LOGO_LIGHT_ASPECT.height,
        alt: BRAND.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.headline,
    description: SITE_TAGLINE,
    images: [BRAND_ASSETS.light],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-surface-50 text-ink">
        <GoogleAdsScripts />
        <OrganizationJsonLd />
        <AnalyticsProvider>
          <HashScrollHandler />
          <SiteHeader />
          <main className="main-with-sticky-cta flex-1 max-md:overflow-x-clip">{children}</main>
          <SiteFooter />
          <MobileStickyCta />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
