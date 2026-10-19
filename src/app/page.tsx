import type { Metadata } from "next";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Industries from "@/components/home/Industries";
import Process from "@/components/home/Process";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";

export const metadata: Metadata = {
  title: "Technology That Moves Your Business Forward",
  description:
    "Explore web development, custom software, IT consulting, cloud solutions, analytics, and digital transformation for US businesses.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Industries />
      <Projects />
      <About />
      <Process />
      <Contact />
    </main>
  );
}
