"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Zap,
  Shield,
  Sparkles,
  BarChart3,
  Infinity,
  Search,
  MessageCircle,
} from "lucide-react";
import { Section } from "@nexus/ui/section";
import { Heading } from "@nexus/ui/heading";
import { FeatureCard } from "@nexus/ui/feature-card";
import { Glass } from "@nexus/ui/glass";

const bentoFeatures = [
  {
    icon: <Brain className="h-6 w-6 text-white" />,
    title: "AI-Powered Shopping",
    description:
      "Our intelligent engine learns preferences and delivers personalized product recommendations that improve over time.",
    gradient: "from-primary to-secondary",
    bentoSize: "2x1" as const,
  },
  {
    icon: <Zap className="h-6 w-6 text-white" />,
    title: "Lightning Fast",
    description: "Built on Next.js 15 with edge computing and streaming.",
    gradient: "from-secondary to-primary",
    bentoSize: "1x1" as const,
  },
  {
    icon: <Shield className="h-6 w-6 text-white" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption and advanced fraud detection.",
    gradient: "from-success to-primary",
    bentoSize: "1x1" as const,
  },
  {
    icon: <Search className="h-6 w-6 text-white" />,
    title: "Smart Search",
    description:
      "Natural language queries. 'A laptop for gaming under $1500' finds perfect matches instantly.",
    gradient: "from-warning to-secondary",
    bentoSize: "1x1" as const,
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    title: "Real-time Analytics",
    description:
      "Comprehensive dashboards with real-time data on sales and customer behavior.",
    gradient: "from-primary to-success",
    bentoSize: "1x1" as const,
  },
  {
    icon: <Infinity className="h-6 w-6 text-white" />,
    title: "Unlimited Scale",
    description: "From hundreds to millions of products without skipping a beat.",
    gradient: "from-secondary to-warning",
    bentoSize: "1x1" as const,
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-white" />,
    title: "AI Support",
    description:
      "24/7 intelligent customer support that knows your entire catalog.",
    gradient: "from-primary to-secondary",
    bentoSize: "1x1" as const,
  },
  {
    icon: <Sparkles className="h-6 w-6 text-white" />,
    title: "Automated Merchandising",
    description: "AI-driven product placement and collection generation.",
    gradient: "from-secondary to-primary",
    bentoSize: "1x1" as const,
  },
];

export function Features() {
  return (
    <Section size="xl" withGlow>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl text-center"
      >
        <Heading
          badge="Why NEXUS"
          badgeIcon={<Sparkles className="h-3.5 w-3.5" />}
          size="3xl"
          className="text-center"
        >
          Built for the{" "}
          <span className="gradient-primary-text">next generation</span> of
          commerce
        </Heading>
        <p className="mt-4 text-lg text-text-secondary">
          Every feature crafted to deliver an unparalleled shopping experience
          that drives growth and customer satisfaction.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {bentoFeatures.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            gradient={feature.gradient}
            variant="bento"
            bentoSize={feature.bentoSize}
          />
        ))}

        {/* Code stats glass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="col-span-2 row-span-1 md:col-span-1"
        >
          <Glass
            variant="card"
            hover
            className="flex h-full flex-col items-center justify-center p-8 text-center"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="text-4xl font-bold text-white">99.9%</div>
            <p className="mt-2 text-sm text-text-secondary">Platform Uptime</p>
            <div className="mt-4 flex gap-1">
              {["S", "O", "C", "2"].map((letter, i) => (
                <span
                  key={i}
                  className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] font-bold tracking-wider text-text-secondary"
                >
                  {letter}
                </span>
              ))}
            </div>
          </Glass>
        </motion.div>
      </div>
    </Section>
  );
}