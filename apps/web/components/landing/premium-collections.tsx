"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@nexus/ui/button"

const collections = [
  {
    name: "Summer Essentials",
    description: "Curated pieces for the season ahead. Lightweight, vibrant, and effortlessly stylish.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=85",
    gradient: "from-rose-900/60 via-rose-800/30 to-transparent",
  },
  {
    name: "Premium Audio",
    description: "The finest listening experience. From studio-grade headphones to奢华 speakers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&q=85",
    gradient: "from-blue-900/60 via-blue-800/30 to-transparent",
  },
  {
    name: "Smart Living",
    description: "Transform your home with intelligent devices that anticipate your every need.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1400&q=85",
    gradient: "from-emerald-900/60 via-emerald-800/30 to-transparent",
  },
]

export function PremiumCollections() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl">
            Premium Collections
          </h2>
          <p className="mt-3 max-w-xl text-white/50">
            Editorially curated selections for the discerning customer
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "aspect-[3/2] md:aspect-auto md:h-full md:min-h-[500px]" : "aspect-[4/3]"} overflow-hidden`}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient}`} />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className={`font-sans font-bold text-white ${i === 0 ? "text-4xl" : "text-2xl"}`}>
                    {collection.name}
                  </h3>
                  <p className={`mt-2 max-w-md text-white/70 ${i === 0 ? "text-base" : "text-sm"}`}>
                    {collection.description}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-white/20 text-white hover:bg-white hover:text-black"
                  >
                    Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-primary/20 group-hover:shadow-[0_0_60px_-15px_rgba(0,217,255,0.15)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
