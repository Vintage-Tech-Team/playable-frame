import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlobalTool } from "@/components/tools/global-tool";

const SLUGS = [
  "currency",
  "world-clock",
  "timezone-compare",
  "meeting-planner",
  "date-difference",
  "time-duration",
  "weather",
  "utc-converter",
  "city-distance",
  "holidays",
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ") };
}

export default async function GlobalToolPage({ params }: PageProps) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();
  return <GlobalTool slug={slug} />;
}
