import type { Metadata } from "next";
import WhatsAppAnalytics from "@/components/admin/WhatsAppAnalytics";
import styles from "@/components/admin/AdminPages.module.css";

export const metadata: Metadata = {
  title: "Admin WhatsApp Analytics",
  description: "WhatsApp click analytics availability for Grace Technologies.",
  robots: { index: false, follow: false },
};

export default function AdminWhatsAppPage() {
  return (
    <>
      <section className={styles.pageHeading}>
        <div><span className={styles.eyebrow}>CHANNEL PERFORMANCE</span><h1>WhatsApp Click Analytics</h1><p>Review click activity when a WhatsApp analytics source is connected.</p></div>
      </section>
      <WhatsAppAnalytics />
    </>
  );
}