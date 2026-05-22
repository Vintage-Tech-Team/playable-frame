import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolRunner } from "@/components/tools/tool-runner";
import { OfferComparisonTool } from "@/components/tools/offer-comparison-tool";
import { CALCULATOR_TOOLS, getToolBySlug } from "@/lib/tools-registry";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CALCULATOR_TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug("calculators", slug);
  if (!tool) return { title: "Calculator" };
  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "offer-comparison") {
    return <OfferComparisonTool />;
  }
  const tool = getToolBySlug("calculators", slug);
  if (!tool) notFound();
  return <ToolRunner slug={slug} />;
}
