"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Star, Sparkles, ArrowRight, Zap, Cpu, Package } from "lucide-react"
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

const chips = [
  "Gaming Setup",
  "Wireless Audio",
  "Smart Home",
  "Fitness Tech",
  "Photography",
  "Premium Audio",
  "Productivity",
]

const bundles = [
  {
    name: "Creator Studio Bundle",
    items: "MacBook Pro + Sony A7R V + AirPods Max",
    savings: "$449",
    match: 98,
  },
  {
    name: "Premium Audio Bundle",
    items: "Sony XM6 + AirPods Max + DAC",
    savings: "$189",
    match: 95,
  },
]

export function AIRecommendations() {
  const carouselRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_50%)]" />

      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
              <Sparkles className="mr-1 h-3 w-3" />
              AI Powered
            </Badge>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl">
              Recommended For You
            </h2>
            <p className="mt-2 flex items-center gap-2 text-white/40">
              <Cpu className="h-4 w-4 text-primary" />
              Based on your browsing patterns and preferences
            </p>
          </div>
          <Button variant="ghost" className="hidden text-white/60 md:flex">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {chips.map((chip, i) => (
            <motion.button
              key={chip}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(0,217,255,0.3)" }}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {chip}
            </motion.button>
          ))}
        </motion.div>

        <div ref={carouselRef} className="relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-4 overflow-x-auto pb-4 no-scrollbar"
          >
            {recommendedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group flex-shrink-0"
              >
                <div className="relative w-[240px] overflow-hidden rounded-xl bg-[#0a0d12]">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="240px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-primary">
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
            {bundles.map((bundle, i) => (
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
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="border-primary/20 text-[10px] text-primary">
                      <Sparkles className="mr-1 h-2.5 w-2.5" />
                      AI Recommended
                    </Badge>
                    <span className="text-xs text-primary">{bundle.match}% Match</span>
                  </div>
                  <h4 className="font-sans text-lg font-semibold text-white">{bundle.name}</h4>
                  <p className="mt-1 text-sm text-white/40">{bundle.items}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-sm font-medium text-white">Save {bundle.savings}</span>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      View Bundle <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-primary/20" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
