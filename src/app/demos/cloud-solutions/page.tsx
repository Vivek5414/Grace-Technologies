import type { Metadata } from "next";
import ServiceDemo from "@/components/demos/ServiceDemo";

export const metadata: Metadata = {
  title: "Cloud Solutions Demo",
  description: "An interactive cloud infrastructure demo with illustrative environments and sample data.",
  robots: { index: false, follow: false },
};

export default function CloudSolutionsDemoPage() {
  return <ServiceDemo demoId="cloud" />;
}