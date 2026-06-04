import { ScenarioLibrary } from "@/components/scenarios/scenario-library";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Scenario Library",
  description:
    "Illustrative rental property equity scenarios for investors exploring HELOC and second-lien options.",
};

export default function ScenariosPage() {
  return <ScenarioLibrary />;
}
