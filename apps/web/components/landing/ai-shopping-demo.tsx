"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, ShoppingBag, Truck, Clock, DollarSign, Check, Zap } from "lucide-react"
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
  delivery: "Free · Arrives Dec 24",
}

export function AIShoppingDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [phase, setPhase] = useState<"idle" | "user" | "thinking" | "replying" | "complete">("idle")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("user"), 1000)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase === "user") {
      const t = setTimeout(() => setPhase("thinking"), 1500)
      return () => clearTimeout(t)
    }
    if (phase === "thinking") {
      const t = setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content:
              "Based on your budget of $1,500, I've found the perfect gaming setup. Let me show you what I've curated:",
            products: demoProducts,
          },
        ])
        setPhase("replying")
      }, 2500)
      return () => clearTimeout(t)
    }
    if (phase === "replying") {
      const t = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I've also put together an optimized bundle that saves you $449 — all compatible and ready to ship:",
            bundle: demoBundle,
          },
        ])
        setPhase("complete")
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_50%)]" />

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
          <h2 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl">
            AI Shopping Assistant
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/50">
            Watch how our AI helps you find the perfect products in seconds
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0d12]">
            <div className="border-b border-white/[0.06] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">NEXUS AI</div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${phase === "complete" ? "bg-green-400" : "animate-pulse bg-primary"}`} />
                    <span className="text-xs text-white/40">
                      {phase === "complete" ? "Online" : "Thinking..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <AnimatePresence>
                {phase === "user" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                      <p className="text-sm text-white">
                        I need a gaming setup under <span className="font-semibold text-primary">$1,500</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="space-y-3"
                >
                  <div className="flex justify-end">
                    <div className="rounded-2xl rounded-br-sm bg-primary/20 px-4 py-3">
                      <p className="text-sm text-white">{msg.content}</p>
                    </div>
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
                          <div className="w-[160px] overflow-hidden rounded-xl bg-[#0d1117]">
                            <div className="relative aspect-square">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="160px"
                              />
                            </div>
                            <div className="p-2.5">
                              <p className="truncate text-xs text-white/80">{product.name}</p>
                              <p className="mt-0.5 font-sans text-sm font-semibold text-primary">
                                ${product.price}
                              </p>
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
                            <span className="text-white">${item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 border-t border-white/[0.06] pt-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white/50">Total</span>
                          <span className="font-sans font-semibold text-white/50 line-through">
                            ${msg.bundle.total + msg.bundle.savings}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">Your Price</span>
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
                        <Button size="sm" className="ml-auto bg-primary text-black hover:bg-primary/90">
                          Add Bundle to Cart
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              <AnimatePresence>
                {phase === "thinking" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-white/5 px-4 py-3">
                      <div className="flex gap-1">
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                          className="h-2 w-2 rounded-full bg-primary"
                        />
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                          className="h-2 w-2 rounded-full bg-primary"
                        />
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                          className="h-2 w-2 rounded-full bg-primary"
                        />
                      </div>
                      <span className="text-xs text-white/40">Analyzing your request...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
