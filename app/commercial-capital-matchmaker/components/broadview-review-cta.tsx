import Link from "next/link";
import { getBookingUrl } from "@/app/lib/booking-urls";
import {
  ccmAccentLabel,
  ccmBtnGhost,
  ccmBtnPrimary,
  ccmBtnSecondary,
  ccmPanelGold,
} from "../lib/ccm-ui";

type BroadviewReviewCtaProps = {
  sendDealHref?: string;
};

export function BroadviewReviewCta({
  sendDealHref = "/commercial-capital-matchmaker/strategy-review",
}: BroadviewReviewCtaProps) {
  const commercialHref = getBookingUrl("commercial");

  return (
    <section className={`${ccmPanelGold} space-y-6 p-10 md:p-14`}>
      <p className={ccmAccentLabel}>Next step with Broadview</p>
      <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        Want Broadview to review this deal?
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
        Chris Butler can pressure-test your preliminary strategy, align lender
        outreach, and help you package documents before term sheets—not just
        generate another calculator output.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href={commercialHref} className={ccmBtnPrimary}>
          Schedule Commercial Strategy Call
        </a>
        <Link href={sendDealHref} className={ccmBtnSecondary}>
          Send Deal Package
        </Link>
        <Link
          href="/commercial-capital-matchmaker/summary"
          className={ccmBtnGhost}
        >
          Build Lender Summary
        </Link>
      </div>
    </section>
  );
}
