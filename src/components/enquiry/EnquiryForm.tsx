"use client";

import { useActionState } from "react";
import { submitPublicEnquiry } from "@/app/actions/enquiry";
import { initialEnquirySubmissionState } from "@/lib/enquiry-state";
import { enquiryServices } from "@/lib/enquiry-services";
import styles from "./EnquiryForm.module.css";

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
            {enquiryServices.map((service) => (
              <option key={service} value={service}>{service}</option>
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
