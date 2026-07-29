'use client';

import { useState } from 'react';
import { Package } from 'lucide-react';
import { ProductCard } from '@nexus/ui';
import { QuickView } from './quick-view';
import type { ProductData } from '@/lib/products';

interface ProductGridProps {
  products: ProductData[];
  view: 'grid' | 'list';
}

export function ProductGrid({ products, view }: ProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductData | null>(null);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Package className="h-16 w-16 text-text-muted/30" />
        <h3 className="mt-4 text-lg font-medium text-white">No products found</h3>
        <p className="mt-1 text-sm text-text-muted">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex gap-5 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4 backdrop-blur-2xl transition-all duration-300 hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.06)]"
            >
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl bg-surface">
                <div className={`h-full w-full ${product.image} bg-cover`} />
                <div className="absolute left-2 top-2 flex flex-col gap-1">
                  {product.badge && (
                    <span className="rounded-full bg-primary/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                      {product.badge}
                    </span>
                  )}
                  {product.aiMatch >= 85 && (
                    <span className="rounded-full bg-secondary/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                      AI Pick
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-base font-medium text-white">{product.name}</h3>
                  <p className="mt-1 text-sm text-text-muted line-clamp-2">{product.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-text-muted">
                    <span>{product.brand}</span>
                    <span>{product.category}</span>
                    <span className="flex items-center gap-1">
                      <span className="text-warning">★</span> {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">${product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-text-muted line-through">${product.compareAtPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="rounded-lg bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {quickViewProduct && (
          <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.compareAtPrice ?? undefined}
            image={product.image}
            rating={product.rating}
            reviewCount={product.reviewCount}
            badge={product.badge ?? undefined}
            badgeVariant={product.badge === 'Best Seller' ? 'success' : product.badge === 'Pre-order' ? 'warning' : 'default'}
            inventory={product.inventory}
            aiRecommended={product.aiMatch >= 85}
            onQuickView={() => setQuickViewProduct(product)}
          />
        ))}
      </div>
      {quickViewProduct && (
        <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </>
  );
}
