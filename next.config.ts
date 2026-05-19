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
    ];
  },
};

export default nextConfig;
