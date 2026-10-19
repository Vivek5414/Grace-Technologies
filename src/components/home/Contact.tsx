import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import styles from "./Contact.module.css";

const registeredEmail = "er.priyanksharma90@yahoo.in";

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
        <div className={styles.details}>
          <div className={styles.detail}><Mail size={19} aria-hidden="true" /><div><span>Email</span><a href={`mailto:${registeredEmail}`}>{registeredEmail}</a></div></div>
          <div className={styles.detail}><MapPin size={19} aria-hidden="true" /><div><span>Registered Office</span><address>398 Whalebone Lane South<br />Romford, Greater London<br />RM6 6HP, England</address></div></div>
          <p className={styles.note}>The registered office is in England. Grace Technologies does not list a US physical office.</p>
        </div>
      </div>
    </section>
  );
}
