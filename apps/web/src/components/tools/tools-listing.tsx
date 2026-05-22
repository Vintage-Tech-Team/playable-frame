"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useToolsStore, type ToolCategory } from "@/stores/tools-store";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const CATEGORY_PATH: Record<ToolCategory, string> = {
  CALCULATOR: "calculators",
  GLOBAL: "global",
  CONVERTER: "converters",
};

const FILTERS: { label: string; value: ToolCategory | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Calculators", value: "CALCULATOR" },
  { label: "Global", value: "GLOBAL" },
  { label: "Converters", value: "CONVERTER" },
];

export function ToolsListing() {
  const searchParams = useSearchParams();
  const { tools, loading, error, search, categoryFilter, setSearch, setCategoryFilter, fetchTools } =
    useToolsStore();

  useEffect(() => {
    const cat = searchParams.get("category") as ToolCategory | null;
    if (cat && ["CALCULATOR", "GLOBAL", "CONVERTER"].includes(cat)) {
      setCategoryFilter(cat);
    }
    fetchTools();
  }, [searchParams, fetchTools, setCategoryFilter]);

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchCat = categoryFilter === "ALL" || t.category === categoryFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [tools, search, categoryFilter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Tools</h1>
        <p className="mt-2 text-muted-foreground">
          Search and filter calculators, global utilities, and converters.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search tools…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f.value}
              variant={categoryFilter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Ensure the API is running at {process.env.NEXT_PUBLIC_API_URL}
          </p>
          <Button className="mt-4" variant="outline" onClick={() => fetchTools()}>
            Retry
          </Button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
          No tools match your search.
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${CATEGORY_PATH[tool.category]}/${tool.slug}`}
            >
              <Card className="h-full transition-all hover:border-primary/40 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                    <Badge variant="secondary" className="shrink-0 text-xs capitalize">
                      {tool.category.toLowerCase()}
                    </Badge>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
