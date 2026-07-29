import * as React from "react";
import { cn } from "@nexus/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  gradient?: boolean;
  badge?: string;
  badgeIcon?: React.ReactNode;
}

const sizeMap: Record<HeadingSize, string> = {
  xs: "text-sm font-semibold",
  sm: "text-base font-semibold md:text-lg",
  md: "text-lg font-bold md:text-xl",
  lg: "text-xl font-bold md:text-2xl",
  xl: "text-2xl font-bold md:text-3xl lg:text-4xl",
  "2xl": "text-3xl font-bold md:text-4xl lg:text-5xl",
  "3xl": "text-4xl font-extrabold md:text-5xl lg:text-6xl",
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      as: Tag = "h2",
      size = "2xl",
      gradient = false,
      badge,
      badgeIcon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-4">
        {badge && (
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-accent-glass px-4 py-1.5 text-xs font-medium tracking-wide text-primary">
            {badgeIcon}
            {badge}
          </div>
        )}
        <Tag
          ref={ref}
          className={cn(
            "font-bold tracking-tight text-white",
            sizeMap[size],
            gradient && "gradient-primary-text",
            className,
          )}
          {...props}
        >
          {children}
        </Tag>
      </div>
    );
  },
);
Heading.displayName = "Heading";

export { Heading };
export type { HeadingProps, HeadingLevel, HeadingSize };