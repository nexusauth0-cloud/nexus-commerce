"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@nexus/ui/button";
import { Glass } from "@nexus/ui/glass";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Collections", href: "/collections" },
  { label: "Sale", href: "/sale" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-40 transition-all duration-500",
        isScrolled
          ? "border-b border-border bg-background/80 backdrop-blur-2xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <ShoppingBag className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">NEXUS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm text-text-secondary transition-all hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-all hover:bg-white/5 hover:text-white"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-all hover:bg-white/5 hover:text-white"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </button>
          <Button variant="outline" size="sm" className="ml-2 hidden md:flex">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/5 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-3 border-border" />
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