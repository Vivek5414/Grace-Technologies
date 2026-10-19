"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Building2, Download, Search, UsersRound } from "lucide-react";
import { useDemoCrm } from "./DemoCrmProvider";
import { downloadCsv, filterContacts, formatDate } from "@/lib/admin/customer-actions";
import styles from "./AdminPages.module.css";

type DateFilter = "all" | "30" | "90" | "365";
const filterReferenceTime = Date.now();

export default function ContactsTable() {
  const { contacts } = useDemoCrm();
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const sources = useMemo(() => [...new Set(contacts.map(({ source: contactSource }) => contactSource))].sort(), [contacts]);
  const filteredContacts = useMemo(() => filterContacts(contacts, {
    query,
    source,
    dateFilter,
    referenceTime: filterReferenceTime,
  }), [contacts, dateFilter, query, source]);

  function exportContacts() {
    downloadCsv("grace-technologies-contacts.csv", ["Name", "Phone", "Email", "Company", "Source", "Date added"], filteredContacts.map((contact) => [
      contact.full_name,
      contact.phone,
      contact.email,
      contact.company,
      contact.source,
      contact.created_at,
    ]));
  }

  return (
    <section className={styles.panel} aria-label="Contacts list">
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search contacts by name, phone, email, or company</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search contacts" />
        </label>
        <label>
          <span className="sr-only">Filter contacts by source</span>
          <select className={styles.filterSelect} value={source} onChange={(event) => setSource(event.currentTarget.value)}>
            <option value="all">All sources</option>
            {sources.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Filter contacts by date added</span>
          <select className={styles.filterSelect} value={dateFilter} onChange={(event) => setDateFilter(event.currentTarget.value as DateFilter)}>
            <option value="all">Any date</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last 12 months</option>
          </select>
        </label>
        <button className={styles.exportButton} type="button" onClick={exportContacts} disabled={filteredContacts.length === 0}>
          <Download size={15} aria-hidden="true" /> Export CSV
        </button>
        <span className={styles.panelHeadingMeta}>{filteredContacts.length} sample contacts</span>
      </div>
      {filteredContacts.length === 0 ? (
        <div className={styles.emptyState}>
          <UsersRound size={24} aria-hidden="true" />
          <h3>{contacts.length === 0 ? "No sample contacts" : "No contacts match"}</h3>
          <p>{contacts.length === 0 ? "The demo contact list is currently empty." : "Try another search or adjust the source and date filters."}</p>
        </div>
      ) : (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Customer</th><th scope="col">Phone</th><th scope="col">Email</th><th scope="col">Company</th><th scope="col">Source</th><th scope="col">Date added</th><th scope="col">Actions</th></tr></thead>
            <tbody>
              {filteredContacts.map((contact) => {
                return (
                  <tr key={contact.id}>
                    <td><Link className={styles.primaryText} href={`/admin/contacts/${contact.id}`}>{contact.full_name}</Link></td>
                    <td><span className={styles.secondaryText}>Not provided in demo</span></td>
                    <td>{contact.email}</td>
                    <td>{contact.company || <span className={styles.secondaryText}>Not provided</span>}</td>
                    <td>{contact.source}</td>
                    <td><time dateTime={contact.created_at}>{formatDate(contact.created_at)}</time></td>
                    <td>
                      <div className={styles.rowActions}>
                        <Link href={`/admin/contacts/${contact.id}`} aria-label={`View ${contact.full_name}`} title="View contact"><Building2 size={16} aria-hidden="true" /></Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">Showing {filteredContacts.length} of {contacts.length} contacts</p>
    </section>
  );
}
