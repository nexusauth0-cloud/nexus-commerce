import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Testimonials } from '@/components/landing/testimonials';
import { CTA } from '@/components/landing/cta';
import { Newsletter } from '@/components/landing/newsletter';
import { Footer } from '@/components/landing/footer';
import { AIAssistant } from '@/components/landing/ai-assistant';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
        <Newsletter />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}
