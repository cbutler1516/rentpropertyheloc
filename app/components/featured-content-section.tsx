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
};

function FeaturedCard({ item }: { item: FeaturedContentItem }) {
  if (item.type === "video") {
    return (
      <TrackedLink
        href={item.href}
        location={`featured_${item.type}`}
        label={item.title}
        className="card-lift group relative flex h-full flex-col border border-zinc-900/80 bg-[#050505] p-6"
      >
        <span className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          Video
        </span>
        <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-white md:text-xl">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-500">
          {item.excerpt}
        </p>
        <span className="mt-6 text-sm font-medium text-white">Watch →</span>
      </TrackedLink>
    );
  }

  return (
    <ArticleCard
      label={item.label}
      title={item.title}
      excerpt={item.excerpt}
      href={item.href}
    />
  );
}

export function FeaturedContentSection({
  surface,
  title = "Featured now",
  lead = "Videos, guides, and local context worth your time.",
  eyebrow = "Featured",
  limit = 3,
}: FeaturedContentSectionProps) {
  const items = getFeaturedContent(surface, limit);

  if (items.length === 0) return null;

  return (
    <section
      className="section-flow relative border-t border-zinc-900/40"
      data-analytics-section="featured_content"
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
        <RevealGroup
          className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          stagger={80}
        >
          {items.map((item) => (
            <div key={`${item.type}-${item.href}`} className="reveal-item">
              <FeaturedCard item={item} />
            </div>
          ))}
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
