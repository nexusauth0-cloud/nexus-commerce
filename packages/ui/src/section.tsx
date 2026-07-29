import * as React from "react";
import { cn } from "@nexus/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  withContainer?: boolean;
  withBorder?: boolean;
  withGlow?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-28 md:py-32",
  xl: "py-32 md:py-40",
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      children,
      withContainer = true,
      withBorder = false,
      withGlow = false,
      size = "lg",
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative",
          sizeStyles[size],
          withBorder && "border-b border-border",
          className,
        )}
        {...props}
      >
        {withGlow && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
            <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />
          </div>
        )}
        {withContainer ? (
          <Container>{children}</Container>
        ) : (
          children
        )}
      </section>
    );
  },
);
Section.displayName = "Section";

import { Container } from "./container";

export { Section };
export type { SectionProps };