import { RevealGroup } from "./reveal-group";
import { TrackedLink } from "./tracked-link";

const topics = [
  {
    title: "Preserve your first mortgage rate",
    body: "Access capital without replacing a low-rate loan when a HELOC fits.",
    href: "/learn/heloc-strategy",
    cta: "Explore HELOC Options",
  },
  {
    title: "Investor liquidity",
    body: "Acquisition capital, reserves, and portfolio growth—not just purchase rates.",
    href: "/investors",
    cta: "Investment Property Financing",
  },
  {
    title: "HELOC vs cash-out",
    body: "Compare equity tools by hold period, payment, and flexibility.",
    href: "/learn/heloc-strategy",
    cta: "Compare Equity Paths",
  },
  {
    title: "DSCR & bridge strategy",
    body: "Asset-based rental and transitional debt for operators.",
    href: "/investors",
    cta: "Investor Financing",
  },
] as const;

type LiquidityStrategyStripProps = {
  location?: string;
};

export function LiquidityStrategyStrip({
  location = "liquidity_strip",
}: LiquidityStrategyStripProps) {
  return (
    <section
      className="section-flow section-light relative border-y border-zinc-200/80"
      data-analytics-section={`${location}_liquidity`}
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <RevealGroup stagger={100}>
          <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#6d28d9] uppercase">
            Equity & investor liquidity
          </p>
          <h2 className="reveal-item mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-zinc-900 md:text-4xl">
            Access capital without giving up the whole plan.
          </h2>
          <p className="reveal-item mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">
            HELOC strategy, rental and DSCR paths, and bridge timing—for
            homeowners and investors who need liquidity without noise.
          </p>
        </RevealGroup>
        <RevealGroup
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={80}
        >
          {topics.map((item) => (
            <article
              key={item.title}
              className="reveal-item path-card-light flex flex-col rounded-lg p-5 md:p-6"
            >
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
                {item.body}
              </p>
              <TrackedLink
                href={item.href}
                location={location}
                label={item.cta}
                className="mt-5 text-sm font-medium text-[#5b21b6] hover:text-[#4c1d95]"
              >
                {item.cta} →
              </TrackedLink>
            </article>
          ))}
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}
