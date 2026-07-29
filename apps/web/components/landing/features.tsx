"use client";

import { motion } from "framer-motion";
import {
  Search,
  Package,
  TrendingUp,
  Zap,
  LayoutGrid,
  Users,
  ArrowRight,
  Check,
  ShoppingBag,
  Monitor,
  Headphones,
  Keyboard,
  Mouse,
} from "lucide-react";
import { Section } from "@nexus/ui/section";
import { Glass } from "@nexus/ui/glass";
import { cn } from "@/lib/utils";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardEntrance = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.5, ease: easeOutExpo },
  }),
};

interface CardShellProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

function CardShell({ children, index, className }: CardShellProps) {
  return (
    <motion.div
      custom={index}
      variants={cardEntrance}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("group", className)}
    >
      <Glass
        variant="card"
        className="h-full p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg sm:p-8"
      >
        {children}
      </Glass>
    </motion.div>
  );
}

function PipelineStep({
  label,
  icon: Icon,
  status,
  isLast,
}: {
  label: string;
  icon: React.ElementType;
  status: "done" | "active" | "pending";
  isLast?: boolean;
}) {
  return (
    <div className="relative flex items-center gap-4">
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[11px] font-bold transition-all duration-500",
            status === "done" && "border-primary/30 bg-primary/10 text-primary",
            status === "active" && "border-primary/50 bg-primary/20 text-primary shadow-[0_0_12px_rgba(0,217,255,0.2)]",
            status === "pending" && "border-white/[0.06] bg-white/[0.02] text-white/20",
          )}
        >
          {status === "done" ? (
            <Check className="h-3 w-3" />
          ) : (
            <Icon className="h-3 w-3" />
          )}
        </div>
        {!isLast && (
          <div
            className={cn(
              "mt-0.5 h-6 w-px transition-all duration-500",
              status === "done"
                ? "bg-gradient-to-b from-primary/40 to-primary/10"
                : "bg-white/[0.04]",
            )}
          />
        )}
      </div>
      <span
        className={cn(
          "text-sm transition-all duration-500",
          status === "done" && "text-white/70",
          status === "active" && "font-medium text-white",
          status === "pending" && "text-white/25",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "ml-auto h-1.5 w-1.5 rounded-full transition-all duration-500",
          status === "done" && "bg-primary",
          status === "active" && "bg-primary shadow-[0_0_6px_rgba(0,217,255,0.4)]",
          status === "pending" && "bg-white/[0.06]",
        )}
      />
    </div>
  );
}

function AICard() {
  const steps = [
    { label: "Customer Intent", icon: Zap },
    { label: "AI Search", icon: Search },
    { label: "Inventory Check", icon: Package },
    { label: "Bundle Optimization", icon: LayoutGrid },
    { label: "Price Intelligence", icon: TrendingUp },
    { label: "Checkout", icon: ShoppingBag },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
          <Zap className="h-4 w-4 text-primary" />
        </div>
        <div>
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
            The Engine
          </span>
          <h3 className="text-lg font-bold text-white">AI Commerce Engine</h3>
        </div>
      </div>

      <div className="flex-1 space-y-0 py-2">
        {steps.map((step, i) => (
          <PipelineStep
            key={step.label}
            label={step.label}
            icon={step.icon}
            status={i < 3 ? "done" : i === 3 ? "active" : "pending"}
            isLast={i === steps.length - 1}
          />
        ))}
      </div>

      <div className="mt-4 space-y-3 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/40">Pipeline Progress</span>
          <span className="text-primary font-medium">67%</span>
        </div>
        <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "67%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: easeOutExpo }}
            className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-white/30">
          <span>Avg response: 2.4s</span>
          <span>Accuracy: 97%</span>
          <span>1.2K/min</span>
        </div>
      </div>
    </div>
  );
}

function SearchPanelCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Search className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
          AI Search
        </span>
      </div>
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
        <Search className="h-3.5 w-3.5 shrink-0 text-white/20" />
        <span className="text-xs text-white/20">Search 24K products...</span>
      </div>
      <div className="flex-1 space-y-2">
        {[
          { label: "Gaming Laptop RTX 4060", icon: Monitor, price: "$1,299" },
          { label: "Wireless Headphones Pro", icon: Headphones, price: "$349" },
          { label: "Mechanical Keyboard RGB", icon: Keyboard, price: "$149" },
        ].map((item, i) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-lg border border-white/[0.03] bg-white/[0.01] px-3 py-2 transition-all hover:border-white/[0.06]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary/10 to-secondary/10">
              <item.icon className="h-3.5 w-3.5 text-primary/60" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs text-white/70">{item.label}</div>
              <div className="text-[10px] text-white/30">{item.price}</div>
            </div>
            <div className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary">
              0.{i + 2}s
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-3 text-[10px] text-white/25">
        <span>2,847 results</span>
        <span className="flex items-center gap-1 text-primary/60">
          Natural language <ArrowRight className="h-2.5 w-2.5" />
        </span>
      </div>
    </div>
  );
}

function InventoryCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Package className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Inventory
        </span>
      </div>
      <div className="flex-1 space-y-3">
        {[
          { name: "Gaming Laptops", stock: 245, status: "high" as const },
          { name: "Wireless Earbuds", stock: 89, status: "medium" as const },
          { name: "Mechanical KBs", stock: 12, status: "low" as const },
          { name: "USB-C Hubs", stock: 3, status: "critical" as const },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  item.status === "high" && "bg-success",
                  item.status === "medium" && "bg-warning",
                  item.status === "low" && "bg-orange-500",
                  item.status === "critical" && "bg-danger",
                )}
              />
              <span className="text-xs text-white/60">{item.name}</span>
            </div>
            <span className="text-xs font-medium text-white/80">
              {item.stock}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-white/[0.04] pt-3 text-[10px] text-white/25">
        <span className="flex h-1 w-1 rounded-full bg-success" />
        <span>Auto-reorder at 20 units</span>
      </div>
    </div>
  );
}

function RevenueCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Revenue
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">$124.5K</span>
        <span className="flex items-center gap-0.5 text-xs font-medium text-success">
          <span className="text-[10px]">▲</span> 23.4%
        </span>
      </div>
      <div className="mt-1 text-[11px] text-white/30">vs $100.8K last month</div>
      <div className="mt-4 flex flex-1 items-end gap-1">
        {[40, 55, 38, 62, 48, 75, 58, 82, 65, 90, 72, 95].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h * 0.35 + 8}px` }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.03, ease: easeOutExpo }}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/30 to-primary/60"
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-3 text-[10px] text-white/25">
        <span>Monthly revenue</span>
        <span className="text-primary/60">Real-time sync</span>
      </div>
    </div>
  );
}

function RecommenderCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Recommender
        </span>
      </div>
      <div className="flex-1">
        <div className="mb-3 text-[11px] text-white/40">Customers also bought</div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Gaming Mouse", icon: Mouse },
            { label: "USB Microphone", icon: Headphones },
            { label: "Desk Lamp", icon: Monitor },
            { label: "Monitor Arm", icon: Monitor },
          ].map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[11px] text-white/50 transition-all hover:border-primary/20 hover:text-primary/60"
            >
              <item.icon className="h-3 w-3" />
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-3 text-[10px]">
        <span className="text-white/30">Affinity score: 94%</span>
        <span className="flex items-center gap-1 text-primary/60">
          View all <ArrowRight className="h-2.5 w-2.5" />
        </span>
      </div>
    </div>
  );
}

function MerchandisingCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <LayoutGrid className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Merchandising
        </span>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Gaming", color: "from-primary/20 to-secondary/10" },
            { label: "Audio", color: "from-success/15 to-primary/10" },
            { label: "Studio", color: "from-warning/15 to-secondary/10" },
            { label: "Travel", color: "from-secondary/15 to-primary/10" },
            { label: "Fitness", color: "from-success/15 to-warning/10" },
            { label: "Smart", color: "from-primary/15 to-success/10" },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br text-[9px] font-medium tracking-wide text-white/40 transition-all group-hover:scale-[1.02]",
                item.color,
              )}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-3 text-[10px] text-white/25">
        <span>6 active collections</span>
        <span className="text-primary/60">AI-curated</span>
      </div>
    </div>
  );
}

function CustomerIntelCard() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Users className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Customers
        </span>
      </div>
      <div className="mb-3">
        <span className="text-2xl font-bold text-white">12.4K</span>
        <span className="ml-2 text-xs text-white/30">total customers</span>
      </div>
      <div className="flex-1 space-y-2.5">
        {[
          { label: "New", pct: 45, color: "bg-primary" },
          { label: "Returning", pct: 35, color: "bg-secondary" },
          { label: "VIP", pct: 20, color: "bg-success" },
        ].map((seg) => (
          <div key={seg.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-white/60">{seg.label}</span>
              <span className="text-white/40">{seg.pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${seg.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
                className={cn("h-full rounded-full", seg.color)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-3 text-[10px] text-white/25">
        <span>LTV: $847 avg</span>
        <span className="text-primary/60">↑ 18%</span>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <Section size="xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="mx-auto mb-16 max-w-2xl text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-4 py-1.5">
          <span className="text-xs font-medium tracking-wide text-primary/80">
            The Engine
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          See the{" "}
          <span className="gradient-primary-text">AI Commerce Engine</span>{" "}
          in Action
        </h2>
        <p className="mt-3 text-base text-text-secondary sm:text-lg">
          From customer intent to checkout — every step powered by intelligent
          automation. No manual work required.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 md:row-span-2">
          <CardShell index={0}>
            <AICard />
          </CardShell>
        </div>

        <CardShell index={1}>
          <SearchPanelCard />
        </CardShell>

        <CardShell index={2}>
          <InventoryCard />
        </CardShell>

        <div className="md:col-span-2 lg:col-span-2">
          <CardShell index={3}>
            <RevenueCard />
          </CardShell>
        </div>

        <CardShell index={4}>
          <RecommenderCard />
        </CardShell>

        <CardShell index={5}>
          <MerchandisingCard />
        </CardShell>

        <div className="md:col-span-2 lg:col-span-2">
          <CardShell index={6}>
            <CustomerIntelCard />
          </CardShell>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: 0.8, ease: easeOutExpo }}
        className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/25"
      >
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
          Processing 1,247 orders
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary/40" />
          89 active merchants
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success/40" />
          99.97% uptime
        </span>
      </motion.div>
    </Section>
  );
}
