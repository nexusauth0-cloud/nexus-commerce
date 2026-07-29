"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Bot,
  Check,
  TrendingUp,
  Package,
  Search,
  BarChart3,
  Tags,
  Zap,
} from "lucide-react";
import { Button } from "@nexus/ui/button";
import { AnimatedBackground } from "@nexus/ui/animated-background";
import { cn } from "@/lib/utils";

const metrics = [
  { value: "50K+", label: "Products" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "250+", label: "Brands" },
  { value: "4ms", label: "AI Search" },
];

const trustBrands = ["Stripe", "Shopify", "OpenAI", "Vercel"];

const bundleItems = [
  { name: "Gaming Laptop (RTX 4060)", price: "$999" },
  { name: "Mechanical Keyboard", price: "$149" },
  { name: "Wireless Mouse", price: "$79" },
  { name: "165Hz Gaming Monitor", price: "$349" },
];

const analyzingMessages = ["Analyzing budget...", "Checking compatibility...", "Finding best value..."];

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.45, ease: easeOutExpo },
  }),
};

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function Panel({ children, className, style }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-white/[0.08] hover:bg-white/[0.03]",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

function RevenuePanel() {
  return (
    <Panel className="col-span-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/10">
          <TrendingUp className="h-3.5 w-3.5 text-success" />
        </div>
        <div>
          <span className="text-xs font-medium tracking-wider uppercase text-white/40">Revenue</span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">$32,450</span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-success">
              <span className="text-[10px]">▲</span> 12.3%
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-0.5">
        {[4, 8, 6, 12, 10, 14, 18, 13, 16, 11, 15, 20].map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-t-sm bg-gradient-to-t from-primary/40 to-primary/70 transition-all duration-300 hover:from-primary hover:to-primary-light"
            style={{ height: `${h * 0.35 + 4}px` }}
          />
        ))}
      </div>
    </Panel>
  );
}

function AIWorkflowPanel() {
  const [state, setState] = useState<"idle" | "analyzing" | "results">("idle");
  const [analyzeIdx, setAnalyzeIdx] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setState("analyzing"), 1200);
    const t2 = setTimeout(() => setAnalyzeIdx(1), 2000);
    const t3 = setTimeout(() => setAnalyzeIdx(2), 2800);
    const t4 = setTimeout(() => setState("results"), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <Panel className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary/20 to-secondary/20">
          <Bot className="h-3.5 w-3.5 text-primary" />
        </div>
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
          AI Shopping
        </span>
      </div>

      <div className="min-h-[180px]">
        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
            >
              <p className="text-sm leading-relaxed text-white/60">
                <span className="text-white/80">&ldquo;</span>I need a complete gaming setup under $1800
                <span className="text-white/80">&rdquo;</span>
              </p>
              <div className="mt-2 flex gap-1">
                <motion.span
                  className="inline-block h-2 w-2 rounded-full bg-primary/50"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.span
                  className="inline-block h-2 w-2 rounded-full bg-primary/50"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  className="inline-block h-2 w-2 rounded-full bg-primary/50"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}

          {state === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {analyzingMessages.map((msg, i) => (
                <motion.div
                  key={msg}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: i <= analyzeIdx ? 1 : 0.3, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all",
                    i <= analyzeIdx ? "bg-primary/[0.04] text-primary" : "text-white/20",
                  )}
                >
                  {i <= analyzeIdx ? (
                    <Zap className="h-3 w-3 shrink-0" />
                  ) : (
                    <span className="h-3 w-3 shrink-0 rounded-full border border-white/10" />
                  )}
                  <span>{msg}</span>
                  {i < analyzeIdx && <Check className="ml-auto h-3 w-3" />}
                </motion.div>
              ))}
            </motion.div>
          )}

          {state === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="rounded-xl border border-primary/10 bg-primary/[0.03] p-3">
                <p className="mb-2 text-[11px] font-semibold tracking-[0.08em] uppercase text-primary/70">
                  Recommended Bundle
                </p>
                <div className="space-y-1.5">
                  {bundleItems.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary" />
                        <span className="text-white/80">{item.name}</span>
                      </div>
                      <span className="text-white/50">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 border-t border-white/[0.06] pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Bundle Total</span>
                    <span className="text-sm font-bold text-white">$1,576</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-success">
                    <Check className="h-2.5 w-2.5" />
                    <span>Save $247 vs. individual</span>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full gap-1.5 text-xs">
                <ShoppingBag className="h-3.5 w-3.5" />
                Add Entire Bundle
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Panel>
  );
}

