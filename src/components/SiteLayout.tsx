import { Link, NavLink } from "react-router-dom";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/traffic-estimator", label: "Traffic Estimator" },
  { to: "/timezone-converter", label: "Time Zones" },
  { to: "/unit-converter", label: "Converters" },
  { to: "/route-planner", label: "Route Planner" },
];

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-lg gradient-hero flex items-center justify-center shadow-soft">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </span>
            <span className="font-semibold text-lg tracking-tight">Trafficly</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-md hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="container py-3 flex flex-col gap-1">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 rounded-md text-sm font-medium",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                    )
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border mt-16">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            <span>© {new Date().getFullYear()} Trafficly. Clean utilities, no signup.</span>
          </div>
          <div className="flex gap-4">
            <Link to="/traffic-estimator" className="hover:text-foreground">Estimator</Link>
            <Link to="/timezone-converter" className="hover:text-foreground">Time Zones</Link>
            <Link to="/unit-converter" className="hover:text-foreground">Converters</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;