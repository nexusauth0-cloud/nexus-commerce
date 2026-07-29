"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
  Bot,
  Globe,
  BarChart3,
  Shield,
  Zap,
  Search,
  CreditCard,
  Package,
  Bell,
  Users,
  Check,
  ArrowUp,
  ArrowDown,
  Clock,
} from "lucide-react";
import { Glass } from "@nexus/ui/glass";
import { cn } from "@/lib/utils";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useAnimatedValue(target: number, delay = 0, duration = 2000) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !entry.isIntersecting) return;
        setTimeout(() => setStarted(true), delay);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { value, ref };
}

function Counter({
  value,
  suffix = "",
  prefix = "",
  delay = 0,
  duration = 2000,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const { value: count, ref } = useAnimatedValue(value, delay, duration);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  change,
  changeUp = true,
  icon,
  delay = 0,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: string;
  changeUp?: boolean;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <Glass variant="card" className="p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
          {label}
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.03]">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">
          {prefix}
          <Counter value={value} delay={delay} />
          {suffix}
        </span>
        {change && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              changeUp ? "text-success" : "text-danger",
            )}
          >
            {changeUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {change}
          </span>
        )}
      </div>
    </Glass>
  );
}

function RevenueChart() {
  const linePoints = [
    { x: 0, y: 55 },
    { x: 20, y: 48 },
    { x: 40, y: 52 },
    { x: 60, y: 35 },
    { x: 80, y: 40 },
    { x: 100, y: 28 },
    { x: 120, y: 32 },
    { x: 140, y: 18 },
    { x: 160, y: 22 },
    { x: 180, y: 10 },
    { x: 200, y: 14 },
    { x: 220, y: 5 },
    { x: 240, y: 8 },
    { x: 260, y: 2 },
    { x: 280, y: 4 },
    { x: 300, y: 0 },
  ];
  const pathD = linePoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const barData = [35, 50, 30, 60, 42, 70, 55, 80, 62, 90, 72, 48];

  return (
    <Glass variant="card" className="p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">Revenue Analytics</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live
        </span>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] text-white/30">Today</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-white">
              $<Counter value={48320} delay={200} />
            </span>
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-success">
              <ArrowUp className="h-2.5 w-2.5" /> 12.4%
            </span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-white/30">This Week</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-white">
              $<Counter value={284150} delay={400} />
            </span>
            <span className="flex items-center gap-0.5 text-[10px] font-medium text-success">
              <ArrowUp className="h-2.5 w-2.5" /> 8.7%
            </span>
          </div>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] p-3">
        {[
          { label: "Orders", value: 1247, icon: ShoppingCart },
          { label: "Conversion", value: 3.42, suffix: "%", decimals: true },
          { label: "AOV", value: 187, prefix: "$", icon: DollarSign },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-[10px] text-white/30">{stat.label}</div>
            <div className="text-sm font-bold text-white">
              {stat.prefix || ""}
              <Counter
                value={stat.decimals ? stat.value * 100 : stat.value}
                delay={600}
              />
              {stat.suffix || ""}
            </div>
          </div>
        ))}
      </div>

      <svg viewBox="0 0 300 56" className="h-14 w-full overflow-visible">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${pathD} L300,56 L0,56 Z`} fill="url(#lineGrad)" opacity="0.3" />
        <motion.path
          d={pathD}
          fill="none"
          stroke="#00D9FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5, ease: easeOutExpo }}
        />
        {linePoints.filter((_, i) => i % 3 === 0).map((p) => (
          <motion.circle
            key={p.x}
            cx={p.x}
            cy={p.y}
            r="2.5"
            fill="#05070B"
            stroke="#00D9FF"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2 + p.x * 0.005 }}
          />
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-6 gap-1">
        {barData.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h * 0.35 + 4}px` }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.04, ease: easeOutExpo }}
            className="rounded-t-sm bg-gradient-to-t from-primary/30 to-primary/60"
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[8px] text-white/20">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
          (m) => (
            <span key={m}>{m}</span>
          ),
        )}
      </div>
    </Glass>
  );
}

