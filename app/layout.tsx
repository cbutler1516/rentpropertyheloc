import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "./components/analytics";
import { JsonLd } from "./components/json-ld";
import { organizationSchema, webSiteSchema } from "./lib/structured-data";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  siteRobots,
} from "./lib/site-seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    "Know the move before you make it. Clear mortgage strategy for buyers, homeowners, agents, and investors.",
  openGraph: {
    title: SITE_NAME,
    description:
      "Know the move before you make it. Watch, read, and make the next mortgage decision with context.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} social preview`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Know the move before you make it. Watch, read, and make the next mortgage decision with context.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: siteRobots(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-white">
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
