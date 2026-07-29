"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Sun, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@nexus/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Collections", href: "/collections" },
  { label: "AI Shopping", href: "/ai-shopping" },
  { label: "About", href: "/about" },
];

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.2 },
  }),
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-6"
    >
      <nav
        className={cn(
          "mx-auto flex h-[72px] w-full max-w-5xl items-center justify-between rounded-[999px] border border-white/[0.08] px-3 transition-all duration-300",
          isScrolled
            ? "bg-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
            : "bg-white/[0.03]",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5 pl-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
            <ShoppingBag className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">NEXUS</span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-150",
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:bg-white/[0.05] hover:text-white",
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="absolute -bottom-0.5 left-1/2 h-[2px] w-1 -translate-x-1/2 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-all hover:bg-white/[0.05] hover:text-white"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <button
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-all hover:bg-white/[0.05] hover:text-white sm:flex"
            aria-label="Toggle theme"
          >
            <Sun className="h-[18px] w-[18px]" />
          </button>

          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-all hover:bg-white/[0.05] hover:text-white"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-[6px] w-[6px] rounded-full bg-primary" />
          </button>

          <div className="ml-2 hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm" className="h-9 px-4 text-sm text-white/70 hover:text-white">
              Sign In
            </Button>
            <Button size="sm" className="h-10 gap-1.5 px-5 text-sm">
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-white transition-all hover:bg-white/[0.05] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-[-1] flex flex-col pt-24"
          >
            <div
              className="absolute inset-0 bg-[#05070B]/95 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative mx-auto flex w-full max-w-sm flex-1 flex-col px-6">
              <div className="flex-1 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      custom={i}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-5 py-4 text-lg font-medium transition-all duration-150",
                          isActive
                            ? "bg-white/[0.05] text-white"
                            : "text-white/50 hover:bg-white/[0.03] hover:text-white",
                        )}
                      >
                        {link.label}
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isActive ? "bg-primary" : "bg-white/20",
                          )}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className="space-y-3 pb-12"
              >
                <hr className="border-white/[0.06]" />
                <div className="flex items-center gap-3 pt-2">
                  <Button variant="ghost" size="md" className="flex-1 text-sm">
                    Sign In
                  </Button>
                  <Button size="md" className="flex-1 gap-2 text-sm">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
