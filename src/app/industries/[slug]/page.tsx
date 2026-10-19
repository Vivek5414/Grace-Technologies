import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import IndustryDetail from "@/components/industries/IndustryDetail";
import { industryDetails, type IndustrySlug } from "@/lib/industry-detail-data";
import styles from "@/components/industries/IndustryDetail.module.css";

export function generateStaticParams() {
  return Object.keys(industryDetails).map((slug) => ({ slug }));
}

function isIndustrySlug(slug: string): slug is IndustrySlug {
  return Object.hasOwn(industryDetails, slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) return { title: "Industry Not Found" };

  const industry = industryDetails[slug];
  return {
    title: `${industry.title} Technology Solutions`,
    description: `Explore practical digital services and technology considerations for ${industry.title.toLowerCase()} organizations.`,
  };
}

async function IndustryDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) notFound();

  return <IndustryDetail slug={slug} detail={industryDetails[slug]} />;
}

export default function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<main className={styles.loading} aria-busy="true">Loading industry details…</main>}>
      <IndustryDetailContent params={params} />
    </Suspense>
  );
}
