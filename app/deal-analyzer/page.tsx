import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { PathSelector } from "./components/path-selector";

const features = [
  {
    title: "Deal Snapshot",
    body: "Payment, LTV, cash flow, and coverage in one premium read.",
  },
  {
    title: "Strategy framing",
    body: "Recommended path, coach notes, risks, and opportunities.",
  },
  {
    title: "Visual charts",
    body: "Payment breakdown, cash flow, and refinance comparison charts.",
  },
];

export default function DealAnalyzerLandingPage() {
  return (
    <div className="space-y-16">
      <section className="max-w-3xl space-y-6">
        <p className="font-mono text-[10px] tracking-[0.32em] text-[#c9a227] uppercase">
          The Loan Playbook
        </p>
        <h1 className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
          Deal Analyzer
        </h1>
        <p className="text-lg leading-relaxed text-zinc-400">
          Know the move before you make it. Model purchase, refinance, investor,
          and commercial scenarios—then unlock your Playbook Report.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/deal-analyzer/analyze"
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#c9a227] to-[#e8c547] px-8 font-mono text-[11px] tracking-[0.16em] text-black uppercase hover:brightness-110"
          >
            Start analysis
          </Link>
          <Link
            href="/deal-analyzer/analyze?path=buy-home"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 px-6 font-mono text-[10px] tracking-[0.16em] text-zinc-300 uppercase hover:border-[#7c3aed]/50"
          >
            Buy a home
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-medium text-white">Choose your path</h2>
          <Link
            href="/deal-analyzer/analyze"
            className="font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase hover:text-zinc-300"
          >
            Open full form →
          </Link>
        </div>
        <PathSelector linkMode />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title}>
            <CardHeader>
              <CardTitle className="text-base">{f.title}</CardTitle>
              <CardDescription>{f.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
