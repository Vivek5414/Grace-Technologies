import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import EnquiryForm from "@/components/enquiry/EnquiryForm";
import PageIntro from "@/components/layout/PageIntro";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Grace Technologies about web development, software, IT consulting, and digital transformation.",
};

export default function ContactPage() {
  return (
    <main>
      <PageIntro eyebrow="Contact" title="Let’s start with a useful conversation." description="Share a little about your business and what you are working toward. The form will confirm whether your enquiry was received or if you need to contact us directly." />
      <section className={styles.section}>
        <div className={styles.inner}>
          <aside className={styles.details}>
            <h2>Grace Technologies</h2>
            <p>For service enquiries, use the form or contact the registered email address directly.</p>
            <div className={styles.detail}><Mail size={20} aria-hidden="true" /><div><strong>Email</strong><a href="mailto:er.priyanksharma90@yahoo.in">er.priyanksharma90@yahoo.in</a></div></div>
            <div className={styles.detail}><MapPin size={20} aria-hidden="true" /><div><strong>Registered Office</strong><address>398 Whalebone Lane South<br />Romford<br />Greater London<br />RM6 6HP<br />England</address></div></div>
            <p className={styles.note}>Registered office in England. No US telephone number or physical office is listed.</p>
          </aside>
          <div className={styles.formPanel}>
            <h2>Send an enquiry</h2>
            <p>Required fields are marked with an asterisk.</p>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
