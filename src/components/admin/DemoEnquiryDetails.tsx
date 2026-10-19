"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useDemoCrm } from "./DemoCrmProvider";
import { enquiryStatusLabels, formatDate } from "@/lib/admin/customer-actions";
import type { EnquiryStatus } from "@/types/admin";
import styles from "./AdminPages.module.css";

const statuses = Object.keys(enquiryStatusLabels) as EnquiryStatus[];

export default function DemoEnquiryDetails({
  id,
  onBack,
  onShowContact,
}: {
  id: string;
  onBack?: () => void;
  onShowContact?: (id: string) => void;
}) {
  const { enquiries, contacts, notes, history, updateEnquiryStatus, updateFollowUpDate, addFollowUpNote } = useDemoCrm();
  const enquiry = enquiries.find((item) => item.id === id);
  const [noteMessage, setNoteMessage] = useState("");
  const [followUpMessage, setFollowUpMessage] = useState("");
  const relatedNotes = notes.filter((note) => note.enquiry_id === id);
  const relatedHistory = history.filter((item) => item.enquiry_id === id);

  if (!enquiry) {
    return <section className={styles.notice} role="status">This sample enquiry is not available. {onBack ? <button className={styles.backLink} type="button" onClick={onBack}>Back to Enquiries</button> : <Link href="/admin/enquiries">Back to Enquiries</Link>}</section>;
  }

  const contact = contacts.find((item) => item.id === enquiry.contact_id);

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enquiry) return;
    const formData = new FormData(event.currentTarget);
    const note = String(formData.get("note") ?? "").trim();
    if (!note) return;
    addFollowUpNote(enquiry.id, note);
    event.currentTarget.reset();
    setNoteMessage("Sample follow-up note added for this browser session.");
  }

  function saveFollowUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enquiry) return;
    const formData = new FormData(event.currentTarget);
    const date = String(formData.get("follow_up_at") ?? "");
    updateFollowUpDate(enquiry.id, date ? new Date(`${date}T12:00:00`).toISOString() : null);
    setFollowUpMessage("Sample follow-up date updated for this browser session.");
  }

  return (
    <>
      <section className={styles.pageHeading}>
        <div>{onBack ? <button className={styles.backLink} type="button" onClick={onBack}><ArrowLeft size={15} aria-hidden="true" /> Back to Enquiries</button> : <Link className={styles.backLink} href="/admin/enquiries"><ArrowLeft size={15} aria-hidden="true" /> Back to Enquiries</Link>}<span className={styles.eyebrow}>SAMPLE ENQUIRY</span><h1>{enquiry.full_name}</h1><p>{enquiry.service} · submitted {formatDate(enquiry.created_at)}</p></div>
      </section>

      <div className={styles.detailGrid}>
        <div className={styles.detailStack}>
          <section className={styles.panel}>
            <div className={styles.panelHeading}><div><h2>Request details</h2><p>Fictional customer submission for demo purposes.</p></div></div>
            <dl className={styles.detailList}>
              <div><dt>Customer</dt><dd>{enquiry.full_name}</dd></div>
              <div><dt>Email</dt><dd>{enquiry.email}</dd></div>
              <div><dt>Phone</dt><dd>Not provided in demo</dd></div>
              <div><dt>Requested service</dt><dd>{enquiry.service}</dd></div>
              <div><dt>Source</dt><dd>{enquiry.source}</dd></div>
              <div><dt>Submission date</dt><dd>{formatDate(enquiry.created_at)}</dd></div>
              <div className={styles.fullWidthDetail}><dt>Enquiry message</dt><dd className={styles.messageBody}>{enquiry.message}</dd></div>
              <div className={styles.fullWidthDetail}><dt>Related contact</dt><dd>{contact ? onShowContact ? <button className={styles.cellLink} type="button" onClick={() => onShowContact(contact.id)}>{contact.full_name}</button> : <Link className={styles.cellLink} href={`/admin/contacts/${contact.id}`}>{contact.full_name}</Link> : "No linked sample contact"}</dd></div>
            </dl>
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeading}><div><h2>Follow-up notes</h2><p>Notes are not saved outside this browser session.</p></div></div>
            <form className={styles.noteForm} onSubmit={saveNote}>
              <label>New note<textarea name="note" required maxLength={2000} placeholder="Add a sample follow-up note" /></label>
              <button className={styles.exportButton} type="submit"><Save size={15} aria-hidden="true" /> Add sample note</button>
              {noteMessage && <p role="status">{noteMessage}</p>}
            </form>
            {relatedNotes.length === 0 ? <div className={styles.emptyState}><p>No sample notes recorded.</p></div> : <ol className={styles.activityList}>{relatedNotes.map((note) => (
              <li key={note.id}><div><strong>Demo administrator</strong><time dateTime={note.created_at}>{formatDate(note.created_at)}</time></div><p>{note.note}</p></li>
            ))}</ol>}
          </section>
          <section className={styles.panel}>
            <div className={styles.panelHeading}><div><h2>Status history</h2><p>Sample history and changes made in this session.</p></div></div>
            {relatedHistory.length === 0 ? <div className={styles.emptyState}><p>No sample status changes recorded.</p></div> : <ol className={styles.activityList}>{relatedHistory.map((item) => (
              <li key={item.id}><div><strong>{enquiryStatusLabels[item.old_status]} → {enquiryStatusLabels[item.new_status]}</strong><time dateTime={item.changed_at}>{formatDate(item.changed_at)}</time></div></li>
            ))}</ol>}
          </section>
        </div>
        <div className={styles.detailStack}>
          <section className={styles.panel}>
            <div className={styles.panelHeading}><div><h2>Manage sample request</h2><p>Updates are temporary and affect only demo data.</p></div></div>
            <div className={styles.detailControl}>
              <label className={styles.statusControl}>Status<select className={styles.filterSelect} value={enquiry.status} onChange={(event) => updateEnquiryStatus(enquiry.id, event.currentTarget.value as EnquiryStatus)}>{statuses.map((status) => <option key={status} value={status}>{enquiryStatusLabels[status]}</option>)}</select></label>
            </div>
            <form className={styles.followUpForm} onSubmit={saveFollowUp}>
              <label>Follow-up date<input type="date" name="follow_up_at" defaultValue={enquiry.follow_up_at?.slice(0, 10) ?? ""} /></label>
              <p>Current date: {formatDate(enquiry.follow_up_at)}</p>
              <button className={styles.exportButton} type="submit"><Save size={15} aria-hidden="true" /> Save follow-up date</button>
              {followUpMessage && <p role="status">{followUpMessage}</p>}
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