const allEvents = [
  { user: "Sarah", country: "Germany", action: "purchased Gaming Laptop", time: "Just now", icon: ShoppingCart },
  { user: "AI Engine", action: "created bundle recommendation", time: "1m ago", icon: Bot },
  { user: "System", action: "Inventory synchronized across 3 warehouses", time: "3m ago", icon: Package },
  { user: "Stripe", action: "Payment confirmed — $1,299", time: "5m ago", icon: CreditCard },
  { user: "AI Engine", action: "Price optimized for 24 products", time: "7m ago", icon: TrendingUp },
  { user: "System", action: "Flash sale launched — 40% off Audio", time: "12m ago", icon: Zap },
  { user: "AI Engine", action: "Detected buying trend: Gaming peripherals", time: "18m ago", icon: Activity },
  { user: "Sarah", action: "added 3 items to wishlist", time: "22m ago", icon: Heart },
  { user: "System", action: "Stock alert: 5 units remaining — Wireless Mouse", time: "28m ago", icon: Bell },
  { user: "AI Engine", action: "Recommendations refreshed for 1.2K users", time: "35m ago", icon: Bot },
];

function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function getEventIcon(action: string, defaultIcon: React.ReactNode) {
  if (action.includes("purchased")) return <ShoppingCart className="h-3 w-3" />;
  if (action.includes("bundle") || action.includes("Recommendations") || action.includes("Price optimized"))
    return <Bot className="h-3 w-3" />;
  if (action.includes("Inventory") || action.includes("Stock"))
    return <Package className="h-3 w-3" />;
  if (action.includes("Payment") || action.includes("Stripe"))
    return <CreditCard className="h-3 w-3" />;
  if (action.includes("Flash sale"))
    return <Zap className="h-3 w-3" />;
  if (action.includes("trend") || action.includes("refreshed"))
    return <Activity className="h-3 w-3" />;
  if (action.includes("wishlist"))
    return <Heart className="h-3 w-3" />;
  if (action.includes("alert"))
    return <Bell className="h-3 w-3" />;
  return defaultIcon;
}

function ActivityFeed() {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    if (visibleCount >= allEvents.length) return;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 3000);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <Glass variant="card" className="flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
            Live Activity
          </span>
        </div>
        <motion.span
          className="flex h-1.5 w-1.5 rounded-full bg-success"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      <div className="flex-1 space-y-1 overflow-hidden">
        {allEvents.slice(0, visibleCount).map((event, i) => (
          <motion.div
            key={`${event.user}-${event.time}-${i}`}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="flex items-start gap-3 rounded-lg border border-white/[0.02] bg-white/[0.01] px-3 py-2.5"
          >
            <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.03] text-primary/60">
              {getEventIcon(event.action, <Activity className="h-3 w-3" />)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-white/70">
                <span className="font-medium text-white">{event.user}</span>{" "}
                {event.action.includes("purchased") ? (
                  <>
                    purchased{" "}
                    <span className="text-primary/80">{event.action.replace("purchased ", "")}</span>
                    {event.country && (
                      <span className="text-white/30"> from {event.country}</span>
                    )}
                  </>
                ) : (
                  event.action
                )}
              </div>
              <div className="mt-0.5 text-[10px] text-white/20">{event.time}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 border-t border-white/[0.04] pt-3 text-center text-[10px] text-white/20">
        {visibleCount < allEvents.length ? (
          <span className="flex items-center justify-center gap-1">
            <motion.span
              className="inline-block h-1 w-1 rounded-full bg-primary/40"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Streaming live events
          </span>
        ) : (
          "Showing all recent events"
        )}
      </div>
    </Glass>
  );
}

const aiTasks = [
  { name: "Optimizing recommendations", progress: 87, time: "~2m remaining", icon: Zap },
  { name: "Detecting customer intent", progress: 94, time: "~1m remaining", icon: Search },
  { name: "Predicting inventory demand", progress: 62, time: "~4m remaining", icon: Package },
  { name: "Adjusting merchandising", progress: 78, time: "~2m remaining", icon: BarChart3 },
  { name: "Monitoring fraud", progress: 99, time: "~30s remaining", icon: Shield },
  { name: "Learning shopping behavior", progress: 45, time: "~6m remaining", icon: Activity },
];

function AIBrain() {
  return (
    <Glass variant="card" className="flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
            AI Commerce Brain
          </span>
        </div>
        <motion.span
          className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary/70"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          6 active
        </motion.span>
      </div>

      <div className="flex-1 space-y-3">
        {aiTasks.map((task) => (
          <div key={task.name}>
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs">
                <task.icon className="h-3 w-3 text-primary/50" />
                <span className="text-white/60">{task.name}</span>
              </div>
              <span className="text-[10px] text-white/30">{task.progress}%</span>
            </div>
            <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${task.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2, ease: easeOutExpo }}
                className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
              />
            </div>
            <div className="mt-0.5 text-[9px] text-white/20">{task.time}</div>
          </div>
        ))}
      </div>
    </Glass>
  );
}

