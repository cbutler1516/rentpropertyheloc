import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, LICENSED_STATES_LABEL } from "@/lib/contact";
import { COMPANY_NMLS_LABEL, NMLS_LABEL } from "@/lib/legal/nmls";

export const ADVISOR_HEADSHOT_SRC = "/advisors/chris-butler.png";
export const ADVISOR_HEADSHOT_ALT = "Chris Butler, mortgage loan officer";

/** Head-and-shoulders portrait frame */
export const ADVISOR_HEADSHOT_FRAME_CLASS = "aspect-[4/5]";

/** Portrait frames — full head visible */
export const ADVISOR_HEADSHOT_PORTRAIT_CLASS = "object-cover object-[center_12%]";

export const ADVISOR_HEADSHOT_CLASS = ADVISOR_HEADSHOT_PORTRAIT_CLASS;
export const ADVISOR_HEADSHOT_HOMEPAGE_CLASS = ADVISOR_HEADSHOT_PORTRAIT_CLASS;

/** Circular avatars (larger circles) */
export const ADVISOR_HEADSHOT_AVATAR_CLASS = "object-cover object-[center_18%]";

/** Compact advisor strip — same focal point as portrait for full head visibility */
export const ADVISOR_HEADSHOT_COMPACT_CLASS = ADVISOR_HEADSHOT_PORTRAIT_CLASS;

export { BOOK_STRATEGY_CALL_LABEL as HOMEPAGE_ADVISOR_CTA_PRIMARY } from "@/lib/contact";

export const ADVISOR = {
  name: "Chris Butler",
  title: "Branch Manager / Sr. Loan Originator",
  titleLine: `Branch Manager | ${NMLS_LABEL}`,
  nmls: NMLS_LABEL,
  phone: CONTACT_PHONE_DISPLAY,
  email: CONTACT_EMAIL,
  company: "Broadview Lending powered by Barrett Financial Group, LLC",
  companyNmls: COMPANY_NMLS_LABEL,
  headshotSrc: ADVISOR_HEADSHOT_SRC,
  headshotAlt: ADVISOR_HEADSHOT_ALT,
  homepageBio:
    "Helping investors and homeowners navigate financing strategies with personalized guidance and modern technology.",
  homepageTrustPoints: [
    "15+ Years Experience",
    "$100M+ Funded",
    "Investor-Focused Mortgage Expertise",
  ] as const,
  credentials: [
    "15+ years real estate & mortgage experience",
    "Nearly 50 real estate development projects",
    "$100M+ in recent mortgage transactions",
    "250+ transactions",
    "University of Washington alum",
    "Real estate investor background",
  ],
  licensedStates: LICENSED_STATES_LABEL,
} as const;

export const ABOUT_PLATFORM = {
  headline: "About This Platform",
  summary:
    "RentPropertyHELOC.com is operated by licensed mortgage professionals who specialize in rental property equity strategies. We built this platform for real estate investors who want more than a generic online form—clear guidance, multiple financing paths to review, and a human advisor who understands portfolio goals. Every request is reviewed by a licensed professional who can help you compare HELOC, second mortgage, and other equity options subject to approval.",
  aboutHref: "/about",
  aboutLinkLabel: "Learn more about us",
} as const;

export const PLATFORM_COMPARISON = {
  headline: "Why Investors Work With Us",
  description:
    "Online platforms automate one product. We combine technology with licensed investor-lending expertise.",
  columns: {
    online: "Online Platforms",
    us: "RentPropertyHELOC",
  },
  rows: [
    {
      label: "Guidance",
      online: "Automated, product-first flow",
      us: "Licensed advisor who understands investing",
    },
    {
      label: "Options reviewed",
      online: "Often one pre-selected product",
      us: "Multiple equity paths—HELOC, second mortgage & more",
    },
    {
      label: "Investor expertise",
      online: "Generic consumer mortgage focus",
      us: "Built for rental & portfolio strategy",
    },
    {
      label: "Next step",
      online: "Submit and wait",
      us: "Strategy call + personalized review",
    },
  ],
} as const;
