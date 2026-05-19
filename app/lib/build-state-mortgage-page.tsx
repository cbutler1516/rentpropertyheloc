import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StateLandingPage } from "../components/state-landing-page";
import {
  createStateMarketMetadata,
  getStateMarketByRouteSlug,
} from "./state-markets";

export function buildStateMortgagePage(routeSlug: string) {
  const market = getStateMarketByRouteSlug(routeSlug);

  if (!market) {
    throw new Error(`Unknown state mortgage route: ${routeSlug}`);
  }

  const metadata: Metadata = createStateMarketMetadata(market);

  function Page() {
    const resolved = getStateMarketByRouteSlug(routeSlug);
    if (!resolved) notFound();
    return <StateLandingPage market={resolved} />;
  }

  return { metadata, default: Page };
}
