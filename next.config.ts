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
        destination: "/geo/seattle",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
