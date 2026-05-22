import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-semibold">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Tools</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/tools" className="hover:text-foreground">All Tools</Link></li>
              <li><Link href="/tools/calculators/mortgage" className="hover:text-foreground">Mortgage</Link></li>
              <li><Link href="/tools/global/currency" className="hover:text-foreground">Currency</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Platform</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Production-ready MVP</li>
              <li>REST API + PostgreSQL</li>
              <li>Modular calculator engine</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
