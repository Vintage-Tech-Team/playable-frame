"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, Globe, Ruler, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CALCULATOR_TOOLS } from "@/lib/tools-registry";

const sections = [
  {
    title: "Calculators",
    icon: Calculator,
    href: "/tools?category=CALCULATOR",
    items: CALCULATOR_TOOLS.slice(0, 8).map((t) => ({
      label: t.title,
      href: `/tools/calculators/${t.slug}`,
    })),
  },
  {
    title: "Global Tools",
    icon: Globe,
    href: "/tools?category=GLOBAL",
    items: [
      { label: "Currency", href: "/tools/global/currency" },
      { label: "World Clock", href: "/tools/global/world-clock" },
      { label: "Weather", href: "/tools/global/weather" },
    ],
  },
  {
    title: "Converters",
    icon: Ruler,
    href: "/tools?category=CONVERTER",
    items: [
      { label: "Sq Ft ↔ Sq M", href: "/tools/converters/sqft-sqm" },
      { label: "Temperature", href: "/tools/converters/temperature" },
      { label: "Distance", href: "/tools/converters/distance" },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-background transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4 lg:hidden">
          <span className="font-semibold">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="overflow-y-auto p-4 h-[calc(100vh-4rem)] lg:h-auto">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <Link
                href={section.href}
                onClick={onClose}
                className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                <section.icon className="h-3.5 w-3.5" />
                {section.title}
              </Link>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                        pathname === item.href && "bg-muted font-medium text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
