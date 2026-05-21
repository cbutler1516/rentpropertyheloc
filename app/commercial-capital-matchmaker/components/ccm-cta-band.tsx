import Link from "next/link";
import { getBookingUrl } from "@/app/lib/booking-urls";
import { ccmBtnGhost, ccmBtnPrimary, ccmPanelGold } from "../lib/ccm-ui";

type CcmCtaBandProps = {
  location: string;
  variant?: "default" | "compact";
};

export function CcmCtaBand({ location, variant = "default" }: CcmCtaBandProps) {
  const commercialHref = getBookingUrl("commercial");
  const strategyHref = getBookingUrl("strategy");

  return (
    <section
      className={`${ccmPanelGold} ${variant === "compact" ? "p-8 md:p-10" : "p-10 md:p-14"}`}
      data-analytics-section={`ccm_cta_${location}`}
    >
      <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
        Broadview Lending · Chris Butler
      </p>
      <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
        Ready to pressure-test this strategy with a real advisor?
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
        Chris Butler and the Broadview team help commercial sponsors sequence debt
        and equity, align lender outreach, and move from preliminary strategy to
        actionable term conversations.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={commercialHref} className={ccmBtnPrimary}>
          Schedule Commercial Review
        </a>
        <a href={strategyHref} className={ccmBtnGhost}>
          Book Strategy Call
        </a>
        <Link
          href="/commercial-capital-matchmaker/intake"
          className={ccmBtnGhost}
        >
          Analyze Another Deal
        </Link>
      </div>
    </section>
  );
}
