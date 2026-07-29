import * as React from "react";
import { cn } from "@nexus/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card" | "product";
}

const variantStyles = {
  text: "h-4 w-full rounded",
  circular: "h-10 w-10 rounded-full",
  rectangular: "h-48 w-full rounded-xl",
  card: "h-64 w-full rounded-2xl",
  product: "h-80 w-full rounded-2xl",
};

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "text", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse bg-white/5",
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";

const ProductCardSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("rounded-2xl border border-border bg-card p-4", className)}
      {...props}
    >
      <Skeleton variant="product" />
      <div className="mt-4 space-y-3">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" className="h-5 w-5" />
          <Skeleton variant="text" className="w-1/4" />
        </div>
      </div>
    </div>
  );
});
ProductCardSkeleton.displayName = "ProductCardSkeleton";

export { Skeleton, ProductCardSkeleton };
export type { SkeletonProps };