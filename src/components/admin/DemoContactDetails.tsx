"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDemoCrm } from "./DemoCrmProvider";
import { formatDate, formatEnquiryStatus } from "@/lib/admin/customer-actions";
import styles from "./AdminPages.module.css";

export default function DemoContactDetails({
  id,
  onBack,
  onShowEnquiry,
}: {
  id: string;
  onBack?: () => void;
  onShowEnquiry?: (id: string) => void;
}) {
  const router = useRouter();
  const { contacts, enquiries, notes, history, updateContact, deleteContact } = useDemoCrm();
  const contact = contacts.find((item) => item.id === id);
  const [message, setMessage] = useState("");
  const relatedEnquiries = enquiries.filter((item) => item.contact_id === id);
  const enquiryIds = new Set(relatedEnquiries.map((item) => item.id));
  const relatedNotes = notes.filter((note) => note.contact_id === id || enquiryIds.has(note.enquiry_id));
  const relatedHistory = history.filter((item) => enquiryIds.has(item.enquiry_id));

  if (!contact) {
    return <section className={styles.notice} role="status">This sample contact is not available. {onBack ? <button className={styles.backLink} type="button" onClick={onBack}>Back to Contacts</button> : <Link href="/admin/contacts">Back to Contacts</Link>}</section>;
  }

  function saveContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!contact) return;
    const formData = new FormData(event.currentTarget);
    updateContact(contact.id, {
      full_name: String(formData.get("full_name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim() || null,
      company: String(formData.get("company") ?? "").trim() || null,
    });
    setMessage("Sample contact updated for this browser session.");
  }

  function removeContact() {
    if (!contact || !window.confirm(`Remove sample contact ${contact.full_name}? Related sample enquiries will be preserved.`)) return;
    deleteContact(contact.id);
    if (onBack) onBack();
    else router.push("/admin/contacts");
  }

  return (
    <>
      <section className={styles.pageHeading}>
        <div>{onBack ? <button className={styles.backLink} type="button" onClick={onBack}><ArrowLeft size={15} aria-hidden="true" /> Back to Contacts</button> : <Link className={styles.backLink} href="/admin/contacts"><ArrowLeft size={15} aria-hidden="true" /> Back to Contacts</Link>}<span className={styles.eyebrow}>SAMPLE CUSTOMER PROFILE</span><h1>{contact.full_name}</h1><p>Fictional customer record and related sample enquiry activity.</p></div>
      </section>
      {message && <p className={styles.notice} role="status">{message}</p>}
      <section className={styles.panel}>
        <div className={styles.panelHeading}><div><h2>Customer information</h2><p>Changes are held in memory for this browser session only.</p></div></div>
        <form className={styles.contactEditForm} onSubmit={saveContact}>
          <label>Full name<input name="full_name" required minLength={2} maxLength={120} defaultValue={contact.full_name} /></label>
          <label>Email<input name="email" type="email" required maxLength={254} defaultValue={contact.email} /></label>
          <label>Phone<input name="phone" type="tel" maxLength={40} defaultValue={contact.phone ?? ""} /></label>
          <label>Company<input name="company" maxLength={160} defaultValue={contact.company ?? ""} /></label>
          <div className={styles.contactMeta}><span>Source <strong>{contact.source}</strong></span><span>Date added <strong>{formatDate(contact.created_at)}</strong></span><span>Phone <strong>Not provided in demo</strong></span></div>
          <div className={styles.formActions}>
            <button className={styles.exportButton} type="submit"><Save size={15} aria-hidden="true" /> Save sample contact</button>
            <button className={styles.dangerButton} type="button" onClick={removeContact}><Trash2 size={15} aria-hidden="true" /> Remove sample contact</button>
          </div>
        </form>
      </section>

      <section className={`${styles.panel} ${styles.detailPanel}`}>
        <div className={styles.panelHeading}><div><h2>Enquiry history</h2><p>{relatedEnquiries.length} related sample {relatedEnquiries.length === 1 ? "enquiry" : "enquiries"}</p></div></div>
        {relatedEnquiries.length === 0 ? <div className={styles.emptyState}><p>No related sample enquiry records.</p></div> : (
          <div className={styles.tableScroll}><table className={styles.table}>
            <thead><tr><th scope="col">Service</th><th scope="col">Submitted</th><th scope="col">Status</th><th scope="col">Follow-up</th><th scope="col">Details</th></tr></thead>
            <tbody>{relatedEnquiries.map((enquiry) => <tr key={enquiry.id}>
              <td>{enquiry.service}</td><td>{formatDate(enquiry.created_at)}</td><td>{formatEnquiryStatus(enquiry.status)}</td><td>{formatDate(enquiry.follow_up_at)}</td>
              <td>{onShowEnquiry ? <button className={styles.cellLink} type="button" onClick={() => onShowEnquiry(enquiry.id)}>View enquiry</button> : <Link className={styles.cellLink} href={`/admin/enquiries/${enquiry.id}`}>View enquiry</Link>}</td>
            </tr>)}</tbody>
          </table></div>
        )}
      </section>

      <section className={`${styles.panel} ${styles.detailPanel}`}>
        <div className={styles.panelHeading}><div><h2>Interaction history</h2><p>Sample follow-up notes associated with this customer.</p></div></div>
        {relatedNotes.length === 0 ? <div className={styles.emptyState}><p>No sample follow-up notes have been recorded.</p></div> : <ol className={styles.activityList}>{relatedNotes.map((note) => (
          <li key={note.id}><div><strong>Demo administrator</strong><time dateTime={note.created_at}>{formatDate(note.created_at)}</time></div><p>{note.note}</p>{onShowEnquiry ? <button className={styles.cellLink} type="button" onClick={() => onShowEnquiry(note.enquiry_id)}>Open related enquiry</button> : <Link className={styles.cellLink} href={`/admin/enquiries/${note.enquiry_id}`}>Open related enquiry</Link>}</li>
        ))}</ol>}
      </section>
      <section className={`${styles.panel} ${styles.detailPanel}`}>
        <div className={styles.panelHeading}><div><h2>Enquiry status history</h2><p>Fictional sample activity; new changes are session-only.</p></div></div>
        {relatedHistory.length === 0 ? <div className={styles.emptyState}><p>No sample status changes have been recorded.</p></div> : <ol className={styles.activityList}>{relatedHistory.map((item) => {
          const enquiry = relatedEnquiries.find(({ id: enquiryId }) => enquiryId === item.enquiry_id);
          return <li key={item.id}><div><strong>{enquiry?.service}: {formatEnquiryStatus(item.old_status)} → {formatEnquiryStatus(item.new_status)}</strong><time dateTime={item.changed_at}>{formatDate(item.changed_at)}</time></div>{onShowEnquiry ? <button className={styles.cellLink} type="button" onClick={() => onShowEnquiry(item.enquiry_id)}>Open related enquiry</button> : <Link className={styles.cellLink} href={`/admin/enquiries/${item.enquiry_id}`}>Open related enquiry</Link>}</li>;
        })}</ol>}
      </section>
    </>
  );
}
