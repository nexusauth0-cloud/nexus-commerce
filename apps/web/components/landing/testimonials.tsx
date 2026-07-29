"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";
import { Section } from "@nexus/ui/section";
import { Heading } from "@nexus/ui/heading";
import { Glass } from "@nexus/ui/glass";
import { Avatar, AvatarFallback } from "@nexus/ui/avatar";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, Lumina Beauty",
    content:
      "NEXUS transformed our online store. The AI recommendations increased our average order value by 40% within the first month. Our customers love the personalized experience.",
    initials: "SC",
    gradient: "from-primary to-secondary",
    rating: 5,
    featured: true,
  },
  {
    name: "Marcus Johnson",
    role: "CTO, TechVault",
    content:
      "The developer experience is unmatched. Clean APIs, excellent documentation, and the AI features are genuinely game-changing. We migrated our entire catalog in under a week.",
    initials: "MJ",
    gradient: "from-secondary to-primary",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "CEO, Artisan Market",
    content:
      "Finally, a platform that understands both aesthetics and functionality. Our conversion rate jumped 65% after switching to NEXUS. The AI search is pure magic.",
    initials: "ER",
    gradient: "from-primary to-success",
    rating: 5,
  },
];

const metrics = [
  { value: "40%", label: "Avg. Order Value Increase" },
  { value: "65%", label: "Conversion Rate Boost" },
  { value: "12K+", label: "Active Merchants" },
  { value: "4.9★", label: "Average Rating" },
];

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function TestimonialCard({
  t,
  index,
  featured,
}: {
  t: (typeof testimonials)[0];
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: easeOutExpo }}
      className={featured ? "md:col-span-2" : ""}
    >
      <Glass
        variant="card"
        hover
        className={cn(
          "flex h-full flex-col transition-all duration-500",
          featured
            ? "relative overflow-hidden p-8 md:p-10"
            : "p-8",
        )}
      >
        {featured && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/[0.03] blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-secondary/[0.03] blur-3xl" />
          </div>
        )}
        <Quote className={cn(
          "mb-4",
          featured ? "h-10 w-10 text-primary/20" : "h-8 w-8 text-primary/30",
        )} />
        <p className={cn(
          "flex-1 leading-relaxed text-text-secondary",
          featured && "text-lg",
        )}>
          {t.content}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <Avatar className={featured ? "h-12 w-12" : ""}>
            <AvatarFallback
              className={`bg-gradient-to-br ${t.gradient} text-sm font-bold text-white`}
            >
              {t.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-white">{t.name}</p>
            <p className="text-xs text-text-secondary">{t.role}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-1">
          {Array.from({ length: t.rating }).map((_, j) => (
            <Star
              key={j}
              className={cn(
                "fill-warning text-warning",
                featured ? "h-5 w-5" : "h-4 w-4",
              )}
            />
          ))}
        </div>
      </Glass>
    </motion.div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const nonFeatured = testimonials.filter((t) => !t.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % nonFeatured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [nonFeatured.length]);

  return (
    <Section size="xl" withGlow>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center"
      >
        <Heading badge="Testimonials" size="3xl" className="text-center">
          Loved by{" "}
          <span className="gradient-primary-text">innovators</span> worldwide
        </Heading>
        <p className="mt-4 text-lg text-text-secondary">
          See why thousands of brands trust NEXUS to power their commerce
          experience.
        </p>
      </motion.div>

      {/* Metrics row */}
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }}
          >
            <Glass
              variant="card"
              className="p-6 text-center"
            >
              <div className="text-3xl font-bold text-white">{metric.value}</div>
              <div className="mt-1.5 text-sm text-text-secondary">
                {metric.label}
              </div>
            </Glass>
          </motion.div>
        ))}
      </div>

      {/* Featured + rotating testimonial */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          t.featured ? (
            <TestimonialCard key={t.name} t={t} index={i} featured />
          ) : null
        ))}
        <AnimatePresence mode="wait">
          {nonFeatured.map((t, i) => (
            activeIndex === i && (
              <motion.div
                key={t.name + i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="flex flex-col justify-center"
              >
                <Glass variant="card" hover className="flex h-full flex-col p-8">
                  <Quote className="mb-4 h-8 w-8 text-primary/30" />
                  <p className="flex-1 leading-relaxed text-text-secondary">
                    {t.content}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback
                        className={`bg-gradient-to-br ${t.gradient} text-sm font-bold text-white`}
                      >
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">{t.name}</p>
                      <p className="text-xs text-text-secondary">{t.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                </Glass>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {nonFeatured.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-white/20 hover:bg-white/40",
            )}
          />
        ))}
      </div>

      {/* Trusted by logos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16"
      >
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-text-tertiary">
          Trusted by industry leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40">
          {[
            "TechVault",
            "Lumina",
            "Artisan",
            "NovaPay",
            "CloudScale",
            "PixelForge",
          ].map((name) => (
            <div
              key={name}
              className="text-sm font-bold tracking-tight text-white/60"
            >
              {name}
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}