function WorldMap() {
  return (
    <Glass variant="card" className="relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
            Global Commerce
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-white/30">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-success"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          12 active regions
        </span>
      </div>

      <div className="relative mx-auto aspect-[2/1] w-full max-w-3xl">
        <svg viewBox="0 0 800 400" className="h-full w-full">
          <rect width="800" height="400" fill="transparent" />

          <defs>
            <radialGradient id="nodeGlow">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.path
            d="M195,85 C240,70 290,65 340,75 C370,80 380,85 400,90"
            stroke="rgba(0,217,255,0.15)"
            strokeWidth="0.5"
            fill="none"
            className="hidden md:block"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: easeOutExpo }}
          />
          <motion.path
            d="M400,90 C420,95 440,100 470,95 C510,88 540,80 570,85"
            stroke="rgba(0,217,255,0.15)"
            strokeWidth="0.5"
            fill="none"
            className="hidden md:block"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 0.5, ease: easeOutExpo }}
          />
          <motion.path
            d="M340,160 C370,150 400,145 430,150 C460,155 490,160 520,155"
            stroke="rgba(0,217,255,0.12)"
            strokeWidth="0.5"
            fill="none"
            className="hidden md:block"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 1, ease: easeOutExpo }}
          />
          <motion.path
            d="M195,85 C220,120 240,140 260,160 C280,180 300,190 340,160"
            stroke="rgba(0,217,255,0.08)"
            strokeWidth="0.5"
            fill="none"
            className="hidden md:block"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4, delay: 1.5, ease: easeOutExpo }}
          />

          <g opacity="0.06" className="hidden md:block">
            <ellipse cx="200" cy="120" rx="70" ry="50" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="420" cy="105" rx="60" ry="40" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="550" cy="120" rx="80" ry="45" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="450" cy="200" rx="40" ry="30" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="250" cy="220" rx="30" ry="35" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="650" cy="280" rx="35" ry="25" fill="rgba(255,255,255,0.2)" />
          </g>

          {[
            { cx: 200, cy: 120, name: "New York", orders: 12450, revenue: "$2.4M", category: "Electronics" },
            { cx: 420, cy: 100, name: "London", orders: 8720, revenue: "$1.8M", category: "Fashion" },
            { cx: 550, cy: 115, name: "Tokyo", orders: 15300, revenue: "$3.1M", category: "Electronics" },
            { cx: 450, cy: 195, name: "Dubai", orders: 5610, revenue: "$1.1M", category: "Luxury" },
            { cx: 250, cy: 215, name: "São Paulo", orders: 4230, revenue: "$890K", category: "Beauty" },
            { cx: 650, cy: 275, name: "Sydney", orders: 3180, revenue: "$720K", category: "Health" },
          ].map((node, i) => (
            <g key={node.name} className="group">
              <circle cx={node.cx} cy={node.cy} r="30" fill="url(#nodeGlow)" opacity="0.5" />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r="3"
                fill="#00D9FF"
                initial={{ opacity: 0, r: 0 }}
                whileInView={{ opacity: 1, r: 3 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r="6"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="1"
                opacity="0.3"
                animate={{ r: [6, 10, 6], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              />
              <rect
                x={node.cx - 55}
                y={node.cy - 42}
                width="110"
                height="36"
                rx="4"
                fill="#0B1220"
                stroke="rgba(0,217,255,0.2)"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
              <text
                x={node.cx}
                y={node.cy - 32}
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="600"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                {node.name}
              </text>
              <text
                x={node.cx}
                y={node.cy - 20}
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize="7"
                fontFamily="sans-serif"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                {node.orders.toLocaleString()} orders · {node.revenue}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Glass>
  );
}

const predictions = [
  { label: "Expected Revenue Tomorrow", value: 52400, prefix: "$", change: "+8.3%", icon: TrendingUp },
  { label: "Expected Orders", value: 1560, change: "+12.1%", icon: ShoppingCart },
  { label: "Inventory Alerts", value: 3, change: "-2", changeUp: false, icon: Package },
  { label: "Trending Categories", value: 8, icon: Activity },
  { label: "Demand Forecast", value: 94, suffix: "%", change: "+3.2%", icon: BarChart3 },
  { label: "Customer Growth", value: 18.5, suffix: "K", change: "+15.3%", icon: Users },
];

const services = [
  { name: "Stripe API", icon: CreditCard, status: "operational" as const },
  { name: "CMS", icon: Activity, status: "operational" as const },
  { name: "Search Engine", icon: Search, status: "operational" as const },
  { name: "AI Engine", icon: Bot, status: "operational" as const },
  { name: "Payments", icon: DollarSign, status: "operational" as const },
  { name: "Inventory", icon: Package, status: "operational" as const },
  { name: "Recommendations", icon: Zap, status: "operational" as const },
  { name: "Notifications", icon: Bell, status: "operational" as const },
  { name: "Authentication", icon: Shield, status: "operational" as const },
];

function StatusDot({ status }: { status: "operational" | "degraded" | "down" }) {
  return (
    <motion.span
      className={cn(
        "inline-block h-1.5 w-1.5 rounded-full",
        status === "operational" && "bg-success shadow-[0_0_6px_rgba(34,197,94,0.3)]",
        status === "degraded" && "bg-warning",
        status === "down" && "bg-danger",
      )}
      animate={status === "operational" ? { opacity: [0.5, 1, 0.5] } : undefined}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
}

function ServiceCard({ name, icon: Icon, status }: { name: string; icon: React.ElementType; status: "operational" | "degraded" | "down" }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-white/[0.08] hover:bg-white/[0.02]">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03]">
        <Icon className="h-4 w-4 text-primary/60" />
      </div>
      <div className="flex-1">
        <div className="text-xs font-medium text-white/70">{name}</div>
        <div className="flex items-center gap-1.5 text-[10px] text-success">
          <StatusDot status={status} />
          <span className="capitalize">{status}</span>
        </div>
      </div>
    </div>
  );
}

export function LiveDashboard() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-4 py-1.5">
            <Activity className="h-3.5 w-3.5 text-primary/80" />
            <span className="text-xs font-medium tracking-wide text-primary/80">
              Live Dashboard
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Live{" "}
            <span className="gradient-primary-text">Commerce Intelligence</span>
          </h2>
          <p className="mt-3 text-base text-text-secondary sm:text-lg">
            See your business evolve in real time with AI-powered analytics,
            automation, and predictive insights.
          </p>
        </motion.div>

        <div className="mx-auto max-w-6xl rounded-2xl border border-white/[0.04] bg-white/[0.01] p-1 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <RevenueChart />
            </div>
            <div className="lg:col-span-1">
              <ActivityFeed />
            </div>
            <div className="lg:col-span-1">
              <AIBrain />
            </div>
          </div>

          <div className="mt-4">
            <WorldMap />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <div className="mb-5 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
                Predictive Intelligence
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {predictions.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: easeOutExpo }}
                >
                  <StatCard
                    label={p.label}
                    value={p.value}
                    prefix={p.prefix}
                    suffix={p.suffix}
                    change={p.change}
                    changeUp={p.changeUp !== false}
                    icon={<p.icon className="h-3.5 w-3.5 text-primary/60" />}
                    delay={i * 150 + 200}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <div className="mb-5 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
                Platform Health
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9">
              {services.map((service) => (
                <ServiceCard key={service.name} name={service.name} icon={service.icon} status={service.status} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
