export const BORROWER_TRUST_HEADLINE = "Trusted By Borrowers";
export const BORROWER_TRUST_SUBHEADLINE =
  "Real feedback from clients we've helped with home financing and real estate investment goals.";

export type ClientTestimonial = {
  id: string;
  reviewerDisplayName: string;
  excerpt: string;
};

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: "mario-h",
    reviewerDisplayName: "Mario H.",
    excerpt:
      "The entire process was smooth from start to finish. Communication was excellent, and we always knew exactly what to expect.",
  },
  {
    id: "gary-d",
    reviewerDisplayName: "Gary D.",
    excerpt:
      "Professional, responsive, and easy to work with. The process was straightforward and exceeded our expectations.",
  },
  {
    id: "daniel-w",
    reviewerDisplayName: "Daniel W.",
    excerpt:
      "The team helped us secure a great financing solution and guided us through every step of the process.",
  },
  {
    id: "kathirilango-t",
    reviewerDisplayName: "Kathirilango T.",
    excerpt:
      "What felt like a complicated transaction became surprisingly simple. The communication and service were outstanding.",
  },
];
