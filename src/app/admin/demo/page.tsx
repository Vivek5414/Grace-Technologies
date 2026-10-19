import type { Metadata } from "next";
import { Suspense } from "react";
import AdminDemo, { type DemoSection } from "@/components/admin/AdminDemo";
import { DemoCrmProvider } from "@/components/admin/DemoCrmProvider";

export const metadata: Metadata = {
  title: "Admin Dashboard Demo | Grace Technologies",
  description: "Preview the Grace Technologies admin workspace with fictional sample data. No sign-in required and no changes are saved.",
  robots: { index: false, follow: false },
};

const demoSections = new Set<DemoSection>(["dashboard", "contacts", "enquiries", "whatsapp", "admin"]);

async function DemoAdminWorkspace({
  searchParams,
}: {
  searchParams: Promise<{ section?: string | string[] }>;
}) {
  const { section } = await searchParams;
  const initialSection = typeof section === "string" && demoSections.has(section as DemoSection)
    ? section as DemoSection
    : "dashboard";

  return <DemoCrmProvider><AdminDemo initialSection={initialSection} /></DemoCrmProvider>;
}

export default function AdminDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<main aria-busy="true">Loading demo workspace…</main>}>
      <DemoAdminWorkspace searchParams={searchParams} />
    </Suspense>
  );
}