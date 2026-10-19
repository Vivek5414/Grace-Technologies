"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { ArrowLeft, CalendarClock, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { addEnquiryFollowUpNote, updateEnquiryFollowUpDate } from "@/app/admin/actions";
import type { AdminEnquiryDetailResult } from "@/lib/admin/data";
import { formatDate, formatEnquiryStatus, phoneHref, smsHref, whatsappHref } from "@/lib/admin/customer-actions";
import EnquiryStatusControl from "./EnquiryStatusControl";
import styles from "./AdminPages.module.css";

function datetimeLocalValue(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 16);
}

export default function EnquiryDetails({ data }: { data: AdminEnquiryDetailResult }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [dateValue, setDateValue] = useState(datetimeLocalValue(data.enquiry?.follow_up_at ?? null));
  const [dateMessage, setDateMessage] = useState("");
  const [noteMessage, setNoteMessage] = useState("");
  const [noteError, setNoteError] = useState("");
  if (!data.enquiry) {
    return <p className={`${styles.notice} ${styles.noticeError}`} role="alert">{data.error ?? "Enquiry could not be found."}</p>;
  }
  const enquiry = data.enquiry;

  const whatsapp = whatsappHref(enquiry.phone);

  function saveFollowUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDateMessage("");
    startTransition(async () => {
      const isoDate = dateValue ? new Date(dateValue).toISOString() : "";
      const result = await updateEnquiryFollowUpDate(enquiry.id, isoDate);
      if (result.error) {
        setDateMessage(result.error);
        return;
      }
      setDateMessage(result.success ?? "Follow-up date saved.");
      router.refresh();
    });
  }

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNoteMessage("");
    setNoteError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    startTransition(async () => {
      const result = await addEnquiryFollowUpNote(enquiry.id, formData);
      if (result.error) {
        setNoteError(result.error);
        return;
      }
      setNoteMessage(result.success ?? "Follow-up note saved.");
      form.reset();
      router.refresh();
    });
  }

  return (
    <>
      <section className={styles.pageHeading}>
        <div><Link className={styles.backLink} href="/admin/enquiries"><ArrowLeft size={15} aria-hidden="true" /> Back to Enquiries</Link><span className={styles.eyebrow}>ENQUIRY DETAILS</span><h1>{enquiry.full_name}</h1><p>{enquiry.service} · submitted {formatDate(enquiry.created_at)}</p></div>
        <div className={styles.rowActions}>
          {enquiry.phone && <a href={phoneHref(enquiry.phone)} aria-label={`Call ${enquiry.full_name}`} title="Call"><Phone size={17} aria-hidden="true" /></a>}
          {enquiry.phone && <a href={smsHref(enquiry.phone)} aria-label={`Text ${enquiry.full_name}`} title="Text"><Mail size={17} aria-hidden="true" /></a>}
          {whatsapp && <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${enquiry.full_name}`} title="WhatsApp"><MessageCircle size={17} aria-hidden="true" /></a>}
        </div>
      </section>
      {data.error && <p className={`${styles.notice} ${styles.noticeError}`} role="alert">{data.error}</p>}

      <section className={styles.detailGrid}>
        <article className={styles.panel}>
          <div className={styles.panelHeading}><div><h2>Request</h2><p>Submitted customer information and message</p></div></div>
          <dl className={styles.detailList}>
            <div><dt>Customer</dt><dd>{enquiry.full_name}</dd></div>
            <div><dt>Phone</dt><dd>{enquiry.phone ? <a className={styles.cellLink} href={phoneHref(enquiry.phone)}>{enquiry.phone}</a> : "Not provided"}</dd></div>
            <div><dt>Email</dt><dd>{enquiry.email ? <a className={styles.cellLink} href={`mailto:${enquiry.email}`}>{enquiry.email}</a> : "Not provided"}</dd></div>
            <div><dt>Service</dt><dd>{enquiry.service}</dd></div>
            <div><dt>Source</dt><dd>{enquiry.source}</dd></div>
            <div><dt>Submitted</dt><dd><time dateTime={enquiry.created_at}>{new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(enquiry.created_at))}</time></dd></div>
            <div className={styles.fullWidthDetail}><dt>Enquiry message</dt><dd className={styles.messageBody}>{enquiry.message}</dd></div>
            {data.contact && <div><dt>Related contact</dt><dd><Link className={styles.cellLink} href={`/admin/contacts/${data.contact.id}`}>{data.contact.full_name}</Link></dd></div>}
          </dl>
        </article>

        <div className={styles.detailStack}>
          <section className={styles.panel}>
            <div className={styles.panelHeading}><div><h2>Status</h2><p>Current stage: {formatEnquiryStatus(enquiry.status)}</p></div></div>
            <div className={styles.detailControl}><EnquiryStatusControl enquiryId={enquiry.id} status={enquiry.status} /></div>
          </section>

          <section className={styles.panel}>
            <div className={styles.panelHeading}><div><h2>Follow-up date</h2><p>Set or update the next follow-up.</p></div><CalendarClock size={18} aria-hidden="true" /></div>
            <form className={styles.followUpForm} onSubmit={saveFollowUp}>
              <label>Follow-up date and time<input type="datetime-local" value={dateValue} onChange={(event) => setDateValue(event.currentTarget.value)} /></label>
              <button className={styles.exportButton} type="submit" disabled={pending}>{pending ? "Saving…" : "Save follow-up"}</button>
              {dateMessage && <p role={dateMessage.endsWith("saved.") || dateMessage.endsWith("cleared.") ? "status" : "alert"}>{dateMessage}</p>}
            </form>
          </section>
        </div>
      </section>

      <section className={`${styles.panel} ${styles.detailPanel}`}>
        <div className={styles.panelHeading}><div><h2>Follow-up notes</h2><p>Record a customer interaction for the enquiry history.</p></div></div>
        <form className={styles.noteForm} onSubmit={saveNote}>
          <label>Note<textarea name="note" required maxLength={4000} rows={4} placeholder="Add a concise note about the customer follow-up…" /></label>
          <button className={styles.exportButton} type="submit" disabled={pending}><Send size={15} aria-hidden="true" /> {pending ? "Saving…" : "Add note"}</button>
          {noteMessage && <p role="status">{noteMessage}</p>}
          {noteError && <p role="alert" className={styles.formError}>{noteError}</p>}
        </form>
        {data.notes.length === 0 ? <div className={styles.emptyState}><p>No follow-up notes have been recorded for this enquiry.</p></div> : (
          <ol className={styles.activityList}>{data.notes.map((note) => (
            <li key={note.id}>
              <div><strong>{note.admin_id ? `Administrator · ${note.admin_id.slice(0, 8)}` : "Administrator"}</strong><time dateTime={note.created_at}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(note.created_at))}</time></div>
              <p>{note.note}</p>
            </li>
          ))}</ol>
        )}
      </section>

      <section className={`${styles.panel} ${styles.detailPanel}`}>
        <div className={styles.panelHeading}><div><h2>Status history</h2><p>Recorded changes since status tracking was enabled.</p></div></div>
        {data.history.length === 0 ? <div className={styles.emptyState}><p>No status changes have been recorded for this enquiry.</p></div> : (
          <ol className={styles.activityList}>{data.history.map((item) => (
            <li key={item.id}>
              <div><strong>{formatEnquiryStatus(item.old_status)} <span aria-hidden="true">→</span> {formatEnquiryStatus(item.new_status)}</strong><time dateTime={item.changed_at}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.changed_at))}</time></div>
              <p>{item.admin_id ? `Changed by administrator ${item.admin_id.slice(0, 8)}.` : "Changed by an administrator."}</p>
            </li>
          ))}</ol>
        )}
      </section>
    </>
  );
}
