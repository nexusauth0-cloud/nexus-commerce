"use client"

import { motion } from "framer-motion"
import { Sparkles, Github, Twitter, Linkedin, Youtube, ArrowUpRight } from "lucide-react"

const columns = [
  {
    title: "Platform",
    links: ["Products", "AI Shopping", "Collections", "Brands", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press", "Partners"],
  },
  {
    title: "Support",
    links: ["Help Center", "Shipping", "Returns", "Contact", "FAQ"],
  },
  {
    title: "Developers",
    links: ["API", "Documentation", "Integrations", "Status", "Changelog"],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04]" role="contentinfo">
      <div className="container-wide py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <a href="/" className="inline-flex items-center gap-2" aria-label="NEXUS Home">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="font-sans text-lg font-bold text-white">NEXUS</span>
              </a>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
                The next-generation AI commerce platform. Curating the finest products through
                intelligent recommendation technology.
              </p>
              <nav className="mt-6 flex gap-3" aria-label="Social media links">
                {[
                  { icon: Github, label: "GitHub" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Youtube, label: "YouTube" },
                ].map(({ icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    whileHover={{ y: -2, scale: 1.05 }}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-[0_0_15px_-3px_rgba(0,217,255,0.15)]"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </div>

          {columns.map((col, i) => (
            <motion.nav
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
              aria-label={col.title}
            >
              <h4 className="mb-4 text-sm font-semibold text-white">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-sm text-white/40 transition-colors duration-300 hover:text-white"
                    >
                      {link}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 md:flex-row"
        >
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} NEXUS Commerce. All rights reserved.
          </p>
          <nav className="flex gap-6" aria-label="Legal links">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a key={link} href="#" className="text-xs text-white/30 transition-colors duration-300 hover:text-white/60">
                {link}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </footer>
  )
}
