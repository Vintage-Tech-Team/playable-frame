"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
}

interface ResultChartProps {
  data: AmortizationRow[];
  title?: string;
}

export function ResultChart({ data, title = "Amortization (Year 1)" }: ResultChartProps) {
  if (!data?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="principal" stackId="a" fill="hsl(160 84% 39%)" name="Principal" />
            <Bar dataKey="interest" stackId="a" fill="hsl(199 89% 48%)" name="Interest" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
