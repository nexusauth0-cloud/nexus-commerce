'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useCallback, useRef, useState } from 'react';
import { Search, SlidersHorizontal, Grid3X3, List, ArrowUpDown, X } from 'lucide-react';
import { Input, Button } from '@nexus/ui';
import { ProductFilters } from './product-filters';
import { ProductGrid } from './product-grid';
import { products, categories, priceRange } from '@/lib/products';
import type { ProductData } from '@/lib/products';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'rating';
type ViewMode = 'grid' | 'list';

interface FilterParams {
  q: string;
  category: string[];
  brand: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStock: boolean;
  sort: SortOption;
  view: ViewMode;
}

export function ProductCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const params: FilterParams = useMemo(() => ({
    q: searchParams.get('q') || '',
    category: searchParams.get('category')?.split(',').filter(Boolean) || [],
    brand: searchParams.get('brand')?.split(',').filter(Boolean) || [],
    minPrice: Number(searchParams.get('minPrice')) || priceRange.min,
    maxPrice: Number(searchParams.get('maxPrice')) || priceRange.max,
    minRating: Number(searchParams.get('minRating')) || 0,
    inStock: searchParams.get('inStock') === 'true',
    sort: (searchParams.get('sort') as SortOption) || 'newest',
    view: (searchParams.get('view') as ViewMode) || 'grid',
  }), [searchParams]);

  const updateParams = useCallback((updates: Record<string, string | string[] | number | boolean | undefined | null>) => {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === null || value === '' || value === false) {
        next.delete(key);
      } else if (Array.isArray(value)) {
        if (value.length > 0) next.set(key, value.join(','));
        else next.delete(key);
      } else {
        next.set(key, String(value));
      }
    }
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const handleSearch = useCallback((value: string) => {
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      updateParams({ q: value || null });
    }, 300);
  }, [updateParams]);

  const filtered: ProductData[] = useMemo(() => {
    return products
      .filter((p) => {
        if (params.q) {
          const q = params.q.toLowerCase();
          if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
        }
        if (params.category.length > 0 && !params.category.includes(p.category)) return false;
        const brandSlug = p.brand.toLowerCase().replace(/\s+/g, '-');
        if (params.brand.length > 0 && !params.brand.includes(brandSlug)) return false;
        if (p.price < params.minPrice || p.price > params.maxPrice) return false;
        if (params.minRating > 0 && p.rating < params.minRating) return false;
        if (params.inStock && p.inventory <= 0) return false;
        return true;
      })
      .sort((a, b) => {
        switch (params.sort) {
          case 'price-asc': return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'name-asc': return a.name.localeCompare(b.name);
          case 'rating': return b.rating - a.rating;
          default: return 0;
        }
      });
  }, [params]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (params.q) count++;
    count += params.category.length;
    count += params.brand.length;
    if (params.minPrice > priceRange.min || params.maxPrice < priceRange.max) count++;
    if (params.minRating) count++;
    if (params.inStock) count++;
    return count;
  }, [params]);

  const clearAll = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const removeFilter = useCallback((key: string, value?: string) => {
    if (key === 'q') updateParams({ q: null });
    else if (key === 'category') updateParams({ category: params.category.filter((x) => x !== value) });
    else if (key === 'brand') updateParams({ brand: params.brand.filter((x) => x !== value) });
    else if (key === 'price') updateParams({ minPrice: undefined, maxPrice: undefined });
    else if (key === 'rating') updateParams({ minRating: undefined });
    else if (key === 'inStock') updateParams({ inStock: undefined });
  }, [updateParams, params]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white">Premium Product Catalog</h1>
          <p className="mt-2 text-lg text-text-muted">
            Discover {products.length} curated products with AI-powered recommendations
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              placeholder="Search products..."
              defaultValue={params.q}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
            {params.q && (
              <button
                onClick={() => { updateParams({ q: null }); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5">
              <ArrowUpDown className="h-3.5 w-3.5 text-text-muted" />
              <select
                value={params.sort}
                onChange={(e) => updateParams({ sort: e.target.value })}
                className="bg-transparent text-sm text-white outline-none cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            <div className="flex items-center rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-1">
              <button
                onClick={() => updateParams({ view: 'grid' })}
                className={`rounded-lg p-2 transition-colors ${params.view === 'grid' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => updateParams({ view: 'list' })}
                className={`rounded-lg p-2 transition-colors ${params.view === 'list' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="relative flex items-center gap-2 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-2 text-sm text-white transition-colors hover:bg-white/5 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-text-muted">Active filters:</span>
            {params.q && (
              <Chip label={`Search: ${params.q}`} onRemove={() => removeFilter('q')} />
            )}
            {params.category.map((c) => (
              <Chip key={c} label={`Category: ${categories.find((cat) => cat.slug === c)?.name || c}`} onRemove={() => removeFilter('category', c)} />
            ))}
            {params.brand.map((b) => (
              <Chip key={b} label={`Brand: ${b}`} onRemove={() => removeFilter('brand', b)} />
            ))}
            {(params.minPrice > priceRange.min || params.maxPrice < priceRange.max) && (
              <Chip label={`Price: $${params.minPrice} — $${params.maxPrice}`} onRemove={() => removeFilter('price')} />
            )}
            {params.minRating > 0 && (
              <Chip label={`${params.minRating}+ stars`} onRemove={() => removeFilter('rating')} />
            )}
            {params.inStock && (
              <Chip label="In stock only" onRemove={() => removeFilter('inStock')} />
            )}
            <button onClick={clearAll} className="px-3 py-1 text-xs text-primary transition-colors hover:text-primary-light">
              Clear all
            </button>
          </div>
        )}

        <p className="mb-6 text-sm text-text-muted">
          Showing <span className="text-white">{filtered.length}</span> of{' '}
          <span className="text-white">{products.length}</span> products
        </p>

        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24">
              <ProductFilters params={params} updateParams={updateParams} />
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            <ProductGrid products={filtered} view={params.view} />
          </main>
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-[rgba(255,255,255,0.08)] bg-background px-6 py-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-text-muted hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ProductFilters params={params} updateParams={updateParams} />
              <Button onClick={() => setMobileFiltersOpen(false)} className="mt-6 w-full">
                Show results ({filtered.length})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs text-white transition-colors hover:bg-white/10"
    >
      {label}
      <X className="h-3 w-3" />
    </button>
  );
}
