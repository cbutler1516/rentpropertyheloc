import Link from "next/link";
import { CcmCtaBand } from "./components/ccm-cta-band";
import { LoadSampleButton } from "./components/load-sample-button";
import {
  ccmAccentLabel,
  ccmBtnPrimary,
  ccmBtnSecondary,
  ccmGoldLabel,
  ccmPanel,
  ccmPanelElevated,
} from "./lib/ccm-ui";

const processCards = [
  {
    step: "01",
    title: "Structure the deal",
    body: "Clarify asset, sponsor, proceeds, and timing so the capital story reads cleanly to lenders.",
  },
  {
    step: "02",
    title: "Match lender categories",
    body: "See which paths—agency, CMBS, bank, bridge, SBA, private credit, and more—fit your scenario.",
  },
  {
    step: "03",
    title: "Generate an executive summary",
    body: "Leave with a polished advisor-style memo you can share internally or with partners.",
  },
];

const lenderSources = [
  "Banks & credit unions",
  "Agency multifamily",
  "CMBS",
  "Bridge & debt funds",
  "SBA 504 / 7(a)",
  "Private credit",
  "Construction & specialty",
];

export default function CommercialCapitalMatchmakerPage() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="relative space-y-10 pt-4 md:pt-8">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full bg-[#7c3aed]/15 blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#c9a227]/10 blur-[80px]"
          aria-hidden
        />

        <div className="relative max-w-4xl space-y-8">
          <p className={ccmGoldLabel}>Broadview Lending · Commercial Capital Matchmaker</p>
          <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            Commercial Capital Strategy, Built Around Your Deal
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl md:leading-relaxed">
            Broadview helps commercial buyers, owners, investors, developers, and
            business operators identify the right capital path across banks,
            credit unions, SBA, bridge, private credit, agency, CMBS,
            construction, and other specialized lending sources.
          </p>
        </div>

        <div className={`${ccmPanelElevated} relative max-w-3xl p-8 md:p-10`}>
          <p className="text-sm text-zinc-500">
            Preliminary strategy in minutes—not a loan application.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/commercial-capital-matchmaker/intake" className={ccmBtnPrimary}>
              Analyze My Deal
            </Link>
            <LoadSampleButton className={ccmBtnSecondary}>
              View Sample Capital Strategy
            </LoadSampleButton>
          </div>
        </div>
      </section>

      <section className={`${ccmPanel} space-y-6 p-10 md:p-14`}>
        <p className={ccmAccentLabel}>Positioning</p>
        <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-white md:text-3xl">
          Not a loan application. A capital strategy review.
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          You are not submitting to underwriting—you are framing how your deal
          should be presented across lender categories. Broadview and Chris Butler
          help you sequence outreach, structure, and next steps with institutional
          clarity.
        </p>
      </section>

      <section className="space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className={ccmAccentLabel}>How it works</p>
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Three moves. One clear capital story.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {processCards.map((card) => (
            <div key={card.step} className={`${ccmPanel} space-y-4 p-8 md:p-10`}>
              <p className="font-mono text-[11px] tracking-[0.24em] text-[#c9a227]">
                {card.step}
              </p>
              <h3 className="text-lg font-medium text-white">{card.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className={ccmAccentLabel}>Lender universe</p>
          <h2 className="text-xl font-medium text-white md:text-2xl">
            Capital sources we help you navigate
          </h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            Your strategy may combine multiple paths—we show where to start and
            what to run in parallel.
          </p>
        </div>
        <ul className="flex flex-wrap gap-3">
          {lenderSources.map((item) => (
            <li
              key={item}
              className="rounded-full bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 ring-1 ring-white/[0.06]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <CcmCtaBand location="landing" />

      <p className="text-center text-sm text-zinc-600">
        <Link href="/commercial" className="text-zinc-400 hover:text-white">
          Commercial financing overview →
        </Link>
      </p>
    </div>
  );
}
