"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Sparkles,
  Check,
  Star,
  Truck,
  ShoppingBag,
  RotateCcw,
  Monitor,
  Keyboard,
  Mouse,
  Zap,
} from "lucide-react";
import { Button } from "@nexus/ui/button";
import { Glass } from "@nexus/ui/glass";
import { cn } from "@/lib/utils";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const products = [
  {
    name: "Gaming Laptop RTX 4060",
    price: "$1,299",
    rating: 4.8,
    reviews: 2341,
    confidence: 97,
    stock: "In Stock" as const,
    delivery: "Tomorrow",
    icon: Monitor,
    gradient: "from-primary/20 to-secondary/10",
  },
  {
    name: "Mechanical Keyboard RGB",
    price: "$149",
    rating: 4.6,
    reviews: 1892,
    confidence: 94,
    stock: "In Stock" as const,
    delivery: "Tomorrow",
    icon: Keyboard,
    gradient: "from-secondary/20 to-primary/10",
  },
  {
    name: "Wireless Gaming Mouse",
    price: "$79",
    rating: 4.7,
    reviews: 3104,
    confidence: 96,
    stock: "In Stock" as const,
    delivery: "Tomorrow",
    icon: Mouse,
    gradient: "from-success/20 to-primary/10",
  },
  {
    name: "165Hz Gaming Monitor",
    price: "$349",
    rating: 4.5,
    reviews: 1567,
    confidence: 92,
    stock: "Low (5 left)" as const,
    delivery: "In 2 days",
    icon: Monitor,
    gradient: "from-warning/20 to-secondary/10",
  },
];

const reasons = [
  "Fits the requested budget",
  "Highest gaming performance",
  "Excellent reviews",
  "Ships tomorrow",
  "Fully compatible",
  "Best overall value",
];

const streamingResponse =
  "Based on your budget and needs, I recommend a complete gaming bundle: RTX 4060 laptop, mechanical keyboard, wireless mouse, and 165Hz monitor. All items are in stock and fully compatible.";

const productEntrance = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.45, ease: easeOutExpo },
  }),
};

type Phase = "greeting" | "user-message" | "thinking" | "streaming" | "complete";

function TypingDots() {
  return (
    <span className="inline-flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

function StreamingText({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayed}
      <motion.span
        className="inline-block h-[1em] w-[2px] bg-primary align-text-bottom"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    </span>
  );
}

function AIAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
      <Bot className="h-4 w-4 text-primary" />
    </div>
  );
}

function MessageBubble({
  children,
  isUser,
}: {
  children: React.ReactNode;
  isUser?: boolean;
}) {
  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      {!isUser && <AIAvatar />}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary/10 text-white"
            : "border border-white/[0.04] bg-white/[0.02] text-white/80",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
          className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
        />
      </div>
      <span className="text-[10px] font-medium text-primary/70">{value}%</span>
    </div>
  );
}

function ProductCard({
  product,
  index,
  visible,
}: {
  product: (typeof products)[0];
  index: number;
  visible: boolean;
}) {
  const Icon = product.icon;
  return (
    <motion.div
      custom={index}
      variants={productEntrance}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      className="group"
    >
      <Glass
        variant="card"
        className="h-full p-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg sm:p-5"
      >
        <div className="mb-3 flex items-start justify-between">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br",
              product.gradient,
            )}
          >
            <Icon className="h-5 w-5 text-primary/70" />
          </div>
          <div className="flex items-center gap-0.5 text-[11px] text-warning">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating) ? "fill-current" : "fill-none opacity-30",
                )}
              />
            ))}
            <span className="ml-1 text-white/40">{product.rating}</span>
          </div>
        </div>

        <h4 className="mb-0.5 text-sm font-semibold text-white">{product.name}</h4>
        <span className="text-lg font-bold text-primary">{product.price}</span>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-white/30">AI Confidence</span>
          </div>
          <ConfidenceBar value={product.confidence} />
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-3 text-[11px]">
          <span
            className={cn(
              "flex items-center gap-1",
              product.stock === "In Stock" ? "text-success" : "text-warning",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                product.stock === "In Stock" ? "bg-success" : "bg-warning",
              )}
            />
            {product.stock}
          </span>
          <span className="flex items-center gap-1 text-white/40">
            <Truck className="h-3 w-3" />
            {product.delivery}
          </span>
        </div>
      </Glass>
    </motion.div>
  );
}