function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [6, -6]),
    { stiffness: 150, damping: 20 },
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-6, 6]),
    { stiffness: 150, damping: 20 },
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <Panel className="relative flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        ref={ref}
        className="flex flex-col items-center"
        style={{ rotateX, rotateY }}
      >
      <div
        className="absolute -bottom-6 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full opacity-[0.08] blur-[24px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 217, 255, 0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div
          className="relative mb-3 h-[120px] w-[140px] rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-2xl"
          style={{
            boxShadow:
              "0 4px 6px -1px rgba(0,0,0,0.3), 0 8px 24px -4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="absolute inset-x-3 top-3 flex items-center justify-between">
            <div className="h-[2px] w-8 rounded-full bg-white/[0.06]" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/[0.04]" />
          </div>
          <div className="absolute inset-x-4 top-8 flex flex-col gap-1">
            <div className="h-[3px] w-full rounded-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent" />
            <div className="h-[3px] w-3/4 rounded-full bg-white/[0.04]" />
            <div className="mt-2 flex gap-1">
              <div className="h-[30px] flex-1 rounded-md bg-gradient-to-b from-primary/15 to-primary/5" />
              <div className="h-[30px] flex-1 rounded-md bg-white/[0.03]" />
              <div className="h-[30px] flex-1 rounded-md bg-white/[0.03]" />
            </div>
            <div className="mt-1 h-[2px] w-1/2 rounded-full bg-success/30" />
          </div>
        </div>

        <div
          className="mx-auto h-[2px] w-24 rounded-full opacity-[0.06]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
          }}
        />

        <span className="mt-2 text-[10px] font-medium tracking-[0.08em] uppercase text-white/30">
          Premium Audio
        </span>
      </div>
      </motion.div>
    </Panel>
  );
}

