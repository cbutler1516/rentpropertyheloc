"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import type { PartnerAgent } from "../lib/agent-types";
import { partnerDealAnalyzerBase } from "../lib/agent-types";
import { useDealAnalyzer } from "./deal-analyzer-provider";

type PartnerAgentContextValue = {
  agent: PartnerAgent;
  basePath: string;
};

const PartnerAgentContext = createContext<PartnerAgentContextValue | null>(null);

export function PartnerAgentProvider({
  agent,
  children,
}: {
  agent: PartnerAgent;
  children: ReactNode;
}) {
  const { setPartnerAgent, hydrated } = useDealAnalyzer();

  useEffect(() => {
    if (hydrated) {
      setPartnerAgent(agent);
    }
  }, [agent, hydrated, setPartnerAgent]);

  const value = {
    agent,
    basePath: partnerDealAnalyzerBase(agent.slug),
  };

  return (
    <PartnerAgentContext.Provider value={value}>
      {children}
    </PartnerAgentContext.Provider>
  );
}

export function usePartnerAgent() {
  return useContext(PartnerAgentContext);
}

export function useDealAnalyzerBasePath(): string {
  const partner = usePartnerAgent();
  return partner?.basePath ?? "/deal-analyzer";
}
