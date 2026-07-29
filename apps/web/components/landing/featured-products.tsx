"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Heart, ShoppingBag, Eye, Star, Sparkles, Truck, Clock, ChevronDown } from "lucide-react"
import { Button } from "@nexus/ui/button"
import { Badge } from "@nexus/ui/badge"

const products = [
  {
    id: 1,
    name: "MacBook Pro 16 M4",
    category: "Electronics",
    price: 3499,
    originalPrice: 3799,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85",
    badge: "Best Seller",
    aiScore: 97,
    inStock: true,
    delivery: "Free · Dec 24",
  },
  {
    id: 2,
    name: "Sony WH-1000XM6",
    category: "Audio",
    price: 399,
    originalPrice: 449,
    rating: 4.7,
    reviews: 18452,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85",
    badge: null,
    aiScore: 95,
    inStock: true,
    delivery: "Free · Dec 22",
  },
  {
    id: 3,
    name: "Samsung Odyssey OLED G8",
    category: "Gaming",
    price: 1299,
    originalPrice: 1499,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b10f7?w=800&q=85",
    badge: "New",
    aiScore: 92,
    inStock: true,
    delivery: "Free · Dec 26",
  },
  {
    id: 4,
    name: "Sony A7R V Camera",
    category: "Photography",
    price: 3899,
    originalPrice: 4199,
    rating: 4.9,
    reviews: 734,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85",
    badge: "Premium",
    aiScore: 93,
    inStock: true,
    delivery: "Free · Dec 28",
  },
  {
    id: 5,
    name: "Nike Air Max Pulse",
    category: "Fashion",
    price: 189,
    originalPrice: 219,
    rating: 4.5,
    reviews: 3456,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
    badge: "Trending",
    aiScore: 91,
    inStock: true,
    delivery: "Free · Dec 21",
  },
  {
    id: 6,
    name: "KitchenAid Artisan Mixer",
    category: "Home",
    price: 499,
    originalPrice: 549,
    rating: 4.8,
    reviews: 28761,
    image: "https://images.unsplash.com/photo-1556909114-f6e8ad00cd01?w=800&q=85",
    badge: "Best Seller",
    aiScore: 94,
    inStock: false,
    delivery: "Back in stock soon",
  },
  {
    id: 7,
    name: "Dyson Supersonic r",
    category: "Beauty",
    price: 499,
    originalPrice: null,
    rating: 4.5,
    reviews: 6789,
    image: "https://images.unsplash.com/photo-1522337360788-47b13e3f0db0?w=800&q=85",
    badge: "New",
    aiScore: 90,
    inStock: true,
    delivery: "Free · Dec 23",
  },
  {
    id: 8,
    name: "Garmin Fenix 8 Pro",
    category: "Sports",
    price: 999,
    originalPrice: 1099,
    rating: 4.7,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=85",
    badge: null,
    aiScore: 94,
    inStock: true,
    delivery: "Free · Dec 27",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

export function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())
  const [addedToCart, setAddedToCart] = useState<Set<number>>(new Set())

  function toggleWishlist(id: number) {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleAddToCart(id: number) {
    setAddedToCart((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setAddedToCart((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 2000)
  }

  return (
    <section className="relative overflow-hidden py-24" aria-labelledby="featured-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 text-center"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            AI Curated Selection
          </Badge>
          <h2 id="featured-heading" className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl">
            Featured Products
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/50">
            Handpicked by our AI for their exceptional quality and value
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
        >
          {products.map((product) => (
            <motion.article
              key={product.id}
              variants={cardVariants}
              className="group relative"
              role="listitem"
              aria-label={`${product.name} — $${product.price}`}
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#0a0d12] transition-all duration-500 group-hover:shadow-[0_0_40px_-10px_rgba(0,217,255,0.2),0_20px_60px_-15px_rgba(0,0,0,0.5)] group-hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d12] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute left-3 top-3 flex flex-col gap-2">
                    {product.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {product.badge}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-danger/90 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  <div className="absolute right-3 top-3 flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleWishlist(product.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-white/20"
                      aria-label={wishlist.has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart
                        className={`h-4 w-4 transition-all duration-300 ${
                          wishlist.has(product.id) ? "scale-110 fill-red-500 text-red-500" : "scale-100"
                        }`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-colors hover:border-white/20"
                      aria-label="Quick view"
                    >
                      <Eye className="h-4 w-4" />
                    </motion.button>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ y: addedToCart.has(product.id) ? 0 : 0 }}
                    className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ transform: "translateY(100%)" }}
                  >
                    <Button
                      size="sm"
                      className={`w-full transition-all duration-300 ${
                        addedToCart.has(product.id)
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-white text-black hover:bg-white/90"
                      }`}
                      onClick={() => handleAddToCart(product.id)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingBag className={`mr-1.5 h-3.5 w-3.5 transition-transform duration-300 ${addedToCart.has(product.id) ? "scale-110" : ""}`} />
                      {addedToCart.has(product.id) ? "Added!" : "Add to Cart"}
                    </Button>
                  </motion.div>
                </div>

                <div className="space-y-2 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5">
                      <Sparkles className="h-2.5 w-2.5 text-primary" />
                      <span className="text-[10px] font-medium text-primary">{product.aiScore}%</span>
                    </div>
                  </div>

                  <h3 className="font-sans text-sm font-medium leading-tight text-white">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1.5">
                    <div className="flex" aria-label={`${product.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-white/10 text-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/40">({product.reviews.toLocaleString()})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xl font-bold text-white">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-white/30 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-[11px] text-white/30">
                      {product.inStock ? (
                        <Truck className="h-3 w-3 text-primary/60" />
                      ) : (
                        <Clock className="h-3 w-3 text-amber-400/60" />
                      )}
                      <span>{product.delivery}</span>
                    </div>
                    <span className={`text-[11px] ${product.inStock ? "text-green-400/60" : "text-amber-400/60"}`}>
                      {product.inStock ? "In Stock" : "Low Stock"}
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-primary/30 group-hover:shadow-[0_0_30px_-5px_rgba(0,217,255,0.15)]" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
