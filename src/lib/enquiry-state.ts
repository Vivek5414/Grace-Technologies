export type EnquirySubmissionState = {
  status: "idle" | "error" | "success";
  message: string;
};

export const initialEnquirySubmissionState: EnquirySubmissionState = {
  status: "idle",
  message: "",
};
