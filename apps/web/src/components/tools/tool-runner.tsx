"use client";

import { useState } from "react";
import { apiFetch, ApiError } from "@/lib/api";
import { CALCULATOR_TOOLS, type ToolDefinition } from "@/lib/tools-registry";
import { CalculatorLayout } from "@/components/calculator/calculator-layout";
import { CalculatorForm } from "@/components/calculator/calculator-form";
import { ResultCard } from "@/components/calculator/result-card";
import { ResultChart } from "@/components/calculator/result-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ToolRunnerInner({ tool }: { tool: ToolDefinition }) {
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: Record<string, unknown>) {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<Record<string, unknown>>(tool.apiPath, {
        method: tool.method ?? "POST",
        body: JSON.stringify(data),
      });
      setResult(res);
    } catch (e) {
      setResult(null);
      setError(e instanceof ApiError ? e.message : "Calculation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CalculatorLayout
      title={tool.title}
      description={tool.description}
      category={tool.category}
    >
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
        </CardHeader>
        <CardContent>
          <CalculatorForm
            fields={tool.fields}
            schema={tool.schema}
            onSubmit={handleSubmit}
            loading={loading}
          />
          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <>
            <ResultCard
              data={(result ?? {}) as Record<string, unknown>}
              keys={tool.resultKeys}
            />
            {tool.chartKey && result?.[tool.chartKey] && (
              <ResultChart
                data={
                  result[tool.chartKey] as {
                    month: number;
                    principal: number;
                    interest: number;
                  }[]
                }
              />
            )}
          </>
        )}
      </div>
    </CalculatorLayout>
  );
}

export function ToolRunner({ slug }: { slug: string }) {
  const tool = CALCULATOR_TOOLS.find((t) => t.slug === slug);
  if (!tool) {
    return (
      <div className="p-8 text-center text-muted-foreground">Calculator not found.</div>
    );
  }
  return <ToolRunnerInner tool={tool} />;
}
