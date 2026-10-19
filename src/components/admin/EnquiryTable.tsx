"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Download, MessageSquareText, Search } from "lucide-react";
import type { EnquiryStatus } from "@/types/admin";
import { useDemoCrm } from "./DemoCrmProvider";
import { downloadCsv, enquiryStatusLabels, filterEnquiries, formatDate } from "@/lib/admin/customer-actions";
import styles from "./AdminPages.module.css";

type StatusFilter = "all" | EnquiryStatus;

function statusClass(status: EnquiryStatus) {
  if (status === "new") return styles.statusNew;
  if (status === "in_progress") return styles.statusInProgress;
  if (status === "resolved") return styles.statusResolved;
  return styles.statusSpam;
}

export default function EnquiryTable() {
  const { enquiries, updateEnquiryStatus } = useDemoCrm();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const filteredEnquiries = useMemo(() => filterEnquiries(enquiries, { query, status }), [enquiries, query, status]);

  function exportEnquiries() {
    downloadCsv("grace-technologies-enquiries.csv", ["Name", "Phone", "Email", "Service", "Source", "Status", "Date", "Message"], filteredEnquiries.map((enquiry) => [
      enquiry.full_name,
      enquiry.phone,
      enquiry.email,
      enquiry.service,
      enquiry.source,
      enquiryStatusLabels[enquiry.status],
      enquiry.created_at,
      enquiry.message,
    ]));
  }

  return (
    <section className={styles.panel} aria-label="Enquiry list">
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search enquiries by name, email, phone, service, or message</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search enquiries" />
        </label>
        <label>
          <span className="sr-only">Filter enquiries by status</span>
          <select className={styles.filterSelect} value={status} onChange={(event) => setStatus(event.currentTarget.value as StatusFilter)}>
            <option value="all">All</option>
            {Object.entries(enquiryStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <button className={styles.exportButton} type="button" onClick={exportEnquiries} disabled={filteredEnquiries.length === 0}>
          <Download size={15} aria-hidden="true" /> Export CSV
        </button>
        <span className={styles.panelHeadingMeta}>{filteredEnquiries.length} sample enquiries</span>
      </div>
      {filteredEnquiries.length === 0 ? (
        <div className={styles.emptyState}>
          <MessageSquareText size={24} aria-hidden="true" />
          <h3>{enquiries.length === 0 ? "No sample enquiries" : "No enquiries match"}</h3>
          <p>{enquiries.length === 0 ? "The demo enquiry list is currently empty." : "Try a different search or status filter."}</p>
        </div>
      ) : (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Customer</th><th scope="col">Phone / email</th><th scope="col">Service</th><th scope="col">Source</th><th scope="col">Date</th><th scope="col">Status</th><th scope="col">Update status</th><th scope="col">Actions</th></tr></thead>
            <tbody>
              {filteredEnquiries.map((enquiry) => {
                return (
                  <tr key={enquiry.id}>
                    <td><Link className={styles.primaryText} href={`/admin/enquiries/${enquiry.id}`}>{enquiry.full_name}</Link><span className={styles.secondaryText}>{enquiry.message}</span></td>
                    <td>{enquiry.email}<span className={styles.secondaryText}>Phone not provided in demo</span></td>
                    <td>{enquiry.service}</td>
                    <td>{enquiry.source}</td>
                    <td><time dateTime={enquiry.created_at}>{formatDate(enquiry.created_at)}</time></td>
                    <td><span className={`${styles.statusBadge} ${statusClass(enquiry.status)}`}><i aria-hidden="true" />{enquiryStatusLabels[enquiry.status]}</span></td>
                    <td><label><span className="sr-only">Change status for {enquiry.full_name}</span><select className={styles.filterSelect} value={enquiry.status} onChange={(event) => updateEnquiryStatus(enquiry.id, event.currentTarget.value as EnquiryStatus)}>{Object.entries(enquiryStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></td>
                    <td><div className={styles.rowActions}>
                      <Link href={`/admin/enquiries/${enquiry.id}`} aria-label={`View ${enquiry.full_name} enquiry`} title="View enquiry"><MessageSquareText size={16} aria-hidden="true" /></Link>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">Showing {filteredEnquiries.length} of {enquiries.length} enquiries</p>
    </section>
  );
}
