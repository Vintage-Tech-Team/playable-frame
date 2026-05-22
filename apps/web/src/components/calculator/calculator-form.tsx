"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ToolField } from "@/lib/tools-registry";

interface CalculatorFormProps {
  fields: ToolField[];
  schema: z.ZodType<Record<string, unknown>>;
  onSubmit: (data: Record<string, unknown>) => void;
  loading?: boolean;
}

export function CalculatorForm({
  fields,
  schema,
  onSubmit,
  loading,
}: CalculatorFormProps) {
  const defaults = fields.reduce(
    (acc, f) => {
      acc[f.name] = f.defaultValue ?? (f.type === "number" ? 0 : "");
      return acc;
    },
    {} as Record<string, unknown>,
  );

  const form = useForm<Record<string, unknown>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: defaults,
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => onSubmit(data as Record<string, unknown>))}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type={field.type === "number" ? "number" : field.type}
              step={field.step ?? "any"}
              placeholder={field.placeholder}
              {...form.register(field.name, { valueAsNumber: field.type === "number" })}
            />
            {form.formState.errors[field.name] && (
              <p className="text-xs text-red-500">
                {String(form.formState.errors[field.name]?.message)}
              </p>
            )}
          </div>
        ))}
      </div>
      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "Calculating…" : "Calculate"}
      </Button>
    </form>
  );
}
