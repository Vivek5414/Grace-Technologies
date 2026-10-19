import type { Metadata } from "next";
import DemoContactDetails from "@/components/admin/DemoContactDetails";

export const metadata: Metadata = {
  title: "Contact Details",
  description: "View and update a Grace Technologies customer record.",
  robots: { index: false, follow: false },
};

export default async function AdminContactDetailPage({ params }: PageProps<"/admin/contacts/[id]">) {
  const { id } = await params;
  return <DemoContactDetails id={id} />;
}
