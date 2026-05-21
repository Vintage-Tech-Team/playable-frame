import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Clock, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COMMON_ZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Australia/Sydney",
];

function formatIn(zone: string, date: Date) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: zone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return "Invalid time zone";
  }
}

const TimezoneConverter = () => {
  const [baseTime, setBaseTime] = useState(() => {
    const d = new Date();
    d.setSeconds(0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [zones, setZones] = useState<string[]>([
    "America/New_York",
    "Europe/London",
    "Asia/Kolkata",
    "Asia/Tokyo",
  ]);
  const [newZone, setNewZone] = useState("");

  const date = useMemo(() => new Date(baseTime), [baseTime]);

  const addZone = () => {
    if (newZone && !zones.includes(newZone)) {
      setZones([...zones, newZone]);
      setNewZone("");
    }
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>Time Zone Converter — Trafficly</title>
        <meta name="description" content="Convert a moment in time across multiple cities and time zones at once." />
        <link rel="canonical" href="/timezone-converter" />
      </Helmet>

      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground mb-4">
            <Clock className="w-3.5 h-3.5 text-accent" />
            Schedule across zones
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Time Zone Converter</h1>
          <p className="text-muted-foreground text-lg">Pick a base time and see it everywhere instantly.</p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 md:p-8 shadow-card-soft">
          <label className="text-sm font-medium mb-2 block">Base date & time (your local)</label>
          <Input
            type="datetime-local"
            value={baseTime}
            onChange={(e) => setBaseTime(e.target.value)}
            className="h-12 text-base mb-6"
          />

          <div className="space-y-3">
            {zones.map((z) => (
              <div
                key={z}
                className="flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-secondary/40"
              >
                <div className="min-w-0">
                  <div className="font-medium truncate">{z.replace(/_/g, " ")}</div>
                  <div className="text-sm text-muted-foreground">{formatIn(z, date)}</div>
                </div>
                <button
                  onClick={() => setZones(zones.filter((x) => x !== z))}
                  className="p-2 rounded-md hover:bg-background text-muted-foreground hover:text-destructive"
                  aria-label={`Remove ${z}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <select
              value={newZone}
              onChange={(e) => setNewZone(e.target.value)}
              className="h-11 rounded-md border border-input bg-background px-3 text-sm flex-1"
            >
              <option value="">Add a time zone…</option>
              {COMMON_ZONES.filter((z) => !zones.includes(z)).map((z) => (
                <option key={z} value={z}>
                  {z.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            <Button onClick={addZone} variant="outline" disabled={!newZone}>
              <Plus className="w-4 h-4" /> Add
            </Button>
          </div>
        </Card>
      </section>
    </SiteLayout>
  );
};

export default TimezoneConverter;