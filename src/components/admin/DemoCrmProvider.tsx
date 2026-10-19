"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { demoContacts, demoEnquiries, demoEnquiryHistory, demoFollowUpNotes, type DemoContact } from "@/lib/admin/demo-crm-data";
import type { Enquiry, EnquiryFollowUpNote, EnquiryStatus, EnquiryStatusHistory } from "@/types/admin";

type DemoCrmContextValue = {
  contacts: DemoContact[];
  enquiries: Enquiry[];
  notes: EnquiryFollowUpNote[];
  history: EnquiryStatusHistory[];
  updateContact: (id: string, changes: Pick<DemoContact, "full_name" | "email" | "phone" | "company">) => void;
  deleteContact: (id: string) => void;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  updateFollowUpDate: (id: string, date: string | null) => void;
  addFollowUpNote: (enquiryId: string, note: string) => void;
};

const DemoCrmContext = createContext<DemoCrmContextValue | null>(null);

export function DemoCrmProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState(demoContacts);
  const [enquiries, setEnquiries] = useState(demoEnquiries);
  const [notes, setNotes] = useState(demoFollowUpNotes);
  const [history, setHistory] = useState(demoEnquiryHistory);

  function updateContact(id: string, changes: Pick<DemoContact, "full_name" | "email" | "phone" | "company">) {
    setContacts((current) => current.map((contact) => contact.id === id
      ? { ...contact, ...changes, email_normalized: changes.email.trim().toLocaleLowerCase(), updated_at: new Date().toISOString() }
      : contact));
    setEnquiries((current) => current.map((enquiry) => {
      const contact = contacts.find((item) => item.id === id);
      return enquiry.contact_id === id && contact
        ? { ...enquiry, full_name: changes.full_name, email: changes.email, phone: changes.phone }
        : enquiry;
    }));
  }

  function deleteContact(id: string) {
    setContacts((current) => current.filter((contact) => contact.id !== id));
    setEnquiries((current) => current.map((enquiry) => enquiry.contact_id === id ? { ...enquiry, contact_id: null } : enquiry));
    setNotes((current) => current.map((note) => note.contact_id === id ? { ...note, contact_id: null } : note));
  }

  function updateEnquiryStatus(id: string, status: EnquiryStatus) {
    const enquiry = enquiries.find((item) => item.id === id);
    if (!enquiry || enquiry.status === status) return;
    setEnquiries((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setHistory((current) => [{
      id: `demo-history-${crypto.randomUUID()}`,
      enquiry_id: id,
      old_status: enquiry.status,
      new_status: status,
      admin_id: "demo-admin",
      changed_at: new Date().toISOString(),
    }, ...current]);
  }

  function updateFollowUpDate(id: string, date: string | null) {
    setEnquiries((current) => current.map((item) => item.id === id ? { ...item, follow_up_at: date } : item));
  }

  function addFollowUpNote(enquiryId: string, note: string) {
    const enquiry = enquiries.find((item) => item.id === enquiryId);
    if (!enquiry) return;
    setNotes((current) => [{
      id: `demo-note-${crypto.randomUUID()}`,
      enquiry_id: enquiryId,
      contact_id: enquiry.contact_id,
      note,
      admin_id: "demo-admin",
      created_at: new Date().toISOString(),
    }, ...current]);
  }

  return (
    <DemoCrmContext.Provider value={{ contacts, enquiries, notes, history, updateContact, deleteContact, updateEnquiryStatus, updateFollowUpDate, addFollowUpNote }}>
      {children}
    </DemoCrmContext.Provider>
  );
}

export function useDemoCrm() {
  const context = useContext(DemoCrmContext);
  if (!context) throw new Error("DemoCrmProvider is missing from the admin workspace.");
  return context;
}
