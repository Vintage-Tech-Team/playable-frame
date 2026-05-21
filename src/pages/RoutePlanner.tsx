import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/SiteLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";

const RoutePlanner = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const mapsUrl =
    from && to
      ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=driving`
      : "";

  return (
    <SiteLayout>
      <Helmet>
        <title>Route Planner — Trafficly</title>
        <meta name="description" content="Plan a route between any two places and open it in Google Maps with live traffic." />
        <link rel="canonical" href="/route-planner" />
      </Helmet>

      <section className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-muted-foreground mb-4">
            <Navigation className="w-3.5 h-3.5 text-accent" />
            Plan your commute
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Route Planner</h1>
          <p className="text-muted-foreground text-lg">Type two places and open the route with live traffic.</p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 md:p-8 shadow-card-soft space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" /> From
            </label>
            <Input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Mumbai, India" className="h-12" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4 text-highlight" /> To
            </label>
            <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Pune, India" className="h-12" />
          </div>

          <Button
            asChild
            size="lg"
            className="w-full h-12"
            disabled={!from || !to}
          >
            <a href={mapsUrl || "#"} target="_blank" rel="noreferrer">
              Open route with live traffic
            </a>
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Opens in Google Maps. For embedded turn-by-turn, connect a maps provider like Mapbox.
          </p>
        </Card>
      </section>
    </SiteLayout>
  );
};

export default RoutePlanner;