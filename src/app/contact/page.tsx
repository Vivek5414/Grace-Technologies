import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import ContactEnquiryForm from "@/components/contact/ContactEnquiryForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Grace Technologies about web development, software, IT consulting, and digital transformation.",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.section} aria-labelledby="contact-heading">
        <div className={styles.inner}>
          <header className={styles.heading}>
            <span className={styles.eyebrow}>Let&apos;s Connect</span>
            <h1 id="contact-heading">Get in Touch with <span>Grace Technologies</span></h1>
            <p>
              Have a project in mind or looking to improve your business operations? Tell us what you&apos;re
              working on. Our team will help you explore a practical next step.
            </p>
          </header>
          <div className={styles.contactGrid}>
            <aside className={styles.contactColumn} aria-labelledby="contact-information-heading">
              <div className={styles.columnHeading}>
                <span className={styles.eyebrow}>Contact Information</span>
                <h2 id="contact-information-heading">We&apos;re ready to listen.</h2>
                <p>Reach out directly or share a few details using the enquiry form.</p>
              </div>
              <div className={styles.details}>
                <article className={styles.detail}>
                  <span className={styles.icon}><Mail size={20} aria-hidden="true" /></span>
                  <div>
                    <strong>Official Company Email</strong>
                    <a href="mailto:contact@gracetechnologies.uk">contact@gracetechnologies.uk</a>
                  </div>
                </article>
                <article className={styles.detail}>
                  <span className={styles.icon}><MapPin size={20} aria-hidden="true" /></span>
                  <div>
                    <strong>Registered Office</strong>
                    <address>
                      398 Whalebone Lane South<br />
                      Romford<br />
                      Greater London<br />
                      RM6 6HP<br />
                      England
                    </address>
                  </div>
                </article>
              </div>
              <p className={styles.note}>Registered office in England. No US physical office is represented.</p>
            </aside>
            <div className={styles.formPanel}>
              <div className={styles.formHeading}>
                <span className={styles.eyebrow}>Project Enquiry</span>
                <h2>Tell us what you&apos;re looking for.</h2>
                <p>Required fields are marked with an asterisk.</p>
              </div>
              <ContactEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
