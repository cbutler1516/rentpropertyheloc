export type VideoEmbedPlaceholder = {
  platform: "TikTok" | "Instagram" | "YouTube";
  category: string;
  title: string;
  description: string;
  embedLabel: string;
};

export type VideoEmbedGroup = {
  eyebrow: string;
  title: string;
  lead: string;
  videos: VideoEmbedPlaceholder[];
};

export const featuredVideoEmbedGroups: VideoEmbedGroup[] = [
  {
    eyebrow: "Featured Mortgage Strategy Videos",
    title: "A media layer for the mortgage decisions people actually search for.",
    lead: "Embed slots are prepared for live TikTok, Instagram, and YouTube content once the final post URLs are approved.",
    videos: [
      {
        platform: "YouTube",
        category: "Featured explainer",
        title: "What buyers misunderstand about pre-approval",
        description:
          "A flagship education slot for readiness, documentation, and offer confidence.",
        embedLabel: "YouTube embed pending",
      },
      {
        platform: "Instagram",
        category: "Short-form strategy",
        title: "Seller credits without the confusion",
        description:
          "A short explainer format for concessions, cash-to-close, and payment structure.",
        embedLabel: "Instagram embed pending",
      },
      {
        platform: "TikTok",
        category: "Fast mortgage lesson",
        title: "Your payment is not just the rate",
        description:
          "A buyer-facing video slot for payment components, taxes, insurance, and timing.",
        embedLabel: "TikTok embed pending",
      },
    ],
  },
  {
    eyebrow: "Latest Market Updates",
    title: "Market context without panic or rate-chasing.",
    lead: "Placeholder modules for timely videos that explain movement in payments, inventory, affordability, and refinance timing.",
    videos: [
      {
        platform: "YouTube",
        category: "Market update",
        title: "Rates moved. What actually changes?",
        description:
          "A calm market-context slot focused on recalculating scenarios without quoting rates.",
        embedLabel: "YouTube embed pending",
      },
      {
        platform: "Instagram",
        category: "Market context",
        title: "Inventory and financing strategy",
        description:
          "A social video slot for connecting seller motivation, available homes, and offer structure.",
        embedLabel: "Instagram embed pending",
      },
    ],
  },
  {
    eyebrow: "Buyer Education",
    title: "Short lessons that help buyers make sense of the loan.",
    lead: "Buyer-facing embed placeholders for practical mortgage education before a consultation or application conversation.",
    videos: [
      {
        platform: "TikTok",
        category: "Buyer basics",
        title: "Cash-to-close is not just down payment",
        description:
          "A short lesson slot for closing costs, prepaids, reserves, and planning.",
        embedLabel: "TikTok embed pending",
      },
      {
        platform: "YouTube",
        category: "Buyer guide",
        title: "How to compare seller credits",
        description:
          "A deeper explainer slot for credits, buydowns, price reductions, and tradeoffs.",
        embedLabel: "YouTube embed pending",
      },
    ],
  },
  {
    eyebrow: "Agent Strategy",
    title: "Content agents can use to make financing easier to explain.",
    lead: "Agent-focused embed placeholders for buyer readiness, co-branded education, and compliant content workflows.",
    videos: [
      {
        platform: "Instagram",
        category: "Agent education",
        title: "How agents should explain financing strength",
        description:
          "A practical slot for offer conversations, buyer context, and lender coordination.",
        embedLabel: "Instagram embed pending",
      },
      {
        platform: "YouTube",
        category: "Partner content",
        title: "The buyer-readiness conversation",
        description:
          "A longer-format slot for agents and teams building better financing conversations.",
        embedLabel: "YouTube embed pending",
      },
    ],
  },
];
