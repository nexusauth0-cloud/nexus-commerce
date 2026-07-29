"use client"

import { motion } from "framer-motion"

const brands = [
  "Apple", "Sony", "Samsung", "Nike", "Dyson", "Bose",
  "Adidas", "KitchenAid", "Garmin", "Patagonia", "Technogym", "Le Creuset",
]

export function BrandLogos() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="font-sans text-3xl font-bold tracking-tight text-white">
            Trusted Brands
          </h2>
          <p className="mt-2 text-white/50">
            Partnering with the world&apos;s finest manufacturers
          </p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#05070b] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#05070b] to-transparent" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-16"
          >
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex h-16 w-32 flex-shrink-0 items-center justify-center"
              >
                <span className="whitespace-nowrap font-sans text-lg font-semibold tracking-widest text-white/20 transition-colors duration-500 hover:text-white/40">
                  {brand}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
