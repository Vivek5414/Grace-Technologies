"use client";

import { useActionState } from "react";
import { initialEnquirySubmissionState, submitPublicEnquiry } from "@/app/actions/enquiry";
import styles from "./EnquiryForm.module.css";

const serviceOptions = [
  "Web Development",
  "Custom Software Development",
  "Mobile Application Development",
  "IT Consulting",
  "Cloud Solutions",
  "AI and Data Solutions",
  "UI/UX Design",
  "Digital Transformation",
  "Other",
];

export default function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitPublicEnquiry, initialEnquirySubmissionState);

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Full name <span aria-hidden="true">*</span></span>
          <input autoComplete="name" name="fullName" placeholder="Your name" required />
        </label>
        <label className={styles.field}>
          <span>Business email <span aria-hidden="true">*</span></span>
          <input autoComplete="email" name="email" type="email" placeholder="you@company.com" required />
        </label>
        <label className={styles.field}>
          <span>Company <span className={styles.optional}>(optional)</span></span>
          <input autoComplete="organization" name="company" maxLength={160} placeholder="Company name" />
        </label>
        <label className={styles.field}>
          <span>Phone number <span className={styles.optional}>(optional)</span></span>
          <input autoComplete="tel" name="phone" type="tel" placeholder="Enter your phone number" />
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span>Service type <span aria-hidden="true">*</span></span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((service) => <option key={service}>{service}</option>)}
          </select>
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span>How can we help? <span aria-hidden="true">*</span></span>
          <textarea name="message" rows={3} minLength={10} maxLength={5000} placeholder="A little about your goals or current challenge" required />
        </label>
      </div>

      {state.message && <p className={state.status === "success" ? styles.success : styles.error} role={state.status === "success" ? "status" : "alert"}>{state.message}</p>}
      <button className={styles.submit} type="submit" disabled={pending || state.status === "success"}>
        {pending ? "Submitting…" : state.status === "success" ? "Enquiry received" : "Submit Enquiry"}
      </button>
    </form>
  );
}
