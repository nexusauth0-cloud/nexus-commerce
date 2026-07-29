import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { AIExperience } from "@/components/landing/ai-experience";
import { Collections } from "@/components/landing/collections";
import { Testimonials } from "@/components/landing/testimonials";
import { LiveDashboard } from "@/components/landing/live-dashboard";
import { CTA } from "@/components/landing/cta";
import { Newsletter } from "@/components/landing/newsletter";
import { Footer } from "@/components/landing/footer";
import { AIAssistant } from "@/components/landing/ai-assistant";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AIExperience />
        <Collections />
        <Testimonials />
        <LiveDashboard />
        <CTA />
        <Newsletter />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}