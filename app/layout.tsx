import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "./components/analytics";
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
  metadataBase: new URL("https://www.theloanplaybook.com"),
  title: "The Loan Playbook",
  description:
    "A premium mortgage strategy and media platform for buyers, agents, and real estate partners.",
  openGraph: {
    title: "The Loan Playbook",
    description:
      "Mortgage strategy built like premium media. Watch, read, and make the next move with context.",
    images: [
      {
        url: "/loan-playbook-social-preview.svg",
        width: 1200,
        height: 630,
        alt: "The Loan Playbook social preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Loan Playbook",
    description:
      "Mortgage strategy built like premium media. Watch, read, and make the next move with context.",
    images: ["/loan-playbook-social-preview.svg"],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