function OrdersPanel() {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <Package className="h-3 w-3 text-white/40" />
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Orders
        </span>
      </div>
      <div className="mt-2 space-y-1">
        {[
          { id: "#1042", status: "✅", label: "Delivered" },
          { id: "#1043", status: "🔄", label: "Shipping" },
          { id: "#1044", status: "⏳", label: "Processing" },
        ].map((order) => (
          <div key={order.id} className="flex items-center justify-between text-xs">
            <span className="text-white/50">{order.id}</span>
            <span className="flex items-center gap-1 text-white/40">
              {order.status}
              <span className="hidden sm:inline">{order.label}</span>
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SearchPanel() {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <Search className="h-3 w-3 text-white/40" />
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Search
        </span>
      </div>
      <div className="mt-2">
        <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5">
          <Search className="h-3 w-3 text-white/20" />
          <span className="text-xs text-white/20">wireless headphones...</span>
        </div>
        <div className="mt-1.5 space-y-0.5">
          {["Gaming headset", "Wireless mouse", "USB microphone"].map((item) => (
            <div key={item} className="flex items-center gap-1.5 text-[11px] text-white/30">
              <span className="h-0.5 w-0.5 rounded-full bg-white/20" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function InventoryPanel() {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <Tags className="h-3 w-3 text-white/40" />
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Inventory
        </span>
      </div>
      <div className="mt-2 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            <span className="text-white/50">In Stock</span>
          </div>
          <span className="text-white/80 font-medium">245</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-warning" />
            <span className="text-white/50">Low Stock</span>
          </div>
          <span className="text-white/80 font-medium">12</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-danger" />
            <span className="text-white/50">Reorder</span>
          </div>
          <span className="text-white/80 font-medium">3</span>
        </div>
      </div>
    </Panel>
  );
}

function AnalyticsPanel() {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <BarChart3 className="h-3 w-3 text-white/40" />
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Analytics
        </span>
      </div>
      <div className="mt-2 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/50">Conversion</span>
          <span className="flex items-center gap-0.5 font-medium text-success">▲ 23%</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/50">Bounce</span>
          <span className="flex items-center gap-0.5 font-medium text-danger">▼ 5%</span>
        </div>
        <div className="flex items-center gap-0.5">
          {[3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15].map((h, i) => (
            <div
              key={i}
              className="h-1 w-1.5 rounded-sm bg-gradient-to-t from-primary/30 to-primary/60"
              style={{ height: `${h + 4}px` }}
            />
          ))}
        </div>
      </div>
    </Panel>
  );
}

function RecommendationsPanel() {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <Zap className="h-3 w-3 text-white/40" />
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Recommendations
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {["Keyboard", "Mouse", "Monitor"].map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-white/50 transition-all hover:border-primary/20 hover:text-primary/70"
          >
            {item}
          </span>
        ))}
      </div>
    </Panel>
  );
}

function CartPanel() {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-3 w-3 text-white/40" />
        <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/40">
          Cart
        </span>
      </div>
      <div className="mt-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-white/50">3 items</span>
          <span className="font-medium text-white">$1,250</span>
        </div>
        <button className="mt-1.5 w-full rounded-lg bg-primary/10 py-1.5 text-center text-[11px] font-medium text-primary transition-all hover:bg-primary/20">
          Checkout →
        </button>
      </div>
    </Panel>
  );
}

function CommerceCommandCenter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div
        className="rounded-2xl border border-white/[0.06] bg-black/40 p-3 backdrop-blur-xl sm:p-4"
        style={{
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <RevenuePanel />

          <div className="animate-float">
            <AIWorkflowPanel />
          </div>

          <div className="animate-float-slow">
            <ProductShowcase />
          </div>

          <OrdersPanel />

          <SearchPanel />

          <InventoryPanel />

          <AnalyticsPanel />

          <RecommendationsPanel />

          <CartPanel />
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 40]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <AnimatedBackground />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-[120px] pb-24 lg:px-8"
      >
        <div className="flex flex-col items-center gap-24 lg:flex-row lg:items-start lg:gap-24">
          <div className="w-full max-w-[620px] shrink-0 lg:w-[45%]">
            <motion.div
              custom={0}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-4 py-1.5">
                <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  NEW
                </span>
                <span className="text-xs font-medium tracking-wide text-primary/80">
                  AI-Powered Commerce
                </span>
              </div>
            </motion.div>

            <motion.h1
              custom={1}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="text-[56px] font-extrabold leading-[0.95] tracking-tight sm:text-[64px] md:text-[72px]"
            >
              <span className="text-white">Future of</span>
              <br />
              <span className="gradient-primary-text">AI Commerce</span>
              <br />
              <span className="text-white">Starts Here.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-[560px] text-lg leading-relaxed text-text-secondary sm:text-xl"
            >
              NEXUS combines cutting-edge AI with premium design to create a
              shopping experience that feels like magic. Discover products
              tailored to your taste in seconds.
            </motion.p>

            <motion.div
              custom={3}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Button size="lg" className="group gap-2 px-8 text-base shadow-glow-primary">
                <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
                Start Shopping
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group gap-2 px-8 text-base text-white/70 hover:text-white"
              >
                <Sparkles className="h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              custom={4}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
            >
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-[28px] font-bold text-white sm:text-[32px]">
                    {metric.value}
                  </div>
                  <div className="mt-0.5 text-sm text-text-secondary leading-tight">
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={5}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="mt-10 flex items-center gap-8"
            >
              {trustBrands.map((brand) => (
                <span
                  key={brand}
                  className="text-sm font-medium tracking-wider text-white/[0.2] transition-colors hover:text-white/[0.4] uppercase"
                >
                  {brand}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="w-full lg:w-[55%] lg:max-w-none">
            <CommerceCommandCenter />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
