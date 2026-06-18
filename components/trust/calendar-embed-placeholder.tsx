import { BOOKING_URL } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { hasStrategyCallEmbed, STRATEGY_CALL_EMBED_URL } from "@/lib/public-env";

type CalendarEmbedPlaceholderProps = {
  className?: string;
  title?: string;
};

/**
 * Strategy call scheduling — embeds iframe when NEXT_PUBLIC_STRATEGY_CALL_EMBED_URL is set.
 */
export function CalendarEmbedPlaceholder({
  className,
  title = "Schedule your strategy session",
}: CalendarEmbedPlaceholderProps) {
  if (hasStrategyCallEmbed()) {
    return (
      <div className={cn("rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6", className)}>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">
          Pick a time that works for you. Educational strategy session — not a commitment to lend.
        </p>
        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <iframe
            src={STRATEGY_CALL_EMBED_URL}
            title={title}
            className="min-h-[min(640px,80vh)] w-full border-0"
            loading="lazy"
            allow="camera; microphone; autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 sm:p-8",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Calendar embed
      </p>
      <h3 className="mt-2 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Set <code className="text-xs">NEXT_PUBLIC_STRATEGY_CALL_EMBED_URL</code> to load the
        scheduling widget here, or use the button below to open the booking page.
      </p>
      <div
        className="mt-6 flex min-h-[220px] items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500"
        aria-hidden
      >
        <span>
          Embed placeholder ·{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
            iframe / booking widget
          </code>
        </span>
      </div>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-800"
      >
        Open scheduling page
      </a>
    </div>
  );
}
