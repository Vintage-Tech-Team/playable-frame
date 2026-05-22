import Link from "next/link";
import { ArrowRight, Calculator, Globe, Ruler, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Calculator,
    title: "Real Estate Calculators",
    description: "17 professional calculators for agents, investors, and buyers.",
    href: "/tools?category=CALCULATOR",
  },
  {
    icon: Globe,
    title: "Global Utilities",
    description: "Currency, time zones, weather, and international planning tools.",
    href: "/tools?category=GLOBAL",
  },
  {
    icon: Ruler,
    title: "Measurement Converters",
    description: "Modular conversion engine for area, length, weight, and more.",
    href: "/tools?category=CONVERTER",
  },
];

export default function HomePage() {
  return (
    <div className="gradient-hero">
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-6">Real Estate Productivity Platform</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Modern tools for{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              real estate professionals
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Calculators, global utilities, and converters in one fast, premium workspace.
            Built for scale — modular APIs ready for your next integration.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/tools">
                Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tools/calculators/mortgage">Try Mortgage Calculator</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border-border/60 transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={f.href}
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View tools <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-16 border-border/60 bg-card/50">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
            <Zap className="h-10 w-10 text-primary shrink-0" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Production-ready architecture</h2>
              <p className="mt-1 text-muted-foreground">
                Next.js + NestJS + PostgreSQL. Reusable formula engine, REST APIs, Swagger docs,
                and environment-based configuration.
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href="/tools">Browse all tools</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
