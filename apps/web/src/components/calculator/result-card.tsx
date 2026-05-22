import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

function formatValue(key: string, value: unknown): string {
  if (typeof value !== "number") return String(value ?? "—");
  if (key.toLowerCase().includes("percent") || key.endsWith("Percent")) {
    return formatPercent(value);
  }
  if (
    key.toLowerCase().includes("price") ||
    key.toLowerCase().includes("payment") ||
    key.toLowerCase().includes("amount") ||
    key.toLowerCase().includes("commission") ||
    key.toLowerCase().includes("cost") ||
    key.toLowerCase().includes("income") ||
    key.toLowerCase().includes("flow") ||
    key.toLowerCase().includes("gain") ||
    key.toLowerCase().includes("return") ||
    key.toLowerCase().includes("balance") ||
    key.toLowerCase().includes("proceeds") ||
    key.toLowerCase().includes("deduction") ||
    key.toLowerCase().includes("investment") ||
    key.toLowerCase().includes("value") ||
    key.toLowerCase().includes("rent") ||
    key === "noi"
  ) {
    return formatCurrency(value);
  }
  return formatNumber(value);
}

function humanize(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

interface ResultCardProps {
  title?: string;
  data: Record<string, unknown>;
  keys?: string[];
}

export function ResultCard({ title = "Results", data, keys }: ResultCardProps) {
  const entries = keys
    ? keys.filter((k) => data[k] !== undefined).map((k) => [k, data[k]] as const)
    : Object.entries(data).filter(
        ([k, v]) =>
          typeof v === "number" ||
          typeof v === "string" ||
          (typeof v === "boolean" && v),
      );

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          Enter values and calculate to see results.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3"
          >
            <p className="text-xs text-muted-foreground">{humanize(key)}</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatValue(key, value)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
