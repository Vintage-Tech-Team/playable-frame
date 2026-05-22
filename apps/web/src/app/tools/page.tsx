import { Suspense } from "react";
import type { Metadata } from "next";
import { ToolsListing } from "@/components/tools/tools-listing";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Browse real estate calculators, global utilities, and measurement converters.",
};

export default function ToolsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl p-8">
          <Skeleton className="mb-4 h-10 w-48" />
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      }
    >
      <ToolsListing />
    </Suspense>
  );
}
