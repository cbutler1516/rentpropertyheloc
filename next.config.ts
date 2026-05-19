import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/geo/washington-state",
        destination: "/washington-mortgage",
        permanent: true,
      },
      {
        source: "/geo/luxury-jumbo",
        destination: "/washington-mortgage",
        permanent: true,
      },
      {
        source: "/geo/green-lake",
        destination: "/markets/seattle",
        permanent: true,
      },
      {
        source: "/scenarios/:slug",
        destination: "/guides/:slug",
        permanent: true,
      },
      {
        source: "/scenarios",
        destination: "/guides",
        permanent: true,
      },
      {
        source: "/geo/:slug",
        destination: "/markets/:slug",
        permanent: true,
      },
      {
        source: "/geo",
        destination: "/markets",
        permanent: true,
      },
      {
        source: "/videos/buyer-readiness-before-search",
        destination: "/videos/buyer-preapproval-first-step",
        permanent: true,
      },
      {
        source: "/videos/mortgage-strategy-clear-idea",
        destination: "/videos/buyer-buydown-and-arm-options",
        permanent: true,
      },
      {
        source: "/videos/market-context-without-noise",
        destination: "/videos/homeowner-refinance-break-even-roi",
        permanent: true,
      },
      {
        source: "/videos/agent-financing-conversation",
        destination: "/videos/buyer-prequalified-vs-preapproved",
        permanent: true,
      },
      {
        source: "/videos/creative-mortgage-media-test",
        destination: "/videos/market-strategy-over-rate-noise",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
