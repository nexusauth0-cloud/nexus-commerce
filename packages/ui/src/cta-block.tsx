import * as React from "react";
import { cn } from "@nexus/utils";
import { Glass } from "./glass";
import type { GlassProps } from "./glass";

interface CTABlockProps extends Omit<GlassProps, "variant"> {
  variant?: "primary" | "secondary" | "subtle";
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "p-8 md:p-12",
  md: "p-10 md:p-16 lg:p-20",
  lg: "p-12 md:p-20 lg:p-24",
};

const variantStyles = {
  primary:
    "border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5",
  secondary:
    "border-secondary/20 bg-gradient-to-br from-secondary/5 via-primary/5 to-secondary/5",
  subtle: "border-border bg-gradient-to-br from-white/[0.02] to-white/[0.01]",
};

const CTABlock = React.forwardRef<HTMLDivElement, CTABlockProps>(
  (
    { className, variant = "primary", size = "lg", children, ...props },
    ref,
  ) => {
    return (
      <Glass
        ref={ref}
        variant="card"
        className={cn(
          "relative overflow-hidden text-center",
          sizeStyles[size],
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {/* Glow effect */}
        <div className="pointer-events-none absolute -inset-40 bg-gradient-conic from-primary/10 via-secondary/5 to-primary/10 opacity-30 blur-3xl" />
        <div className="relative z-10">{children}</div>
      </Glass>
    );
  },
);
CTABlock.displayName = "CTABlock";

export { CTABlock };
export type { CTABlockProps };