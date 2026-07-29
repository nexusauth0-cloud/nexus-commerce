import * as React from "react";
import { cn } from "@nexus/utils";
import { Glass } from "./glass";

interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  trend?: string;
  trendUp?: boolean;
  variant?: "default" | "glass";
  icon?: React.ReactNode;
}

const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  (
    {
      className,
      value,
      label,
      trend,
      trendUp = true,
      variant = "default",
      icon,
      ...props
    },
    ref,
  ) => {
    if (variant === "glass") {
      return (
        <Glass
          ref={ref}
          variant="card"
          className={cn("p-6 text-center", className)}
          {...props}
        >
          {icon && (
            <div className="mb-3 inline-flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="text-3xl font-bold tracking-tight text-white">
            {value}
          </div>
          <div className="mt-1 text-sm text-text-secondary">{label}</div>
          {trend && (
            <div
              className={cn(
                "mt-2 inline-flex items-center gap-1 text-xs font-medium",
                trendUp ? "text-success" : "text-danger",
              )}
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d={trendUp ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
              </svg>
              {trend}
            </div>
          )}
        </Glass>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("text-center", className)}
        {...props}
      >
        {icon && (
          <div className="mb-3 inline-flex items-center justify-center">
            {icon}
          </div>
        )}
        <div className="text-2xl font-bold text-white sm:text-3xl">
          {value}
        </div>
        <div className="mt-1 text-sm text-text-secondary">{label}</div>
        {trend && (
          <div
            className={cn(
              "mt-2 inline-flex items-center gap-1 text-xs font-medium",
              trendUp ? "text-success" : "text-danger",
            )}
          >
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d={trendUp ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
            </svg>
            {trend}
          </div>
        )}
      </div>
    );
  },
);
Stat.displayName = "Stat";

export { Stat };
export type { StatProps };