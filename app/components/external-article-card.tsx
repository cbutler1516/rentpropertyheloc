import type { ExternalArticle } from "../lib/content-sources";

export function ExternalArticleCard({ article }: { article: ExternalArticle }) {
  return (
    <a
      href={article.href}
      target="_blank"
      rel="noreferrer"
      className="reveal-item card-lift group relative flex h-full flex-col border border-zinc-900/80 bg-[#050505] p-8 md:p-9"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/0 to-transparent opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100 group-hover:from-[#5b21b6]/[0.06]"
        aria-hidden
      />
      <div className="relative flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          {article.category}
        </p>
        {article.status === "placeholder" ? (
          <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-700 uppercase">
            Import TODO
          </span>
        ) : null}
      </div>
      <h3 className="relative mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
        {article.title}
      </h3>
      <p className="relative mt-5 flex-1 leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
        {article.excerpt}
      </p>
      <div className="relative mt-8 border-t border-zinc-900/80 pt-5">
        <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
          Source: {article.source}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] group-hover:text-white">
          View source blog
          <span className="text-[#7c3aed]" aria-hidden>
            →
          </span>
        </span>
      </div>
    </a>
  );
}
