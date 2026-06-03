"use client";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { HeroExplainerVideo } from "@/components/video/hero-explainer-video";

export function HomeExplainerVideoSection() {
  return (
    <section
      className="border-b border-slate-200/80 bg-slate-50/60 py-8 sm:py-10 md:py-12"
      aria-label="Overview video"
    >
      <Container className="max-w-3xl">
        <Reveal y={12}>
          <HeroExplainerVideo
            variant="light"
            label="Investor financing with real human guidance"
          />
        </Reveal>
      </Container>
    </section>
  );
}
