"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star, Quote, Shield, ChevronDown } from "lucide-react"

const reviews = [
  {
    name: "Sarah Chen",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "The AI recommendations were eerily accurate. Found the perfect laptop for my design work in minutes, not hours. The bundle savings were substantial and the delivery was faster than expected.",
    product: "MacBook Pro 16\" M4",
    date: "2 days ago",
  },
  {
    name: "Marcus Rivera",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "Built my entire gaming setup through NEXUS. The AI suggested components I hadn't even considered that ended up being perfect. Saved over $400 on the bundle and everything arrived within 3 days.",
    product: "Gaming Bundle",
    date: "1 week ago",
  },
  {
    name: "Emily Nakamura",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "Exceptional quality and curation. Every product I've ordered has exceeded expectations. The smart home collection transformed my apartment. The AI even suggested products I didn't know I needed.",
    product: "Smart Home Collection",
    date: "3 days ago",
  },
  {
    name: "James Whitfield",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 4,
    text: "The audio equipment selection is unmatched. The AI matched me with headphones that perfectly suit my listening preferences. Fast shipping and excellent customer service.",
    product: "Sony WH-1000XM6",
    date: "5 days ago",
  },
]

export function CustomerReviews() {
  return (
    <section className="relative overflow-hidden py-24" aria-labelledby="reviews-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 id="reviews-heading" className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl">
            Loved by Customers
          </h2>
          <p className="mt-3 text-white/50">
            Real reviews from verified buyers
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2" role="list">
          {reviews.map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl bg-[#0a0d12] p-6 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(0,217,255,0.1)]"
              role="listitem"
              aria-label={`Review by ${review.name}, ${review.rating} stars`}
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-white/[0.02]" />

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white/10">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-sans font-semibold text-white">{review.name}</h4>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <div className="flex" aria-label={`${review.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star
                            key={si}
                            className={`h-3 w-3 ${
                              si < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-white/10 text-white/10"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-green-400" />
                        <span className="text-[10px] font-medium text-green-400">Verified Purchase</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="leading-relaxed text-white/60">&ldquo;{review.text}&rdquo;</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.04] pt-4 text-xs text-white/30">
                  <span>{review.product}</span>
                  <span>{review.date}</span>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-primary/20" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
