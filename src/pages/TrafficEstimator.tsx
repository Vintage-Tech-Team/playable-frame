import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TrendingUp, Globe, Users, MousePointerClick } from "lucide-react";

function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function estimate(domain: string) {
  const clean = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  if (!clean) return null;
  const h = hashCode(clean);
  const tldBoost = clean.endsWith(".com") ? 1.5 : clean.endsWith(".io") ? 1.2 : 1;
  const lengthFactor = Math.max(0.4, 1.6 - clean.length / 18);
  const base = ((h % 9500) + 500) * tldBoost * lengthFactor;
  const visits = Math.round(base * 30);
  const pages = +(1.5 + ((h >> 3) % 40) / 10).toFixed(2);
  const bounce = 30 + ((h >> 6) % 45);
  const authority = 10 + ((h >> 9) % 80);
  return { clean, visits, pages, bounce, authority };
}

const TrafficEstimator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof estimate>>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(estimate(input));
  };

  return (
    <SiteLayout>
      <Helmet>
        <title>Website Traffic Estimator — Trafficly</title>
        <meta name="description" content="Estimate monthly visits, pages per session, bounce rate, and authority score for any website. Free and instant." />
        <link rel="canonical" href="/traffic-estimator" />
      </Helmet>

      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-accent" />
            Flagship tool
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Website Traffic Estimator</h1>
          <p className="text-muted-foreground text-lg">
            Enter any domain to get an instant snapshot of estimated traffic and engagement.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 md:p-8 shadow-card-soft">
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. example.com"
              className="h-12 text-base"
            />
            <Button type="submit" size="lg" className="h-12 px-8">
              Estimate
            </Button>
          </form>

          {result && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <Metric icon={<Globe className="w-4 h-4" />} label="Domain" value={result.clean} />
              <Metric icon={<Users className="w-4 h-4" />} label="Monthly visits" value={result.visits.toLocaleString()} />
              <Metric icon={<MousePointerClick className="w-4 h-4" />} label="Pages / visit" value={String(result.pages)} />
              <Metric icon={<TrendingUp className="w-4 h-4" />} label="Authority" value={`${result.authority}/100`} />
              <div className="col-span-2 md:col-span-4 text-xs text-muted-foreground border-t border-border pt-4">
                Estimates are illustrative and generated locally. For verified analytics, connect a data provider like Semrush.
              </div>
            </div>
          )}
        </Card>
      </section>
    </SiteLayout>
  );
};

const Metric = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-xl border border-border bg-secondary/40 p-4">
    <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide mb-2">
      {icon}
      {label}
    </div>
    <div className="text-xl font-semibold truncate">{value}</div>
  </div>
);

export default TrafficEstimator;