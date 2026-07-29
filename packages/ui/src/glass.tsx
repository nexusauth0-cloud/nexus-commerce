import * as React from "react";
import { cn } from "@nexus/utils";

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "elevated" | "subtle";
  hover?: boolean;
  glow?: "none" | "primary" | "secondary";
}

const variantStyles = {
  default:
    "border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl",
  card:
    "border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] backdrop-blur-2xl",
  elevated:
    "border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] backdrop-blur-2xl shadow-lg",
  subtle:
    "border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] backdrop-blur-md",
};

const hoverStyles =
  "transition-all duration-300 hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.06)]";

const glowStyles = {
  none: "",
  primary: "shadow-[0_0_30px_rgba(0,217,255,0.08)]",
  secondary: "shadow-[0_0_30px_rgba(59,130,246,0.08)]",
};

const Glass = React.forwardRef<HTMLDivElement, GlassProps>(
  (
    {
      className,
      variant = "default",
      hover = false,
      glow = "none",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl",
          variantStyles[variant],
          hover && hoverStyles,
          glowStyles[glow],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Glass.displayName = "Glass";

export { Glass };
export type { GlassProps };