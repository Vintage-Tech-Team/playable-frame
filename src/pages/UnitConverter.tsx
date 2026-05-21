import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Ruler } from "lucide-react";

type Unit = { label: string; toBase: number };
const CATEGORIES: Record<string, Unit[]> = {
  Length: [
    { label: "Meter", toBase: 1 },
    { label: "Kilometer", toBase: 1000 },
    { label: "Mile", toBase: 1609.344 },
    { label: "Foot", toBase: 0.3048 },
    { label: "Inch", toBase: 0.0254 },
  ],
  Weight: [
    { label: "Kilogram", toBase: 1 },
    { label: "Gram", toBase: 0.001 },
    { label: "Pound", toBase: 0.45359237 },
    { label: "Ounce", toBase: 0.02834952 },
  ],
  Data: [
    { label: "Byte", toBase: 1 },
    { label: "Kilobyte", toBase: 1024 },
    { label: "Megabyte", toBase: 1024 ** 2 },
    { label: "Gigabyte", toBase: 1024 ** 3 },
    { label: "Terabyte", toBase: 1024 ** 4 },
  ],
  Speed: [
    { label: "m/s", toBase: 1 },
    { label: "km/h", toBase: 1 / 3.6 },
    { label: "mph", toBase: 0.44704 },
    { label: "knots", toBase: 0.514444 },
  ],
};

const Converter = ({ units }: { units: Unit[] }) => {
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState(units[0].label);

  const num = parseFloat(value);
  const baseValue = Number.isFinite(num)
    ? num * (units.find((u) => u.label === from)?.toBase ?? 1)
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-12 text-base"
        />
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="h-12 rounded-md border border-input bg-background px-3 text-sm sm:w-48"
        >
          {units.map((u) => (
            <option key={u.label} value={u.label}>{u.label}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {units.filter((u) => u.label !== from).map((u) => {
          const v = baseValue / u.toBase;
          return (
            <div key={u.label} className="p-4 rounded-xl border border-border bg-secondary/40">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{u.label}</div>
              <div className="text-lg font-semibold tabular-nums">
                {Number.isFinite(v) ? v.toLocaleString(undefined, { maximumFractionDigits: 6 }) : "—"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const UnitConverter = () => {
  const cats = Object.keys(CATEGORIES);
  return (
    <SiteLayout>
      <Helmet>
        <title>Unit Converter — Trafficly</title>
        <meta name="description" content="Convert length, weight, data, and speed units instantly." />
        <link rel="canonical" href="/unit-converter" />
      </Helmet>

      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground mb-4">
            <Ruler className="w-3.5 h-3.5 text-accent" />
            Everyday math, done
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Unit Converter</h1>
          <p className="text-muted-foreground text-lg">Length, weight, data, and speed — converted in real time.</p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 md:p-8 shadow-card-soft">
          <Tabs defaultValue={cats[0]}>
            <TabsList className="grid grid-cols-4 w-full mb-6">
              {cats.map((c) => (
                <TabsTrigger key={c} value={c}>{c}</TabsTrigger>
              ))}
            </TabsList>
            {cats.map((c) => (
              <TabsContent key={c} value={c}>
                <Converter units={CATEGORIES[c]} />
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </section>
    </SiteLayout>
  );
};

export default UnitConverter;