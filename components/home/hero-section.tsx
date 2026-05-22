"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HERO_STATS } from "@/lib/home-content";
import { SITE_TAGLINE } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(74,222,128,0.12),transparent_40%)]" />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge className="mb-5">Investor HELOC programs</Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turn rental equity into{" "}
              <span className="text-accent-bright">deployable capital</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              {SITE_TAGLINE} Built for landlords scaling acquisitions, renovations, and reserves.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={() =>
                  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Start eligibility review
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                See how it works
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent-bright">
              Program snapshot
            </p>
            <ul className="mt-6 space-y-5">
              {HERO_STATS.map((stat) => (
                <li
                  key={stat.label}
                  className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-white/65">{stat.label}</span>
                  <span className="text-lg font-semibold text-white">{stat.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/50">
              Rates, fees, and approval subject to lender guidelines. Equal Housing Lender.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
