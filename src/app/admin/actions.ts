"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import type { EnquiryStatus } from "@/types/admin";

export type SignInState = {
  error: string | null;
};

export async function signInAdmin(_previousState: SignInState, formData: FormData): Promise<SignInState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Enter a valid email and password." };
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { error: "Enter a valid email and password." };
  }
  if (password.length < 8 || password.length > 1024) {
    return { error: "Enter a valid email and password." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Authentication is not configured for this deployment." };

  const { data, error } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
  if (error || !data.user) return { error: "Unable to sign in with those details." };

  if (data.user.app_metadata.role !== "admin") {
    await supabase.auth.signOut();
    return { error: "This account does not have administrator access." };
  }

  redirect("/admin/dashboard");
}

export async function signOutAdmin(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateEnquiryStatus(
  enquiryId: string,
  status: EnquiryStatus,
): Promise<{ error: string | null }> {
  await requireAdmin();

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(enquiryId)) {
    return { error: "This enquiry could not be identified." };
  }

  if (!["new", "in_progress", "resolved", "spam"].includes(status)) {
    return { error: "Choose a valid enquiry status." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "The enquiry service is not configured." };

  const { data, error } = await supabase.from("enquiries").update({ status }).eq("id", enquiryId).select("id").maybeSingle();
  if (error) return { error: "The enquiry status could not be updated." };
  if (!data) return { error: "Enquiry not found or access was denied." };

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/contacts");
  return { error: null };
}

export type AdminActionResult = { error: string | null; success: string | null };

function validUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export async function updateContact(contactId: string, formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  if (!validUuid(contactId)) return { error: "This contact could not be identified.", success: null };

  const fullName = formData.get("full_name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const company = formData.get("company");
  if ([fullName, email, phone, company].some((value) => value !== null && typeof value !== "string")) {
    return { error: "Review the contact details and try again.", success: null };
  }

  const cleanName = String(fullName ?? "").trim().replace(/\s+/g, " ");
  const cleanEmail = String(email ?? "").trim().toLowerCase();
  const cleanPhone = String(phone ?? "").trim();
  const cleanCompany = String(company ?? "").trim();
  if (
    cleanName.length < 2 || cleanName.length > 120 ||
    cleanEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
    cleanPhone.length > 40 ||
    cleanCompany.length > 160
  ) {
    return { error: "Enter a valid name and email; keep phone and company within their allowed lengths.", success: null };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "The contact service is not configured.", success: null };

  const { data, error } = await supabase.from("contacts").update({
    full_name: cleanName,
    email: cleanEmail,
    phone: cleanPhone || null,
    company: cleanCompany || null,
  }).eq("id", contactId).select("id").maybeSingle();
  if (error) return { error: "Contact details could not be saved. The email may already belong to another contact.", success: null };
  if (!data) return { error: "Contact not found or access was denied.", success: null };

  revalidatePath("/admin/contacts");
  revalidatePath(`/admin/contacts/${contactId}`);
  return { error: null, success: "Contact details saved." };
}

export async function deleteContact(contactId: string): Promise<AdminActionResult> {
  await requireAdmin();
  if (!validUuid(contactId)) return { error: "This contact could not be identified.", success: null };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "The contact service is not configured.", success: null };

  const { data, error } = await supabase.from("contacts").delete().eq("id", contactId).select("id").maybeSingle();
  if (error) return { error: "Contact could not be deleted.", success: null };
  if (!data) return { error: "Contact not found or access was denied.", success: null };

  revalidatePath("/admin/contacts");
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/dashboard");
  return { error: null, success: "Contact deleted. Enquiry records were preserved." };
}

export async function updateEnquiryFollowUpDate(enquiryId: string, value: string): Promise<AdminActionResult> {
  await requireAdmin();
  if (!validUuid(enquiryId)) return { error: "This enquiry could not be identified.", success: null };
  let followUpAt: string | null = null;
  if (value) {
    const timestamp = Date.parse(value);
    if (!Number.isFinite(timestamp)) return { error: "Enter a valid follow-up date.", success: null };
    followUpAt = new Date(timestamp).toISOString();
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "The enquiry service is not configured.", success: null };
  const { data, error } = await supabase.from("enquiries").update({ follow_up_at: followUpAt }).eq("id", enquiryId).select("id").maybeSingle();
  if (error) return { error: "The follow-up date could not be saved.", success: null };
  if (!data) return { error: "Enquiry not found or access was denied.", success: null };

  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${enquiryId}`);
  return { error: null, success: followUpAt ? "Follow-up date saved." : "Follow-up date cleared." };
}

export async function addEnquiryFollowUpNote(enquiryId: string, formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  if (!validUuid(enquiryId)) return { error: "This enquiry could not be identified.", success: null };
  const noteValue = formData.get("note");
  if (typeof noteValue !== "string") return { error: "Enter a follow-up note.", success: null };
  const note = noteValue.trim();
  if (note.length < 1 || note.length > 4000) return { error: "Follow-up notes must be between 1 and 4,000 characters.", success: null };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "The enquiry service is not configured.", success: null };
  const { data: enquiry, error: lookupError } = await supabase.from("enquiries").select("id, contact_id").eq("id", enquiryId).maybeSingle();
  if (lookupError) return { error: "The enquiry could not be verified.", success: null };
  if (!enquiry) return { error: "Enquiry not found or access was denied.", success: null };

  const { error } = await supabase.from("enquiry_follow_up_notes").insert({
    enquiry_id: enquiryId,
    contact_id: enquiry.contact_id,
    note,
  });
  if (error) return { error: "The follow-up note could not be saved.", success: null };

  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${enquiryId}`);
  if (enquiry.contact_id) revalidatePath(`/admin/contacts/${enquiry.contact_id}`);
  return { error: null, success: "Follow-up note saved." };
}
