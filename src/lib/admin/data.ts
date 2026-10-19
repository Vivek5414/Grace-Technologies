import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Contact, ContactStatusHistory, Enquiry, EnquiryFollowUpNote, EnquiryStatusHistory } from "@/types/admin";

export type AdminEnquiry = Enquiry;

export type AdminEnquiryResult = {
  enquiries: AdminEnquiry[];
  error: string | null;
};

export type AdminContact = Contact & {
  enquiry_count: number;
  latest_contacted_at: string | null;
  is_new_contact: boolean;
  was_recently_contacted: boolean;
};

export type AdminContactResult = {
  contacts: AdminContact[];
  error: string | null;
};

export type AdminContactDetailResult = {
  contact: Contact | null;
  enquiries: AdminEnquiry[];
  notes: EnquiryFollowUpNote[];
  history: ContactStatusHistory[];
  error: string | null;
};

export type AdminEnquiryDetailResult = {
  enquiry: AdminEnquiry | null;
  contact: Contact | null;
  notes: EnquiryFollowUpNote[];
  history: EnquiryStatusHistory[];
  error: string | null;
};

export async function getAdminEnquiries(): Promise<AdminEnquiryResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { enquiries: [], error: "The admin data connection is not configured." };

  const { data, error } = await supabase
    .from("enquiries")
    .select("id, full_name, email, phone, service, message, status, created_at, source, contact_id, follow_up_at")
    .order("created_at", { ascending: false });

  if (error) return { enquiries: [], error: "Enquiries could not be loaded. Try again later." };
  return { enquiries: data ?? [], error: null };
}

export async function getAdminContacts(): Promise<AdminContactResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { contacts: [], error: "The admin data connection is not configured." };

  const [contactResult, enquiryResult, noteResult] = await Promise.all([
    supabase.from("contacts").select("id, full_name, email, email_normalized, phone, company, source, created_at, updated_at").order("created_at", { ascending: false }),
    supabase.from("enquiries").select("contact_id, id"),
    supabase.from("enquiry_follow_up_notes").select("contact_id, created_at").not("contact_id", "is", null).order("created_at", { ascending: false }),
  ]);

  if (contactResult.error || enquiryResult.error || noteResult.error) {
    return { contacts: [], error: "Contacts could not be loaded. Try again later." };
  }

  const counts = new Map<string, number>();
  for (const enquiry of enquiryResult.data ?? []) {
    if (enquiry.contact_id) counts.set(enquiry.contact_id, (counts.get(enquiry.contact_id) ?? 0) + 1);
  }
  const latestContacted = new Map<string, string>();
  for (const note of noteResult.data ?? []) {
    if (note.contact_id && !latestContacted.has(note.contact_id)) latestContacted.set(note.contact_id, note.created_at);
  }
  const now = Date.now();
  const newContactCutoff = now - 7 * 24 * 60 * 60 * 1000;
  const recentContactCutoff = now - 30 * 24 * 60 * 60 * 1000;

  return {
    contacts: (contactResult.data ?? []).map((contact) => {
      const lastContacted = latestContacted.get(contact.id) ?? null;
      return {
        ...contact,
        enquiry_count: counts.get(contact.id) ?? 0,
        latest_contacted_at: lastContacted,
        is_new_contact: new Date(contact.created_at).getTime() >= newContactCutoff,
        was_recently_contacted: lastContacted !== null && new Date(lastContacted).getTime() >= recentContactCutoff,
      };
    }),
    error: null,
  };
}

export async function getAdminContactDetails(id: string): Promise<AdminContactDetailResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { contact: null, enquiries: [], notes: [], history: [], error: "The admin data connection is not configured." };

  const { data: contact, error: contactError } = await supabase
    .from("contacts")
    .select("id, full_name, email, email_normalized, phone, company, source, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();
  if (contactError) return { contact: null, enquiries: [], notes: [], history: [], error: "Contact details could not be loaded." };
  if (!contact) return { contact: null, enquiries: [], notes: [], history: [], error: null };

  const [{ data: enquiries, error: enquiryError }, { data: notes, error: notesError }] = await Promise.all([
    supabase.from("enquiries").select("id, full_name, email, phone, service, message, status, created_at, source, contact_id, follow_up_at").eq("contact_id", id).order("created_at", { ascending: false }),
    supabase.from("enquiry_follow_up_notes").select("id, enquiry_id, contact_id, note, admin_id, created_at").eq("contact_id", id).order("created_at", { ascending: false }),
  ]);
  if (enquiryError || notesError) return { contact, enquiries: [], notes: [], history: [], error: "Related contact activity could not be loaded." };

  const relatedEnquiries = enquiries ?? [];
  const enquiryIds = relatedEnquiries.map(({ id }) => id);
  const { data: history, error: historyError } = enquiryIds.length > 0
    ? await supabase.from("enquiry_status_history").select("id, enquiry_id, old_status, new_status, admin_id, changed_at").in("enquiry_id", enquiryIds).order("changed_at", { ascending: false })
    : { data: [], error: null };
  if (historyError) return { contact, enquiries: relatedEnquiries, notes: notes ?? [], history: [], error: "Contact status history could not be loaded." };
  const serviceByEnquiry = new Map(relatedEnquiries.map(({ id, service }) => [id, service]));
  return {
    contact,
    enquiries: relatedEnquiries,
    notes: notes ?? [],
    history: (history ?? []).map((item) => ({ ...item, enquiry_service: serviceByEnquiry.get(item.enquiry_id) ?? "Related enquiry" })),
    error: null,
  };
}

export async function getAdminEnquiryDetails(id: string): Promise<AdminEnquiryDetailResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { enquiry: null, contact: null, notes: [], history: [], error: "The admin data connection is not configured." };

  const { data: enquiry, error: enquiryError } = await supabase
    .from("enquiries")
    .select("id, full_name, email, phone, service, message, status, created_at, source, contact_id, follow_up_at")
    .eq("id", id)
    .maybeSingle();
  if (enquiryError) return { enquiry: null, contact: null, notes: [], history: [], error: "Enquiry details could not be loaded." };
  if (!enquiry) return { enquiry: null, contact: null, notes: [], history: [], error: null };

  const [contactResult, notesResult, historyResult] = await Promise.all([
    enquiry.contact_id
      ? supabase.from("contacts").select("id, full_name, email, email_normalized, phone, company, source, created_at, updated_at").eq("id", enquiry.contact_id).maybeSingle()
      : Promise.resolve({ data: null, error: null }),
    supabase.from("enquiry_follow_up_notes").select("id, enquiry_id, contact_id, note, admin_id, created_at").eq("enquiry_id", id).order("created_at", { ascending: false }),
    supabase.from("enquiry_status_history").select("id, enquiry_id, old_status, new_status, admin_id, changed_at").eq("enquiry_id", id).order("changed_at", { ascending: false }),
  ]);
  if (contactResult.error || notesResult.error || historyResult.error) {
    return { enquiry, contact: contactResult.data, notes: [], history: [], error: "Enquiry activity could not be loaded." };
  }
  return { enquiry, contact: contactResult.data, notes: notesResult.data ?? [], history: historyResult.data ?? [], error: null };
}