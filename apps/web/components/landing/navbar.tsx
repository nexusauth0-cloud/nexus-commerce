'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@nexus/ui';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Collections', href: '/collections' },
  { label: 'Sale', href: '/sale' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-40 transition-all duration-500',
        isScrolled ? 'border-border bg-background/80 border-b backdrop-blur-2xl' : 'bg-transparent',
      )}
    >
      <nav className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br">
            <ShoppingBag className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">NEXUS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary text-sm transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="text-text-secondary hidden h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-white md:flex">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-text-secondary relative hidden h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-white md:flex">
            <ShoppingCart className="h-5 w-5" />
            <span className="bg-primary text-primary-foreground absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
              0
            </span>
          </button>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-border bg-background/95 overflow-hidden border-t backdrop-blur-2xl md:hidden"
          >
            <div className="container space-y-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:bg-surface-hover block rounded-lg px-4 py-3 text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-border my-3" />
              <div className="flex items-center gap-3 px-4 py-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
                <Button size="sm" className="flex-1">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
