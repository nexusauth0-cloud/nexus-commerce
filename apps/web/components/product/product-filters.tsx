'use client';

import { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Glass, Separator } from '@nexus/ui';
import { categories, brands, priceRange } from '@/lib/products';

interface FilterParams {
  q: string;
  category: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStock: boolean;
  sort: string;
  view: string;
}

interface ProductFiltersProps {
  params: FilterParams;
  updateParams: (updates: Record<string, string | string[] | number | boolean | undefined | null>) => void;
}

export function ProductFilters({ params, updateParams }: ProductFiltersProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 5);
  const visibleBrands = showAllBrands ? brands : brands.slice(0, 5);

  const toggleCategory = (slug: string) => {
    const next = params.category.includes(slug)
      ? params.category.filter((c) => c !== slug)
      : [...params.category, slug];
    updateParams({ category: next.length > 0 ? next : undefined });
  };

  const toggleBrand = (id: string) => {
    const next = params.brand.includes(id)
      ? params.brand.filter((b) => b !== id)
      : [...params.brand, id];
    updateParams({ brand: next.length > 0 ? next : undefined });
  };

  return (
    <Glass variant="card" className="p-5">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-white">Category</h3>
        <div className="mt-3 space-y-2">
          {visibleCategories.map((cat) => (
            <label key={cat.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-text-muted transition-colors hover:text-white">
              <input
                type="checkbox"
                checked={params.category.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="h-4 w-4 rounded border-[rgba(255,255,255,0.15)] bg-transparent text-primary focus:ring-primary"
              />
              <span className="flex-1">{cat.name}</span>
              <span className="text-xs text-text-muted/60">{cat.count}</span>
            </label>
          ))}
        </div>
        {categories.length > 5 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="mt-2 flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary-light"
          >
            {showAllCategories ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showAllCategories ? 'Show less' : `Show all (${categories.length})`}
          </button>
        )}
      </div>

      <Separator className="my-5" />

      {/* Brands */}
      <div>
        <h3 className="text-sm font-semibold text-white">Brand</h3>
        <div className="mt-3 space-y-2">
          {visibleBrands.map((brand) => (
            <label key={brand.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-text-muted transition-colors hover:text-white">
              <input
                type="checkbox"
                checked={params.brand.includes(brand.id)}
                onChange={() => toggleBrand(brand.id)}
                className="h-4 w-4 rounded border-[rgba(255,255,255,0.15)] bg-transparent text-primary focus:ring-primary"
              />
              <span className="flex-1">{brand.name}</span>
              <span className="text-xs text-text-muted/60">{brand.count}</span>
            </label>
          ))}
        </div>
        {brands.length > 5 && (
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="mt-2 flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary-light"
          >
            {showAllBrands ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {showAllBrands ? 'Show less' : `Show all (${brands.length})`}
          </button>
        )}
      </div>

      <Separator className="my-5" />

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-white">Price Range</h3>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={params.minPrice || ''}
            onChange={(e) => updateParams({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-white placeholder-text-muted outline-none transition-colors focus:border-primary"
          />
          <span className="text-text-muted">—</span>
          <input
            type="number"
            placeholder="Max"
            value={params.maxPrice >= priceRange.max ? '' : params.maxPrice || ''}
            onChange={(e) => updateParams({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-white placeholder-text-muted outline-none transition-colors focus:border-primary"
          />
        </div>
      </div>

      <Separator className="my-5" />

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold text-white">Minimum Rating</h3>
        <div className="mt-3 space-y-2">
          {[4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => updateParams({ minRating: params.minRating === stars ? undefined : stars })}
              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                params.minRating === stars ? 'bg-primary/10 text-primary' : 'text-text-muted hover:text-white'
              }`}
            >
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < stars ? 'fill-warning text-warning' : 'fill-white/10 text-white/10'}`}
                  />
                ))}
              </div>
              <span className="text-xs">& up</span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-5" />

      {/* Availability */}
      <div>
        <h3 className="text-sm font-semibold text-white">Availability</h3>
        <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-sm text-text-muted transition-colors hover:text-white">
          <input
            type="checkbox"
            checked={params.inStock}
            onChange={() => updateParams({ inStock: params.inStock ? undefined : true })}
            className="h-4 w-4 rounded border-[rgba(255,255,255,0.15)] bg-transparent text-primary focus:ring-primary"
          />
          In Stock Only
        </label>
      </div>
    </Glass>
  );
}
