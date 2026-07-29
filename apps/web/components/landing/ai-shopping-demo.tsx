"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, Truck, DollarSign, Check, Zap, Brain, Send, Bot, User } from "lucide-react"
import { Badge } from "@nexus/ui/badge"
import { Button } from "@nexus/ui/button"

type Message = {
  role: "user" | "assistant"
  content: string
  products?: typeof demoProducts
  bundle?: typeof demoBundle
}

const demoProducts = [
  {
    name: "Samsung Odyssey OLED G8",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b10f7?w=200&q=80",
    price: 1299,
  },
  {
    name: "Sony WH-1000XM6",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
    price: 399,
  },
  {
    name: "Garmin Fenix 8 Pro",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&q=80",
    price: 999,
  },
]

const demoBundle = {
  items: [
    { name: "Samsung Odyssey OLED G8", price: 1299 },
    { name: "Sony WH-1000XM6", price: 399 },
    { name: "Logitech G Pro X Superlight", price: 159 },
    { name: "Secretlab Titan Evo", price: 549 },
  ],
  total: 2406,
  savings: 449,
  delivery: "Free · Dec 24",
}

export function AIShoppingDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [phase, setPhase] = useState<"idle" | "user" | "thinking" | "replying" | "complete">("idle")
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("user"), 800)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase === "user") {
      const t = setTimeout(() => setPhase("thinking"), 1200)
      return () => clearTimeout(t)
    }
    if (phase === "thinking") {
      const t = setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content: "Great choice! Based on your budget of $1,500, I've found 3 top-rated gaming products that work perfectly together. Let me show you what I've curated:",
            products: demoProducts,
          },
        ])
        setPhase("replying")
      }, 2200)
      return () => clearTimeout(t)
    }
    if (phase === "replying") {
      const t = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I've also optimized these into a bundle that saves you $449. All items are compatible, in stock, and ready to ship:",
            bundle: demoBundle,
          },
        ])
        setPhase("complete")
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [phase])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, phase])

  return (
    <section className="relative overflow-hidden py-24" aria-labelledby="ai-demo-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            Interactive Demo
          </Badge>
          <h2 id="ai-demo-heading" className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl">
            AI Shopping Assistant
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/50">
            Watch how our AI helps you find the perfect products in seconds
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0d12] shadow-[0_0_60px_-20px_rgba(0,217,255,0.08)]">
            <div className="border-b border-white/[0.06] bg-gradient-to-r from-primary/[0.02] to-transparent px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">NEXUS AI</span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      phase === "complete" ? "bg-green-400/10 text-green-400" : "bg-primary/10 text-primary"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${phase === "complete" ? "bg-green-400" : "animate-pulse bg-primary"}`} />
                      {phase === "complete" ? "Online" : "Thinking..."}
                    </span>
                  </div>
                  <p className="text-xs text-white/30">Answers in real-time</p>
                </div>
              </div>
            </div>

            <div ref={chatRef} className="max-h-[500px] space-y-4 overflow-y-auto p-5">
              <AnimatePresence>
                {phase === "user" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                        <User className="h-3.5 w-3.5 text-white/60" />
                      </div>
                      <div className="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                        <p className="text-sm text-white">
                          I need a gaming setup under <span className="font-semibold text-primary">$1,500</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Brain className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="rounded-2xl rounded-tr-sm bg-primary/10 px-4 py-3">
                        <p className="text-sm leading-relaxed text-white">{msg.content}</p>
                      </div>

                      {msg.products && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="flex gap-3 overflow-x-auto pb-2 no-scrollbar"
                        >
                          {msg.products.map((product, pi) => (
                            <motion.div
                              key={product.name}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: 0.5 + pi * 0.15 }}
                              whileHover={{ y: -4 }}
                              className="flex-shrink-0"
                            >
                              <div className="w-[150px] overflow-hidden rounded-xl bg-[#0d1117] transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(0,217,255,0.1)]">
                                <div className="relative aspect-square">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="150px"
                                  />
                                </div>
                                <div className="p-2.5">
                                  <p className="truncate text-xs text-white/80">{product.name}</p>
                                  <p className="mt-0.5 font-sans text-sm font-semibold text-primary">${product.price}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {msg.bundle && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="rounded-xl border border-primary/20 bg-primary/[0.03] p-4"
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <Badge variant="outline" className="border-primary/30 text-[10px] text-primary">
                              <Zap className="mr-1 h-2.5 w-2.5" />
                              Optimized Bundle
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {msg.bundle.items.map((item) => (
                              <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <Check className="h-3.5 w-3.5 text-green-400" />
                                  <span className="text-white/70">{item.name}</span>
                                </div>
                                <span className="text-white/60">${item.price}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 border-t border-white/[0.06] pt-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-white/50">Retail total</span>
                              <span className="font-sans font-semibold text-white/50 line-through">
                                ${msg.bundle.total + msg.bundle.savings}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-white">Your price</span>
                              <span className="font-sans text-lg font-bold text-primary">
                                ${msg.bundle.total}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-xs text-green-400">
                              <DollarSign className="h-3 w-3" />
                              Save ${msg.bundle.savings}
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-xs text-white/40">
                              <Truck className="h-3.5 w-3.5" />
                              {msg.bundle.delivery}
                            </div>
                            <Button size="sm" className="ml-auto bg-primary text-black hover:bg-primary/90" aria-label="Add bundle to cart">
                              <ShoppingBagIcon className="mr-1 h-3.5 w-3.5" />
                              Add Bundle
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              <AnimatePresence>
                {phase === "thinking" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Brain className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl rounded-tr-sm bg-white/5 px-4 py-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }}
                            className="h-2 w-2 rounded-full bg-primary"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-white/40">Analyzing your request...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {phase === "complete" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Send className="h-3.5 w-3.5 text-white/40" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 rounded-2xl rounded-tr-sm border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                      <input
                        type="text"
                        placeholder="Ask about any product..."
                        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/20"
                        aria-label="Ask the AI assistant"
                      />
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-primary">
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShoppingBagIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
