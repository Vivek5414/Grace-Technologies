"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { EnquirySubmissionState } from "@/lib/enquiry-state";
import { enquiryServices } from "@/lib/enquiry-services";

const allowedServices: ReadonlySet<string> = new Set(enquiryServices);

type EnquiryInsert = {
  full_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  service: string;
  message: string;
};

async function saveEnquiry(enquiry: EnquiryInsert): Promise<EnquirySubmissionState> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "The enquiry service is not configured. Please email contact@gracetechnologies.uk instead." };
  }

  const { error } = await supabase.from("enquiries").insert(enquiry);
  if (error) {
    return { status: "error", message: "Your enquiry could not be saved. Please email contact@gracetechnologies.uk." };
  }

  return { status: "success", message: "Your enquiry has been received. Thank you for contacting Grace Technologies." };
}

export async function submitPublicEnquiry(
  _previousState: EnquirySubmissionState,
  formData: FormData,
): Promise<EnquirySubmissionState> {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const company = formData.get("company");
  const service = formData.get("service");
  const message = formData.get("message");

  if ([fullName, email, phone, company, service, message].some((value) => value !== null && typeof value !== "string")) {
    return { status: "error", message: "Review the form fields and try again." };
  }

  const cleanName = String(fullName ?? "").trim().replace(/\s+/g, " ");
  const cleanEmail = String(email ?? "").trim().toLowerCase();
  const cleanPhone = String(phone ?? "").trim();
  const cleanCompany = String(company ?? "").trim().replace(/\s+/g, " ");
  const cleanService = String(service ?? "").trim();
  const cleanMessage = String(message ?? "").trim();

  if (!cleanEmail || !cleanMessage) {
    return {
      status: "error",
      message: "The enquiry service currently requires an email address and message, which this compact popup does not collect.",
    };
  }

  if (
    cleanName.length < 2 || cleanName.length > 120 ||
    cleanEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
    cleanPhone.length > 40 ||
    cleanCompany.length > 160 ||
    !allowedServices.has(cleanService) ||
    cleanMessage.length < 10 || cleanMessage.length > 5000
  ) {
    return { status: "error", message: "Please check the required fields and try again." };
  }

  return saveEnquiry({
    full_name: cleanName,
    email: cleanEmail,
    phone: cleanPhone || null,
    company: cleanCompany || null,
    service: cleanService,
    message: cleanMessage,
  });
}

export async function submitHomepageEnquiry(
  _previousState: EnquirySubmissionState,
  formData: FormData,
): Promise<EnquirySubmissionState> {
  const fullName = formData.get("fullName");
  const phone = formData.get("phone");
  const message = formData.get("message");

  if (typeof fullName !== "string" || typeof phone !== "string" || typeof message !== "string") {
    return { status: "error", message: "Review the required fields and try again." };
  }

  const cleanName = fullName.trim().replace(/\s+/g, " ");
  const cleanPhone = phone.trim();
  const cleanMessage = message.trim();
  const phoneDigits = cleanPhone.replace(/\D/g, "");

  if (
    cleanName.length < 2 || cleanName.length > 120 ||
    !/^\+?[0-9().\s-]+$/.test(cleanPhone) ||
    phoneDigits.length < 7 || phoneDigits.length > 15 ||
    cleanMessage.length < 10 || cleanMessage.length > 5000
  ) {
    return { status: "error", message: "Please check your name, mobile number, and message and try again." };
  }

  return saveEnquiry({
    full_name: cleanName,
    email: null,
    phone: cleanPhone,
    company: null,
    service: "General enquiry",
    message: cleanMessage,
  });
}
