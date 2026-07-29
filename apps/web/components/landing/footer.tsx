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
    <footer className="relative overflow-hidden border-t border-white/[0.04]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,217,255,0.02),transparent_50%)]" />

      <div className="container-wide py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="font-sans text-lg font-bold text-white">NEXUS</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
                The next-generation AI commerce platform. Curating the finest products through
                intelligent recommendation technology.
              </p>
              <div className="mt-6 flex gap-3">
                {[Github, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ y: -2, scale: 1.05 }}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
            >
              <h4 className="mb-4 text-sm font-semibold text-white">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-sm text-white/40 transition-colors hover:text-white"
                    >
                      {link}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
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
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a key={link} href="#" className="text-xs text-white/30 transition-colors hover:text-white/60">
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
