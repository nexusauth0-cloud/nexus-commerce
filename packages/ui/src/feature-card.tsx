"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@nexus/utils";
import { Glass } from "./glass";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: "default" | "bento" | "compact";
  gradient?: string;
  bentoSize?: "1x1" | "2x1" | "1x2" | "2x2";
  illustration?: React.ReactNode;
}

const bentoGridMap = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
};

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      className,
      icon,
      title,
      description,
      variant = "default",
      gradient = "from-primary to-secondary",
      bentoSize = "1x1",
      illustration,
      ...props
    },
    ref,
  ) => {
    if (variant === "bento") {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className={cn("group", bentoGridMap[bentoSize], className)}
          {...(props as React.ComponentProps<typeof motion.div>)}
        >
          <Glass
            variant="card"
            hover
            className="relative flex h-full flex-col overflow-hidden p-8"
          >
            <div
              className={cn(
                "pointer-events-none absolute -inset-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10",
                gradient,
              )}
            />
            <div
              className={cn(
                "mb-5 inline-flex rounded-xl bg-gradient-to-br p-3",
                gradient,
              )}
            >
              {icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              {title}
            </h3>
            <p className="mt-auto text-sm leading-relaxed text-text-secondary">
              {description}
            </p>
            {illustration && (
              <div className="mt-6">{illustration}</div>
            )}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Glass>
        </motion.div>
      );
    }

    if (variant === "compact") {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className={cn("group", className)}
          {...(props as React.ComponentProps<typeof motion.div>)}
        >
          <Glass variant="card" hover className="flex items-start gap-4 p-5">
            <div
              className={cn(
                "inline-flex shrink-0 rounded-lg bg-gradient-to-br p-2.5",
                gradient,
              )}
            >
              {icon}
            </div>
            <div>
              <h3 className="font-medium text-white">{title}</h3>
              <p className="mt-1 text-sm text-text-secondary">
                {description}
              </p>
            </div>
          </Glass>
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={cn("group", className)}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        <Glass variant="card" hover className="relative overflow-hidden p-8">
          <div
            className={cn(
              "pointer-events-none absolute -inset-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10",
              gradient,
            )}
          />
          <div
            className={cn(
              "mb-5 inline-flex rounded-xl bg-gradient-to-br p-3",
              gradient,
            )}
          >
            {icon}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-text-secondary">
            {description}
          </p>
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </Glass>
      </motion.div>
    );
  },
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
export type { FeatureCardProps };