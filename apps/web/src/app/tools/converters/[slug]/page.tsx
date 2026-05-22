import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConverterTool } from "@/components/tools/converter-tool";
import { CONVERTER_SLUG_MAP } from "@/lib/tools-registry";

const TITLES: Record<string, string> = {
  "sqft-sqm": "Sq Ft ↔ Sq M",
  "acres-hectares": "Acres ↔ Hectares",
  "feet-meters": "Feet ↔ Metres",
  "inches-cm": "Inches ↔ CM",
  weight: "Weight Converter",
  temperature: "Temperature Converter",
  volume: "Volume Converter",
  distance: "Distance Converter",
  height: "Height Converter",
  "area-general": "Area Converter",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CONVERTER_SLUG_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: TITLES[slug] ?? "Converter" };
}

export default async function ConverterPage({ params }: PageProps) {
  const { slug } = await params;
  if (!CONVERTER_SLUG_MAP[slug]) notFound();
  return (
    <ConverterTool
      slug={slug}
      title={TITLES[slug] ?? slug}
      description="Convert between units using the modular conversion engine."
    />
  );
}
