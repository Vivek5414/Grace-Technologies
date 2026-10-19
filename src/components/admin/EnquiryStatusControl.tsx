"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateEnquiryStatus } from "@/app/admin/actions";
import { enquiryStatusLabels } from "@/lib/admin/customer-actions";
import type { EnquiryStatus } from "@/types/admin";
import styles from "./AdminPages.module.css";

export default function EnquiryStatusControl({ enquiryId, status }: { enquiryId: string; status: EnquiryStatus }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleChange(nextStatus: EnquiryStatus) {
    setMessage("");
    startTransition(async () => {
      const result = await updateEnquiryStatus(enquiryId, nextStatus);
      if (result.error) {
        setMessage(result.error);
        return;
      }
      setMessage("Status saved.");
      router.refresh();
    });
  }

  return (
    <label className={styles.statusControl}>
      <span className="sr-only">Change enquiry status</span>
      <select className={styles.statusSelect} value={status} disabled={pending} onChange={(event) => handleChange(event.currentTarget.value as EnquiryStatus)}>
        {Object.entries(enquiryStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
      {pending && <span className={styles.statusError} role="status">Saving…</span>}
      {message && <span className={styles.statusError} role={message === "Status saved." ? "status" : "alert"}>{message}</span>}
    </label>
  );
}