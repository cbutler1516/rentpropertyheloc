import { ArticleCard, SectionHeader } from "./design-system";
import { RevealGroup } from "./reveal-group";
import { TrackedLink } from "./tracked-link";
import { getStrategicGeoMarkets } from "../lib/geo-markets";
import { stateMarkets } from "../lib/state-markets";

type LicensedMarketsRailProps = {
  title?: string;
  lead?: string;
  showMetros?: boolean;
};

export function LicensedMarketsRail({
  title = "Licensed markets",
  lead = "State and metro strategy pages tied to guides, videos, and clear next steps.",
  showMetros = true,
}: LicensedMarketsRailProps) {
  const metros = getStrategicGeoMarkets().slice(0, 6);

  return (
    <section className="section-flow relative border-t border-zinc-900/40">
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader eyebrow="Markets" title={title} lead={lead} />
        <RevealGroup
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={80}
        >
          {stateMarkets.slice(0, 6).map((state) => (
            <ArticleCard
              key={state.routeSlug}
              label={state.abbreviation}
              title={state.name}
              excerpt={state.heroLead}
              href={`/${state.routeSlug}`}
            />
          ))}
        </RevealGroup>
        {showMetros ? (
          <RevealGroup
            className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            stagger={80}
          >
            {metros.map((metro) => (
              <ArticleCard
                key={metro.slug}
                label={metro.regionLabel}
                title={metro.name}
                excerpt={metro.heroLead}
                href={`/markets/${metro.slug}`}
              />
            ))}
          </RevealGroup>
        ) : null}
        <div className="mt-10">
          <TrackedLink
            href="/markets"
            location="licensed_markets_rail"
            label="View all markets"
            className="text-sm font-medium text-zinc-400 hover:text-white"
          >
            View all licensed states and metros →
          </TrackedLink>
        </div>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
