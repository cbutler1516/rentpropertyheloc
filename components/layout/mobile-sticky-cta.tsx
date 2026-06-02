"use client";

import { CtaLink } from "@/components/ui/cta-link";
import { HERO_FUNNEL_HREF, PRIMARY_CTA_SHORT } from "@/lib/cta";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SCROLL_SHOW_AFTER = 320;
const FOOTER_BUFFER = 160;

/** Paths where sticky CTA would cover funnel forms */
const HIDDEN_PATH_PREFIXES = ["/check-options"];

export function MobileStickyCta() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const hiddenOnRoute = HIDDEN_PATH_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  useEffect(() => {
    if (hiddenOnRoute) {
      document.documentElement.removeAttribute("data-sticky-cta");
      return;
    }

    const footer = document.querySelector("footer");

    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight - FOOTER_BUFFER;
      const pastHero = scrollY > SCROLL_SHOW_AFTER;
      const beforeFooter = scrollY < maxScroll;

      let footerVisible = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        footerVisible = rect.top < window.innerHeight - 48;
      }

      const show = pastHero && beforeFooter && !footerVisible;
      setVisible(show);
      if (show) {
        document.documentElement.setAttribute("data-sticky-cta", "visible");
      } else {
        document.documentElement.removeAttribute("data-sticky-cta");
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.documentElement.removeAttribute("data-sticky-cta");
    };
  }, [hiddenOnRoute]);

  if (hiddenOnRoute) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduceMotion ? false : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: 16, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className={cn(
            "mobile-sticky-glass fixed inset-x-0 bottom-0 z-40 md:hidden",
            "pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5 px-4",
          )}
        >
          <CtaLink href={HERO_FUNNEL_HREF} size="lg" className="w-full min-h-[48px] shadow-sm">
            {PRIMARY_CTA_SHORT}
          </CtaLink>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
