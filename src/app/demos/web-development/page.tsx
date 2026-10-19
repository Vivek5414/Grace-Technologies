import type { Metadata } from "next";
import ServiceDemo from "@/components/demos/ServiceDemo";

export const metadata: Metadata = {
  title: "Web Development Demo",
  description: "An interactive, fictional responsive business website demo from Grace Technologies.",
  robots: { index: false, follow: false },
};

export default function WebDevelopmentDemoPage() {
  return <ServiceDemo demoId="website" />;
}