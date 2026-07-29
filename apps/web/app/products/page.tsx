import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/product/product-catalog';

export const metadata: Metadata = {
  title: 'Premium Product Catalog',
  description:
    'Browse our curated collection of premium products with AI-powered recommendations, intelligent filtering, and real-time inventory tracking.',
  openGraph: {
    title: 'Premium Product Catalog | NEXUS Commerce',
    description:
      'Browse our curated collection of premium products with AI-powered recommendations.',
  },
};

export default function ProductsPage() {
  return <ProductCatalog />;
}
