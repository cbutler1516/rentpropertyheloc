import { ArticleCard, SectionHeader } from "./design-system";
import { RevealGroup } from "./reveal-group";
import { TrackedLink } from "./tracked-link";
import {
  getFeaturedContent,
  type ContentSurface,
  type FeaturedContentItem,
} from "../lib/content-engine";

type FeaturedContentSectionProps = {
  surface: ContentSurface;
  title?: string;
  lead?: string;
  eyebrow?: string;
  limit?: number;
  /** Light band for visual rhythm between dark sections */
  tone?: "dark" | "light";
};

function FeaturedCard({ item, tone }: { item: FeaturedContentItem; tone: "dark" | "light" }) {
  const cardClass =
    tone === "light"
      ? "card-lift group relative flex h-full flex-col rounded-lg border border-zinc-200/90 bg-white p-6 shadow-sm"
      : "card-lift group relative flex h-full flex-col border border-zinc-900/80 bg-[#050505] p-6";

  if (item.type === "video") {
    return (
      <TrackedLink
        href={item.href}
        location={`featured_${item.type}`}
        label={item.title}
        className={cardClass}
      >
        <span
          className={`font-mono text-[10px] tracking-[0.28em] uppercase ${
            tone === "light" ? "text-[#6d28d9]" : "text-[#7c3aed]"
          }`}
        >
          Video
        </span>
        <h3
          className={`mt-4 text-lg font-semibold tracking-[-0.02em] md:text-xl ${
            tone === "light" ? "text-zinc-900" : "text-white"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-3 line-clamp-3 flex-1 text-sm leading-relaxed ${
            tone === "light" ? "text-zinc-600" : "text-zinc-500"
          }`}
        >
          {item.excerpt}
        </p>
        <span
          className={`mt-6 text-sm font-medium ${
            tone === "light" ? "text-[#5b21b6]" : "text-white"
          }`}
        >
          Watch →
        </span>
      </TrackedLink>
    );
  }

  return (
    <ArticleCard
      label={item.label}
      title={item.title}
      excerpt={item.excerpt}
      href={item.href}
      className={tone === "light" ? "feature-card-light rounded-lg" : undefined}
    />
  );
}

export function FeaturedContentSection({
  surface,
  title = "Featured now",
  lead = "Videos, guides, and local context worth your time.",
  eyebrow = "Featured",
  limit = 3,
  tone = "dark",
}: FeaturedContentSectionProps) {
  const items = getFeaturedContent(surface, limit);

  if (items.length === 0) return null;

  const isLight = tone === "light";

  return (
    <section
      className={`section-flow relative border-t ${
        isLight
          ? "section-light border-zinc-200/80"
          : "border-zinc-900/40"
      }`}
      data-analytics-section="featured_content"
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className={isLight ? "[&_h2]:text-zinc-900 [&_p]:text-zinc-600" : ""}>
          <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
        </div>
        <RevealGroup
          className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          stagger={80}
        >
          {items.map((item) => (
            <div key={`${item.type}-${item.href}`} className="reveal-item">
              <FeaturedCard item={item} tone={tone} />
            </div>
          ))}
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
