"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, MessageCircle, Phone, Save, Trash2 } from "lucide-react";
import { deleteContact, updateContact } from "@/app/admin/actions";
import type { AdminContactDetailResult } from "@/lib/admin/data";
import { formatDate, formatEnquiryStatus, phoneHref, smsHref, whatsappHref } from "@/lib/admin/customer-actions";
import styles from "./AdminPages.module.css";

export default function ContactDetails({ data }: { data: AdminContactDetailResult }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { enquiries, notes, history } = data;

  if (!data.contact) {
    return <p className={`${styles.notice} ${styles.noticeError}`} role="alert">{data.error ?? "Contact could not be found."}</p>;
  }
  const contact = data.contact;
  const whatsapp = whatsappHref(contact.phone);

  function saveContact(formData: FormData) {
    setMessage("");
    setError("");
    startTransition(async () => {
      const result = await updateContact(contact.id, formData);
      if (result.error) {
        setError(result.error);
        return;
      }
      setMessage(result.success ?? "Contact details saved.");
      router.refresh();
    });
  }

  function removeContact() {
    if (!window.confirm(`Delete ${contact.full_name}? Related enquiry records will be preserved.`)) return;
    setMessage("");
    setError("");
    startTransition(async () => {
      const result = await deleteContact(contact.id);
      if (result.error) {
        setError(result.error);
        return;
      }
      router.push("/admin/contacts");
      router.refresh();
    });
  }

  return (
    <>
      <section className={styles.pageHeading}>
        <div><Link className={styles.backLink} href="/admin/contacts"><ArrowLeft size={15} aria-hidden="true" /> Back to Contacts</Link><span className={styles.eyebrow}>CUSTOMER PROFILE</span><h1>{contact.full_name}</h1><p>Customer record and related enquiry activity.</p></div>
        <div className={styles.rowActions}>
          {contact.phone && <a href={phoneHref(contact.phone)} aria-label={`Call ${contact.full_name}`} title="Call"><Phone size={17} aria-hidden="true" /></a>}
          {contact.phone && <a href={smsHref(contact.phone)} aria-label={`Text ${contact.full_name}`} title="Text"><Mail size={17} aria-hidden="true" /></a>}
          {whatsapp && <a href={whatsapp} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${contact.full_name}`} title="WhatsApp"><MessageCircle size={17} aria-hidden="true" /></a>}
        </div>
      </section>
      {data.error && <p className={`${styles.notice} ${styles.noticeError}`} role="alert">{data.error}</p>}
      {message && <p className={styles.notice} role="status">{message}</p>}
      {error && <p className={`${styles.notice} ${styles.noticeError}`} role="alert">{error}</p>}

      <section className={styles.panel}>
        <div className={styles.panelHeading}><div><h2>Customer information</h2><p>Update the saved contact record. Enquiry submissions remain unchanged.</p></div></div>
        <form action={saveContact} className={styles.contactEditForm}>
          <label>Full name<input name="full_name" required minLength={2} maxLength={120} defaultValue={contact.full_name} /></label>
          <label>Email<input name="email" type="email" required maxLength={254} defaultValue={contact.email} /></label>
          <label>Phone<input name="phone" type="tel" maxLength={40} defaultValue={contact.phone ?? ""} /></label>
          <label>Company<input name="company" maxLength={160} defaultValue={contact.company ?? ""} /></label>
          <div className={styles.contactMeta}><span>Source <strong>{contact.source}</strong></span><span>Date added <strong>{formatDate(contact.created_at)}</strong></span><span>Updated <strong>{formatDate(contact.updated_at)}</strong></span></div>
          <div className={styles.formActions}>
            <button className={styles.exportButton} type="submit" disabled={pending}><Save size={15} aria-hidden="true" /> {pending ? "Saving…" : "Save contact"}</button>
            <button className={styles.dangerButton} type="button" disabled={pending} onClick={removeContact}><Trash2 size={15} aria-hidden="true" /> Delete contact</button>
          </div>
        </form>
      </section>

      <section className={`${styles.panel} ${styles.detailPanel}`}>
        <div className={styles.panelHeading}><div><h2>Enquiry history</h2><p>{enquiries.length} related {enquiries.length === 1 ? "enquiry" : "enquiries"}</p></div></div>
        {enquiries.length === 0 ? <div className={styles.emptyState}><p>No linked enquiry records yet.</p></div> : (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead><tr><th scope="col">Service</th><th scope="col">Submitted</th><th scope="col">Status</th><th scope="col">Follow-up</th><th scope="col">Details</th></tr></thead>
              <tbody>{enquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.service}</td>
                  <td>{formatDate(enquiry.created_at)}</td>
                  <td>{formatEnquiryStatus(enquiry.status)}</td>
                  <td>{formatDate(enquiry.follow_up_at)}</td>
                  <td><Link className={styles.cellLink} href={`/admin/enquiries/${enquiry.id}`}>View enquiry</Link></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>

      <section className={`${styles.panel} ${styles.detailPanel}`}>
        <div className={styles.panelHeading}><div><h2>Interaction history</h2><p>Recorded follow-up notes linked to this customer.</p></div></div>
        {notes.length === 0 ? <div className={styles.emptyState}><p>No follow-up notes have been recorded.</p></div> : (
          <ol className={styles.activityList}>{notes.map((note) => (
            <li key={note.id}>
              <div><strong>{note.admin_id ? `Administrator · ${note.admin_id.slice(0, 8)}` : "Administrator"}</strong><time dateTime={note.created_at}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(note.created_at))}</time></div>
              <p>{note.note}</p>
              <Link className={styles.cellLink} href={`/admin/enquiries/${note.enquiry_id}`}>Open related enquiry</Link>
            </li>
          ))}</ol>
        )}
      </section>
      <section className={`${styles.panel} ${styles.detailPanel}`}>
        <div className={styles.panelHeading}><div><h2>Enquiry status history</h2><p>Recorded status changes across this customer&apos;s enquiries.</p></div></div>
        {history.length === 0 ? <div className={styles.emptyState}><p>No status changes have been recorded for this customer.</p></div> : (
          <ol className={styles.activityList}>{history.map((item) => (
            <li key={item.id}>
              <div><strong>{item.enquiry_service}: {formatEnquiryStatus(item.old_status)} <span aria-hidden="true">→</span> {formatEnquiryStatus(item.new_status)}</strong><time dateTime={item.changed_at}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.changed_at))}</time></div>
              <Link className={styles.cellLink} href={`/admin/enquiries/${item.enquiry_id}`}>Open related enquiry</Link>
            </li>
          ))}</ol>
        )}
      </section>
    </>
  );
}
