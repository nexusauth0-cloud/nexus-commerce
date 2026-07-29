"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Star, Sparkles, ArrowRight, Zap, Cpu, Package, DollarSign, Truck, Check, ChevronDown, Brain } from "lucide-react"
import { Badge } from "@nexus/ui/badge"
import { Button } from "@nexus/ui/button"

const recommendedProducts = [
  {
    id: 1,
    name: "Samsung Galaxy Book4 Ultra",
    image: "https://images.unsplash.com/photo-1468436139788-0c36f2c0faba?w=600&q=80",
    price: 2399,
    rating: 4.5,
    reviews: 1247,
    match: 96,
  },
  {
    id: 2,
    name: "Sony A7R V Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    price: 3899,
    rating: 4.9,
    reviews: 734,
    match: 94,
  },
  {
    id: 3,
    name: "AirPods Max Type-C",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
    price: 549,
    rating: 4.4,
    reviews: 5631,
    match: 92,
  },
  {
    id: 4,
    name: "Le Creuset Dutch Oven",
    image: "https://images.unsplash.com/photo-1590794056226-04ef6e0b9c19?w=600&q=80",
    price: 429,
    rating: 4.9,
    reviews: 18762,
    match: 91,
  },
  {
    id: 5,
    name: "Dyson Airwrap i.d.",
    image: "https://images.unsplash.com/photo-1522337360788-47b13e3f0db0?w=600&q=80",
    price: 599,
    rating: 4.3,
    reviews: 8921,
    match: 89,
  },
  {
    id: 6,
    name: "Technogym Run Evolve",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    price: 4499,
    rating: 4.6,
    reviews: 342,
    match: 95,
  },
]

type Message = {
  role: "ai" | "user"
  content: string
}

