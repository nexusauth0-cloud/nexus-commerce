"use client";

import * as React from "react";
import { cn } from "@nexus/utils";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { Glass } from "./glass";
import { Badge } from "./badge";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  badgeVariant?: "primary" | "success" | "warning" | "danger";
  inventory?: number;
  aiRecommended?: boolean;
  onWishlist?: () => void;
  onAddToCart?: () => void;
  onQuickView?: () => void;
  loading?: boolean;
  aspectRatio?: "square" | "portrait" | "landscape";
}

const aspectStyles = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      name,
      price,
      originalPrice,
      image,
      rating = 0,
      reviewCount = 0,
      badge,
      badgeVariant = "primary",
      inventory,
      aiRecommended = false,
      onWishlist,
      onAddToCart,
      onQuickView,
      loading = false,
      aspectRatio = "square",
      ...props
    },
    ref,
  ) => {
    const formatPrice = (p: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(p);

    const discount =
      originalPrice
        ? Math.round((1 - price / originalPrice) * 100)
        : 0;

    const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

    return (
      <Glass
        ref={ref}
        variant="card"
        hover
        glow="primary"
        className={cn(
          "group/card relative overflow-hidden p-0",
          loading && "pointer-events-none",
          className,
        )}
        {...props}
      >
        {/* Image area */}
        <div
          className={cn(
            "relative overflow-hidden rounded-t-2xl bg-surface",
            aspectStyles[aspectRatio],
          )}
        >
          {image ? (
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover/card:scale-105"
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <ShoppingBag className="h-12 w-12 text-white/10" />
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

          {/* Top badges */}
          <div className="absolute left-3 right-3 top-3 flex items-start justify-between">
            <div className="flex flex-col gap-1.5">
              {badge && (
                <Badge variant={badgeVariant}>{badge}</Badge>
              )}
              {discount > 0 && (
                <Badge variant="danger">-{discount}%</Badge>
              )}
              {aiRecommended && (
                <Badge variant="primary">AI Pick</Badge>
              )}
            </div>
            <button
              onClick={onWishlist}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-primary/80 group-hover/card:opacity-100"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          {/* Quick actions overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 transition-all duration-300 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0">
            <button
              onClick={onAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-primary"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Quick Add
            </button>
            <button
              onClick={onQuickView}
              className="flex items-center justify-center rounded-xl bg-white/10 p-2.5 backdrop-blur-md transition-all hover:bg-white/20"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Out of stock overlay */}
          {inventory !== undefined && inventory <= 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <span className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/60">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info area */}
        <div className="p-4">
          <h3 className="truncate text-sm font-medium text-white transition-colors group-hover/card:text-primary">
            {name}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-white">
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-text-muted line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {stars.map((filled, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      filled
                        ? "fill-warning text-warning"
                        : "fill-white/10 text-white/10",
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-text-muted">
                ({reviewCount})
              </span>
            </div>
            {inventory !== undefined && inventory > 0 && inventory <= 5 && (
              <span className="text-xs text-warning">
                Only {inventory} left
              </span>
            )}
          </div>
        </div>
      </Glass>
    );
  },
);
ProductCard.displayName = "ProductCard";

export { ProductCard };
export type { ProductCardProps };