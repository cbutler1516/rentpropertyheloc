"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { ABOUT_PLATFORM } from "@/lib/trust-content";
import Link from "next/link";

export function AboutPlatformSection() {
  return (
    <Section id="about-platform" divider className="section-mist py-10 sm:py-14">
      <Reveal>
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 lg:max-w-4xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-700">
            Who we are
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {ABOUT_PLATFORM.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {ABOUT_PLATFORM.summary}
          </p>
          <p className="mt-5">
            <Link
              href={ABOUT_PLATFORM.aboutHref}
              className="text-sm font-semibold text-teal-700 underline-offset-4 hover:underline"
            >
              {ABOUT_PLATFORM.aboutLinkLabel} →
            </Link>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
