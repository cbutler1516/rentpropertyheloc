export type ReviewProcessPhase =
  | "intro"
  | "address"
  | "post-address"
  | "post-contact"
  | "profile-complete";

export type ReviewProcessStepStatus = "pending" | "active" | "complete" | "in-progress";

export type ReviewProcessStep = {
  id: string;
  label: string;
  status: ReviewProcessStepStatus;
};

export function getReviewProcessHeader(phase: ReviewProcessPhase): string {
  return phase === "intro" || phase === "address" ? "What Happens Next" : "Your Review Process";
}

export function getReviewProcessTagline(phase: ReviewProcessPhase): string {
  switch (phase) {
    case "intro":
    case "address":
      return "Complete each step and a financing specialist will review your scenario.";
    case "post-address":
      return "You're on your way — finish the remaining details to start your review.";
    case "post-contact":
      return "Your request is in review — complete your profile for a stronger analysis.";
    case "profile-complete":
      return "Your profile is complete. Our team will follow up with personalized guidance.";
  }
}

export function showLiveReviewBadge(phase: ReviewProcessPhase): boolean {
  return phase === "post-contact" || phase === "profile-complete";
}

export function getReviewProcessSteps(
  phase: ReviewProcessPhase,
  funnelStep = 1,
): ReviewProcessStep[] {
  switch (phase) {
    case "intro":
    case "address":
      return [
        { id: "address", label: "Enter Property Address", status: "pending" },
        { id: "goals", label: "Tell Us About Your Goals", status: "pending" },
        { id: "options", label: "Receive Financing Options", status: "pending" },
        { id: "follow-up", label: "Personalized Follow-Up", status: "pending" },
      ];

    case "post-address":
      return [
        { id: "property", label: "Property Submitted", status: "complete" },
        {
          id: "goals",
          label: "Tell Us About Your Goals",
          status: funnelStep === 2 ? "active" : "pending",
        },
        {
          id: "options",
          label: "Receive Financing Options",
          status: funnelStep === 3 ? "active" : "pending",
        },
        { id: "follow-up", label: "Personalized Follow-Up", status: "pending" },
      ];

    case "post-contact":
      return [
        { id: "property", label: "Property Submitted", status: "complete" },
        { id: "review", label: "Review Started", status: "complete" },
        { id: "options", label: "Receive Financing Options", status: "active" },
        { id: "follow-up", label: "Personalized Follow-Up", status: "pending" },
      ];

    case "profile-complete":
      return [
        { id: "property", label: "Property Submitted", status: "complete" },
        { id: "review", label: "Review Started", status: "complete" },
        { id: "analysis", label: "Strategy Analysis", status: "complete" },
        { id: "follow-up", label: "Personalized Follow-Up", status: "in-progress" },
      ];
  }
}

export function getReviewProcessAriaLabel(phase: ReviewProcessPhase): string {
  const header = getReviewProcessHeader(phase);
  const steps = getReviewProcessSteps(phase);
  const summary = steps
    .map((step) => `${step.label}: ${step.status.replace("-", " ")}`)
    .join("; ");
  return `${header}. ${summary}`;
}
