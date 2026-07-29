"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ShoppingBag, Bot, ChevronRight } from "lucide-react";
import { Button } from "@nexus/ui/button";
import { AnimatedBackground } from "@nexus/ui/animated-background";
import { Glass } from "@nexus/ui/glass";
import { Avatar, AvatarFallback } from "@nexus/ui/avatar";

const customerAvatars = [
  { initials: "SC", color: "from-primary to-secondary" },
  { initials: "MJ", color: "from-secondary to-primary" },
  { initials: "ER", color: "from-primary to-success" },
  { initials: "AK", color: "from-secondary to-warning" },
  { initials: "+2K", color: "from-white/10 to-white/5" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 80]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <AnimatedBackground
        aurora
        grid
        particles
        noise
        spotlight
        glowBlobs
        particleCount={30}
      />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center lg:px-8"
      >
        {/* AI Commerce Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Glass variant="subtle" className="inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
              <Sparkles className="h-3 w-3 text-primary" />
            </span>
            <span className="text-xs font-medium tracking-wide text-primary">
              AI-Powered Commerce Engine
            </span>
            <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              v2.0
            </span>
          </Glass>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          <span className="text-white">The Future of</span>
          <br />
          <span className="gradient-primary-text">Commerce</span>
          <br />
          <span className="text-white">is Intelligent</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl"
        >
          NEXUS combines cutting-edge AI with premium design to create a
          shopping experience that feels like magic. Discover products
          tailored to your taste in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="xl" className="group gap-2 text-base shadow-glow-primary">
            <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
            Start Shopping
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="group gap-2 text-base"
          >
            <Bot className="h-5 w-5 transition-transform group-hover:scale-110" />
            Try AI Assistant
          </Button>
        </motion.div>

        {/* Trust Row: Avatars + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-col items-center gap-8 sm:flex-row sm:gap-12"
        >
          {/* Customer avatars */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {customerAvatars.map((avatar, i) => (
                <Avatar
                  key={avatar.initials}
                  className="h-10 w-10 border-2 border-background ring-2 ring-background"
                >
                  <AvatarFallback
                    className={`bg-gradient-to-br ${avatar.color} text-[10px] font-bold text-white`}
                  >
                    {avatar.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">
                Trusted by 2,000+
              </p>
              <p className="text-xs text-text-secondary">
                forward-thinking brands
              </p>
            </div>
          </div>

          <div className="hidden h-8 w-px bg-border sm:block" />

          {/* Rating stat */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-4 w-4 text-warning"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">4.9 / 5.0</p>
              <p className="text-xs text-text-secondary">
                from 12,000+ reviews
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating product showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 w-full max-w-5xl"
        >
          <Glass variant="elevated" className="relative overflow-hidden p-2">
            <div className="flex items-center gap-3 border-b border-white/5 px-5 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-danger/50" />
                <div className="h-3 w-3 rounded-full bg-warning/50" />
                <div className="h-3 w-3 rounded-full bg-success/50" />
              </div>
              <div className="flex-1 text-center text-xs text-text-tertiary">
                nexus-commerce.com/shop
              </div>
              <ChevronRight className="h-4 w-4 text-text-tertiary" />
            </div>
            <div className="grid grid-cols-3 gap-2 p-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="h-2 w-16 rounded-full bg-white/20" />
                    <div className="mt-2 h-2 w-12 rounded-full bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          </Glass>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}