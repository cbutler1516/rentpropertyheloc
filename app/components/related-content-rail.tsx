import { ArticleCard, SectionHeader } from "./design-system";
import { TrackedLink } from "./tracked-link";
import { getGeoMarketBySlug } from "../lib/geo-markets";
import {
  getScenarioBySlug,
  scenarioRegistry,
  type ScenarioAudience,
} from "../lib/scenario-registry";
import { getSocialPostBySlug } from "../lib/social-posts";
import { getStateMarketByRouteSlug } from "../lib/state-markets";

type RelatedContentRailProps = {
  title?: string;
  lead?: string;
  scenarioSlugs?: string[];
  geoSlugs?: string[];
  stateRouteSlugs?: string[];
  videoSlugs?: string[];
  guideLinks?: Array<{ label: string; title: string; href: string }>;
  audience?: ScenarioAudience;
};

export function RelatedContentRail({
  title = "Related next steps",
  lead = "Scenarios, guides, and videos connected to this topic.",
  scenarioSlugs = [],
  geoSlugs = [],
  stateRouteSlugs = [],
  videoSlugs = [],
  guideLinks = [],
  audience,
}: RelatedContentRailProps) {
  const scenarios = scenarioSlugs
    .map((slug) => getScenarioBySlug(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const markets = geoSlugs
    .map((slug) => getGeoMarketBySlug(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const states = stateRouteSlugs
    .map((slug) => getStateMarketByRouteSlug(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));
  const videos = videoSlugs
    .map((slug) => getSocialPostBySlug(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const audienceScenarios = audience
    ? scenarioRegistry.filter((entry) => entry.audience === audience).slice(0, 3)
    : [];

  const hasContent =
    scenarios.length > 0 ||
    markets.length > 0 ||
    states.length > 0 ||
    videos.length > 0 ||
    guideLinks.length > 0 ||
    audienceScenarios.length > 0;

  if (!hasContent) return null;

  return (
    <section className="section-flow relative border-t border-zinc-900/40">
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader title={title} lead={lead} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <ArticleCard
              key={scenario.slug}
              label="Scenario"
              title={scenario.title}
              excerpt={scenario.emotionalHook}
              href={scenario.href}
            />
          ))}
          {states.map((state) => (
            <ArticleCard
              key={state.routeSlug}
              label={`${state.name} · Licensed`}
              title={`${state.name} mortgage strategy`}
              excerpt={state.heroLead}
              href={`/${state.routeSlug}`}
            />
          ))}
          {markets.map((market) => (
            <ArticleCard
              key={market.slug}
              label={market.regionLabel}
              title={market.name}
              excerpt={market.heroLead}
              href={`/geo/${market.slug}`}
            />
          ))}
          {videos.map((video) => (
            <TrackedLink
              key={video.slug}
              href={`/videos/${video.slug}`}
              location="related_content_video"
              label={video.title}
              className="card-lift group relative flex h-full flex-col border border-zinc-900/80 bg-[#050505] p-9"
            >
              <span className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                {video.platform}
              </span>
              <h3 className="mt-7 text-2xl font-semibold text-white">{video.title}</h3>
              <p className="mt-5 flex-1 text-zinc-500">{video.shortSummary}</p>
              <span className="mt-10 text-sm font-medium text-white">Watch →</span>
            </TrackedLink>
          ))}
          {guideLinks.map((guide) => (
            <ArticleCard
              key={guide.href}
              label={guide.label}
              title={guide.title}
              excerpt="Read the guide for deeper context."
              href={guide.href}
            />
          ))}
          {scenarios.length === 0 &&
            audienceScenarios.map((scenario) => (
              <ArticleCard
                key={scenario.slug}
                label="Scenario"
                title={scenario.title}
                excerpt={scenario.description}
                href={scenario.href}
              />
            ))}
        </div>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
