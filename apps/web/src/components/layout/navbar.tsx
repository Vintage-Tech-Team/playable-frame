"use client";

import Link from "next/link";
import { Menu, Moon, Sun, Building2 } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <Building2 className="h-4 w-4" />
            </span>
            <span>{siteConfig.name}</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/tools" className="hover:text-foreground transition-colors">
            All Tools
          </Link>
          <Link href="/tools/calculators/mortgage" className="hover:text-foreground transition-colors">
            Calculators
          </Link>
          <Link href="/tools/global/currency" className="hover:text-foreground transition-colors">
            Global
          </Link>
          <Link href="/tools/converters/sqft-sqm" className="hover:text-foreground transition-colors">
            Converters
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/tools">Browse Tools</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
