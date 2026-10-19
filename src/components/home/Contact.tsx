import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HomeContactForm from "./HomeContactForm";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>Start a conversation</span>
          <h2 id="contact-heading">Tell us what you&apos;re working on.</h2>
          <p>Share the challenge, the idea, or the process you want to improve. We&apos;ll listen and talk through a practical next step.</p>
          <Link className={styles.button} href="/contact">Contact Grace Technologies <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <HomeContactForm />
      </div>
    </section>
  );
}
