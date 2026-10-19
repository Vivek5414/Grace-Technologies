"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type EnquirySubmissionState = {
  status: "idle" | "error" | "success";
  message: string;
};

export const initialEnquirySubmissionState: EnquirySubmissionState = {
  status: "idle",
  message: "",
};

const allowedServices = new Set([
  "Web Development",
  "Custom Software Development",
  "Mobile Application Development",
  "IT Consulting",
  "Cloud Solutions",
  "AI and Data Solutions",
  "UI/UX Design",
  "Digital Transformation",
  "Other",
]);

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

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "error", message: "The enquiry service is not configured. Please email er.priyanksharma90@yahoo.in instead." };
  }

  const { error } = await supabase.from("enquiries").insert({
    full_name: cleanName,
    email: cleanEmail,
    phone: cleanPhone || null,
    company: cleanCompany || null,
    service: cleanService,
    message: cleanMessage,
  });

  if (error) {
    return { status: "error", message: "Your enquiry could not be saved. Please email er.priyanksharma90@yahoo.in." };
  }

  return { status: "success", message: "Your enquiry has been received. Thank you for contacting Grace Technologies." };
}
