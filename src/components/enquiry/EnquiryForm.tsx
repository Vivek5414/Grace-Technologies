"use client";

import { useActionState } from "react";
import { submitPublicEnquiry } from "@/app/actions/enquiry";
import { initialEnquirySubmissionState } from "@/lib/enquiry-state";
import styles from "./EnquiryForm.module.css";

const serviceOptions = [
  { label: "Website Development", value: "Web Development" },
  { label: "Custom Software Development", value: "Custom Software Development" },
  { label: "IT Consulting", value: "IT Consulting" },
  { label: "Cloud Solutions", value: "Cloud Solutions" },
  { label: "Data Analytics", value: "AI and Data Solutions" },
  { label: "Digital Transformation", value: "Digital Transformation" },
  { label: "Other", value: "Other" },
];

export default function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitPublicEnquiry, initialEnquirySubmissionState);

  return (
    <form className={styles.form} action={formAction}>
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Name <span aria-hidden="true">*</span></span>
          <input autoComplete="name" name="fullName" placeholder="Enter Your Name" required />
        </label>
        <label className={styles.field}>
          <span>Mobile Number <span className={styles.optional}>(optional)</span></span>
          <input autoComplete="tel" name="phone" type="tel" placeholder="+1 or +91 phone number" />
        </label>
        <label className={`${styles.field} ${styles.fullWidth}`}>
          <span>Service Type <span aria-hidden="true">*</span></span>
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            {serviceOptions.map((service) => (
              <option key={service.value} value={service.value}>{service.label}</option>
            ))}
          </select>
        </label>
      </div>

      {state.message && <p className={state.status === "success" ? styles.success : styles.error} role={state.status === "success" ? "status" : "alert"}>{state.message}</p>}
      <button className={styles.submit} type="submit" disabled={pending || state.status === "success"}>
        {pending ? "Submitting…" : state.status === "success" ? "Enquiry received" : "Submit"}
      </button>
    </form>
  );
}
