'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Github, Twitter, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/categories' },
    { label: 'Collections', href: '/collections' },
    { label: 'Brands', href: '/brands' },
    { label: 'Sale', href: '/sale' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy', href: '/privacy' },
  ],
  Developers: [
    { label: 'API Docs', href: '/docs' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Status', href: '/status' },
    { label: 'Open Source', href: '/opensource' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com' },
  { icon: Twitter, href: 'https://twitter.com' },
  { icon: Linkedin, href: 'https://linkedin.com' },
  { icon: Youtube, href: 'https://youtube.com' },
];

export function Footer() {
  return (
    <footer className="border-border relative border-t">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">NEXUS</span>
            </Link>
            <p className="text-text-secondary mt-4 max-w-xs text-sm leading-relaxed">
              The next generation AI commerce platform. Powering intelligent shopping experiences
              for forward-thinking brands worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-card text-text-secondary hover:border-primary/30 hover:text-primary flex h-9 w-9 items-center justify-center rounded-lg border transition-all"
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
              <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-primary text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-border mt-16 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} NEXUS Commerce. All rights reserved.
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <Link
              href="/privacy"
              className="text-text-muted hover:text-text-secondary text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-text-muted hover:text-text-secondary text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-text-muted hover:text-text-secondary text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
