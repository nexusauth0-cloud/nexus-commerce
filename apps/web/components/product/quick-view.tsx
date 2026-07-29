'use client';

import { useEffect, useCallback } from 'react';
import { X, Star, ShoppingBag, Heart, Check } from 'lucide-react';
import { Glass, Badge, Separator } from '@nexus/ui';
import type { ProductData } from '@/lib/products';

interface QuickViewProps {
  product: ProductData;
  onClose: () => void;
}

export function QuickView({ product, onClose }: QuickViewProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const inStock = product.inventory > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <Glass
        variant="elevated"
        glow="primary"
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-0"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative flex h-72 shrink-0 items-center justify-center md:h-auto md:w-1/2">
            <div className={`absolute inset-0 ${product.image}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            <div className="absolute left-4 top-4 flex flex-col gap-1.5">
              {product.badge && <Badge>{product.badge}</Badge>}
              {product.aiMatch >= 85 && <Badge variant="secondary">AI Pick</Badge>}
            </div>
            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/60">Out of Stock</span>
              </div>
            )}
            <div className="relative z-[1] flex h-full w-full items-center justify-center p-8">
              <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                <ShoppingBag className="h-16 w-16 text-white/40" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-text-muted">{product.brand}</p>
                <h2 className="mt-1 text-xl font-bold text-white">{product.name}</h2>
              </div>
              <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] text-text-muted transition-colors hover:border-primary hover:text-primary">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? 'fill-warning text-warning' : 'fill-white/10 text-white/10'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-text-muted">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">${product.price}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-lg text-text-muted line-through">${product.compareAtPrice}</span>
                  <span className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-semibold text-danger">
                    -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-text-muted">{product.description}</p>

            {product.colors.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-medium text-text-muted">Colors</p>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((color, i) => (
                    <div
                      key={i}
                      className="flex h-7 w-7 items-center justify-center rounded-full"
                      style={{ backgroundColor: color }}
                    >
                      {i === 0 && <Check className="h-3.5 w-3.5 text-white drop-shadow" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator className="my-5" />

            {/* Features */}
            <div>
              <p className="text-xs font-medium text-text-muted">Key Features</p>
              <ul className="mt-2 space-y-1.5">
                {product.features.slice(0, 4).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
                {product.features.length > 4 && (
                  <li className="text-xs text-primary">+{product.features.length - 4} more</li>
                )}
              </ul>
            </div>

            <Separator className="my-5" />

            {/* Specs */}
            <div>
              <p className="text-xs font-medium text-text-muted">Specifications</p>
              <dl className="mt-2 space-y-1">
                {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <dt className="text-text-muted">{key}</dt>
                    <dd className="text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Separator className="my-5" />

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                disabled={!inStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingBag className="h-4 w-4" />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <div className="text-center">
                {inStock ? (
                  <p className="text-xs text-success">
                    {product.inventory > 5 ? 'In Stock' : `Only ${product.inventory} left`}
                  </p>
                ) : (
                  <p className="text-xs text-danger">Out of stock</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Glass>
    </div>
  );
}
