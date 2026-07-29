import * as React from "react";
import { cn } from "@nexus/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "line" | "gradient" | "glow";
  orientation?: "horizontal" | "vertical";
  label?: string;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    { className, variant = "line", orientation = "horizontal", label, ...props },
    ref,
  ) => {
    if (variant === "gradient") {
      return (
        <div
          ref={ref}
          className={cn(
            "relative",
            orientation === "horizontal"
              ? "h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              : "h-full w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent",
            className,
          )}
          {...props}
        />
      );
    }

    if (variant === "glow") {
      return (
        <div
          ref={ref}
          className={cn(
            "relative",
            orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "absolute inset-0",
              orientation === "horizontal"
                ? "bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm"
                : "bg-gradient-to-b from-transparent via-primary/30 to-transparent blur-sm",
            )}
          />
          <div
            className={cn(
              "absolute inset-0",
              orientation === "horizontal"
                ? "bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                : "bg-gradient-to-b from-transparent via-primary/20 to-transparent",
            )}
          />
        </div>
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-4",
            className,
          )}
          {...props}
        >
          <div className="h-px flex-1 bg-border" />
          <span className="whitespace-nowrap text-xs font-medium uppercase tracking-wider text-text-tertiary">
            {label}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          orientation === "horizontal" ? "h-px w-full bg-border" : "h-full w-px bg-border",
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";

export { Divider };
export type { DividerProps };