export function AIRecommendations() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showReasoning, setShowReasoning] = useState(false)
  const [conversation, setConversation] = useState<Message[]>([])
  const [phase, setPhase] = useState<"greeting" | "thinking" | "reply" | "complete">("greeting")

  useEffect(() => {
    const t1 = setTimeout(() => setConversation([{ role: "ai", content: "I noticed you've been browsing gaming and productivity gear. Based on your preferences, I've curated some recommendations." }]), 600)
    const t2 = setTimeout(() => setPhase("thinking"), 2000)
    const t3 = setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        { role: "ai", content: "Your top match is the Samsung Galaxy Book4 Ultra — it pairs perfectly with your recent searches. The 96% match score means it aligns almost perfectly with your preferences." },
      ])
      setPhase("reply")
    }, 4000)
    const t4 = setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        { role: "ai", content: "I've also put together a productivity bundle that saves you $449. All items are compatible and in stock." },
      ])
      setPhase("complete")
    }, 7000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-24" aria-labelledby="recommendations-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
            <Brain className="mr-1 h-3 w-3" />
            AI Powered
          </Badge>
          <div className="flex items-end justify-between">
            <div>
              <h2 id="recommendations-heading" className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl">
                Recommended For You
              </h2>
              <p className="mt-2 flex items-center gap-2 text-white/40">
                <Cpu className="h-4 w-4 text-primary" />
                Based on your browsing patterns and preferences
              </p>
            </div>
            <Button variant="ghost" className="hidden text-white/60 md:flex" aria-label="View all recommendations">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0d12]">
          <div className="border-b border-white/[0.06] bg-gradient-to-r from-primary/[0.02] to-transparent px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">NEXUS AI</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${phase === "complete" ? "bg-green-400/10 text-green-400" : "bg-primary/10 text-primary"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${phase === "complete" ? "bg-green-400" : "animate-pulse bg-primary"}`} />
                    {phase === "complete" ? "Active" : "Analyzing"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <AnimatePresence mode="popLayout">
              {conversation.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.04] px-4 py-3">
                    <p className="text-sm leading-relaxed text-white/80">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {phase === "thinking" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs text-white/30"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }}
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                      />
                    ))}
                  </div>
                  Analyzing your profile...
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-white/[0.06] px-5 py-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm font-medium text-white/80">AI Recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowReasoning(!showReasoning)}
                    className="flex items-center gap-1 text-xs text-white/30 transition-colors hover:text-white/60"
                    aria-expanded={showReasoning}
                    aria-label="Toggle AI reasoning"
                  >
                    <Brain className="h-3 w-3" />
                    Reasoning
                    <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showReasoning ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showReasoning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">Why these products?</h4>
                      <ul className="space-y-2 text-xs text-white/50">
                        <li className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">●</span>
                          Samsung Galaxy Book4 Ultra matches your preference for high-performance computing
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">●</span>
                          Sony A7R V aligns with your recent photography content engagement
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">●</span>
                          AirPods Max complements your Apple ecosystem preferences
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={carouselRef} className="relative">
                <motion.div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar" role="list">
                  {recommendedProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      whileHover={{ y: -8 }}
                      className="group flex-shrink-0"
                      role="listitem"
                    >
                      <div className="relative w-[220px] overflow-hidden rounded-xl bg-[#0d1117] transition-all duration-500 group-hover:shadow-[0_0_30px_-10px_rgba(0,217,255,0.15)]">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-110"
                            sizes="220px"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 backdrop-blur-sm">
                            <Sparkles className="h-2.5 w-2.5 text-primary" />
                            <span className="text-[10px] font-medium text-primary">{product.match}% Match</span>
                          </div>
                        </div>
                        <div className="space-y-1.5 p-3">
                          <h4 className="truncate text-sm font-medium text-white">{product.name}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-white/40">{product.rating}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-sans text-base font-semibold text-white">
                              ${product.price.toLocaleString()}
                            </span>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-primary" aria-label={`Quick add ${product.name}`}>
                              <Zap className="mr-1 h-3 w-3" /> Quick Add
                            </Button>
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-primary/20" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium text-white/60">Smart Bundle Suggestions</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Creator Studio Bundle",
                items: [
                  { name: "Samsung Galaxy Book4 Ultra", price: 2399 },
                  { name: "Sony A7R V Camera", price: 3899 },
                  { name: "AirPods Max", price: 549 },
                ],
                savings: 449,
                match: 98,
                delivery: "Free · Dec 24-28",
              },
              {
                name: "Premium Audio Bundle",
                items: [
                  { name: "Sony WH-1000XM6", price: 399 },
                  { name: "AirPods Max", price: 549 },
                  { name: "FiiO K7 DAC", price: 249 },
                ],
                savings: 189,
                match: 95,
                delivery: "Free · Dec 22-26",
              },
            ].map((bundle, i) => {
              const total = bundle.items.reduce((s, item) => s + item.price, 0)
              return (
                <motion.div
                  key={bundle.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-5"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10" />
                  <div className="relative z-10">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="outline" className="border-primary/20 text-[10px] text-primary">
                        <Sparkles className="mr-1 h-2.5 w-2.5" />
                        AI Recommended
                      </Badge>
                      <span className="text-xs text-primary">{bundle.match}% Match</span>
                    </div>
                    <h4 className="font-sans text-lg font-semibold text-white">{bundle.name}</h4>
                    <div className="mt-3 space-y-2">
                      {bundle.items.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-green-400" />
                            <span className="text-white/70">{item.name}</span>
                          </div>
                          <span className="text-white/50">${item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 border-t border-white/[0.06] pt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/50">Bundle total</span>
                        <span className="font-sans font-semibold text-white/50 line-through">${total + bundle.savings}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Your price</span>
                        <span className="font-sans text-lg font-bold text-primary">${total}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-green-400">
                        <DollarSign className="h-3 w-3" />
                        Save ${bundle.savings}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-white/40">
                        <Truck className="h-3.5 w-3.5" />
                        {bundle.delivery}
                      </div>
                      <Button size="sm" className="ml-auto bg-white text-black hover:bg-white/90" aria-label={`Add ${bundle.name} to cart`}>
                        Add Bundle <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-primary/20" />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
