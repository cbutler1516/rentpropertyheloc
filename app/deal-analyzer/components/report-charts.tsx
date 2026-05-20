"use client";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DealAnalysisResult } from "../lib/types";
import { formatCurrency } from "@/lib/utils";

const CHART_COLORS = ["#7c3aed", "#c9a227", "#3b82f6", "#71717a"];

export function PaymentBreakdownChart({
  analysis,
}: {
  analysis: DealAnalysisResult;
}) {
  const data = analysis.chartData.paymentBreakdown;

  return (
    <div className="playbook-chart-print playbook-print-avoid-break h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={56}
            outerRadius={88}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(Number(value ?? 0))}
            contentStyle={{
              background: "#0a0a0a",
              border: "1px solid #27272a",
              borderRadius: 12,
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CashFlowChart({ analysis }: { analysis: DealAnalysisResult }) {
  const data = analysis.chartData.cashFlowSeries ?? [];
  if (!data.length) return null;

  return (
    <div className="playbook-chart-print playbook-print-avoid-break h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" stroke="#71717a" fontSize={11} />
          <YAxis
            stroke="#71717a"
            fontSize={11}
            tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
          />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value ?? 0))}
            contentStyle={{
              background: "#0a0a0a",
              border: "1px solid #27272a",
              borderRadius: 12,
            }}
          />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#c9a227" radius={[6, 6, 0, 0]} />
          <Bar dataKey="expense" name="Expense" fill="#7c3aed" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RefinanceComparisonChart({
  analysis,
}: {
  analysis: DealAnalysisResult;
}) {
  const data = analysis.chartData.refinanceSeries ?? [];
  if (!data.length) return null;

  return (
    <div className="playbook-chart-print playbook-print-avoid-break h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="label" stroke="#71717a" fontSize={11} />
          <YAxis stroke="#71717a" fontSize={11} />
          <Tooltip
            contentStyle={{
              background: "#0a0a0a",
              border: "1px solid #27272a",
              borderRadius: 12,
            }}
          />
          <Legend />
          <Bar dataKey="current" name="Current" fill="#71717a" radius={[6, 6, 0, 0]} />
          <Bar dataKey="proposed" name="Proposed" fill="#7c3aed" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
