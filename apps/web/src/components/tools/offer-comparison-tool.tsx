"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { CalculatorLayout } from "@/components/calculator/calculator-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SAMPLE_OFFERS = [
  { label: "Offer A", price: 500000, sellerCredits: 5000, closingDays: 30, contingencies: 2 },
  { label: "Offer B", price: 510000, sellerCredits: 0, closingDays: 21, contingencies: 4 },
  { label: "Offer C", price: 495000, sellerCredits: 10000, closingDays: 45, contingencies: 1 },
];

export function OfferComparisonTool() {
  const [result, setResult] = useState<{
    rankedOffers: Array<{ label: string; netPrice: number; score: number }>;
    recommended: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function compare() {
    setLoading(true);
    try {
      const res = await apiFetch<typeof result>("/calculators/offer-comparison", {
        method: "POST",
        body: JSON.stringify({ offers: SAMPLE_OFFERS }),
      });
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CalculatorLayout
      title="Offer Comparison Tool"
      description="Rank multiple purchase offers. Sample offers shown — customize via API for production."
      category="calculators"
    >
      <Card>
        <CardHeader>
          <CardTitle>Sample Offers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {SAMPLE_OFFERS.map((o) => (
            <div key={o.label} className="rounded-lg border border-border p-3 text-sm">
              <span className="font-medium">{o.label}</span>: ${o.price.toLocaleString()} ·{" "}
              {o.closingDays} days · {o.contingencies} contingencies
            </div>
          ))}
          <Button onClick={compare} disabled={loading}>
            {loading ? "Comparing…" : "Compare Offers"}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ranking</CardTitle>
        </CardHeader>
        <CardContent>
          {!result ? (
            <p className="text-sm text-muted-foreground">Run comparison to see ranked offers.</p>
          ) : (
            <ul className="space-y-3">
              {result.rankedOffers.map((o, i) => (
                <li
                  key={o.label}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <span>
                    #{i + 1} {o.label}
                    {result.recommended === o.label && (
                      <Badge className="ml-2">Recommended</Badge>
                    )}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Net ${o.netPrice.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </CalculatorLayout>
  );
}
