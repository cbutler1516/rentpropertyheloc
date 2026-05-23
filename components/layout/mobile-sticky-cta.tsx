"use client";

import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_SHORT } from "@/lib/cta";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SCROLL_SHOW_AFTER = 320;
const FOOTER_BUFFER = 140;

export function MobileStickyCta() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname === "/check-options") return;

    const footer = document.querySelector("footer");
    const apply = document.getElementById("apply");

    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight - FOOTER_BUFFER;
      const pastHero = scrollY > SCROLL_SHOW_AFTER;
      const beforeFooter = scrollY < maxScroll;

      let applyVisible = false;
      if (apply) {
        const rect = apply.getBoundingClientRect();
        applyVisible = rect.top < window.innerHeight * 0.85;
      }

      let footerVisible = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        footerVisible = rect.top < window.innerHeight;
      }

      setVisible(pastHero && beforeFooter && !applyVisible && !footerVisible);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  if (pathname === "/check-options") return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduceMotion ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: 24, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mobile-sticky-glass fixed inset-x-0 bottom-0 z-40 md:hidden",
            "px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          )}
        >
          <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="w-full shadow-lg">
            {PRIMARY_CTA_SHORT}
          </CtaLink>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
