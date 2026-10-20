"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { submitPublicEnquiry } from "@/app/actions/enquiry";
import { initialEnquirySubmissionState } from "@/lib/enquiry-state";
import { enquiryServices } from "@/lib/enquiry-services";
import styles from "./ContactEnquiryForm.module.css";

export default function ContactEnquiryForm() {
  const [state, formAction, pending] = useActionState(submitPublicEnquiry, initialEnquirySubmissionState);

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Full Name <span aria-hidden="true">*</span></span>
          <input autoComplete="name" name="fullName" placeholder="Enter your full name" required minLength={2} maxLength={120} />
        </label>
        <label className={styles.field}>
          <span>Work Email <span aria-hidden="true">*</span></span>
          <input autoComplete="email" name="email" type="email" placeholder="you@company.com" required maxLength={254} />
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span>Phone Number</span>
          <input autoComplete="tel" name="phone" type="tel" placeholder="Enter your phone number" maxLength={40} />
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span>Service Interested In <span aria-hidden="true">*</span></span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            {enquiryServices.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span>Message <span aria-hidden="true">*</span></span>
          <textarea
            name="message"
            placeholder="Tell us about your project, business, or requirements."
            required
            minLength={10}
            maxLength={5000}
            rows={5}
          />
        </label>
      </div>

      {state.message && (
        <p
          className={state.status === "success" ? styles.success : styles.error}
          role={state.status === "success" ? "status" : "alert"}
        >
          {state.message}
        </p>
      )}
      <button className={styles.submit} type="submit" disabled={pending || state.status === "success"}>
        {pending ? (
          <><LoaderCircle className={styles.spinner} size={17} aria-hidden="true" /> Sending…</>
        ) : state.status === "success" ? (
          "Message sent"
        ) : (
          <>Send Message <ArrowRight size={17} aria-hidden="true" /></>
        )}
      </button>
    </form>
  );
}
