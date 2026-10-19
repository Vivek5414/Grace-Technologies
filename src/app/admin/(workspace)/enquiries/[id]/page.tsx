import type { Metadata } from "next";
import DemoEnquiryDetails from "@/components/admin/DemoEnquiryDetails";

export const metadata: Metadata = {
  title: "Enquiry Details",
  description: "Review and manage a Grace Technologies customer enquiry.",
  robots: { index: false, follow: false },
};

export default async function AdminEnquiryDetailPage({ params }: PageProps<"/admin/enquiries/[id]">) {
  const { id } = await params;
  return <DemoEnquiryDetails id={id} />;
}
