"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { CalculatorLayout } from "@/components/calculator/calculator-layout";
import { ResultCard } from "@/components/calculator/result-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const GLOBAL_META: Record<string, { title: string; description: string }> = {
  currency: {
    title: "Currency Converter",
    description: "Convert between currencies using live exchange rates.",
  },
  "world-clock": {
    title: "World Clock",
    description: "Current time in major cities worldwide.",
  },
  "timezone-compare": {
    title: "Time Zone Comparison",
    description: "Compare multiple time zones side by side.",
  },
  "meeting-planner": {
    title: "International Meeting Planner",
    description: "Find suitable meeting hours across zones.",
  },
  "date-difference": {
    title: "Date Difference Calculator",
    description: "Calculate days, weeks, and months between dates.",
  },
  "time-duration": {
    title: "Time Duration Calculator",
    description: "Sum hours, minutes, and seconds.",
  },
  weather: {
    title: "Weather Lookup",
    description: "Current weather by latitude and longitude.",
  },
  "utc-converter": {
    title: "UTC/GMT Converter",
    description: "Convert datetimes between UTC offsets.",
  },
  "city-distance": {
    title: "Distance Between Cities",
    description: "Haversine distance between two coordinates.",
  },
  holidays: {
    title: "Global Holiday Calendar",
    description: "Public holidays by country and year.",
  },
};

export function GlobalTool({ slug }: { slug: string }) {
  const meta = GLOBAL_META[slug] ?? { title: slug, description: "" };
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state per tool
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1000);
  const [lat, setLat] = useState(40.71);
  const [lon, setLon] = useState(-74.01);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2025-01-01");
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [country, setCountry] = useState("US");

  async function runGet(path: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(path);
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  async function runPost(path: string, body: object) {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch(path, { method: "POST", body: JSON.stringify(body) });
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (slug === "world-clock") {
      runGet("/global-tools/world-clock");
    }
  }, [slug]);

  const flatData =
    data && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : { result: Array.isArray(data) ? `${(data as unknown[]).length} items` : String(data ?? "") };

  return (
    <CalculatorLayout title={meta.title} description={meta.description} category="global">
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {slug === "currency" && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <div><Label>From</Label><Input value={from} onChange={(e) => setFrom(e.target.value)} /></div>
                <div><Label>To</Label><Input value={to} onChange={(e) => setTo(e.target.value)} /></div>
                <div><Label>Amount</Label><Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
              </div>
              <Button onClick={() => runPost("/global-tools/currency/convert", { from, to, amount })}>
                Convert
              </Button>
            </>
          )}
          {slug === "weather" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Latitude</Label><Input type="number" value={lat} onChange={(e) => setLat(Number(e.target.value))} /></div>
                <div><Label>Longitude</Label><Input type="number" value={lon} onChange={(e) => setLon(Number(e.target.value))} /></div>
              </div>
              <Button onClick={() => runGet(`/global-tools/weather?lat=${lat}&lon=${lon}`)}>
                Lookup Weather
              </Button>
            </>
          )}
          {slug === "date-difference" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Start</Label><Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
                <div><Label>End</Label><Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
              </div>
              <Button onClick={() => runPost("/global-tools/date-difference", { startDate, endDate })}>
                Calculate
              </Button>
            </>
          )}
          {slug === "time-duration" && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <div><Label>Hours</Label><Input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} /></div>
                <div><Label>Minutes</Label><Input type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} /></div>
                <div><Label>Seconds</Label><Input type="number" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} /></div>
              </div>
              <Button onClick={() => runPost("/global-tools/duration", { hours, minutes, seconds })}>
                Calculate
              </Button>
            </>
          )}
          {slug === "timezone-compare" && (
            <Button
              onClick={() =>
                runPost("/global-tools/timezone-compare", {
                  zones: ["America/New_York", "Europe/London", "Asia/Tokyo"],
                })
              }
            >
              Compare Zones
            </Button>
          )}
          {slug === "meeting-planner" && (
            <Button
              onClick={() =>
                runPost("/global-tools/meeting-planner", {
                  slots: [{ utcHour: 14, zones: ["America/New_York", "Europe/London", "Asia/Singapore"] }],
                })
              }
            >
              Plan Meeting
            </Button>
          )}
          {slug === "utc-converter" && (
            <Button
              onClick={() =>
                runPost("/global-tools/utc-convert", {
                  dateTime: new Date().toISOString(),
                  fromOffsetHours: -5,
                  toOffsetHours: 0,
                })
              }
            >
              Convert UTC
            </Button>
          )}
          {slug === "city-distance" && (
            <Button
              onClick={() =>
                runPost("/global-tools/cities/distance", {
                  lat1: 40.7128,
                  lon1: -74.006,
                  lat2: 34.0522,
                  lon2: -118.2437,
                })
              }
            >
              NYC → LA Distance
            </Button>
          )}
          {slug === "holidays" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Year</Label><Input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} /></div>
                <div><Label>Country</Label><Input value={country} onChange={(e) => setCountry(e.target.value)} /></div>
              </div>
              <Button onClick={() => runGet(`/global-tools/holidays?year=${year}&country=${country}`)}>
                Load Holidays
              </Button>
            </>
          )}
          {slug === "world-clock" && <p className="text-sm text-muted-foreground">Loaded automatically.</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
      </Card>
      <div>
        {loading ? (
          <Skeleton className="h-48 w-full" />
        ) : Array.isArray(data) ? (
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm">
                {(data as { city?: string; localTime?: string; timezone?: string }[]).map((row, i) => (
                  <li key={i} className="flex justify-between border-b border-border/50 py-2">
                    <span>{row.city ?? row.timezone}</span>
                    <span className="text-muted-foreground">
                      {row.localTime ? new Date(row.localTime).toLocaleTimeString() : JSON.stringify(row)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : (
          <ResultCard data={flatData} />
        )}
      </div>
    </CalculatorLayout>
  );
}
