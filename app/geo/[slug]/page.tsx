import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  createGeoMetadata,
  GeoLandingPage,
} from "../../components/geo-landing-page";
import { geoMarkets, getGeoMarketBySlug } from "../../lib/geo-markets";

type GeoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return geoMarkets.map((market) => ({ slug: market.slug }));
}

export async function generateMetadata({
  params,
}: GeoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = getGeoMarketBySlug(slug);

  if (!market) {
    return { title: "Local Market | The Loan Playbook" };
  }

  return createGeoMetadata(market);
}

export default async function GeoMarketPage({ params }: GeoPageProps) {
  const { slug } = await params;
  const market = getGeoMarketBySlug(slug);

  if (!market) notFound();

  return <GeoLandingPage market={market} />;
}
