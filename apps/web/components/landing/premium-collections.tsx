"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@nexus/ui/button"
import { Badge } from "@nexus/ui/badge"

const collections = [
  {
    name: "Summer Essentials",
    description: "Curated pieces for the season ahead. Lightweight, vibrant, and effortlessly stylish.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=85",
    gradient: "from-rose-900/70 via-rose-800/30 to-transparent",
    items: "124 products",
  },
  {
    name: "Premium Audio",
    description: "The finest listening experience. From studio-grade headphones to premium speakers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&q=85",
    gradient: "from-blue-900/70 via-blue-800/30 to-transparent",
    items: "89 products",
  },
  {
    name: "Smart Living",
    description: "Transform your home with intelligent devices that anticipate your every need.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1400&q=85",
    gradient: "from-emerald-900/70 via-emerald-800/30 to-transparent",
    items: "256 products",
  },
]

export function PremiumCollections() {
  return (
    <section className="relative overflow-hidden py-24" aria-labelledby="collections-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            Editor&apos;s Choice
          </Badge>
          <h2 id="collections-heading" className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl">
            Premium Collections
          </h2>
          <p className="mt-3 max-w-xl text-white/50">
            Editorially curated selections for the discerning customer
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
          {collections.map((collection, i) => (
            <motion.a
              key={collection.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -8 }}
              href="#"
              className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              role="listitem"
              aria-label={`${collection.name} — ${collection.items}`}
            >
              <div className={`relative ${i === 0 ? "aspect-[3/2] md:aspect-auto md:h-full md:min-h-[520px]" : "aspect-[4/3]"} overflow-hidden`}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient}`} />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span className="mb-2 inline-block text-xs font-medium uppercase tracking-widest text-white/50">
                    {collection.items}
                  </span>
                  <h3 className={`font-sans font-bold leading-tight tracking-tight text-white ${i === 0 ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"}`}>
                    {collection.name}
                  </h3>
                  <p className={`mt-3 max-w-md text-white/60 ${i === 0 ? "text-base" : "text-sm"}`}>
                    {collection.description}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 border-white/20 text-white transition-all duration-300 hover:bg-white hover:text-black"
                    tabIndex={-1}
                  >
                    Explore Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>

                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-primary/30 group-hover:shadow-[0_0_60px_-15px_rgba(0,217,255,0.15)]" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
