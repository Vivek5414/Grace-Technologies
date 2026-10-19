import type { Metadata } from "next";
import ServiceDemo from "@/components/demos/ServiceDemo";

export const metadata: Metadata = {
  title: "IT Consulting Demo",
  description: "An interactive, illustrative IT consulting and technology roadmap demo from Grace Technologies.",
  robots: { index: false, follow: false },
};

export default function ITConsultingDemoPage() {
  return <ServiceDemo demoId="consulting" />;
}