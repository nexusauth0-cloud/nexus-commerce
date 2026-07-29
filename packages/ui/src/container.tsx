import * as React from "react";
import { cn } from "@nexus/utils";

type ContainerVariant = "default" | "wide" | "narrow" | "full";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ContainerVariant;
  as?: "div" | "section" | "article" | "header" | "footer";
}

const variantStyles: Record<ContainerVariant, string> = {
  default: "mx-auto max-w-[var(--grid-container)] px-6 lg:px-8",
  wide: "mx-auto max-w-[var(--grid-container-wide)] px-6 lg:px-8",
  narrow: "mx-auto max-w-3xl px-6 lg:px-8",
  full: "w-full px-6 lg:px-8",
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant = "default", as: Tag = "div", ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";

export { Container };
export type { ContainerProps, ContainerVariant };