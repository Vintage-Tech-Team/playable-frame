"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { CONVERTER_SLUG_MAP } from "@/lib/tools-registry";
import { CalculatorLayout } from "@/components/calculator/calculator-layout";
import { ResultCard } from "@/components/calculator/result-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConverterToolProps {
  slug: string;
  title: string;
  description: string;
}

export function ConverterTool({ slug, title, description }: ConverterToolProps) {
  const preset = CONVERTER_SLUG_MAP[slug];
  const [value, setValue] = useState(100);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  async function convert() {
    if (!preset) return;
    setLoading(true);
    try {
      const res = await apiFetch<Record<string, unknown>>("/converters/convert", {
        method: "POST",
        body: JSON.stringify({
          fromUnit: preset.from,
          toUnit: preset.to,
          value: Number(value),
        }),
      });
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CalculatorLayout title={title} description={description} category="converters">
      <Card>
        <CardHeader>
          <CardTitle>Convert</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>
              Value ({preset?.from ?? "from"})
            </Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>
          <Button onClick={convert} disabled={loading}>
            {loading ? "Converting…" : "Convert"}
          </Button>
        </CardContent>
      </Card>
      <ResultCard
        data={(result ?? {}) as Record<string, unknown>}
        keys={["input", "result", "fromUnit", "toUnit"]}
      />
    </CalculatorLayout>
  );
}