export function AIExperience() {
  const [phase, setPhase] = useState<Phase>("greeting");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("user-message"), 600);
    const t2 = setTimeout(() => setPhase("thinking"), 1600);
    const t3 = setTimeout(() => {
      setPhase("streaming");
      setShowRecommendations(true);
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleStreamComplete = () => {
    setPhase("complete");
    setTimeout(() => setShowReasoning(true), 200);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.04] px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary/80" />
            <span className="text-xs font-medium tracking-wide text-primary/80">
              AI Shopping Experience
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Try{" "}
            <span className="gradient-primary-text">Shopping with AI</span>
          </h2>
          <p className="mt-3 text-base text-text-secondary sm:text-lg">
            Tell NEXUS what you need. Watch it search, analyze, and recommend
            the perfect products — in real time.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
          >
            <Glass
              variant="elevated"
              className="overflow-hidden p-0"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.25)" }}
            >
              <div className="flex items-center gap-3 border-b border-white/[0.04] bg-white/[0.02] px-5 py-3.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">NEXUS AI</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-success/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Online — Ready to help
                  </div>
                </div>
                <motion.div
                  className="flex h-6 items-center gap-1 rounded-full bg-primary/10 px-2 text-[10px] font-medium text-primary/70"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  Active
                </motion.div>
              </div>

              <div className="space-y-4 p-5">
                <AnimatePresence mode="popLayout">
                  {phase !== "greeting" && (
                    <motion.div
                      key="user-message"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: easeOutExpo }}
                    >
                      <MessageBubble isUser>
                        I&apos;m building a gaming setup under{" "}
                        <span className="font-medium text-white">$2,000</span>.
                      </MessageBubble>
                    </motion.div>
                  )}
                </AnimatePresence>

                <MessageBubble>
                  <span className="mb-1 block text-[11px] font-medium text-primary/60">
                    NEXUS AI
                  </span>

                  <AnimatePresence mode="wait">
                    {phase === "greeting" && (
                      <motion.span
                        key="greeting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Hi! What are you shopping for today?
                      </motion.span>
                    )}

                    {phase === "user-message" && (
                      <motion.span
                        key="waiting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Let me search the catalog for you.
                      </motion.span>
                    )}

                    {phase === "thinking" && (
                      <motion.div
                        key="thinking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <span>Searching products</span>
                        <TypingDots />
                      </motion.div>
                    )}

                    {(phase === "streaming" || phase === "complete") && (
                      <motion.div
                        key="streaming"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {phase === "streaming" ? (
                          <StreamingText
                            text={streamingResponse}
                            onComplete={handleStreamComplete}
                          />
                        ) : (
                          <span>
                            {streamingResponse}
                            <motion.span
                              className="inline-block h-[1em] w-[2px] bg-primary/60 align-text-bottom"
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </MessageBubble>
              </div>

              <div className="border-t border-white/[0.04] bg-white/[0.01] px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 text-[11px] text-white/20 flex items-center">
                    Ask NEXUS to find anything...
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-3 w-3 text-primary" />
                  </div>
                </div>
              </div>
            </Glass>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
            className="flex flex-col gap-5"
          >
            <AnimatePresence>
              {showRecommendations && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-white">AI Recommendations</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary/70">
                      {products.length} found
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {products.map((product, i) => (
                      <ProductCard
                        key={product.name}
                        product={product}
                        index={i}
                        visible={showRecommendations}
                      />
                    ))}
                  </div>

                  <AnimatePresence>
                    {showReasoning && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: easeOutExpo }}
                        className="space-y-4"
                      >
                        <Glass variant="card" className="p-5">
                          <div className="mb-3 flex items-center gap-2">
                            <Bot className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
                              AI Reasoning
                            </span>
                          </div>
                          <p className="mb-3 text-xs text-white/50">
                            Why these products were selected:
                          </p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            {reasons.map((reason) => (
                              <div key={reason} className="flex items-center gap-2 text-xs">
                                <Check className="h-3 w-3 shrink-0 text-success" />
                                <span className="text-white/60">{reason}</span>
                              </div>
                            ))}
                          </div>
                        </Glass>

                        <Glass variant="card" className="p-5">
                          <div className="mb-3 flex items-center gap-2">
                            <ShoppingBag className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40">
                              Bundle Summary
                            </span>
                          </div>
                          <div className="mb-4 grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-[10px] text-white/30">Total Price</div>
                              <div className="text-xl font-bold text-white">$1,876</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-white/30">Money Saved</div>
                              <div className="text-xl font-bold text-success">$247</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-white/30">Performance</div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-white">96</span>
                                <span className="text-[10px] text-white/30">/100</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-white/30">Compatibility</div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-white">99</span>
                                <span className="text-[10px] text-white/30">/100</span>
                              </div>
                            </div>
                          </div>
                          <div className="mb-4 flex items-center gap-3 border-t border-white/[0.04] pt-3 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                              <Truck className="h-3 w-3" />
                              Estimated delivery: Tomorrow
                            </span>
                          </div>
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <Button size="md" className="flex-1 gap-2">
                              <ShoppingBag className="h-4 w-4" />
                              Add AI Bundle to Cart
                            </Button>
                            <Button
                              variant="ghost"
                              size="md"
                              className="flex-1 gap-2 text-white/60 hover:text-white"
                            >
                              <RotateCcw className="h-4 w-4" />
                              Refine Recommendation
                            </Button>
                          </div>
                        </Glass>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
