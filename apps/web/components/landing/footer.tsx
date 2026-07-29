"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Heart,
} from "lucide-react";
import { Container } from "@nexus/ui/container";
import { Separator } from "@nexus/ui/separator";

const footerLinks = {
  Platform: [
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Collections", href: "/collections" },
    { label: "Brands", href: "/brands" },
    { label: "Sale", href: "/sale" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy", href: "/privacy" },
  ],
  "Developers": [
    { label: "API Docs", href: "/docs" },
    { label: "Integrations", href: "/integrations" },
    { label: "Changelog", href: "/changelog" },
    { label: "Status", href: "/status" },
    { label: "Open Source", href: "/opensource" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">NEXUS</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              The next generation AI commerce platform. Powering intelligent
              shopping experiences for forward-thinking brands worldwide.
            </p>

            {/* Newsletter signup inline */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Get product updates
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary-light">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-text-secondary transition-all hover:border-primary/30 hover:text-primary hover:shadow-glow-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3 className="mb-4 text-sm font-semibold text-white">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator className="my-12" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} NEXUS Commerce. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-text-muted transition-colors hover:text-text-secondary"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-text-muted transition-colors hover:text-text-secondary"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-text-muted transition-colors hover:text-text-secondary"
            >
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}