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

function SectionTransition() {
  return (
    <div className="relative h-32 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-px w-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SectionTransition />
        <Features />
        <SectionTransition />
        <AIExperience />
        <SectionTransition />
        <Collections />
        <SectionTransition />
        <Testimonials />
        <SectionTransition />
        <LiveDashboard />
        <SectionTransition />
        <CTA />
        <SectionTransition />
        <Newsletter />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}