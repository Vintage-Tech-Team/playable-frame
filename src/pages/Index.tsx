import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  Ruler,
  Navigation,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react";

const tools = [
  {
    to: "/traffic-estimator",
    title: "Website Traffic Estimator",
    desc: "Instant monthly visits, engagement, and authority for any domain.",
    icon: TrendingUp,
    featured: true,
  },
  {
    to: "/timezone-converter",
    title: "Time Zone Converter",
    desc: "Pick a moment and see it across every city you care about.",
    icon: Clock,
  },
  {
    to: "/unit-converter",
    title: "Unit Converter",
    desc: "Length, weight, data, and speed — no ads, no clutter.",
    icon: Ruler,
  },
  {
    to: "/route-planner",
    title: "Route Planner",
    desc: "Plan a trip between two places with one-tap live traffic.",
    icon: Navigation,
  },
];

const Index = () => {
  return (
    <SiteLayout>
      <Helmet>
        <title>Trafficly — Clean Utilities for Web & Road Traffic</title>
        <meta
          name="description"
          content="A clean hub of free utilities: website traffic estimator, time zone converter, unit converter, and route planner. No signup."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.04] pointer-events-none" />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Fast. Free. No signup.
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.05]">
              Everyday utilities for{" "}
              <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
                web & road traffic
              </span>
              .
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              One clean hub for website analytics estimates, time zone scheduling, unit conversions,
              and route planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="h-12 px-8">
                <Link to="/traffic-estimator">
                  Try the estimator <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8">
                <Link to="/timezone-converter">Browse all tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid md:grid-cols-2 gap-5">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className={`group relative rounded-2xl border border-border bg-card p-6 md:p-8 transition-all hover:-translate-y-0.5 hover:shadow-card-soft hover:border-accent/40 ${
                t.featured ? "md:col-span-2 gradient-subtle" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-soft shrink-0">
                  <t.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl md:text-2xl font-semibold">{t.title}</h2>
                    {t.featured && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                        Flagship
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{t.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <div className="grid md:grid-cols-3 gap-5">
          <Value icon={Zap} title="Instant" desc="Every tool runs in your browser. No loading screens." />
          <Value icon={Shield} title="Private" desc="No tracking, no accounts. Your input never leaves the page." />
          <Value icon={Sparkles} title="Clean UI" desc="Designed for clarity — readable, responsive, and calm." />
        </div>
      </section>
    </SiteLayout>
  );
};

const Value = ({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Zap;
  title: string;
  desc: string;
}) => (
  <div className="rounded-2xl border border-border p-6 bg-card">
    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <h3 className="font-semibold text-lg mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </div>
);

export default Index;