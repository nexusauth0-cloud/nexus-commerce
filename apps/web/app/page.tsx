import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { FeaturedProducts } from "@/components/landing/featured-products";
import { AIRecommendations } from "@/components/landing/ai-recommendations";
import { TrendingCategories } from "@/components/landing/trending-categories";
import { PremiumCollections } from "@/components/landing/premium-collections";
import { AIShoppingDemo } from "@/components/landing/ai-shopping-demo";
import { CustomerReviews } from "@/components/landing/customer-reviews";
import { BrandLogos } from "@/components/landing/brand-logos";
import { Newsletter } from "@/components/landing/newsletter";
import { Footer } from "@/components/landing/footer";
import { AIAssistant } from "@/components/landing/ai-assistant";

function SectionTransition() {
  return (
    <div className="relative h-24 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
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
        <FeaturedProducts />
        <SectionTransition />
        <AIRecommendations />
        <SectionTransition />
        <TrendingCategories />
        <SectionTransition />
        <PremiumCollections />
        <SectionTransition />
        <AIShoppingDemo />
        <SectionTransition />
        <CustomerReviews />
        <SectionTransition />
        <BrandLogos />
        <SectionTransition />
        <Newsletter />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}
