import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/services/ServiceDetail";
import { services } from "@/lib/site-data";
import { serviceDetails, type ServiceDetailSlug } from "@/lib/service-detail-data";
import styles from "@/components/services/ServiceDetail.module.css";

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({ slug }));
}

function isServiceDetailSlug(slug: string): slug is ServiceDetailSlug {
  return Object.hasOwn(serviceDetails, slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceDetailSlug(slug)) return { title: "Service Not Found" };

  const detail = serviceDetails[slug];
  const service = services.find((item) => item.id === detail.serviceId);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.description,
  };
}

async function ServiceDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isServiceDetailSlug(slug)) notFound();

  const detail = serviceDetails[slug];
  const service = services.find((item) => item.id === detail.serviceId);
  if (!service) notFound();

  return <ServiceDetail detail={detail} />;
}

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<main className={styles.loading} aria-busy="true">Loading service details…</main>}>
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}