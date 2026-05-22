import { Badge } from "@/components/ui/badge";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  category?: string;
  children: React.ReactNode;
}

export function CalculatorLayout({
  title,
  description,
  category,
  children,
}: CalculatorLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        {category && (
          <Badge variant="secondary" className="mb-3 capitalize">
            {category}
          </Badge>
        )}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">{children}</div>
    </div>
  );
}
