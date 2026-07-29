"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Gaming",
    description: "Ultimate gaming setups",
    count: "2,847 products",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b10f7?w=800&q=85",
    gradient: "from-purple-900/40 via-purple-800/20 to-transparent",
  },
  {
    name: "Audio",
    description: "Premium sound experience",
    count: "1,932 products",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85",
    gradient: "from-blue-900/40 via-blue-800/20 to-transparent",
  },
  {
    name: "Workspace",
    description: "Modern productivity",
    count: "3,124 products",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    gradient: "from-emerald-900/40 via-emerald-800/20 to-transparent",
  },
  {
    name: "Fashion",
    description: "Curated style",
    count: "5,678 products",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=85",
    gradient: "from-rose-900/40 via-rose-800/20 to-transparent",
  },
  {
    name: "Home",
    description: "Smart living",
    count: "2,456 products",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85",
    gradient: "from-amber-900/40 via-amber-800/20 to-transparent",
  },
  {
    name: "Accessories",
    description: "Complete your setup",
    count: "4,231 products",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=85",
    gradient: "from-cyan-900/40 via-cyan-800/20 to-transparent",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

export function TrendingCategories() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,217,255,0.02),transparent_50%)]" />

      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl">
            Trending Categories
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/50">
            Explore our most popular categories curated for the modern lifestyle
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient}`} />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-sans text-2xl font-bold text-white">{category.name}</h3>
                <p className="mt-1 text-sm text-white/70">{category.description}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-white/50 transition-all duration-300 group-hover:text-primary">
                  <span>{category.count}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-primary/30 group-hover:shadow-[0_0_40px_-10px_rgba(0,217,255,0.2)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
