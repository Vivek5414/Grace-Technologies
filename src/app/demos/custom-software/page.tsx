import type { Metadata } from "next";
import ServiceDemo from "@/components/demos/ServiceDemo";

export const metadata: Metadata = {
  title: "Custom Software Demo",
  description: "An interactive, fictional business management software demo from Grace Technologies.",
  robots: { index: false, follow: false },
};

export default function CustomSoftwareDemoPage() {
  return <ServiceDemo demoId="software" />;
}