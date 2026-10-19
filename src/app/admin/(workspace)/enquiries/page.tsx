import type { Metadata } from "next";
import EnquiryTable from "@/components/admin/EnquiryTable";
import DemoEnquiriesSummary from "@/components/admin/DemoEnquiriesSummary";
import styles from "@/components/admin/AdminPages.module.css";

export const metadata: Metadata = {
  title: "Admin Enquiries Demo",
  description: "Explore fictional Grace Technologies service enquiries.",
  robots: { index: false, follow: false },
};

export default function AdminEnquiriesPage() {
  return (
    <>
      <section className={styles.pageHeading}>
        <div><span className={styles.eyebrow}>INBOX · DEMO</span><h1>Enquiries</h1><p>Explore sample customer requests, status updates, and follow-ups.</p></div>
      </section>
      <DemoEnquiriesSummary />
      <EnquiryTable />
    </>
  );
}