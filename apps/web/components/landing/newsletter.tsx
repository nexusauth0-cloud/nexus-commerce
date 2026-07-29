"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Check, Zap, Shield, Cpu, Mail } from "lucide-react"

const benefits = [
  { icon: Zap, text: "Early access to drops" },
  { icon: Shield, text: "Exclusive member pricing" },
  { icon: Cpu, text: "AI-curated picks" },
]

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <section className="relative overflow-hidden py-24" aria-labelledby="newsletter-heading">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-[1px] shadow-[0_0_60px_-20px_rgba(0,217,255,0.1)]">
            <div className="rounded-[23px] bg-[#0a0d12] px-8 py-12 md:px-12 md:py-16">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-[0_0_20px_-5px_rgba(0,217,255,0.15)]">
                <Mail className="h-7 w-7 text-primary" />
              </div>

              <h2 id="newsletter-heading" className="font-sans text-3xl font-bold tracking-tight text-white md:text-4xl">
                Stay Ahead of the Curve
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/50">
                Join the inner circle. Get AI-curated product drops, early access, and member-only pricing.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-3 rounded-xl border border-green-400/20 bg-gradient-to-r from-green-400/5 to-green-500/5 px-6 py-4"
                  role="status"
                  aria-live="polite"
                >
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-green-400">You&apos;re in. Welcome to the future of shopping.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-sm">
                  <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/30 focus:border-primary/40 focus:bg-white/[0.05] focus:shadow-[0_0_20px_-5px_rgba(0,217,255,0.1)]"
                        required
                        aria-label="Email address"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-500 px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(0,217,255,0.3)]"
                      aria-label="Subscribe to newsletter"
                    >
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </form>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-1.5 text-xs text-white/30">
                    <benefit.icon className="h-3 w-3 text-primary" />
                    {benefit.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
