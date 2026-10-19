"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { submitHomepageEnquiry } from "@/app/actions/enquiry";
import { initialEnquirySubmissionState } from "@/lib/enquiry-state";
import styles from "./Contact.module.css";

export default function HomeContactForm() {
  const [state, formAction, pending] = useActionState(submitHomepageEnquiry, initialEnquirySubmissionState);

  return (
    <form className={styles.formCard} action={formAction}>
      <h3>Let&apos;s start a conversation</h3>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Name <span aria-hidden="true">*</span></span>
          <input
            autoComplete="name"
            name="fullName"
            placeholder="Enter your full name"
            required
            minLength={2}
            maxLength={120}
          />
        </label>
        <label className={styles.field}>
          <span>Mobile Number <span aria-hidden="true">*</span></span>
          <input
            autoComplete="tel"
            name="phone"
            type="tel"
            placeholder="Enter your mobile number"
            required
            pattern="[+0-9() .-]{7,25}"
            title="Enter 7 to 15 digits, optionally using +, spaces, parentheses, hyphens, or dots."
            maxLength={40}
          />
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span>Your Message <span aria-hidden="true">*</span></span>
          <textarea
            name="message"
            placeholder="Tell us about your project or requirements"
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
          "Enquiry sent"
        ) : (
          <>Send Enquiry <ArrowRight size={17} aria-hidden="true" /></>
        )}
      </button>
    </form>
  );
}
